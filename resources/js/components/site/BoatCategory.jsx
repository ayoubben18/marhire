import HeroSection from "./HeroSection";
import Recommended from "./Recommended";
import WhyChooseUs from "./WhyChooseUs";
import CategoryWhy from "./CategoryWhy";
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
import FAQSectionCustom from "./FAQSectionCustom";
import FreeTexts from "./FreeTexts";

const BoatCategory = ({ city }) => {
    const features = [
        {
            icon: "https://marhire.com/images/icons/icon2.webp",
            title: "Captain Included on All Rentals",
            desc: "Every boat comes with a licensed skipper for your safety and comfort.",
        },
        {
            icon: "https://marhire.com/images/icons/icon10.webp",
            title: "Fuel, Crew & Snacks Included",
            desc: "No surprise fees — most experiences include essentials.",
        },
        {
            icon: "https://marhire.com/images/icons/icon5.webp",
            title: "Fishing, Sunset & Private Party Options",
            desc: "Choose a relaxing cruise or a high-energy group experience.",
        },
        {
            icon: "https://marhire.com/images/icons/icon3.webp",
            title: "Departure from Verified Marinas",
            desc: "Agadir, Casablanca, Tangier, and more..",
        },
        {
            icon: "https://marhire.com/images/icons/icon1.svg",
            title: "24/7 Booking Support on WhatsApp",
            desc: "Need help choosing? We assist instantly.",
        },
        {
            icon: "https://marhire.com/images/icons/icon9.webp",
            title: "Transparent Pricing",
            desc: "No extra taxes or fees after checkout.",
        },
    ];

    const cityFeatures = [
        {
            icon: "https://marhire.com/images/icons/icon2.webp",
            title: "Licensed Boats + Skipper Included",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon10.webp",
            title: "Fuel, Crew & Light Snacks Included in Most Packages",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon5.webp",
            title: `Private Charters - Sunset, Fishing, Parties or Sightseeing`,
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon1.svg",
            title: `Wide Fleet - From Luxury Yachts to Affordable Boats`,
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon9.webp",
            title: "24/7 WhatsApp Support for Booking & Help",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon3.webp",
            title: "Transparent Pricing - No Taxes or Fees After Checkout",
            desc: "",
        },
    ];

    const items = [
        {
            name: "Boat Rental in Agadir",
            listings: 60,
            image: "https://marhire.com/images/cities/agadir.jpg",
        },
        {
            name: "Boat Rental in Casablanca",
            listings: 40,
            image: "https://marhire.com/images/cities/casablanca.jpg",
        },
        {
            name: "Boat Rental in Tangier",
            listings: 30,
            image: "https://marhire.com/images/cities/tangier.jpg",
        },
        {
            name: "Boat Rental in Essaouira",
            listings: 30,
            image: "https://marhire.com/images/cities/essaouira.jpg",
        },
        {
            name: "Boat Rental in El Jadida",
            listings: 15,
            image: "https://marhire.com/images/cities/rabat.jpg",
        },
        {
            name: "Boat Rental in Dakhla",
            listings: 20,
            image: "https://marhire.com/images/cities/rabat.jpg",
        },
    ];

    const tabs = [
        { id: 1, name: "Luxury Yacht" },
        { id: 2, name: "Speedboats" },
        { id: 3, name: "Fishing Boats" },
        { id: 4, name: "Party Boats" },
        { id: 5, name: "Sunset Cruises" },
    ];

    const faqs = [
        {
            question: `Is the captain included in the boat rental?`,
            answer: `Yes. All boats listed on MarHire in ${city} include a licensed captain/skipper to operate the boat. You don't need a boat license.`,
        },
        {
            question: `What's included in the price?`,
            answer: `Most boat rentals include:
                    • Skipper
                    • Fuel
                    • Life jackets
                    • Light snacks & soft drinks (on select boats)
                    Check each listing for exact inclusions.`,
        },
        {
            question: `Can I cancel or modify my boat rental in ${city}?`,
            answer: `Yes, you can cancel for free up to 48 hours before the rental time. Inside 48h, cancellation fees may apply.`,
        },
        {
            question: `How many people can I bring on the boat?`,
            answer: `Each boat has a clearly listed capacity. You can filter by:
                • 2-4 people (romantic or small groups)
                • 6-8 people (family trips)
                • 10-15+ people (group tours or parties)`,
        },
        {
            question: `What types of boats are available in ${city}?`,
            answer: `We offer:
            • Luxury yachts
            • Speedboats
            • Fishing boats
            • Party boats
            • Wellness/sunset cruise vessels
            All vessels are verified and meet maritime safety standards.`,
        },
        {
            question: `Can I bring food or alcohol on board?`,
            answer: `Yes, on most private rentals. Some boats also offer catering or BYO options. Please check the “What's Included / Not Included” section or ask via WhatsApp.`,
        },
        {
            question: `Where do the boats depart from in ${city}?`,
            answer: `Departure points vary by boat but typically include:
            • City marina
            • Beachside docks
            • Private marina access
            Exact location will be shown after booking.`,
        },
        {
            question: `How far in advance should I book?`,
            answer: `We recommend booking at least 2 days in advance, especially for weekends. Same-day bookings may be possible—just contact our team on WhatsApp.`,
        },
    ];

    return (
        <>
            <HeroSection
                withBar={false}
                text={city ? `Boat Rental in ${city}` : `Boat Rental`}
                isFull={true}
                tab="boats"
            />
            <CategoryWhy categoryKey="boats" />
            {!city && (
                <>
                    <ExploreCategory
                        title="Best Boat Rentals in Morocco by City"
                        subtitle="Find available boats in Morocco's top coastal cities."
                        items={items}
                    />
                    <Recommended type="boats" classes="agency-listings" />
                </>
            )}
            <Recommended
                type="boats"
                tabs={tabs}
                city={city}
                title={
                    city
                        ? `Browse Boat Rentals in ${city} by Type`
                        : `Types of Boats & Experiences in Morocco`
                }
                subtitle={
                    city
                        ? `Choose the Perfect Experience - Yachts, Fishing Boats & More`
                        : `Choose your perfect experience on the water.`
                }
                classes="agency-listings"
            />
            {city && (
                <Recommended
                    type="boats"
                    city={city}
                    tabs={false}
                    title={`Best Boat Rental Deals in ${city} - Updated Daily`}
                    subtitle={`Featured Boat Listings in ${city} - Compare Prices & Services`}
                    classes="agency-listings"
                />
            )}
            <FreeTexts slug="category/boats" />
            {city && (
                <FAQSectionCustom
                    title={`Frequently Asked Questions - Boat Rental in ${city}`}
                    faqs={faqs}
                />
            )}
            <FooterRecommendation />
            <Footer />
        </>
    );
};

export default BoatCategory;
