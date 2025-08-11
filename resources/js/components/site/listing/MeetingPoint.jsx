import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaMapMarkerAlt } from 'react-icons/fa';

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

const MeetingPoint = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="flex items-start">
                    <div className="w-6 h-6 bg-gray-200 rounded mr-3 mt-1 animate-pulse"></div>
                    <div className="flex-1">
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Only show for category 5 (Things to Do)
    if (!listing || listing.category_id !== 5) return null;

    const meetingPoint = getTranslatedField(listing, 'meeting_point', currentLocale);
    
    if (!meetingPoint) return null;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('listing.meetingPoint.title', 'Meeting Point')}
            </h2>
            
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center border border-red-200">
                        <FaMapMarkerAlt className="text-red-500 text-lg" />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="prose prose-gray max-w-none">
                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: meetingPoint
                            }}
                        />
                    </div>
                    
                    {/* Additional info if city is available */}
                    {listing.city?.city_name && (
                        <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-sm text-gray-600">
                                <strong>{t('common.location', 'Location')}:</strong> {listing.city.city_name}, {t('common.morocco', 'Morocco')}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MeetingPoint;