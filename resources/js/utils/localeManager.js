/**
 * Locale Manager - Handles locale detection, validation, and redirection
 */

const SUPPORTED_LOCALES = ['en', 'fr', 'es'];
const DEFAULT_LOCALE = 'en';

/**
 * Get locale from various sources in priority order
 */
export const detectLocale = () => {
    // 1. Check URL for locale
    const urlLocale = getLocaleFromUrl();
    if (urlLocale) return urlLocale;

    // 2. Check localStorage (user preference)
    const savedLocale = localStorage.getItem('i18nextLng');
    if (savedLocale && SUPPORTED_LOCALES.includes(savedLocale)) {
        return savedLocale;
    }

    // 3. Check session storage (temporary)
    const sessionLocale = sessionStorage.getItem('locale');
    if (sessionLocale && SUPPORTED_LOCALES.includes(sessionLocale)) {
        return sessionLocale;
    }

    // 4. Check browser language
    const browserLocale = navigator.language.split('-')[0];
    if (SUPPORTED_LOCALES.includes(browserLocale)) {
        return browserLocale;
    }

    // 5. Default to English
    return DEFAULT_LOCALE;
};

/**
 * Extract locale from current URL
 */
export const getLocaleFromUrl = () => {
    const path = window.location.pathname;
    const match = path.match(/^\/([a-z]{2})(\/|$)/);
    
    if (match && SUPPORTED_LOCALES.includes(match[1])) {
        return match[1];
    }
    
    return null;
};

/**
 * Check if current URL has a valid locale prefix
 */
export const hasLocaleInUrl = () => {
    return getLocaleFromUrl() !== null;
};

/**
 * Get current path without locale prefix
 */
export const getPathWithoutLocale = () => {
    const path = window.location.pathname;
    // Remove locale prefix if present
    return path.replace(/^\/[a-z]{2}(\/|$)/, '/');
};

/**
 * Check if current path is an admin route
 */
const isAdminRoute = () => {
    const path = window.location.pathname;
    
    // Admin route patterns that should skip locale handling (must match PHP LocaleMiddleware)
    const adminPatterns = [
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
    
    return adminPatterns.some(pattern => 
        path === '/' + pattern || path.startsWith('/' + pattern + '/')
    );
};

/**
 * Redirect to URL with locale prefix if missing
 */
export const ensureLocaleInUrl = () => {
    // Skip locale enforcement for admin routes
    if (isAdminRoute()) {
        return false; // No redirect needed for admin routes
    }
    
    if (!hasLocaleInUrl()) {
        const locale = detectLocale();
        const currentPath = window.location.pathname;
        const search = window.location.search;
        const hash = window.location.hash;
        
        // Build new URL with locale
        const newPath = `/${locale}${currentPath === '/' ? '' : currentPath}`;
        const newUrl = `${newPath}${search}${hash}`;
        
        // Use replace instead of href to avoid adding to history
        window.location.replace(newUrl);
        return true; // Indicates redirect happened
    }
    return false; // No redirect needed
};

/**
 * Set cookie for Laravel to read
 */
const setCookie = (name, value, days = 365) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

/**
 * Initialize locale management
 * Call this at app startup
 */
export const initializeLocale = () => {
    // Skip all locale initialization for admin routes
    if (isAdminRoute()) {
        return true; // Allow app to continue normally for admin routes
    }
    
    // Check if we need to redirect for public routes only
    const redirected = ensureLocaleInUrl();
    
    if (!redirected) {
        // Sync detected locale with storage
        const currentLocale = getLocaleFromUrl();
        if (currentLocale) {
            localStorage.setItem('i18nextLng', currentLocale);
            sessionStorage.setItem('locale', currentLocale);
            // Also set cookie for Laravel to read
            setCookie('i18nextLng', currentLocale);
        }
    }
    
    return !redirected; // Return false if redirected (app shouldn't continue)
};

/**
 * Generate a localized URL
 */
export const getLocalizedUrl = (path, locale = null) => {
    // Use provided locale or detect from current URL
    const targetLocale = locale || getLocaleFromUrl() || detectLocale();
    
    // Clean the path
    let cleanPath = path;
    
    // Remove leading slash if present
    if (cleanPath.startsWith('/')) {
        cleanPath = cleanPath.substring(1);
    }
    
    // Remove any existing locale prefix
    cleanPath = cleanPath.replace(/^[a-z]{2}\//, '');
    
    // Build localized URL
    return `/${targetLocale}${cleanPath ? '/' + cleanPath : ''}`;
};

/**
 * Switch to a different locale
 */
export const switchLocale = (newLocale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) {
        console.warn(`Unsupported locale: ${newLocale}`);
        return;
    }
    
    // Save preference
    localStorage.setItem('i18nextLng', newLocale);
    sessionStorage.setItem('locale', newLocale);
    // Set cookie for Laravel
    setCookie('i18nextLng', newLocale);
    
    // Get current path without locale
    const pathWithoutLocale = getPathWithoutLocale();
    
    // Redirect to new locale URL
    window.location.href = `/${newLocale}${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`;
};

/**
 * React Hook for locale management
 */
export const useLocale = () => {
    const locale = getLocaleFromUrl() || detectLocale();
    
    return {
        locale,
        switchLocale,
        getLocalizedUrl,
        hasLocaleInUrl: hasLocaleInUrl()
    };
};

/**
 * Middleware-like function for React Router (if using it)
 */
export const localeMiddleware = (Component) => {
    return (props) => {
        // Ensure locale is in URL before rendering
        const shouldContinue = initializeLocale();
        
        if (!shouldContinue) {
            // Return null during redirect
            return null;
        }
        
        return <Component {...props} />;
    };
};

export default {
    detectLocale,
    getLocaleFromUrl,
    hasLocaleInUrl,
    getPathWithoutLocale,
    ensureLocaleInUrl,
    initializeLocale,
    getLocalizedUrl,
    switchLocale,
    useLocale,
    localeMiddleware,
    SUPPORTED_LOCALES,
    DEFAULT_LOCALE
};