import { useState } from "react";

const FooterRecommendation = () => {
    const [activeTab, setActiveTab] = useState(1);
    const tabs = [
        { id: 1, name: "Discover Morocco" },
        { id: 2, name: "Private Drivers" },
        { id: 3, name: "Boats & Yachts" },
        { id: 4, name: "Things to Do" },
    ];

    const services = [
        // Discover Morocco (category_id: 1)
        { name: "Car Rental in Marrakech", category_id: 1, link: "" },
        { name: "Car Rental in Agadir", category_id: 1, link: "" },
        { name: "Car Rental in Casablanca", category_id: 1, link: "" },
        { name: "Car Rental in Fes", category_id: 1, link: "" },
        { name: "Car Rental in Tangier", category_id: 1, link: "" },
        { name: "Car Rental in Rabat", category_id: 1, link: "" },
        { name: "Luxury Car Rental Morocco", category_id: 1, link: "" },
        { name: "Cheap Car Rental Morocco", category_id: 1, link: "" },

        // Private Drivers (category_id: 2)
        { name: "Private Driver Marrakech", category_id: 2, link: "" },
        { name: "Private Driver Agadir", category_id: 2, link: "" },
        { name: "Private Driver Tangier", category_id: 2, link: "" },
        { name: "Private Driver Casablanca", category_id: 2, link: "" },
        { name: "Private Driver Fes", category_id: 2, link: "" },
        { name: "Private Driver Rabat", category_id: 2, link: "" },
        { name: "Airport Transfer Morocco", category_id: 2, link: "" },
        { name: "Intercity Drivers Morocco", category_id: 2, link: "" },

        // Boats & Yachts (category_id: 3)
        { name: "Boat Rental Marrakech", category_id: 3, link: "" },
        { name: "Boat Rental Agadir", category_id: 3, link: "" },
        { name: "Boat Rental Tangier", category_id: 3, link: "" },
        { name: "Boat Rental Casablanca", category_id: 3, link: "" },
        { name: "Boat Rental Fes", category_id: 3, link: "" },
        { name: "Boat Rental Rabat", category_id: 3, link: "" },
        { name: "Yacht Charter Morocco", category_id: 3, link: "" },
        { name: "Sunset Cruise Agadir", category_id: 3, link: "" },
        { name: "Fishing Boats Morocco", category_id: 3, link: "" },
        { name: "Party Boat Rentals", category_id: 3, link: "" },

        // Things to Do (category_id: 4)
        { name: "Camel Rides in Morocco", category_id: 4, link: "" },
        { name: "Quad Biking in Morocco", category_id: 4, link: "" },
        { name: "Surfing in in Morocco", category_id: 4, link: "" },
        { name: "Hiking in Morocco", category_id: 4, link: "" },
        { name: "Cultural Tours in Morocco", category_id: 4, link: "" },
        {
            name: "Jet Ski & Beach Activities in Morocco",
            category_id: 4,
            link: "",
        },
    ];

    const activeTabLinks = () => {
        const links = services.filter(
            (service) => service.category_id === activeTab
        );

        return links.map((item, key) => (
            <a href={item.link ?? '#'} className="ctm-tabs__item" key={key}>
                {item.name}
            </a>
        ));
    };

    return (
        <section className={`footer-recommendation-container`}>
            <div className="section-head">
                <h2 className="section-title">Explore Marhire</h2>
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
