import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { BsFillFuelPumpDieselFill } from "react-icons/bs";
import { GiCarDoor } from "react-icons/gi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import ListingIcons from "./ListingIcons";

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
    const [activeCity, setActiveCity] = useState(city || "Agadir");
    const [activeTab, setActiveTab] = useState(tabs ? tabs[0].name : null);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const cities = ["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes"];
    const config = {
        cars: {
            title: "Top Car Rental Deals",
            description: "No Deposit | Unlimited Kilometers | Airport Pickup",
            ctaText: "Explore All Cars →",
            ctaLink: "/car-search",
        },
        drivers: {
            title: "Private Drivers You Can Rely On",
            description: "Multilingual | Airport Transfers | Business Trips",
            ctaText: "Book a Private Driver →",
            ctaLink: "/private-search",
        },
        boats: {
            title: "Boat Rentals & Private Cruises",
            description: "With Captain | Sunset Trips | Group or Private",
            ctaText: "Browse Boats & Cruises →",
            ctaLink: "/boat-search",
        },
        activities: {
            title: "Top Things to Do in Morocco",
            description: "Local Tours | Family Friendly | Instant Booking",
            ctaText: "Discover Activities →",
            ctaLink: "/thingstodo-search",
        },
    };

    const currentConfig = config[type] || config["cars"];

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

    const generatePrice = (listing) => {
        if (type === "cars") {
            return `From ${listing.price_per_day}€ / day`;
        } else if (type === "drivers") {
            const driverPrice = listing.pricings[0].airport_one || 0;
            return `From ${driverPrice}€ / day`;
        } else if (type === "boats") {
            return `From ${listing.price_per_hour}€ / hour`;
        } else {
            const price = listing.act_pricings[0].price || 0;
            return `From ${price}€ / person`;
        }
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.bytech.ma/details/${listing.slug}`;
        const message = encodeURIComponent(
            `Hello,\nI am interested in booking this rental:\n\nTitle:${listing.title} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
        );
        // For WhatsApp link:
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
                                      <span className="annonce-price-badge">
                                          {generatePrice(listing)}
                                      </span>
                                      <a href={`/details/${listing.slug}`}>
                                          <img
                                              src={
                                                  listing.galleries &&
                                                  listing.galleries.length
                                                      ? "/" +
                                                        listing.galleries[0]
                                                            .file_path
                                                      : ""
                                              }
                                              alt={listing.title}
                                              className="recommendation-image"
                                              onError={(e) => {
                                                  e.currentTarget.src =
                                                      "/images/default-marhire.png";
                                              }}
                                          />
                                      </a>
                                  </div>
                                  <div className="recommendation-content">
                                      <div className="recommendation-header">
                                          <h3 className="recommendation-title">
                                              {listing.title}
                                          </h3>
                                          <p className="recommendation-location">
                                              📍 {listing.city ? listing.city.city_name : 'Morocco'}
                                          </p>
                                      </div>
                                      <ListingIcons type={type} l={listing} />
                                  </div>
                                  <div className="recommendation-footer">
                                      <a href={`/details/${listing.slug}`} className="recommendation-button">
                                          <span>
                                              <FaCalendarAlt />
                                          </span>{" "}
                                          Book Now
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
                    <button className="load-more" onClick={loadMore}>Load More</button>
                </div>
            )}
        </section>
    );
};

export default Recommended;
