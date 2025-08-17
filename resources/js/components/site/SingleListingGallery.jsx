import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
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

const SingleListingGallery = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    
    const [activePricing, setActivePricing] = useState(1);
    const [imageErrors, setImageErrors] = useState({});

    useEffect(() => {
        console.log("rendering");
        console.log(listing);
    });

    // Handle image load error - try alternative format
    const handleImageError = (originalPath, imageIndex) => {
        console.warn(`Image failed to load: ${originalPath}`);
        setImageErrors(prev => ({
            ...prev,
            [imageIndex]: true
        }));
    };

    // Get proper image URL with leading slash
    const getImageUrl = (filePath) => {
        if (!filePath) return null;
        // If path already starts with http or /, use as is
        if (filePath.startsWith('http') || filePath.startsWith('/')) {
            return filePath;
        }
        // Otherwise prepend leading slash
        return `/${filePath}`;
    };

    // Get fallback image URL (try to convert WebP to original format)
    const getFallbackImageUrl = (filePath) => {
        if (!filePath) return null;
        
        const imageUrl = getImageUrl(filePath);
        
        if (imageUrl.endsWith('.webp')) {
            // Try common original formats
            const basePath = imageUrl.replace('.webp', '');
            return [`${basePath}.jpg`, `${basePath}.jpeg`, `${basePath}.png`];
        }
        
        return null;
    };

    // Get optimized gallery images (prefer WebP when available)
    const getOptimizedGalleries = () => {
        if (!listing?.galleries) return [];
        
        const galleries = listing.galleries;
        const webpImages = galleries.filter(img => img.file_path.endsWith('.webp'));
        const originalImages = galleries.filter(img => !img.file_path.endsWith('.webp'));
        
        // If we have WebP versions, prefer them
        if (webpImages.length > 0) {
            return webpImages;
        }
        
        return originalImages;
    };

    return loading || !listing ? (
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
            <div className="gallery-card">
                <div className="gallery-grid">
                    {getOptimizedGalleries().map((img, idx) => {
                        const hasError = imageErrors[idx];
                        return (
                            <div className="main-image" key={`${img.id}-${idx}`}>
                                <SmartImage 
                                    src={getImageUrl(img.file_path)}
                                    fallbackSrcs={getFallbackImageUrl(img.file_path)}
                                    alt={`${getTranslatedField(listing, 'title', currentLocale)} - Image ${idx + 1}`}
                                    loading="lazy"
                                />
                            </div>
                        );
                    })}

                    {/* <div className="small-image more">
                        <img src={images[4]} alt="Gallery 5" />
                        <div className="overlay">+26</div>
                    </div> */}
                </div>
                <div className="pt-3 px-2">
                    <h1 className="singlelisting__name">{getTranslatedField(listing, 'title', currentLocale)}</h1>
                    <h2 className="singlelisting__location">
                        <FaLocationDot size={16} color="#f21500" />{" "}
                        {listing.city.city_name}, {t("common.morocco")}
                    </h2>
                </div>
            </div>
            <div className="singlelisting-card singlelisting-card__pricing">
                {listing.category_id !== 3 &&
                    listing?.act_pricings.map((pricing, idx) => (
                        <div
                            className={`singlelisting-card__item ${
                                activePricing === idx + 1
                                    ? "singlelisting-card__item--active"
                                    : ""
                            }`}
                            onClick={() => setActivePricing(idx + 1)}
                            key={idx}
                        >
                            <span className="singlelisting__price">
                                {pricing.price} €
                            </span>
                            <span className="price-label">
                                / {pricing.element}
                            </span>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default SingleListingGallery;
