import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdPerson } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import {
    Users,
    Car,
    Tag,
    Snowflake,
    Calendar,
    Settings2,
    Gauge,
    Fuel,
    Info,
    UserRound,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SmartImage from "../SmartImage";

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

const SingleListingInfoCard = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [activePricing, setActivePricing] = useState(1);
    const [features, setFeatures] = useState([]);
    const [imageError, setImageError] = useState(false);

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

    useEffect(() => {
        if (listing) {
            setFeatures([
                {
                    name: `${listing.seats} ${t("listing.specs.seats")}`,
                    icon: <UserRound size={16} />,
                },
                {
                    name: `${listing.doors} ${t("listing.specs.doors")}`,
                    icon: <GiCarDoor size={16} />,
                },
                { name: `${listing.year}`, icon: <Calendar size={16} /> },
                {
                    name: `${listing.mileage_policy}`,
                    icon: <Gauge size={16} />,
                },
                {
                    name: `${t("listing.specs.fuel")}: ${listing.fuel_policy}`,
                    icon: <Fuel size={16} />,
                },
            ]);
        }
    }, [listing, t]);

    return loading ? (
        <div className="singlelisting-infos">
            <div className="singlelisting-infos__content">
                <Skeleton height={18} width={120} />
                <Skeleton height={12} width={100} />
            </div>
            <div className="singlelisting-infos__image">
                <Skeleton height={120} />
            </div>
        </div>
    ) : (
        <>
            <div className="singlelisting-infos">
                <div className="singlelisting-infos__content">
                    <h1 className="singlelisting__name">{getTranslatedField(listing, 'title', currentLocale)}</h1>
                    <h2 className="singlelisting__location">
                        <FaLocationDot size={16} color="#f21500" />{" "}
                        {listing.city.city_name}, {t("common.morocco")}
                    </h2>
                    <div className="singlelisting__features grid-3">
                        {features.map((feature, indx) => (
                            <div className="singlelisting__feature" key={indx}>
                                <span className="singlelisting__feature__icon">
                                    {feature.icon && feature.icon}
                                </span>
                                <span>{feature.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="singlelisting__agency">
                        {listing.provider.agency_logo && (
                            <img
                                src={listing.provider.agency_logo}
                                alt="agency Logo"
                                className="singlelisting__agency__logo"
                            />
                        )}
                    </div>
                </div>
                <div className="singlelisting-infos__image">
                    {listing.galleries && listing.galleries.length > 0 && !imageError ? (
                        <SmartImage
                            src={getImageUrl(listing.galleries[0].file_path)}
                            fallbackSrcs={getFallbackImageUrl(listing.galleries[0].file_path)}
                            alt={`${getTranslatedField(listing, 'title', currentLocale)} - Main Image`}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="image-placeholder" style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: '#f5f5f5',
                            color: '#666',
                            minHeight: '120px',
                            fontSize: '14px'
                        }}>
                            {t('common.image_not_available', 'Image not available')}
                        </div>
                    )}
                </div>
            </div>
            {listing.category_id == 2 && (
                <div className="singlelisting-card singlelisting-card__pricing">
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 1
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(1)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_day} €
                        </span>
                        <span className="price-label">{t("common.perDay")}</span>
                    </div>

                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 2
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(2)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_week} €
                        </span>
                        <span className="price-label">/ {t("units.week")}</span>
                    </div>
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 3
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(3)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_month} €
                        </span>
                        <span className="price-label">/ {t("units.month")}</span>
                    </div>
                </div>
            )}

            {listing.category_id == 4 && (
                <div className="singlelisting-card singlelisting-card__pricing">
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 1
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(1)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_hour} €
                        </span>
                        <span className="price-label">{t("common.perHour")}</span>
                    </div>

                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 2
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(2)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_half_day} €
                        </span>
                        <span className="price-label">/ {t("units.halfDay")}</span>
                    </div>
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 3
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(3)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_day} €
                        </span>
                        <span className="price-label">{t("common.perDay")}</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleListingInfoCard;
