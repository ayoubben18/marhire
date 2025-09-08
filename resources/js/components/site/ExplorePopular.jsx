import React from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";

const ExplorePopular = ({ title, subtitle }) => {
    const { t } = useTranslation();
    const cities = [
        { name: t("cities.agadir"), slug: "Agadir", listings: 40, image: "/images/cities/agadir.jpg" },
        { name: t("cities.marrakech"), slug: "Marrakech", listings: 40, image: "/images/cities/marrakech.jpg" },
        { name: t("cities.casablanca"), slug: "Casablanca", listings: 40, image: "/images/cities/casablanca.jpg" },
        { name: t("cities.fes"), slug: "Fes", listings: 40, image: "/images/cities/fez.jpg" },
        { name: t("cities.tangier"), slug: "Tangier", listings: 40, image: "/images/cities/tangier.jpg" },
        { name: t("cities.essaouira"), slug: "Essaouira", listings: 30, image: "/images/cities/essaouira.jpg" },
    ];

    return (
        <section className="where-operate">
            <div className="head">
                <h2 className="title">{title ? title : t("home.popular.title")}</h2>
                {subtitle ? <h3 className="subtitle">{subtitle}</h3> : null}
            </div>

            <div className="cards">
                {cities.map((city, index) => (
                    <a key={index} href={getLocalizedUrl(`city/${city.slug}`)} className="wo-card" aria-label={city.name}>
                        <img
                            src={city.image}
                            alt={city.name}
                            onError={(e) => { e.target.src = "https://placehold.co/1200x800"; }}
                        />
                        <div className="wo-bottom">
                            <div className="wo-name">{city.name}</div>
                            <div className="wo-meta">{city.listings}+ {t("home.popular.listings")}</div>
                        </div>
                    </a>
                ))}
            </div>

            <style>{`
                .where-operate { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f1f7f5; padding: 36px 0 44px; }
                .head { text-align: center; margin: 0 0 16px 0; }
                .title { font-size: 20px; font-weight: 800; color: #0f1f1b; margin: 0; }
                .subtitle { color: #6b7280; margin: 4px 0 0 0; }

                .cards { max-width: 1400px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
                .where-operate .wo-card { display: block; position: relative; border-radius: 16px; overflow: hidden; border: 1px solid #e6efe9; background: #ffffff; }
                .where-operate .wo-card img { width: 100%; aspect-ratio: 3 / 2; height: auto; object-fit: cover; display: block; border-radius: 16px; }
                .where-operate .wo-card::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0; height: 55%; background: linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.55) 100%); border-bottom-left-radius: 16px; border-bottom-right-radius: 16px; }
                .where-operate .wo-bottom { position: absolute; left: 16px; right: 16px; bottom: 16px; z-index: 2; color: #ffffff; }
                .where-operate .wo-name { font-weight: 800; font-size: 16px; margin: 0 0 4px 0; text-shadow: 0 1px 2px rgba(0,0,0,.2); }
                .where-operate .wo-meta { font-size: 12px; opacity: 0.95; }

                @media (max-width: 1200px) { .cards { grid-template-columns: repeat(3, 1fr); } }
                @media (max-width: 820px) { .cards { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 480px) { .cards { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default ExplorePopular;
