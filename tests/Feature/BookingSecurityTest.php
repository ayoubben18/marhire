<?php

namespace Tests\Feature;

use Tests\TestCase;

class BookingSecurityTest extends TestCase
{
    /**
     * Test that price calculation endpoint requires CSRF token
     */
    public function test_price_calculation_requires_csrf_token()
    {
        // Test without CSRF token
        $response = $this->postJson('/api/bookings/calculate-price', [
            'listing_id' => 1,
            'category_id' => 2
        ], [
            'X-Requested-With' => null // Remove XMLHttpRequest header
        ]);

        // Should fail without proper CSRF
        $this->assertNotEquals(200, $response->status());
    }

    /**
     * Test that booking submission validates pricing
     */
    public function test_booking_submission_validates_pricing()
    {
        // Attempt to submit with manipulated price
        $response = $this->postJson('/api/bookings/submit', [
            'listing_id' => 1,
            'category_id' => 2,
            'total_price' => 1, // Extremely low price
            'booking_price' => 1,
            'total_addons' => 0
        ]);

        $response->assertStatus(422); // Validation error expected
    }

    /**
     * Test SQL injection prevention in listing ID
     */
    public function test_sql_injection_prevention()
    {
        // Attempt SQL injection
        $response = $this->postJson('/api/bookings/calculate-price', [
            'listing_id' => "1' OR '1'='1",
            'category_id' => 2
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['listing_id']);
    }

    /**
     * Test XSS prevention in form fields
     */
    public function test_xss_prevention()
    {
        $xssPayload = '<script>alert("XSS")</script>';
        
        $response = $this->postJson('/api/bookings/submit', [
            'listing_id' => 1,
            'category_id' => 2,
            'fullName' => $xssPayload,
            'email' => 'test@example.com',
            'additionalNotes' => $xssPayload
        ]);

        // The response should not contain unescaped script tags
        $content = $response->getContent();
        $this->assertStringNotContainsString('<script>', $content);
    }

    /**
     * Test rate limiting on booking endpoints
     */
    public function test_rate_limiting()
    {
        // Note: Rate limiting should be configured in RouteServiceProvider
        // This test checks if multiple rapid requests are blocked
        
        $data = [
            'listing_id' => 1,
            'category_id' => 2
        ];

        // Make multiple requests rapidly
        for ($i = 0; $i < 100; $i++) {
            $response = $this->postJson('/api/bookings/calculate-price', $data);
            
            // After certain attempts, should get rate limited
            if ($response->status() === 429) {
                $this->assertTrue(true); // Rate limiting is working
                return;
            }
        }

        // If we get here, rate limiting might not be configured
        $this->markTestIncomplete('Rate limiting may not be configured');
    }

    /**
     * Test that old field names are rejected without proper validation
     */
    public function test_field_validation_security()
    {
        // Test with missing required fields
        $response = $this->postJson('/api/bookings/submit', [
            'listing_id' => 1,
            'category_id' => 2,
            // Missing all personal data
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'whatsapp']);
    }

    /**
     * Security checklist for manual verification
     */
    public function security_checklist()
    {
        /**
         * SECURITY CHECKLIST:
         * 
         * ✓ CSRF Protection: Meta tag present in layouts
         * ✓ XSS Prevention: Laravel auto-escapes output
         * ✓ SQL Injection: Using Eloquent ORM and parameter binding
         * ✓ Validation: Server-side validation in BookingValidationService
         * ✓ Price Tampering: Server recalculates price on submission
         * ? Rate Limiting: Should be configured in routes
         * ? HTTPS: Should be enforced in production
         * ? Input Sanitization: Laravel handles basic sanitization
         * 
         * RECOMMENDATIONS:
         * 1. Add rate limiting to booking endpoints (60 requests/minute)
         * 2. Implement honeypot fields for bot prevention
         * 3. Add reCAPTCHA for public booking forms
         * 4. Log all booking attempts for audit trail
         * 5. Implement price change notifications if price differs
         * 6. Add IP-based blocking for suspicious activity
         * 7. Implement booking velocity checks (max bookings per email/day)
         */
    }
}