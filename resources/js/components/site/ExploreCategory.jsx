import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ExploreCategory = ({ title, subtitle, items }) => {

    return (
        <section id="explore-popular">
            <div className="section-head">
                <h2 className="section-title">
                    {title ? title : "Explore Popular Destinations in Morocco"}
                </h2>
                <h3 className="section-subtitle">
                    {subtitle ? subtitle : "Explore Morocco by City & Service"}
                </h3>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                    },
                    768: {
                        slidesPerView: 3,
                    },
                    1024: {
                        slidesPerView: 5,
                    },
                }}
            >
                {items.map((city, index) => (
                    <SwiperSlide key={index}>
                        <div className="city-card v2">
                            <div className="city-image-container">
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="city-image"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://marhire.bytech.ma/images/casablanca2.webp";
                                    }}
                                />
                                <div className="city-overlay"></div>
                            </div>
                            <div className="city-info">
                                <h3 className="city-name">{city.name}</h3>
                                <p className="city-properties">
                                    {city.listings.toLocaleString()}
                                    {"+ "}
                                    Listings
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ExploreCategory;
