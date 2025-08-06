import ReactDOM from "react-dom/client";
import React from "react";
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

if (totalBookingsPerMonthCard) {
    const root = ReactDOM.createRoot(totalBookingsPerMonthCard);

    root.render(<TotalBookingsPerMonth />);
}
if (homeRoot) {
    const root = ReactDOM.createRoot(homeRoot);

    root.render(<Home />);
}
if (aboutUsRoot) {
    const root = ReactDOM.createRoot(aboutUsRoot);

    root.render(<AboutUs />);
}
if (listPropertyRoot) {
    const root = ReactDOM.createRoot(listPropertyRoot);

    root.render(<ListYourProperty />);
}
if (howWeWorkRoot) {
    const root = ReactDOM.createRoot(howWeWorkRoot);

    root.render(<HowWeWork />);
}
if (faqRoot) {
    const root = ReactDOM.createRoot(faqRoot);

    root.render(<FAQ />);
}
if (partnersRoot) {
    const root = ReactDOM.createRoot(partnersRoot);

    root.render(<Partners />);
}
if (supportRoot) {
    const root = ReactDOM.createRoot(supportRoot);

    root.render(<Support />);
}
if (categoryRoot) {
    const root = ReactDOM.createRoot(categoryRoot);
    const slug = categoryRoot.dataset.slug;
    const city = categoryRoot.dataset.city;

    root.render(<Category slug={slug} city={city} />);
}
if (subcategoryRoot) {
    const root = ReactDOM.createRoot(subcategoryRoot);
    const category = subcategoryRoot.dataset.category;
    const subcategory = subcategoryRoot.dataset.subcategory;

    root.render(<SubCategory category={category} subcategory={subcategory} />);
}
if (listingRoot) {
    const root = ReactDOM.createRoot(listingRoot);
    const slug = listingRoot.dataset.slug;

    root.render(<Listing slug={slug} />);
}
if (searchRoot) {
    const root = ReactDOM.createRoot(searchRoot);
    const type = searchRoot.dataset.type;

    root.render(<Search type={type} />);
}
if (cityRoot) {
    const root = ReactDOM.createRoot(cityRoot);
    const city = cityRoot.dataset.city;

    root.render(<City city={city} />);
}

if (agencyRoot) {
    const root = ReactDOM.createRoot(agencyRoot);
    const agency = agencyRoot.dataset.agency;

    root.render(<Agency slug={agency} />);
}
if (legalRoot) {
    const root = ReactDOM.createRoot(legalRoot);
    const title = legalRoot.dataset.title;
    const type = legalRoot.dataset.type;

    root.render(<Legal type={type} title={title} />);
}

if (blogRoot) {
    const root = ReactDOM.createRoot(blogRoot);

    root.render(<Blog />);
}
if (articleRoot) {
    const root = ReactDOM.createRoot(articleRoot);

    const slug = articleRoot.dataset.slug;

    root.render(<Article slug={slug} />);
}

// Initialize the Booking Email Manager
initBookingEmailManager();
