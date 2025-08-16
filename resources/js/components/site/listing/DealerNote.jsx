import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaUserTie } from 'react-icons/fa';

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

const DealerNote = ({ loading, listing }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [isExpanded, setIsExpanded] = useState(false);
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={150} className="mb-3" />
                <Skeleton count={2} height={20} className="mb-2" />
            </div>
        );
    }

    if (!listing) return null;

    const dealerNote = getTranslatedField(listing, 'dealer_note', currentLocale);
    
    if (!dealerNote) return null;

    // Check if content is long enough to warrant read more functionality
    const isLongContent = dealerNote.length > 250;
    const displayContent = isLongContent && !isExpanded 
        ? dealerNote.substring(0, 250) + '...' 
        : dealerNote;

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaUserTie className="text-primary-600" size={18} />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900">
                    {t('listing.dealerNote.title', 'Dealer Note')}
                </h2>
            </div>
            <div 
                className="text-gray-700 leading-relaxed w-full prose prose-gray max-w-none"
                dangerouslySetInnerHTML={{ __html: displayContent }}
            />

            {isLongContent && (
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="mt-4 flex items-center font-medium transition-colors duration-200"
                    style={{ color: '#048667' }}
                    onMouseEnter={(e) => e.target.style.color = '#036a52'}
                    onMouseLeave={(e) => e.target.style.color = '#048667'}
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

export default DealerNote;