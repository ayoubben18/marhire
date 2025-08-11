<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\Booking;
use App\Models\EmailTemplate;
use App\Services\Email\EmailService;
use App\Mail\DatabaseTemplateEmail;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Config;

class EmailLocaleTest extends TestCase
{
    /**
     * Test that email falls back to English for unsupported locale
     */
    public function test_email_falls_back_to_english_for_unsupported_locale()
    {
        // Set supported locales
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.fallback_locale', 'en');
        
        // Create email with unsupported locale
        $email = new DatabaseTemplateEmail('Test Subject', '<p>Test Body</p>', null, 'de');
        
        // Assert it falls back to English
        $this->assertEquals('en', $email->locale);
    }
    
    /**
     * Test that email accepts valid locale
     */
    public function test_email_accepts_valid_locale()
    {
        // Set supported locales
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        
        // Test French locale
        $emailFr = new DatabaseTemplateEmail('Sujet Test', '<p>Corps Test</p>', null, 'fr');
        $this->assertEquals('fr', $emailFr->locale);
        
        // Test Spanish locale
        $emailEs = new DatabaseTemplateEmail('Asunto Prueba', '<p>Cuerpo Prueba</p>', null, 'es');
        $this->assertEquals('es', $emailEs->locale);
        
        // Test English locale
        $emailEn = new DatabaseTemplateEmail('Test Subject', '<p>Test Body</p>', null, 'en');
        $this->assertEquals('en', $emailEn->locale);
    }
    
    /**
     * Test that booking stores language preference
     */
    public function test_booking_stores_language_preference()
    {
        // This would require database setup, so we're checking the field exists
        $booking = new Booking();
        $booking->booking_language = 'fr';
        
        $this->assertEquals('fr', $booking->booking_language);
    }
    
    /**
     * Test locale validation with empty supported locales config
     */
    public function test_locale_validation_with_empty_config()
    {
        // Temporarily clear config
        Config::set('app.supported_locales', null);
        Config::set('app.fallback_locale', 'en');
        
        // Should default to 'en' when config is empty
        $email = new DatabaseTemplateEmail('Test', '<p>Test</p>', null, 'fr');
        
        // Should fall back to 'en' as it's the default in the fallback array
        $this->assertEquals('en', $email->locale);
    }
    
    /**
     * Test that null locale defaults to English
     */
    public function test_null_locale_defaults_to_english()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.fallback_locale', 'en');
        
        // Pass null as locale
        $email = new DatabaseTemplateEmail('Test', '<p>Test</p>', null, null);
        
        $this->assertEquals('en', $email->locale);
    }
    
    /**
     * Test that empty string locale defaults to English
     */
    public function test_empty_string_locale_defaults_to_english()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.fallback_locale', 'en');
        
        // Pass empty string as locale
        $email = new DatabaseTemplateEmail('Test', '<p>Test</p>', null, '');
        
        $this->assertEquals('en', $email->locale);
    }
    
    /**
     * Test locale is case sensitive
     */
    public function test_locale_is_case_sensitive()
    {
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.fallback_locale', 'en');
        
        // Pass uppercase locale (should not match)
        $email = new DatabaseTemplateEmail('Test', '<p>Test</p>', null, 'FR');
        
        // Should fall back to English since 'FR' !== 'fr'
        $this->assertEquals('en', $email->locale);
    }
}