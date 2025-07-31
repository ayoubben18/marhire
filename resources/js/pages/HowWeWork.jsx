import React from "react";
import HeroSection3 from "../components/site/HeroSection3";
import Footer from "../components/site/Footer";
import "../../css/how-we-work.css";
import HeroSection2 from "../components/site/HeroSection2";
import FAQSection from "../components/site/FAQSection";
import FreeTexts from "../components/site/FreeTexts";

const HowWeWork = () => {
    const faqs = [
        {
            question: "Pricing, Payment, and Commission",
            answer: "The prices listed on MarHire include all service fees. We charge a small commission to our local partners, not to you. In some cases, we may take a small upfront payment as a reservation fee (especially for car rentals). This will be clearly shown during booking. Most services are paid in cash or card upon arrival directly to the service provider.",
        },
        {
            question: "Service Quality and Listings",
            answer: "We only work with approved and verified agencies that meet our standards for: Clean and well-maintained vehicles and boats, Licensed, professional drivers and guides, Reliable customer support, Transparent pricing and fair policies. If an agency fails to meet our criteria or violates terms, they are delisted or suspended from the platform. We reserve the right to highlight or rank listings based on quality, customer reviews, and service performance. We do not sell ranking positions.",
        },
        {
            question: "Trust, Insurance & Cancellation",
            answer: "Most car rentals include standard insurance with optional upgrades. Boat and tour operators include safety coverage and comply with local safety laws. Each listing clearly mentions cancellation policies and any applicable fees. We advise travelers to carry travel insurance that covers medical, theft, and trip interruption.",
        },
        {
            question: "Disputes & Support",
            answer: "If something goes wrong: Contact us anytime via WhatsApp or email. We coordinate with the provider to resolve issues or mediate refunds. Notify us during your trip for quick action. Leave a review to help future travelers.",
        },
        {
            question: "Transparency in Search & Ranking",
            answer: "Listings are shown based on location, availability, service type, and verified quality. We prioritize providers with better reviews, faster confirmations, and higher satisfaction. Some sections (e.g., 'Recommended' or 'Top Rated') highlight consistently exceptional partners. We do not allow paid ads or misleading promoted listings.",
        },
        {
            question: "Legal & Contractual",
            answer: "MarHire LLC is operated by a registered Moroccan company under ICE number: 003723937000021 and Trade Register (RC) number: 33517. All service providers agree to operate under MarHire's Terms and Conditions. Your contract is with the local provider, who must comply with our standards. MarHire facilitates connections and ensures accountability. Provider details are shown during checkout or in confirmation emails. MarHire may process upfront reservation fees for partners. Providers violating rules may be suspended or delisted.",
        },
    ];

    return (
        <>
            <div className="how-it-works">
                <HeroSection2 bgImg="https://marhire.bytech.ma/images/banner2.png" />
                <section className="first-sect">
                    <h1>How MarHire Works</h1>
                    <p>
                        Welcome to MarHire your trusted travel platform for
                        exploring Morocco with local partners you can rely on.
                        This page explains how our website and service operate,
                        who you're booking with, and how we ensure every
                        traveler gets a smooth, fair, and secure experience.
                    </p>
                </section>

                {/* Who We Are Section */}
                <section className="section">
                    <div className="section-head">
                        <h2 className="section-title">Who We Are</h2>
                    </div>
                    <div>
                        <p>
                            MarHire is a travel platform that connects travelers
                            with{" "}
                            <strong>
                                local car rental agencies, private drivers, boat
                                rental operators, and tour providers
                            </strong>{" "}
                            across Morocco. We do not own the cars, boats, or
                            experiences directly - instead, we partner with
                            carefully selected local providers and allow you to
                            book with them through our platform.
                        </p>
                        <p>
                            We act as an <strong>intermediary</strong> that
                            facilitates the booking process and ensures
                            transparency, verified listings, and high service
                            quality.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <div className="section-head">
                        <h2 className="section-title">How Bookings Work</h2>
                    </div>
                    <div className="booking-steps">
                        <div className="step">
                            <div className="number">1</div>
                            <h3>You choose</h3>
                            <p>
                                Select a service on MarHire.com and pick your
                                dates, options, and preferences.
                            </p>
                        </div>
                        <div className="step">
                            <div className="number">2</div>
                            <h3>You fill in</h3>
                            <p>
                                Provide your contact details and submit the
                                booking form (no login required).
                            </p>
                        </div>
                        <div className="step">
                            <div className="number">3</div>
                            <h3>We verify</h3>
                            <p>
                                We check availability with the provider and send
                                you confirmation via email or WhatsApp.
                            </p>
                        </div>
                        <div className="step">
                            <div className="number">4</div>
                            <h3>You pay</h3>
                            <p>
                                Pay the provider directly upon arrival unless a
                                deposit is required (clearly indicated).
                            </p>
                        </div>

                        {/* <div className="service-details">
                            <div className="service-card">
                                <div className="service-icon">🚗</div>
                                <h3>Car Rentals</h3>
                                <ul>
                                    <li>Select car type, dates, and add-ons</li>
                                    <li>
                                        We confirm availability with the agency
                                    </li>
                                    <li>
                                        Most economy cars require no deposit
                                    </li>
                                    <li>Payment is made on arrival</li>
                                </ul>
                            </div>
                            <div className="service-card">
                                <div className="service-icon">👨‍✈️</div>
                                <h3>Private Drivers</h3>
                                <ul>
                                    <li>
                                        Choose service type and route details
                                    </li>
                                    <li>
                                        We assign a bilingual professional
                                        driver
                                    </li>
                                    <li>Transparent pricing per hour or day</li>
                                    <li>Pay on site</li>
                                </ul>
                            </div>
                            <div className="service-card">
                                <div className="service-icon">🚤</div>
                                <h3>Boat Rentals</h3>
                                <ul>
                                    <li>Select boat type and duration</li>
                                    <li>See what's included in the package</li>
                                    <li>Quick confirmation</li>
                                    <li>Some may require partial prepayment</li>
                                </ul>
                            </div>
                            <div className="service-card">
                                <div className="service-icon">🏜️</div>
                                <h3>Activities & Tours</h3>
                                <ul>
                                    <li>Choose from various experiences</li>
                                    <li>See group size and difficulty level</li>
                                    <li>Confirmation after provider accepts</li>
                                    <li>Most payable on-site</li>
                                </ul>
                            </div>
                        </div> */}
                    </div>
                </section>

                <FAQSection faqsData={faqs}/>

                {/* Listing CTA Section */}
                <section className="section">
                        <div className="section-head">
                            <h2 className="section-title">Listing on MarHire</h2>
                        </div>
                        <div className="content">
                            <p>
                                If you are a local provider of travel services
                                in Morocco (car rental, driver, boat, tours),
                                you can apply to list your services. We approve
                                providers based on:
                            </p>
                            <ul className="approval-list">
                                <li>Business legitimacy</li>
                                <li>Quality of service</li>
                                <li>Customer satisfaction</li>
                                <li>Responsiveness and transparency</li>
                            </ul>
                            <a
                                href="/list-your-property"
                                className="cta-button"
                            >
                                Apply to List Your Service
                            </a>
                        </div>
                </section>
                <FreeTexts slug="how-we-work" />
            </div>
            <Footer />
        </>
    );
};

export default HowWeWork;
