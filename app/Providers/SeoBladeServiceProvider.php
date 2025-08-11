<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;
use App\Services\HreflangService;
use App\Services\SEOService;

class SeoBladeServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        // @hreflang directive
        Blade::directive('hreflang', function ($expression) {
            return "<?php 
                \$hreflangService = app(\App\Services\HreflangService::class);
                \$currentUrl = url()->current();
                \$currentLocale = app()->getLocale();
                echo \$hreflangService->generateHreflangTags(\$currentUrl, \$currentLocale);
            ?>";
        });
        
        // @seometa directive
        Blade::directive('seometa', function ($expression) {
            return "<?php 
                \$seoService = app(\App\Services\SEOService::class);
                \$metaTags = \$seoService->generateMetaTags($expression);
                echo view('components.seo-meta', ['metaTags' => \$metaTags])->render();
            ?>";
        });
        
        // @canonical directive
        Blade::directive('canonical', function ($expression) {
            $url = $expression ?: 'url()->current()';
            return "<?php echo '<link rel=\"canonical\" href=\"' . $url . '\" />'; ?>";
        });
        
        // @opengraph directive
        Blade::directive('opengraph', function ($expression) {
            return "<?php 
                \$data = $expression;
                echo view('components.opengraph-meta', ['data' => \$data])->render();
            ?>";
        });
        
        // @twittercard directive
        Blade::directive('twittercard', function ($expression) {
            return "<?php 
                \$data = $expression;
                echo view('components.twitter-card', ['data' => \$data])->render();
            ?>";
        });
        
        // @structureddata directive
        Blade::directive('structureddata', function ($expression) {
            return "<?php 
                \$seoService = app(\App\Services\SEOService::class);
                list(\$type, \$data) = $expression;
                echo \$seoService->generateStructuredData(\$type, \$data);
            ?>";
        });
    }
}