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

const ListingBreadcrumbs = ({ listing, categoryId, city }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;

    // Category mapping
    const categoryNames = {
        2: 'Car Rental',
        3: 'Private Driver',
        4: 'Boat Rental',
        5: 'Activities'
    };

    const categoryName = categoryNames[categoryId] || t('common.category');
    const listingTitle = getTranslatedField(listing, 'title', currentLocale);
    const cityName = city?.city_name || '';

    // Breadcrumb items
    const breadcrumbItems = [
        {
            label: t('common.home', 'Home'),
            href: '/',
            active: false
        },
        {
            label: categoryName,
            href: `/category/${categoryId}`,
            active: false
        },
        {
            label: cityName,
            href: `/city/${city?.id}`,
            active: false
        },
        {
            label: listingTitle,
            href: '#',
            active: true
        }
    ];

    return (
        <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center text-sm text-gray-600">
                {/* Desktop: Show all breadcrumbs */}
                <div className="hidden md:flex items-center">
                    {breadcrumbItems.map((item, index) => (
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
                                    className="hover:text-blue-600 transition-colors duration-200 truncate max-w-xs"
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </div>

                {/* Mobile: Show only last 2 items */}
                <div className="flex md:hidden items-center">
                    {breadcrumbItems.slice(-2).map((item, index, arr) => (
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
                                    className="hover:text-blue-600 transition-colors duration-200 truncate max-w-32"
                                >
                                    {item.label}
                                </a>
                            )}
                        </li>
                    ))}
                </div>
            </ol>
        </nav>
    );
};

export default ListingBreadcrumbs;