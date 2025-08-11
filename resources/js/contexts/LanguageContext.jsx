import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { switchLocale, getLocaleFromUrl } from '../utils/localeManager';

const LanguageContext = createContext();

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

export const LanguageProvider = ({ children }) => {
    const { i18n } = useTranslation();
    // Initialize from URL first, then fall back to i18n language
    const initialLanguage = getLocaleFromUrl() || i18n.language || 'en';
    const [currentLanguage, setCurrentLanguage] = useState(initialLanguage);
    const [isChangingLanguage, setIsChangingLanguage] = useState(false);

    const availableLanguages = [
        { code: 'en', name: 'English', flag: '🇬🇧' },
        { code: 'fr', name: 'Français', flag: '🇫🇷' },
        { code: 'es', name: 'Español', flag: '🇪🇸' }
    ];

    useEffect(() => {
        // Sync with i18n language changes
        const handleLanguageChange = (lng) => {
            setCurrentLanguage(lng);
        };

        i18n.on('languageChanged', handleLanguageChange);

        // Also sync with URL changes
        const handleUrlChange = () => {
            const urlLocale = getLocaleFromUrl();
            if (urlLocale && urlLocale !== currentLanguage) {
                setCurrentLanguage(urlLocale);
                // Also update i18n if needed
                if (i18n.language !== urlLocale) {
                    i18n.changeLanguage(urlLocale);
                }
            }
        };

        // Listen for URL changes (popstate for back/forward, custom event for programmatic changes)
        window.addEventListener('popstate', handleUrlChange);
        window.addEventListener('languagechange', handleUrlChange);

        // Initial sync
        handleUrlChange();

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
            window.removeEventListener('popstate', handleUrlChange);
            window.removeEventListener('languagechange', handleUrlChange);
        };
    }, [i18n, currentLanguage]);

    const changeLanguage = async (languageCode) => {
        if (languageCode === currentLanguage) return;

        setIsChangingLanguage(true);
        try {
            // Use the centralized locale manager to handle the switch
            // This will reload the page with the new locale
            switchLocale(languageCode);
            
            // Note: The page will reload, so the following won't execute
            // but keeping for fallback if switchLocale is modified
        } catch (error) {
            console.error('Error changing language:', error);
            setIsChangingLanguage(false);
        }
    };

    const getLanguageName = (code) => {
        const language = availableLanguages.find(lang => lang.code === code);
        return language ? language.name : code;
    };

    const getLanguageFlag = (code) => {
        const language = availableLanguages.find(lang => lang.code === code);
        return language ? language.flag : '🌐';
    };

    const isRTL = () => {
        return ['ar', 'he'].includes(currentLanguage);
    };

    const value = {
        currentLanguage,
        availableLanguages,
        changeLanguage,
        getLanguageName,
        getLanguageFlag,
        isChangingLanguage,
        isRTL
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};