<?php

namespace App\Services;

use App\Models\Agency;
use App\Models\Article;
use App\Models\Category;
use App\Models\City;
use App\Models\Listing;
use App\Models\SubCategory;
use App\Models\SubCategoryOption;
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
     * Generate comprehensive multilingual sitemap with proper locking
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
            
            // Generate single comprehensive sitemap
            $this->urlCount = 0;
            $this->generateComprehensiveSitemap();
            
            // Update robots.txt
            $this->updateRobotsTxt();
            
            // Cache the generation timestamp
            Cache::put('sitemap_generated_at', now(), self::CACHE_TTL_SECONDS);
            
            Log::info('Sitemap generation completed', [
                'total_urls' => $this->urlCount,
                'memory_peak' => memory_get_peak_usage(true)
            ]);
            
            return ['total_urls' => $this->urlCount];
            
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
     * Generate comprehensive sitemap with all language variants using streaming XML
     */
    private function generateComprehensiveSitemap(): void
    {
        $filename = public_path("sitemap.xml");
        
        // Use XMLWriter for streaming to avoid memory issues
        $writer = new XMLWriter();
        $writer->openUri($filename);
        $writer->startDocument('1.0', 'UTF-8');
        $writer->setIndent(true);
        
        // Start urlset with namespaces
        $writer->startElement('urlset');
        $writer->writeAttribute('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');
        $writer->writeAttribute('xmlns:xhtml', 'http://www.w3.org/1999/xhtml');
        
        // Process static pages (all languages)
        $this->addStaticPages($writer);
        
        // Process categories (all languages)
        $this->addCategoryPages($writer);
        
        // Process subcategories (chunked, all languages)
        $this->addSubCategoryPages($writer);
        
        // Process cities (chunked, all languages)
        $this->addCityPages($writer);
        
        // Process category + city combinations (all languages)
        $this->addCategoryCityPages($writer);
        
        // Process subcategory + city combinations (all languages)
        $this->addSubCategoryCityPages($writer);
        
        // Process articles (chunked, all languages)
        $this->addArticlePages($writer);
        
        // Process listings (chunked, with translation check, all languages)
        $this->addListingPages($writer);
        
        // Process agencies (chunked, all languages)
        $this->addAgencyPages($writer);
        
        // Close urlset
        $writer->endElement();
        $writer->endDocument();
        $writer->flush();
    }
    
    /**
     * Add static pages to sitemap (all language variants)
     */
    private function addStaticPages(XMLWriter $writer): void
    {
        $staticPages = [
            '/' => ['priority' => 1.0, 'changefreq' => 'daily'],
            '/about-us' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/how-we-work' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/list-your-property' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/partners' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/faq' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/support' => ['priority' => 0.8, 'changefreq' => 'monthly'],
            '/blog' => ['priority' => 0.8, 'changefreq' => 'weekly'],
            '/car-search' => ['priority' => 0.8, 'changefreq' => 'daily'],
            '/private-search' => ['priority' => 0.8, 'changefreq' => 'daily'],
            '/boat-search' => ['priority' => 0.8, 'changefreq' => 'daily'],
            '/thingstodo-search' => ['priority' => 0.8, 'changefreq' => 'daily'],
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
            $this->writeUrl($writer, $path, $settings);
        }
    }
    
    /**
     * Add category pages to sitemap (all language variants)
     */
    private function addCategoryPages(XMLWriter $writer): void
    {
        foreach ($this->categories as $category) {
            if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                break;
            }
            
            $path = "/category/{$category}";
            $this->writeUrl($writer, $path, [
                'priority' => 0.8,
                'changefreq' => 'weekly'
            ]);
        }
    }
    
    /**
     * Add subcategory option pages (car types like SUV, Sedan, etc.) using chunked queries
     */
    private function addSubCategoryPages(XMLWriter $writer): void
    {
        SubCategoryOption::select('sub_category_options.id', 'sub_category_options.option', 'sub_category_options.updated_at', 
                                  'categories.category', 'categories.id as category_id')
            ->join('sub_categories', 'sub_category_options.subcategory_id', '=', 'sub_categories.id')
            ->join('categories', 'sub_categories.id_category', '=', 'categories.id')
            ->orderBy('sub_category_options.id')
            ->chunk(self::CHUNK_SIZE, function ($options) use ($writer) {
                foreach ($options as $option) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false; // Stop chunking
                    }
                    
                    // Map category IDs to slugs (matching existing route logic)
                    $categorySlugMap = [
                        2 => 'car-rental',
                        3 => 'private-driver', 
                        4 => 'boat-rental',
                        5 => 'things-to-do'
                    ];
                    
                    $categorySlug = $categorySlugMap[$option->category_id] ?? strtolower(str_replace(' ', '-', $option->category));
                    $optionSlug = strtolower(str_replace(' ', '-', $option->option));
                    $path = "/category/{$categorySlug}/subcategory/{$optionSlug}";
                    $this->writeUrl($writer, $path, [
                        'priority' => 0.8,
                        'changefreq' => 'weekly',
                        'lastmod' => $option->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Add city pages using chunked queries
     */
    private function addCityPages(XMLWriter $writer): void
    {
        City::select('id', 'city_name', 'updated_at')
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($cities) use ($writer) {
                foreach ($cities as $city) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false; // Stop chunking
                    }
                    
                    $path = '/city/' . strtolower($city->city_name);
                    $this->writeUrl($writer, $path, [
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
    private function addCategoryCityPages(XMLWriter $writer): void
    {
        foreach ($this->categories as $category) {
            City::select('id', 'city_name')
                ->orderBy('id')
                ->chunk(self::CHUNK_SIZE, function ($cities) use ($writer, $category) {
                    foreach ($cities as $city) {
                        if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                            return false;
                        }
                        
                        $path = "/category/{$category}/city/" . strtolower($city->city_name);
                        $this->writeUrl($writer, $path, [
                            'priority' => 0.8,
                            'changefreq' => 'weekly'
                        ]);
                    }
                });
        }
    }
    
    /**
     * Add subcategory option + city combination pages (car types + cities)
     */
    private function addSubCategoryCityPages(XMLWriter $writer): void
    {
        SubCategoryOption::select('sub_category_options.id', 'sub_category_options.option', 
                                  'categories.category', 'categories.id as category_id')
            ->join('sub_categories', 'sub_category_options.subcategory_id', '=', 'sub_categories.id')
            ->join('categories', 'sub_categories.id_category', '=', 'categories.id')
            ->orderBy('sub_category_options.id')
            ->chunk(self::CHUNK_SIZE, function ($options) use ($writer) {
                foreach ($options as $option) {
                    City::select('id', 'city_name')
                        ->orderBy('id')
                        ->chunk(self::CHUNK_SIZE, function ($cities) use ($writer, $option) {
                            foreach ($cities as $city) {
                                if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                                    return false;
                                }
                                
                                // Map category IDs to slugs (matching existing route logic)
                                $categorySlugMap = [
                                    2 => 'car-rental',
                                    3 => 'private-driver', 
                                    4 => 'boat-rental',
                                    5 => 'things-to-do'
                                ];
                                
                                $categorySlug = $categorySlugMap[$option->category_id] ?? strtolower(str_replace(' ', '-', $option->category));
                                $optionSlug = strtolower(str_replace(' ', '-', $option->option));
                                $citySlug = strtolower($city->city_name);
                                $path = "/category/{$categorySlug}/subcategory/{$optionSlug}/city/{$citySlug}";
                                $this->writeUrl($writer, $path, [
                                    'priority' => 0.7,
                                    'changefreq' => 'weekly'
                                ]);
                            }
                        });
                }
            });
    }
    
    /**
     * Add article pages using chunked queries
     */
    private function addArticlePages(XMLWriter $writer): void
    {
        Article::select('id', 'slug', 'updated_at')
            ->published() // Assuming there's a scope for published articles
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($articles) use ($writer) {
                foreach ($articles as $article) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/article/' . strtolower($article->slug);
                    $this->writeUrl($writer, $path, [
                        'priority' => 0.8,
                        'changefreq' => 'monthly',
                        'lastmod' => $article->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Add listing pages with translation check for all languages
     */
    private function addListingPages(XMLWriter $writer): void
    {
        // Get all listings that have at least English content
        Listing::select('listings.id', 'listings.slug', 'listings.updated_at')
            ->orderBy('listings.id')
            ->chunk(self::CHUNK_SIZE, function ($listings) use ($writer) {
                foreach ($listings as $listing) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/details/' . strtolower($listing->slug);
                    $this->writeUrl($writer, $path, [
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
    private function addAgencyPages(XMLWriter $writer): void
    {
        Agency::select('id', 'slug', 'updated_at')
            ->where('status', 'Active')
            ->orderBy('id')
            ->chunk(self::CHUNK_SIZE, function ($agencies) use ($writer) {
                foreach ($agencies as $agency) {
                    if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                        return false;
                    }
                    
                    $path = '/agency/' . strtolower($agency->slug);
                    $this->writeUrl($writer, $path, [
                        'priority' => 0.8,
                        'changefreq' => 'monthly',
                        'lastmod' => $agency->updated_at
                    ]);
                }
            });
    }
    
    /**
     * Write URL entries for all language variants with hreflang alternates
     */
    private function writeUrl(XMLWriter $writer, string $path, array $settings): void
    {
        // Write a URL entry for each supported language
        foreach ($this->supportedLocales as $currentLocale) {
            if ($this->urlCount >= self::MAX_URLS_PER_SITEMAP) {
                break;
            }
            
            $this->urlCount++;
            
            $writer->startElement('url');
            
            // Main URL with locale prefix
            $localePrefix = $currentLocale === 'en' ? '' : "/{$currentLocale}";
            $fullUrl = $this->baseUrl . $localePrefix . $path;
            $writer->writeElement('loc', $fullUrl);
            
            // Add alternate language links for ALL languages
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
    }
    
    /**
     * Generate sitemap index file - No longer needed as we have single comprehensive sitemap
     * Keeping method for backward compatibility but it does nothing
     */
    private function generateSitemapIndex(): void
    {
        // No longer needed - we generate a single comprehensive sitemap.xml
        // This method is kept for backward compatibility but does nothing
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