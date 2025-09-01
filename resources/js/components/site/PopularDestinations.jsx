import React from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { getLocalizedUrl } from "../../utils/localeManager";

// Local image map for popular Moroccan cities
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
 * PopularDestinations
 *
 * Reusable carousel section showcasing a list of cities as destination cards.
 * Matches the design of the Next.js `PopularDestinations` component used in src/.
 *
 * Props:
 * - title?: string
 * - subtitle?: string
 * - cities?: string[]                 // e.g., ["Agadir", "Marrakech", ...]
 * - destinations?: Array<{ name, slug?, listings?, image? }>
 * - basePath?: string                 // optional prefix for links (default: "/city/")
 */
const PopularDestinations = ({
    title,
    subtitle,
    cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat", "Essaouira"],
    destinations = null,
    basePath = "",
}) => {
    const { t } = useTranslation();

    const items = (destinations && Array.isArray(destinations) && destinations.length > 0)
        ? destinations.map((d) => ({
              name: d.name,
              slug: d.slug || toSlug(d.name),
              listings: d.listings || "40+",
              image: d.image || CITY_IMAGE_MAP[d.name] || "https://placehold.co/1200x800",
          }))
        : cities.map((city) => ({
              name: city,
              slug: toSlug(city),
              listings: "40+",
              image: CITY_IMAGE_MAP[city] || "https://placehold.co/1200x800",
          }));

    const buildHref = (slug) => {
        // If a basePath is provided, use it like `/cars/marrakech`, otherwise fallback to `/city/marrakech`
        const cleaned = (basePath || "").replace(/\/$/, "");
        const path = cleaned ? `${cleaned}/${slug}` : `/city/${slug}`;
        return getLocalizedUrl(path);
    };

    return (
        <section id="popular-destinations">
            <div className="section-head" style={{ textAlign: "center" }}>
                <h2 className="section-title">
                    {title ? title : t("home.popular.title")}
                </h2>
                <h3 className="section-subtitle">
                    {subtitle ? subtitle : t("home.popular.subtitleLong", { defaultValue: t("home.popular.subtitle") + ". Find the best deals on car rentals, private drivers, boats and activities." })}
                </h3>
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
                {items.map((city, index) => (
                    <SwiperSlide key={index}>
                        <a href={buildHref(city.slug)} className="city-card">
                            <div className="city-image-container">
                                <img
                                    src={city.image}
                                    alt={city.name}
                                    className="city-image"
                                    onError={(e) => { e.target.src = "https://placehold.co/1200x800"; }}
                                />
                                <div className="city-overlay"></div>
                            </div>
                            <div className="city-info">
                                <h3 className="city-name">{t(`cities.${city.slug}`, { defaultValue: city.name })}</h3>
                                <p className="city-properties">{city.listings}+ {t("home.popular.listings")}</p>
                            </div>
                        </a>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default PopularDestinations;


