import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6';

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

const ListingPolicies = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [activeTab, setActiveTab] = useState('terms');
    const [expandedSections, setExpandedSections] = useState({});

    if (loading) {
        return (
            <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
                <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
                <div className="flex space-x-1 mb-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
                    ))}
                </div>
                <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (!listing) return null;

    const termsConditions = getTranslatedField(listing, 'terms_conditions', currentLocale);
    const cancellationPolicy = getTranslatedField(listing, 'cancellation_policy', currentLocale);
    const insurancePolicy = getTranslatedField(listing, 'insurance_policy', currentLocale);

    // Don't render if no policies available
    if (!termsConditions && !cancellationPolicy && !insurancePolicy) return null;

    const tabs = [
        {
            id: 'terms',
            label: t('listing.policies.termsConditions', 'Terms & Conditions'),
            content: termsConditions,
            show: !!termsConditions
        },
        {
            id: 'cancellation',
            label: t('listing.policies.cancellationPolicy', 'Cancellation Policy'),
            content: cancellationPolicy,
            show: !!cancellationPolicy
        },
        {
            id: 'insurance',
            label: t('listing.policies.insurance', 'Insurance'),
            content: insurancePolicy,
            show: !!insurancePolicy
        }
    ].filter(tab => tab.show);

    // Set active tab to first available tab if current active tab has no content
    const activeTabData = tabs.find(tab => tab.id === activeTab) || tabs[0];

    const toggleExpanded = (tabId) => {
        setExpandedSections(prev => ({
            ...prev,
            [tabId]: !prev[tabId]
        }));
    };

    const shouldShowToggle = (content) => {
        return content && content.length > 300;
    };

    const getDisplayContent = (content, tabId) => {
        if (!content) return '';
        
        const isExpanded = expandedSections[tabId];
        const shouldTruncate = shouldShowToggle(content);
        
        if (shouldTruncate && !isExpanded) {
            return content.substring(0, 300) + '...';
        }
        
        return content;
    };

    if (tabs.length === 0) return null;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                {t('listing.policies.title', 'Policies')}
            </h2>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200 ${
                            activeTab === tab.id
                                ? 'bg-white text-blue-600 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTabData && (
                <div className="tab-content">
                    <div className="prose prose-gray max-w-none">
                        <div
                            className="text-gray-700 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: getDisplayContent(activeTabData.content, activeTabData.id)
                            }}
                        />
                    </div>

                    {shouldShowToggle(activeTabData.content) && (
                        <button
                            onClick={() => toggleExpanded(activeTabData.id)}
                            className="mt-4 flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                        >
                            {expandedSections[activeTabData.id] ? (
                                <>
                                    <span>{t('common.showLess', 'Show Less')}</span>
                                    <FaChevronUp className="ml-1 text-sm" />
                                </>
                            ) : (
                                <>
                                    <span>{t('common.showMore', 'Show More')}</span>
                                    <FaChevronDown className="ml-1 text-sm" />
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default ListingPolicies;