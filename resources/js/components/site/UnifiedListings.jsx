import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
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

/**
 * UnifiedListings Component
 * 
 * A reusable component that fetches listings based on various filters
 * and returns the raw listing data without any styling.
 * 
 * @param {Object} props
 * @param {Array|Number} props.categories - Array of category IDs or single category ID (2: Car, 3: Driver, 4: Boat, 5: Activity)
 * @param {Array} props.subcategories - Array of subcategory IDs
 * @param {Array|String} props.cities - Array of city names or single city name
 * @param {Array} props.agencies - Array of agency/provider IDs
 * @param {Number} props.perPage - Number of items per page (default: 8)
 * @param {Number} props.page - Current page number (default: 1)
 * @param {String} props.locale - Locale for translations (default: current locale)
 * @param {Function} props.onDataLoaded - Callback function when data is loaded
 * @param {Function} props.onError - Callback function when error occurs
 * @param {Boolean} props.autoLoad - Whether to load data automatically on mount (default: true)
 */
// Internal data hook used by the UI component and exported for programmatic usage
const useUnifiedListingsData = ({
    categories = null,
    subcategories = [],
    cities = [],
    agencies = [],
    perPage = 8,
    page = 1,
    locale = null,
    onDataLoaded = null,
    onError = null,
    autoLoad = true,
}) => {
    const { i18n } = useTranslation();
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        total: 0,
        perPage: perPage,
        currentPage: page,
        lastPage: 1,
        hasMore: false
    });

    // Normalize categories to always be an array or null
    const normalizeCategories = (cats) => {
        if (!cats) return null;
        if (Array.isArray(cats)) return cats.length > 0 ? cats : null;
        return [cats];
    };

    // Normalize cities to always be an array
    const normalizeCities = (cityList) => {
        if (!cityList || cityList.length === 0) return [];
        if (Array.isArray(cityList)) return cityList;
        return [cityList];
    };

    // Stabilize array dependencies to prevent infinite refetch loops
    const categoriesKey = useMemo(() => (Array.isArray(categories) ? categories.join(',') : (categories ?? '')), [categories]);
    const subcategoriesKey = useMemo(() => (Array.isArray(subcategories) ? subcategories.join(',') : ''), [subcategories]);
    const citiesKey = useMemo(() => (Array.isArray(cities) ? cities.join(',') : (cities ?? '')), [cities]);
    const agenciesKey = useMemo(() => (Array.isArray(agencies) ? agencies.join(',') : ''), [agencies]);

    // Build request parameters
    const buildRequestParams = useCallback(() => {
        const params = {
            page: page,
            per_page: perPage,
            locale: locale || i18n.language || 'en'
        };

        // Handle categories
        const normalizedCategories = normalizeCategories(categories);
        if (normalizedCategories && normalizedCategories.length > 0) {
            if (normalizedCategories.length === 1) {
                params.category_id = normalizedCategories[0];
                
                // If we have a single category and subcategories, add them
                if (subcategories && subcategories.length > 0) {
                    params.subcategory_ids = subcategories.join(',');
                }
            } else {
                params.categories = normalizedCategories.join(',');
            }
        }

        // Handle cities
        const normalizedCities = normalizeCities(cities);
        if (normalizedCities.length > 0) {
            if (normalizedCities.length === 1) {
                params.city = normalizedCities[0];
            } else {
                params.cities = normalizedCities.join(',');
            }
        }

        // Handle agencies
        if (agencies && agencies.length > 0) {
            params.agency_ids = agencies.join(',');
        }

        return params;
    }, [categoriesKey, subcategoriesKey, citiesKey, agenciesKey, perPage, page, locale, i18n.language]);

    // Fetch listings from API
    const controllerRef = useRef(null);

    const fetchListings = useCallback(async () => {
        try {
            if (controllerRef.current) {
                controllerRef.current.abort();
            }
            controllerRef.current = new AbortController();
            setLoading(true);
            setError(null);

            const params = buildRequestParams();
            const response = await axios.get('/api/get_filtered_listings', { params, signal: controllerRef.current.signal });

            if (response.data.success) {
                const data = response.data.listings.data || [];
                setListings(data);
                
                setPagination({
                    total: response.data.total || 0,
                    perPage: response.data.per_page || perPage,
                    currentPage: response.data.current_page || page,
                    lastPage: response.data.last_page || 1,
                    hasMore: response.data.has_more || false
                });

                // Call the onDataLoaded callback if provided
                if (onDataLoaded) {
                    onDataLoaded({
                        listings: data,
                        pagination: {
                            total: response.data.total || 0,
                            perPage: response.data.per_page || perPage,
                            currentPage: response.data.current_page || page,
                            lastPage: response.data.last_page || 1,
                            hasMore: response.data.has_more || false
                        },
                        raw: response.data
                    });
                }
            } else {
                throw new Error(response.data.message || 'Failed to fetch listings');
            }
        } catch (err) {
            if (err?.name === 'CanceledError' || err?.code === 'ERR_CANCELED') {
                return;
            }
            console.error('Error fetching listings:', err);
            setError(err.message || 'Failed to fetch listings');
            setListings([]);
            
            // Call the onError callback if provided
            if (onError) {
                onError(err);
            }
        } finally {
            setLoading(false);
        }
    }, [buildRequestParams, perPage, page, onDataLoaded, onError]);

    // Load data on mount and when dependencies change
    useEffect(() => {
        if (autoLoad) {
            fetchListings();
        }
        return () => {
            if (controllerRef.current) controllerRef.current.abort();
        };
    }, [fetchListings, autoLoad]);

    // Public method to manually fetch listings
    const reload = () => {
        return fetchListings();
    };

    // Helper function to get translated field
    const getTranslatedField = (listing, field) => {
        const currentLocale = locale || i18n.language || 'en';
        
        if (listing.translated_fields && listing.translated_fields[field]) {
            if (listing.translated_fields[field][currentLocale]) {
                return listing.translated_fields[field][currentLocale];
            }
            // Fallback to English
            if (listing.translated_fields[field]['en']) {
                return listing.translated_fields[field]['en'];
            }
        }
        
        // Final fallback to direct field
        return listing[field] || '';
    };

    // Helper function to get listing type string
    const getListingType = (categoryId) => {
        const id = parseInt(categoryId);
        switch(id) {
            case 2: return 'car';
            case 3: return 'driver';
            case 4: return 'boat';
            case 5: return 'activity';
            default: return 'unknown';
        }
    };

    // Return the component data and methods
    return {
        listings,
        loading,
        error,
        pagination,
        reload,
        getTranslatedField,
        getListingType
    };
};

// Helper utilities for card rendering
const getImageUrl = (filePath) => {
    if (!filePath) return null;
    if (filePath.startsWith('http') || filePath.startsWith('/')) return filePath;
    return `/${filePath}`;
};

const getFallbackImageUrl = (filePath) => {
    if (!filePath) return null;
    const imageUrl = getImageUrl(filePath);
    if (imageUrl.endsWith('.webp')) {
        const basePath = imageUrl.replace('.webp', '');
        return [`${basePath}.jpg`, `${basePath}.jpeg`, `${basePath}.png`];
    }
    return null;
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

/**
 * UnifiedListings UI component
 * This renders the listings as a carousel/cards while reusing the data hook above.
 * Keeps the same filter props for backend parity and adds optional UI props.
 */
const UnifiedListings = (props) => {
    const {
        title = null,
        subtitle = null,
        tabs = [], // optional list of city names or subcategory objects to filter by when clicked
        disableHeading = false,
        useSubcategoryFilter = false, // whether to use subcategory filtering
        subcategoryType = null, // 'type' or 'brand' for cars
        // data props forwarded as-is
        categories,
        subcategories,
        cities,
        agencies,
        perPage,
        page,
        locale,
        onDataLoaded,
        onError,
        autoLoad,
    } = props;

    const { t, i18n } = useTranslation();
    const pathMatch = typeof window !== 'undefined' ? window.location.pathname.match(/^\/(\w{2})(?:\/|$)/) : null;
    const currentLocale = locale || (pathMatch ? pathMatch[1] : (i18n.language || 'en'));

    const [activeTab, setActiveTab] = useState(tabs && tabs.length > 0 ? tabs[0].name || tabs[0] : null);

    // Determine effective cities and subcategories from tabs
    let effectiveCities = cities;
    let effectiveSubcategories = subcategories;
    
    if (tabs && tabs.length > 0) {
        if (useSubcategoryFilter) {
            // If tabs have IDs, use them for subcategory filtering
            const activeTabObj = tabs.find(tab => (tab.name || tab) === activeTab);
            if (activeTabObj && activeTabObj.id) {
                effectiveSubcategories = [activeTabObj.id];
            }
            effectiveCities = cities; // Keep cities as passed
        } else {
            // Original behavior for city tabs
            effectiveCities = activeTab ? [activeTab] : cities;
            effectiveSubcategories = subcategories;
        }
    }

    const data = useUnifiedListingsData({
        categories,
        subcategories: effectiveSubcategories,
        cities: effectiveCities,
        agencies,
        perPage,
        page,
        locale: currentLocale,
        onDataLoaded,
        onError,
        autoLoad,
    });

    const { listings, loading, getTranslatedField } = data;

    const generatePriceParts = (listing) => {
        const id = parseInt(listing.category_id);
        if (id === 2) return { prefix: t('common.from'), value: listing.price_per_day || listing.price || 0, suffix: `/ ${t('units.day')}` };
        if (id === 3) return { prefix: t('common.from'), value: (listing.pricings?.[0]?.airport_one) || listing.price || 0, suffix: `/ ${t('units.day')}` };
        if (id === 4) return { prefix: t('common.from'), value: listing.price_per_hour || listing.price || 0, suffix: `/ ${t('units.hour')}` };
        const p = listing.act_pricings?.[0]?.price || listing.price_per_person || listing.price || 0;
        return { prefix: t('common.from'), value: p, suffix: `/ ${t('units.person')}` };
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.bytech.ma/details/${listing.slug}`;
        const titleTxt = getTranslatedField(listing, 'title');
        const text = t('messages.whatsappInterest', { title: titleTxt, url });
        return `https://wa.me/+212660745055?text=${encodeURIComponent(text)}`;
    };

    const getCategoryLabel = (categoryId) => {
        const id = parseInt(categoryId);
        switch (id) {
            case 2: return t('categories.carRental', 'Car Rental');
            case 3: return t('categories.privateDriver', 'Private Driver');
            case 4: return t('categories.boatRental', 'Boat Rental');
            case 5: return t('categories.activity', 'Activity');
            default: return '';
        }
    };

    const getProviderLogo = (listing) => {
        // Backend may return provider logo as `provider.agency_logo` or `provider.logo`
        const file = listing?.provider?.agency_logo || listing?.provider?.logo || listing?.agency?.agency_logo;
        if (!file) return '/images/default-agency.jpeg';
        return getImageUrl(file);
    };

    return (
        <section className={`uls-container`}>
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
                            {tabs.map((tab) => {
                                const label = typeof tab === 'string' ? tab : tab.name;
                                return (
                                    <button
                                        key={label}
                                        className={`recommandation-city ${activeTab === label ? 'recommandation-city--active' : ''}`}
                                        onClick={() => setActiveTab(label)}
                                    >
                                        {label}
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </>
            )}

            <div className="uls-listings swiper-mode">
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
                            770: { slidesPerView: 2 },
                            1100: { slidesPerView: 3 },
                            1390: { slidesPerView: 4 },
                        }}
                        className="custom-swiper"
                    >
                        {listings.map((listing) => (
                            <SwiperSlide key={listing.id}>
                                <div className="uls-card">
                                    <div className="uls-card__image">
                                        <span className="uls-type-badge">{getCategoryLabel(listing.category_id)}</span>
                                        <span className="uls-agency-logo">
                                            <img src={getProviderLogo(listing)} alt={listing?.provider?.agency_name || 'Agency'} onError={(e)=>{e.currentTarget.src='/images/default-agency.jpeg'}} />
                                        </span>
                                        <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                            {listing.galleries && listing.galleries.length > 0 ? (
                                                <SmartImage
                                                    src={getImageUrl(listing.galleries[0].file_path)}
                                                    fallbackSrcs={getFallbackImageUrl(listing.galleries[0].file_path) || []}
                                                    alt={getTranslatedField(listing, 'title')}
                                                    className="uls-card__img"
                                                />
                                            ) : (
                                                <img
                                                    src="/images/not-found.png"
                                                    alt={getTranslatedField(listing, 'title')}
                                                    className="uls-card__img"
                                                />
                                            )}
                                        </a>
                                    </div>
                                    <div className="uls-card__content">
                                        <div className="uls-card__head">
                                            <h3 className="uls-card__title">
                                                <a href={getLocalizedUrl(`details/${listing.slug}`)}>
                                                    {getTranslatedField(listing, 'title')}
                                                </a>
                                            </h3>
                                            <p className="uls-card__location">
                                                <span className="loc-ico"><FaLocationDot size={12} /></span>
                                                {listing.city ? `${listing.city.city_name || listing.city}, Morocco` : t('common.morocco', 'Morocco')}
                                            </p>
                                        </div>
                                        <ListingIcons type={(() => { const id = parseInt(listing.category_id); if (id === 2) return 'cars'; if (id === 3) return 'drivers'; if (id === 4) return 'boats'; if (id === 5) return 'activities'; return 'cars'; })()} l={listing} classes={'compact'} />
                                        <div className="uls-badges">
                                            <span className="uls-badge uls-badge--green"><span className="uls-badge__ico"><FaCheckCircle size={12} /></span>{t('listing.trustNotes.cancellation', 'Free Cancellation')}</span>
                                            {!isDepositRequired(listing.deposit_required) && (
                                                <span className="uls-badge uls-badge--blue"><span className="uls-badge__ico"><FaMoneyBillWave size={12} /></span>{t('listing.specs.noDeposit', 'No Deposit')}</span>
                                            )}
                                            <span className="uls-badge uls-badge--outline"><span className="uls-badge__ico"><MdVerified size={12} /></span>{t('listing.badges.verifiedPartner', 'Verified Partner')}</span>
                                        </div>
                                    </div>
                                    <div className="uls-card__footer">
                                        <div className="uls-card__price">{(() => { const p = generatePriceParts(listing); return (<><span className="price-prefix">{p.prefix}&nbsp;</span><span className="price-value">{p.value}€</span>&nbsp;<span className="price-suffix">{p.suffix.replace(/^\s*\/\s*/, '/ ')}</span></>); })()}</div>
                                        <div className="uls-card__actions">
                                            <a href={getWtspUrl(listing)} target="_blank" className="uls-card__chat" aria-label="WhatsApp"><FaWhatsapp size={20} /></a>
                                            <a href={getLocalizedUrl(`details/${listing.slug}`)} className="uls-card__book">{t('common.bookNow')}</a>
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

export const useUnifiedListings = useUnifiedListingsData;
export default UnifiedListings;