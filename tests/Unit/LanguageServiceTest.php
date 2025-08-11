<?php

namespace Tests\Unit;

use App\Services\LanguageService;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Tests\TestCase;

class LanguageServiceTest extends TestCase
{
    protected LanguageService $service;

    protected function setUp(): void
    {
        parent::setUp();
        $this->service = new LanguageService();
        
        Config::set('app.supported_locales', ['en', 'fr', 'es']);
        Config::set('app.locales', [
            'en' => 'English',
            'fr' => 'Français',
            'es' => 'Español',
        ]);
    }

    public function testGetCurrentLocale()
    {
        App::setLocale('fr');
        $this->assertEquals('fr', $this->service->getCurrentLocale());
    }

    public function testGetSupportedLocales()
    {
        $locales = $this->service->getSupportedLocales();
        $this->assertEquals(['en', 'fr', 'es'], $locales);
    }

    public function testGetLocalesConfig()
    {
        $config = $this->service->getLocalesConfig();
        $this->assertArrayHasKey('en', $config);
        $this->assertArrayHasKey('fr', $config);
        $this->assertArrayHasKey('es', $config);
        $this->assertEquals('English', $config['en']);
        $this->assertEquals('Français', $config['fr']);
        $this->assertEquals('Español', $config['es']);
    }

    public function testGetLocaleName()
    {
        $this->assertEquals('English', $this->service->getLocaleName('en'));
        $this->assertEquals('Français', $this->service->getLocaleName('fr'));
        $this->assertEquals('Español', $this->service->getLocaleName('es'));
        $this->assertEquals('de', $this->service->getLocaleName('de')); // Unsupported locale
    }

    public function testIsLocaleSupported()
    {
        $this->assertTrue($this->service->isLocaleSupported('en'));
        $this->assertTrue($this->service->isLocaleSupported('fr'));
        $this->assertTrue($this->service->isLocaleSupported('es'));
        $this->assertFalse($this->service->isLocaleSupported('de'));
    }

    public function testSetLocale()
    {
        $this->assertTrue($this->service->setLocale('fr'));
        $this->assertEquals('fr', App::getLocale());
        $this->assertEquals('fr', Session::get('locale'));
        
        $this->assertFalse($this->service->setLocale('de')); // Unsupported locale
    }

    public function testGetAlternateLinks()
    {
        App::setLocale('en');
        $links = $this->service->getAlternateLinks();
        
        $this->assertArrayHasKey('en', $links);
        $this->assertArrayHasKey('fr', $links);
        $this->assertArrayHasKey('es', $links);
    }

    public function testGetLanguageSwitcherData()
    {
        App::setLocale('fr');
        $data = $this->service->getLanguageSwitcherData();
        
        $this->assertCount(3, $data);
        
        $frData = array_filter($data, function ($item) {
            return $item['code'] === 'fr';
        });
        $frData = array_values($frData)[0];
        
        $this->assertEquals('fr', $frData['code']);
        $this->assertEquals('Français', $frData['name']);
        $this->assertTrue($frData['active']);
    }
}