import { useState } from "react";
import { useTranslation } from "react-i18next";

const FooterRecommendation = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        { id: 1, name: t("footerRec.discoverMorocco") },
        { id: 2, name: t("services.privateDrivers") },
        { id: 3, name: t("services.boatRentals") },
        { id: 4, name: t("services.activitiesTours") },
    ];

    const services = [
        // Discover Morocco (category_id: 1)
        {
            name: t("footerRec.carRentalCity", { city: t("cities.marrakech") }),
            category_id: 1,
            link: "",
        },
        {
            name: t("footerRec.carRentalCity", { city: t("cities.agadir") }),
            category_id: 1,
            link: "",
        },
        {
            name: t("footerRec.carRentalCity", {
                city: t("cities.casablanca"),
            }),
            category_id: 1,
            link: "",
        },
        {
            name: t("footerRec.carRentalCity", { city: t("cities.fes") }),
            category_id: 1,
            link: "",
        },
        {
            name: t("footerRec.carRentalCity", { city: t("cities.tangier") }),
            category_id: 1,
            link: "",
        },
        {
            name: t("footerRec.carRentalCity", { city: t("cities.rabat") }),
            category_id: 1,
            link: "",
        },
        { name: t("footerRec.luxuryCarMorocco"), category_id: 1, link: "" },
        { name: t("footerRec.cheapCarMorocco"), category_id: 1, link: "" },

        // Private Drivers (category_id: 2)
        {
            name: t("footerRec.privateDriverCity", {
                city: t("cities.marrakech"),
            }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.privateDriverCity", {
                city: t("cities.agadir"),
            }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.privateDriverCity", {
                city: t("cities.tangier"),
            }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.privateDriverCity", {
                city: t("cities.casablanca"),
            }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.privateDriverCity", { city: t("cities.fes") }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.privateDriverCity", { city: t("cities.rabat") }),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.airportTransferMorocco"),
            category_id: 2,
            link: "",
        },
        {
            name: t("footerRec.intercityDriversMorocco"),
            category_id: 2,
            link: "",
        },

        // Boats & Yachts (category_id: 3)
        {
            name: t("footerRec.boatRentalCity", {
                city: t("cities.marrakech"),
            }),
            category_id: 3,
            link: "",
        },
        {
            name: t("footerRec.boatRentalCity", { city: t("cities.agadir") }),
            category_id: 3,
            link: "",
        },
        {
            name: t("footerRec.boatRentalCity", { city: t("cities.tangier") }),
            category_id: 3,
            link: "",
        },
        {
            name: t("footerRec.boatRentalCity", {
                city: t("cities.casablanca"),
            }),
            category_id: 3,
            link: "",
        },
        {
            name: t("footerRec.boatRentalCity", { city: t("cities.fes") }),
            category_id: 3,
            link: "",
        },
        {
            name: t("footerRec.boatRentalCity", { city: t("cities.rabat") }),
            category_id: 3,
            link: "",
        },
        { name: t("footerRec.yachtCharterMorocco"), category_id: 3, link: "" },
        { name: t("footerRec.sunsetCruiseAgadir"), category_id: 3, link: "" },
        { name: t("footerRec.fishingBoatsMorocco"), category_id: 3, link: "" },
        { name: t("footerRec.partyBoatRentals"), category_id: 3, link: "" },

        // Things to Do (category_id: 4)
        { name: t("footerRec.camelRidesMorocco"), category_id: 4, link: "" },
        { name: t("footerRec.quadBikingMorocco"), category_id: 4, link: "" },
        { name: t("footerRec.surfingMorocco"), category_id: 4, link: "" },
        { name: t("footerRec.hikingMorocco"), category_id: 4, link: "" },
        { name: t("footerRec.culturalToursMorocco"), category_id: 4, link: "" },
        { name: t("footerRec.jetSkiBeachMorocco"), category_id: 4, link: "" },
    ];

    const activeTabLinks = () => {
        const links = services.filter(
            (service) => service.category_id === activeTab
        );

        return links.map((item, key) => (
            <a href={item.link ?? "#"} className="ctm-tabs__item" key={key}>
                {item.name}
            </a>
        ));
    };

    return (
        <section className={`footer-recommendation-container`}>
            <div className="section-head">
                <h2 className="section-title">
                    {t("footerRec.exploreMarhire")}
                </h2>
            </div>
            <div className="ctm-tabs">
                {tabs.map((tab) => (
                    <button
                        className={`ctm-tabs__btn ${
                            tab.id === activeTab && "ctm-tabs__btn--active"
                        }`}
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            <div className="ctm-tabs__content">{activeTabLinks()}</div>
        </section>
    );
};

export default FooterRecommendation;
