import React from "react";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";
import { FaShuttleVan } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";

const WhyChooseUs = ({ title, subtitle, features }) => {
    return (
        <section className="chooseus-container">
            <div className="section-head">
                <h2 className="section-title">{title}</h2>
                <h3 className="section-subtitle">{subtitle}</h3>
            </div>
            <div className="chooseus__features">
                {features.map((feature, index) => (
                    <div key={index} className="chooseus__feature">
                        <div className="chooseus__feature__icon">
                            {feature.icon && <img src={feature.icon} alt={feature.title} />}
                        </div>
                        <div className="chooseus__feature__content">
                            <h3>{ feature.title}</h3>
                            <p>
                                {feature.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WhyChooseUs;
