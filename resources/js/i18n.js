import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";

// Check if current path is an admin route (duplicate function for use here)
const checkIsAdminRoute = () => {
    const path = window.location.pathname;
    const adminPatterns = [
        'login', 'logout', 'password', 'dashboard', 'notifications',
        'pages', 'categories', 'subcategories', 'terms', 'cities',
        'societes', 'listings', 'listing_addons', 'coupons', 'bookings',
        'articles', 'agencies', 'profile', 'users', 'admin', 'settings'
    ];
    return adminPatterns.some(pattern => 
        path === '/' + pattern || path.startsWith('/' + pattern + '/')
    );
};

// Get the current locale from the URL
const getInitialLanguage = () => {
    // For admin routes, always use English or saved preference
    if (checkIsAdminRoute()) {
        const savedLang = localStorage.getItem("i18nextLng");
        if (savedLang && ["en", "fr", "es"].includes(savedLang)) {
            console.log('i18n: Admin route - using saved language:', savedLang);
            return savedLang;
        }
        console.log('i18n: Admin route - defaulting to English');
        return "en";
    }
    
    // For public routes, detect from URL first
    const path = window.location.pathname;
    const localeMatch = path.match(/^\/(en|fr|es)(\/|$)/);
    if (localeMatch) {
        console.log('i18n: Detected language from URL:', localeMatch[1]);
        return localeMatch[1];
    }
    // Check localStorage for saved preference
    const savedLang = localStorage.getItem("i18nextLng");
    if (savedLang && ["en", "fr", "es"].includes(savedLang)) {
        console.log('i18n: Using saved language:', savedLang);
        return savedLang;
    }
    console.log('i18n: Defaulting to English');
    return "en";
};

i18n.use(HttpApi)
    .use(initReactI18next)
    .init({
        lng: getInitialLanguage(),
        fallbackLng: "en",
        debug: false,

        ns: ["translation"],
        defaultNS: "translation",

        interpolation: {
            escapeValue: false, // React already escapes values
        },

        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
            crossDomain: false,
        },

        supportedLngs: ["en", "fr", "es"],

        react: {
            useSuspense: true,
            bindI18n: "languageChanged loaded",
            bindI18nStore: "added removed",
            transEmptyNodeValue: "",
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
        },
    });

// Check if current path is an admin route
const isAdminRoute = () => {
    const path = window.location.pathname;
    const adminPatterns = [
        'login', 'logout', 'password', 'dashboard', 'notifications',
        'pages', 'categories', 'subcategories', 'terms', 'cities',
        'societes', 'listings', 'listing_addons', 'coupons', 'bookings',
        'articles', 'agencies', 'profile', 'users', 'admin', 'settings'
    ];
    return adminPatterns.some(pattern => 
        path === '/' + pattern || path.startsWith('/' + pattern + '/')
    );
};

// Handle language changes
i18n.on("languageChanged", (lng) => {
    // Save to localStorage
    localStorage.setItem("i18nextLng", lng);

    // Skip URL manipulation for admin routes
    if (isAdminRoute()) {
        // Update document language attribute only
        document.documentElement.lang = lng;
        return;
    }

    // Update the URL if needed (only for public routes)
    const currentPath = window.location.pathname;
    const hasLocale = /^\/(en|fr|es)(\/|$)/.test(currentPath);

    if (hasLocale) {
        // Replace the locale in the URL
        const newPath = currentPath.replace(/^\/(en|fr|es)/, `/${lng}`);
        if (newPath !== currentPath) {
            window.history.pushState(null, "", newPath);
        }
    } else {
        // Add locale to the URL
        window.history.pushState(null, "", `/${lng}${currentPath}`);
    }

    // Update document language attribute
    document.documentElement.lang = lng;
});

export default i18n;
