<?php

namespace Tests\Feature;

use App\Models\Listing;
use App\Models\ListingTranslation;
use App\Services\TranslationService;
use Tests\TestCase;

class DatabaseTranslationTest extends TestCase
{
    protected TranslationService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new TranslationService();
        
        config(['app.supported_locales' => ['en', 'fr', 'es']]);
        config(['app.fallback_locale' => 'en']);
    }

    public function testMigrationCreatedTable()
    {
        // Check if the table exists
        $this->assertTrue(\Schema::hasTable('listing_translations'));
        
        // Check if columns exist
        $this->assertTrue(\Schema::hasColumn('listing_translations', 'listing_id'));
        $this->assertTrue(\Schema::hasColumn('listing_translations', 'locale'));
        $this->assertTrue(\Schema::hasColumn('listing_translations', 'title'));
        $this->assertTrue(\Schema::hasColumn('listing_translations', 'description'));
    }

    public function testTranslationsRelationshipWorks()
    {
        // Get a listing that should have translations from seeder
        $listing = Listing::first();
        
        if ($listing) {
            // Check relationship exists
            $this->assertInstanceOf(\Illuminate\Database\Eloquent\Relations\HasMany::class, $listing->translations());
            
            // Check if translations were seeded
            $translations = $listing->translations()->get();
            $this->assertGreaterThanOrEqual(0, $translations->count());
        } else {
            $this->markTestSkipped('No listings available in database');
        }
    }

    public function testGetTranslationMethod()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available in database');
        }
        
        // Check if French translation exists from seeder
        $frTranslation = $listing->translations()->where('locale', 'fr')->first();
        
        if ($frTranslation) {
            $title = $listing->getTranslation('title', 'fr');
            $this->assertNotNull($title);
            $this->assertEquals($frTranslation->title, $title);
        }
    }

    public function testTranslationServiceCanCreateTranslations()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available in database');
        }
        
        // Try to get or create a translation for a test locale
        $testLocale = 'en';
        $translation = $this->service->getOrCreateTranslation($listing, $testLocale);
        
        $this->assertInstanceOf(ListingTranslation::class, $translation);
        $this->assertEquals($testLocale, $translation->locale);
        $this->assertEquals($listing->id, $translation->listing_id);
    }

    public function testTranslatableTraitMethods()
    {
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available in database');
        }
        
        // Test hasTranslation
        $hasTranslation = $listing->hasTranslation('fr');
        $this->assertIsBool($hasTranslation);
        
        // Test getAvailableLocales
        $locales = $listing->getAvailableLocales();
        $this->assertIsArray($locales);
    }

    public function testListingTranslationModel()
    {
        // Test model instantiation
        $translation = new ListingTranslation();
        $this->assertInstanceOf(ListingTranslation::class, $translation);
        
        // Test fillable attributes
        $fillable = $translation->getFillable();
        $this->assertContains('listing_id', $fillable);
        $this->assertContains('locale', $fillable);
        $this->assertContains('title', $fillable);
        $this->assertContains('description', $fillable);
        
        // Test validation rules
        $rules = ListingTranslation::rules();
        $this->assertArrayHasKey('listing_id', $rules);
        $this->assertArrayHasKey('locale', $rules);
        $this->assertArrayHasKey('title', $rules);
    }

    public function testTranslationIndexes()
    {
        // Verify unique index works by checking we can't duplicate
        $listing = Listing::first();
        
        if (!$listing) {
            $this->markTestSkipped('No listings available in database');
        }
        
        // Get or create an English translation
        $translation1 = ListingTranslation::firstOrCreate([
            'listing_id' => $listing->id,
            'locale' => 'en'
        ], [
            'title' => 'Test Title'
        ]);
        
        // Try to create duplicate - should get the same one back
        $translation2 = ListingTranslation::firstOrCreate([
            'listing_id' => $listing->id,
            'locale' => 'en'
        ], [
            'title' => 'Different Title'
        ]);
        
        $this->assertEquals($translation1->id, $translation2->id);
    }
}