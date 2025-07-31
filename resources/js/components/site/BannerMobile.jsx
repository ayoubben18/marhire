import React from "react";
import { FaCar, FaUserTie, FaShip, FaCompass } from "react-icons/fa";

const categories = [
    { item: "Car Rental", link: "/category/car-rental", icon: <FaCar /> },
    {
        item: "Private Driver",
        link: "/category/private-driver",
        icon: <FaUserTie />,
    },
    { item: "Boat Rental", link: "/category/boats", icon: <FaShip /> },
    {
        item: "Things To Do",
        link: "/category/things-to-do",
        icon: <FaCompass />,
    },
];

const BannerMobile = () => {
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
