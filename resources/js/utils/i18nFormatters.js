import i18n from '../i18n';

/**
 * Format date according to locale
 * @param {Date|string} date - Date to format
 * @param {string} format - Format type: 'short', 'long', 'full'
 * @returns {string} Formatted date
 */
export const formatDate = (date, format = 'short') => {
    const locale = i18n.language || 'en';
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
        return '';
    }
    
    const options = {
        short: { day: 'numeric', month: 'short', year: 'numeric' },
        long: { day: 'numeric', month: 'long', year: 'numeric' },
        full: { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }
    };
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', options[format]).format(dateObj);
};

/**
 * Format time according to locale
 * @param {Date|string} time - Time to format
 * @param {boolean} showSeconds - Whether to show seconds
 * @returns {string} Formatted time
 */
export const formatTime = (time, showSeconds = false) => {
    const locale = i18n.language || 'en';
    const timeObj = time instanceof Date ? time : new Date(time);
    
    if (isNaN(timeObj.getTime())) {
        return '';
    }
    
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        ...(showSeconds && { second: '2-digit' })
    };
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    return new Intl.DateTimeFormat(localeMap[locale] || 'en-US', options).format(timeObj);
};

/**
 * Format currency according to locale
 * @param {number} amount - Amount to format
 * @param {string} currency - Currency code (default: MAD)
 * @param {boolean} showSymbol - Whether to show currency symbol
 * @returns {string} Formatted currency
 */
export const formatCurrency = (amount, currency = 'MAD', showSymbol = true) => {
    const locale = i18n.language || 'en';
    
    if (isNaN(amount)) {
        return '';
    }
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    const options = {
        style: showSymbol ? 'currency' : 'decimal',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    };
    
    if (!showSymbol) {
        delete options.currency;
        delete options.style;
    }
    
    const formatted = new Intl.NumberFormat(localeMap[locale] || 'en-US', options).format(amount);
    
    // For MAD, replace the currency code with the more common "DH" or localized version
    if (currency === 'MAD' && showSymbol) {
        const currencyLabels = {
            'en': 'MAD',
            'fr': 'DH',
            'es': 'DH'
        };
        return formatted.replace('MAD', currencyLabels[locale] || 'MAD');
    }
    
    return formatted;
};

/**
 * Format number according to locale
 * @param {number} number - Number to format
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted number
 */
export const formatNumber = (number, decimals = 0) => {
    const locale = i18n.language || 'en';
    
    if (isNaN(number)) {
        return '';
    }
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    const options = {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    };
    
    return new Intl.NumberFormat(localeMap[locale] || 'en-US', options).format(number);
};

/**
 * Format percentage according to locale
 * @param {number} value - Value to format (0-1 or 0-100)
 * @param {boolean} isDecimal - Whether value is decimal (0-1) or percentage (0-100)
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, isDecimal = true) => {
    const locale = i18n.language || 'en';
    
    if (isNaN(value)) {
        return '';
    }
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    const percentValue = isDecimal ? value : value / 100;
    
    return new Intl.NumberFormat(localeMap[locale] || 'en-US', {
        style: 'percent',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(percentValue);
};

/**
 * Format distance/mileage with unit
 * @param {number} distance - Distance value
 * @param {string} unit - Unit (km, miles)
 * @returns {string} Formatted distance
 */
export const formatDistance = (distance, unit = 'km') => {
    const locale = i18n.language || 'en';
    
    if (isNaN(distance)) {
        return '';
    }
    
    const formatted = formatNumber(distance, 0);
    
    const unitLabels = {
        'en': { km: 'km', miles: 'miles' },
        'fr': { km: 'km', miles: 'miles' },
        'es': { km: 'km', miles: 'millas' }
    };
    
    return `${formatted} ${unitLabels[locale]?.[unit] || unit}`;
};

/**
 * Format phone number
 * @param {string} phoneNumber - Phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return '';
    
    // Remove all non-digits
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format based on length (assuming international format)
    if (cleaned.length >= 10) {
        // Format as: +X (XXX) XXX-XXXX or similar
        const countryCode = cleaned.slice(0, cleaned.length - 10);
        const areaCode = cleaned.slice(-10, -7);
        const firstPart = cleaned.slice(-7, -4);
        const lastPart = cleaned.slice(-4);
        
        if (countryCode) {
            return `+${countryCode} (${areaCode}) ${firstPart}-${lastPart}`;
        }
        return `(${areaCode}) ${firstPart}-${lastPart}`;
    }
    
    return phoneNumber;
};

/**
 * Get relative time (e.g., "2 hours ago", "in 3 days")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    const locale = i18n.language || 'en';
    const dateObj = date instanceof Date ? date : new Date(date);
    
    if (isNaN(dateObj.getTime())) {
        return '';
    }
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    const rtf = new Intl.RelativeTimeFormat(localeMap[locale] || 'en-US', {
        numeric: 'auto'
    });
    
    const now = new Date();
    const diffInSeconds = Math.floor((dateObj - now) / 1000);
    const absDiff = Math.abs(diffInSeconds);
    
    if (absDiff < 60) {
        return rtf.format(diffInSeconds, 'second');
    } else if (absDiff < 3600) {
        return rtf.format(Math.floor(diffInSeconds / 60), 'minute');
    } else if (absDiff < 86400) {
        return rtf.format(Math.floor(diffInSeconds / 3600), 'hour');
    } else if (absDiff < 2592000) {
        return rtf.format(Math.floor(diffInSeconds / 86400), 'day');
    } else if (absDiff < 31536000) {
        return rtf.format(Math.floor(diffInSeconds / 2592000), 'month');
    } else {
        return rtf.format(Math.floor(diffInSeconds / 31536000), 'year');
    }
};

/**
 * Format list of items with proper conjunction
 * @param {Array} items - Array of items to format
 * @param {string} type - Type of list: 'conjunction' (and) or 'disjunction' (or)
 * @returns {string} Formatted list
 */
export const formatList = (items, type = 'conjunction') => {
    const locale = i18n.language || 'en';
    
    if (!Array.isArray(items) || items.length === 0) {
        return '';
    }
    
    const localeMap = {
        'en': 'en-US',
        'fr': 'fr-FR',
        'es': 'es-ES'
    };
    
    const formatter = new Intl.ListFormat(localeMap[locale] || 'en-US', {
        style: 'long',
        type: type
    });
    
    return formatter.format(items);
};

// Export all formatters as a single object for convenience
export default {
    formatDate,
    formatTime,
    formatCurrency,
    formatNumber,
    formatPercentage,
    formatDistance,
    formatPhoneNumber,
    getRelativeTime,
    formatList
};