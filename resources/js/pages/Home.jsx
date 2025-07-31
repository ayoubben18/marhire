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
import { useMediaQuery } from 'react-responsive';
import BannerMobile from "../components/site/BannerMobile";
import FreeTexts from "../components/site/FreeTexts";

const Home = () => {
    const features = [
        {
            title: "Local Experts, Local Experiences",
            desc: "Our listings are curated by Moroccans who know the country better than anyone. You get real recommendations, culturally rich activities, and local prices — not just what's mass-marketed to tourists.",
            icon: 'https://marhire.bytech.ma/images/icons/icon2.webp',
        },
        {
            title: "Transparent Pricing, No Hidden Fees",
            desc: "What you see is what you pay. MarHire partners only with verified local agencies who commit to no surprise charges and clear booking policies.",
            icon: 'https://marhire.bytech.ma/images/icons/icon1.svg',
        },
        {
            title: "24/7 Human Support",
            desc: "Our team is local, multilingual, and available on WhatsApp, phone, or email to help you before, during, and after your trip.",
            icon: 'https://marhire.bytech.ma/images/icons/icon5.webp',
        },
        {
            title: "Airport Pickup, Anywhere",
            desc: "Whether you land in Agadir, Marrakech, or Fes, your car or driver will be waiting. Stress-free travel starts at the airport gate.",
            icon: 'https://marhire.bytech.ma/images/icons/icon6.svg',
        },
        {
            title: "Handpicked, Reviewed Listings",
            desc: "We don't list everything — only the best. Every car, driver, boat, or activity is reviewed for quality, comfort, and traveler satisfaction.",
            icon: 'https://marhire.bytech.ma/images/icons/icon7.webp',
        },
        {
            title: "Book Now, Pay Later",
            desc: "Many of our services let you reserve without a credit card and pay upon arrival — perfect for travelers who value flexibility.",
            icon: 'https://marhire.bytech.ma/images/icons/icon3.webp',
        },
    ];
    const isMobile = useMediaQuery({ maxWidth: 900 });

    return (
        <>
            {isMobile ? <BannerMobile />:<HeroSection withBar={true}/>}
            <ExplorePopular />
            <Recommended type="cars" classes="bg-blue"/>
            <Recommended type="drivers" classes="bg-green" />
            <Recommended type="boats" classes="bg-yellow"/>
            <Recommended type="activities" classes="bg-silver"/>
            <WhyChooseUs
                title="Why Travelers Love MarHire"
                subtitle="As a travel expert, I can confidently say that MarHire is more than a booking platform  it's your trusted local partner for discovering Morocco"
                features={features}
            />
            <FAQSection />
            <FooterRecommendation />
            <FreeTexts slug="/" />
            <Footer />
        </>
    );
};

export default Home;
