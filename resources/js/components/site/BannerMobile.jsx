import React from "react";
import { FaCar, FaUserTie, FaShip, FaCompass } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const BannerMobile = () => {
    const { t } = useTranslation();
    const categories = [
        {
            item: t("services.carRentals"),
            link: "/category/car-rental",
            icon: <FaCar />,
        },
        {
            item: t("services.privateDrivers"),
            link: "/category/private-driver",
            icon: <FaUserTie />,
        },
        {
            item: t("services.boatRentals"),
            link: "/category/boats",
            icon: <FaShip />,
        },
        {
            item: t("services.activitiesTours"),
            link: "/category/things-to-do",
            icon: <FaCompass />,
        },
    ];
    return (
        <section className="banner-home__mobile">
            {categories.map((cat, idx) => (
                <div className="cat__mobile" key={idx}>
                    <a href={cat.link}>
                        <div
                            className="cat__mobile__icon"
                            style={{ fontSize: 24 }}
                        >
                            {cat.icon}
                        </div>
                    </a>
                    <div className="cat__mobile__txt">{cat.item}</div>
                </div>
            ))}
        </section>
    );
};

export default BannerMobile;
