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
import CarSubCategory from "../components/site/CarSubCategory";
import PrivateSubCategory from "../components/site/PrivateSubCategory";
import BoatSubCategory from "../components/site/BoatSubCategory";
import ThingsToDoSubCategory from "../components/site/ThingsToDoSubCategory";

const SubCategory = ({ category, subcategory }) => {
    const fetchContent = () => {
        // try {
        //     switch (category) {
        //         case "private-driver":
        //             return <PrivateSubCategory subcategory={subcategory} />;
        //         case "boats":
        //             return <BoatSubCategory subcategory={subcategory} />;
        //         case "things-to-do":
        //             return <ThingsToDoSubCategory subcategory={subcategory} />;
        //         default:
        //             return <CarSubCategory subcategory={subcategory} />;
        //     }
        // } catch (err) {
        //     console.error(err);
        // }

        return <h1>test</h1>;
    };

    return <>{fetchContent()}</>;
};

export default SubCategory;
