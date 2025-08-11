import React from 'react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaCheckCircle, FaShieldAlt, FaAward, FaMapMarkedAlt } from 'react-icons/fa';

const ListingTrustNotes = ({ loading, listing }) => {
    const { t } = useTranslation();
    
    if (loading) {
        return (
            <div className="mb-8 bg-white rounded-lg shadow-sm p-4 md:p-5">
                <Skeleton height={30} width={200} className="mb-4" />
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-3 md:p-4 rounded-lg border border-gray-100">
                            <Skeleton height={20} width={180} className="mb-1" />
                            <Skeleton height={14} width="100%" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!listing) return null;

    const trustFeatures = [
        {
            icon: FaCheckCircle,
            title: t('listing.trustNotes.cancellation', 'Free Cancellation'),
            description: t('listing.trustNotes.cancellationText', 'Free cancellation up to 48 hours before your experience begins (local time)')
        },
        {
            icon: FaAward,
            title: t('listing.trustNotes.guarantee', 'Best Price Guarantee'),
            description: t('listing.trustNotes.guaranteeText', "Find a better price elsewhere? We'll match it, ensuring you always get the best deal")
        },
        {
            icon: FaMapMarkedAlt,
            title: t('listing.trustNotes.expertise', 'Local Expertise'),
            description: t('listing.trustNotes.expertiseText', 'Travel with confidence, guided by local experts who know the best spots')
        }
    ];

    return (
        <div className="mb-8 bg-white rounded-lg shadow-sm p-4 md:p-5">
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                {t('listing.trustNotes.title', 'Why Book With Us')}
            </h2>
            
            <div className="space-y-3">
                {trustFeatures.map((feature, index) => (
                    <div 
                        key={index}
                        className="group relative overflow-hidden rounded-xl border border-gray-200 p-3 md:p-4 transition-all duration-300 hover:border-primary-400 hover:shadow-md"
                    >
                        <div className="flex items-start gap-3">
                            {/* Icon with primary color */}
                            <div className="flex-shrink-0">
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-50">
                                    <feature.icon className="h-4 w-4 text-primary-600" />
                                </div>
                            </div>
                            
                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-base font-semibold text-gray-900">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600 leading-relaxed mt-0.5">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Subtle hover effect background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-50/0 to-primary-50/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ListingTrustNotes;

// Add these styles to your CSS if not already present
const customStyles = `
.text-primary-600 {
    color: #368d7c;
}

.text-primary-500 {
    color: #3d9d8a;
}

.bg-primary-50 {
    background-color: #368d7c10;
}

.bg-primary-100 {
    background-color: #368d7c20;
}

.border-primary-400 {
    border-color: #368d7c60;
}

.from-primary-50\/0 {
    --tw-gradient-from: rgb(54 141 124 / 0);
}

.to-primary-50\/50 {
    --tw-gradient-to: rgb(54 141 124 / 0.05);
}
`;