import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronRight } from 'react-icons/fa6';

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

const ListingBreadcrumbs = ({ loading, listing, currentLocale, getTranslatedField, t }) => {
    // Use props passed from parent component

    // Category mapping - Fixed correct category IDs
    const categoryNames = {
        2: 'Car Rental',
        3: 'Private Driver',
        4: 'Boat Rental',
        5: 'Things To Do'
    };

    // Category slug mapping for URLs
    const categorySlugs = {
        2: 'car-rental',
        3: 'private-driver',
        4: 'boats',
        5: 'things-to-do'
    };

    const categoryName = categoryNames[listing?.category_id] || t('common.category', 'Category');
    const categorySlug = categorySlugs[listing?.category_id];
    const listingTitle = listing ? getTranslatedField(listing, 'title', currentLocale) : '';
    const cityName = listing?.city?.city_name || listing?.city?.name || '';

    // Get locale prefix for URLs (if currentLocale is provided)
    const localePrefix = currentLocale && currentLocale !== 'en' ? `/${currentLocale}` : '';
    
    // Breadcrumb items
    const breadcrumbItems = [
        {
            label: t('common.home', 'Home'),
            href: localePrefix || '/',
            active: false
        },
        {
            label: categoryName,
            href: categorySlug ? `${localePrefix}/category/${categorySlug}` : '#',
            active: false
        },
        {
            label: cityName,
            href: `${localePrefix}/city/${cityName}`,
            active: false
        },
        {
            label: listingTitle,
            href: '#',
            active: true
        }
    ];

    // Don't render if loading or no listing data
    if (loading || !listing) {
        return (
            <div className="mb-4 h-6 bg-gray-200 rounded animate-pulse"></div>
        );
    }

    // Filter out empty breadcrumb items
    const validBreadcrumbItems = breadcrumbItems.filter(item => item.label && item.label.trim() !== '');

    // Generate JSON-LD schema for breadcrumbs
    const generateBreadcrumbSchema = () => {
        const baseUrl = window.location.origin;
        
        const itemListElement = validBreadcrumbItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": item.href === '#' ? undefined : `${baseUrl}${item.href}`
        }));

        return {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": itemListElement.filter(item => item.item !== undefined)
        };
    };

    return (
        <>
            {/* JSON-LD Schema for Breadcrumbs */}
            <script 
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(generateBreadcrumbSchema())
                }}
            />
            
            <nav className="mb-4" aria-label="Breadcrumb">
                <ol className="flex flex-wrap items-center text-sm text-gray-600">
                {/* Desktop: Show all breadcrumbs */}
                <div className="hidden md:flex items-center">
                    {validBreadcrumbItems.map((item, index) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <FaChevronRight 
                                    className="mx-2 text-gray-400" 
                                    size={12} 
                                />
                            )}
                            {item.active ? (
                                <span className="font-medium text-gray-900 truncate max-w-xs">
                                    {item.label}
                                </span>
                            ) : (
                                <a 
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = item.href;
                                    }}
                                    className="hover:text-blue-600 transition-colors duration-200 truncate max-w-xs cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </div>

                {/* Mobile: Show only last 2 items */}
                <div className="flex md:hidden items-center">
                    {validBreadcrumbItems.slice(-2).map((item, index, arr) => (
                        <li key={index} className="flex items-center">
                            {index > 0 && (
                                <FaChevronRight 
                                    className="mx-2 text-gray-400" 
                                    size={12} 
                                />
                            )}
                            {item.active ? (
                                <span className="font-medium text-gray-900 truncate max-w-48">
                                    {item.label}
                                </span>
                            ) : (
                                <a 
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        window.location.href = item.href;
                                    }}
                                    className="hover:text-blue-600 transition-colors duration-200 truncate max-w-32 cursor-pointer"
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </div>
            </ol>
        </nav>
        </>
    );
};

export default ListingBreadcrumbs;