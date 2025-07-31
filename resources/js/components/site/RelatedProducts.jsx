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

const TYPES = {
    2: "cars",
    3: "boats",
    4: "drivers",
    5: "activities",
};

const RelatedProducts = ({ category = 2, loading }) => {
    const type = TYPES[category] || "cars";
    const [listings, setListings] = useState([]);


    const generatePrice = (listing) => {
        try{
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
        }catch(err){
            console.log(err);
        }
        
    };

    const getWtspUrl = (listing) => {
        const url = `https://marhire.bytech.ma/details/${listing.slug}`;
        const message = encodeURIComponent(
            `Hello,\nI am interested in booking this rental:\n\nTitle:${listing.title} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
        );

        const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

        return whatsappLink;
    };

    useEffect(() => {
        try {
            const fetchListings = async () => {
                const response = await axios.get("/api/related_products", {
                    params: { category_id: category },
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
                                        <a
                                            href={`/details/${listing.slug}`}
                                            className="recommendation-button"
                                        >
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        )
    );
};

export default RelatedProducts;
