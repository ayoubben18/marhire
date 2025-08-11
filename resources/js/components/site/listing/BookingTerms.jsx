import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaFileContract, FaBan, FaShieldAlt } from 'react-icons/fa';
import { getLocalizedUrl } from '../../../utils/localeManager';

const BookingTerms = ({ loading }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return (
            <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
                <Skeleton height={30} width={200} className="mb-3" />
                <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-start gap-3">
                            <Skeleton width={20} height={20} />
                            <div className="flex-1">
                                <Skeleton height={20} width={180} />
                                <Skeleton height={16} width={250} className="mt-1" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const terms = [
        {
            icon: FaFileContract,
            title: t('listing.bookingTerms.termsConditions', 'Terms & Conditions'),
            description: t('listing.bookingTerms.termsDescription', 'Complete booking terms and rental agreement'),
            link: getLocalizedUrl('/terms-conditions'),
            iconColor: 'text-primary-600'
        },
        {
            icon: FaBan,
            title: t('listing.bookingTerms.cancellationPolicy', 'Cancellation Policy'),
            description: t('listing.bookingTerms.cancellationDescription', 'Flexible cancellation up to 48 hours before'),
            link: getLocalizedUrl('/cancellation-policy'),
            iconColor: 'text-primary-600'
        },
        {
            icon: FaShieldAlt,
            title: t('listing.bookingTerms.insuranceConditions', 'Insurance Conditions'),
            description: t('listing.bookingTerms.insuranceDescription', 'Comprehensive coverage and protection details'),
            link: getLocalizedUrl('/insurance-conditions'),
            iconColor: 'text-primary-600'
        }
    ];

    return (
        <div className="mb-6 bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('listing.bookingTerms.title', 'Booking Terms')}
            </h2>
            
            <p className="text-gray-600 mb-4">
                {t('listing.bookingTerms.subtitle', 'Before booking, please review:')}
            </p>

            <div className="space-y-3">
                {terms.map((term, index) => {
                    const Icon = term.icon;
                    return (
                        <a
                            key={index}
                            href={term.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary-50 transition-all duration-200 group border border-transparent hover:border-primary-100"
                        >
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                    <Icon className={`${term.iconColor}`} size={18} />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors flex items-center gap-2">
                                    {term.title}
                                    <span className="text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                        ↗
                                    </span>
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {term.description}
                                </p>
                            </div>
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingTerms;