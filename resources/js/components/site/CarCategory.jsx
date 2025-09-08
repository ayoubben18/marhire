import HeroSection from "./HeroSection";
import Recommended from "./Recommended";
import WhyChooseUs from "./WhyChooseUs";
import CategoryWhy from "./CategoryWhy";
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
import { useTranslation } from "react-i18next";
import { Shield, Plane, Fuel, LifeBuoy, Check, BarChart } from "lucide-react";

const CarCategory = ({ city }) => {
    const { t } = useTranslation();
    // Why section (below hero) — translated with English fallbacks
    const whyFeatures = [
        {
            icon: <Shield />,
            title: t('category.cars.why.noDeposit.title', 'No-Deposit Options'),
            desc: t('category.cars.why.noDeposit.desc', 'Rent with ease. Many of our partners offer no-deposit car rental in Morocco on economy and compact cars.'),
        },
        {
            icon: <BarChart />,
            title: t('category.cars.why.unlimitedKm.title', 'Unlimited Kilometers'),
            desc: t('category.cars.why.unlimitedKm.desc', 'Explore Morocco without limits. Most rentals of 3+ days include unlimited mileage.'),
        },
        {
            icon: <Plane />,
            title: t('category.cars.why.airportHire.title', 'Airport Car Hire'),
            desc: t('category.cars.why.airportHire.desc', 'Start your trip right away. We offer convenient car hire at all major Moroccan airports.'),
        },
        {
            icon: <LifeBuoy />,
            title: t('category.cars.why.roadside.title', '24/7 Roadside Assistance'),
            desc: t('category.cars.why.roadside.desc', 'Your safety is our priority. Every rental includes 24/7 support for any on-road issues.'),
        },
        {
            icon: <Fuel />,
            title: t('category.cars.why.fuelPolicy.title', 'Transparent Fuel Policies'),
            desc: t('category.cars.why.fuelPolicy.desc', 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".'),
        },
        {
            icon: <Check />,
            title: t('category.cars.why.instantConfirm.title', 'Instant Booking Confirmation'),
            desc: t('category.cars.why.instantConfirm.desc', 'Book your car rental in minutes and receive your confirmation instantly.'),
        },
    ];

    const cityFeatures = [
        {
            icon: "https://marhire.com/images/icons/icon2.webp",
            title: "No Deposit on Most Cars - Ideal for Tourists",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon10.webp",
            title: "Full Insurance Included - Drive with Confidence",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon5.webp",
            title: "Wide Range of Cars - Cheap, Luxury, SUV, Family",
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon3.webp",
            title: `Free Delivery - ${city} Airport, Hotels & Riads`,
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon1.svg",
            title: `Free Delivery - ${city} Airport, Hotels & Riads`,
            desc: "",
        },
        {
            icon: "https://marhire.com/images/icons/icon9.webp",
            title: "Transparent Prices - No Hidden Fees at Pickup",
            desc: "",
        },
    ];

    const items = [
        {
            name: "Car Rental in Marrakech",
            listings: 120,
            image: "https://marhire.com/images/cities/marrakech.jpg",
        },
        {
            name: "Car Rental in Agadir",
            listings: 90,
            image: "https://marhire.com/images/cities/agadir.jpg",
        },
        {
            name: "Car Rental in Casablanca",
            listings: 100,
            image: "https://marhire.com/images/cities/casablanca.jpg",
        },
        {
            name: "Car Rental in Fez",
            listings: 70,
            image: "https://marhire.com/images/cities/fez.jpg",
        },
        {
            name: "Car Rental in Tangier",
            listings: 80,
            image: "https://marhire.com/images/cities/tangier.jpg",
        },
        {
            name: "Car Rental in Essaouira",
            listings: 30,
            image: "https://marhire.com/images/cities/essaouira.jpg",
        },
        {
            name: "Car Rental in Rabat",
            listings: 40,
            image: "https://marhire.com/images/cities/rabat.jpg",
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

    const faqs = [
        {
            question: `Do you offer airport car rental pickup in ${city}?`,
            answer: `Yes, we offer free delivery to and from ${city} Airport, hotels, or any address in the city. You can select your preferred pick-up and drop-off location during the booking process.`,
        },
        {
            question: `Can I rent a car in ${city} without a deposit?`,
            answer: `Absolutely. Many of our economy and compact models come with a “No Deposit” policy, which means you can rent a car in ${city} with no upfront security payment. Deposit requirements, if any, are clearly stated on each listing.`,
        },
        {
            question: `Is full insurance included in the car rental price?`,
            answer: `Yes, all rentals come with standard insurance coverage included by default. You can also choose to upgrade to low-excess insurance during checkout to reduce your financial liability in case of an accident.`,
        },
        {
            question: `What documents do I need to rent a car in ${city}?`,
            answer: `To rent a car in Morocco, you'll need:
                    • A valid driver's license (original)
                    • Your passport
                    • An international driving permit (required if your license is not in French, Arabic, or English)
                    • A credit/debit card (if a deposit is required or you can pay it cash)`,
        },
        {
            question: `What is the minimum age to rent a car in ${city}?`,
            answer: `The minimum rental age is 26 years old.
                    Drivers between 21 and 25 years old can still rent a car but will incur a young driver fee. The extra charge will be clearly shown at the time of booking.`,
        },
        {
            question: `Can I cancel or change my car rental reservation?`,
            answer: `Yes, you can cancel your booking for free up to 48 hours before the scheduled pick-up time. If you cancel within 48 hours, a cancellation fee may apply. Changes to dates, car type, or locations are subject to availability.`,
        },
        {
            question: `Are there any mileage restrictions on car rentals in ${city}?`,
            answer: `Most of our cars come with unlimited kilometers, allowing you to explore Morocco freely. Any exceptions (e.g., capped mileage on some luxury cars) will be clearly displayed in the listing details.`,
        },
        {
            question: `What extras can I add to my booking?`,
            answer: `You can customize your rental with:
                    • Child Seats
                    • Booster Seats
                    • Extra Drivers
                    • Surf Racks (for MPV/SUV)
                    Each extra comes at a fixed fee and can be selected during checkout.`,
        },
        {
            question: `How can I contact support if I need help before or during my rental?`,
            answer: `Our local support team is available 24/7 on WhatsApp to assist with any questions or issues. Contact details are included in your confirmation email.`,
        },
    ];

    return (
        <>
            <HeroSection
                withBar={false}
                text={city ? `Car Rental in ${city}` : `Car Rental`}
                isFull={true}
                tab="cars"
            />
            <CategoryWhy categoryKey="cars" />
            {!city && (
                <>
                    <ExploreCategory
                        title="Rent a Car in Morocco by City"
                        subtitle="Choose from hundreds of cars in Morocco's top destinations."
                        items={items}
                    />
                    <Recommended type="cars" classes="bg-blue" />
                </>
            )}

            <Recommended
                type="cars"
                classes={city ? "" : "bg-green"}
                tabs={tabs}
                city={city}
                title={
                    city
                        ? `Browse Car Hire in ${city} by Vehicle Type`
                        : "Browse our Car Rental in Morocco By Type"
                }
                subtitle={
                    city
                        ? `Rent the Right Vehicle in ${city} - SUVs, Luxury, MPVs & More`
                        : "Find a vehicle that suits your style and budget"
                }
            />
            {city && (
                <Recommended
                    title={`Best Car Rental Deals in ${city} with MarHire`}
                    subtitle={`Featured Car Hire Listings in ${city} - Compare Prices & Features`}
                    type="cars"
                    tabs={false}
                    classes="bg-blue"
                />
            )}
            <FreeTexts slug="category/car-rental" />

            {city && (
                <FAQSectionCustom
                    title={`Frequently Asked Questions - Car Hire in ${city}`}
                    faqs={faqs}
                />
            )}
            <FooterRecommendation />
            <Footer />
        </>
    );
};

export default CarCategory;
