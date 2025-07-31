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

const CarSubCategory = ({ subcategory, city }) => {
    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "No Deposit on Economy Cars",
            desc: "Many cars require no deposit — ideal for tourists and short-term renters.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Full Insurance Included",
            desc: "All rentals include insurance. Optional low-excess upgrades available.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Unlimited Kilometers",
            desc: "Explore Morocco without distance limits — no extra charges.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Airport & Hotel Pickup",
            desc: "Choose free delivery at any major city or airport (Marrakech, Agadir, Fes…).",
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

    const cityFeatures = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "No Deposit on Most Cars - Ideal for Tourists",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Full Insurance Included - Drive with Confidence",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Wide Range of Cars - Cheap, Luxury, SUV, Family",
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: `Free Delivery - ${city} Airport, Hotels & Riads`,
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: `Free Delivery - ${city} Airport, Hotels & Riads`,
            desc: "",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "Transparent Prices - No Hidden Fees at Pickup",
            desc: "",
        },
    ];

    const items = [
        {
            name: "Car Rental in Marrakech",
            listings: 120,
            image: "https://marhire.bytech.ma/images/cities/marrakech.jpg",
        },
        {
            name: "Car Rental in Agadir",
            listings: 90,
            image: "https://marhire.bytech.ma/images/cities/agadir.jpg",
        },
        {
            name: "Car Rental in Casablanca",
            listings: 100,
            image: "https://marhire.bytech.ma/images/cities/casablanca.jpg",
        },
        {
            name: "Car Rental in Fez",
            listings: 70,
            image: "https://marhire.bytech.ma/images/cities/fez.jpg",
        },
        {
            name: "Car Rental in Tangier",
            listings: 80,
            image: "https://marhire.bytech.ma/images/cities/tangier.jpg",
        },
        {
            name: "Car Rental in Essaouira",
            listings: 30,
            image: "https://marhire.bytech.ma/images/cities/essaouira.jpg",
        },
        {
            name: "Car Rental in Rabat",
            listings: 40,
            image: "https://marhire.bytech.ma/images/cities/rabat.jpg",
        },
    ];

    const tabs = [
        { id: 1, name: "Luxury" },
        { id: 2, name: "Cheap" },
        { id: 3, name: "MPV" },
        { id: 4, name: "SUV" },
        { id: 5, name: "Hatchback" },
        { id: 6, name: "Sedan" },
    ];

    return (
       <h1>test</h1>
    );
};

export default CarSubCategory;
