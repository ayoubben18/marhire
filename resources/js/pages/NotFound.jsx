import React from 'react';
import { useTranslation } from 'react-i18next';
import { getLocalizedUrl } from '../utils/localeManager';
import Footer from '../components/site/Footer';
import FreeTexts from '../components/site/FreeTexts';
import { FaSearch, FaArrowRight } from 'react-icons/fa';

const NotFound = () => {
    const { t } = useTranslation();

    const popularLinks = [
        { 
            title: t('notFound.links.carMarrakech', 'Car Rentals in Marrakech'), 
            href: getLocalizedUrl('/car-search?location=marrakech') 
        },
        { 
            title: t('notFound.links.activitiesAgadir', 'Activities in Agadir'), 
            href: getLocalizedUrl('/thingstodo-search?location=agadir') 
        },
        { 
            title: t('notFound.links.driverssCasablanca', 'Private Drivers in Casablanca'), 
            href: getLocalizedUrl('/private-search?location=casablanca') 
        },
        { 
            title: t('notFound.links.boatsAgadir', 'Boat Rentals in Agadir'), 
            href: getLocalizedUrl('/boat-search?location=agadir') 
        },
        { 
            title: t('notFound.links.explore', 'Explore All Destinations'), 
            href: getLocalizedUrl('/') 
        },
    ];

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <main className="flex-1 flex items-center justify-center py-16">
                    <div className="container text-center">
                        <div className="mx-auto flex items-center justify-center mb-6">
                            <div className="h-20 w-20 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(4, 134, 103, 0.12)', color: '#048667' }}>
                                <FaSearch className="h-10 w-10" />
                            </div>
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {t('notFound.title', '404 - Page Not Found')}
                        </h1>
                        
                        <p className="text-lg text-gray-600 max-w-xl mx-auto mb-8">
                            {t('notFound.description', 'Oops! The page you are looking for does not exist. It might have been moved or deleted.')}
                        </p>
                        
                        <a 
                            href={getLocalizedUrl('/')} 
                            className="inline-flex items-center justify-center px-6 py-3 rounded-lg transition-colors text-lg font-medium text-white hover:opacity-90"
                            style={{ backgroundColor: '#048667' }}
                        >
                            {t('notFound.returnHome', 'Return to Homepage')}
                        </a>
                        
                        <div className="mt-12 max-w-3xl mx-auto">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                                {t('notFound.popularLinks', 'Or, try one of these popular links:')}
                            </h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3">
                                {popularLinks.map((link, index) => (
                                    <a 
                                        key={index}
                                        href={link.href}
                                        className="flex items-center justify-between px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        <span className="font-medium" style={{ color: '#048667' }}>
                                            {link.title}
                                        </span>
                                        <FaArrowRight className="h-4 w-4" style={{ color: '#048667' }} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-12">
                            <p className="text-gray-500">
                                {t('notFound.needHelp', 'Need help?')}{' '}
                                <a 
                                    href={getLocalizedUrl('/support')} 
                                    className="hover:underline font-medium"
                                    style={{ color: '#048667' }}
                                >
                                    {t('notFound.contactUs', 'Contact our support team')}
                                </a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
            <FreeTexts slug="404" />
            <Footer />
        </>
    );
};

export default NotFound;