import React, { useState, useEffect } from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTiktok,
    FaWhatsapp,
    FaPinterest,
    FaYoutube,
    FaTwitter,
    FaLinkedin,
    FaCcVisa,
    FaCcMastercard,
    FaCcPaypal,
    FaStripe,
    FaEnvelope,
    FaChevronDown,
} from "react-icons/fa";

const socialLinks = [
    {
        icon: <FaFacebookF />,
        link: "https://www.facebook.com/profile.php?id=61574828086317&mibextid=wwXIfr",
    },
    { icon: <FaInstagram />, link: "https://www.instagram.com/marhirecom/" },
    { icon: <FaTiktok />, link: "https://www.tiktok.com/@marhirecom" },
    { icon: <FaWhatsapp />, link: "http://wa.me/212660745055" },
    { icon: <FaPinterest />, link: "https://www.pinterest.com/marhirecom/" },
    { icon: <FaYoutube />, link: "https://www.youtube.com/@MarHire" },
    { icon: <FaTwitter />, link: "https://x.com/marhirecom" },
    { icon: <FaLinkedin />, link: "#" },
];

const paymentIcons = [
    {name:'Union', path:'https://marhire.bytech.ma/images/payments/unionpay.png'},
    {name:'MasterCard', path:'https://marhire.bytech.ma/images/payments/mastercard.png'},
    {name:'Visa', path:'https://marhire.bytech.ma/images/payments/visa.png'},
    {name:'Amex', path:'https://marhire.bytech.ma/images/payments/amex.png'},
    {name:'JCB', path:'https://marhire.bytech.ma/images/payments/jcb.png'},
    {name:'Diners', path:'https://marhire.bytech.ma/images/payments/diners.png'},
    {name:'Discover', path:'https://marhire.bytech.ma/images/payments/discover.png'},
    {name:'Apple Pay', path:'https://marhire.bytech.ma/images/payments/applepay.png'},
    {name:'Paypal', path:'https://marhire.bytech.ma/images/payments/paypal.png'},
    {name:'CMI', path:'https://marhire.bytech.ma/images/payments/cmi.png'},
];

const FooterSection = ({ title, children }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    return (
        <div className="footer-section">
            <div
                className="footer-title"
                onClick={() => isMobile && setOpen(!open)}
            >
                <span>{title}</span>
                {isMobile && (
                    <FaChevronDown
                        className={`chevron ${open ? "rotate" : ""}`}
                    />
                )}
            </div>
            {open && <div className="footer-links">{children}</div>}
        </div>
    );
};

const Footer = () => {
    return (
        <footer style={{ color: "#203233" }} className="footer">
            <div className="footer-container">
                <FooterSection title="Company">
                    <ul>
                        <li>
                            <a href="/about-us">About MarHire</a>
                        </li>
                        <li>
                            <a href="/support">Support</a>
                        </li>
                        <li>
                            <a href="/how-we-work">How We Work</a>
                        </li>
                        <li>
                            <a href="/list-your-property">List Your Property</a>
                        </li>
                        <li>
                            <a href="/faq">FAQs</a>
                        </li>
                        <li>
                            <a href="/blog">Travel Articles</a>
                        </li>
                        <li>
                            <a href="/sitemap.xml">Sitemap</a>
                        </li>
                    </ul>
                </FooterSection>
                <FooterSection title="Legal & Policy">
                    <ul>
                        <li>
                            <a href="/terms-conditions">Terms & Conditions</a>
                        </li>
                        <li>
                            <a href="/privacy-policy">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/cookie-policy">Cookie Policy</a>
                        </li>
                        <li>
                            <a href="/cancellation-policy">Cancelation Policy</a>
                        </li>
                        <li>
                            <a href="/insurance-conditions">Insurance Conditions</a>
                        </li>
                    </ul>
                </FooterSection>
                <FooterSection title="Language & Support">
                    <ul>
                        <li>
                            <a href="/support">Help Center</a>
                        </li>
                        <li>
                            <a href="http://wa.me/212660745055">
                                WhatsApp Chat Support
                            </a>
                        </li>
                        <li>
                            <a href="/support">24/7 Local Assistance</a>
                        </li>
                    </ul>
                </FooterSection>

                {/* <FooterSection title="Discover Morocco">
                    <ul>
                        {[
                            "Marrakech",
                            "Agadir",
                            "Casablanca",
                            "Fes",
                            "Tangier",
                            "Rabat",
                        ].map((city) => (
                            <li key={city}>
                                <a href="#">{`Car Rental in ${city}`}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#">Luxury Car Rental Morocco</a>
                        </li>
                        <li>
                            <a href="#">Cheap Car Rental Morocco</a>
                        </li>
                    </ul>
                </FooterSection>

                <FooterSection title="Private Drivers">
                    <ul>
                        {[
                            "Marrakech",
                            "Agadir",
                            "Tangier",
                            "Casablanca",
                            "Fes",
                            "Rabat",
                        ].map((city) => (
                            <li key={city}>
                                <a href="#">{`Private Driver ${city}`}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#">Airport Transfer Morocco</a>
                        </li>
                        <li>
                            <a href="#">Intercity Drivers Morocco</a>
                        </li>
                    </ul>
                </FooterSection>

                <FooterSection title="Boats & Yachts">
                    <ul>
                        {[
                            "Marrakech",
                            "Agadir",
                            "Tangier",
                            "Casablanca",
                            "Fes",
                            "Rabat",
                        ].map((city) => (
                            <li key={city}>
                                <a href="#">{`Boat Rental ${city}`}</a>
                            </li>
                        ))}
                        <li>
                            <a href="#">Yacht Charter Morocco</a>
                        </li>
                        <li>
                            <a href="#">Sunset Cruise Agadir</a>
                        </li>
                        <li>
                            <a href="#">Fishing Boats Morocco</a>
                        </li>
                        <li>
                            <a href="#">Party Boat Rentals</a>
                        </li>
                    </ul>
                </FooterSection>

                <FooterSection title="Things to Do">
                    <ul>
                        <li>
                            <a href="#">Camel Rides in Morocco</a>
                        </li>
                        <li>
                            <a href="#">Quad Biking in Morocco</a>
                        </li>
                        <li>
                            <a href="#">Surfing in Morocco</a>
                        </li>
                        <li>
                            <a href="#">Hiking in Morocco</a>
                        </li>
                        <li>
                            <a href="#">Cultural Tours in Morocco</a>
                        </li>
                        <li>
                            <a href="#">Jet Ski & Beach Activities</a>
                        </li>
                    </ul>
                </FooterSection>

                <FooterSection title="Contact">
                    <ul>
                        <li>
                            <a
                                href="mailto:info@marhire.com"
                                className="footer-item"
                            >
                                <span className="footer-item__icon">
                                    <FaEnvelope />
                                </span>{" "}
                                info@marhire.com
                            </a>
                        </li>
                        <li>
                            <a
                                href="http://wa.me/212660745055"
                                className="footer-item"
                            >
                                <span className="footer-item__icon">
                                    <FaWhatsapp />
                                </span>{" "}
                                +212 6 60 74 50 55
                            </a>
                        </li>
                    </ul>
                </FooterSection> */}
            </div>
            {/* <div className="footer-socials">
                {socialLinks.map((s, i) => (
                    <a
                        key={i}
                        href={s.link}
                        target="_blank"
                        rel="noreferrer"
                        className="social-icon"
                    >
                        {s.icon}
                    </a>
                ))}
            </div> */}

            <div className="footer-socs">
                <div className="footer-socs--col">
                    <div className="footer-socs--title">Payment Methods</div>
                    <div className="footer-payments">
                        {paymentIcons.map((payment, i) => (
                            <img src={payment.path} key={i} className="payment-icon" alt={payment.name}/>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="footer-socs--title">Social Media</div>
                    <div className="footer-socials">
                        {socialLinks.map((s, i) => (
                            <a
                                key={i}
                                href={s.link}
                                target="_blank"
                                rel="noreferrer"
                                className="social-icon"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* <div className="footer-socials">
                    {socialLinks.map((s, i) => (
                        <a
                            key={i}
                            href={s.link}
                            target="_blank"
                            rel="noreferrer"
                            className="social-icon"
                        >
                            {s.icon}
                        </a>
                    ))}
                </div> */}
            </div>
            <div className="footer--contactInfos">
                <a href="mailto:info@marhire.com">
                    <span className="footer-item__icon">
                        <FaEnvelope />
                    </span>{" "}
                    info@marhire.com
                </a>

                <a href="http://wa.me/212660745055">
                    <span className="footer-item__icon">
                        <FaWhatsapp />
                    </span>{" "}
                    +212 6 60 74 50 55
                </a>
            </div>
            <div className="footer-bottom">
                <p className="copyright">
                    © 2025 MarHire.com. All rights reserved. MarHire is a
                    registered brand under MarHire LLC.
                </p>
                {/* <div className="footer-payments">
                    {paymentIcons.map((icon, i) => (
                        <span key={i} className="payment-icon">
                            {icon}
                        </span>
                    ))}
                </div>  */}
            </div>
        </footer>
    );
};

export default Footer;
