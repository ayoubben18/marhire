import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getLocalizedUrl } from "../../utils/localeManager";

const ExploreCategory = ({ title, subtitle, items, centered = false }) => {
    const { t } = useTranslation();

    return (
        <section id="explore-popular">
            <div className="section-head" style={centered ? { textAlign: 'center' } : undefined}>
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
                {items.map((city, index) => (
                    <SwiperSlide key={index}>
                        <a href={city.link ? city.link : getLocalizedUrl(`/city/${(city.slug || city.name || '').toString().toLowerCase()}`)} className="city-card">
                            <div className="city-image-container">
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="city-image"
                                    onError={(e) => {
                                        e.target.src = "https://placehold.co/1200x800";
                                    }}
                                />
                                <div className="city-overlay"></div>
                            </div>
                            <div className="city-info">
                                <h3 className="city-name">{city.name}</h3>
                                <p className="city-properties">{city.listings}+ {t("home.popular.listings")}</p>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default ExploreCategory;
