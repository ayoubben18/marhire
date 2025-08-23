import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";

const HeroSectionPartners = () => {
    const { t } = useTranslation();

    // JSON-LD schema for SEO (breadcrumb + organization)
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
                    "name": t('partners.breadcrumb', 'Our Partners'),
                    "item": "https://marhire.com/partners"
                }
            ]
        };

        const organizationSchema = {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "MarHire",
            "description": "Morocco's trusted marketplace for car rentals, private drivers, boat tours, and local activities",
            "url": "https://marhire.com",
            "logo": "https://marhire.com/images/logo.png"
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
            document.head.removeChild(script1);
            document.head.removeChild(script2);
        };
    }, [t]);

    return (
        <>
            <div className="hero-section-join-us">
                <div className="hero-background">
                    <img
                        src="/images/our-partners.jpg"
                        alt={t('partners.hero.title', 'Our Trusted Partners')}
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
                                    <span className="nav-current-page">
                                        {t('partners.breadcrumb', 'Our Partners')}
                                    </span>
                                </div>
                            </div>

                            <h1 className="hero-title">
                                {t('partners.hero.title', 'Our Trusted Partners')}
                            </h1>
                            <p className="hero-subtitle">
                                {t('partners.hero.subtitle', "We work with the best local agencies across Morocco to bring you a curated selection of high-quality, reliable services. Each partner is verified to ensure your travel experience is safe and memorable.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .hero-nav-path { margin-bottom: 20px; }
                .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 400; }
                .nav-home-link { color: rgba(255, 255, 255, 0.8); text-decoration: none; display: inline-flex; align-items: center; transition: color 0.2s ease; }
                .nav-home-link:hover { color: rgba(255, 255, 255, 1); }
                .nav-path-arrow { color: rgba(255, 255, 255, 0.6); font-size: 12px; margin: 0 2px; }
                .nav-current-page { color: rgba(255, 255, 255, 0.7); font-size: 13px; }

                .hero-section-join-us { position: relative; min-height: 60vh; padding: 60px 0; display: flex; align-items: center; justify-content: center; overflow: visible; }
                .hero-background { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
                .hero-bg-image { width: 100%; height: 100%; object-fit: cover; object-position: center; }
                .hero-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(135deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%); z-index: 2; }
                .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: white; }
                .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; }
                .hero-title { font-size: 3.2rem; font-weight: 700; margin-bottom: 1.5rem; line-height: 1.2; text-shadow: 2px 2px 4px rgba(0,0,0,0.3); text-align: center; }
                .hero-subtitle { font-size: 1.2rem; font-weight: 400; margin-bottom: 0; line-height: 1.6; opacity: 0.95; text-shadow: 1px 1px 2px rgba(0,0,0,0.3); max-width: 800px; text-align: center; }

                @media (max-width: 768px) {
                    .hero-section-join-us { padding: 80px 0 40px; min-height: 450px; }
                    .hero-title { font-size: 2.2rem; margin-bottom: 1rem; }
                    .hero-subtitle { font-size: 1.05rem; margin-bottom: 0; }
                }

                @media (max-width: 480px) {
                    .hero-title { font-size: 1.75rem; }
                    .hero-subtitle { font-size: 0.95rem; }
                }
            `}</style>
        </>
    );
};

export default HeroSectionPartners;


