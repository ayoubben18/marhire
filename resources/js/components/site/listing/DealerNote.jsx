import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaQuoteLeft } from 'react-icons/fa';

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

const DealerNote = ({ listing, agency, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    if (loading) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 animate-pulse">
                <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-200 rounded mr-4 mt-1"></div>
                    <div className="flex-1">
                        <div className="h-5 bg-blue-200 rounded w-32 mb-3"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-blue-200 rounded"></div>
                            <div className="h-4 bg-blue-200 rounded w-3/4"></div>
                        </div>
                        <div className="h-4 bg-blue-200 rounded w-24 mt-3"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!listing) return null;

    const dealerNote = getTranslatedField(listing, 'dealer_note', currentLocale);
    
    if (!dealerNote) return null;

    const agencyName = agency?.name || t('common.agency', 'Agency');

    return (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <div className="flex items-start">
                <div className="flex-shrink-0 mr-4 mt-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center border border-blue-300">
                        <FaQuoteLeft className="text-blue-600 text-sm" />
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                        {t('listing.dealerNote.title', 'Note from Provider')}
                    </h3>
                    <div className="prose prose-blue max-w-none">
                        <div
                            className="text-blue-800 leading-relaxed italic mb-4"
                            dangerouslySetInnerHTML={{
                                __html: dealerNote
                            }}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-blue-700">
                            — {agencyName}
                        </span>
                        {agency?.logo && (
                            <div className="w-8 h-8 bg-white rounded border border-blue-200 overflow-hidden flex items-center justify-center">
                                <img 
                                    src={agency.logo.startsWith('/') ? agency.logo : `/${agency.logo}`}
                                    alt={agencyName}
                                    className="w-full h-full object-contain p-1"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerNote;