import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

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

const ListingOverview = ({ loading, listing }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [isExpanded, setIsExpanded] = useState(false);

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!listing) {
        return null;
    }

    const shortDescription = getTranslatedField(listing, 'short_description', currentLocale);
    
    if (!shortDescription) {
        return null;
    }

    // Check if content is long enough to warrant read more functionality
    const isLongContent = shortDescription.length > 250;
    const displayContent = isLongContent && !isExpanded 
        ? shortDescription.substring(0, 250) + '...' 
        : shortDescription;

    return (
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900">
                {t('listing.overview.title', 'Overview')}
            </h2>
            
            <div className="prose prose-gray max-w-none">
                <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: displayContent
                    }}
                />
            </div>

            {isLongContent && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                >
                    {isExpanded ? (
                        <>
                            <span>{t('common.readLess', 'Read Less')}</span>
                            <FaChevronUp className="ml-1 text-sm" />
                        </>
                    ) : (
                        <>
                            <span>{t('common.readMore', 'Read More')}</span>
                            <FaChevronDown className="ml-1 text-sm" />
                        </>
                    )}
                </button>
            )}
        </div>
    );
};

export default ListingOverview;