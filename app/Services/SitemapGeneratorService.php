<?php

namespace App\Services;

use App\Models\Agency;
use App\Models\Article;
use App\Models\City;
use App\Models\Listing;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use XMLWriter;

class SitemapGeneratorService
{
    const CACHE_TTL_SECONDS = 86400; // 24 hours
    const CHUNK_SIZE = 100;
    const MAX_URLS_PER_SITEMAP = 50000;
    const LOCK_TIMEOUT_SECONDS = 300; // 5 minutes
    
    private array $supportedLocales;
    private string $baseUrl;
    private int $urlCount = 0;
    private array $categories = ['car-rental', 'private-driver', 'boats', 'things-to-do'];
    
    public function __construct()
    {
        $this->supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $this->baseUrl = rtrim(config('app.url'), '/');
    }
    
    /**
     * Generate all language sitemaps with proper locking
     */
    public function generateAllSitemaps(): array
    {
        $lockKey = 'sitemap_generation_lock';
        
        // Check if generation is already in progress
        if (Cache::has($lockKey)) {
            throw new \Exception('Sitemap generation already in progress');
        }
        
        try {
            // Set lock to prevent concurrent generation
            Cache::put($lockKey, true, self::LOCK_TIMEOUT_SECONDS);
            
            Log::info('Starting sitemap generation', [
                'locales' => $this->supportedLocales,
                'base_url' => $this->baseUrl,
                'memory_start' => memory_get_usage(true)
            ]);
            
            $results = [];
            
            // Generate language-specific sitemaps
            foreach ($this->supportedLocales as $locale) {
                $this->urlCount = 0;
                $this->generateLanguageSitemap($locale);
                $results[$locale] = $this->urlCount;
                
                Log::info("Generated sitemap for locale: {$locale}", [
                    'urls' => $this->urlCount,
                    'memory_usage' => memory_get_usage(true)
                ]);
            }
            
            // Generate sitemap index
            $this->generateSitemapIndex();
            
            // Update robots.txt
            $this->updateRobotsTxt();
            
            // Cache the generation timestamp
            Cache::put('sitemap_generated_at', now(), self::CACHE_TTL_SECONDS);
            
            Log::info('Sitemap generation completed', [
                'results' => $results,
                'memory_peak' => memory_get_peak_usage(true)
            ]);
            
            return $results;
            
        } catch (\Exception $e) {
            Log::error('Sitemap generation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            throw $e;
        } finally {
            // Always release the lock
            Cache::forget($lockKey);
        }
    }
    
    /**
     * Generate sitemap for a specific language using streaming XML
     */
    private function generateLanguageSitemap(string $locale): void
    {
        $filename = public_path("sitemap-{$locale}.xml");
        
        // Use XMLWriter for streaming to avoid memory issues
        $writer = new XMLWriter();
        $writer->openUri($filename);
        $writer->startDocument('1.0', 'UTF-8');
        $writer->setIndent(true);
        
        // Start urlset with namespaces
        $writer->startElement('urlset');
        $writer->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $writer->writeAttribute('xmlns:xhtml', 'http://www.w3.org/1999/xhtml');
        
        // Process static pages
        $this->addStaticPages($writer, $locale);
        
        // Process categories
        $this->addCategoryPages($writer, $locale);
        
        // Process cities (chunked)
        $this->addCityPages($writer, $locale);
        
        // Process category + city combinations
        $this->addCategoryCityPages($writer, $locale);
        
        // Process articles (chunked)
        $this->addArticlePages($writer, $locale);
        
        // Process listings (chunked, with translation check)
        $this->addListingPages($writer, $locale);
        
        // Process agencies (chunked)
        $this->addAgencyPages($writer, $locale);
        
        // Close urlset
        $writer->endElement();
        $writer->endDocument();
        $writer->flush();
    }
    
    /**
     * Add static pages to sitemap
     */
    private function addStaticPages(XMLWriter $writer, string $locale): void
    {
        $staticPages = [
            '/' => ['priority' => 1.0, 'changefreq' => 'daily'],
            '/about-us' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/how-we-work' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/list-your-property' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/faq' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/support' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/blog' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/terms-conditions' => ['priority' => 0.7, 'changefreq' => 'yearly'],
            '/privacy-policy' => ['priority' => 0.7, 'changefreq' => 'yearly'],
            '/cookie-policy' => ['priority' => 0.7, 'changefreq' => 'yearly'],
            '/cancellation-policy' => ['priority' => 0.7, 'changefreq' => 'yearly'],
            '/insurance-conditions' => ['priority' => 0.7, 'changefreq' => 'yearly'],
        ];
        
        foreach ($staticPages as $path => $settings) {
            if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                break;
            }
            $this->writeUrl($writer, $path, $locale, $settings);
        }
    }
    
    /**
     * Add category pages to sitemap
     */
    private function addCategoryPages(XMLWriter $writer, string $locale): void
    {
        foreach ($this->categories as $category) {
            if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                break;
            }
            
            $path = "/category/{$category}";
            $this->writeUrl($writer, $path, $locale, [
                'priority' => 0.8,
                'changefreq' => 'weekly'
            ]);
        }
    }
    
    /**
     * Add city pages using chunked queries
     */
    private function addCityPages(XMLWriter $writer, string $locale): void
    {
        City::select('id', 'city_name', 'updated_at')
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($cities) use ($writer, $locale) {
                foreach ($cities as $city) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false; // Stop chunking
                    }
                    
                    $path = '/city/' . strtolower($city->city_name);
                    $this->writeUrl($writer, $path, $locale, [
                        'priority' => 0.8,
                        'changefreq' => 'weekly',
                        'lastmod' => $city->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Add category + city combination pages
     */
    private function addCategoryCityPages(XMLWriter $writer, string $locale): void
    {
        foreach ($this->categories as $category) {
            City::select('id', 'city_name')
                ->orderBy('id')
                ->chunk(self::CHUNK_SIZE, function ($cities) use ($writer, $locale, $category) {
                    foreach ($cities as $city) {
                        if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                            return false;
                        }
                        
                        $path = "/category/{$category}/city/" . strtolower($city->city_name);
                        $this->writeUrl($writer, $path, $locale, [
                            'priority' => 0.8,
                            'changefreq' => 'weekly'
                        ]);
                    }
                });
        }
    }
    
    /**
     * Add article pages using chunked queries
     */
    private function addArticlePages(XMLWriter $writer, string $locale): void
    {
        Article::select('id', 'slug', 'updated_at')
            ->published() // Assuming there's a scope for published articles
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($articles) use ($writer, $locale) {
                foreach ($articles as $article) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/article/' . strtolower($article->slug);
                    $this->writeUrl($writer, $path, $locale, [
                        'priority' => 0.8,
                        'changefreq' => 'monthly',
                        'lastmod' => $article->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Add listing pages with translation check
     */
    private function addListingPages(XMLWriter $writer, string $locale): void
    {
        $query = Listing::select('listings.id', 'listings.slug', 'listings.updated_at');
        
        // For non-English locales, check if translation exists
        if ($locale !== 'en') {
            $query->whereExists(function ($q) use ($locale) {
                $q->select('id')
                    ->from('listing_translations')
                    ->whereColumn('listing_translations.listing_id', 'listings.id')
                    ->where('listing_translations.locale', $locale)
                    ->whereNotNull('listing_translations.title'); // Must have at least a title
            });
        }
        
        $query->orderBy('listings.id')
            ->chunk(self::CHUNK_SIZE, function ($listings) use ($writer, $locale) {
                foreach ($listings as $listing) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/details/' . strtolower($listing->slug);
                    $this->writeUrl($writer, $path, $locale, [
                        'priority' => 0.9,
                        'changefreq' => 'monthly',
                        'lastmod' => $listing->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Add agency pages using chunked queries
     */
    private function addAgencyPages(XMLWriter $writer, string $locale): void
    {
        Agency::select('id', 'slug', 'updated_at')
            ->where('status', 'Active')
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($agencies) use ($writer, $locale) {
                foreach ($agencies as $agency) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/agency/' . strtolower($agency->slug);
                    $this->writeUrl($writer, $path, $locale, [
                        'priority' => 0.8,
                        'changefreq' => 'monthly',
                        'lastmod' => $agency->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Write a single URL entry with hreflang alternates
     */
    private function writeUrl(XMLWriter $writer, string $path, string $currentLocale, array $settings): void
    {
        $this->urlCount++;
        
        $writer->startElement('url');
        
        // Main URL with locale prefix
        $localePrefix = $currentLocale === 'en' ? '' : "/{$currentLocale}";
        $fullUrl = $this->baseUrl . $localePrefix . $path;
        $writer->writeElement('loc', $fullUrl);
        
        // Add alternate language links
        foreach ($this->supportedLocales as $locale) {
            $altPrefix = $locale === 'en' ? '' : "/{$locale}";
            $altUrl = $this->baseUrl . $altPrefix . $path;
            
            $writer->startElement('xhtml:link');
            $writer->writeAttribute('rel', 'alternate');
            $writer->writeAttribute('hreflang', $this->escapeXmlAttribute($locale));
            $writer->writeAttribute('href', $this->escapeXmlAttribute($altUrl));
            $writer->endElement();
        }
        
        // Add x-default for English
        $writer->startElement('xhtml:link');
        $writer->writeAttribute('rel', 'alternate');
        $writer->writeAttribute('hreflang', 'x-default');
        $writer->writeAttribute('href', $this->escapeXmlAttribute($this->baseUrl . $path));
        $writer->endElement();
        
        // Add lastmod if provided
        if (isset($settings['lastmod']) && $settings['lastmod']) {
            $writer->writeElement('lastmod', $settings['lastmod']->toW3CString());
        }
        
        // Add changefreq and priority
        $writer->writeElement('changefreq', $settings['changefreq'] ?? 'monthly');
        $writer->writeElement('priority', (string)($settings['priority'] ?? 0.5));
        
        $writer->endElement(); // url
    }
    
    /**
     * Generate sitemap index file
     */
    private function generateSitemapIndex(): void
    {
        $filename = public_path('sitemap.xml');
        
        $writer = new XMLWriter();
        $writer->openUri($filename);
        $writer->startDocument('1.0', 'UTF-8');
        $writer->setIndent(true);
        
        $writer->startElement('sitemapindex');
        $writer->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        
        foreach ($this->supportedLocales as $locale) {
            $writer->startElement('sitemap');
            $writer->writeElement('loc', "{$this->baseUrl}/sitemap-{$locale}.xml");
            $writer->writeElement('lastmod', now()->toW3CString());
            $writer->endElement();
        }
        
        $writer->endElement(); // sitemapindex
        $writer->endDocument();
        $writer->flush();
    }
    
    /**
     * Update robots.txt with sitemap location
     */
    private function updateRobotsTxt(): void
    {
        $content = "User-agent: *\nDisallow:\n\n# Sitemap\nSitemap: {$this->baseUrl}/sitemap.xml\n";
        
        $robotsPath = public_path('robots.txt');
        if (!file_put_contents($robotsPath, $content)) {
            throw new \Exception('Failed to update robots.txt');
        }
    }
    
    /**
     * Properly escape XML attributes to prevent XSS
     */
    private function escapeXmlAttribute(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }
    
    /**
     * Get sitemap generation status
     */
    public function getStatus(): array
    {
        return [
            'is_generating' => Cache::has('sitemap_generation_lock'),
            'last_generated' => Cache::get('sitemap_generated_at'),
            'cache_expires' => Cache::has('sitemap_generated_at') 
                ? now()->addSeconds(self::CACHE_TTL_SECONDS - now()->diffInSeconds(Cache::get('sitemap_generated_at')))
                : null
        ];
    }
}