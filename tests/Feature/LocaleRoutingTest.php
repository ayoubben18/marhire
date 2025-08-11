<?php

namespace Tests\Feature;

use Tests\TestCase;

class LocaleRoutingTest extends TestCase
{
    public function testRootRedirectsToDefaultLocale()
    {
        $response = $this->get('/');
        $response->assertRedirect('/en');
    }

    public function testLocaleRoutesWork()
    {
        $response = $this->get('/en');
        $response->assertStatus(200);
        
        $response = $this->get('/fr');
        $response->assertStatus(200);
        
        $response = $this->get('/es');
        $response->assertStatus(200);
    }

    public function testUnsupportedLocaleReturns404()
    {
        $response = $this->get('/de');
        $response->assertStatus(404);
    }

    public function testLocaleSwitchingEndpoint()
    {
        $response = $this->post('/locale/switch', ['locale' => 'fr']);
        $response->assertRedirect();
        $this->assertEquals('fr', session('locale'));
        
        $response = $this->post('/locale/switch', ['locale' => 'es']);
        $response->assertRedirect();
        $this->assertEquals('es', session('locale'));
    }

    public function testLocaleSwitchingIgnoresUnsupportedLocale()
    {
        $this->withSession(['locale' => 'en']);
        
        $response = $this->post('/locale/switch', ['locale' => 'de']);
        $response->assertRedirect();
        $this->assertEquals('en', session('locale'));
    }

    public function testLocalePersistedInSession()
    {
        $response = $this->get('/fr');
        $response->assertStatus(200);
        $response->assertSessionHas('locale', 'fr');
        
        $response = $this->get('/about-us');
        $this->assertEquals('fr', app()->getLocale());
    }
}