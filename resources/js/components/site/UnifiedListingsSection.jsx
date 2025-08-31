import React, { useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import UnifiedListings from "./UnifiedListings";
import ListingIcons from "./ListingIcons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SmartImage from "../SmartImage";
import { FaWhatsapp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getLocalizedUrl } from "../../utils/localeManager";

// Helper: get translated field with English fallback (align with UnifiedListings.getTranslatedField)
const resolveTitle = (listing, locale) => {
    if (listing.translated_fields && listing.translated_fields.title) {
        if (listing.translated_fields.title[locale]) return listing.translated_fields.title[locale];
        if (listing.translated_fields.title.en) return listing.translated_fields.title.en;
    }
    return listing.title || "";
};

const isDepositRequired = (value) => {
    if (value === undefined || value === null) return false;
    if (typeof value === "number") return value === 1;
    if (typeof value === "boolean") return value === true;
    if (typeof value === "string") {
        const v = value.trim().toLowerCase();
        return v === "1" || v === "yes" || v === "true";
    }
    return false;
};

const getImageUrl = (filePath) => {
    if (!filePath) return null;
    if (filePath.startsWith("http") || filePath.startsWith("/")) return filePath;
    return `/${filePath}`;
};

const getFallbackImageUrl = (filePath) => {
    if (!filePath) return null;
    const imageUrl = getImageUrl(filePath);
    if (imageUrl.endsWith(".webp")) {
        const basePath = imageUrl.replace(".webp", "");
        return [`${basePath}.jpg`, `${basePath}.jpeg`, `${basePath}.png`];
    }
    return null;
};

/**
 * UnifiedListingsSection
 * UI wrapper around UnifiedListings hook that renders:
 * - optional title/subtitle
 * - optional tabs (for cities or custom tabs)
 * - a responsive carousel of listing cards styled like Recommended.jsx
 */
const UnifiedListingsSection = ({
    title = null,
    subtitle = null,
    // Tabs mode:
    // If provided, we render chips that update filters and reload
    // Example: [{ name: "Agadir" }, { name: "Marrakech" }]
    tabs = [],
    // Data filter props forwarded to UnifiedListings
    categories = null,
    subcategories = [],
    cities = [],
    agencies = [],
    perPage = 8,
    page = 1,
    locale = null,
    // Section variations
    classes = "",
    // If true, do not render heading and tabs
    disableHeading = false,
}) => {
    const { t, i18n } = useTranslation();
    // Derive current locale from URL or i18n
    const pathMatch = typeof window !== 'undefined' ? window.location.pathname.match(/^\/(\w{2})(?:\/|$)/) : null;
    const currentLocale = locale || (pathMatch ? pathMatch[1] : (i18n.language || 'en'));

    // Tabs state
    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].name : null);

    // Compute effective cities depending on tabs mode
    const effectiveCities = useMemo(() => {
        if (tabs && tabs.length > 0 && activeTab) return [activeTab];
        return Array.isArray(cities) ? cities : (cities ? [cities] : []);
    }, [tabs, activeTab, cities]);

    // Use UnifiedListings for data fetching
    const listingsHook = UnifiedListings({
        categories,
        subcategories,
        cities: effectiveCities,
        agencies,
        perPage,
        page,
        locale: currentLocale,
        autoLoad: true,
    });

    const { listings, loading, pagination } = listingsHook;

    // Generate price text per category type
    const generatePriceParts = (listing) => {
        const id = parseInt(listing.category_id);
        if (id === 2) return { prefix: t("common.from"), value: listing.price_per_day || listing.price || 0, suffix: `/ ${t("units.day")}` };
        if (id === 3) return { prefix: t("common.from"), value: (listing.pricings?.[0]?.airport_one) || listing.price || 0, suffix: `/ ${t("units.day")}` };
        if (id === 4) return { prefix: t("common.from"), value: listing.price_per_hour || listing.price || 0, suffix: `/ ${t("units.hour")}` };
        // 5 activities
        const p = listing.act_pricings?.[0]?.price || listing.price_per_person || listing.price || 0;
        return { prefix: t("common.from"), value: p, suffix: `/ ${t("units.person")}` };
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.bytech.ma/details/${listing.slug}`;
        const titleTxt = resolveTitle(listing, currentLocale);
        const text = t("messages.whatsappInterest", { title: titleTxt, url });
        return `https://wa.me/+212660745055?text=${encodeURIComponent(text)}`;
    };

    return (
        <section className={`recommendation-container ${classes}`}>
            {!disableHeading && (
                <>
                    {(title || subtitle) && (
                        <div className="section-head">
                            {title && (
                                <h2 className="section-title section-title--between">{title}</h2>
                            )}
                            {subtitle && (
                                <h3 className="section-subtitle">{subtitle}</h3>
                            )}
                        </div>
                    )}
                    {tabs && tabs.length > 0 && (
                        <div className="recommendation-cities">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.name}
                                    className={`recommandation-city ${activeTab === tab.name ? "recommandation-city--active" : ""}`}
                                    onClick={() => setActiveTab(tab.name)}
                                >
                                    {tab.name}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}

            <div className="recommendation-listings">
                {loading ? (
                    Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div className="recommendation-listing-card" key={index}>
                                <div className="recommendation-image-container" style={{ background: '#f5f5f5', height: 200, borderRadius: 12 }} />
                                <div className="recommendation-content">
                                    <div style={{ height: 14, background: '#eee', borderRadius: 6, marginBottom: 8 }} />
                                    <div style={{ height: 12, background: '#eee', borderRadius: 6, marginBottom: 6 }} />
                                    <div style={{ height: 12, background: '#eee', borderRadius: 6, width: '60%' }} />
                                </div>
                            </div>
                        ))
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            2000: { slidesPerView: 4 },
                        }}
                        className="custom-swiper"
                    >
                        {listings.map((listing) => (
                            <SwiperSlide key={listing.id}>
                                <div className="recommendation-listing-card">
                                    <div className="recommendation-image-container">
                                        <span className="annonce-price-badge">
                                            {(() => { const p = generatePriceParts(listing); return (<><span className="price-prefix">{p.prefix}&nbsp;</span><span className="price-value">{p.value}€</span>&nbsp;<span className="price-suffix">{p.suffix.replace(/^\s*\/\s*/, '/ ')}</span></>); })()}
                                        </span>
                                        <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                            {listing.galleries && listing.galleries.length > 0 ? (
                                                <SmartImage
                                                    src={getImageUrl(listing.galleries[0].file_path)}
                                                    fallbackSrcs={getFallbackImageUrl(listing.galleries[0].file_path) || []}
                                                    alt={resolveTitle(listing, currentLocale)}
                                                    className="recommendation-image"
                                                />
                                            ) : (
                                                <img
                                                    src="/images/not-found.png"
                                                    alt={resolveTitle(listing, currentLocale)}
                                                    className="recommendation-image"
                                                />
                                            )}
                                        </a>
                                    </div>
                                    <div className="recommendation-content">
                                        <div className="recommendation-header">
                                            <h3 className="recommendation-title">
                                                <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                                    {resolveTitle(listing, currentLocale)}
                                                </a>
                                            </h3>
                                            <p className="recommendation-location">
                                                <span className="loc-ico"><FaLocationDot size={12} /></span>
                                                {listing.city ? `${listing.city.city_name || listing.city}, Morocco` : t("common.morocco", "Morocco")}
                                            </p>
                                        </div>
                                        <ListingIcons type={(() => { const id = parseInt(listing.category_id); if (id === 2) return 'cars'; if (id === 3) return 'drivers'; if (id === 4) return 'boats'; if (id === 5) return 'activities'; return 'cars'; })()} l={listing} classes={"compact"} />
                                        <div className="agency-badges">
                                            <span className="agency-badge green"><span className="ico"><FaCheckCircle size={12} /></span>{t('listing.trustNotes.cancellation', 'Free Cancellation')}</span>
                                            {!isDepositRequired(listing.deposit_required) && (
                                                <span className="agency-badge blue"><span className="ico"><FaMoneyBillWave size={12} /></span>{t('listing.specs.noDeposit', 'No Deposit')}</span>
                                            )}
                                            <span className="agency-badge outline"><span className="ico"><MdVerified size={12} /></span>{t('listing.badges.verifiedPartner', 'Verified Partner')}</span>
                                        </div>
                                    </div>
                                    <div className="agency-footer">
                                        <div className="agency-price">{(() => { const p = generatePriceParts(listing); return (<><span className="price-prefix">{p.prefix}&nbsp;</span><span className="price-value">{p.value}€</span>&nbsp;<span className="price-suffix">{p.suffix.replace(/^\s*\/\s*/, '/ ')}</span></>); })()}</div>
                                        <div className="agency-actions">
                                            <a href={getWtspUrl(listing)} target="_blank" className="agency-chat" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
                                            <a href={getLocalizedUrl(`details/${listing.slug}`)} className="agency-book">{t("common.bookNow")}</a>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </section>
    );
};

export default UnifiedListingsSection;


