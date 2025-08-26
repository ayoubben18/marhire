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

const ThingsToDoCategory = ({ city }) => {
    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Local & Authentic Experiences",
            desc: "Curated tours run by real Moroccans, not mass-market operators.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Multilingual Guides",
            desc: "Most experiences available in English, French & Arabic.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Hotel Pickup Included",
            desc: "No need to worry about transportation - we'll come to you.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Free Cancellation Up to 48h Before",
            desc: "Plans change? Cancel easily at no cost.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: "Private & Family-Friendly Options",
            desc: "Tours available for couples, small groups, and children.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Transparent Pricing",
            desc: "No extra booking or tourist fees. What you see is what you pay.",
        },
    ];

    const cityFeatures = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Trusted Local Guides - Real people, not tourist traps",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Multilingual Tours - English, French & Arabic available",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: `Hotel Pickup Included in Most Activities`,
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: `Free Cancellation - Up to 48h before your experience`,
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Family-Friendly, Group & Private Options",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "24/7 Booking Support on WhatsApp",
            desc: "",
        },
    ];

    const items = [
        {
            name: "Things To Do in Marrakech",
            listings: 100,
            image: "https://marhire.bytech.ma/images/cities/marrakech.jpg",
        },
        {
            name: "Things To Do in Agadir",
            listings: 80,
            image: "https://marhire.bytech.ma/images/cities/agadir.jpg",
        },
        {
            name: "Things To Do in Casablanca",
            listings: 70,
            image: "https://marhire.bytech.ma/images/cities/casablanca.jpg",
        },
        {
            name: "Things To Do in Fez",
            listings: 60,
            image: "https://marhire.bytech.ma/images/cities/fez.jpg",
        },
        {
            name: "Things To Do in Tangier",
            listings: 50,
            image: "https://marhire.bytech.ma/images/cities/tangier.jpg",
        },
        {
            name: "Things To Do in Essaouira",
            listings: 30,
            image: "https://marhire.bytech.ma/images/cities/essaouira.jpg",
        },
    ];

    const tabs = [
        { id: 1, name: "Camel Rides" },
        { id: 2, name: "Quad & Buggy Tours" },
        { id: 3, name: "Cultural Tours" },
        { id: 4, name: "Surf Lessons" },
        { id: 5, name: "Cooking Classes" },
        { id: 6, name: "Wellness & Retreats" },
        { id: 7, name: "Water Sports & Boat Trips" },
    ];

    const faqs = [
        {
            question: `Are activities in ${city} led by licensed guides?`,
            answer: `Yes. All our partners are local, verified providers, and many guides are officially licensed. We vet each experience for safety, authenticity, and quality.`,
        },
        {
            question: `Is hotel pickup included in activity bookings?`,
            answer: `Most activities offer free pickup from your hotel, riad, or a central meeting point in ${city}. You’ll see exact pickup info before booking.`,
        },
        {
            question: `Can I cancel my activity booking?`,
            answer: `Yes. All activities on MarHire include free cancellation up to 48 hours before the scheduled time. Cancellations within 48h may incur fees.`,
        },
        {
            question: `Are there private experiences available in ${city}?`,
            answer: `Yes! You can filter listings to show private tours only, or mention it when contacting us via WhatsApp.`,
        },
        {
            question: `How many people can join an activity?`,
            answer: `It varies. Most group activities allow 4-12 people.
                    Private experiences can be arranged for 1 to 20+ guests — contact us for custom group packages.`,
        },
        {
            question: `Are children allowed in the experiences?`,
            answer: `Yes. Many activities are family-friendly and clearly marked as such. If unsure, contact us and we’ll guide you to the best option.`,
        },
        {
            question: `What languages are the tours offered in?`,
            answer: `Most activities are offered in English, French, and Arabic. Some may also be available in Spanish or German upon request.`,
        },
        {
            question: `Do I need to bring anything?`,
            answer: `For most experiences, we provide everything. However, for outdoor or beach activities, we recommend:
                • Comfortable shoes
                • Sunscreen
                • ID or passport copy
                Check the listing for any additional notes.`,
        },
    ];

    return (
        <>
            <HeroSection
                withBar={false}
                text="Things To Do"
                text={city ? `Things To Do in ${city}` : `Things To Do`}
                isFull={true}
                tab="activity"
            />
            <CategoryWhy categoryKey="activities" />
            {!city && (
                <>
                    <ExploreCategory
                        title="Top Things to Do in Morocco by City"
                        subtitle="Find activities in Morocco's most exciting destinations."
                        items={items}
                    />
                    <Recommended type="activities" classes="agency-listings" />
                </>
            )}
            <Recommended
                type="activities"
                classes="agency-listings"
                tabs={tabs}
                city={city}
                title={
                    city
                        ? `Browse Top Activities in ${city} by Type`
                        : `Browse Activities in Morocco by Type`
                }
                subtitle={
                    city
                        ? `Find the Right Experience - Adventure, Culture, Food & More`
                        : `Choose from the most popular experience categories.`
                }
            />
            {city && (
                <Recommended
                    type="activities"
                    city={city}
                    tabs={false}
                    title={`Best Experiences in ${city} - Updated Daily`}
                    subtitle={`Featured Tours & Activities in ${city} - Compare Prices & Highlights`}
                    classes="agency-listings"
                />
            )}
            <FreeTexts slug="category/things-to-do" />
            {city && (
                <FAQSectionCustom
                    title={`Frequently Asked Questions - Things to Do in ${city}`}
                    faqs={faqs}
                />
            )}
            <FooterRecommendation />
            <Footer />
        </>
    );
};

export default ThingsToDoCategory;
