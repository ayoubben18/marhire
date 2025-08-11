window._ = require("lodash");

try {
    require("bootstrap");
} catch (e) {}

/**
 * We'll load the axios HTTP library which allows us to easily issue reguests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require("axios");

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// Add CSRF token to all requests
let token = document.head.querySelector('meta[name="csrf-token"]');
if (token) {
    window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
} else {
    console.error(
        "CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token"
    );
}

// Attach locale headers to all requests
try {
    const i18n = require("./i18n").default;
    const getLocale = () =>
        i18n && i18n.language
            ? i18n.language
            : localStorage.getItem("i18nextLng") || "en";

    // Set initial defaults
    window.axios.defaults.headers.common["Accept-Language"] = getLocale();
    window.axios.defaults.headers.common["X-Locale"] = getLocale();

    // Update headers on language change
    if (i18n && i18n.on) {
        i18n.on("languageChanged", (lng) => {
            window.axios.defaults.headers.common["Accept-Language"] = lng;
            window.axios.defaults.headers.common["X-Locale"] = lng;
        });
    }

    // Interceptor to add locale param to GET requests
    window.axios.interceptors.request.use((config) => {
        const locale = getLocale();
        if (!config.headers) config.headers = {};
        config.headers["Accept-Language"] = locale;
        config.headers["X-Locale"] = locale;
        if (!config.method || config.method.toUpperCase() === "GET") {
            const url = new URL(config.url || "", window.location.origin);
            const params = new URLSearchParams(url.search);
            params.set("locale", locale);
            url.search = params.toString();
            config.url = url.toString();
        }
        return config;
    });
} catch (e) {
    // i18n may not be initialized in some contexts; ignore
}

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: process.env.MIX_PUSHER_APP_KEY,
//     cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//     forceTLS: true
// });
