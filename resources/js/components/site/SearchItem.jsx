import React, { useEffect, useState } from "react";
import { IoMdPerson } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
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
import { FaWhatsapp } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
import getWtspUrl from "../utils/WhatsappMsg";
import ListingIcons from "./ListingIcons";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";
import SmartImage from "../SmartImage";

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

const SearchItem = ({ item, type }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");
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

    const generatePrice = () => {
        let listingPrice = "";
        let listingLbl = "";
        console.log(item);
        if (type === "car") {
            listingPrice = item.price_per_day;
            listingLbl = t("units.perDay");
        } else if (type === "private") {
            const driverPrice = item.pricings[0].airport_one || 0;
            listingPrice = item.price_per_hour;
            listingLbl = t("units.perDay");
        } else if (type === "boat") {
            listingPrice = item.price_per_hour;
            listingLbl = t("units.perHour");
        } else {
            listingPrice = item.act_pricings[0]?.price || 0;
            listingLbl = t("units.perPerson");
        }

        setPrice(listingPrice);
        setUnit(listingLbl);
    };

    useEffect(() => {
        generatePrice();
    }, []);

    return (
        <div className="search-item">
            <div className="search-item__img">
                <a href={getLocalizedUrl(`details/${item.slug}`)}>
                    {item.galleries && item.galleries.length > 0 && !imageError ? (
                        <SmartImage
                            src={getImageUrl(item.galleries[0].file_path)}
                            fallbackSrcs={[
                                ...getFallbackImageUrl(item.galleries[0].file_path) || [],
                                '/images/default-marhire.png'
                            ]}
                            alt={getTranslatedField(item, 'title', currentLocale)}
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <img
                            src="/images/default-marhire.png"
                            alt={getTranslatedField(item, 'title', currentLocale)}
                        />
                    )}
                </a>
            </div>
            <div className="search-item__content">
                <h2 className="search-item__title">{getTranslatedField(item, 'title', currentLocale)}</h2>
                <p className="search-item__subtitle">
                    {item.city ? item.city.city_name : t("common.morocco")}
                    {" • "}
                    {t("common.findSimilar")}
                </p>
                <div className="search-item__price">
                    <div className="price">{price} €</div>
                    <div className="lbl">{unit}</div>
                </div>
                <div className="singlelisting__features singlelisting__features__srch">
                    {<ListingIcons type={type} l={item} />}
                </div>
                <div className="search__agency">
                    <img
                        src="https://mediaim.expedia.com/cars/logos/RC.png"
                        className="singlelisting__agency__logo"
                    />
                    <div className="search__item__cta">
                        <a
                            href={getLocalizedUrl(`details/${item.slug}`)}
                            className="cta-book-now"
                        >
                            <FaRegCalendarAlt size={22} /> {t("common.bookNow")}
                        </a>
                        <a
                            href={getWtspUrl(item)}
                            data-target="_blank"
                            className="cta-wtsp"
                        >
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchItem;
