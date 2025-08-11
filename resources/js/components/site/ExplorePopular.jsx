import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getLocalizedUrl } from "../../utils/localeManager";

const ExplorePopular = ({ title, subtitle }) => {
    const { t } = useTranslation();
    const cities = [
        {
            name: t("cities.agadir"),
            slug: "Agadir",
            listings: 40,
            image: "https://marhire.bytech.ma/images/agadir.webp",
        },
        {
            name: t("cities.marrakech"),
            slug: "Marrakech",
            listings: 40,
            image: "https://marhire.bytech.ma/images/marrakech.webp",
        },
        {
            name: t("cities.casablanca"),
            slug: "Casablanca",
            listings: 40,
            image: "https://marhire.bytech.ma/images/casablanca2.webp",
        },
        {
            name: t("cities.fes"),
            slug: "Fes",
            listings: 40,
            image: "https://marhire.bytech.ma/images/fez.webp",
        },
        {
            name: t("cities.tangier"),
            slug: "Tangier",
            listings: 40,
            image: "https://marhire.bytech.ma/images/tangier.webp",
        },
        {
            name: t("cities.essaouira"),
            slug: "Essaouira",
            listings: 40,
            image: "https://marhire.bytech.ma/images/essaouira.webp",
        },
        {
            name: t("cities.rabat"),
            slug: "Rabat",
            listings: 40,
            image: "https://marhire.bytech.ma/images/rabat.webp",
        },
    ];

    return (
        <section id="explore-popular">
            <div className="section-head">
                <h2 className="section-title">
                    {title ? title : t("home.popular.title")}
                </h2>
                <h3 className="section-subtitle">
                    {subtitle ? subtitle : t("home.popular.subtitle")}
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
                {cities.map((city, index) => (
                    <SwiperSlide key={index}>
                        <div className="city-card">
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
                                    {city.listings.toLocaleString()}+{" "}
                                    {t("home.popular.listings")}
                                </p>
                                <a
                                    href={getLocalizedUrl(`city/${city.slug}`)}
                                    className="explore-button"
                                >
                                    {t("home.popular.explore")} →
                                </a>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ExplorePopular;
