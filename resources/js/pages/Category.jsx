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
import CarCategory from "../components/site/CarCategory";
import PrivateCategory from "../components/site/PrivateCategory";
import BoatCategory from "../components/site/BoatCategory";
import ThingsToDoCategory from "../components/site/ThingsToDoCategory";

const Category = ({ slug, city }) => {
    const fetchContent = () => {
        switch (slug) {
            case "private-driver":
                return <PrivateCategory city={city} />
            case "boats": 
                return <BoatCategory city={city} />;
            case "things-to-do":    
                return <ThingsToDoCategory city={city} />;
            default:
                return <CarCategory city={city} />;
        }
    };

    return <>{fetchContent()}</>;
};

export default Category;
