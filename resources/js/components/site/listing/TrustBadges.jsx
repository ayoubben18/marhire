import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdCancel, MdPriceCheck, MdLocalActivity } from 'react-icons/md';

const TrustBadges = () => {
    const { t } = useTranslation();

    const badges = [
        {
            icon: MdCancel,
            title: t('trust.free_cancellation', 'Free Cancellation'),
            description: t('trust.free_cancellation_desc', 'Up to 48 hours before'),
            color: 'text-green-600',
            bgColor: 'bg-green-50'
        },
        {
            icon: MdPriceCheck,
            title: t('trust.best_price', 'Best Price Guarantee'),
            description: t('trust.best_price_desc', 'Found it cheaper? We\'ll match it'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
        },
        {
            icon: MdLocalActivity,
            title: t('trust.local_expertise', 'Local Expertise'),
            description: t('trust.local_expertise_desc', 'Curated by local experts'),
            color: 'text-orange-600',
            bgColor: 'bg-orange-50'
        }
    ];

    return (
        <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {badges.map((badge, index) => {
                    const IconComponent = badge.icon;
                    return (
                        <div 
                            key={index}
                            className={`${badge.bgColor} rounded-lg p-4 border border-opacity-20 transition-transform hover:scale-105 duration-200`}
                        >
                            <div className="flex items-start gap-3">
                                <div className={`${badge.color} p-2 rounded-full bg-white shadow-sm flex-shrink-0`}>
                                    <IconComponent size={20} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-gray-900 text-sm mb-1">
                                        {badge.title}
                                    </h3>
                                    <p className="text-xs text-gray-600 leading-relaxed">
                                        {badge.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TrustBadges;