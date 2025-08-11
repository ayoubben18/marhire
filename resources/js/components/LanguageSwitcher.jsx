import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = ({ className = '', dropdownPosition = 'bottom-right' }) => {
    const { currentLanguage, availableLanguages, changeLanguage, getLanguageFlag, getLanguageName, isChangingLanguage } = useLanguage();
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLanguageChange = async (languageCode) => {
        await changeLanguage(languageCode);
        setIsOpen(false);
    };

    const positionClasses = {
        'bottom-right': 'right-0 mt-2',
        'bottom-left': 'left-0 mt-2',
        'top-right': 'right-0 bottom-full mb-2',
        'top-left': 'left-0 bottom-full mb-2'
    };

    return (
        <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                disabled={isChangingLanguage}
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <span className="mr-2 text-lg">{getLanguageFlag(currentLanguage)}</span>
                <span className="hidden sm:inline">{getLanguageName(currentLanguage)}</span>
                <span className="sm:hidden">{currentLanguage.toUpperCase()}</span>
                {isChangingLanguage ? (
                    <svg className="ml-2 -mr-1 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                ) : (
                    <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                )}
            </button>

            {isOpen && (
                <div 
                    className={`absolute z-50 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ${positionClasses[dropdownPosition]}`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="language-menu"
                >
                    <div className="py-1" role="none">
                        {availableLanguages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language.code)}
                                className={`${
                                    currentLanguage === language.code
                                        ? 'bg-gray-100 text-gray-900 font-medium'
                                        : 'text-gray-700 hover:bg-gray-50'
                                } group flex items-center w-full px-4 py-2 text-sm transition-colors duration-150`}
                                role="menuitem"
                                disabled={isChangingLanguage || currentLanguage === language.code}
                            >
                                <span className="mr-3 text-lg">{language.flag}</span>
                                <span className="flex-1 text-left">{language.name}</span>
                                {currentLanguage === language.code && (
                                    <svg className="ml-2 h-4 w-4 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;