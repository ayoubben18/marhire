import React from "react";
import { useTranslation } from "react-i18next";

const OurServices = () => {
    const { t } = useTranslation();
    const services = [
        { name: t("services.carRentals", "Car Rentals"), desc: t("services.exploreCars") },
        { name: t("services.privateDrivers", "Private Drivers"), desc: t("services.exploreDrivers") },
        { name: t("services.boatRentals", "Boat Rentals"), desc: t("services.exploreBoats") },
        { name: t("services.activitiesTours", "Activities & Tours"), desc: t("services.exploreActivities") },
    ];

    return (
        <section className="our-services">
            <div className="section-head">
                <h2 className="section-title">{t('home.servicesTitle', { defaultValue: 'Our Services' })}</h2>
            </div>

            <div className="services-grid">
                {services.map((s, i) => (
                    <div key={i} className="service-card">
                        <h3 className="service-title">{s.name}</h3>
                        <p className="service-desc">{s.desc}</p>
                        <a href="#" className="service-link">{t('home.popular.explore', 'Explore')} →</a>
                    </div>
                ))}
            </div>

            <style>{`
                .our-services { background: #f1f7f5; padding: 40px 0 46px; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
                .our-services .section-head { text-align: center; margin: 0 0 18px 0; }
                .our-services .section-title { font-size: 22px; font-weight: 800; color: #0f1f1b; }

                .services-grid { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 18px; }
                .service-card { background: #ffffff; border: 1px solid #e6efe9; border-radius: 14px; padding: 18px; min-height: 180px; display: flex; flex-direction: column; }
                .service-title { margin: 0 0 8px 0; font-size: 16px; font-weight: 800; color: #0f1f1b; }
                .service-desc { margin: 0 0 12px 0; color: #4a5568; font-size: 13px; line-height: 1.6; flex: 1 1 auto; }
                .service-link { color: #048667; text-decoration: none; font-weight: 700; font-size: 13px; }

                @media (max-width: 1000px) { .services-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default OurServices;
