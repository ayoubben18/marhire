import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import SearchItem from "./SearchItem";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getLocalizedUrl } from "../../utils/localeManager";

const FilteredListings = ({
    title,
    subtitle,
    tabs = [],
    agency_ids = [],
    category_id = null,
    subcategory_ids = [],
    cities = [],
    defaultCity = "Agadir",
    itemsPerPage = 8,
    classes = "",
}) => {
    const { t } = useTranslation();
    const [activeCity, setActiveCity] = useState(defaultCity);
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
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
    const getFallbackImagesByCategory = (categoryId) => {
        const id = Number(categoryId);
        if (id === 2) return ["/images/default-car.webp", "/images/default-car.jpeg"];
        if (id === 3) return ["/images/default-driver.jpeg", "/images/default-driver-2.jpeg"];
        if (id === 4) return ["/images/default-boat.jpeg", "/images/default-boat-2.jpeg"];
        if (id === 5) return ["/images/default-activity.jpeg", "/images/default-activity-2.jpeg"];
        return ["/images/default.jpg"];
    };

    const fetchListings = async (page = 1, append = false) => {
        try {
            if (page > 1) setLoadingMore(true);
            else setLoading(true);

            const params = {
                page,
                per_page: itemsPerPage,
            };

            // Add filters
            if (tabs.length > 0 && activeCity) {
                params.city = activeCity;
            } else if (cities.length > 0) {
                params.cities = cities.join(',');
            }

            if (agency_ids.length > 0) {
                params.agency_ids = agency_ids.join(',');
            }

            if (category_id) {
                params.category_id = category_id;
            }

            if (subcategory_ids.length > 0) {
                params.subcategory_ids = subcategory_ids.join(',');
            }

            const response = await axios.get("/api/get_filtered_listings", { params });

            if (response.data.success) {
                const newListings = response.data.listings.data || [];
                
                // Transform listing data to match SearchItem expected format
                const transformedListings = newListings.map(listing => {
                    const categoryType = getCategoryType(listing.category_id);
                    
                    // Transform photos array to galleries format
                    const galleries = (listing.photos || []).map(photo => ({
                        file_path: photo
                    }));

                    return {
                        id: listing.id,
                        slug: listing.slug,
                        title: listing.title,
                        galleries: galleries,
                        price_per_day: listing.price,
                        price_per_hour: listing.price,
                        pricings: [{ airport_one: listing.price }],
                        act_pricings: [{ price: listing.price }],
                        category_id: listing.category_id,
                        city: listing.city ? { city_name: listing.city } : null,
                        provider: listing.agency ? { agency_name: listing.agency } : null,
                        transmission: listing.transmission,
                        fuel_type: listing.fuel,
                        seats: listing.seats,
                        no_deposit: listing.no_deposit,
                        vehicule_type: listing.vehicle_type,
                        languages_spoken: listing.languages,
                        capacity: listing.capacity,
                        with_captain: listing.captain_included,
                        boat_type: listing.boat_type,
                        duration_options: listing.duration,
                        group_size_max: listing.group_size,
                        type: categoryType,
                    };
                });

                if (append) {
                    setListings(prev => [...prev, ...transformedListings]);
                } else {
                    setListings(transformedListings);
                }

                setHasMore(response.data.listings.current_page < response.data.listings.last_page);
            }
        } catch (error) {
            console.error("Error fetching filtered listings:", error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const getCategoryType = (categoryId) => {
        const id = Number(categoryId);
        if (id === 2) return 'car';
        if (id === 3) return 'driver';
        if (id === 4) return 'boat';
        if (id === 5) return 'activity';
        return 'car';
    };


    useEffect(() => {
        setCurrentPage(1);
        fetchListings(1);
    }, [activeCity, agency_ids.join(','), category_id, subcategory_ids.join(','), cities.join(',')]);

    const loadMore = () => {
        if (!loadingMore && hasMore) {
            const nextPage = currentPage + 1;
            setCurrentPage(nextPage);
            fetchListings(nextPage, true);
        }
    };

    return (
        <section className={`filtered-listings-section ${classes}`}>
            <div className="container">
                {(title || subtitle) && (
                    <div className="section-head">
                        {title && <h2 className="section-title">{title}</h2>}
                        {subtitle && <h3 className="section-subtitle">{subtitle}</h3>}
                    </div>
                )}

                {tabs.length > 0 && (
                    <div className="city-tabs">
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                className={`city-tab ${activeCity === tab.name ? "active" : ""}`}
                                onClick={() => setActiveCity(tab.name)}
                            >
                                {tab.name}
                            </button>
                        ))}
                        <a href={getLocalizedUrl("/cities")} className="explore-all">
                            {t("common.exploreAll")} →
                        </a>
                    </div>
                )}

                <div className="listings-grid">
                    {loading ? (
                        Array.from({ length: itemsPerPage }).map((_, idx) => (
                            <div key={idx} className="listing-skeleton">
                                <Skeleton height={200} />
                                <Skeleton height={20} style={{ marginTop: 10 }} />
                                <Skeleton height={15} width="60%" style={{ marginTop: 5 }} />
                                <Skeleton height={30} width="40%" style={{ marginTop: 10 }} />
                            </div>
                        ))
                    ) : listings.length > 0 ? (
                        listings.map((listing) => (
                            <SearchItem 
                                key={listing.id} 
                                item={listing}
                                type={listing.type || 'car'}
                            />
                        ))
                    ) : (
                        <div className="no-listings">
                            <p>{t("common.noListingsFound")}</p>
                        </div>
                    )}
                </div>

                {hasMore && !loading && (
                    <div className="load-more-container">
                        <button
                            className="load-more-btn"
                            onClick={loadMore}
                            disabled={loadingMore}
                        >
                            {loadingMore ? t("common.loading") : t("common.loadMore")}
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .filtered-listings-section {
                    padding: 40px 0;
                }

                .filtered-listings-section .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .section-head {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .section-title {
                    font-size: 32px;
                    font-weight: 800;
                    color: #0f1f1b;
                    margin: 0 0 10px 0;
                }

                .section-subtitle {
                    font-size: 16px;
                    color: #607773;
                    margin: 0;
                }

                .city-tabs {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 30px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #e6efe9;
                    flex-wrap: wrap;
                }

                .city-tab {
                    padding: 8px 16px;
                    background: #f7f7f7;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    color: #4a5568;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .city-tab:hover {
                    background: #e6f3f0;
                    border-color: #048667;
                }

                .city-tab.active {
                    background: #048667;
                    color: white;
                    border-color: #048667;
                }

                .explore-all {
                    margin-left: auto;
                    color: #048667;
                    font-size: 14px;
                    font-weight: 600;
                    text-decoration: none;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .explore-all:hover {
                    text-decoration: underline;
                }

                .listings-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                }

                .listing-skeleton {
                    background: white;
                    border-radius: 10px;
                    padding: 10px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.08);
                }

                .no-listings {
                    grid-column: 1 / -1;
                    text-align: center;
                    padding: 60px 20px;
                    color: #607773;
                    font-size: 16px;
                }

                .load-more-container {
                    display: flex;
                    justify-content: center;
                    margin-top: 40px;
                }

                .load-more-btn {
                    padding: 12px 30px;
                    background: #048667;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s;
                }

                .load-more-btn:hover {
                    background: #037359;
                }

                .load-more-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                }

                @media (max-width: 768px) {
                    .section-title {
                        font-size: 24px;
                    }

                    .listings-grid {
                        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    }

                    .city-tabs {
                        overflow-x: auto;
                        flex-wrap: nowrap;
                        -webkit-overflow-scrolling: touch;
                    }
                }

                @media (max-width: 480px) {
                    .listings-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </section>
    );
};

export default FilteredListings;