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

const tabs = [
    { key: "cars", label: "Cars", icon: <FaCar /> },
    { key: "boats", label: "Boats", icon: <IoMdBoat /> },
    { key: "drivers", label: "Private Drivers", icon: <ImUserTie /> },
    { key: "activity", label: "Things to Do", icon: <MdTour /> },
];

const HeroSection = ({ withBar, text, isFull, tab }) => {
    const [activeTab, setActiveTab] = useState(tab ? tab :"cars");
    const features = [
        {
            name: "Trusted Local Partners",
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
        },
        {
            name: "No Hidden Fees",
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
        },
        {
            name: "Instant Booking",
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
        },
        {
            name: "No Deposit",
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
                            {text
                                ? text
                                : "Explore Morocco with Verified Local Experts"}
                        </h1>
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
                                    {tabs.map((tab) => (
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
        </div>
    );
};

export default HeroSection;
