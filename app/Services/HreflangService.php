<?php

namespace App\Services;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class HreflangService
{
    protected $supportedLocales = ['en', 'fr', 'es'];
    protected $defaultLocale = 'en';
    
    /**
     * Generate hreflang tags for the current page
     */
    public function generateHreflangTags($currentUrl, $currentLocale)
    {
        $tags = [];
        $alternateUrls = $this->getAlternateUrls($currentUrl, $currentLocale);
        
        // Add hreflang tags for each language
        foreach ($alternateUrls as $locale => $url) {
            $tags[] = sprintf(
                '<link rel="alternate" hreflang="%s" href="%s" />',
                $locale,
                $url
            );
        }
        
        // Add x-default for language selector
        $defaultUrl = $alternateUrls[$this->defaultLocale] ?? $currentUrl;
        $tags[] = sprintf(
            '<link rel="alternate" hreflang="x-default" href="%s" />',
            $defaultUrl
        );
        
        return implode("\n    ", $tags);
    }
    
    /**
     * Get alternate URLs for all supported languages
     */
    public function getAlternateUrls($currentUrl, $currentLocale)
    {
        $urls = [];
        $parsedUrl = parse_url($currentUrl);
        $path = $parsedUrl['path'] ?? '/';
        $query = isset($parsedUrl['query']) ? '?' . $parsedUrl['query'] : '';
        
        // Remove current locale from path if present
        $cleanPath = $this->removeLocaleFromPath($path, $currentLocale);
        
        // Get current route and parameters
        $currentRoute = Route::current();
        if ($currentRoute) {
            $routeName = $currentRoute->getName();
            $parameters = $currentRoute->parameters();
            
            // Generate URLs for each locale
            foreach ($this->supportedLocales as $locale) {
                try {
                    // Handle different route types
                    if ($routeName) {
                        // Try to generate route with locale
                        $localizedRouteName = $this->getLocalizedRouteName($routeName, $locale);
                        if (Route::has($localizedRouteName)) {
                            $urls[$locale] = route($localizedRouteName, array_merge($parameters, ['locale' => $locale]));
                        } else {
                            // Fallback to URL manipulation
                            $urls[$locale] = $this->buildUrlWithLocale($cleanPath, $locale, $query);
                        }
                    } else {
                        // No named route, use URL manipulation
                        $urls[$locale] = $this->buildUrlWithLocale($cleanPath, $locale, $query);
                    }
                } catch (\Exception $e) {
                    // Fallback to simple URL manipulation
                    $urls[$locale] = $this->buildUrlWithLocale($cleanPath, $locale, $query);
                }
            }
        } else {
            // No current route, use URL manipulation
            foreach ($this->supportedLocales as $locale) {
                $urls[$locale] = $this->buildUrlWithLocale($cleanPath, $locale, $query);
            }
        }
        
        return $urls;
    }
    
    /**
     * Remove locale from URL path
     */
    protected function removeLocaleFromPath($path, $currentLocale)
    {
        // Remove leading slash for processing
        $path = ltrim($path, '/');
        
        // Check if path starts with a locale
        foreach ($this->supportedLocales as $locale) {
            if (strpos($path, $locale . '/') === 0 || $path === $locale) {
                return '/' . substr($path, strlen($locale));
            }
        }
        
        return '/' . $path;
    }
    
    /**
     * Build URL with locale prefix
     */
    protected function buildUrlWithLocale($path, $locale, $query = '')
    {
        $baseUrl = config('app.url');
        
        // Clean up path
        $path = ltrim($path, '/');
        
        // Don't add locale for default language if configured to hide it
        if ($locale === $this->defaultLocale && config('app.hide_default_locale', false)) {
            return $baseUrl . '/' . $path . $query;
        }
        
        // Build URL with locale
        if (empty($path) || $path === '/') {
            return $baseUrl . '/' . $locale . $query;
        }
        
        return $baseUrl . '/' . $locale . '/' . $path . $query;
    }
    
    /**
     * Get localized route name
     */
    protected function getLocalizedRouteName($routeName, $locale)
    {
        // Remove current locale prefix if exists
        $baseName = preg_replace('/^[a-z]{2}\./', '', $routeName);
        
        // Add new locale prefix
        return $locale . '.' . $baseName;
    }
    
    /**
     * Generate canonical URL for current page
     */
    public function getCanonicalUrl($currentUrl, $currentLocale)
    {
        // Clean up URL parameters if needed
        $parsedUrl = parse_url($currentUrl);
        $canonical = $parsedUrl['scheme'] . '://' . $parsedUrl['host'];
        
        if (isset($parsedUrl['path'])) {
            $canonical .= $parsedUrl['path'];
        }
        
        // Add only essential query parameters
        if (isset($parsedUrl['query'])) {
            parse_str($parsedUrl['query'], $params);
            // Keep only essential parameters (customize as needed)
            $essentialParams = array_intersect_key($params, array_flip(['id', 'category', 'city']));
            if (!empty($essentialParams)) {
                $canonical .= '?' . http_build_query($essentialParams);
            }
        }
        
        return $canonical;
    }
    
    /**
     * Get locale-specific meta tags
     */
    public function getLocaleMeta($locale)
    {
        $localeMap = [
            'en' => 'en_US',
            'fr' => 'fr_FR',
            'es' => 'es_ES'
        ];
        
        return [
            'og_locale' => $localeMap[$locale] ?? 'en_US',
            'lang' => $locale,
            'alternate_locales' => array_values(array_diff_key($localeMap, [$locale => '']))
        ];
    }
    
    /**
     * Check if URL needs locale prefix
     */
    public function needsLocalePrefix($url)
    {
        $path = parse_url($url, PHP_URL_PATH);
        $path = ltrim($path, '/');
        
        // Check if path already has locale
        foreach ($this->supportedLocales as $locale) {
            if (strpos($path, $locale . '/') === 0 || $path === $locale) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Add locale prefix to URL if needed
     */
    public function ensureLocalePrefix($url, $locale)
    {
        if (!$this->needsLocalePrefix($url)) {
            return $url;
        }
        
        $parsedUrl = parse_url($url);
        $path = $parsedUrl['path'] ?? '/';
        $path = '/' . $locale . $path;
        
        $result = '';
        if (isset($parsedUrl['scheme'])) {
            $result .= $parsedUrl['scheme'] . '://';
        }
        if (isset($parsedUrl['host'])) {
            $result .= $parsedUrl['host'];
        }
        $result .= $path;
        if (isset($parsedUrl['query'])) {
            $result .= '?' . $parsedUrl['query'];
        }
        if (isset($parsedUrl['fragment'])) {
            $result .= '#' . $parsedUrl['fragment'];
        }
        
        return $result;
    }
}