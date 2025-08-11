import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaInfoCircle } from 'react-icons/fa';

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

const SpecialNotes = ({ loading, listing }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={250} className="mb-3" />
                <Skeleton count={3} height={20} className="mb-2" />
            </div>
        );
    }

    if (!listing) return null;

    const specialNotes = getTranslatedField(listing, 'special_notes', currentLocale);
    
    if (!specialNotes) return null;

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaInfoCircle className="text-primary-600" size={20} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    {t('listing.specialNotes.title', 'Special Notes and Requirements')}
                </h2>
            </div>
            
            <div className="bg-primary-50 border-l-4 border-primary-500 p-3 rounded-r-lg">
                <div 
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: specialNotes }}
                />
            </div>
        </div>
    );
};

export default SpecialNotes;