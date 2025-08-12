import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

const ListingDescription = ({ loading, listing }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={250} className="mb-3" />
                <Skeleton count={4} height={20} className="mb-2" />
            </div>
        );
    }

    if (!listing) return null;

    const description = getTranslatedField(listing, 'description', currentLocale);
    
    if (!description) return null;

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('listing.description.title', 'Everything You Need to Know')}
            </h2>
            <div 
                className="text-gray-700 leading-relaxed w-full prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
};

export default ListingDescription;