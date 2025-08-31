import React, { useEffect, useState } from "react";
import { FaWhatsapp, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
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

const SearchItem = ({ item, type }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [priceParts, setPriceParts] = useState({ prefix: '', value: 0, suffix: '' });
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

    const generatePriceParts = () => {
        const id = parseInt(item.category_id || (type === 'car' ? 2 : type === 'private' ? 3 : type === 'boat' ? 4 : 5));
        if (id === 2) return { prefix: t('common.from'), value: item.price_per_day || item.price || 0, suffix: `/ ${t('units.day')}` };
        if (id === 3) return { prefix: t('common.from'), value: (item.pricings?.[0]?.airport_one) || item.price || 0, suffix: `/ ${t('units.day')}` };
        if (id === 4) return { prefix: t('common.from'), value: item.price_per_hour || item.price || 0, suffix: `/ ${t('units.hour')}` };
        const p = item.act_pricings?.[0]?.price || item.price_per_person || item.price || 0;
        return { prefix: t('common.from'), value: p, suffix: `/ ${t('units.person')}` };
    };

    useEffect(() => {
        setPriceParts(generatePriceParts());
    }, []);

    const getCategoryLabel = (categoryId) => {
        const id = parseInt(categoryId || (type === 'car' ? 2 : type === 'private' ? 3 : type === 'boat' ? 4 : 5));
        switch (id) {
            case 2: return t('categories.carRental', 'Car Rental');
            case 3: return t('categories.privateDriver', 'Private Driver');
            case 4: return t('categories.boatRental', 'Boat Rental');
            case 5: return t('categories.activity', 'Activity');
            default: return '';
        }
    };

    const getProviderLogo = () => {
        const file = item?.provider?.agency_logo || item?.provider?.logo || item?.agency?.agency_logo;
        if (!file) return '/images/default-agency.jpeg';
        if (file.startsWith('http') || file.startsWith('/')) return file;
        return `/${file}`;
    };

    return (
        <div className="mh-scard">
            <span className="mh-scard__agency">
                <img src={getProviderLogo()} alt={item?.provider?.agency_name || 'Agency'} onError={(e)=>{e.currentTarget.src='/images/default-agency.jpeg'}} />
            </span>
            <div className="mh-scard__image">
                <a href={getLocalizedUrl(`details/${item.slug}`)}>
                    {item.galleries && item.galleries.length > 0 && !imageError ? (
                        <SmartImage
                            src={getImageUrl(item.galleries[0].file_path)}
                            fallbackSrcs={getFallbackImageUrl(item.galleries[0].file_path) || []}
                            alt={getTranslatedField(item, 'title', currentLocale)}
                            onError={() => setImageError(true)}
                            className="mh-scard__img"
                        />
                    ) : (
                        <img
                            src="/images/not-found.png"
                            alt={getTranslatedField(item, 'title', currentLocale)}
                            className="mh-scard__img"
                        />
                    )}
                </a>
            </div>
            <div className="mh-scard__content">
                <span className="mh-scard__cat">{getCategoryLabel(item.category_id)}</span>
                <h3 className="mh-scard__title">
                    <a href={getLocalizedUrl(`details/${item.slug}`)}>{getTranslatedField(item, 'title', currentLocale)}</a>
                    <span className="mh-scard__subtitle"> {t('listing.misc.orSimilar', 'or similar')}</span>
                </h3>
                <p className="mh-scard__location">
                    <span className="ico"><FaLocationDot size={12} /></span>
                    {item.city ? `${item.city.city_name || item.city}, Morocco` : t('common.morocco', 'Morocco')}
                </p>
                <ListingIcons type={(() => { const id = parseInt(item.category_id || (type === 'car' ? 2 : type === 'private' ? 3 : type === 'boat' ? 4 : 5)); if (id === 2) return 'cars'; if (id === 3) return 'drivers'; if (id === 4) return 'boats'; if (id === 5) return 'activities'; return 'cars'; })()} l={item} classes={'mh-scard__features compact'} />
                <div className="mh-scard__badges">
                    <span className="mh-scard__badge mh-scard__badge--green"><span className="mh-scard__badge-ico"><FaCheckCircle size={12} /></span>{t('listing.trustNotes.cancellation', 'Free Cancellation')}</span>
                    {!isDepositRequired(item.deposit_required) && (
                        <span className="mh-scard__badge mh-scard__badge--blue"><span className="mh-scard__badge-ico"><FaMoneyBillWave size={12} /></span>{t('listing.specs.noDeposit', 'No Deposit')}</span>
                    )}
                    <span className="mh-scard__badge mh-scard__badge--outline"><span className="mh-scard__badge-ico"><MdVerified size={12} /></span>{t('listing.badges.verifiedPartner', 'Verified Partner')}</span>
                </div>
                <div className="mh-scard__pricebar">
                    <span className="mh-scard__price-from">{t('listing.pricing.startFrom', 'Start from')}</span>
                    <span className="mh-scard__price">
                        <span className="mh-scard__price-value">{priceParts.value}€</span>
                        <span className="mh-scard__price-suffix">/ {priceParts.suffix.replace(/^\s*\/\s*/, '').trim()}</span>
                    </span>
                </div>
            </div>
            <div className="mh-scard__aside">
                <a href={getWtspUrl(item)} target="_blank" className="mh-scard__chat" aria-label="WhatsApp"><FaWhatsapp size={18} /></a>
                <a href={getLocalizedUrl(`details/${item.slug}`)} className="mh-scard__book">{t('common.bookNow')}</a>
            </div>
        </div>
    );
};

export default SearchItem;
