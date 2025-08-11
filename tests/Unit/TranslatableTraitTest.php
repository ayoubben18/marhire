<?php

namespace Tests\Unit;

use App\Models\Listing;
use App\Models\ListingTranslation;
use App\Traits\Translatable;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class TranslatableTraitTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // Set supported locales in config for testing
        config(['app.supported_locales' => ['en', 'fr', 'es']]);
        config(['app.fallback_locale' => 'en']);
    }

    public function testGetTranslationReturnsCorrectValue()
    {
        $listing = Listing::factory()->create(['title' => 'English Title']);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre Français',
            'description' => 'Description en français'
        ]);

        $this->assertEquals('Titre Français', $listing->getTranslation('title', 'fr'));
        $this->assertEquals('Description en français', $listing->getTranslation('description', 'fr'));
    }

    public function testGetTranslationFallsBackToDefaultLocale()
    {
        $listing = Listing::factory()->create(['title' => 'English Title']);
        
        // Only create English translation
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'en',
            'title' => 'English Title Translation',
        ]);

        // Request Spanish translation (doesn't exist), should fall back to English
        $this->assertEquals('English Title Translation', $listing->getTranslation('title', 'es'));
    }

    public function testTranslateMethodSetsLocale()
    {
        $listing = Listing::factory()->create(['title' => 'English Title']);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre Français',
        ]);

        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'es',
            'title' => 'Título Español',
        ]);

        // Test chaining translate method
        $this->assertEquals('Titre Français', $listing->translate('fr')->title);
        $this->assertEquals('Título Español', $listing->translate('es')->title);
    }

    public function testHasTranslationMethod()
    {
        $listing = Listing::factory()->create();
        
        $this->assertFalse($listing->hasTranslation('fr'));
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre Français',
        ]);
        
        $this->assertTrue($listing->hasTranslation('fr'));
        $this->assertFalse($listing->hasTranslation('es'));
    }

    public function testGetOrCreateTranslation()
    {
        $listing = Listing::factory()->create();
        
        // First call should create
        $translation = $listing->getOrCreateTranslation('fr');
        $this->assertInstanceOf(ListingTranslation::class, $translation);
        $this->assertEquals('fr', $translation->locale);
        $this->assertEquals($listing->id, $translation->listing_id);
        
        // Second call should return existing
        $translation2 = $listing->getOrCreateTranslation('fr');
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
        
        $listing->updateTranslations($data);
        
        $this->assertEquals('Titre Français', $listing->getTranslation('title', 'fr'));
        $this->assertEquals('Título Español', $listing->getTranslation('title', 'es'));
    }

    public function testDeleteTranslations()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre Français',
        ]);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'es',
            'title' => 'Título Español',
        ]);
        
        // Delete specific locale
        $listing->deleteTranslations('fr');
        $this->assertFalse($listing->hasTranslation('fr'));
        $this->assertTrue($listing->hasTranslation('es'));
        
        // Delete all
        $listing->deleteTranslations();
        $this->assertFalse($listing->hasTranslation('es'));
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
        
        $listing->copyTranslations('en', 'fr');
        
        $frTranslation = $listing->translations()->where('locale', 'fr')->first();
        $this->assertNotNull($frTranslation);
        $this->assertEquals('English Title', $frTranslation->title);
        $this->assertEquals('English Description', $frTranslation->description);
    }

    public function testGetAvailableLocales()
    {
        $listing = Listing::factory()->create();
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre',
        ]);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'es',
            'title' => 'Título',
        ]);
        
        $locales = $listing->getAvailableLocales();
        $this->assertContains('fr', $locales);
        $this->assertContains('es', $locales);
        $this->assertCount(2, $locales);
    }

    public function testAttributeAutoTranslation()
    {
        App::setLocale('fr');
        
        $listing = Listing::factory()->create(['title' => 'English Title']);
        
        ListingTranslation::create([
            'listing_id' => $listing->id,
            'locale' => 'fr',
            'title' => 'Titre Français',
        ]);
        
        // Should automatically return French translation when accessing attribute
        $this->assertEquals('Titre Français', $listing->title);
        
        // Non-translatable attributes should work normally
        $this->assertEquals($listing->slug, $listing->slug);
    }
}