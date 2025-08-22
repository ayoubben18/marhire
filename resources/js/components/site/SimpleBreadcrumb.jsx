import React from 'react';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';

const SimpleBreadcrumb = ({ currentPage }) => {
    const { t } = useTranslation();
    
    return (
        <div className="breadcrumb-container">
            <div className="container">
                <nav className="breadcrumb-nav">
                    <a href="/" className="breadcrumb-home">
                        <FaHome />
                    </a>
                    <FaChevronRight className="breadcrumb-separator" />
                    <span className="breadcrumb-current">{currentPage}</span>
                </nav>
            </div>
        </div>
    );
};

export default SimpleBreadcrumb;