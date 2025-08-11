import i18n from '../i18n';

/**
 * Get the current locale for API requests
 * @returns {string} Current language code
 */
export const getCurrentLocale = () => {
    return i18n.language || 'en';
};

/**
 * Add locale to API request headers
 * @param {Object} headers - Existing headers
 * @returns {Object} Headers with locale
 */
export const withLocaleHeaders = (headers = {}) => {
    return {
        ...headers,
        'Accept-Language': getCurrentLocale(),
        'X-Locale': getCurrentLocale()
    };
};

/**
 * Add locale parameter to URL
 * @param {string} url - API endpoint URL
 * @param {Object} params - Existing query parameters
 * @returns {string} URL with locale parameter
 */
export const withLocaleParam = (url, params = {}) => {
    const urlObj = new URL(url, window.location.origin);
    const searchParams = new URLSearchParams(params);
    searchParams.set('locale', getCurrentLocale());
    urlObj.search = searchParams.toString();
    return urlObj.toString();
};

/**
 * Get translated field from API response
 * @param {Object} data - API response object
 * @param {string} field - Field name to get
 * @param {string} fallbackLocale - Fallback locale if translation missing
 * @returns {string} Translated field value
 */
export const getTranslatedField = (data, field, fallbackLocale = 'en') => {
    const currentLocale = getCurrentLocale();
    
    // Check if translations exist
    if (data.translations && data.translations[currentLocale]) {
        const translation = data.translations[currentLocale][field];
        if (translation) {
            return translation;
        }
    }
    
    // Check for locale-specific field (e.g., title_fr, description_es)
    const localeField = `${field}_${currentLocale}`;
    if (data[localeField]) {
        return data[localeField];
    }
    
    // Fallback to English translation
    if (currentLocale !== fallbackLocale) {
        if (data.translations && data.translations[fallbackLocale]) {
            const fallbackTranslation = data.translations[fallbackLocale][field];
            if (fallbackTranslation) {
                return fallbackTranslation;
            }
        }
        
        const fallbackField = `${field}_${fallbackLocale}`;
        if (data[fallbackField]) {
            return data[fallbackField];
        }
    }
    
    // Return original field as last resort
    return data[field] || '';
};

/**
 * Transform API response with translations
 * @param {Object|Array} data - API response
 * @param {Array} fields - Fields to translate
 * @returns {Object|Array} Transformed data
 */
export const withTranslations = (data, fields = ['title', 'description', 'short_description']) => {
    const processItem = (item) => {
        const translatedItem = { ...item };
        
        fields.forEach(field => {
            const translatedValue = getTranslatedField(item, field);
            if (translatedValue) {
                translatedItem[field] = translatedValue;
            }
        });
        
        return translatedItem;
    };
    
    if (Array.isArray(data)) {
        return data.map(processItem);
    }
    
    return processItem(data);
};

/**
 * Format API request with locale
 * @param {string} endpoint - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Object} Formatted request options
 */
export const apiRequest = (endpoint, options = {}) => {
    const locale = getCurrentLocale();
    
    // Add locale to headers
    const headers = withLocaleHeaders(options.headers);
    
    // Add locale to URL if GET request
    let url = endpoint;
    if (!options.method || options.method === 'GET') {
        url = withLocaleParam(endpoint, options.params);
    }
    
    // Add locale to body if POST/PUT request
    let body = options.body;
    if (options.method === 'POST' || options.method === 'PUT') {
        if (typeof body === 'object' && !body instanceof FormData) {
            body = {
                ...body,
                locale: locale
            };
        }
    }
    
    return {
        ...options,
        headers,
        body: body ? JSON.stringify(body) : undefined,
        url
    };
};