<?php

namespace App\Services;
use App\Models\Article;
use App\Models\Listing;
use App\Models\Page;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use App\Models\Agency;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

class SEOService
{
    protected $hreflangService;
    
    public function __construct()
    {
        $this->hreflangService = new HreflangService();
    }
    public function generateSlug($postType, $postTitle, $excludeId = null)
    {
        // If no title provided or empty, return null
        if (empty($postTitle) || trim($postTitle) === '') {
            return null;
        }
        
        switch ($postType) {
            case 'agency':
                $slug = Str::slug($postTitle);
                // If slug is empty after processing, use a fallback
                if (empty($slug)) {
                    $slug = 'agency-' . uniqid();
                }
                $originalSlug = $slug;
                $i = 1;

                $query = Agency::where('slug', $slug);
                if ($excludeId) {
                    $query->where('id', '!=', $excludeId);
                }
                
                while ($query->exists()) {
                    $slug = $originalSlug . '-' . $i;
                    $i++;
                    
                    $query = Agency::where('slug', $slug);
                    if ($excludeId) {
                        $query->where('id', '!=', $excludeId);
                    }
                }
                return $slug;
             case 'listing':
                $slug = Str::slug($postTitle);
                // If slug is empty after processing, use a fallback
                if (empty($slug)) {
                    $slug = 'listing-' . uniqid();
                }
                $originalSlug = $slug;
                $i = 1;

                $query = Listing::where('slug', $slug);
                if ($excludeId) {
                    $query->where('id', '!=', $excludeId);
                }
                
                while ($query->exists()) {
                    $slug = $originalSlug . '-' . $i;
                    $i++;
                    
                    $query = Listing::where('slug', $slug);
                    if ($excludeId) {
                        $query->where('id', '!=', $excludeId);
                    }
                }
                return $slug;
        }

        return null;
    }

    public function getPage($slug, $type = 'page')
    {
        try {
            if ($type === 'article') {
                if (!Schema::hasTable('articles')) { return null; }
                return Article::where('slug', $slug)->withCurrentTranslations()->first();
            } elseif ($type === 'listing') {
                if (!Schema::hasTable('listings')) { return null; }
                return Listing::where('slug', $slug)->withCurrentTranslations()->first();
            } else {
                if (!Schema::hasTable('pages')) { return null; }
                $page = Page::where('slug', $slug)->withCurrentTranslations()->first();
                
                // Add translated_fields for API consumption
                if ($page) {
                    $page->translated_fields = $page->getCurrentTranslatedData();
                }
                
                return $page;
            }
        } catch (\Throwable $e) {
            // Fail safe: never break navigation due to missing tables/content
            return null;
        }
    }
    
    /**
     * Generate complete SEO meta tags for a page
     */
    public function generateMetaTags($data = [])
    {
        $locale = App::getLocale();
        $currentUrl = URL::current();
        
        $metaTags = [];
        
        // Basic meta tags
        if (isset($data['title'])) {
            $metaTags['title'] = $data['title'];
        }
        
        if (isset($data['description'])) {
            $metaTags['description'] = $data['description'];
        }
        
        if (isset($data['keywords'])) {
            $metaTags['keywords'] = $data['keywords'];
        }
        
        // Canonical URL
        $metaTags['canonical'] = $this->hreflangService->getCanonicalUrl($currentUrl, $locale);
        
        // Hreflang tags
        $metaTags['hreflang'] = $this->hreflangService->generateHreflangTags($currentUrl, $locale);
        
        // Locale meta
        $localeMeta = $this->hreflangService->getLocaleMeta($locale);
        $metaTags['og_locale'] = $localeMeta['og_locale'];
        $metaTags['og_locale_alternate'] = $localeMeta['alternate_locales'];
        
        // OpenGraph tags
        $metaTags['og_title'] = $data['og_title'] ?? $data['title'] ?? '';
        $metaTags['og_description'] = $data['og_description'] ?? $data['description'] ?? '';
        $metaTags['og_url'] = $currentUrl;
        $metaTags['og_type'] = $data['og_type'] ?? 'website';
        
        if (isset($data['og_image'])) {
            $metaTags['og_image'] = $data['og_image'];
        }
        
        // Twitter Card tags
        $metaTags['twitter_card'] = $data['twitter_card'] ?? 'summary_large_image';
        $metaTags['twitter_title'] = $data['twitter_title'] ?? $metaTags['og_title'];
        $metaTags['twitter_description'] = $data['twitter_description'] ?? $metaTags['og_description'];
        
        if (isset($data['twitter_image'])) {
            $metaTags['twitter_image'] = $data['twitter_image'];
        }
        
        return $metaTags;
    }
    
    /**
     * Generate structured data (JSON-LD) for listings
     */
    public function generateStructuredData($type, $data)
    {
        $locale = App::getLocale();
        
        switch ($type) {
            case 'listing':
                return $this->generateListingSchema($data, $locale);
            case 'organization':
                return $this->generateOrganizationSchema($data, $locale);
            case 'breadcrumb':
                return $this->generateBreadcrumbSchema($data, $locale);
            default:
                return null;
        }
    }
    
    /**
     * Generate schema markup for listings
     */
    protected function generateListingSchema($listing, $locale)
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Product',
            'name' => $listing->title,
            'description' => $listing->description,
            'inLanguage' => $locale,
        ];
        
        if ($listing->images && count($listing->images) > 0) {
            $schema['image'] = asset('images/listings/' . $listing->images[0]);
        }
        
        if ($listing->price) {
            $schema['offers'] = [
                '@type' => 'Offer',
                'price' => $listing->price,
                'priceCurrency' => 'MAD',
                'availability' => 'https://schema.org/InStock'
            ];
        }
        
        if ($listing->agency) {
            $schema['brand'] = [
                '@type' => 'Organization',
                'name' => $listing->agency->name
            ];
        }
        
        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }
    
    /**
     * Generate organization schema
     */
    protected function generateOrganizationSchema($data, $locale)
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'Organization',
            'name' => $data['name'] ?? config('app.name'),
            'url' => config('app.url'),
            'inLanguage' => $locale
        ];
        
        if (isset($data['logo'])) {
            $schema['logo'] = $data['logo'];
        }
        
        if (isset($data['description'])) {
            $schema['description'] = $data['description'];
        }
        
        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }
    
    /**
     * Generate breadcrumb schema
     */
    protected function generateBreadcrumbSchema($items, $locale)
    {
        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BreadcrumbList',
            'itemListElement' => []
        ];
        
        foreach ($items as $position => $item) {
            $schema['itemListElement'][] = [
                '@type' => 'ListItem',
                'position' => $position + 1,
                'name' => $item['name'],
                'item' => $item['url']
            ];
        }
        
        return '<script type="application/ld+json">' . json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }
    
    /**
     * Get translated meta data with fallback
     */
    public function getTranslatedMeta($model, $fields = ['meta_title', 'meta_description'])
    {
        $locale = App::getLocale();
        $meta = [];
        
        foreach ($fields as $field) {
            // Try to get translated value
            if (method_exists($model, 'getTranslation')) {
                $meta[$field] = $model->getTranslation($field, $locale);
            } elseif (isset($model->$field)) {
                $meta[$field] = $model->$field;
            }
            
            // Fallback to default field if translation is empty
            if (empty($meta[$field])) {
                $fallbackField = str_replace('meta_', '', $field);
                if (isset($model->$fallbackField)) {
                    $meta[$field] = $model->$fallbackField;
                }
            }
        }
        
        return $meta;
    }
    
    /**
     * Ensure URL has locale prefix
     */
    public function ensureLocaleInUrl($url)
    {
        $locale = App::getLocale();
        return $this->hreflangService->ensureLocalePrefix($url, $locale);
    }
}