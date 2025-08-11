<?php

namespace Tests\Unit;

use App\Http\Middleware\LocaleMiddleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class LocaleMiddlewareTest extends TestCase
{
    protected LocaleMiddleware $middleware;

    protected function setUp(): void
    {
        parent::setUp();
        $this->middleware = new LocaleMiddleware();
    }

    public function testSetsLocaleFromUrlPrefix()
    {
        $request = Request::create('/fr/test', 'GET');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('fr', App::getLocale());
        $this->assertEquals('fr', Session::get('locale'));
    }

    public function testFallsBackToSessionLocale()
    {
        Session::put('locale', 'es');
        $request = Request::create('/test', 'GET');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('es', App::getLocale());
    }

    public function testDetectsLocaleFromAcceptLanguageHeader()
    {
        $request = Request::create('/test', 'GET');
        $request->headers->set('Accept-Language', 'fr-FR,fr;q=0.9,en;q=0.8');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('fr', App::getLocale());
    }

    public function testFallsBackToDefaultLocale()
    {
        $request = Request::create('/test', 'GET');
        $request->headers->set('Accept-Language', 'de-DE,de;q=0.9');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('en', App::getLocale());
    }

    public function testIgnoresUnsupportedLocaleInUrl()
    {
        $request = Request::create('/de/test', 'GET');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('en', App::getLocale());
    }

    public function testSetsUrlDefaults()
    {
        $request = Request::create('/es/test', 'GET');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $defaults = URL::getDefaultParameters();
        $this->assertArrayHasKey('locale', $defaults);
        $this->assertEquals('es', $defaults['locale']);
    }

    public function testStoresLocaleInSession()
    {
        $request = Request::create('/fr/test', 'GET');
        
        $response = $this->middleware->handle($request, function ($req) {
            return response('OK');
        });

        $this->assertEquals('fr', Session::get('locale'));
    }
}