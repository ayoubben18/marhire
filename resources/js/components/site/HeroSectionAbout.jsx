import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";

const HeroSectionAbout = () => {
    const { t } = useTranslation();

    useEffect(() => {
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://marhire.com/" },
                { "@type": "ListItem", "position": 2, "name": "About Us", "item": "https://marhire.com/about-us" }
            ]
        };

        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.innerHTML = JSON.stringify(breadcrumbSchema);
        document.head.appendChild(script);

        return () => {
            if (script && script.parentNode) {
                document.head.removeChild(script);
            }
        };
    }, []);

    return (
        <>
            <div className="hero-section-about">
                <div className="hero-background">
                    <img
                        src="/images/about-us.jpg"
                        alt={t('aboutPage.hero.title', 'About MarHire')}
                        className="hero-bg-image"
                    />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="container">
                        <div className="hero-text-content">
                            <div className="hero-nav-path">
                                <div className="nav-path-container">
                                    <a href="/" title={t('common.home', 'Home')} className="nav-home-link">
                                        <FaHome size={14} />
                                    </a>
                                    <span className="nav-path-arrow">&gt;</span>
                                    <span className="nav-current-page">{t('aboutPage.breadcrumb', 'About Us')}</span>
                                </div>
                            </div>
                            <h1 className="hero-title">{t('aboutPage.hero.title', 'About MarHire')}</h1>
                            <p className="hero-subtitle">
                                {t('aboutPage.hero.subtitle', 'Welcome to MarHire, your all-in-one travel companion in Morocco from the vibrant streets of Marrakech to the beaches of Agadir, the historic alleys of Fes, and beyond. We are more than just a travel platform. We are a bridge between curious travelers and the finest local experiences Morocco has to offer.')}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-nav-path { margin-bottom: 20px; }
                .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 400; }
                .nav-home-link { color: rgba(255, 255, 255, 0.85); text-decoration: none; display: inline-flex; align-items: center; transition: color 0.2s ease; }
                .nav-home-link:hover { color: rgba(255, 255, 255, 1); }
                .nav-path-arrow { color: rgba(255, 255, 255, 0.7); font-size: 12px; margin: 0 2px; }
                .nav-current-page { color: rgba(255, 255, 255, 0.85); font-size: 13px; }

                .hero-section-about { position: relative; min-height: 52vh; padding: 96px 0 72px; display: flex; align-items: center; justify-content: center; overflow: visible; }
                .hero-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
                .hero-bg-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
                .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 100%); z-index: 2; }
                .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: white; }
                .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; text-align: center; }
                .hero-title { font-size: 3rem; font-weight: 800; margin-bottom: 1.1rem; line-height: 1.2; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); }
                .hero-subtitle { font-size: 1.1rem; font-weight: 400; margin-bottom: 0; line-height: 1.8; opacity: 0.95; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); max-width: 880px; }

                @media (max-width: 768px) {
                    .hero-section-about { padding: 90px 0 50px; min-height: 440px; }
                    .hero-title { font-size: 2.2rem; }
                    .hero-subtitle { font-size: 1rem; }
                }
            `}</style>
        </>
    );
};

export default HeroSectionAbout;
