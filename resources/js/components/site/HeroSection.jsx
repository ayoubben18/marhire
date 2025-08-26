import React, { useEffect, useState } from "react";
import { FaCar } from "react-icons/fa";
import { IoMdBoat } from "react-icons/io";
import { ImUserTie } from "react-icons/im";
import { MdTour } from "react-icons/md";
import CarRentalForm from "./CarRentalForm";
import ThingsToDoForm from "./ThingsToDoForm";
import PrivateDriverForm from "./PrivateDriverForm";
import BoatForm from "./BoatForm";
import SearchBoatForm from "./SearchBoatFrm";
import { useTranslation } from "react-i18next";

function getTabs(t) {
    return [
        { key: "cars", label: t("home.tabs.cars"), icon: <FaCar /> },
        { key: "boats", label: t("home.tabs.boats"), icon: <IoMdBoat /> },
        { key: "drivers", label: t("home.tabs.drivers"), icon: <ImUserTie /> },
        { key: "activity", label: t("home.tabs.activities"), icon: <MdTour /> },
    ];
}

const HeroSection = ({ withBar, text, subtitle, isFull, tab }) => {
    const { t, i18n } = useTranslation();
    
    const [activeTab, setActiveTab] = useState(tab ? tab : "cars");
    const features = [
        {
            name: t("home.features.trustedPartners"),
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
        },
        {
            name: t("home.features.noHiddenFees"),
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
        },
        {
            name: t("home.features.instantBooking"),
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
        },
        {
            name: t("home.features.noDeposit"),
            icon: "https://marhire.bytech.ma/images/icons/icon4.svg",
        },
    ];

    return (
        <div className={`hero-section ${isFull === true ? "is-full" : ""}`}>
            <div className="hero-section--banner banner1">
                <div className="hero--bg-overlay"></div>
                <div className="hero-section--content">
                    <div className="slogan">
                        <h1 className="slogan-title">
                            {text ? text : t("home.hero.title")}
                        </h1>
                        {subtitle ? (
                            <p className="slogan-subtitle">{subtitle}</p>
                        ) : null}
                        {withBar && (
                            <div className="features-icons">
                                {features.map((item, index) => (
                                    <span className="features-icons__item">
                                        <img src={item.icon} />
                                        {item.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="searchbox">
                        {withBar && (
                            <div className="searchbox__tabs">
                                <div className="searchbox__bar">
                                    {getTabs(t).map((tab) => (
                                        <button
                                            key={tab.key}
                                            className={`seachbox__item ${
                                                tab.key === activeTab
                                                    ? "seachbox__item-active"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setActiveTab(tab.key)
                                            }
                                        >
                                            {tab.icon} <span>{tab.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        <div className="searchbox__frm">
                            {activeTab === "cars" && <CarRentalForm />}
                            {activeTab === "drivers" && <PrivateDriverForm />}
                            {activeTab === "boats" && <BoatForm />}
                            {activeTab === "activity" && <ThingsToDoForm />}
                        </div>
                    </div>
                </div>
            </div>
            <style>{`
                .slogan-subtitle { margin: 8px auto 0; color: #e5f1ee; font-size: 14px; line-height: 1.6; max-width: 1000px; text-align: center; padding: 0 16px; }
            `}</style>
        </div>
    );
};

export default HeroSection;
