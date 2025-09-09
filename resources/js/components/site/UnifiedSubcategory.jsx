import React from "react";
import HeroSection from "./HeroSection";
import WhyChooseUs from "./WhyChooseUs";
import ListingsByCity from "./ListingsByCity";
import PopularDestinations from "./PopularDestinations";
import FreeTexts from "./FreeTexts";
import Footer from "./Footer";
import { 
    FaShieldAlt, 
    FaPlane, 
    FaHeadset, 
    FaDollarSign, 
    FaCar, 
    FaUsers, 
    FaGasPump, 
    FaParking,
    FaUserTie,
    FaMapMarkedAlt,
    FaClock,
    FaLanguage,
    FaAnchor,
    FaLifeRing,
    FaCompass,
    FaMountain,
    FaCamera,
    FaHiking,
    FaSun
} from "react-icons/fa";

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
            icon: <FaShieldAlt />,
            title: "Full Insurance Included",
            desc: "All rentals include insurance. Optional low-excess upgrades available.",
        },
        {
            icon: <FaPlane />,
            title: "Available at Major Airports",
            desc: "Pick up your rental directly from the airport in Marrakech, Agadir, Casablanca, and more.",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Customer Support",
            desc: "Local support team available on WhatsApp to assist you anytime.",
        },
        {
            icon: <FaDollarSign />,
            title: "Transparent Pricing",
            desc: "The price you see is the price you pay. No surprises on arrival.",
        },
    ];

    if (subcategorySlug === "dacia" || subcategorySlug === "audi") {
        return [
            {
                icon: <FaCar />,
                title: `Reliable ${subcategoryName} Vehicles`,
                desc: `${subcategoryName} models are known for their reliability and ability to handle Moroccan roads.`,
            },
            {
                icon: <FaUsers />,
                title: "Spacious and Practical",
                desc: "Enjoy ample space for passengers and luggage, perfect for families and road trips.",
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "suv" || subcategorySlug === "mpv") {
        return [
            {
                icon: <FaUsers />,
                title: "Extra Space and Comfort",
                desc: `${subcategoryName}s offer superior space for passengers and luggage.`,
            },
            {
                icon: <FaCar />,
                title: "Perfect for Family Trips",
                desc: "Ideal for families exploring Morocco's diverse terrain.",
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "sedan" || subcategorySlug === "hatchback") {
        return [
            {
                icon: <FaGasPump />,
                title: "Fuel Efficient Options",
                desc: `${subcategoryName}s offer excellent fuel economy for long distance travel.`,
            },
            {
                icon: <FaParking />,
                title: "Easy to Park and Maneuver",
                desc: "Perfect for navigating narrow streets in Moroccan medinas.",
            },
            ...baseFeatures,
        ];
    }

    return baseFeatures;
};

// Driver subcategory specific features
const buildDriverSubcategoryFeatures = (subcategoryName, subcategorySlug) => {
    const baseDriverFeatures = [
        {
            icon: <FaUserTie />,
            title: "Professional Licensed Drivers",
            desc: "All our drivers are licensed professionals with years of experience in Morocco.",
        },
        {
            icon: <FaMapMarkedAlt />,
            title: "Local Knowledge & Expertise",
            desc: "Our drivers know the best routes, hidden gems, and local customs to enhance your trip.",
        },
        {
            icon: <FaClock />,
            title: "Flexible Scheduling",
            desc: "Customize your itinerary with flexible pickup times and route adjustments.",
        },
        {
            icon: <FaLanguage />,
            title: "Multilingual Service",
            desc: "Drivers speak multiple languages including English, French, Arabic, and Berber.",
        },
    ];

    if (subcategorySlug === "suv") {
        return [
            {
                icon: <FaUsers />,
                title: "Spacious SUV Comfort",
                desc: "Travel in comfort with spacious SUVs perfect for families and groups up to 7 people.",
            },
            {
                icon: <FaCar />,
                title: "All-Terrain Capability",
                desc: "SUVs handle Morocco's diverse terrain from city streets to mountain roads with ease.",
            },
            ...baseDriverFeatures,
        ];
    }

    if (subcategorySlug === "sedan") {
        return [
            {
                icon: <FaCar />,
                title: "Executive Sedan Service",
                desc: "Professional transportation in comfortable sedans ideal for business and leisure travel.",
            },
            {
                icon: <FaGasPump />,
                title: "Fuel-Efficient Travel",
                desc: "Sedans offer excellent fuel economy for longer journeys across Morocco.",
            },
            ...baseDriverFeatures,
        ];
    }

    if (subcategorySlug === "van") {
        return [
            {
                icon: <FaUsers />,
                title: "Large Group Transportation",
                desc: "Vans accommodate large groups up to 15 passengers with ample luggage space.",
            },
            {
                icon: <FaCar />,
                title: "Perfect for Tours",
                desc: "Ideal for group tours, family reunions, and corporate transportation needs.",
            },
            ...baseDriverFeatures,
        ];
    }

    return baseDriverFeatures;
};

// Boat subcategory specific features
const buildBoatSubcategoryFeatures = (subcategoryName, subcategorySlug) => {
    const baseBoatFeatures = [
        {
            icon: <FaAnchor />,
            title: "Professional Crew Included",
            desc: "All boat rentals include experienced crew members for your safety and comfort.",
        },
        {
            icon: <FaLifeRing />,
            title: "Full Safety Equipment",
            desc: "Complete safety gear including life jackets, emergency equipment, and first aid kits.",
        },
        {
            icon: <FaCompass />,
            title: "Scenic Coastal Routes",
            desc: "Explore Morocco's beautiful coastline with guided routes to the best spots.",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Marine Support",
            desc: "Emergency marine assistance and support available at all times during your rental.",
        },
    ];

    if (subcategorySlug === "yacht") {
        return [
            {
                icon: <FaAnchor />,
                title: "Luxury Yacht Experience",
                desc: "Enjoy premium comfort with spacious yachts featuring modern amenities and elegant interiors.",
            },
            {
                icon: <FaUsers />,
                title: "Perfect for Groups",
                desc: "Yachts accommodate larger groups with multiple cabins and entertainment areas.",
            },
            ...baseBoatFeatures,
        ];
    }

    if (subcategorySlug === "speedboat") {
        return [
            {
                icon: <FaAnchor />,
                title: "High-Speed Adventures",
                desc: "Experience thrilling speedboat rides perfect for water sports and quick coastal tours.",
            },
            {
                icon: <FaSun />,
                title: "Perfect for Day Trips",
                desc: "Ideal for short excursions, fishing trips, and water sports activities.",
            },
            ...baseBoatFeatures,
        ];
    }

    if (subcategorySlug === "custom") {
        return [
            {
                icon: <FaAnchor />,
                title: "Customized Boat Experience",
                desc: "Tailor your boat rental experience with custom routes, duration, and activities.",
            },
            {
                icon: <FaCompass />,
                title: "Flexible Itineraries",
                desc: "Create your perfect marine adventure with flexible scheduling and destinations.",
            },
            ...baseBoatFeatures,
        ];
    }

    return baseBoatFeatures;
};

// Activity subcategory specific features
const buildActivitySubcategoryFeatures = (subcategoryName, subcategorySlug) => {
    const baseActivityFeatures = [
        {
            icon: <FaUserTie />,
            title: "Expert Local Guides",
            desc: "Professional guides with extensive knowledge of Morocco's culture, history, and landscapes.",
        },
        {
            icon: <FaShieldAlt />,
            title: "Safety First Approach",
            desc: "All activities include comprehensive safety briefings and professional-grade equipment.",
        },
        {
            icon: <FaCamera />,
            title: "Unforgettable Memories",
            desc: "Create lasting memories with unique experiences and stunning photo opportunities.",
        },
        {
            icon: <FaHeadset />,
            title: "24/7 Activity Support",
            desc: "Round-the-clock support for any questions or assistance during your adventure.",
        },
    ];

    if (subcategorySlug === "quad") {
        return [
            {
                icon: <FaMountain />,
                title: "Thrilling Quad Adventures",
                desc: "Experience the excitement of quad biking through Morocco's diverse terrains and landscapes.",
            },
            {
                icon: <FaSun />,
                title: "Scenic Desert Routes",
                desc: "Explore stunning desert landscapes and mountain trails with guided quad bike tours.",
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "desert") {
        return [
            {
                icon: <FaSun />,
                title: "Authentic Desert Experience",
                desc: "Immerse yourself in the magic of the Sahara with overnight camping and traditional Berber culture.",
            },
            {
                icon: <FaMountain />,
                title: "Stunning Desert Landscapes",
                desc: "Witness breathtaking sunrises and sunsets over the golden dunes of Morocco's desert.",
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "camel-ride") {
        return [
            {
                icon: <FaSun />,
                title: "Traditional Camel Trekking",
                desc: "Experience Morocco like ancient travelers with authentic camel rides through the desert.",
            },
            {
                icon: <FaMountain />,
                title: "Desert Sunset Views",
                desc: "Enjoy spectacular sunset views from camelback across the endless Sahara dunes.",
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "surf") {
        return [
            {
                icon: <FaSun />,
                title: "World-Class Surf Spots",
                desc: "Surf Morocco's renowned Atlantic coast breaks with perfect waves year-round.",
            },
            {
                icon: <FaHiking />,
                title: "Professional Surf Instruction",
                desc: "Learn from certified instructors at beginner-friendly beaches or tackle advanced breaks.",
            },
            ...baseActivityFeatures,
        ];
    }

    return baseActivityFeatures;
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
        
        if (meta.key === "drivers") {
            return (
                <WhyChooseUs
                    title={`Why Book a ${subcategoryName} Private Driver in ${city || "Morocco"}?`}
                    features={buildDriverSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase())}
                />
            );
        }
        
        if (meta.key === "boats") {
            return (
                <WhyChooseUs
                    title={`Why Rent a ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildBoatSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase())}
                />
            );
        }
        
        if (meta.key === "activities") {
            return (
                <WhyChooseUs
                    title={`Why Book ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildActivitySubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase())}
                />
            );
        }
        
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
                category={categorySlug}
                breadcrumbs={[
                    { name: 'Home', href: '' },
                    { name: (meta.key === 'cars' ? 'Car Rental' : (meta.key === 'drivers' ? 'Private Driver' : (meta.key === 'boats' ? 'Boat Rental' : 'Things To Do'))), href: `/category/${categorySlug}` },
                    ...(subcategorySlug ? [{ name: toTitle(subcategorySlug), href: `/category/${categorySlug}/subcategory/${subcategorySlug}` }] : []),
                    ...(city ? [{ name: city, href: `/category/${categorySlug}/subcategory/${subcategorySlug}/city/${city}` }] : [])
                ]}
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
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat", "Essaouira"]}
            />

            <FreeTexts slug={`category/${categorySlug}/subcategory/${subcategorySlug}`} />

            <Footer />
        </>
    );
};

export default UnifiedSubcategory;


