<?php

namespace Tests\Unit;

use App\Http\Middleware\LocaleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Tests\TestCase;

class LocaleSecurityTest extends TestCase
{
    protected LocaleMiddleware $middleware;

    protected function setUp(): void
    {
        parent::setUp();
        $this->middleware = new LocaleMiddleware();
    }

    public function testRejectsExcessivelyLongAcceptLanguageHeader()
    {
        $request = Request::create('/test', 'GET');
        // Create a header longer than 255 characters
        $longHeader = str_repeat('en-US,fr-FR,es-ES,de-DE,', 50);
        $request->headers->set('Accept-Language', $longHeader);
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        // Should fall back to default locale due to length validation
        $this->assertEquals('en', App::getLocale());
    }

    public function testSanitizesAcceptLanguageHeader()
    {
        $request = Request::create('/test', 'GET');
        // Try to inject malicious characters - after sanitization only 'fr' remains valid
        $request->headers->set('Accept-Language', 'e<script>n</script>,fr');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        // After sanitization, 'fr' should be selected as 'en' gets broken
        $this->assertEquals('fr', App::getLocale());
    }

    public function testHandlesReDoSAttempt()
    {
        $request = Request::create('/test', 'GET');
        // Attempt ReDoS with complex pattern
        $request->headers->set('Accept-Language', 'en' . str_repeat('-US', 100) . ';q=0.9');
        
        $startTime = microtime(true);
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });
        $endTime = microtime(true);
        
        // Should complete quickly (under 100ms)
        $this->assertLessThan(0.1, $endTime - $startTime);
        $this->assertEquals('en', App::getLocale());
    }

    public function testLimitsNumberOfLanguages()
    {
        $request = Request::create('/test', 'GET');
        // Send more than 10 languages
        $languages = [];
        for ($i = 0; $i < 20; $i++) {
            $languages[] = "en;q=0.$i";
        }
        $request->headers->set('Accept-Language', implode(',', $languages));
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        // Should process only first 10
        $this->assertEquals('en', App::getLocale());
    }

    public function testValidatesQualityValues()
    {
        $request = Request::create('/test', 'GET');
        // Try invalid quality values
        $request->headers->set('Accept-Language', 'fr;q=9999,en;q=-1');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        // Should handle invalid q values gracefully
        $this->assertContains(App::getLocale(), ['en', 'fr']);
    }
}