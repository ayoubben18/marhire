import React, { useState } from "react";
import WhyChooseUs from "../components/site/WhyChooseUs";
import { MdVerified } from "react-icons/md";
import HorizontalIconBox from "../components/site/HorizontalIconBox";
import FAQSectionCustom from "../components/site/FAQSectionCustom";
import Footer from "../components/site/Footer";
import HeroSection3 from "../components/site/HeroSection3";
import ListForm from "../components/site/ListForm";
import HeroSection2 from "../components/site/HeroSection2";
import FreeTexts from "../components/site/FreeTexts";

const ListYourProperty = () => {
    const features = [
        {
            title: "Reach thousands of international travelers",
            desc: "",
            icon: 'https://marhire.bytech.ma/images/icons/icon2.webp',
        },
        {
            title: "Get featured on city-specific pages (e.g., Marrakech, Agadir)",
            desc: "",
            icon: 'https://marhire.bytech.ma/images/icons/icon8.svg',
        },
        {
            title: "Receive verified booking requests by email and WhatsApp",
            desc: "",
            icon: 'https://marhire.bytech.ma/images/icons/icon3.webp',
        },
        {
            title: "No upfront listing fees  we only take a small commission per confirmed booking",
            desc: "",
            icon: 'https://marhire.bytech.ma/images/icons/icon1.svg',
        },
        {
            title: "Dedicated support for agencies in English, French, and Arabic",
            desc: "",
            icon: 'https://marhire.bytech.ma/images/icons/icon5.webp',
        },
    ];
    const items = [
        {
            title: "Global Reach: Appear in front of thousands of travelers looking to explore Morocco.",
            icon: "",
        },
        {
            title: "Direct Booking Leads: Get requests straight to your WhatsApp or email.",
            icon: "",
        },
        {
            title: "Performance-Based Exposure: The more reliable you are, the more visible you become.",
            icon: "",
        },
        {
            title: "Zero Setup Fees: No cost to list your services. Pay only when you earn.",
            icon: "",
        },
        {
            title: "Partner Support: Human assistance to help you onboard, update listings, and succeed.",
            icon: "",
        },
        {
            title: "Verified Trust: Appear in top spots when you offer consistent, high-quality service.",
            icon: "",
        },
    ];

    const faqs = [
        {
            question: "1. Is there a fee to list my service?",
            answer: "No. Listing on MarHire is free. We only earn a small commission on confirmed bookings.",
        },
        {
            question: "2. How do I receive booking requests?",
            answer: "We send them to your registered email and/or WhatsApp, with full customer details.",
        },
        {
            question: "3. How long does it take to approve my listing?",
            answer: "Most listings are reviewed and approved within 48 hours of submission.",
        },
        {
            question: "4. Can I edit or update my listings later?",
            answer: "Yes. After approval, you'll have access to a dashboard to update your listings, availability, and prices.",
        },
    ];

    return (
        <>
            <HeroSection2 bgImg="https://marhire.bytech.ma/images/banner2.png" />
            <section className="first-sect">
                <h1>List Your Property or Service on MarHire</h1>
                <p>
                    Connect with travelers looking for verified local experiences in Morocco.
                </p>
            </section>
            <WhyChooseUs
                title="Why Join MarHire"
                subtitle="MarHire is more than a booking platform  it's a partner in your growth."
                features={features}
            />
            <HorizontalIconBox
                title="Benefits of Joining MarHire"
                items={items}
            />
            <ListForm />
            <FAQSectionCustom faqs={faqs} />
            <FreeTexts slug="list-your-property" />
            <Footer />
        </>
    );
};

export default ListYourProperty;
