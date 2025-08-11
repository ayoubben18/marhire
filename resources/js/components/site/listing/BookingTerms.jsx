import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdCheck, MdSupport, MdPayment, MdUpdate } from 'react-icons/md';

const BookingTerms = ({ listing, loading }) => {
    const { t } = useTranslation();

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-40 mb-4 animate-pulse"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[...Array(4)].map((_, index) => (
                        <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg animate-pulse">
                            <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                            <div>
                                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                                <div className="h-3 bg-gray-200 rounded w-32"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const terms = [
        {
            icon: MdCheck,
            title: t('listing.terms.instantConfirmation', 'Instant Confirmation'),
            description: t('listing.terms.instantConfirmationDesc', 'Get confirmed instantly'),
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: MdUpdate,
            title: t('listing.terms.freeAmendments', 'Free Amendments'),
            description: t('listing.terms.freeAmendmentsDesc', 'Change your booking for free'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: MdSupport,
            title: t('listing.terms.support24_7', '24/7 Support'),
            description: t('listing.terms.support24_7Desc', 'We\'re here to help anytime'),
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
        },
        {
            icon: MdPayment,
            title: t('listing.terms.securePayment', 'Secure Payment'),
            description: t('listing.terms.securePaymentDesc', 'Your payment is protected'),
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        }
    ];

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('listing.terms.title', 'Booking Terms')}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {terms.map((term, index) => {
                    const IconComponent = term.icon;
                    return (
                        <div 
                            key={index}
                            className={`flex items-center p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${term.bgColor} border-gray-100`}
                        >
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${term.bgColor} border-2 border-white shadow-sm`}>
                                <IconComponent className={`text-lg ${term.color}`} />
                            </div>
                            <div className="ml-3">
                                <h3 className="font-medium text-gray-900 text-sm">
                                    {term.title}
                                </h3>
                                <p className="text-xs text-gray-600 mt-1">
                                    {term.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BookingTerms;