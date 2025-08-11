<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Listing;
use App\Models\User;
use App\Services\GeminiTranslationService;
use Illuminate\Support\Facades\Http;

class GeminiTranslationTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        
        // Set up configuration for testing
        config(['app.supported_locales' => ['en', 'fr', 'es']]);
        config(['services.gemini.api_key' => 'test-api-key']);
        config(['services.gemini.model' => 'gemini-1.5-flash']);
        config(['services.gemini.rate_limit' => 60]);
    }

    public function testTranslationEndpointRequiresAuthentication()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available for testing');
        }

        $response = $this->postJson("/listings/{$listing->id}/translate", [
            'locales' => ['fr', 'es']
        ]);

        $response->assertStatus(401);
    }

    public function testTranslationEndpointRequiresAdminRole()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available for testing');
        }
        
        // Find a non-admin user or skip test
        $user = User::where('type_compte', '!=', 'admin')->first();
        if (!$user) {
            $this->markTestSkipped('No non-admin user available for testing');
        }

        $response = $this->actingAs($user)
            ->postJson("/listings/{$listing->id}/translate", [
                'locales' => ['fr', 'es']
            ]);

        $response->assertStatus(403)
            ->assertJson(['error' => 'Unauthorized']);
    }

    public function testGetTranslationsEndpointWorks()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available for testing');
        }

        $response = $this->getJson("/listings/{$listing->id}/translations");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'translations',
                'status',
                'supported_locales'
            ]);
    }

    public function testGeminiServicePromptGeneration()
    {
        $service = new GeminiTranslationService();
        $listing = new Listing([
            'title' => 'Test Listing',
            'description' => 'Test Description',
            'short_description' => 'Short test'
        ]);

        // Use reflection to test protected method
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('buildTranslationPrompt');
        $method->setAccessible(true);

        $prompt = $method->invoke($service, $listing, ['fr', 'es']);

        $this->assertStringContainsString('French and Spanish', $prompt);
        $this->assertStringContainsString('Test Listing', $prompt);
        $this->assertStringContainsString('Test Description', $prompt);
        $this->assertStringContainsString('JSON', $prompt);
    }

    public function testTranslationValidation()
    {
        $listing = Listing::first();
        $admin = User::where('type_compte', 'admin')->first();
        
        if (!$listing || !$admin) {
            $this->markTestSkipped('No admin user or listing available for testing');
        }

        // Test invalid locale
        $response = $this->actingAs($admin)
            ->postJson("/listings/{$listing->id}/translate", [
                'locales' => ['invalid_locale']
            ]);

        $response->assertStatus(422);

        // Test valid request structure
        $response = $this->actingAs($admin)
            ->postJson("/listings/{$listing->id}/translate", [
                'locales' => ['fr'],
                'fields' => ['title', 'description'],
                'force' => true
            ]);

        // Will fail with API error since we don't have real API key, but validates structure
        $response->assertStatus(500);
    }

    public function testUpdateTranslationsValidation()
    {
        $listing = Listing::first();
        $admin = User::where('type_compte', 'admin')->first();
        
        if (!$listing || !$admin) {
            $this->markTestSkipped('No admin user or listing available for testing');
        }

        // Test missing required fields
        $response = $this->actingAs($admin)
            ->putJson("/listings/{$listing->id}/translations", [
                'translations' => [
                    ['locale' => 'fr']
                ]
            ]);

        $response->assertStatus(422);

        // Test valid structure
        $response = $this->actingAs($admin)
            ->putJson("/listings/{$listing->id}/translations", [
                'translations' => [
                    [
                        'locale' => 'fr',
                        'title' => 'Titre français',
                        'description' => 'Description française'
                    ]
                ]
            ]);

        $response->assertStatus(200);
    }

    public function testDeleteTranslationsEndpoint()
    {
        $listing = Listing::first();
        $admin = User::where('type_compte', 'admin')->first();
        
        if (!$listing || !$admin) {
            $this->markTestSkipped('No admin user or listing available for testing');
        }

        // Delete specific locale
        $response = $this->actingAs($admin)
            ->deleteJson("/listings/{$listing->id}/translations", [
                'locale' => 'fr'
            ]);

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'message']);

        // Delete all translations
        $response = $this->actingAs($admin)
            ->deleteJson("/listings/{$listing->id}/translations");

        $response->assertStatus(200)
            ->assertJsonStructure(['status', 'message']);
    }

    public function testTranslationStatsEndpoint()
    {
        $admin = User::where('type_compte', 'admin')->first();
        
        if (!$admin) {
            $this->markTestSkipped('No admin user available for testing');
        }

        $response = $this->actingAs($admin)
            ->getJson("/listings/translation-stats");

        $response->assertStatus(200)
            ->assertJsonStructure([
                'translations',
                'api_usage',
                'listings_total',
                'listings_translated'
            ]);
    }

    public function testGeminiServiceRateLimiting()
    {
        $service = new GeminiTranslationService();
        
        // Test rate limit check method
        $reflection = new \ReflectionClass($service);
        $method = $reflection->getMethod('checkRateLimit');
        $method->setAccessible(true);

        // Should return true when under limit
        $result = $method->invoke($service);
        $this->assertTrue($result);

        // Simulate hitting rate limit
        \Cache::put('gemini_api_rate_limit', 60, 60);
        $result = $method->invoke($service);
        $this->assertFalse($result);

        // Clean up
        \Cache::forget('gemini_api_rate_limit');
    }

    public function testMockedGeminiAPIResponse()
    {
        // Mock HTTP facade for Gemini API
        Http::fake([
            'generativelanguage.googleapis.com/*' => Http::response([
                'candidates' => [
                    [
                        'content' => [
                            'parts' => [
                                [
                                    'text' => json_encode([
                                        'fr' => [
                                            'title' => 'Titre de test',
                                            'description' => 'Description de test'
                                        ],
                                        'es' => [
                                            'title' => 'Título de prueba',
                                            'description' => 'Descripción de prueba'
                                        ]
                                    ])
                                ]
                            ]
                        ]
                    ]
                ]
            ], 200)
        ]);

        $service = new GeminiTranslationService();
        $listing = new Listing([
            'id' => 1,
            'title' => 'Test Title',
            'description' => 'Test Description'
        ]);

        config(['services.gemini.api_key' => 'test-key']);

        $result = $service->translateListing($listing, ['fr', 'es']);

        $this->assertArrayHasKey('fr', $result);
        $this->assertArrayHasKey('es', $result);
        $this->assertEquals('Titre de test', $result['fr']['title']);
        $this->assertEquals('Título de prueba', $result['es']['title']);
    }
}