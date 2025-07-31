import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const OurServices = () => {
    const services = [
        {
            image: "https://marhire.bytech.ma/images/services/rentalx600.webp",
            name: "Car Rentals",
            desc: "Cars of all types cheap, luxury, family vans, or SUVs. Delivered at the airport with full insurance, many without deposit.",
            cta: "Explore Cars",
        },
        {
            image: "https://marhire.bytech.ma/images/services/privatex600.webp",
            name: "Private Drivers",
            desc: "Professional bilingual chauffeurs for business, tourism, or airport transfers.",
            cta: "Explore Drivers",
        },
        {
            image: "https://marhire.bytech.ma/images/services/boatx600.webp",
            name: "Boat Rentals",
            desc: "Book a luxury yacht, fishing boat, or speedboat for parties or sunset cruises.",
            cta: "Explore Boats",
        },
        {
            image: "https://marhire.bytech.ma/images/services/activityx600.webp",
            name: "Activities & Tours",
            desc: "Quad biking, camel rides, jet skis, and cultural walks all over Morocco.",
            cta: "Explore Activities",
        },
    ];

    return (
        <section id="explore-popular">
            <div className="section-head">
                <h2 className="section-title">
                    Our Services
                </h2>
                <h3 className="section-subtitle">
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
                        slidesPerView: 4,
                    },
                }}
            >
                {services.map((service, index) => (
                    <SwiperSlide key={index}>
                        <div className="city-card">
                            <div className="city-image-container">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="city-image"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://marhire.bytech.ma/images/services/rentalx600.webp";
                                    }}
                                />
                                <div className="city-overlay"></div>
                            </div>
                            <div className="city-info">
                                <h3 className="city-name">{service.name}</h3>
                                <p className="city-properties">
                                    {service.desc}
                                </p>
                                <button className="explore-button">
                                    {service.cta} →
                                </button>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default OurServices;
