import "./bootstrap"; // Import axios configuration
import ReactDOM from "react-dom/client";
import React, { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { LanguageProvider } from "./contexts/LanguageContext";
import { initializeLocale } from "./utils/localeManager";
import TotalBookingsPerMonth from "./components/TotalBookingsPerMonth";
import Home from "./pages/Home";
import "../../globals.css";
import "../css/app.css";
import AboutUs from "./pages/AboutUs";
import ListYourProperty from "./pages/ListYourProperty";
import HowWeWork from "./pages/HowWeWork";
import FAQ from "./pages/FAQ";
import Partners from "./pages/Partners";
import Support from "./pages/Support";
import Category from "./pages/Category";
import City from "./pages/City";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import Agency from "./pages/Agency";
import Blog from "./pages/Blog";
import Legal from "./pages/Legal";
import Article from "./pages/Article";
import SubCategory from "./pages/SubCategory";
import { initBookingEmailManager } from "./components/BookingEmailManager";

// Check if we're on an admin route
const isAdminRoute = () => {
    const path = window.location.pathname;
    const adminPatterns = [
        'login', 'logout', 'password', 'dashboard', 'notifications',
        'pages', 'categories', 'subcategories', 'terms', 'cities',
        'societes', 'listings', 'listing_addons', 'coupons', 'bookings',
        'articles', 'agencies', 'profile', 'users', 'admin', 'settings'
    ];
    return adminPatterns.some(pattern => 
        path === '/' + pattern || path.startsWith('/' + pattern + '/')
    );
};

// Initialize locale management only for non-admin routes
const shouldRenderApp = isAdminRoute() ? true : initializeLocale();

// Loading fallback component
const LoadingFallback = () => (
    <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
);

// Expose a tiny bridge so non-React navbar switcher can trigger i18n language change
declare global {
    interface Window {
        appI18n?: { change: (lng: string) => Promise<void> | void };
    }
}

if (typeof window !== "undefined") {
    window.appI18n = {
        change: (lng: string) => {
            // Normalize return type to void to satisfy TS and callers
            return i18n.changeLanguage(lng).then(() => {});
        },
    };
}

// Wrapper component for i18n
const AppWrapper = ({ children }: { children: React.ReactNode }) => (
    <I18nextProvider i18n={i18n}>
        <LanguageProvider>
            <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
        </LanguageProvider>
    </I18nextProvider>
);

const totalBookingsPerMonthCard = document.getElementById(
    "totalBookingsPerMonthCard"
);
const homeRoot = document.getElementById("home_root");
const aboutUsRoot = document.getElementById("about_root");
const listPropertyRoot = document.getElementById("list_property_root");
const howWeWorkRoot = document.getElementById("how_we_work_root");
const faqRoot = document.getElementById("faq_root");
const partnersRoot = document.getElementById("partners_root");
const supportRoot = document.getElementById("support_root");
const categoryRoot = document.getElementById("category_root");
const subcategoryRoot = document.getElementById("subcategory_root");
const cityRoot = document.getElementById("city_root");
const listingRoot = document.getElementById("listing_root");
const searchRoot = document.getElementById("search_root");
const agencyRoot = document.getElementById("agency_root");
const blogRoot = document.getElementById("blog_root");
const legalRoot = document.getElementById("legal_root");
const articleRoot = document.getElementById("article_root");

// Only render if not redirecting
if (shouldRenderApp) {
    if (totalBookingsPerMonthCard) {
        const root = ReactDOM.createRoot(totalBookingsPerMonthCard);

        root.render(
            <AppWrapper>
                <TotalBookingsPerMonth />
            </AppWrapper>
        );
    }
    if (homeRoot) {
        const root = ReactDOM.createRoot(homeRoot);

        root.render(
            <AppWrapper>
                <Home />
            </AppWrapper>
        );
    }
    if (aboutUsRoot) {
    const root = ReactDOM.createRoot(aboutUsRoot);

    root.render(
        <AppWrapper>
            <AboutUs />
        </AppWrapper>
    );
}
if (listPropertyRoot) {
    const root = ReactDOM.createRoot(listPropertyRoot);

    root.render(
        <AppWrapper>
            <ListYourProperty />
        </AppWrapper>
    );
}
if (howWeWorkRoot) {
    const root = ReactDOM.createRoot(howWeWorkRoot);

    root.render(
        <AppWrapper>
            <HowWeWork />
        </AppWrapper>
    );
}
if (faqRoot) {
    const root = ReactDOM.createRoot(faqRoot);

    root.render(
        <AppWrapper>
            <FAQ />
        </AppWrapper>
    );
}
if (partnersRoot) {
    const root = ReactDOM.createRoot(partnersRoot);

    root.render(
        <AppWrapper>
            <Partners />
        </AppWrapper>
    );
}
if (supportRoot) {
    const root = ReactDOM.createRoot(supportRoot);

    root.render(
        <AppWrapper>
            <Support />
        </AppWrapper>
    );
}
if (categoryRoot) {
    const root = ReactDOM.createRoot(categoryRoot);
    const slug = categoryRoot.dataset.slug;
    const city = categoryRoot.dataset.city;

    root.render(
        <AppWrapper>
            <Category slug={slug} city={city} />
        </AppWrapper>
    );
}
if (subcategoryRoot) {
    const root = ReactDOM.createRoot(subcategoryRoot);
    const category = subcategoryRoot.dataset.category;
    const subcategory = subcategoryRoot.dataset.subcategory;

    root.render(
        <AppWrapper>
            <SubCategory category={category} subcategory={subcategory} />
        </AppWrapper>
    );
}
if (listingRoot) {
    const root = ReactDOM.createRoot(listingRoot);
    const slug = listingRoot.dataset.slug;

    root.render(
        <AppWrapper>
            <Listing slug={slug} />
        </AppWrapper>
    );
}
if (searchRoot) {
    const root = ReactDOM.createRoot(searchRoot);
    const type = searchRoot.dataset.type;

    root.render(
        <AppWrapper>
            <Search type={type} />
        </AppWrapper>
    );
}
if (cityRoot) {
    const root = ReactDOM.createRoot(cityRoot);
    const city = cityRoot.dataset.city;

    root.render(
        <AppWrapper>
            <City city={city} />
        </AppWrapper>
    );
}

if (agencyRoot) {
    const root = ReactDOM.createRoot(agencyRoot);
    const agency = agencyRoot.dataset.agency;

    root.render(
        <AppWrapper>
            <Agency slug={agency} />
        </AppWrapper>
    );
}
if (legalRoot) {
    const root = ReactDOM.createRoot(legalRoot);
    const title = legalRoot.dataset.title;
    const type = legalRoot.dataset.type;

    root.render(
        <AppWrapper>
            <Legal type={type} title={title} />
        </AppWrapper>
    );
}

if (blogRoot) {
    const root = ReactDOM.createRoot(blogRoot);

    root.render(
        <AppWrapper>
            <Blog />
        </AppWrapper>
    );
}
if (articleRoot) {
    const root = ReactDOM.createRoot(articleRoot);

    const slug = articleRoot.dataset.slug;

    root.render(
        <AppWrapper>
            <Article slug={slug} />
        </AppWrapper>
    );
}

    // Initialize the Booking Email Manager
    initBookingEmailManager();
} // End of shouldRenderApp check
