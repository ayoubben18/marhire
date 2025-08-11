import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaLocationDot, FaStar } from 'react-icons/fa6';

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

const ListingHeader = ({ listing, agency }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    const listingTitle = getTranslatedField(listing, 'title', currentLocale);
    const cityName = listing?.city?.city_name || '';
    const rating = listing?.average_rating || 0;
    const reviewsCount = listing?.reviews_count || 0;

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-6">
            {/* Left side: Title and location */}
            <div className="flex-1">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 leading-tight">
                    {listingTitle}
                </h1>
                
                {/* Location */}
                <div className="flex items-center text-gray-600 mb-2">
                    <FaLocationDot className="text-red-500 mr-2" size={16} />
                    <span className="text-base font-medium">
                        {cityName}{cityName && ', '}{t('common.morocco', 'Morocco')}
                    </span>
                </div>

                {/* Rating - Show only if listing has reviews */}
                {rating > 0 && reviewsCount > 0 && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, index) => (
                                <FaStar 
                                    key={index}
                                    className={`${
                                        index < Math.floor(rating) 
                                            ? 'text-yellow-400' 
                                            : 'text-gray-300'
                                    }`}
                                    size={16}
                                />
                            ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                            {rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-gray-500">
                            ({reviewsCount} {reviewsCount === 1 ? t('common.review', 'review') : t('common.reviews', 'reviews')})
                        </span>
                    </div>
                )}
            </div>

            {/* Right side: Agency logo */}
            {agency?.logo && (
                <div className="flex-shrink-0">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex items-center justify-center">
                        <img 
                            src={agency.logo.startsWith('/') ? agency.logo : `/${agency.logo}`}
                            alt={agency.name || t('common.agency_logo', 'Agency Logo')}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div 
                            className="hidden w-full h-full bg-gray-100 items-center justify-center text-xs text-gray-500"
                            style={{ display: 'none' }}
                        >
                            {agency.name?.[0]?.toUpperCase() || 'A'}
                        </div>
                    </div>
                    {agency.name && (
                        <p className="text-xs text-gray-500 text-center mt-1 truncate max-w-20">
                            {agency.name}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListingHeader;