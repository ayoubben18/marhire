import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
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

// Dynamic subcategory lookup function
const getSubcategoryId = (subcategories, categoryId, subcategorySlug) => {
    if (!subcategorySlug || !subcategories || subcategories.length === 0) return null;
    
    const slug = String(subcategorySlug).toLowerCase();
    
    // Find subcategory that matches the slug and category
    const subcategory = subcategories.find(sub => {
        // Generate slug from option name
        const generatedSlug = sub.option?.toLowerCase().replace(/\s+/g, '-') || '';
        return generatedSlug === slug && sub.category_id === categoryId;
    });
    
    return subcategory?.id || null;
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
const buildCarSubcategoryFeatures = (subcategoryName, subcategorySlug, t) => {
    const baseFeatures = [
        {
            icon: <FaShieldAlt />,
            title: t("features.cars.fullInsurance.title", "Full Insurance Included"),
            desc: t("features.cars.fullInsurance.desc", "All rentals include insurance. Optional low-excess upgrades available."),
        },
        {
            icon: <FaPlane />,
            title: t("features.cars.airportPickup.title", "Available at Major Airports"),
            desc: t("features.cars.airportPickup.desc", "Pick up your rental directly from the airport in Marrakech, Agadir, Casablanca, and more."),
        },
        {
            icon: <FaHeadset />,
            title: t("features.cars.customerSupport.title", "24/7 Customer Support"),
            desc: t("features.cars.customerSupport.desc", "Local support team available on WhatsApp to assist you anytime."),
        },
        {
            icon: <FaDollarSign />,
            title: t("features.cars.transparentPricing.title", "Transparent Pricing"),
            desc: t("features.cars.transparentPricing.desc", "The price you see is the price you pay. No surprises on arrival."),
        },
    ];

    if (subcategorySlug === "dacia" || subcategorySlug === "audi") {
        return [
            {
                icon: <FaCar />,
                title: t("features.cars.reliableVehicles.title", "Reliable {{subcategoryName}} Vehicles", { subcategoryName }),
                desc: t("features.cars.reliableVehicles.desc", "{{subcategoryName}} models are known for their reliability and ability to handle Moroccan roads.", { subcategoryName }),
            },
            {
                icon: <FaUsers />,
                title: t("features.cars.spaciousPractical.title", "Spacious and Practical"),
                desc: t("features.cars.spaciousPractical.desc", "Enjoy ample space for passengers and luggage, perfect for families and road trips."),
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "suv" || subcategorySlug === "mpv") {
        return [
            {
                icon: <FaUsers />,
                title: t("features.cars.extraSpaceComfort.title", "Extra Space and Comfort"),
                desc: t("features.cars.extraSpaceComfort.desc", "{{subcategoryName}}s offer superior space for passengers and luggage.", { subcategoryName }),
            },
            {
                icon: <FaCar />,
                title: t("features.cars.familyTrips.title", "Perfect for Family Trips"),
                desc: t("features.cars.familyTrips.desc", "Ideal for families exploring Morocco's diverse terrain."),
            },
            ...baseFeatures,
        ];
    }

    if (subcategorySlug === "sedan" || subcategorySlug === "hatchback") {
        return [
            {
                icon: <FaGasPump />,
                title: t("features.cars.fuelEfficient.title", "Fuel Efficient Options"),
                desc: t("features.cars.fuelEfficient.desc", "{{subcategoryName}}s offer excellent fuel economy for long distance travel.", { subcategoryName }),
            },
            {
                icon: <FaParking />,
                title: t("features.cars.easyParking.title", "Easy to Park and Maneuver"),
                desc: t("features.cars.easyParking.desc", "Perfect for navigating narrow streets in Moroccan medinas."),
            },
            ...baseFeatures,
        ];
    }

    return baseFeatures;
};

// Driver subcategory specific features
const buildDriverSubcategoryFeatures = (subcategoryName, subcategorySlug, t) => {
    const baseDriverFeatures = [
        {
            icon: <FaUserTie />,
            title: t("features.drivers.professional.title", "Professional Licensed Drivers"),
            desc: t("features.drivers.professional.desc", "All our drivers are licensed professionals with years of experience in Morocco."),
        },
        {
            icon: <FaMapMarkedAlt />,
            title: t("features.drivers.localKnowledge.title", "Local Knowledge & Expertise"),
            desc: t("features.drivers.localKnowledge.desc", "Our drivers know the best routes, hidden gems, and local customs to enhance your trip."),
        },
        {
            icon: <FaClock />,
            title: t("features.drivers.flexibleScheduling.title", "Flexible Scheduling"),
            desc: t("features.drivers.flexibleScheduling.desc", "Customize your itinerary with flexible pickup times and route adjustments."),
        },
        {
            icon: <FaLanguage />,
            title: t("features.drivers.multilingual.title", "Multilingual Service"),
            desc: t("features.drivers.multilingual.desc", "Drivers speak multiple languages including English, French, Arabic, and Berber."),
        },
    ];

    if (subcategorySlug === "suv") {
        return [
            {
                icon: <FaUsers />,
                title: t("features.drivers.spaciousSuv.title", "Spacious SUV Comfort"),
                desc: t("features.drivers.spaciousSuv.desc", "Travel in comfort with spacious SUVs perfect for families and groups up to 7 people."),
            },
            {
                icon: <FaCar />,
                title: t("features.drivers.allTerrain.title", "All-Terrain Capability"),
                desc: t("features.drivers.allTerrain.desc", "SUVs handle Morocco's diverse terrain from city streets to mountain roads with ease."),
            },
            ...baseDriverFeatures,
        ];
    }

    if (subcategorySlug === "sedan") {
        return [
            {
                icon: <FaCar />,
                title: t("features.drivers.executiveSedan.title", "Executive Sedan Service"),
                desc: t("features.drivers.executiveSedan.desc", "Professional transportation in comfortable sedans ideal for business and leisure travel."),
            },
            {
                icon: <FaGasPump />,
                title: t("features.drivers.fuelEfficientTravel.title", "Fuel-Efficient Travel"),
                desc: t("features.drivers.fuelEfficientTravel.desc", "Sedans offer excellent fuel economy for longer journeys across Morocco."),
            },
            ...baseDriverFeatures,
        ];
    }

    if (subcategorySlug === "van") {
        return [
            {
                icon: <FaUsers />,
                title: t("features.drivers.largeGroupTransport.title", "Large Group Transportation"),
                desc: t("features.drivers.largeGroupTransport.desc", "Vans accommodate large groups up to 15 passengers with ample luggage space."),
            },
            {
                icon: <FaCar />,
                title: t("features.drivers.perfectForTours.title", "Perfect for Tours"),
                desc: t("features.drivers.perfectForTours.desc", "Ideal for group tours, family reunions, and corporate transportation needs."),
            },
            ...baseDriverFeatures,
        ];
    }

    return baseDriverFeatures;
};

// Boat subcategory specific features
const buildBoatSubcategoryFeatures = (subcategoryName, subcategorySlug, t) => {
    const baseBoatFeatures = [
        {
            icon: <FaAnchor />,
            title: t("features.boats.professionalCrew.title", "Professional Crew Included"),
            desc: t("features.boats.professionalCrew.desc", "All boat rentals include experienced crew members for your safety and comfort."),
        },
        {
            icon: <FaLifeRing />,
            title: t("features.boats.safetyEquipment.title", "Full Safety Equipment"),
            desc: t("features.boats.safetyEquipment.desc", "Complete safety gear including life jackets, emergency equipment, and first aid kits."),
        },
        {
            icon: <FaCompass />,
            title: t("features.boats.scenicRoutes.title", "Scenic Coastal Routes"),
            desc: t("features.boats.scenicRoutes.desc", "Explore Morocco's beautiful coastline with guided routes to the best spots."),
        },
        {
            icon: <FaHeadset />,
            title: t("features.boats.marineSupport.title", "24/7 Marine Support"),
            desc: t("features.boats.marineSupport.desc", "Emergency marine assistance and support available at all times during your rental."),
        },
    ];

    if (subcategorySlug === "yacht") {
        return [
            {
                icon: <FaAnchor />,
                title: t("features.boats.luxuryYacht.title", "Luxury Yacht Experience"),
                desc: t("features.boats.luxuryYacht.desc", "Enjoy premium comfort with spacious yachts featuring modern amenities and elegant interiors."),
            },
            {
                icon: <FaUsers />,
                title: t("features.boats.perfectForGroups.title", "Perfect for Groups"),
                desc: t("features.boats.perfectForGroups.desc", "Yachts accommodate larger groups with multiple cabins and entertainment areas."),
            },
            ...baseBoatFeatures,
        ];
    }

    if (subcategorySlug === "speedboat") {
        return [
            {
                icon: <FaAnchor />,
                title: t("features.boats.highSpeedAdventures.title", "High-Speed Adventures"),
                desc: t("features.boats.highSpeedAdventures.desc", "Experience thrilling speedboat rides perfect for water sports and quick coastal tours."),
            },
            {
                icon: <FaSun />,
                title: t("features.boats.perfectForDayTrips.title", "Perfect for Day Trips"),
                desc: t("features.boats.perfectForDayTrips.desc", "Ideal for short excursions, fishing trips, and water sports activities."),
            },
            ...baseBoatFeatures,
        ];
    }

    if (subcategorySlug === "custom") {
        return [
            {
                icon: <FaAnchor />,
                title: t("features.boats.customizedExperience.title", "Customized Boat Experience"),
                desc: t("features.boats.customizedExperience.desc", "Tailor your boat rental experience with custom routes, duration, and activities."),
            },
            {
                icon: <FaCompass />,
                title: t("features.boats.flexibleItineraries.title", "Flexible Itineraries"),
                desc: t("features.boats.flexibleItineraries.desc", "Create your perfect marine adventure with flexible scheduling and destinations."),
            },
            ...baseBoatFeatures,
        ];
    }

    return baseBoatFeatures;
};

// Activity subcategory specific features
const buildActivitySubcategoryFeatures = (subcategoryName, subcategorySlug, t) => {
    const baseActivityFeatures = [
        {
            icon: <FaUserTie />,
            title: t("features.activities.expertGuides.title", "Expert Local Guides"),
            desc: t("features.activities.expertGuides.desc", "Professional guides with extensive knowledge of Morocco's culture, history, and landscapes."),
        },
        {
            icon: <FaShieldAlt />,
            title: t("features.activities.safetyFirst.title", "Safety First Approach"),
            desc: t("features.activities.safetyFirst.desc", "All activities include comprehensive safety briefings and professional-grade equipment."),
        },
        {
            icon: <FaCamera />,
            title: t("features.activities.unforgettableMemories.title", "Unforgettable Memories"),
            desc: t("features.activities.unforgettableMemories.desc", "Create lasting memories with unique experiences and stunning photo opportunities."),
        },
        {
            icon: <FaHeadset />,
            title: t("features.activities.activitySupport.title", "24/7 Activity Support"),
            desc: t("features.activities.activitySupport.desc", "Round-the-clock support for any questions or assistance during your adventure."),
        },
    ];

    if (subcategorySlug === "quad") {
        return [
            {
                icon: <FaMountain />,
                title: t("features.activities.thrillingQuad.title", "Thrilling Quad Adventures"),
                desc: t("features.activities.thrillingQuad.desc", "Experience the excitement of quad biking through Morocco's diverse terrains and landscapes."),
            },
            {
                icon: <FaSun />,
                title: t("features.activities.scenicDesertRoutes.title", "Scenic Desert Routes"),
                desc: t("features.activities.scenicDesertRoutes.desc", "Explore stunning desert landscapes and mountain trails with guided quad bike tours."),
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "desert") {
        return [
            {
                icon: <FaSun />,
                title: t("features.activities.authenticDesert.title", "Authentic Desert Experience"),
                desc: t("features.activities.authenticDesert.desc", "Immerse yourself in the magic of the Sahara with overnight camping and traditional Berber culture."),
            },
            {
                icon: <FaMountain />,
                title: t("features.activities.stunningDesertLandscapes.title", "Stunning Desert Landscapes"),
                desc: t("features.activities.stunningDesertLandscapes.desc", "Witness breathtaking sunrises and sunsets over the golden dunes of Morocco's desert."),
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "camel-ride") {
        return [
            {
                icon: <FaSun />,
                title: t("features.activities.traditionalCamel.title", "Traditional Camel Trekking"),
                desc: t("features.activities.traditionalCamel.desc", "Experience Morocco like ancient travelers with authentic camel rides through the desert."),
            },
            {
                icon: <FaMountain />,
                title: t("features.activities.desertSunsetViews.title", "Desert Sunset Views"),
                desc: t("features.activities.desertSunsetViews.desc", "Enjoy spectacular sunset views from camelback across the endless Sahara dunes."),
            },
            ...baseActivityFeatures,
        ];
    }

    if (subcategorySlug === "surf") {
        return [
            {
                icon: <FaSun />,
                title: t("features.activities.worldClassSurf.title", "World-Class Surf Spots"),
                desc: t("features.activities.worldClassSurf.desc", "Surf Morocco's renowned Atlantic coast breaks with perfect waves year-round."),
            },
            {
                icon: <FaHiking />,
                title: t("features.activities.professionalSurfInstruction.title", "Professional Surf Instruction"),
                desc: t("features.activities.professionalSurfInstruction.desc", "Learn from certified instructors at beginner-friendly beaches or tackle advanced breaks."),
            },
            ...baseActivityFeatures,
        ];
    }

    return baseActivityFeatures;
};

const UnifiedSubcategory = ({ categorySlug, subcategorySlug, city }) => {
    const { t } = useTranslation();
    const [subcategories, setSubcategories] = useState([]);
    const [subcategoryId, setSubcategoryId] = useState(null);
    
    const meta = getCategoryMeta(categorySlug);
    const cityId = city ? getCityId(city) : null;
    const subcategoryName = toTitle(subcategorySlug);
    
    // Fetch subcategories from API
    useEffect(() => {
        axios.get('/api/get_subcategories_api')
            .then(response => {
                const allSubcategories = response.data.subcategories || [];
                setSubcategories(allSubcategories);
                
                // Find the matching subcategory ID
                const id = getSubcategoryId(allSubcategories, meta.id, subcategorySlug);
                setSubcategoryId(id);
            })
            .catch(error => {
                console.error('Error fetching subcategories:', error);
            });
    }, [categorySlug, subcategorySlug, meta.id]);

    const defaultCityTabs = [
        "Agadir",
        "Marrakech",
        "Casablanca",
        "Fez",
        "Tangier",
        "Rabat",
    ];

    const buildHeroText = () => {
        const place = city || t("common.morocco", "Morocco");
        switch (meta.key) {
            case "cars":
                return t("hero.subcategory.carRental", "{{subcategoryName}} Car Rental in {{place}}", { subcategoryName, place });
            case "drivers":
                return t("hero.subcategory.privateDriver", "{{subcategoryName}} with Private Driver in {{place}}", { subcategoryName, place });
            case "boats":
                return t("hero.subcategory.boatRental", "{{subcategoryName}} Boat Rental in {{place}}", { subcategoryName, place });
            case "activities":
                return t("hero.subcategory.activity", "{{subcategoryName}} in {{place}}", { subcategoryName, place });
            default:
                return t("hero.subcategory.activity", "{{subcategoryName}} in {{place}}", { subcategoryName, place });
        }
    };

    const buildWhy = () => {
        if (meta.key === "cars") {
            return (
                <WhyChooseUs
                    title={`Why Rent a ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildCarSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase(), t)}
                />
            );
        }
        
        if (meta.key === "drivers") {
            return (
                <WhyChooseUs
                    title={`Why Book a ${subcategoryName} Private Driver in ${city || "Morocco"}?`}
                    features={buildDriverSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase(), t)}
                />
            );
        }
        
        if (meta.key === "boats") {
            return (
                <WhyChooseUs
                    title={`Why Rent a ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildBoatSubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase(), t)}
                />
            );
        }
        
        if (meta.key === "activities") {
            return (
                <WhyChooseUs
                    title={`Why Book ${subcategoryName} in ${city || "Morocco"}?`}
                    features={buildActivitySubcategoryFeatures(subcategoryName, (subcategorySlug || "").toLowerCase(), t)}
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
                cities={city ? [city] : defaultCityTabs}
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


