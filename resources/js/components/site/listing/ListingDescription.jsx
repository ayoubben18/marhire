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

const ListingDescription = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [isExpanded, setIsExpanded] = useState(false);

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-7 bg-gray-200 rounded w-64 mb-4 animate-pulse"></div>
                <div className="space-y-3">
                    {[...Array(6)].map((_, index) => (
                        <div 
                            key={index} 
                            className={`h-4 bg-gray-200 rounded animate-pulse ${
                                index === 5 ? 'w-2/3' : 'w-full'
                            }`}
                        ></div>
                    ))}
                </div>
                <div className="h-10 bg-gray-200 rounded w-32 mt-4 animate-pulse"></div>
            </div>
        );
    }

    if (!listing) return null;

    const description = getTranslatedField(listing, 'description', currentLocale);
    
    if (!description) return null;

    // Check if content is very long (more than 500 characters)
    const isVeryLongContent = description.length > 500;
    const displayContent = isVeryLongContent && !isExpanded 
        ? description.substring(0, 500) + '...' 
        : description;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('listing.description.fullTitle', 'Everything You Need to Know')}
            </h2>
            
            <div className="prose prose-gray max-w-none">
                <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: displayContent
                    }}
                />
            </div>

            {isVeryLongContent && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-6 inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
                >
                    {isExpanded ? (
                        <>
                            <span>{t('common.showLess', 'Show Less')}</span>
                            <FaChevronUp className="ml-2 text-sm" />
                        </>
                    ) : (
                        <>
                            <span>{t('common.showMore', 'Show More')}</span>
                            <FaChevronDown className="ml-2 text-sm" />
                        </>
                    )}
                </button>
            )}

            {/* Additional metadata if available */}
            {(listing.category?.name || listing.city?.city_name) && (
                <div className="mt-6 pt-4 border-t border-gray-100">
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {listing.category?.name && (
                            <span>
                                <strong>{t('common.category', 'Category')}:</strong> {listing.category.name}
                            </span>
                        )}
                        {listing.city?.city_name && (
                            <span>
                                <strong>{t('common.location', 'Location')}:</strong> {listing.city.city_name}, {t('common.morocco', 'Morocco')}
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ListingDescription;