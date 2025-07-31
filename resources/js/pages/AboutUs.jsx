import StoryVision from "../components/site/StoryVision";
import HeroSection2 from "../components/site/HeroSection2";
import React from "react";
import WhyChooseUs from "../components/site/WhyChooseUs";
import OurServices from "../components/site/OurServices";
import SafetyTrust from "../components/site/SafetyTrust";
import ExplorePopular from "../components/site/ExplorePopular";
import ContactUsBox from "../components/site/ContactUsBox";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";

const AboutUs = () => {
    const features = [
        {
            icon: "https://marhire.bytech.ma/images/icons/icon2.webp",
            title: "Verified Local Partners",
            desc: "All agencies are screened and approved.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon10.webp",
            title: "Transparent Pricing",
            desc: "No hidden fees, clear policies.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon5.webp",
            title: "Multilingual Support",
            desc: "English, French, Arabic service.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon3.webp",
            title: "Full Digital Experience",
            desc: "Book online in minutes.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon1.svg",
            title: "No Deposit on Most Rentals",
            desc: "Especially for economy vehicles.",
        },
        {
            icon: "https://marhire.bytech.ma/images/icons/icon9.webp",
            title: "All-in-One Platform",
            desc: "Cars, drivers, boats, tours & more.",
        },
    ];

    return (
        <div className="page-aboutus">
            <HeroSection2 bgImg="https://marhire.bytech.ma/images/banner2.png" />
            <section className="first-sect">
                <h1>About MarHire</h1>
                <p>
                    Welcome to MarHire, your all-in-one travel companion in
                    Morocco from the vibrant streets of Marrakech to the beaches
                    of Agadir, the historic alleys of Fes, and beyond. We are
                    more than just a travel platform. We are a bridge between
                    curious travelers and the finest local experiences Morocco
                    has to offer.
                </p>
            </section>
            <StoryVision />
            <WhyChooseUs
                title="Why Choose MarHire?"
                subtitle=""
                features={features}
            />
            <OurServices />
            <SafetyTrust />
            <ExplorePopular title="Where We Operate" subtitle="" />
            <ContactUsBox />
            <FreeTexts slug="about-us" />
            <Footer />
        </div>
    );
};

export default AboutUs;
