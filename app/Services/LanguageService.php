<?php

namespace App\Services;

use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\URL;

class LanguageService
{
    /**
     * Cached supported locales
     *
     * @var array|null
     */
    private ?array $supportedLocales = null;

    /**
     * Cached locales configuration
     *
     * @var array|null
     */
    private ?array $localesConfig = null;

    /**
     * Get the current locale
     *
     * @return string
     */
    public function getCurrentLocale(): string
    {
        return App::getLocale();
    }

    /**
     * Get supported locales with caching
     *
     * @return array<int, string>
     */
    public function getSupportedLocales(): array
    {
        if ($this->supportedLocales === null) {
            $this->supportedLocales = config('app.supported_locales', ['en']);
        }
        return $this->supportedLocales;
    }

    /**
     * Get locale configuration with language names (cached)
     *
     * @return array<string, string>
     */
    public function getLocalesConfig(): array
    {
        if ($this->localesConfig === null) {
            $this->localesConfig = config('app.locales', []);
        }
        return $this->localesConfig;
    }

    /**
     * Get the name of a locale
     *
     * @param string $locale
     * @return string
     */
    public function getLocaleName(string $locale): string
    {
        $locales = $this->getLocalesConfig();
        return $locales[$locale] ?? $locale;
    }

    /**
     * Check if a locale is supported
     *
     * @param string $locale
     * @return bool
     */
    public function isLocaleSupported(string $locale): bool
    {
        return in_array($locale, $this->getSupportedLocales());
    }

    /**
     * Set the application locale
     *
     * @param string $locale
     * @return bool
     */
    public function setLocale(string $locale): bool
    {
        if (!$this->isLocaleSupported($locale)) {
            return false;
        }

        App::setLocale($locale);
        Session::put('locale', $locale);
        URL::defaults(['locale' => $locale]);

        return true;
    }

    /**
     * Get localized URL for a given route or current route
     *
     * @param string|null $locale
     * @param string|null $routeName
     * @param array $parameters
     * @return string
     */
    public function getLocalizedUrl(?string $locale = null, ?string $routeName = null, array $parameters = []): string
    {
        $locale = $locale ?: $this->getCurrentLocale();

        if (!$this->isLocaleSupported($locale)) {
            $locale = config('app.locale', 'en');
        }

        // Handle named route generation
        if ($routeName) {
            $parameters['locale'] = $locale;
            try {
                return route($routeName, $parameters);
            } catch (\Exception $e) {
                // Log the error and fallback
                \Log::warning('Failed to generate localized route', [
                    'route' => $routeName,
                    'locale' => $locale,
                    'error' => $e->getMessage()
                ]);
                return url("/{$locale}");
            }
        }

        // Try to use current route if available
        $currentRoute = Route::current();
        if ($currentRoute && $currentRoute->getName()) {
            try {
                $params = $currentRoute->parameters();
                $params['locale'] = $locale;
                return route($currentRoute->getName(), $params);
            } catch (\Exception $e) {
                \Log::warning('Failed to generate current route with new locale', [
                    'route' => $currentRoute->getName(),
                    'locale' => $locale,
                    'error' => $e->getMessage()
                ]);
            }
        }

        // Fallback - construct URL manually with proper validation
        $path = request()->path();
        $segments = explode('/', trim($path, '/'));
        
        // Remove current locale if present
        if (!empty($segments) && $this->isLocaleSupported($segments[0])) {
            array_shift($segments);
        }
        
        // Filter out empty segments
        $segments = array_filter($segments, function($segment) {
            return !empty($segment);
        });
        
        // Construct new path
        $newPath = $locale . (empty($segments) ? '' : '/' . implode('/', $segments));
        
        return url($newPath);
    }

    /**
     * Get alternate language links for SEO
     *
     * @return array<string, string>
     */
    public function getAlternateLinks(): array
    {
        $links = [];
        $supportedLocales = $this->getSupportedLocales();

        foreach ($supportedLocales as $locale) {
            $links[$locale] = $this->getLocalizedUrl($locale);
        }

        return $links;
    }

    /**
     * Get language switcher data
     *
     * @return array<int, array{code: string, name: string, url: string, active: bool}>
     */
    public function getLanguageSwitcherData(): array
    {
        $data = [];
        $currentLocale = $this->getCurrentLocale();
        $supportedLocales = $this->getSupportedLocales();
        $localesConfig = $this->getLocalesConfig();

        foreach ($supportedLocales as $locale) {
            $data[] = [
                'code' => $locale,
                'name' => $localesConfig[$locale] ?? $locale,
                'url' => $this->getLocalizedUrl($locale),
                'active' => $locale === $currentLocale,
            ];
        }

        return $data;
    }
}