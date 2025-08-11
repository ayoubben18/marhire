<?php

namespace Tests\Unit;

use App\Models\Listing;
use App\Models\ListingTranslation;
use App\Services\TranslationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TranslationServiceTest extends TestCase
{
    use RefreshDatabase;

    protected TranslationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new TranslationService();
        
        config(['app.supported_locales' => ['en', 'fr', 'es']]);
        config(['app.fallback_locale' => 'en']);
    }

    public function testGetOrCreateTranslation()
    {
        $listing = Listing::factory()->create();
        
        // Create new translation
        $translation = $this->service->getOrCreateTranslation($listing, 'fr');
        $this->assertInstanceOf(ListingTranslation::class, $translation);
        $this->assertEquals('fr', $translation->locale);
        
        // Get existing translation
        $translation2 = $this->service->getOrCreateTranslation($listing, 'fr');
        $this->assertEquals($translation->id, $translation2->id);
    }

    public function testUpdateTranslations()
    {
        $listing = Listing::factory()->create();
        
        $data = [
            'fr' => [
                'title' => 'Titre Français',
                'description' => 'Description Française'
            ],
            'es' => [
                'title' => 'Título Español',
                'description' => 'Descripción Española'
            ]
        ];
        
        $result = $this->service->updateTranslations($listing, $data);
        $this->assertTrue($result);
        
        $frTranslation = $listing->translations()->where('locale', 'fr')->first();
        $this->assertEquals('Titre Français', $frTranslation->title);
        
        $esTranslation = $listing->translations()->where('locale', 'es')->first();
        $this->assertEquals('Título Español', $esTranslation->title);
    }

    public function testDeleteTranslations()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre'
        ]);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'es',
            'title' => 'Título'
        ]);
        
        // Delete specific locale
        $result = $this->service->deleteTranslations($listing, 'fr');
        $this->assertTrue($result);
        $this->assertEquals(0, $listing->translations()->where('locale', 'fr')->count());
        $this->assertEquals(1, $listing->translations()->where('locale', 'es')->count());
        
        // Delete all
        $result = $this->service->deleteTranslations($listing);
        $this->assertTrue($result);
        $this->assertEquals(0, $listing->translations()->count());
    }

    public function testCopyTranslations()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'en',
            'title' => 'English Title',
            'description' => 'English Description'
        ]);
        
        $result = $this->service->copyTranslations('en', 'fr', $listing);
        $this->assertTrue($result);
        
        $frTranslation = $listing->translations()->where('locale', 'fr')->first();
        $this->assertNotNull($frTranslation);
        $this->assertEquals('English Title', $frTranslation->title);
    }

    public function testGetTranslationStats()
    {
        $listing1 = Listing::factory()->create();
        $listing2 = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing1->id,
            'locale' => 'fr',
            'title' => 'Titre 1'
        ]);
        
        ListingTranslation::create([
            'listing_id' => $listing2->id,
            'locale' => 'fr',
            'title' => 'Titre 2'
        ]);
        
        ListingTranslation::create([
            'listing_id' => $listing1->id,
            'locale' => 'es',
            'title' => 'Título 1'
        ]);
        
        $stats = $this->service->getTranslationStats();
        $this->assertEquals(2, $stats['Listing']['fr']);
        $this->assertEquals(1, $stats['Listing']['es']);
        $this->assertEquals(0, $stats['Listing']['en']);
    }

    public function testGetMissingTranslations()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre'
        ]);
        
        $missing = $this->service->getMissingTranslations($listing);
        $this->assertContains('en', $missing);
        $this->assertContains('es', $missing);
        $this->assertNotContains('fr', $missing);
    }

    public function testSyncWithFallback()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'en',
            'title' => 'English Title',
            'description' => 'English Description'
        ]);
        
        $result = $this->service->syncWithFallback($listing);
        $this->assertTrue($result);
        
        // Should have created fr and es translations from en
        $frTranslation = $listing->translations()->where('locale', 'fr')->first();
        $this->assertNotNull($frTranslation);
        $this->assertEquals('English Title', $frTranslation->title);
        
        $esTranslation = $listing->translations()->where('locale', 'es')->first();
        $this->assertNotNull($esTranslation);
        $this->assertEquals('English Title', $esTranslation->title);
    }

    public function testBulkTranslate()
    {
        $listing1 = Listing::factory()->create();
        $listing2 = Listing::factory()->create();
        
        $translations = [
            'fr' => [
                'title' => 'Titre Général',
                'description' => 'Description Générale'
            ]
        ];
        
        $result = $this->service->bulkTranslate([$listing1, $listing2], $translations);
        $this->assertTrue($result);
        
        $this->assertEquals('Titre Général', $listing1->getTranslation('title', 'fr'));
        $this->assertEquals('Titre Général', $listing2->getTranslation('title', 'fr'));
    }

    public function testInvalidModelThrowsException()
    {
        $this->expectException(\InvalidArgumentException::class);
        
        // Create a model without translations relationship
        $invalidModel = new \stdClass();
        $this->service->getOrCreateTranslation($invalidModel, 'fr');
    }
}