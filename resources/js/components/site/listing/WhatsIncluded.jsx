import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Helper function to get translated field
const getTranslatedField = (item, field, locale) => {
    if (item?.translated_fields && item.translated_fields[field]) {
        if (item.translated_fields[field][locale]) {
            return item.translated_fields[field][locale];
        }
        if (item.translated_fields[field]['en']) {
            return item.translated_fields[field]['en'];
        }
    }
    return item?.[field] || '';
};

const WhatsIncluded = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[...Array(2)].map((_, columnIndex) => (
                        <div key={columnIndex}>
                            <div className="h-5 bg-gray-200 rounded w-24 mb-3 animate-pulse"></div>
                            <div className="space-y-3">
                                {[...Array(3)].map((_, itemIndex) => (
                                    <div key={itemIndex} className="flex items-center animate-pulse">
                                        <div className="w-5 h-5 bg-gray-200 rounded-full mr-3"></div>
                                        <div className="h-4 bg-gray-200 rounded flex-1"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!listing) return null;

    // Get included and not included arrays
    let includedItems = [];
    let notIncludedItems = [];

    // Handle different data formats
    if (listing.included) {
        if (Array.isArray(listing.included)) {
            includedItems = listing.included;
        } else if (typeof listing.included === 'string') {
            try {
                includedItems = JSON.parse(listing.included);
            } catch {
                // If JSON parsing fails, treat as comma-separated string
                includedItems = listing.included.split(',').map(item => item.trim()).filter(Boolean);
            }
        }
    }

    if (listing.not_included) {
        if (Array.isArray(listing.not_included)) {
            notIncludedItems = listing.not_included;
        } else if (typeof listing.not_included === 'string') {
            try {
                notIncludedItems = JSON.parse(listing.not_included);
            } catch {
                // If JSON parsing fails, treat as comma-separated string
                notIncludedItems = listing.not_included.split(',').map(item => item.trim()).filter(Boolean);
            }
        }
    }

    // Don't render if no items
    if (!includedItems.length && !notIncludedItems.length) return null;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('listing.included.title', "What's Included")}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Included Items */}
                {includedItems.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-green-800 mb-3 flex items-center">
                            <FaCheckCircle className="text-green-600 mr-2" />
                            {t('listing.included.included', 'Included')}
                        </h3>
                        <ul className="space-y-3">
                            {includedItems.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <FaCheckCircle className="text-green-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                                    <span className="text-gray-700 text-sm leading-relaxed">
                                        {typeof item === 'object' ? getTranslatedField(item, 'name', currentLocale) : item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Not Included Items */}
                {notIncludedItems.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-red-800 mb-3 flex items-center">
                            <FaTimesCircle className="text-red-600 mr-2" />
                            {t('listing.included.notIncluded', 'Not Included')}
                        </h3>
                        <ul className="space-y-3">
                            {notIncludedItems.map((item, index) => (
                                <li key={index} className="flex items-start">
                                    <FaTimesCircle className="text-red-500 mr-3 mt-0.5 flex-shrink-0" size={16} />
                                    <span className="text-gray-700 text-sm leading-relaxed">
                                        {typeof item === 'object' ? getTranslatedField(item, 'name', currentLocale) : item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WhatsIncluded;