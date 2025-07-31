import ExplorePopular from "../components/site/ExplorePopular";
import HeroSection from "../components/site/HeroSection";
import Recommended from "../components/site/Recommended";
import WhyChooseUs from "../components/site/WhyChooseUs";
import FAQSection from "../components/site/FAQSection";
import Footer from "../components/site/Footer";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";
import { FaShuttleVan } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import FooterRecommendation from "../components/site/FooterRecommendation";
import { useEffect } from "react";
import ExploreCategory from "../components/site/ExploreCategory";
import FAQSectionCustom from "../components/site/FAQSectionCustom";
import FreeTexts from "../components/site/FreeTexts";

const City = ({ city }) => {
    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Transparent prices, no hidden fees",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "No deposit required on most listings",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Free delivery and flexible pickups",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Local verified partners only",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: "24/7 multilingual support",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Instant booking + WhatsApp inquiry",
            desc: "",
        },
    ];
    const items = [
        {
            name: "Marrakech",
            listings: 120,
            image: "https://marhire.bytech.ma/images/cities/marrakech.jpg",
        },
        {
            name: "Agadir",
            listings: 90,
            image: "https://marhire.bytech.ma/images/cities/agadir.jpg",
        },
        {
            name: "Casablanca",
            listings: 100,
            image: "https://marhire.bytech.ma/images/cities/casablanca.jpg",
        },
        {
            name: "Fez",
            listings: 70,
            image: "https://marhire.bytech.ma/images/cities/fez.jpg",
        },
        {
            name: "Tangier",
            listings: 80,
            image: "https://marhire.bytech.ma/images/cities/tangier.jpg",
        },
        {
            name: "Essaouira",
            listings: 30,
            image: "https://marhire.bytech.ma/images/cities/essaouira.jpg",
        },
        {
            name: "Rabat",
            listings: 40,
            image: "https://marhire.bytech.ma/images/cities/rabat.jpg",
        },
    ];
    const faqs = [
        {
            question: `How does MarHire work in ${city}?`,
            answer: `MarHire is a local travel platform that allows you to compare and book car rentals, private drivers, boats, and activities in ${city}. You choose the service, compare options, and book instantly — either online or via WhatsApp.`,
        },
        {
            question: `Can I book a car, driver, or tour in advance?`,
            answer: `Yes, and we highly recommend it. Especially during holidays or high season in ${city}, booking in advance guarantees better prices and availability — particularly for luxury vehicles or private tours.`,
        },
        {
            question: `Is airport pickup available in ${city}?`,
            answer: `Absolutely. Most of our services offer free delivery to/from ${city} Airport, including car rentals and chauffeur services. You can specify your flight time and hotel details at checkout.`,
        },
        {
            question: `What documents are required to rent a car in ${city}?`,
            answer: `You'll need:
A valid driver's license
Your passport
(If needed) an international driving permit
A debit/credit card or cash (based on deposit policy)`,
        },
        {
            question: `Is a deposit required for car rental or boat booking?`,
            answer: `Many of our car rentals require no deposit, especially for economy cars. For boats and drivers, it depends on the agency, but all policies are clearly stated. Use the “No Deposit” filter when searching.`,
        },
        {
            question: `Can I contact the agency directly before booking?`,
            answer: `Yes. Every listing includes a WhatsApp contact with pre-filled messages so you can ask questions, confirm availability, or make special requests instantly.`,
        },
        {
            question: `What is the cancellation policy?`,
            answer: `Most services allow free cancellation up to 48 hours in advance. You'll see the cancellation terms clearly listed on each booking page.`,
        },
        {
            question: `Can I pay by card or cash in ${city}?`,
            answer: `Yes. Most partners accept both cash and card. Some offer pay-by-link options through WhatsApp for secure online payments.`,
        },
        {
            question: `Do I need to speak French or Arabic?`,
            answer: `No our support and many agency staff speak English, and all listings are available in English. You'll also find multilingual guides for activities and drivers.`,
        },
    ];

    return (
        <>
            <HeroSection withBar={true} text={city} />
            <WhyChooseUs
                title={`Why Book with MarHire in ${city}`}
                subtitle=""
                features={features}
            />
            <Recommended
                type="cars"
                title={`Car Rental in ${city} - Compare Deals with No Deposit`}
                subtitle={`Book a car rental in ${city} with ease. Choose from economy hatchbacks, premium sedans, luxury SUVs, or 7-seaters.`}
                tabs={false}
                city={city}
                classes="bg-blue"
            />
            <Recommended
                type="drivers"
                title={`Car Rental in ${city} - Compare Deals with No Deposit`}
                subtitle={`Hire a bilingual private driver in ${city} for city tours, full-day hire, or intercity transfers.`}
                tabs={false}
                city={city}
                classes="bg-green"
            />
            <Recommended
                type="boats"
                title={`Boat Rental in ${city} - Cruises, Fishing Trips & Private Yachts`}
                subtitle={`Enjoy Morocco's coastline with a private boat rental in ${city}. `}
                tabs={false}
                city={city}
                classes="bg-yellow"
            />
            <Recommended
                type="activities"
                title={`Things to Do in ${city} - Local Tours & Unique Experiences`}
                subtitle={`Find the best things to do in ${city}, from camel rides and quad tours to cultural classes and guided city walks.`}
                tabs={false}
                city={city}
                classes="bg-silver"
            />
            <ExploreCategory
                title="Explore MarHire Services in Other Cities Across Morocco"
                subtitle="Planning to visit more than one destination? MarHire is available in multiple Moroccan cities "
                items={items}
            />
            <FreeTexts slug="city/*" />
            <FAQSectionCustom faqs={faqs} />
            <Footer />
        </>
    );
};

export default City;
