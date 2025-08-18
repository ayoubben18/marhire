import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import getWtspUrl from "../utils/WhatsappMsg";
import { useTranslation } from "react-i18next";

// Helper function to get translated field
const getTranslatedField = (listing, field, locale) => {
    if (listing?.translated_fields && listing.translated_fields[field]) {
        if (listing.translated_fields[field][locale]) {
            return listing.translated_fields[field][locale];
        }
        if (listing.translated_fields[field]['en']) {
            return listing.translated_fields[field]['en'];
        }
    }
    return listing?.[field] || '';
};

const SingleListingBottom = ({ listing }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    
    return (
        listing && (
            <div className="singlelisting-footer">
                <div className="singlelisting-footer__h3">
                    <h3>{getTranslatedField(listing, 'title', currentLocale)}</h3>
                </div>
                <div className="singlelisting-footer__cta">
                    <a
                        href={getWtspUrl(listing)}
                        target="_blank"
                        className="cta-wtsp"
                    >
                        <FaWhatsapp size={22} /> WhatsApp
                    </a>
                    <button 
                        onClick={() => {
                            // Determine which form to scroll to based on viewport
                            const isMobile = window.innerWidth < 1025;
                            const formId = isMobile ? 'mobile-booking-form' : 'desktop-booking-form';
                            const formElement = document.getElementById(formId);
                            const scrollContainer = document.querySelector('.listing-container__right');
                            
                            if (formElement) {
                                if (!isMobile && scrollContainer) {
                                    // Desktop: Scroll within the container
                                    const containerRect = scrollContainer.getBoundingClientRect();
                                    const formRect = formElement.getBoundingClientRect();
                                    const scrollTop = formRect.top - containerRect.top + scrollContainer.scrollTop;
                                    
                                    scrollContainer.scrollTo({
                                        top: Math.max(0, scrollTop - 20),
                                        behavior: 'smooth'
                                    });
                                } else {
                                    // Mobile: Scroll the page
                                    const headerOffset = 80;
                                    const elementPosition = formElement.getBoundingClientRect().top;
                                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                                    
                                    window.scrollTo({
                                        top: offsetPosition,
                                        behavior: 'smooth'
                                    });
                                }
                            }
                        }}
                        className="cta-book-now"
                    >
                        <FaRegCalendarAlt size={22} /> {t("common.bookNow")}
                    </button>
                </div>
            </div>
        )
    );
};

export default SingleListingBottom;
