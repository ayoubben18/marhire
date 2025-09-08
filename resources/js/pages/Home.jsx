import HeroSection from "../components/site/HeroSection";
import ListingsByCity from "../components/site/ListingsByCity";
import WhyChooseUs from "../components/site/WhyChooseUs";
import FAQSection from "../components/site/FAQSection";
import HomeBlogSection from "../components/site/HomeBlogSection";
import Footer from "../components/site/Footer";
import { FaMapMarkedAlt } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";
import { FaShuttleVan } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa";
import FooterRecommendation from "../components/site/FooterRecommendation";
import { useMediaQuery } from "react-responsive";
import BannerMobile from "../components/site/BannerMobile";
import FreeTexts from "../components/site/FreeTexts";
import { useTranslation } from "react-i18next";
import ExploreCategory from "../components/site/ExploreCategory";

const Home = () => {
    const { t } = useTranslation();
    const features = [
        {
            title: t("home.why.features.localExperts.title"),
            desc: t("home.why.features.localExperts.desc"),
            icon: <FaMapMarkedAlt />,
        },
        {
            title: t("home.why.features.transparentPricing.title"),
            desc: t("home.why.features.transparentPricing.desc"),
            icon: <BsCashStack />,
        },
        {
            title: t("home.why.features.humanSupport.title"),
            desc: t("home.why.features.humanSupport.desc"),
            icon: <FaHeadset />,
        },
        {
            title: t("home.why.features.airportPickup.title"),
            desc: t("home.why.features.airportPickup.desc"),
            icon: <FaShuttleVan />,
        },
        {
            title: t("home.why.features.handpicked.title"),
            desc: t("home.why.features.handpicked.desc"),
            icon: <FaStarHalfAlt />,
        },
        {
            title: t("home.why.features.bookNowPayLater.title"),
            desc: t("home.why.features.bookNowPayLater.desc"),
            icon: <FaCalendarCheck />,
        },
    ];
    const isMobile = useMediaQuery({ maxWidth: 900 });

    return (
        <>
            {/* {isMobile ? <BannerMobile />: */}
            <HeroSection withBar={true} />
            {/* } */}
            <ExploreCategory
                items={[
                    {
                        name: t("cities.agadir"),
                        image: "/images/cities/agadir.jpg",
                        listings: 40,
                    },
                    {
                        name: t("cities.marrakech"),
                        image: "/images/cities/marrakech.jpg",
                        listings: 40,
                    },
                    {
                        name: t("cities.casablanca"),
                        image: "/images/cities/casablanca.jpg",
                        listings: 40,
                    },
                    {
                        name: t("cities.fes"),
                        image: "/images/cities/fez.jpg",
                        listings: 40,
                    },
                    {
                        name: t("cities.tangier"),
                        image: "/images/cities/tangier.jpg",
                        listings: 40,
                    },
                ]}
            />
            <div style={{ background: "#f9f4f3", padding: "0 16px" }}>
                <ListingsByCity
                    title={t("home.sections.carRentals", "Car Rentals by City")}
                    categories={2}
                    cities={[
                        "Agadir",
                        "Marrakech",
                        "Casablanca",
                        "Fez",
                        "Tangier",
                        "Rabat",
                    ]}
                    initialCity="Agadir"
                    perPage={8}
                />
            </div>
            <div style={{ background: "#f9f7f3", padding: "0 16px" }}>
                <ListingsByCity
                    title={t(
                        "home.sections.privateDrivers",
                        "Private Drivers by City"
                    )}
                    categories={3}
                    cities={[
                        "Agadir",
                        "Marrakech",
                        "Casablanca",
                        "Fez",
                        "Tangier",
                        "Rabat",
                    ]}
                    initialCity="Agadir"
                    perPage={8}
                />
            </div>
            <div style={{ background: "#F7F3F9", padding: "0 16px" }}>
                <ListingsByCity
                    title={t(
                        "home.sections.boatRentals",
                        "Boat Rentals by City"
                    )}
                    categories={4}
                    cities={[
                        "Agadir",
                        "Marrakech",
                        "Casablanca",
                        "Fez",
                        "Tangier",
                        "Rabat",
                    ]}
                    initialCity="Agadir"
                    perPage={8}
                />
            </div>
            <div style={{ background: "#F3F9F7", padding: "0 16px" }}>
                <ListingsByCity
                    title={t("home.sections.activities", "Activities by City")}
                    categories={5}
                    cities={[
                        "Agadir",
                        "Marrakech",
                        "Casablanca",
                        "Fez",
                        "Tangier",
                        "Rabat",
                    ]}
                    initialCity="Agadir"
                    perPage={8}
                />
            </div>
            <div style={{ background: "#F9F5F4", padding: "0 16px" }}>
                <WhyChooseUs
                    title={t("home.why.title")}
                    subtitle={t("home.why.subtitle")}
                    features={features}
                />
            </div>
            <HomeBlogSection />
            <FAQSection />
            <FreeTexts slug="/" />
            <Footer />
        </>
    );
};

export default Home;
