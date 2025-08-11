<?php

use App\Helpers\UrlHelper;

if (!function_exists('locale_url')) {
    /**
     * Generate a URL with the current locale prefix
     */
    function locale_url($path = '', $parameters = [], $secure = null)
    {
        return UrlHelper::localeUrl($path, $parameters, $secure);
    }
}

if (!function_exists('locale_route')) {
    /**
     * Generate a route with locale prefix
     */
    function locale_route($name, $parameters = [], $absolute = true)
    {
        return UrlHelper::localeRoute($name, $parameters, $absolute);
    }
}

if (!function_exists('switch_locale_url')) {
    /**
     * Get the current URL with a different locale
     */
    function switch_locale_url($newLocale)
    {
        return UrlHelper::switchLocaleUrl($newLocale);
    }
}

if (!function_exists('ensure_locale_prefix')) {
    /**
     * Ensure URL has locale prefix
     */
    function ensure_locale_prefix($url)
    {
        return UrlHelper::ensureLocalePrefix($url);
    }
}

if (!function_exists('getCustomerLanguage')) {
    /**
     * Get the preferred language for a customer based on their most recent booking
     * 
     * @param string $email Customer email address
     * @return string Language code (en, fr, or es)
     */
    function getCustomerLanguage($email)
    {
        if (empty($email)) {
            return 'en';
        }

        // Get the most recent booking for this email
        $booking = \App\Models\Booking::where('email', $email)
            ->orderBy('created_at', 'desc')
            ->first();

        // Return the booking language or default to 'en'
        return $booking ? ($booking->booking_language ?? 'en') : 'en';
    }
}