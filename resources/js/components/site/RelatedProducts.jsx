import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import SmartImage from "../SmartImage";
import { useTranslation } from "react-i18next";
import getWtspUrl from "../utils/WhatsappMsg";
import { getLocalizedUrl } from "../../utils/localeManager";

// Helper function to get translated field with fallback
const getTranslatedField = (listing, field, locale) => {
    if (listing.translated_fields && listing.translated_fields[field]) {
        if (listing.translated_fields[field][locale]) {
            return listing.translated_fields[field][locale];
        }
        if (listing.translated_fields[field]['en']) {
            return listing.translated_fields[field]['en'];
        }
    }
    return listing[field] || '';
};

const TYPES = {
    2: "cars",
    3: "drivers",
    4: "boats",
    5: "activities",
};

const RelatedProducts = ({ category = 2, loading }) => {
    const type = TYPES[category] || "cars";
    const { t, i18n } = useTranslation();
    // Get current locale from URL path or localStorage as fallback
    const pathMatch = window.location.pathname.match(/^\/([a-z]{2})(?:\/|$)/);
    const currentLocale = pathMatch ? pathMatch[1] : (localStorage.getItem('i18nextLng') || 'en');
    const [listings, setListings] = useState([]);

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

    const generatePrice = (listing) => {
        try {
            if (type === "cars") {
                return `${t("common.from")} ${listing.price_per_day || 0}€ / ${t("units.day")}`;
            } else if (type === "drivers") {
                const driverPrice = listing.pricings?.[0]?.airport_one || 0;
                return `${t("common.from")} ${driverPrice}€ / ${t("units.trip")}`;
            } else if (type === "boats") {
                return `${t("common.from")} ${listing.price_per_hour || 0}€ / ${t("units.hour")}`;
            } else if (type === "activities") {
                const price = listing.act_pricings?.[0]?.price || 0;
                return `${t("common.from")} ${price}€ / ${t("units.person")}`;
            }
            return `${t("common.from")} 0€`;
        } catch (err) {
            console.log("Price generation error:", err);
            return `${t("common.from")} 0€`;
        }
    };


    useEffect(() => {
        if (!category) return; // Don't fetch if category is not available yet
        
        try {
            const fetchListings = async () => {
                const response = await axios.get("/api/related_products", {
                    params: { 
                        category_id: category,
                        locale: currentLocale,
                    },
                });

                setListings(response.data.listings);
            };

            fetchListings();
        } catch (err) {
            console.log(err);
        }
    }, [category, currentLocale]);

    return (
        !loading && (
            <div className="related-products">
                <h2 className="section-title mb-4">{t("common.compareSimilarListings")}</h2>
                <div className="">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            768: { slidesPerView: 3 },
                            2000: { slidesPerView: 4 },
                        }}
                        loop={true}
                        autoplay={{
                            delay: 1000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="custom-swiper"
                    >
                        {listings.map((listing, index) => (
                            <SwiperSlide key={index}>
                                <div
                                    key={listing.id}
                                    className="recommendation-listing-card"
                                >
                                    <div className="recommendation-image-container">
                                        <span className="annonce-price-badge">
                                            {generatePrice(listing)}
                                        </span>
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
                                                <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                                    {getTranslatedField(listing, 'title', currentLocale)}
                                                </a>
                                            </h3>
                                            <p className="recommendation-location">
                                                📍{" "}
                                                {listing.city
                                                    ? listing.city.city_name
                                                    : "Morocco"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        )
    );
};

export default RelatedProducts;
