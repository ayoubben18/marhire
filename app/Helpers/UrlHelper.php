<?php

namespace App\Helpers;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class UrlHelper
{
    /**
     * Generate a URL with the current locale prefix
     */
    public static function localeUrl($path = '', $parameters = [], $secure = null)
    {
        $locale = App::getLocale();
        
        // Clean the path
        $path = ltrim($path, '/');
        
        // If path already has locale, return as is
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        foreach ($supportedLocales as $loc) {
            if (str_starts_with($path, $loc . '/') || $path === $loc) {
                return url($path, $parameters, $secure);
            }
        }
        
        // Add locale prefix
        if ($path) {
            $path = $locale . '/' . $path;
        } else {
            $path = $locale;
        }
        
        return url($path, $parameters, $secure);
    }
    
    /**
     * Generate a route with locale prefix
     */
    public static function localeRoute($name, $parameters = [], $absolute = true)
    {
        $locale = App::getLocale();
        
        // Check if route exists with locale prefix
        $localizedName = $locale . '.' . $name;
        if (Route::has($localizedName)) {
            return route($localizedName, $parameters, $absolute);
        }
        
        // Try to add locale to parameters
        if (!isset($parameters['locale'])) {
            $parameters['locale'] = $locale;
        }
        
        return route($name, $parameters, $absolute);
    }
    
    /**
     * Get the current URL with a different locale
     */
    public static function switchLocaleUrl($newLocale)
    {
        $currentUrl = URL::current();
        $currentLocale = App::getLocale();
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        
        // Validate new locale
        if (!in_array($newLocale, $supportedLocales)) {
            return $currentUrl;
        }
        
        // Parse current URL
        $parsedUrl = parse_url($currentUrl);
        $path = $parsedUrl['path'] ?? '/';
        
        // Remove current locale from path
        foreach ($supportedLocales as $locale) {
            if (preg_match('#^/' . $locale . '(/|$)#', $path)) {
                $path = preg_replace('#^/' . $locale . '#', '', $path);
                break;
            }
        }
        
        // Add new locale
        $path = '/' . $newLocale . $path;
        
        // Rebuild URL
        $newUrl = '';
        if (isset($parsedUrl['scheme'])) {
            $newUrl .= $parsedUrl['scheme'] . '://';
        }
        if (isset($parsedUrl['host'])) {
            $newUrl .= $parsedUrl['host'];
        }
        if (isset($parsedUrl['port'])) {
            $newUrl .= ':' . $parsedUrl['port'];
        }
        $newUrl .= $path;
        if (isset($parsedUrl['query'])) {
            $newUrl .= '?' . $parsedUrl['query'];
        }
        if (isset($parsedUrl['fragment'])) {
            $newUrl .= '#' . $parsedUrl['fragment'];
        }
        
        return $newUrl;
    }
    
    /**
     * Check if URL needs locale prefix
     */
    public static function needsLocalePrefix($url)
    {
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        $path = parse_url($url, PHP_URL_PATH);
        $path = ltrim($path, '/');
        
        // Check if path already has locale
        foreach ($supportedLocales as $locale) {
            if (str_starts_with($path, $locale . '/') || $path === $locale) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Ensure URL has locale prefix
     */
    public static function ensureLocalePrefix($url)
    {
        if (!static::needsLocalePrefix($url)) {
            return $url;
        }
        
        $locale = App::getLocale();
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
        if (isset($parsedUrl['port'])) {
            $result .= ':' . $parsedUrl['port'];
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