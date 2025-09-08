import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaWhatsapp, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { GiCarDoor } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import ListingIcons from "./ListingIcons";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";
import { FaLocationDot } from "react-icons/fa6";
import SmartImage from "../SmartImage";

// Helper function to get translated field with fallback
const getTranslatedField = (listing, field, locale) => {
    // Check if translated_fields exists and has the field
    if (listing.translated_fields && listing.translated_fields[field]) {
        // Try to get the requested locale
        if (listing.translated_fields[field][locale]) {
            return listing.translated_fields[field][locale];
        }
        // Fallback to English
        if (listing.translated_fields[field]['en']) {
            return listing.translated_fields[field]['en'];
        }
    }
    // Final fallback to direct field
    return listing[field] || '';
};

const Recommended = ({
    type,
    classes = "",
    title,
    subtitle,
    tabs,
    city,
    disableHeading,
    agency_id,
}) => {
    const { t, i18n } = useTranslation();
    // Get current locale from URL path or localStorage as fallback
    const pathMatch = window.location.pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    const currentLocale = pathMatch ? pathMatch[1] : (localStorage.getItem('i18nextLng') || 'en');
    const [activeCity, setActiveCity] = useState(city || "Agadir");
    const [activeTab, setActiveTab] = useState(tabs ? tabs[0].name : null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    // Get proper image URL with leading slash
    const getImageUrl = (filePath) => {
        if (!filePath) return null;
        if (filePath.startsWith('http') || filePath.startsWith('/')) {
            return filePath;
        }
        return `/${filePath}`;
    };

    // Get fallback image URLs
    const getFallbackImageUrl = (filePath) => {
        if (!filePath) return null;
        
        const imageUrl = getImageUrl(filePath);
        
        if (imageUrl.endsWith('.webp')) {
            const basePath = imageUrl.replace('.webp', '');
            return [`${basePath}.jpg`, `${basePath}.jpeg`, `${basePath}.png`];
        }
        
        return null;
    };
    const cities = ["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes", "Essaouira"];
    const config = {
        cars: {
            title: t("home.recommended.cars.title"),
            description: t("home.recommended.cars.description"),
            ctaText: t("home.recommended.cars.cta"),
            ctaLink: getLocalizedUrl("/car-search"),
        },
        drivers: {
            title: t("home.recommended.drivers.title"),
            description: t("home.recommended.drivers.description"),
            ctaText: t("home.recommended.drivers.cta"),
            ctaLink: getLocalizedUrl("/private-search"),
        },
        boats: {
            title: t("home.recommended.boats.title"),
            description: t("home.recommended.boats.description"),
            ctaText: t("home.recommended.boats.cta"),
            ctaLink: getLocalizedUrl("/boat-search"),
        },
        activities: {
            title: t("home.recommended.activities.title"),
            description: t("home.recommended.activities.description"),
            ctaText: t("home.recommended.activities.cta"),
            ctaLink: getLocalizedUrl("/thingstodo-search"),
        },
    };

    const currentConfig = config[type] || config["cars"];

    // Agency page variant (used in Agency.jsx via classes="agency-listings")
    const isAgencyVariant = (classes || "").split(" ").includes("agency-listings");

    // Helper to normalize deposit-required field coming from backend ("Yes"/"No"/1/0/true/false)
    const isDepositRequired = (value) => {
        if (value === undefined || value === null) return false;
        if (typeof value === 'number') return value === 1;
        if (typeof value === 'boolean') return value === true;
        if (typeof value === 'string') {
            const v = value.trim().toLowerCase();
            return v === '1' || v === 'yes' || v === 'true';
        }
        return false;
    };

    const getTypeLabel = () => {
        switch (type) {
            case "cars":
                return t("categories.carRental", "Car Rental");
            case "drivers":
                return t("categories.privateDriver", "Private Driver");
            case "boats":
                return t("categories.boatRental", "Boat Rental");
            case "activities":
                return t("categories.activity", "Activity");
            default:
                return "";
        }
    };

    const [activeListings, setActiveListings] = useState([]);

    const getListings = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/get_recommended_listings", {
                params: {
                    category: type,
                    city: tabs && !city ? "" : activeCity,
                    tab: activeTab,
                    agency_id: agency_id,
                    locale: currentLocale,
                },
            });
            setActiveListings(response.data.listings);
            setHasMore(response.data.hasMore || false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const loadMore = async () => {
        try {
            setLoadingMore(true);
            setCurrentPage((prev) => prev + 1);

            const response = await axios.get("/api/get_recommended_listings", {
                params: {
                    category: type,
                    agency_id: agency_id,
                    page: currentPage + 1,
                    locale: currentLocale,
                },
            });
            setActiveListings((prev) => [...prev, ...response.data.listings]);
            setHasMore(response.data.hasMore || false);
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingMore(false);
        }
    };

    useEffect(() => {
        setCurrentPage(1);
        setTimeout(() => {
            getListings();
        }, 1000);
    }, [activeCity, activeTab]);

    const getTabs = () => {
        const tabsHtml = tabs
            ? tabs.map((tab, index) => (
                  <button
                      className={`recommandation-city ${
                          activeTab === tab.name
                              ? "recommandation-city--active"
                              : ""
                      }`}
                      key={tab.id}
                      onClick={() => setActiveTab(tab.name)}
                  >
                      {tab.name}
                  </button>
              ))
            : cities.map((city, index) => (
                  <button
                      className={`recommandation-city ${
                          activeCity === city
                              ? "recommandation-city--active"
                              : ""
                      }`}
                      key={city}
                      onClick={() => setActiveCity(city)}
                  >
                      {city}
                  </button>
              ));

        return tabsHtml;
    };

    const generatePriceParts = (listing) => {
        if (type === "cars") {
            return { prefix: t("common.from"), value: listing.price_per_day, suffix: `/ ${t("units.day")}` };
        } else if (type === "drivers") {
            const driverPrice = listing.pricings[0].airport_one || 0;
            return { prefix: t("common.from"), value: driverPrice, suffix: `/ ${t("units.trip")}` };
        } else if (type === "boats") {
            return { prefix: t("common.from"), value: listing.price_per_hour, suffix: `/ ${t("units.hour")}` };
        } else {
            const price = listing.act_pricings[0].price || 0;
            return { prefix: t("common.from"), value: price, suffix: `/ ${t("units.person")}` };
        }
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.com/details/${listing.slug}`;
        const title = getTranslatedField(listing, 'title', currentLocale);
        const text = t("messages.whatsappInterest", {
            title: title,
            url,
        });
        const message = encodeURIComponent(text);
        const whatsappLink = `https://wa.me/+212660745055?text=${message}`;
        return whatsappLink;
    };

    return (
        <section className={`recommendation-container ${classes}`}>
            {!disableHeading && (
                <>
                    <div className="section-head">
                        <h2 className="section-title section-title--between">
                            {title ? title : currentConfig.title}
                            <a
                                href={currentConfig.ctaLink}
                                className="recommendation-cta"
                            >
                                {currentConfig.ctaText}
                            </a>
                        </h2>
                        <h3 className="section-subtitle">
                            {subtitle ? subtitle : currentConfig.description}
                        </h3>
                    </div>
                    <div className="recommendation-cities">
                        {tabs === false ? "" : getTabs()}
                    </div>
                </>
            )}
            <div className="recommendation-listings">
                {loading
                    ? Array(4)
                          .fill(0)
                          .map((_, index) => (
                              <div
                                  className="recommendation-listing-card"
                                  key={index}
                              >
                                  <div className="recommendation-image-container">
                                      <Skeleton height={200} />
                                  </div>
                                  <div className="recommendation-content">
                                      <div style={{ marginBottom: "6px" }}>
                                          <Skeleton />
                                      </div>

                                      <Skeleton count={3} />
                                  </div>
                              </div>
                          ))
                    : activeListings.map((listing) => (
                          <>
                              <div
                                  key={listing.id}
                                  className="recommendation-listing-card"
                              >
                                  <div className="recommendation-image-container">
                                      {isAgencyVariant ? (
                                          <span className="agency-type-badge">{getTypeLabel()}</span>
                                      ) : (
                                          <span className="annonce-price-badge">
                                              {(() => { const p = generatePriceParts(listing); return (<><span className="price-prefix">{p.prefix}&nbsp;</span><span className="price-value">{p.value}€</span>&nbsp;<span className="price-suffix">{p.suffix.replace(/^\s*\/\s*/, '/ ')}</span></>); })()}
                                          </span>
                                      )}
                                      <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                          {listing.galleries && listing.galleries.length > 0 ? (
                                              <SmartImage
                                                  src={getImageUrl(listing.galleries[0].file_path)}
                                                  fallbackSrcs={getFallbackImageUrl(listing.galleries[0].file_path) || []}
                                                  alt={getTranslatedField(listing, 'title', currentLocale)}
                                                  className="recommendation-image"
                                              />
                                          ) : (
                                              <img
                                                  src="/images/not-found.png"
                                                  alt={getTranslatedField(listing, 'title', currentLocale)}
                                                  className="recommendation-image"
                                              />
                                          )}
                                      </a>
                                  </div>
                                  <div className="recommendation-content">
                                      <div className="recommendation-header">
                                          <h3 className="recommendation-title">
                                              {getTranslatedField(listing, 'title', currentLocale)}
                                          </h3>
                                          <p className="recommendation-location">
                                              <span className="loc-ico"><FaLocationDot size={12} /></span>
                                              {listing.city ? `${listing.city.city_name}, Morocco` : t("common.morocco")}
                                          </p>
                                      </div>
                                      <ListingIcons type={type} l={listing} classes={isAgencyVariant ? 'compact' : ''} />
                                      {isAgencyVariant && (
                                          <div className="agency-badges">
                                              <span className="agency-badge green"><span className="ico"><FaCheckCircle size={12} /></span>{t('listing.trustNotes.cancellation', 'Free Cancellation')}</span>
                                              {!isDepositRequired(listing.deposit_required) && type === "cars" && (
                                                  <span className="agency-badge blue"><span className="ico"><FaMoneyBillWave size={12} /></span>{t('listing.specs.noDeposit', 'No Deposit')}</span>
                                              )}
                                              <span className="agency-badge outline"><span className="ico"><MdVerified size={12} /></span>{t('listing.badges.verifiedPartner', 'Verified Partner')}</span>
                                          </div>
                                      )}
                                  </div>
                                  {isAgencyVariant ? (
                                      <div className="agency-footer">
                                          <div className="agency-price">{(() => { const p = generatePriceParts(listing); return (<><span className="price-prefix">{p.prefix}&nbsp;</span><span className="price-value">{p.value}€</span>&nbsp;<span className="price-suffix">{p.suffix.replace(/^\s*\/\s*/, '/ ')}</span></>); })()}</div>
                                          <div className="agency-actions">
                                              <a
                                                  href={getWtspUrl(listing)}
                                                  target="_blank"
                                                  className="agency-chat"
                                                  aria-label="WhatsApp"
                                              >
                                                  <FaWhatsapp size={20} />
                                              </a>
                                              <a
                                                  href={getLocalizedUrl(`details/${listing.slug}`)}
                                                  className="agency-book"
                                              >
                                                  {t("common.bookNow")}
                                              </a>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="recommendation-footer">
                                          <a
                                              href={getLocalizedUrl(`details/${listing.slug}`)}
                                              className="recommendation-button"
                                          >
                                              {t("common.bookNow")}
                                          </a>
                                          <a
                                              href={getWtspUrl(listing)}
                                              target="_blank"
                                              className="recommendation-wtsp"
                                          >
                                              <FaWhatsapp size={24} />
                                          </a>
                                      </div>
                                  )}
                              </div>
                          </>
                      ))}
                {loadingMore &&
                    Array(4)
                        .fill(0)
                        .map((_, index) => (
                            <div
                                className="recommendation-listing-card"
                                key={index}
                            >
                                <div className="recommendation-image-container">
                                    <Skeleton height={200} />
                                </div>
                                <div className="recommendation-content">
                                    <div style={{ marginBottom: "6px" }}>
                                        <Skeleton />
                                    </div>

                                    <Skeleton count={3} />
                                </div>
                            </div>
                        ))}
            </div>
            {hasMore && !loadingMore && (
                <div className="load-more__sect">
                    <button className="load-more" onClick={loadMore}>
                        {t("common.loadMore")}
                    </button>
                </div>
            )}
        </section>
    );
};

export default Recommended;
