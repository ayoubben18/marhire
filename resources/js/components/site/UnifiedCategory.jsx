import React from "react";
import HeroSection from "./HeroSection";
import CategoryWhy from "./CategoryWhy";
// import ExploreCategory from "./ExploreCategory"; // replaced by CityCarousel
import Recommended from "./Recommended";
import FAQSectionCustom from "./FAQSectionCustom";
import FreeTexts from "./FreeTexts";
import FooterRecommendation from "./FooterRecommendation";
import Footer from "./Footer";
import UnifiedListings from "./UnifiedListings";
import ListingsByCity from "./ListingsByCity";
import ListingsBySubcategory from "./ListingsBySubcategory";
import PopularDestinations from "./PopularDestinations";
import CityCarousel from "./CityCarousel";
import { useTranslation } from "react-i18next";

const CITY_IMAGE_MAP = {
    Marrakech: "/images/cities/marrakech.jpg",
    Agadir: "/images/cities/agadir.jpg",
    Casablanca: "/images/cities/casablanca.jpg",
    Fez: "/images/cities/fez.jpg",
    Tangier: "/images/cities/tangier.jpg",
    Essaouira: "/images/cities/essaouira.jpg",
    Rabat: "/images/cities/rabat.jpg",
    "El Jadida": "/images/cities/rabat.jpg",
    Dakhla: "/images/cities/rabat.jpg",
};

const buildItems = (titlePrefix, cityCounts) => {
    return Object.keys(cityCounts).map((cityName) => ({
        name: `${titlePrefix} ${cityName}`,
        listings: cityCounts[cityName],
        image: CITY_IMAGE_MAP[cityName] || "https://placehold.co/1200x800",
    }));
};

const CATEGORY_CONFIG = {
    "car-rental": {
        tab: "cars",
        type: "cars",
        categoryKey: "cars",
        heroText: (city) =>
            city ? `Car Rental in ${city}` : "Car Rental in Morocco",
        heroSub: () =>
            "From agile city cars for navigating the medinas to spacious SUVs for your family road trip, find the perfect vehicle. Compare deals from trusted local agencies for cheap car rental with transparent pricing and instant booking.",
        explore: {
            show: true,
            title: "Rent a Car in Morocco by City",
            subtitle:
                "Choose from hundreds of cars in Morocco's top destinations.",
            items: buildItems("Car Rental in", {
                Marrakech: 120,
                Agadir: 90,
                Casablanca: 100,
                Fez: 70,
                Tangier: 80,
                Essaouira: 30,
                Rabat: 40,
            }),
        },
        recommendedClasses: {
            firstNonCity: "bg-blue",
            mainNonCity: "bg-green",
            mainCity: "",
            cityOnly: "bg-blue",
        },
        tabs: [
            { id: 59, name: "SUV" },
            { id: 60, name: "Hatchback" },
            { id: 61, name: "MPV" },
        ],
        brandTabs: [
            { id: 52, name: "Dacia" },
            { id: 54, name: "Audi" },
        ],
        titles: {
            tabsTitle: (city) =>
                city
                    ? `Browse Car Hire in ${city} by Vehicle Type`
                    : "Cheap, Luxury & SUV Car Rental Morocco",
            tabsSubtitle: (city) =>
                city
                    ? `Rent the Right Vehicle in ${city} - SUVs, Luxury, MPVs & More`
                    : "Find a vehicle that suits your style and budget",
            cityOnlyTitle: (city) =>
                `Best Car Rental Deals in ${city} with MarHire`,
            cityOnlySubtitle: (city) =>
                `Featured Car Hire Listings in ${city} - Compare Prices & Features`,
            cityBrowseTitle: () => "Car Hire by City",
            brandBrowseTitle: () => "Browse Car Hire by Brand",
        },
        freeTextsSlug: "category/car-rental",
        faq: {
            title: (city) => `Frequently Asked Questions - Car Hire in ${city}`,
            items: (city) => [
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
                    answer: `To rent a car in Morocco, you'll need:\n                    • A valid driver's license (original)\n                    • Your passport\n                    • An international driving permit (required if your license is not in French, Arabic, or English)\n                    • A credit/debit card (if a deposit is required or you can pay it cash)`,
                },
                {
                    question: `What is the minimum age to rent a car in ${city}?`,
                    answer: `The minimum rental age is 26 years old.\n                    Drivers between 21 and 25 years old can still rent a car but will incur a young driver fee. The extra charge will be clearly shown at the time of booking.`,
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
                    answer: `You can customize your rental with:\n                    • Child Seats\n+                    • Booster Seats\n+                    • Extra Drivers\n+                    • Surf Racks (for MPV/SUV)\n+                    Each extra comes at a fixed fee and can be selected during checkout.`,
                },
                {
                    question: `How can I contact support if I need help before or during my rental?`,
                    answer: `Our local support team is available 24/7 on WhatsApp to assist with any questions or issues. Contact details are included in your confirmation email.`,
                },
            ],
        },
    },
    "private-driver": {
        tab: "drivers",
        type: "drivers",
        categoryKey: "drivers",
        heroText: (city) =>
            city
                ? `Rent Private Driver in ${city}`
                : "Private Drivers in Morocco",
        heroSub: () =>
            "Travel with comfort, safety, and style. Book a professional, multilingual private driver for your Morocco airport transfer, city tours, business trips, or multi-day excursions with fixed, all-inclusive pricing.",
        explore: {
            show: true,
            title: "Private Driver Services in Morocco by City",
            subtitle: "Hire a driver in any major Moroccan destination.",
            items: buildItems("Private Driver in", {
                Marrakech: 100,
                Agadir: 80,
                Casablanca: 120,
                Fez: 70,
                Tangier: 60,
                Rabat: 50,
            }),
        },
        recommendedClasses: {
            firstNonCity: "agency-listings",
            mainNonCity: "agency-listings",
            mainCity: "agency-listings",
            cityOnly: "agency-listings",
        },
        tabs: [
            { id: 72, name: "SUV" },
            { id: 73, name: "Sedan" },
            { id: 74, name: "Van" },
        ],
        titles: {
            tabsTitle: (city) =>
                city
                    ? `Browse Driver Services in ${city} by Vehicle Type`
                    : "Book a Chauffeur Service by Vehicle Type",
            tabsSubtitle: (city) =>
                city
                    ? `Hire the Right Driver & Vehicle in ${city} - Daily, Airport & Multi-Day Trips`
                    : "Multilingual | Airport Transfers | Business Trips",
            cityOnlyTitle: (city) =>
                `Best Private Driver Deals in ${city} With MarHire`,
            cityOnlySubtitle: (city) =>
                `Featured Private Chauffeurs in ${city} - Compare Options & Rates`,
            cityBrowseTitle: () => "Airport Transfer & Private Drivers by City",
        },
        freeTextsSlug: "category/private-driver",
        faq: {
            title: (city) =>
                `Frequently Asked Questions - Private Driver in ${city}`,
            items: (city) => [
                {
                    question: `What is included when I book a private driver in ${city}?`,
                    answer: `Each MarHire private driver booking includes:\n                    • A licensed professional driver\n                    • A clean, air-conditioned vehicle (sedan, SUV, or van)\n                    • Fuel, tolls, and standard insurance\n                    • Door-to-door pickup from the airport, hotel, or address\n                    • Multilingual support and 24/7 customer service via WhatsApp`,
                },
                {
                    question: `Do your drivers speak English or French?`,
                    answer: `Yes. All drivers speak Arabic, and most are fluent in English and French. You can specify language preference when booking or ask us via WhatsApp.`,
                },
                {
                    question: `Can I book a chauffeur in ${city} for a full day or multiple days?`,
                    answer: `Absolutely. We offer:\n                    • Full-day chauffeur hire (8-10 hours)\n                    • Multi-day private driver services across Moroccan cities\n                    Just mention your itinerary in the booking form or contact support for custom pricing.`,
                },
                {
                    question: `Is airport pickup available in ${city}?`,
                    answer: `Yes. All services include free airport pickup in ${city} with the option of a meet-and-greet sign. Just enter your flight number at checkout.`,
                },
                {
                    question: `What types of vehicles are available with drivers?`,
                    answer: `We offer:\n                    • Sedans (economy to luxury)\n                    • SUVs (Toyota Prado, Hyundai Tucson, etc.)\n                    • MPVs & Minivans (6-9 seats)\n                    • Vans (12-19 seats)\n                    • Bus (50 seats)\n                    All vehicles are insured, well-maintained, and driven by local professionals.`,
                },
                {
                    question: `What is the cancellation policy?`,
                    answer: `You can cancel free of charge up to 48 hours before pickup.\n                    For cancellations within 48h, a fee may apply. All changes must be confirmed via WhatsApp or email.`,
                },
                {
                    question: `Can I add extra luggage or request a child seat?`,
                    answer: `Yes. You can request:\n                    • Extra luggage space\n                    • Child seats\n                    • Wi-Fi on board\n                    Simply add these to the “Notes” section during booking or contact us via WhatsApp after confirmation.`,
                },
                {
                    question: `Do I need to pay a deposit for the private driver service?`,
                    answer: `No deposit is usually required for driver bookings.\n                    The total price is shown upfront, and you pay MarHire a partial amount online with the rest paid on the day of service.`,
                },
                {
                    question: `How far in advance should I book?`,
                    answer: `We recommend booking at least 3 days in advance.\n                    For urgent needs, contact our support team on WhatsApp - we'll do our best to assist quickly.`,
                },
            ],
        },
    },
    boats: {
        tab: "boats",
        type: "boats",
        categoryKey: "boats",
        heroText: (city) =>
            city ? `Boat Rental in ${city}` : "Boat Rental in Morocco",
        heroSub: () =>
            "From thrilling jet ski rides in Agadir to luxury yacht charters in Tangier, discover Morocco's stunning coastline and lakes. Book an unforgettable fishing trip, sunset cruise, or private boat tour.",
        explore: {
            show: true,
            title: "Best Boat Rentals in Morocco by City",
            subtitle: "Find available boats in Morocco's top coastal cities.",
            items: buildItems("Boat Rental in", {
                Agadir: 60,
                Casablanca: 40,
                Tangier: 30,
                Essaouira: 30,
                "El Jadida": 15,
                Dakhla: 20,
            }),
        },
        recommendedClasses: {
            firstNonCity: "agency-listings",
            mainNonCity: "agency-listings",
            mainCity: "agency-listings",
            cityOnly: "agency-listings",
        },
        tabs: [
            { id: 55, name: "Yacht" },
            { id: 56, name: "Speedboat" },
            { id: 67, name: "Custom" },
        ],
        titles: {
            tabsTitle: (city) =>
                city
                    ? `Browse Boat Rentals in ${city} by Type`
                    : `Boat, Yacht & Fishing Trip Rentals by Type`,
            tabsSubtitle: (city) =>
                city
                    ? `Choose the Perfect Experience - Yachts, Fishing Boats & More`
                    : `Choose your perfect experience on the water.`,
            cityOnlyTitle: (city) =>
                `Best Boat Rental Deals in ${city} - Updated Daily`,
            cityOnlySubtitle: (city) =>
                `Featured Boat Listings in ${city} - Compare Prices & Services`,
        },
        freeTextsSlug: "category/boats",
        faq: {
            title: (city) =>
                `Frequently Asked Questions - Boat Rental in ${city}`,
            items: (city) => [
                {
                    question: `Is the captain included in the boat rental?`,
                    answer: `Yes. All boats listed on MarHire in ${city} include a licensed captain/skipper to operate the boat. You don't need a boat license.`,
                },
                {
                    question: `What's included in the price?`,
                    answer: `Most boat rentals include:\n                    • Skipper\n                    • Fuel\n                    • Life jackets\n                    • Light snacks & soft drinks (on select boats)\n                    Check each listing for exact inclusions.`,
                },
                {
                    question: `Can I cancel or modify my boat rental in ${city}?`,
                    answer: `Yes, you can cancel for free up to 48 hours before the rental time. Inside 48h, cancellation fees may apply.`,
                },
                {
                    question: `How many people can I bring on the boat?`,
                    answer: `Each boat has a clearly listed capacity. You can filter by:\n                • 2-4 people (romantic or small groups)\n                • 6-8 people (family trips)\n                • 10-15+ people (group tours or parties)`,
                },
                {
                    question: `What types of boats are available in ${city}?`,
                    answer: `We offer:\n            • Luxury yachts\n            • Speedboats\n            • Fishing boats\n            • Party boats\n            • Wellness/sunset cruise vessels\n            All vessels are verified and meet maritime safety standards.`,
                },
                {
                    question: `Can I bring food or alcohol on board?`,
                    answer: `Yes, on most private rentals. Some boats also offer catering or BYO options. Please check the “What's Included / Not Included” section or ask via WhatsApp.`,
                },
                {
                    question: `Where do the boats depart from in ${city}?`,
                    answer: `Departure points vary by boat but typically include:\n            • City marina\n            • Beachside docks\n            • Private marina access\n            Exact location will be shown after booking.`,
                },
                {
                    question: `How far in advance should I book?`,
                    answer: `We recommend booking at least 2 days in advance, especially for weekends. Same-day bookings may be possible—just contact our team on WhatsApp.`,
                },
            ],
        },
    },
    "things-to-do": {
        tab: "activity",
        type: "activities",
        categoryKey: "activities",
        heroText: (city) =>
            city ? `Things To Do in ${city}` : "Things To Do in Morocco",
        heroSub: () =>
            "Discover and book the best activities Morocco has to offer. From thrilling desert day trips and quad bike tours to authentic guided tours in a Marrakech riad, your next adventure starts here.",
        explore: {
            show: true,
            title: "Top Things to Do in Morocco by City",
            subtitle:
                "Find activities in Morocco's most exciting destinations.",
            items: buildItems("Things To Do in", {
                Marrakech: 100,
                Agadir: 80,
                Casablanca: 70,
                Fez: 60,
                Tangier: 50,
                Essaouira: 30,
            }),
        },
        recommendedClasses: {
            firstNonCity: "agency-listings",
            mainNonCity: "agency-listings",
            mainCity: "agency-listings",
            cityOnly: "agency-listings",
        },
        tabs: [
            { id: 57, name: "Quad" },
            { id: 58, name: "Desert" },
            { id: 78, name: "Camel Ride" },
            { id: 79, name: "Surf" },
        ],
        titles: {
            tabsTitle: (city) =>
                city
                    ? `Browse Top Activities in ${city} by Type`
                    : `Browse by Activity Type`,
            tabsSubtitle: (city) =>
                city
                    ? `Find the Right Experience - Adventure, Culture, Food & More`
                    : `Choose from the most popular experience categories.`,
            cityOnlyTitle: (city) =>
                `Best Experiences in ${city} - Updated Daily`,
            cityOnlySubtitle: (city) =>
                `Featured Tours & Activities in ${city} - Compare Prices & Highlights`,
        },
        freeTextsSlug: "category/things-to-do",
        faq: {
            title: (city) =>
                `Frequently Asked Questions - Things to Do in ${city}`,
            items: (city) => [
                {
                    question: `Are activities in ${city} led by licensed guides?`,
                    answer: `Yes. All our partners are local, verified providers, and many guides are officially licensed. We vet each experience for safety, authenticity, and quality.`,
                },
                {
                    question: `Is hotel pickup included in activity bookings?`,
                    answer: `Most activities offer free pickup from your hotel, riad, or a central meeting point in ${city}. You’ll see exact pickup info before booking.`,
                },
                {
                    question: `Can I cancel my activity booking?`,
                    answer: `Yes. All activities on MarHire include free cancellation up to 48 hours before the scheduled time. Cancellations within 48h may incur fees.`,
                },
                {
                    question: `Are there private experiences available in ${city}?`,
                    answer: `Yes! You can filter listings to show private tours only, or mention it when contacting us via WhatsApp.`,
                },
                {
                    question: `How many people can join an activity?`,
                    answer: `It varies. Most group activities allow 4-12 people.\n                    Private experiences can be arranged for 1 to 20+ guests — contact us for custom group packages.`,
                },
                {
                    question: `Are children allowed in the experiences?`,
                    answer: `Yes. Many activities are family-friendly and clearly marked as such. If unsure, contact us and we’ll guide you to the best option.`,
                },
                {
                    question: `What languages are the tours offered in?`,
                    answer: `Most activities are offered in English, French, and Arabic. Some may also be available in Spanish or German upon request.`,
                },
                {
                    question: `Do I need to bring anything?`,
                    answer: `For most experiences, we provide everything. However, for outdoor or beach activities, we recommend:\n                • Comfortable shoes\n                • Sunscreen\n                • ID or passport copy\n                Check the listing for any additional notes.`,
                },
            ],
        },
    },
};

const UnifiedCategory = ({ slug, city }) => {
    const cfg = CATEGORY_CONFIG[slug] || CATEGORY_CONFIG["car-rental"];
    const categoryId = (() => {
        switch (cfg.categoryKey) {
            case "cars": return 2;
            case "drivers": return 3;
            case "boats": return 4;
            case "activities": return 5;
            default: return 2;
        }
    })();

    // City name to ID mapping (case-insensitive)
    const getCityId = (cityName) => {
        if (!cityName) return null;
        const cityMap = {
            "marrakech": 5,
            "agadir": 3,
            "casablanca": 2,
            "fez": 6,
            "tangier": 7,
            "rabat": 4,
            "essaouira": 9,
            "tetouan": 8
        };
        return cityMap[cityName.toLowerCase()] || null;
    };

    const cityId = city ? getCityId(city) : null;

    return (
        <>
            <HeroSection
                withBar={false}
                text={cfg.heroText(city)}
                subtitle={!city && cfg.heroSub ? cfg.heroSub() : undefined}
                isFull={true}
                tab={cfg.tab}
                city={city}
                cityId={cityId}
                category={slug}
                breadcrumbs={[
                    { name: 'Home', href: '' },
                    { name: cfg.categoryKey === 'cars' ? 'Car Rental' : (cfg.categoryKey === 'drivers' ? 'Private Driver' : (cfg.categoryKey === 'boats' ? 'Boat Rental' : 'Things To Do')), href: `/category/${slug}` },
                    ...(city ? [{ name: city }] : [])
                ]}
            />

            <CategoryWhy categoryKey={cfg.categoryKey} />

            {/* New city carousel replacing old block; CTA on the right */}
            {!city &&<CityCarousel
                title={cfg.explore && cfg.explore.title ? cfg.explore.title : "Find Car Rentals in Morocco's Top Cities"}
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat", "Essaouira"]}
                basePath={`/${cfg.tab}`}
                exploreHref={`/${cfg.tab}`}
            />
}
            {!city &&(() => {
                // Cities tabs to display for quick switching between top destinations
                const defaultCityTabs = ["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat", "Essaouira"];
                const sectionTitle = (cfg.titles && cfg.titles.cityBrowseTitle) ? cfg.titles.cityBrowseTitle() : "Car Hire by City";

                return (
                    <ListingsByCity
                        title={sectionTitle}
                        categories={categoryId}
                        cities={defaultCityTabs}
                        initialCity={city || defaultCityTabs[0]}
                        perPage={12}
                    />
                );
            })()}

           

            {/* Add subcategory types section for all categories */}
            {cfg.tabs && (
                <UnifiedListings
                    title={cfg.titles.tabsTitle(city)}
                    tabs={cfg.tabs}
                    categories={categoryId}
                    subcategories={[]}
                    agencies={[]}
                    cities={city ? [city] : []}
                    perPage={12}
                    page={1}
                    locale={null}
                    disableHeading={false}
                    useSubcategoryFilter={true}
                    subcategoryType="type"
                />
            )}

            {/* Add Brands section only for car rentals */}
            {cfg.categoryKey === "cars" && cfg.brandTabs && (
                <UnifiedListings
                    title={cfg.titles.brandBrowseTitle ? cfg.titles.brandBrowseTitle() : "Browse Car Hire by Brand"}
                    tabs={cfg.brandTabs}
                    categories={categoryId}
                    subcategories={[]}
                    agencies={[]}
                    cities={city ? [city] : []}
                    perPage={12}
                    page={1}
                    locale={null}
                    disableHeading={false}
                    useSubcategoryFilter={true}
                    subcategoryType="brand"
                />
            )}

             {/* Moved popular destinations section below the listings-by-city */}
             <PopularDestinations
                cities={["Agadir", "Marrakech", "Casablanca", "Fez", "Tangier", "Rabat", "Essaouira"]}
            />
            <FreeTexts slug={`category/${slug}`} />
            <Footer />
        </>
    );
};

export default UnifiedCategory;
