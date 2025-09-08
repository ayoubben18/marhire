import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";
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
    FaCar,
    FaUserTie,
    FaShip,
    FaMountain,
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
    {name:'UnionPay', path:'/images/pay/unionpay.png'},
    {name:'MasterCard', path:'/images/pay/mastercard.png'},
    {name:'Visa', path:'/images/pay/visa.png'},
    {name:'Amex', path:'/images/pay/amex.png'},
    {name:'Diners', path:'/images/pay/diners.png'},
    {name:'Apple Pay', path:'/images/pay/applepay.png'},
    {name:'Paypal', path:'/images/pay/paypal.png'},
    {name:'CMI', path:'/images/pay/cmi.png'},
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
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('cars');

    const CITIES = [
        { key: 'agadir', label: t('cities.agadir', 'Agadir') },
        { key: 'marrakech', label: t('cities.marrakech', 'Marrakech') },
        { key: 'casablanca', label: t('cities.casablanca', 'Casablanca') },
        { key: 'fes', label: t('cities.fes', 'Fes') },
        { key: 'tangier', label: t('cities.tangier', 'Tangier') },
        { key: 'essaouira', label: t('cities.essaouira', 'Essaouira') },
        { key: 'rabat', label: t('cities.rabat', 'Rabat') },
    ];

    const CATEGORY_CONFIGS = {
        cars: {
            icon: <FaCar className="mr-2" />,
            title: t('footerTabs.cars', 'Cars'),
            slug: 'car-rental',
            subcategories: [
                { key: 'suv', label: t('footerTabs.cars.suv', 'SUV Rental') },
                { key: 'mpv', label: t('footerTabs.cars.mpv', 'MPV & Van Rental') },
                { key: 'sedan', label: t('footerTabs.cars.sedan', 'Sedan Rental') },
                { key: 'hatchback', label: t('footerTabs.cars.hatchback', 'Hatchback Rental') },
                { key: 'dacia', label: t('footerTabs.cars.dacia', 'Dacia Rentals') },
                { key: 'audi', label: t('footerTabs.cars.audi', 'Audi Rentals') },
            ],
            cityLabel: (city) => t('footerTabs.cars.city', `Car Rental ${city}`),
            subcatCityLabel: (sub, city) => t('footerTabs.cars.subCity', `${sub} in ${city}`),
        },
        drivers: {
            icon: <FaUserTie className="mr-2" />,
            title: t('footerTabs.drivers', 'Private Drivers'),
            slug: 'private-driver',
            subcategories: [
                { key: 'airport-transfer', label: t('footerTabs.drivers.airport', 'Airport Transfers') },
                { key: 'intercity', label: t('footerTabs.drivers.intercity', 'Intercity Transfers') },
                { key: 'suv', label: t('footerTabs.drivers.suv', 'SUV with Driver') },
                { key: 'van', label: t('footerTabs.drivers.van', 'Van with Driver') },
                { key: 'minivan', label: t('footerTabs.drivers.minivan', 'Minivan with Driver') },
                { key: 'sedan', label: t('footerTabs.drivers.sedan', 'Sedan with Driver') },
            ],
            cityLabel: (city) => t('footerTabs.drivers.city', `Private Driver ${city}`),
            subcatCityLabel: (sub, city) => t('footerTabs.drivers.subCity', `${sub} ${t('footerTabs.drivers.in','in')} ${city}`),
        },
        boats: {
            icon: <FaShip className="mr-2" />,
            title: t('footerTabs.boats', 'Boats'),
            slug: 'boats',
            subcategories: [
                { key: 'yacht', label: t('footerTabs.boats.yacht', 'Yacht Charters') },
                { key: 'luxury-yacht', label: t('footerTabs.boats.luxuryYacht', 'Luxury Yacht Charters') },
                { key: 'speedboat', label: t('footerTabs.boats.speedboat', 'Speedboat Rentals') },
                { key: 'fishing-boat', label: t('footerTabs.boats.fishing', 'Fishing Boat Charters') },
                { key: 'party-boat', label: t('footerTabs.boats.party', 'Party Boat Rentals') },
            ],
            cityLabel: (city) => t('footerTabs.boats.city', `Boat Rental ${city}`),
            subcatCityLabel: (sub, city) => t('footerTabs.boats.subCity', `${sub} ${t('footerTabs.boats.in','in')} ${city}`),
        },
        activities: {
            icon: <FaMountain className="mr-2" />,
            title: t('footerTabs.activities', 'Activities'),
            slug: 'things-to-do',
            subcategories: [
                { key: 'camel-ride', label: t('footerTabs.activities.camel', 'Camel Ride Tours') },
                { key: 'desert-tour', label: t('footerTabs.activities.desert', 'Desert Tours') },
                { key: 'quad', label: t('footerTabs.activities.quad', 'Quad Biking') },
                { key: 'horse-ride', label: t('footerTabs.activities.horse', 'Horse Riding') },
                { key: 'jetski', label: t('footerTabs.activities.jetski', 'Jet Ski') },
                { key: 'private-activities', label: t('footerTabs.activities.private', 'Private Activities') },
            ],
            cityLabel: (city) => t('footerTabs.activities.city', `Activities in ${city}`),
            subcatCityLabel: (sub, city) => t('footerTabs.activities.subCity', `${sub} ${t('footerTabs.activities.in','in')} ${city}`),
        },
    };

    const renderTabContent = () => {
        const cfg = CATEGORY_CONFIGS[activeTab];
        if (!cfg) return null;
        const cityLinks = CITIES.slice(0, 6).map((c) => ({
            href: getLocalizedUrl(`/category/${cfg.slug}/city/${c.key}`),
            label: cfg.cityLabel(c.label),
        }));
        const subcatLinks = cfg.subcategories.map((s) => ({
            href: getLocalizedUrl(`/category/${cfg.slug}/subcategory/${s.key}`),
            label: s.label,
        }));
        const subcatCityCombos = [];
        cfg.subcategories.slice(0, 3).forEach((s) => {
            CITIES.slice(0, 3).forEach((c) => {
                subcatCityCombos.push({
                    href: getLocalizedUrl(`/category/${cfg.slug}/subcategory/${s.key}/city/${c.key}`),
                    label: cfg.subcatCityLabel(s.label, c.label),
                });
            });
        });

        const allLinks = [
            { href: getLocalizedUrl(`/category/${cfg.slug}`), label: t('footerTabs.browseAll', `Explore ${cfg.title}`) },
            ...cityLinks,
            ...subcatLinks,
            ...subcatCityCombos,
        ];

        return (
            <ul className="footer-link-grid">
                {allLinks.map((l, idx) => (
                    <li key={idx}>
                        <a href={l.href} className="d-inline-block footer-tab-link">
                            {l.label}
                        </a>
                    </li>
                ))}
            </ul>
        );
    };
    
    return (
        <footer style={{ color: "#203233" }} className="footer">
            <div className="footer-tabs-wrap" style={{ maxWidth: 1140, margin: '0 auto', paddingLeft: 12, paddingRight: 12 }}>
                <style>{`
                    .footer-tab-link { color:#627577; font-weight:500; text-decoration:none; transition: color .15s ease; font-size:.95rem; }
                    .footer-tab-link:hover { color:#048667; text-decoration:none; }
                    .footer-link-grid { display:grid; grid-auto-flow: column; grid-template-rows: repeat(5, minmax(0, auto)); column-gap:24px; row-gap:8px; margin-top:8px; }
                    @media (max-width: 768px) {
                        .footer-link-grid { grid-auto-flow: row; grid-template-rows: none; grid-template-columns: repeat(2, minmax(0,1fr)); column-gap:12px; row-gap:6px; }
                        .footer-tabs-wrap { padding-left: 6px !important; padding-right: 6px !important; }
                    }
                `}</style>
                <div className="border rounded-lg p-2 md:p-3 mb-3" style={{ background: '#f8fbfa', borderColor: '#e7eeec' }}>
                    <h3 className="text-center font-weight-bold mb-2" style={{ color: '#203233', fontSize: '1.05rem' }}>
                        {t('footerTabs.title', 'Browse Our Services by Category')}
                    </h3>
                    <div className="mb-2" style={{ background: '#f3f4f4', borderRadius: 10, padding: '6px 6px' }}>
                        <div className="d-flex flex-wrap justify-content-center gap-2">
                            {Object.entries(CATEGORY_CONFIGS).map(([key, cfg]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveTab(key)}
                                    aria-pressed={activeTab === key}
                                    className="btn"
                                    style={{
                                        backgroundColor: activeTab === key ? '#ffffff' : 'transparent',
                                        color: '#627577',
                                        border: activeTab === key ? '1px solid #e5ebed' : '1px solid transparent',
                                        borderRadius: 8,
                                        padding: '6px 10px',
                                        fontWeight: 600,
                                        fontSize: '0.95rem',
                                        lineHeight: 1.2,
                                        boxShadow: activeTab === key ? '0 1px 2px rgba(16,24,40,.04)' : 'none',
                                    }}
                                >
                                    <span className="d-inline-flex align-items-center">
                                        <span className="mr-2" style={{ display: 'inline-flex' }}>{cfg.icon}</span>
                                        {cfg.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                    {renderTabContent()}
                </div>
            </div>
            <div className="footer-container">
                <FooterSection title={t('footer.exploreMarHire', 'Explore MarHire')}>
                    <ul>
                        <li>
                            <a href={getLocalizedUrl('/car-search')}>{t('categories.carRental', 'Car Rentals')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/private-search')}>{t('categories.privateDriver', 'Private Drivers')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/boat-search')}>{t('categories.boatRental', 'Boat Rentals')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/thingstodo-search')}>{t('footer.explore.activitiesTours', 'Activities & Tours')}</a>
                        </li>
                    </ul>
                </FooterSection>
                <FooterSection title={t('footer.topDestinations', 'Top Destinations')}>
                    <ul>
                        {[
                            { key: 'agadir', label: t('cities.agadir', 'Agadir') },
                            { key: 'marrakech', label: t('cities.marrakech', 'Marrakech') },
                            { key: 'casablanca', label: t('cities.casablanca', 'Casablanca') },
                            { key: 'fes', label: t('cities.fes', 'Fes') },
                            { key: 'tangier', label: t('cities.tangier', 'Tangier') },
                            { key: 'essaouira', label: t('cities.essaouira', 'Essaouira') },
                            { key: 'rabat', label: t('cities.rabat', 'Rabat') },
                        ].map((city) => (
                            <li key={city.key}>
                                <a href={getLocalizedUrl(`/city/${city.key}`)}>{city.label}</a>
                            </li>
                        ))}
                    </ul>
                </FooterSection>
                <FooterSection title={t('footer.company')}>
                    <ul>
                        <li>
                            <a href={getLocalizedUrl('/about-us')}>{t('navigation.aboutUs', 'About Us')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/partners')}>{t('partners.breadcrumb', 'Our Partners')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/support')}>{t('navigation.support')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/list-your-property')}>{t('joinUs.breadcrumb', 'Become a Partner')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/faq')}>{t('navigation.faqs')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/sitemap')}>{t('navigation.sitemap', 'Sitemap')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/blog')}>{t('navigation.travelBlog', 'Travel Blog')}</a>
                        </li>
                    </ul>
                </FooterSection>
                <FooterSection title={t('footer.legalPolicy')}>
                    <ul>
                        <li>
                            <a href={getLocalizedUrl('/terms-conditions')}>{t('footer.termsConditions')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/privacy-policy')}>{t('footer.privacyPolicy')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/cookie-policy')}>{t('footer.cookiePolicy')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/cancellation-policy')}>{t('footer.cancellationPolicy')}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl('/insurance-conditions')}>{t('footer.insuranceConditions')}</a>
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

            <div className="mt-4 pt-4" style={{ borderTop: '1px solid #e5ebed' }}>
                <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
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
                    <div className="d-flex align-items-center gap-2">
                        <strong style={{ marginRight: 8 }}>{t('footer.paymentsLabel', 'Payments:')}</strong>
                        <div className="footer-payments">
                            {paymentIcons.map((payment, i) => (
                                <img src={payment.path} key={i} className="payment-icon" alt={payment.name} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p className="copyright">
                    {t('footer.copyright')}
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
