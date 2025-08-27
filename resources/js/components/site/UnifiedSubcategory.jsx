import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import ListingsByCity from "./ListingsByCity";
import PopularDestinations from "./PopularDestinations";
import FreeTexts from "./FreeTexts";
import Footer from "./Footer";

// Map category slug to internal keys and default tabs used by HeroSection
const getCategoryMeta = (categorySlug) => {
    switch (categorySlug) {
        case "car-rental":
            return { key: "cars", tab: "cars", id: 2 };
        case "private-driver":
            return { key: "drivers", tab: "drivers", id: 3 };
        case "boats":
            return { key: "boats", tab: "boats", id: 4 };
        case "things-to-do":
            return { key: "activities", tab: "activity", id: 5 };
        default:
            return { key: "cars", tab: "cars", id: 2 };
    }
};

// City name to ID mapping (case-insensitive) for search defaults
const getCityId = (cityName) => {
    if (!cityName) return null;
    const cityMap = {
        "marrakech": 5,
        "agadir": 3,
        "casablanca": 2,
        "fez": 6,
        "tangier": 7,
        "rabat": 4,
        "essaouira": 9,
        "tetouan": 8
    };
    return cityMap[cityName.toLowerCase()] || null;
};

// Known subcategory ID mappings by category
const CAR_TYPE_IDS = { suv: 59, hatchback: 60, mpv: 61, sedan: null };
const CAR_BRAND_IDS = { dacia: 52, audi: 54 };

const DRIVER_TYPE_IDS = { suv: 72, sedan: 73, van: 74 };

const BOAT_TYPE_IDS = { yacht: 55, speedboat: 56, custom: 67 };

const ACTIVITY_TYPE_IDS = { quad: 57, desert: 58, "camel-ride": 78, surf: 79 };

const getSubcategoryId = (categoryKey, subcategorySlug) => {
    if (!subcategorySlug) return null;
    const slug = String(subcategorySlug).toLowerCase();
    if (categoryKey === "cars") {
        if (slug in CAR_BRAND_IDS) return CAR_BRAND_IDS[slug];
        if (slug in CAR_TYPE_IDS) return CAR_TYPE_IDS[slug];
        return null;
    }
    if (categoryKey === "drivers") {
        return DRIVER_TYPE_IDS[slug] ?? null;
    }
    if (categoryKey === "boats") {
        return BOAT_TYPE_IDS[slug] ?? null;
    }
    if (categoryKey === "activities") {
        return ACTIVITY_TYPE_IDS[slug] ?? null;
    }
    return null;
};

// Build a presentable name from slug (e.g. camel-ride -> Camel Ride)
const toTitle = (slug) => {
    if (!slug) return "";
    return slug
        .split("-")
        .map((s) => (s.length ? s[0].toUpperCase() + s.slice(1) : s))
        .join(" ");
};

// Car subcategory specific features (reused from existing subcategory logic)
const buildCarSubcategoryFeatures = (subcategoryName, subcategorySlug) => {
    const baseFeatures = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Full Insurance Included",
            desc: "All rentals include insurance. Optional low-excess upgrades available.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Available at Major Airports",
            desc: "Pick up your rental directly from the airport in Marrakech, Agadir, Casablanca, and more.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: "24/7 Customer Support",
            desc: "Local support team available on WhatsApp to assist you anytime.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Transparent Pricing",
            desc: "The price you see is the price you pay. No surprises on arrival.",
        },
    ];

    if (subcategorySlug === "dacia" || subcategorySlug === "audi") {
        return [
            {
                icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
                title: `Reliable ${subcategoryName} Vehicles`,
                desc: `${subcategoryName} models are known for their reliability and ability to handle Moroccan roads.`,
            },
            {
                icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
                title: "Spacious and Practical",
                desc: "Enjoy ample space for passengers and luggage, perfect for families and road trips.",
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "suv" || subcategorySlug === "mpv") {
        return [
            {
                icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
                title: "Extra Space and Comfort",
                desc: `${subcategoryName}s offer superior space for passengers and luggage.`,
            },
            {
                icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
                title: "Perfect for Family Trips",
                desc: "Ideal for families exploring Morocco's diverse terrain.",
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "sedan" || subcategorySlug === "hatchback") {
        return [
            {
                icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
                title: "Fuel Efficient Options",
                desc: `${subcategoryName}s offer excellent fuel economy for long distance travel.`,
            },
            {
                icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
                title: "Easy to Park and Maneuver",
                desc: "Perfect for navigating narrow streets in Moroccan medinas.",
            },
            ...baseFeatures,
        ];
    }

    return baseFeatures;
};

const UnifiedSubcategory = ({ categorySlug, subcategorySlug, city }) => {
    const meta = getCategoryMeta(categorySlug);
    const cityId = city ? getCityId(city) : null;
    const subcategoryId = getSubcategoryId(meta.key, subcategorySlug);
    const subcategoryName = toTitle(subcategorySlug);

    const defaultCityTabs = [
        "Agadir",
        "Marrakech",
        "Casablanca",
        "Fez",
        "Tangier",
        "Rabat",
    ];

    const buildHeroText = () => {
        const place = city || "Morocco";
        switch (meta.key) {
            case "cars":
                return `${subcategoryName} Car Rental in ${place}`;
            case "drivers":
                return `${subcategoryName} with Private Driver in ${place}`;
            case "boats":
                return `${subcategoryName} Boat Rental in ${place}`;
            case "activities":
                return `${subcategoryName} in ${place}`;
            default:
                return `${subcategoryName} in ${place}`;
        }
    };

    const buildWhy = () => {
        if (meta.key === "cars") {
            return (
                <WhyChooseUs
                    title={`Why Rent a ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildCarSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase())}
                />
            );
        }
        // For non-car categories, reuse generic category reasons could be added here.
        return null;
    };

    return (
        <>
            <HeroSection
                withBar={false}
                text={buildHeroText()}
                subtitle={undefined}
                isFull={true}
                tab={meta.tab}
                city={city}
                cityId={cityId}
            />

            {buildWhy()}

            <ListingsByCity
                title={city ? `Available ${subcategoryName} in ${city}` : `Find ${subcategoryName} Rentals in Top Moroccan Cities`}
                categories={meta.id}
                subcategories={subcategoryId ? [subcategoryId] : []}
                cities={defaultCityTabs}
                initialCity={city || defaultCityTabs[0]}
                perPage={12}
            />

            <PopularDestinations
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat"]}
            />

            <FreeTexts slug={`category/${categorySlug}/subcategory/${subcategorySlug}`} />

            <Footer />
        </>
    );
};

export default UnifiedSubcategory;


