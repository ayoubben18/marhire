import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const OurServices = () => {
    const { t } = useTranslation();
    const services = [
        {
            image: "https://marhire.bytech.ma/images/services/rentalx600.webp",
            name: t("services.carRentals"),
            desc: t("services.exploreCars"),
            cta: t("services.exploreCars"),
        },
        {
            image: "https://marhire.bytech.ma/images/services/privatex600.webp",
            name: t("services.privateDrivers"),
            desc: t("services.exploreDrivers"),
            cta: t("services.exploreDrivers"),
        },
        {
            image: "https://marhire.bytech.ma/images/services/boatx600.webp",
            name: t("services.boatRentals"),
            desc: t("services.exploreBoats"),
            cta: t("services.exploreBoats"),
        },
        {
            image: "https://marhire.bytech.ma/images/services/activityx600.webp",
            name: t("services.activitiesTours"),
            desc: t("services.exploreActivities"),
            cta: t("services.exploreActivities"),
        },
    ];

    return (
        <section id="explore-popular">
            <div className="section-head">
                <h2 className="section-title">
                    {t("home.servicesTitle", { defaultValue: "Our Services" })}
                </h2>
                <h3 className="section-subtitle"></h3>
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
