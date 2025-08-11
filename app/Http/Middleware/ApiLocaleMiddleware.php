<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiLocaleMiddleware
{
    /**
     * Handle an incoming request for API routes.
     * Sets the application locale based on query parameter or request headers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Get locale from query parameter first, then headers (X-Locale takes precedence over Accept-Language)
        $locale = $request->query('locale') ?: $request->header('X-Locale') ?: $request->header('Accept-Language');
        
        if ($locale) {
            $supportedLocales = config('app.supported_locales', ['en', 'fr', 'es']);
            
            // Handle comma-separated values (e.g., "fr,en;q=0.9")
            $locale = explode(',', $locale)[0];
            
            // Handle locale with region (e.g., "en-US" -> "en")
            $locale = explode('-', $locale)[0];
            $locale = explode('_', $locale)[0];
            
            // Validate locale is supported
            if (in_array($locale, $supportedLocales)) {
                app()->setLocale($locale);
            }
        }
        
        return $next($request);
    }
}