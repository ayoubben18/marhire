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

const PrivateCategory = ({ city }) => {
    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Professional Chauffeurs",
            desc: "Experienced, licensed drivers with local expertise.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Multilingual Service",
            desc: "Most drivers speak English, French, and Arabic.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Hotel & Airport Pickup",
            desc: "Door-to-door comfort in all major Moroccan cities.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: "24/7 Support on WhatsApp",
            desc: "We stay connected before, during, and after your journey.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Clean & Comfortable Vehicles",
            desc: "All cars are air-conditioned and professionally maintained.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Fixed Rates - No Hidden Fees",
            desc: "What you see is what you pay — guaranteed.",
        },
    ];
    const cityFeatures = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Licensed, Experienced Drivers",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "English, French & Arabic Spoken",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Sedans, SUVs & MPVs - Clean & A/C",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: `Free Airport or Hotel Pickup in ${city}`,
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Fixed Transparent Pricing - No Surprises",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: `24/7 WhatsApp Support - Local Experts in ${city}`,
            desc: "",
        },
    ];

    const items = [
        {
            name: "Private Driver in Marrakech",
            listings: 100,
            image: "https://marhire.bytech.ma/images/cities/marrakech.jpg",
        },
        {
            name: "Private Driver in Agadir",
            listings: 80,
            image: "https://marhire.bytech.ma/images/cities/agadir.jpg",
        },
        {
            name: "Private Driver in Casablanca",
            listings: 120,
            image: "https://marhire.bytech.ma/images/cities/casablanca.jpg",
        },
        {
            name: "Private Driver in Fez",
            listings: 70,
            image: "https://marhire.bytech.ma/images/cities/fez.jpg",
        },
        {
            name: "Private Driver in Tangier",
            listings: 60,
            image: "https://marhire.bytech.ma/images/cities/tangier.jpg",
        },
        {
            name: "Private Driver in Rabat",
            listings: 50,
            image: "https://marhire.bytech.ma/images/cities/rabat.jpg",
        },
    ];

    const tabs = [
        { id: 1, name: "Airport Transfers" },
        { id: 2, name: "Intercity Transfers" },
    ];

    const faqs = [
        {
            question: `What is included when I book a private driver in ${city}?`,
            answer: `Each MarHire private driver booking includes:
                    • A licensed professional driver
                    • A clean, air-conditioned vehicle (sedan, SUV, or van)
                    • Fuel, tolls, and standard insurance
                    • Door-to-door pickup from the airport, hotel, or address
                    • Multilingual support and 24/7 customer service via WhatsApp`,
        },
        {
            question: `Do your drivers speak English or French?`,
            answer: `Yes. All drivers speak Arabic, and most are fluent in English and French. You can specify language preference when booking or ask us via WhatsApp.`,
        },
        {
            question: `Can I book a chauffeur in ${city} for a full day or multiple days?`,
            answer: `Absolutely. We offer:
                    • Full-day chauffeur hire (8-10 hours)
                    • Multi-day private driver services across Moroccan cities
                    Just mention your itinerary in the booking form or contact support for custom pricing.`,
        },
        {
            question: `Is airport pickup available in ${city}?`,
            answer: `Yes. All services include free airport pickup in ${city} with the option of a meet-and-greet sign. Just enter your flight number at checkout.`,
        },
        {
            question: `What types of vehicles are available with drivers?`,
            answer: `We offer:
                    • Sedans (economy to luxury)
                    • SUVs (Toyota Prado, Hyundai Tucson, etc.)
                    • MPVs & Minivans (6-9 seats)
                    • Vans (12-19 seats)
                    • Bus (50 seats)
                    All vehicles are insured, well-maintained, and driven by local professionals.`,
        },
        {
            question: `What is the cancellation policy?`,
            answer: `You can cancel free of charge up to 48 hours before pickup.
                    For cancellations within 48h, a fee may apply. All changes must be confirmed via WhatsApp or email.`,
        },
        {
            question: `Can I add extra luggage or request a child seat?`,
            answer: `Yes. You can request:
                    • Extra luggage space
                    • Child seats
                    • Wi-Fi on board
                    Simply add these to the “Notes” section during booking or contact us via WhatsApp after confirmation.`,
        },
        {
            question: `Do I need to pay a deposit for the private driver service?`,
            answer: `No deposit is usually required for driver bookings.
                    The total price is shown upfront, and you pay MarHire a partial amount online with the rest paid on the day of service.`,
        },
        {
            question: `How far in advance should I book?`,
            answer: `We recommend booking at least 3 days in advance.
                    For urgent needs, contact our support team on WhatsApp - we'll do our best to assist quickly.`,
        },
    ];

    return (
        <>
            <HeroSection
                withBar={false}
                text={
                    city ? `Rent Private Driver in ${city}` : `Private Driver`
                }
                isFull={true}
                tab="drivers"
            />
            <CategoryWhy categoryKey="drivers" />
            {!city && (
                <ExploreCategory
                    title="Private Driver Services in Morocco by City"
                    subtitle="Hire a driver in any major Moroccan destination."
                    items={items}
                />
            )}
            {!city && <Recommended type="drivers" classes="agency-listings" />}
            <Recommended
                type="drivers"
                tabs={tabs}
                city={city}
                title={
                    city
                        ? `Browse Driver Services in ${city} by Vehicle Type`
                        : "Choose Your Private Chauffeur Type in Morocco"
                }
                subtitle={
                    city
                        ? `Hire the Right Driver & Vehicle in ${city} - Daily, Airport & Multi-Day Trips`
                        : "Multilingual | Airport Transfers | Business Trips"
                }
                classes="agency-listings"
            />
            {city && (
                <Recommended
                    type="drivers"
                    city={city}
                    tabs={false}
                    title={`Best Private Driver Deals in ${city} With MarHire`}
                    subtitle={`Featured Private Chauffeurs in ${city} - Compare Options & Rates`}
                    classes="agency-listings"
                />
            )}
            <FreeTexts slug="category/private-driver" />
            {city && (
                <FAQSectionCustom
                    title={`Frequently Asked Questions - Private Driver in ${city}`}
                    faqs={faqs}
                />
            )}
            <FooterRecommendation />
            <Footer />
        </>
    );
};

export default PrivateCategory;
