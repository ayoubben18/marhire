import HeroSection from "./HeroSection";
import Recommended from "./Recommended";
import WhyChooseUs from "./WhyChooseUs";
import FAQSection from "./FAQSection";
import Footer from "./Footer";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";
import { FaShuttleVan } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import FooterRecommendation from "./FooterRecommendation";
import ExploreCategory from "./ExploreCategory";
import { useEffect } from "react";
import FAQSectionCustom from "./FAQSectionCustom";
import FreeTexts from "./FreeTexts";
import { getLocalizedUrl } from "../../utils/localeManager";

const CarSubCategory = ({ subcategory, city }) => {
    // Capitalize subcategory for display
    const subcategoryName = subcategory ? subcategory.charAt(0).toUpperCase() + subcategory.slice(1) : '';
    
    // Dynamic features based on subcategory
    const getSubcategoryFeatures = () => {
        const baseFeatures = [
            {
                icon: "https://marhire.com/images/icons/icon10.webp",
                title: "Full Insurance Included",
                desc: "All rentals include insurance. Optional low-excess upgrades available.",
            },
            {
                icon: "https://marhire.com/images/icons/icon3.webp",
                title: "Available at Major Airports",
                desc: "Pick up your rental directly from the airport in Marrakech, Agadir, Casablanca, and more.",
            },
            {
                icon: "https://marhire.com/images/icons/icon1.svg",
                title: "24/7 Customer Support",
                desc: "Local support team available on WhatsApp to assist you anytime.",
            },
            {
                icon: "https://marhire.com/images/icons/icon9.webp",
                title: "Transparent Pricing",
                desc: "The price you see is the price you pay. No surprises on arrival.",
            },
        ];

        // Add specific features based on subcategory type
        if (subcategory === 'dacia' || subcategory === 'audi') {
            return [
                {
                    icon: "https://marhire.com/images/icons/icon2.webp",
                    title: `Reliable ${subcategoryName} Vehicles`,
                    desc: `${subcategoryName} models are known for their reliability and ability to handle Moroccan roads.`,
                },
                {
                    icon: "https://marhire.com/images/icons/icon5.webp",
                    title: "Spacious and Practical",
                    desc: "Enjoy ample space for passengers and luggage, perfect for families and road trips.",
                },
                ...baseFeatures
            ];
        } else if (subcategory === 'suv' || subcategory === 'mpv') {
            return [
                {
                    icon: "https://marhire.com/images/icons/icon5.webp",
                    title: "Extra Space and Comfort",
                    desc: `${subcategoryName}s offer superior space for passengers and luggage.`,
                },
                {
                    icon: "https://marhire.com/images/icons/icon2.webp",
                    title: "Perfect for Family Trips",
                    desc: "Ideal for families exploring Morocco's diverse terrain.",
                },
                ...baseFeatures
            ];
        } else if (subcategory === 'sedan' || subcategory === 'hatchback') {
            return [
                {
                    icon: "https://marhire.com/images/icons/icon2.webp",
                    title: "Fuel Efficient Options",
                    desc: `${subcategoryName}s offer excellent fuel economy for long distance travel.`,
                },
                {
                    icon: "https://marhire.com/images/icons/icon5.webp",
                    title: "Easy to Park and Maneuver",
                    desc: "Perfect for navigating narrow streets in Moroccan medinas.",
                },
                ...baseFeatures
            ];
        }

        return baseFeatures;
    };

    const cities = [
        { name: "Agadir", listings: 90 },
        { name: "Marrakech", listings: 120 },
        { name: "Casablanca", listings: 100 },
        { name: "Fes", listings: 70 },
        { name: "Tangier", listings: 80 },
        { name: "Rabat", listings: 40 },
        { name: "Essaouira", listings: 30 },
    ];

    const getHeroTitle = () => {
        if (city) {
            return `${subcategoryName} Car Rental in ${city}`;
        }
        return `${subcategoryName} Car Rental in Morocco`;
    };

    const getHeroDescription = () => {
        if (city) {
            return `Find the best deals on ${subcategoryName} car rentals in ${city}. Compare prices from trusted local agencies and book your perfect vehicle with instant confirmation.`;
        }
        
        // Custom descriptions for specific subcategories
        if (subcategory === 'dacia') {
            return "Rent the perfect vehicle for your Moroccan adventure. We offer the best prices on popular Dacia models, including the spacious Dacia Duster SUV and the reliable Dacia Logan sedan. Ideal for families, road trips, and exploring the diverse terrain of Morocco.";
        } else if (subcategory === 'audi') {
            return "Experience luxury and performance with Audi car rentals in Morocco. Choose from our premium selection of Audi vehicles perfect for business travel or special occasions.";
        } else if (subcategory === 'suv') {
            return "Rent a powerful SUV for your Moroccan adventure. Perfect for desert excursions, mountain drives, and family road trips with extra space and comfort.";
        } else if (subcategory === 'mpv') {
            return "Spacious MPV rentals ideal for large families or groups. Enjoy comfortable seating for up to 7 passengers with plenty of luggage space.";
        } else if (subcategory === 'sedan') {
            return "Classic sedan rentals offering comfort and fuel efficiency. Perfect for business travel and long-distance touring across Morocco.";
        } else if (subcategory === 'hatchback') {
            return "Compact and economical hatchback rentals. Easy to park, fuel-efficient, and perfect for city exploration and budget-conscious travelers.";
        }
        
        return `Discover the best ${subcategoryName} car rental deals in Morocco. Compare prices, read reviews, and book your ideal vehicle online with instant confirmation.`;
    };

    const getWhyChooseTitle = () => {
        if (city) {
            return `Why Choose a ${subcategoryName} for Your ${city} Trip?`;
        }
        return `Why Choose a ${subcategoryName} for Your Moroccan Road Trip?`;
    };

    const getBrowseSectionTitle = () => {
        if (city) {
            return `More ${subcategoryName} Rentals Near ${city}`;
        }
        return `Find ${subcategoryName} Rentals in Top Moroccan Cities`;
    };

    return (
        <>
            <HeroSection
                withBar={false}
                text={getHeroTitle()}
                subtitle={getHeroDescription()}
                isFull={true}
                tab="cars"
            />
            
            <WhyChooseUs
                title={getWhyChooseTitle()}
                features={getSubcategoryFeatures()}
            />
            
            {!city && (
                <ExploreCategory
                    title={getBrowseSectionTitle()}
                    subtitle={`Choose from hundreds of ${subcategoryName} rentals in Morocco's top destinations.`}
                    items={cities.map(c => ({
                        name: `${subcategoryName} in ${c.name}`,
                        listings: c.listings,
                        image: `https://marhire.com/images/cities/${c.name.toLowerCase()}.jpg`,
                        link: getLocalizedUrl(`/category/car-rental/subcategory/${subcategory}/city/${c.name.toLowerCase()}`)
                    }))}
                />
            )}
            
            <Recommended
                type="cars"
                classes={city ? "" : "bg-blue"}
                title={city ? 
                    `Available ${subcategoryName} Models in ${city}` : 
                    `Browse Our ${subcategoryName} Fleet in Morocco`}
                subtitle={city ? 
                    `Compare ${subcategoryName} rental prices and features in ${city}` : 
                    `Find the perfect ${subcategoryName} model for your needs`}
                subcategory={subcategory}
                city={city}
            />
            
            {city && (
                <Recommended
                    title={`Best ${subcategoryName} Rental Deals in ${city}`}
                    subtitle={`Featured ${subcategoryName} listings with special offers`}
                    type="cars"
                    tabs={false}
                    classes="bg-green"
                    subcategory={subcategory}
                    city={city}
                />
            )}
            
            <FreeTexts slug={`category/car-rental/subcategory/${subcategory}`} />
            
            {city && (
                <FAQSectionCustom
                    title={`Frequently Asked Questions - ${subcategoryName} Rental in ${city}`}
                    faqs={[
                        {
                            question: `Can I rent a ${subcategoryName} in ${city} without a deposit?`,
                            answer: `Yes, many of our ${subcategoryName} models come with a "No Deposit" policy in ${city}, which means you can rent without an upfront security payment. Deposit requirements, if any, are clearly stated on each listing.`,
                        },
                        {
                            question: `Where can I pick up my ${subcategoryName} rental in ${city}?`,
                            answer: `We offer free delivery to ${city} Airport, hotels, riads, or any address within the city. You can select your preferred pick-up location during the booking process.`,
                        },
                        {
                            question: `What documents do I need to rent a ${subcategoryName} in ${city}?`,
                            answer: `You'll need: A valid driver's license (original), Your passport, An international driving permit (if your license is not in French, Arabic, or English), and a credit/debit card if a deposit is required.`,
                        },
                        {
                            question: `Are there mileage restrictions on ${subcategoryName} rentals?`,
                            answer: `Most of our ${subcategoryName} rentals come with unlimited kilometers, allowing you to explore Morocco freely. Any exceptions will be clearly displayed in the listing details.`,
                        },
                    ]}
                />
            )}
            
            <FooterRecommendation />
            <Footer />
        </>
    );
};

export default CarSubCategory;