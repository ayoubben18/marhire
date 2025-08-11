import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdWarning } from 'react-icons/md';

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

const SpecialNotes = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    if (loading) {
        return (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6 animate-pulse">
                <div className="flex items-start">
                    <div className="w-6 h-6 bg-amber-200 rounded-full mr-3 mt-1"></div>
                    <div className="flex-1">
                        <div className="h-5 bg-amber-200 rounded w-32 mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-amber-200 rounded"></div>
                            <div className="h-4 bg-amber-200 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (!listing) return null;

    const specialNotes = getTranslatedField(listing, 'special_notes', currentLocale);
    
    if (!specialNotes) return null;

    return (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-3 mt-1">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center border border-amber-300">
                        <MdWarning className="text-amber-600 text-sm" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                        {t('listing.specialNotes.title', 'Important Information')}
                    </h3>
                    <div className="prose prose-amber max-w-none">
                        <div
                            className="text-amber-800 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: specialNotes
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialNotes;