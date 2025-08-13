<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class LocaleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Get the locale from route parameter if it exists
        $routeLocale = $request->route('locale');
        
        // Check if this is an admin route
        if ($this->isAdminRoute($request)) {
            // If admin route has locale prefix, redirect to non-locale version
            $path = $request->path();
            $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
            foreach ($supportedLocales as $locale) {
                if (str_starts_with($path, $locale . '/')) {
                    $cleanPath = substr($path, strlen($locale) + 1);
                    $queryString = $request->getQueryString();
                    $redirectUrl = '/' . $cleanPath;
                    if ($queryString) {
                        $redirectUrl .= '?' . $queryString;
                    }
                    return redirect($redirectUrl);
                }
            }
            
            // Set default locale for admin area
            App::setLocale('en');
            // Ensure session is available for admin routes
            Session::put('locale', 'en');
            return $next($request);
        }
        
        $supportedLocales = config('app.supported_locales', ['en']);
        $locale = null;

        // Debug logging
        \Log::info('LocaleMiddleware Debug', [
            'path' => $request->path(),
            'routeLocale' => $routeLocale,
            'segment1' => $request->segment(1),
            'hasRoute' => $request->route() ? true : false,
        ]);
        
        // 1. Check if we have locale from route parameter (from {locale?} in route definition)
        if ($routeLocale && in_array($routeLocale, $supportedLocales)) {
            $locale = $routeLocale;
        }
        
        // 2. If route matched but locale parameter is empty (e.g., /boat-search matching {locale?}/boat-search)
        // we need to redirect to add the locale
        if ($request->route() && !$routeLocale && !$request->expectsJson() && !$this->isAssetRequest($request)) {
            // Need to redirect to URL with locale prefix
            $locale = null;
        } else if (!$locale) {
            // 3. Check for locale in URL prefix (for routes without {locale?} parameter)
            $segment = $request->segment(1);
            if ($segment && in_array($segment, $supportedLocales)) {
                $locale = $segment;
            }
        }

        // 4. If no locale in URL and not an API/asset request, redirect to URL with locale
        if (!$locale && !$request->expectsJson() && !$this->isAssetRequest($request)) {
            // Check cookie for saved locale (from frontend localStorage via i18next)
            if ($request->cookie('i18nextLng')) {
                $cookieLocale = $request->cookie('i18nextLng');
                if (in_array($cookieLocale, $supportedLocales)) {
                    $locale = $cookieLocale;
                }
            }
            
            // Check session for saved preference if no cookie
            if (!$locale && Session::has('locale')) {
                $savedLocale = Session::get('locale');
                if (in_array($savedLocale, $supportedLocales)) {
                    $locale = $savedLocale;
                }
            }
            
            // Fall back to browser language if no session or cookie
            if (!$locale) {
                $locale = $this->getPreferredLanguage($request, $supportedLocales);
            }
            
            // Fall back to default locale
            if (!$locale || !in_array($locale, $supportedLocales)) {
                $locale = config('app.locale', 'en');
            }
            
            // Build the redirect URL with locale prefix, preserving query parameters
            $path = $request->path();
            $queryString = $request->getQueryString();
            $redirectUrl = '/' . $locale;
            
            // Add the path if it's not root
            if ($path !== '/' && $path !== '') {
                $redirectUrl .= '/' . $path;
            }
            
            // Add query string if present
            if ($queryString) {
                $redirectUrl .= '?' . $queryString;
            }
            
            // Redirect to URL with locale prefix
            return redirect($redirectUrl);
        }

        // 3. If still no locale (API requests), use session or default
        if (!$locale) {
            if (Session::has('locale')) {
                $locale = Session::get('locale');
                if (!in_array($locale, $supportedLocales)) {
                    $locale = config('app.locale', 'en');
                }
            } else {
                $locale = config('app.locale', 'en');
            }
        }

        // Set the application locale
        App::setLocale($locale);
        
        // Set URL defaults for route generation
        URL::defaults(['locale' => $locale]);
        
        // Store locale in session
        Session::put('locale', $locale);

        return $next($request);
    }

    /**
     * Check if request is for admin routes
     */
    private function isAdminRoute(Request $request): bool
    {
        $path = $request->path();
        
        // Remove locale prefix if present for checking
        $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
        foreach ($supportedLocales as $locale) {
            if (str_starts_with($path, $locale . '/')) {
                $path = substr($path, strlen($locale) + 1);
                break;
            }
        }
        
        // Admin route patterns that should skip locale handling
        $adminPatterns = [
            'login',
            'logout',
            'password',
            'dashboard',
            'notifications',
            'pages',
            'categories',
            'subcategories',
            'terms',
            'cities',
            'societes',
            'listings',
            'listing_addons',
            'coupons',
            'bookings',
            'articles',
            'agencies',
            'profile',
            'users',
            'admin',
            'settings',
        ];
        
        foreach ($adminPatterns as $pattern) {
            if ($path === $pattern || str_starts_with($path, $pattern . '/')) {
                return true;
            }
        }
        
        return false;
    }
    
    /**
     * Check if request is for static assets
     */
    private function isAssetRequest(Request $request): bool
    {
        $path = $request->path();
        $assetExtensions = ['js', 'css', 'jpg', 'jpeg', 'png', 'gif', 'svg', 'ico', 'woff', 'woff2', 'ttf', 'eot', 'map'];
        
        foreach ($assetExtensions as $ext) {
            if (str_ends_with($path, '.' . $ext)) {
                return true;
            }
        }
        
        return str_starts_with($path, 'build/') || 
               str_starts_with($path, 'images/') || 
               str_starts_with($path, 'css/') || 
               str_starts_with($path, 'js/') ||
               str_starts_with($path, 'locales/');
    }

    /**
     * Get preferred language from browser Accept-Language header
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $supportedLocales
     * @return string|null
     */
    private function getPreferredLanguage(Request $request, array $supportedLocales): ?string
    {
        $acceptLanguage = $request->header('Accept-Language');
        
        // Validate header exists and has reasonable length
        if (!$acceptLanguage || strlen($acceptLanguage) > 255) {
            return null;
        }

        // Sanitize input - remove any non-standard characters
        $acceptLanguage = preg_replace('/[^a-zA-Z0-9\-,;=.]/', '', $acceptLanguage);
        
        // Parse Accept-Language header with limits
        $languages = [];
        $parts = array_slice(explode(',', $acceptLanguage), 0, 10); // Limit to 10 languages
        
        foreach ($parts as $part) {
            $part = trim($part);
            // More restrictive regex with anchors to prevent ReDoS
            if (preg_match('/^([a-z]{2})(?:-[A-Z]{2})?(?:;q=([0-9](?:\.[0-9]{1,3})?))?\z/i', $part, $matches)) {
                $lang = strtolower($matches[1]);
                $quality = isset($matches[2]) ? min(1.0, max(0.0, (float)$matches[2])) : 1.0;
                
                // Additional validation
                if (strlen($lang) === 2) {
                    $languages[$lang] = $quality;
                }
            }
        }

        // Check if we have any valid languages
        if (empty($languages)) {
            return null;
        }

        // Sort by quality (preference)
        arsort($languages);

        // Find first supported language with strict comparison
        foreach (array_keys($languages) as $lang) {
            if (in_array($lang, $supportedLocales, true)) {
                return $lang;
            }
        }

        return null;
    }
}