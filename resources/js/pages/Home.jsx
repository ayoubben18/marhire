import ExploreCategory from "../components/site/ExploreCategory";
import HeroSection from "../components/site/HeroSection";
import ListingsByCity from "../components/site/ListingsByCity";
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
            <ExploreCategory
                items={[
                    { name: t('cities.agadir'), image: 'https://marhire.bytech.ma/images/agadir.webp', listings: 40 },
                    { name: t('cities.marrakech'), image: 'https://marhire.bytech.ma/images/marrakech.webp', listings: 40 },
                    { name: t('cities.casablanca'), image: 'https://marhire.bytech.ma/images/casablanca2.webp', listings: 40 },
                    { name: t('cities.fes'), image: 'https://marhire.bytech.ma/images/fez.webp', listings: 40 },
                    { name: t('cities.tangier'), image: 'https://marhire.bytech.ma/images/tangier.webp', listings: 40 },
                ]}
            />
            <ListingsByCity
                title={t('home.sections.carRentals', 'Car Rentals by City')}
                categories={2}
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat"]}
                initialCity="Agadir"
                perPage={8}
            />
            <ListingsByCity
                title={t('home.sections.privateDrivers', 'Private Drivers by City')}
                categories={3}
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat"]}
                initialCity="Agadir"
                perPage={8}
            />
            <ListingsByCity
                title={t('home.sections.boatRentals', 'Boat Rentals by City')}
                categories={4}
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat"]}
                initialCity="Agadir"
                perPage={8}
            />
            <ListingsByCity
                title={t('home.sections.activities', 'Activities by City')}
                categories={5}
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat"]}
                initialCity="Agadir"
                perPage={8}
            />
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
