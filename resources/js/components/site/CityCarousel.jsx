import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getLocalizedUrl } from "../../utils/localeManager";

const CITY_IMAGE_MAP = {
    Marrakech: "/images/cities/marrakech.jpg",
    Agadir: "/images/cities/agadir.jpg",
    Casablanca: "/images/cities/casablanca.jpg",
    Fes: "/images/cities/fez.jpg",
    Fez: "/images/cities/fez.jpg",
    Tangier: "/images/cities/tangier.jpg",
    Essaouira: "/images/cities/essaouira.jpg",
    Rabat: "/images/cities/rabat.jpg",
};

const toSlug = (name = "") => name.toString().trim().toLowerCase().replace(/\s+/g, "-");

/**
 * CityCarousel: Reusable city cards carousel with a right-aligned "Explore All Cities" link.
 *
 * Props
 * - title: string
 * - cities: string[]
 * - basePath?: string            // prefix for city links, fallback to /city/<slug>
 * - exploreHref?: string         // link for the top-right CTA
 * - exploreText?: string         // CTA label (default: "Explore All Cities")
 */
const CityCarousel = ({
    title,
    cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat", "Essaouira"],
    basePath = "",
    exploreHref = "/city",
    exploreText = null,
}) => {
    const { t } = useTranslation();
    const buildHref = (cityName) => {
        const slug = toSlug(cityName);
        const prefix = (basePath || "").replace(/\/$/, "");
        const path = prefix ? `${prefix}/${slug}` : `/city/${slug}`;
        return getLocalizedUrl(path);
    };

    return (
        <section>
            <div className="section-head section-title--between">
                <h2 className="section-title">{title}</h2>
                <a href={getLocalizedUrl(exploreHref)} className="recommendation-cta">
                    {exploreText || t("home.popular.exploreAllCities")} <span>→</span>
                </a>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                navigation
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                }}
            >
                {cities.map((city) => (
                    <SwiperSlide key={city}>
                        <a href={buildHref(city)} className="city-card">
                            <div className="city-image-container">
                                <img
                                    src={CITY_IMAGE_MAP[city] || "https://placehold.co/1200x800"}
                                    alt={city}
                                    className="city-image"
                                    onError={(e) => { e.target.src = "https://placehold.co/1200x800"; }}
                                />
                                <div className="city-overlay"></div>
                            </div>
                            <div className="city-info">
                                <h3 className="city-name">{t(`cities.${toSlug(city)}`, { defaultValue: city })}</h3>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default CityCarousel;


