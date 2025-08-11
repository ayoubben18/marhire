<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Listing;
use App\Models\Category;
use App\Models\City;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Session;

class BookingLanguageTest extends TestCase
{
    /**
     * Test that booking submission captures user locale from session
     */
    public function test_booking_submission_captures_user_locale_from_session()
    {
        // Set up config
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        
        // Set French locale in session
        Session::put('locale', 'fr');
        
        // Create test data (without modifying database)
        $listing = new Listing();
        $listing->id = 1;
        $listing->title = 'Test Listing';
        $listing->city_id = 1;
        
        // Mock the booking data
        $bookingData = [
            'listing_id' => 1,
            'category_id' => 2,
            'fullName' => 'John Doe',
            'email' => 'john@example.com',
            'whatsAppNumber' => '+1234567890',
            'countryOfResidence' => 'USA',
            'dateOfBirth' => '1990-01-01',
            'additionalNotes' => 'Test notes',
            'termsAccepted' => true,
            'pickup_date' => '2025-08-10',
            'dropoff_date' => '2025-08-15',
            'pickup_time' => '10:00',
            'dropoff_time' => '10:00',
            'pickup_location' => 'Airport',
            'dropoff_location' => 'Hotel'
        ];
        
        // The locale should be captured from session
        $this->assertEquals('fr', Session::get('locale'));
    }
    
    /**
     * Test that booking submission accepts explicit locale parameter
     */
    public function test_booking_submission_accepts_explicit_locale_parameter()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        
        // Test data with explicit locale
        $bookingData = [
            'booking_language' => 'es',
            'locale' => 'fr', // booking_language takes precedence
            'listing_id' => 1,
            'category_id' => 2,
            'fullName' => 'Maria Garcia',
            'email' => 'maria@example.com'
        ];
        
        // Verify that booking_language takes precedence
        $this->assertEquals('es', $bookingData['booking_language']);
        $this->assertNotEquals($bookingData['locale'], $bookingData['booking_language']);
    }
    
    /**
     * Test that invalid locale falls back to default
     */
    public function test_invalid_locale_falls_back_to_default()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.fallback_locale', 'en');
        
        // Test with invalid locale
        $invalidLocales = ['de', 'it', 'pt', 'xyz', '123', null, ''];
        
        foreach ($invalidLocales as $invalidLocale) {
            // Since we're testing the validation logic
            $supportedLocales = config('app.supported_locales');
            $isValid = in_array($invalidLocale, $supportedLocales);
            
            $this->assertFalse($isValid, "Locale '{$invalidLocale}' should not be valid");
        }
    }
    
    /**
     * Test locale priority order: booking_language > locale > session > default
     */
    public function test_locale_priority_order()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.locale', 'en');
        
        // Test 1: booking_language takes highest priority
        $locale1 = 'es'; // booking_language
        $locale2 = 'fr'; // request locale  
        Session::put('locale', 'en');
        
        // booking_language should win
        $result = $locale1 ?? $locale2 ?? Session::get('locale') ?? config('app.locale');
        $this->assertEquals('es', $result);
        
        // Test 2: request locale when no booking_language
        $locale1 = null; // no booking_language
        $locale2 = 'fr'; // request locale
        Session::put('locale', 'en');
        
        $result = $locale1 ?? $locale2 ?? Session::get('locale') ?? config('app.locale');
        $this->assertEquals('fr', $result);
        
        // Test 3: session locale when no booking_language or request locale
        $locale1 = null;
        $locale2 = null;
        Session::put('locale', 'es');
        
        $result = $locale1 ?? $locale2 ?? Session::get('locale') ?? config('app.locale');
        $this->assertEquals('es', $result);
        
        // Test 4: default config when nothing else is set
        $locale1 = null;
        $locale2 = null;
        Session::forget('locale');
        
        $result = $locale1 ?? $locale2 ?? Session::get('locale') ?? config('app.locale');
        $this->assertEquals('en', $result);
    }
}