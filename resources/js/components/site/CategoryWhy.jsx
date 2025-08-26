import React from "react";
import WhyChooseUs from "./WhyChooseUs";
import { useTranslation } from "react-i18next";
import {
    Shield,
    BarChart,
    Plane,
    LifeBuoy,
    Fuel,
    Check,
    BadgeCheck,
    Bus,
    Star,
    Users,
    X,
    Anchor,
    ShieldCheck,
    Calendar,
    CloudSun,
    Tag,
    UserCheck,
    Car,
    Languages,
} from "lucide-react";

const CategoryWhy = ({ categoryKey, city }) => {
    const { t } = useTranslation();

    const build = () => {
        switch (categoryKey) {
            case "cars":
                return {
                    title: t(
                        "category.cars.why.title",
                        "Why Book Your Car Hire in Morocco with MarHire?"
                    ),
                    features: [
                        { icon: <Shield />, title: t("category.cars.why.noDeposit.title", "No-Deposit Options"), desc: t("category.cars.why.noDeposit.desc", "Rent with ease. Many of our partners offer no-deposit car rental in Morocco on economy and compact cars.") },
                        { icon: <BarChart />, title: t("category.cars.why.unlimitedKm.title", "Unlimited Kilometers"), desc: t("category.cars.why.unlimitedKm.desc", "Explore Morocco without limits. Most rentals of 3+ days include unlimited mileage.") },
                        { icon: <Plane />, title: t("category.cars.why.airportHire.title", "Airport Car Hire"), desc: t("category.cars.why.airportHire.desc", "Start your trip right away. We offer convenient car hire at all major Moroccan airports.") },
                        { icon: <LifeBuoy />, title: t("category.cars.why.roadside.title", "24/7 Roadside Assistance"), desc: t("category.cars.why.roadside.desc", "Your safety is our priority. Every rental includes 24/7 support for any on-road issues.") },
                        { icon: <Fuel />, title: t("category.cars.why.fuelPolicy.title", "Transparent Fuel Policies"), desc: t("category.cars.why.fuelPolicy.desc", "No surprises. Our partners offer clear fuel policies, typically \"Same-to-Same\".") },
                        { icon: <Check />, title: t("category.cars.why.instantConfirm.title", "Instant Booking Confirmation"), desc: t("category.cars.why.instantConfirm.desc", "Book your car rental in minutes and receive your confirmation instantly.") },
                    ],
                };
            case "activities":
                return {
                    title: t(
                        "category.activities.why.title",
                        "Why Book Guided Tours & Day Trips in Morocco with MarHire?"
                    ),
                    features: [
                        { icon: <BadgeCheck />, title: t("category.activities.why.guides.title", "Official Licensed Guides"), desc: t("category.activities.why.guides.desc", "Explore with confidence. All our guided tours are led by certified, knowledgeable local guides.") },
                        { icon: <Check />, title: t("category.activities.why.instant.title", "Instant Confirmation"), desc: t("category.activities.why.instant.desc", "Book your spot in minutes and receive your activity voucher instantly.") },
                        { icon: <Bus />, title: t("category.activities.why.pickup.title", "Hotel Pickup Included"), desc: t("category.activities.why.pickup.desc", "Many of our activities and day trips include convenient pickup and drop-off from your hotel.") },
                        { icon: <Star />, title: t("category.activities.why.rated.title", "Highly-Rated Experiences"), desc: t("category.activities.why.rated.desc", "We only list top-rated activities that are loved by fellow travelers.") },
                        { icon: <Users />, title: t("category.activities.why.private.title", "Small Group or Private Tours"), desc: t("category.activities.why.private.desc", "Choose between sociable small group tours or intimate private tours.") },
                        { icon: <X />, title: t("category.activities.why.cancel.title", "Free & Easy Cancellation"), desc: t("category.activities.why.cancel.desc", "Book with flexibility. Most activities offer free cancellation up to 24 hours in advance.") },
                    ],
                };
            case "boats":
                return {
                    title: t(
                        "category.boats.why.title",
                        "Why Book Your Boat Rental in Morocco with MarHire?"
                    ),
                    features: [
                        { icon: <BadgeCheck />, title: t("category.boats.why.operators.title", "Verified Local Operators"), desc: t("category.boats.why.operators.desc", "All boat trips are offered by licensed and experienced maritime professionals.") },
                        { icon: <Anchor />, title: t("category.boats.why.captain.title", "Captain & Crew Included"), desc: t("category.boats.why.captain.desc", "Relax and enjoy the view. Most of our boat rentals include a professional captain and crew.") },
                        { icon: <ShieldCheck />, title: t("category.boats.why.safety.title", "Safety First"), desc: t("category.boats.why.safety.desc", "Every vessel is equipped with all necessary safety gear, including life jackets for all passengers.") },
                        { icon: <Calendar />, title: t("category.boats.why.flexible.title", "Flexible Booking"), desc: t("category.boats.why.flexible.desc", "Book by the hour for a half-day, or a full-day adventure on the water for your private boat tour.") },
                        { icon: <CloudSun />, title: t("category.boats.why.weather.title", "Bad Weather Guarantee"), desc: t("category.boats.why.weather.desc", "If your trip is cancelled by the captain due to weather, we offer a free reschedule or a full refund.") },
                        { icon: <Tag />, title: t("category.boats.why.pricing.title", "Transparent Pricing"), desc: t("category.boats.why.pricing.desc", "The price you see includes fuel for standard trips and all port fees. No hidden costs for your yacht charter.") },
                    ],
                };
            case "drivers":
                return {
                    title: t(
                        "category.drivers.why.title",
                        "Why Book a Chauffeur Service in Morocco with MarHire?"
                    ),
                    features: [
                        { icon: <UserCheck />, title: t("category.drivers.why.vetted.title", "Professional & Vetted Drivers"), desc: t("category.drivers.why.vetted.desc", "All our chauffeurs are licensed, experienced, and vetted for professionalism and local knowledge.") },
                        { icon: <Tag />, title: t("category.drivers.why.pricing.title", "Fixed, All-Inclusive Pricing"), desc: t("category.drivers.why.pricing.desc", "The price you see is the price you pay. No hidden fees for fuel, tolls, or waiting time for your private driver.") },
                        { icon: <Plane />, title: t("category.drivers.why.airport.title", "Morocco Airport Transfer"), desc: t("category.drivers.why.airport.desc", "Your driver monitors your flight and waits for you in the arrivals hall with a name sign for a reliable airport pickup.") },
                        { icon: <Car />, title: t("category.drivers.why.comfort.title", "Comfortable, Modern Vehicles"), desc: t("category.drivers.why.comfort.desc", "Travel in style and comfort in a fleet of clean, modern, and air-conditioned vehicles.") },
                        { icon: <Languages />, title: t("category.drivers.why.languages.title", "Multilingual Chauffeurs"), desc: t("category.drivers.why.languages.desc", "Communicate with ease. Many of our drivers speak English, French, Spanish, and Arabic.") },
                        { icon: <Calendar />, title: t("category.drivers.why.flexible.title", "Flexible Chauffeur Services"), desc: t("category.drivers.why.flexible.desc", "Book by the hour, for a specific trip, or for multi-day tours across Morocco.") },
                    ],
                };
            default:
                return { title: "", features: [] };
        }
    };

    const data = build();
    return <WhyChooseUs title={data.title} subtitle={""} features={data.features} />;
};

export default CategoryWhy;


