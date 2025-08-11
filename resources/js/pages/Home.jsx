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
import { useTranslation } from "react-i18next";

const Home = () => {
    const { t } = useTranslation();
    const features = [
        {
            title: t('home.why.features.localExperts.title'),
            desc: t('home.why.features.localExperts.desc'),
            icon: 'https://marhire.bytech.ma/images/icons/icon2.webp',
        },
        {
            title: t('home.why.features.transparentPricing.title'),
            desc: t('home.why.features.transparentPricing.desc'),
            icon: 'https://marhire.bytech.ma/images/icons/icon1.svg',
        },
        {
            title: t('home.why.features.humanSupport.title'),
            desc: t('home.why.features.humanSupport.desc'),
            icon: 'https://marhire.bytech.ma/images/icons/icon5.webp',
        },
        {
            title: t('home.why.features.airportPickup.title'),
            desc: t('home.why.features.airportPickup.desc'),
            icon: 'https://marhire.bytech.ma/images/icons/icon6.svg',
        },
        {
            title: t('home.why.features.handpicked.title'),
            desc: t('home.why.features.handpicked.desc'),
            icon: 'https://marhire.bytech.ma/images/icons/icon7.webp',
        },
        {
            title: t('home.why.features.bookNowPayLater.title'),
            desc: t('home.why.features.bookNowPayLater.desc'),
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
                title={t('home.why.title')}
                subtitle={t('home.why.subtitle')}
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
