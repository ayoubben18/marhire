import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const WhatsIncluded = ({ loading, listing }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={200} className="mb-4" />
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Skeleton height={24} width={100} className="mb-4" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 mb-3">
                                <Skeleton circle width={20} height={20} />
                                <Skeleton width={200} height={16} />
                            </div>
                        ))}
                    </div>
                    <div>
                        <Skeleton height={24} width={120} className="mb-4" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 mb-3">
                                <Skeleton circle width={20} height={20} />
                                <Skeleton width={200} height={16} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (!listing) return null;

    // Get included and notIncluded from the relationships
    const includedItems = listing.included || [];
    const notIncludedItems = listing.not_included || listing.notIncluded || [];

    // Don't show the section if both lists are empty
    if (includedItems.length === 0 && notIncludedItems.length === 0) {
        return null;
    }

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('listing.whatsIncluded.title', "What's Included")}
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Included Items */}
                {includedItems.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                                <FaCheckCircle className="text-primary-600" size={16} />
                            </div>
                            {t('listing.whatsIncluded.included', 'Included')}
                        </h3>
                        <ul className="space-y-2">
                            {includedItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                                    <FaCheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
                                    <span className="text-gray-700">
                                        {item.item || item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Not Included Items */}
                {notIncludedItems.length > 0 && (
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
                            <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                                <FaTimesCircle className="text-red-600" size={16} />
                            </div>
                            {t('listing.whatsIncluded.notIncluded', 'Not Included')}
                        </h3>
                        <ul className="space-y-2">
                            {notIncludedItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-3 p-1 rounded-lg hover:bg-gray-50 transition-colors">
                                    <FaTimesCircle className="text-red-500 mt-0.5 flex-shrink-0" size={18} />
                                    <span className="text-gray-700">
                                        {item.item || item}
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