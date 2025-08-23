import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp, FaHome } from "react-icons/fa";

const HeroSectionJoinUs = () => {
    const { t } = useTranslation();

    const scrollToForm = () => {
        const formSection = document.getElementById('partnership-form');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const openWhatsApp = () => {
        const message = encodeURIComponent("Hello, I'm interested in partnering with MarHire. Could you please provide more information about the partnership program?");
        const whatsappUrl = `https://wa.me/212660745055?text=${message}`;
        window.open(whatsappUrl, '_blank');
    };

    // Add JSON-LD schema for SEO
    useEffect(() => {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://marhire.com/"
                },
                {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Partner with MarHire",
                    "item": "https://marhire.com/list-your-property"
                }
            ]
        };

        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MarHire",
            "description": "Morocco's trusted marketplace for car rentals, private drivers, boat tours, and local activities",
            "url": "https://marhire.com",
            "logo": "https://marhire.com/images/logo.png",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+212660745055",
                "contactType": "Business Partnership"
            }
        };

        const script1 = document.createElement('script');
        script1.type = 'application/ld+json';
        script1.innerHTML = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script1);

        const script2 = document.createElement('script');
        script2.type = 'application/ld+json';
        script2.innerHTML = JSON.stringify(organizationSchema);
        document.head.appendChild(script2);

        return () => {
            // Cleanup
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, []);

    return (
        <>
            <div className="hero-section-join-us">
                <div className="hero-background">
                    <img 
                        src="/images/join-us.jpg" 
                        alt="Join MarHire Partnership" 
                        className="hero-bg-image"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="container">
                        <div className="hero-text-content">
                            {/* Breadcrumb inside hero section */}
                            <div className="hero-nav-path">
                                <div className="nav-path-container">
                                    <a href="/" title={t('common.home', 'Home')} className="nav-home-link">
                                        <FaHome size={14} />
                                    </a>
                                    <span className="nav-path-arrow">&gt;</span>
                                    <span className="nav-current-page">
                                        {t('joinUs.breadcrumb', 'Become a Partner')}
                                    </span>
                                </div>
                            </div>

                            <h1 className="hero-title">
                                {t('joinUs.hero.title', 'Partner with MarHire — List Cars, Drivers, Boats & Activities in Morocco')}
                            </h1>
                            <p className="hero-subtitle">
                                {t('joinUs.hero.subtitle', 'Join Morocco\'s trusted marketplace to connect your car rentals, private driver services, boat tours, or local activities with thousands of travelers. We handle the marketing and bookings, so you can focus on providing exceptional service.')}
                            </p>
                            <div className="hero-buttons">
                                <button 
                                    className="hero-cta-btn"
                                    onClick={scrollToForm}
                                >
                                    {t('joinUs.hero.cta', 'Apply Now')}
                                </button>
                                <button 
                                    className="hero-whatsapp-btn whatsapp-button"
                                    onClick={openWhatsApp}
                                >
                                    <FaWhatsapp size={16} className="whatsapp-icon" />
                                    <span className="whatsapp-text">{t('joinUs.hero.whatsapp', 'Chat on WhatsApp')}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>{`
                .hero-nav-path {
                    margin-bottom: 20px;
                }

                .nav-path-container {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 13px;
                    font-weight: 400;
                }

                .nav-home-link {
                    color: rgba(255, 255, 255, 0.8);
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    transition: color 0.2s ease;
                }

                .nav-home-link:hover {
                    color: rgba(255, 255, 255, 1);
                }

                .nav-path-arrow {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 12px;
                    margin: 0 2px;
                }

                .nav-current-page {
                    color: rgba(255, 255, 255, 0.7);
                    font-size: 13px;
                }

                .hero-section-join-us {
                    position: relative;
                    min-height: 60vh;
                    padding: 60px 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: visible;
                }

                .hero-background {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                }

                .hero-bg-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                }

                .hero-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%);
                    z-index: 2;
                }

                .hero-content {
                    position: relative;
                    z-index: 3;
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    color: white;
                }

                .hero-text-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    max-width: 900px;
                    margin: 0 auto;
                    padding: 0 20px;
                    width: 100%;
                }

                .hero-title {
                    font-size: 3.2rem;
                    font-weight: 700;
                    margin-bottom: 1.5rem;
                    line-height: 1.2;
                    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
                    text-align: center;
                }

                .hero-subtitle {
                    font-size: 1.2rem;
                    font-weight: 400;
                    margin-bottom: 2.5rem;
                    line-height: 1.6;
                    opacity: 0.95;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                    max-width: 800px;
                    text-align: center;
                }

                .hero-buttons {
                    display: flex;
                    gap: 20px;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .hero-cta-btn {
                    background-color: #048667;
                    color: white;
                    border: none;
                    font-size: 1rem;
                    padding: 15px 30px;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    box-shadow: 0 2px 8px rgba(4, 134, 103, 0.3);
                }

                .hero-cta-btn:hover {
                    background-color: #036b56;
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(4, 134, 103, 0.4);
                }

                .whatsapp-button {
                    background-color: transparent;
                    color: white;
                    border: 2px solid white;
                    font-size: 1rem;
                    padding: 13px 28px;
                    border-radius: 6px;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    white-space: nowrap;
                }

                .whatsapp-button:hover {
                    background-color: rgba(255, 255, 255, 0.1);
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
                }

                .whatsapp-button svg {
                    flex-shrink: 0;
                }


                @media (max-width: 768px) {
                    .hero-section-join-us {
                        padding: 80px 0 40px;
                        min-height: 450px;
                    }

                    .hero-title {
                        font-size: 2.2rem;
                        margin-bottom: 1rem;
                    }

                    .hero-subtitle {
                        font-size: 1.05rem;
                        margin-bottom: 1.75rem;
                    }

                    .hero-buttons {
                        flex-direction: column;
                        align-items: center;
                        gap: 15px;
                    }

                    .hero-cta-btn,
                    .whatsapp-button {
                        width: 250px;
                        max-width: 100%;
                    }
                }

                @media (max-width: 480px) {
                    .hero-title {
                        font-size: 1.75rem;
                    }

                    .hero-subtitle {
                        font-size: 0.95rem;
                    }

                    .hero-cta-btn,
                    .whatsapp-button {
                        font-size: 0.9rem;
                        padding: 12px 25px;
                    }
                }
            `}</style>
        </>
    );
};

export default HeroSectionJoinUs;