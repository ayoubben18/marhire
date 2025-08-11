import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { GiCarDoor } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";
import ListingIcons from "./ListingIcons";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import SmartImage from "../SmartImage";
import { useTranslation } from "react-i18next";
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
    1: "cars",
    2: "drivers",
    3: "boats",
    4: "activities",
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
                return `${t("common.from")} ${listing.price_per_day}€ / ${t(
                    "units.day"
                )}`;
            } else if (type === "drivers") {
                const driverPrice = listing.pricings[0].airport_one || 0;
                return `${t("common.from")} ${driverPrice}€ / ${t(
                    "units.day"
                )}`;
            } else if (type === "boats") {
                return `${t("common.from")} ${listing.price_per_hour}€ / ${t(
                    "units.hour"
                )}`;
            } else {
                const price = listing.act_pricings[0].price || 0;
                return `${t("common.from")} ${price}€ / ${t("units.person")}`;
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.bytech.ma/details/${listing.slug}`;
        const title = getTranslatedField(listing, 'title', currentLocale);
        const message = encodeURIComponent(
            `Hello,\nI am interested in booking this rental:\n\nTitle:${title} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
        );

        const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

        return whatsappLink;
    };

    useEffect(() => {
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
    }, []);

    return (
        !loading && (
            <div className="related-products">
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
                                                    fallbackSrcs={[
                                                        ...getFallbackImageUrl(listing.galleries[0].file_path) || [],
                                                        '/images/default-marhire.png'
                                                    ]}
                                                    alt={getTranslatedField(listing, 'title', currentLocale)}
                                                    className="recommendation-image"
                                                />
                                            ) : (
                                                <img
                                                    src="/images/default-marhire.png"
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
                                                📍{" "}
                                                {listing.city
                                                    ? listing.city.city_name
                                                    : "Morocco"}
                                            </p>
                                        </div>
                                        <ListingIcons type={type} l={listing} />
                                    </div>
                                    <div className="recommendation-footer">
                                        <a
                                            href={getLocalizedUrl(`details/${listing.slug}`)}
                                            className="recommendation-button"
                                        >
                                            <span>
                                                <FaCalendarAlt />
                                            </span>{" "}
                                            {t("common.bookNow")}
                                        </a>
                                        <a
                                            href={getWtspUrl(listing)}
                                            target="_blank"
                                            className="recommendation-wtsp"
                                        >
                                            <FaWhatsapp />
                                        </a>
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
