import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { IoMdBoat } from "react-icons/io";
import { ImUserTie } from "react-icons/im";
import { MdTour } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import CarRentalForm from "./CarRentalForm";
import ThingsToDoForm from "./ThingsToDoForm";
import PrivateDriverForm from "./PrivateDriverForm";
import BoatForm from "./BoatForm";
import SearchBoatForm from "./SearchBoatFrm";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";

function getTabs(t) {
    return [
        { key: "cars", label: t("home.tabs.cars"), icon: <FaCar /> },
        { key: "boats", label: t("home.tabs.boats"), icon: <IoMdBoat /> },
        { key: "drivers", label: t("home.tabs.drivers"), icon: <ImUserTie /> },
        { key: "activity", label: t("home.tabs.activities"), icon: <MdTour /> },
    ];
}

const HeroSection = ({ withBar, text, subtitle, isFull, tab, city, cityId, breadcrumbs = [] }) => {
    const { t, i18n } = useTranslation();
    
    const [activeTab, setActiveTab] = useState(tab ? tab : "cars");
    const features = [
        {
            name: t("home.features.trustedPartners"),
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
        },
        {
            name: t("home.features.noHiddenFees"),
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
        },
        {
            name: t("home.features.instantBooking"),
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
        },
        {
            name: t("home.features.noDeposit"),
            icon: "https://marhire.bytech.ma/images/icons/icon4.svg",
        },
    ];

    // Inject JSON-LD breadcrumb when provided
    useEffect(() => {
        if (!breadcrumbs || breadcrumbs.length === 0) return;
        const schemaItems = [
            { "@type": "ListItem", position: 1, name: "Home", item: (typeof window !== 'undefined' ? `${window.location.origin}/` : '/') }
        ];
        const crumbItems = breadcrumbs.filter(bc => (bc?.name || '').toLowerCase() !== 'home');
        crumbItems.forEach((bc, idx) => {
            const pos = idx + 2;
            const itemObj = { "@type": "ListItem", position: pos, name: bc.name };
            if (bc.href) {
                itemObj.item = (typeof window !== 'undefined' && bc.href.startsWith('http')) ? bc.href : (typeof window !== 'undefined' ? `${window.location.origin}${bc.href}` : bc.href);
            }
            schemaItems.push(itemObj);
        });
        const breadcrumbSchema = {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: schemaItems,
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
    }, [breadcrumbs]);

    return (
        <div className={`hero-section ${isFull === true ? "is-full" : ""}`}>
            <div className="hero-section--banner banner1">
                <div className="hero--bg-overlay"></div>
                <div className="hero-section--content">
                    <div className="slogan">
                        {breadcrumbs && breadcrumbs.length > 0 && (
                            <div className="hero-nav-path">
                                <div className="nav-path-container">
                                    <a href={getLocalizedUrl("")} title={t('common.home', 'Home')} className="nav-home-link">
                                        <FaHome size={14} />
                                    </a>
                                    {breadcrumbs.filter(bc => (bc?.name || '').toLowerCase() !== 'home').map((bc, idx) => {
                                        const isLast = idx === breadcrumbs.length - 1;
                                        const hasHref = typeof bc.href === 'string' && bc.href.length > 0;
                                        const href = hasHref ? (bc.href.startsWith('http') ? bc.href : getLocalizedUrl(bc.href)) : null;
                                        return (
                                            <React.Fragment key={`${bc.name}-${idx}`}>
                                                <span className="nav-path-arrow">&gt;</span>
                                                {isLast || !hasHref ? (
                                                    <span className="nav-current-page">{bc.name}</span>
                                                ) : (
                                                    <a href={href} className="nav-link-page">{bc.name}</a>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                        <h1 className="slogan-title">
                            {text ? text : t("home.hero.title")}
                        </h1>
                        {subtitle ? (
                            <p className="slogan-subtitle">{subtitle}</p>
                        ) : null}
                        {withBar && (
                            <div className="features-icons">
                                {features.map((item, index) => (
                                    <span className="features-icons__item">
                                        <img src={item.icon} />
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="searchbox">
                        {withBar && (
                            <div className="searchbox__tabs">
                                <div className="searchbox__bar">
                                    {getTabs(t).map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={`seachbox__item ${
                                                tab.key === activeTab
                                                    ? "seachbox__item-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setActiveTab(tab.key)
                                            }
                                        >
                                            {tab.icon} <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="searchbox__frm">
                            {activeTab === "cars" && <CarRentalForm defaultCity={city} defaultCityId={cityId} />}
                            {activeTab === "drivers" && <PrivateDriverForm defaultCity={city} defaultCityId={cityId} />}
                            {activeTab === "boats" && <BoatForm defaultCity={city} defaultCityId={cityId} />}
                            {activeTab === "activity" && <ThingsToDoForm defaultCity={city} defaultCityId={cityId} />}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .slogan-subtitle { margin: 8px auto 0; color: #e5f1ee; font-size: 14px; line-height: 1.6; max-width: 1000px; text-align: center; padding: 0 16px; }
                .hero-nav-path { margin-bottom: 10px; display: flex; justify-content: center; }
                .nav-path-container { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 400; color: rgba(255,255,255,.9); }
                .nav-home-link { color: rgba(255,255,255,0.85); text-decoration: none; display: inline-flex; align-items: center; transition: color .2s ease; }
                .nav-home-link:hover { color: rgba(255,255,255,1); }
                .nav-path-arrow { color: rgba(255,255,255,0.7); font-size: 12px; margin: 0 2px; }
                .nav-current-page { color: rgba(255,255,255,0.95); font-size: 13px; }
                .nav-link-page { color: rgba(255,255,255,0.9); text-decoration: none; }
                .nav-link-page:hover { text-decoration: underline; }
            `}</style>
        </div>
    );
};

export default HeroSection;
