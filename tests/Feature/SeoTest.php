<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Services\HreflangService;
use App\Services\SEOService;
use Illuminate\Support\Facades\App;

class SeoTest extends TestCase
{
    /**
     * Test HreflangService generates correct tags
     */
    public function test_hreflang_service_generates_tags()
    {
        $hreflangService = new HreflangService();
        
        $currentUrl = 'https://example.com/en/listing/test-listing';
        $currentLocale = 'en';
        
        $tags = $hreflangService->generateHreflangTags($currentUrl, $currentLocale);
        
        // Check that tags are generated
        $this->assertStringContainsString('hreflang="en"', $tags);
        $this->assertStringContainsString('hreflang="fr"', $tags);
        $this->assertStringContainsString('hreflang="es"', $tags);
        $this->assertStringContainsString('hreflang="x-default"', $tags);
    }
    
    /**
     * Test SEOService generates meta tags
     */
    public function test_seo_service_generates_meta_tags()
    {
        $seoService = new SEOService();
        
        $data = [
            'title' => 'Test Listing',
            'description' => 'This is a test listing description',
            'keywords' => 'test, listing, marhire',
            'og_image' => 'https://example.com/image.jpg'
        ];
        
        $metaTags = $seoService->generateMetaTags($data);
        
        // Check that meta tags are generated
        $this->assertEquals('Test Listing', $metaTags['title']);
        $this->assertEquals('This is a test listing description', $metaTags['description']);
        $this->assertEquals('test, listing, marhire', $metaTags['keywords']);
        $this->assertArrayHasKey('canonical', $metaTags);
        $this->assertArrayHasKey('hreflang', $metaTags);
        $this->assertArrayHasKey('og_locale', $metaTags);
    }
    
    /**
     * Test URL needs locale prefix detection
     */
    public function test_url_needs_locale_prefix()
    {
        $hreflangService = new HreflangService();
        
        // URL without locale should need prefix
        $this->assertTrue($hreflangService->needsLocalePrefix('/listing/test'));
        
        // URL with locale should not need prefix
        $this->assertFalse($hreflangService->needsLocalePrefix('/en/listing/test'));
        $this->assertFalse($hreflangService->needsLocalePrefix('/fr/listing/test'));
    }
    
    /**
     * Test locale meta generation
     */
    public function test_locale_meta_generation()
    {
        $hreflangService = new HreflangService();
        
        $localeMeta = $hreflangService->getLocaleMeta('fr');
        
        $this->assertEquals('fr_FR', $localeMeta['og_locale']);
        $this->assertEquals('fr', $localeMeta['lang']);
        $this->assertContains('en_US', $localeMeta['alternate_locales']);
        $this->assertContains('es_ES', $localeMeta['alternate_locales']);
    }
}