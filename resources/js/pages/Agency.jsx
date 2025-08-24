import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import { FaRegCalendarAlt, FaWhatsapp, FaEnvelope, FaHome, FaInfoCircle, FaCheckCircle, FaShieldAlt, FaPlaneDeparture, FaGasPump, FaHeadset, FaChevronDown, FaChevronUp, FaAnchor, FaClock, FaCloudSun, FaTags, FaLanguage, FaUsers, FaStar, FaCheckSquare, FaListUl } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import SearchItem from "../components/site/SearchItem";
import Footer from "../components/site/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Recommended from "../components/site/Recommended";

const Agency = ({ slug }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(true);
    const [agency, setAgency] = useState(null);
    const [faqOpenIdx, setFaqOpenIdx] = useState(null);
    const [expandMore, setExpandMore] = useState(false);
    const [listings, setListings] = useState([
        {
            id: "1",
            title: "Dacia Logane",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_68386377bba20small.webp",
            similarText: "",
            rating: 4.0,
            ratingLabel: "Average",
            price: "From €35.56/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 2,
            title: "Hyndai Accent",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6811010a66040small.webp",
            similarText: "",
            rating: 4.3,
            ratingLabel: "Average",
            price: "From €45.00/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 3,
            title: "Fiat Tipo",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6810f932c91afsmall.webp",
            similarText: "",
            rating: 4.8,
            ratingLabel: "Average",
            price: "From €50.00/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 4,
            title: "VW Golf 8",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6810e2fba4749small.webp",
            similarText: "",
            rating: 4.0,
            ratingLabel: "Average",
            price: "From €35.56/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
    ]);

    const fetchAgency = async () => {
        try {
            const response = await axios.get("/api/get_agency", {
                params: { slug: slug },
            });
            console.log(response.data);
            setAgency(response.data.agency);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getWtspUrl = () => {
        const url = `https://marhire.bytech.ma/agency/${slug}`;
        const message = encodeURIComponent(
            `Hello,\nI am interested in booking:\n\Agency:${agency.agency_name} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
        );
        // For WhatsApp link:
        const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

        return whatsappLink;
    };

    const formatCreatedAt = () => {
        if (!agency?.created_at) return "";
        const date = new Date(agency.created_at);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchAgency();
    }, []);

    // Determine normalized category key for UI variations
    const categoryKey = useMemo(() => {
        const id = Number(agency?.category_id);
        if (id === 2) return 'cars';
        if (id === 3) return 'drivers';
        if (id === 4) return 'boats';
        if (id === 5) return 'activities';
        const name = (agency?.category?.category || '').toLowerCase();
        if (name.includes('car')) return 'cars';
        if (name.includes('driver')) return 'drivers';
        if (name.includes('boat')) return 'boats';
        if (name.includes('activity')) return 'activities';
        return 'cars';
    }, [agency]);

    // Plain text of full description for the "More details" section
    const fullPlainDescription = useMemo(() => {
        const html = agency?.description || "";
        if (typeof window === 'undefined') return html;
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || "").trim();
    }, [agency]);

    const TRUNCATE_LEN = 420;
    const isTruncated = fullPlainDescription.length > TRUNCATE_LEN;
    const visibleDescription = expandMore || !isTruncated
        ? fullPlainDescription
        : fullPlainDescription.slice(0, TRUNCATE_LEN);

    return (
        <>
            <div className="bt-page">
                {loading ? (
                    <div className="agency-card">
                        <Skeleton height={18} width={120} />
                        <Skeleton height={12} width={100} />
                    </div>
                ) : (
                    <>
                        <section className="agency-hero">
                            <div className="container">
                                <div className="hero-card">
                                    <div className="hero-breadcrumb">
                                        <a href="/" className="home" title={t('common.home','Home')}><FaHome size={14} /></a>
                                        <span className="sep">›</span>
                                        <a href="/partners" className="link">{t('agencyPage.breadcrumb.ourPartners', 'Our Partners')}</a>
                                        <span className="sep">›</span>
                                        <span className="current">{agency.agency_name}</span>
                                    </div>

                                    <div className="logo-wrap">
                                        <img
                                            src={`/${agency.agency_logo ?? "/images/default-agency.jpeg"}`}
                                        alt={agency.agency_name}
                                            onError={(e) => (e.target.src = "/images/default-agency.jpeg")}
                                    />
                                </div>

                                    <div className="verified">
                                        <span className="icon"><MdVerified size={14} /></span>
                                        {t(`agencyPage.heroBadge.${categoryKey}`, 'Verified local partner on MarHire')}
                                    </div>

                                    <h1 className="title">{agency.agency_name}</h1>

                                    <p className="location">
                                        {(agency?.city?.city_name || '') + (agency?.city ? ', ' : '') + t('common.morocco','Morocco')}
                                    </p>

                                    <div className="chips">
                                        <span className="chip">
                                            {(() => {
                                                switch (Number(agency?.category_id)) {
                                                    case 2: return t('categories.carRental', 'Car Rental');
                                                    case 3: return t('categories.privateDriver', 'Private Driver');
                                                    case 4: return t('categories.boatRental', 'Boat Rental');
                                                    case 5: return t('categories.activity', 'Activity');
                                                    default: return agency.category?.category || '';
                                                }
                                            })()}
                                        </span>
                                    </div>

                                    <div className="actions">
                                        <a href={getWtspUrl()} target="_blank" className="btn btn-whatsapp">
                                            <FaWhatsapp size={18} /> {t('agencyPage.actions.whatsapp', 'Contact on WhatsApp')}
                                        </a>
                                        {agency?.email && (
                                            <a href={`mailto:${agency.email}`} className="btn btn-secondary">
                                                <FaEnvelope size={16} /> {t('agencyPage.actions.email', 'Send an Email')}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <style>{`
                                .agency-hero { background: #ECF6F2; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: 36px 0 28px; }
                                .agency-hero .container { max-width: 900px; margin: 0 auto; padding: 0 20px; }
                                .hero-breadcrumb { display:flex; align-items:center; justify-content:center; gap:8px; color:#47635b; font-size:13px; margin-bottom: 14px; }
                                .hero-breadcrumb .home { color:#048667; display:inline-flex; }
                                .hero-breadcrumb .link { color:#47635b; text-decoration:none; }
                                .hero-breadcrumb .sep { opacity:.6; }
                                .hero-breadcrumb .current { color:#2a3c37; font-weight:600; }

                                .hero-card { display:flex; flex-direction:column; align-items:center; text-align:center; }
                                .logo-wrap { width:100px; height:100px; border-radius:16px; overflow:hidden; background:#fff; box-shadow: 0 6px 18px rgba(0,0,0,.08); display:flex; align-items:center; justify-content:center; }
                                .logo-wrap img { width:100%; height:100%; object-fit:contain; }
                                .verified { margin-top:14px; display:inline-flex; align-items:center; gap:6px; padding:6px 10px; border:1px solid #a7d7cd; color:#048667; background:#f2faf8; border-radius:999px; font-size:12px; }
                                .verified .icon { display:inline-flex; }
                                .title { font-size: 32px; font-weight:800; margin:10px 0 6px 0; color:#122521; }
                                .location { margin: 0 0 8px 0; color:#607773; }
                                .chips { margin-bottom: 12px; }
                                .chip { display:inline-block; font-size:12px; padding:6px 10px; border-radius:999px; background:#e6f3f0; color:#048667; border:1px solid #a7d7cd; }
                                .actions { display:flex; gap:12px; margin-top: 12px; flex-wrap:wrap; justify-content:center; }
                                .btn { display:inline-flex; align-items:center; gap:8px; padding:12px 16px; border-radius:10px; text-decoration:none; font-weight:600; }
                                .btn-whatsapp { background:#048667; color:#fff; }
                                .btn-secondary { background:#fff; color:#1f2937; border:1px solid #e2e8f0; }
                                @media (max-width: 640px) {
                                    .title { font-size: 26px; }
                                    .logo-wrap { width:84px; height:84px; }
                                }
                            `}</style>
                        </section>

                        <section className="agency-features">
                                <div className="container">
                                    <div className="features-grid">
                                        {(() => {
                                            const items = {
                                                cars: [
                                                    { icon: <FaShieldAlt size={18} />, label: t('agencyPage.featuresByCategory.cars.noDeposit', 'No-Deposit Options') },
                                                    { icon: <FaPlaneDeparture size={18} />, label: t('agencyPage.featuresByCategory.cars.airportDelivery', 'Airport Delivery') },
                                                    { icon: <FaGasPump size={18} />, label: t('agencyPage.featuresByCategory.cars.sameFuel', 'Same-to-Same Fuel') },
                                                    { icon: <FaHeadset size={18} />, label: t('agencyPage.featuresByCategory.cars.roadSupport', '24/7 Road Support') },
                                                ],
                                                boats: [
                                                    { icon: <FaAnchor size={18} />, label: t('agencyPage.featuresByCategory.boats.captainCrew', 'Captain & Crew Included') },
                                                    { icon: <FaShieldAlt size={18} />, label: t('agencyPage.featuresByCategory.boats.safetyEquipment', 'All Safety Equipment') },
                                                    { icon: <FaClock size={18} />, label: t('agencyPage.featuresByCategory.boats.flexibleHours', 'Flexible Rental Hours') },
                                                    { icon: <FaCloudSun size={18} />, label: t('agencyPage.featuresByCategory.boats.weatherGuarantee', 'Weather Guarantee') },
                                                ],
                                                drivers: [
                                                    { icon: <FaPlaneDeparture size={18} />, label: t('agencyPage.featuresByCategory.drivers.meetGreet', 'Airport Meet & Greet') },
                                                    { icon: <FaTags size={18} />, label: t('agencyPage.featuresByCategory.drivers.transparentPricing', 'Fixed Transparent Pricing') },
                                                    { icon: <FaLanguage size={18} />, label: t('agencyPage.featuresByCategory.drivers.multilingual', 'Multilingual Drivers') },
                                                    { icon: <FaHeadset size={18} />, label: t('agencyPage.featuresByCategory.drivers.support', '24/7 Support via MarHire') },
                                                ],
                                                activities: [
                                                    { icon: <FaUsers size={18} />, label: t('agencyPage.featuresByCategory.activities.licensedGuides', 'Official Licensed Guides') },
                                                    { icon: <FaUsers size={18} />, label: t('agencyPage.featuresByCategory.activities.smallGroup', 'Small Group or Private') },
                                                    { icon: <FaStar size={18} />, label: t('agencyPage.featuresByCategory.activities.topRated', 'Top-Rated Experiences') },
                                                    { icon: <FaCheckSquare size={18} />, label: t('agencyPage.featuresByCategory.activities.instantConfirmation', 'Instant Confirmation') },
                                                ],
                                            };
                                            return (items[categoryKey] || items.cars).map((f, idx) => (
                                                <div key={idx} className="feature">
                                                    <span className="icon">{f.icon}</span>
                                                    <span className="label">{f.label}</span>
                                                </div>
                                            ));
                                        })()}
                                    </div>
                                </div>

                                <style>{`
                                    .agency-features { background:#ffffff; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: 14px 0; border-top:1px solid #e6efe9; }
                                    .agency-features .container { width:100%; max-width:none; margin:0 auto; padding:0 20px; }
                                    .features-grid { display:grid; grid-template-columns: repeat(4, 1fr); gap: 10px; text-align:center; align-items:center; }
                                    .feature { display:flex; flex-direction:column; align-items:center; gap:6px; color:#2a3c37; padding: 8px 0; }
                                    .feature .icon { color:#048667; display:inline-flex; }
                                    .feature .label { font-size:14px; color:#048667; }
                                    @media (max-width: 768px) { .features-grid { grid-template-columns: repeat(2, 1fr); } }
                                `}</style>
                            </section>

                        {/* About (short description) */}
                        <section className="agency-about">
                            <div className="container">
                                <h3 className="about-title">
                                    <span className="ico"><FaInfoCircle size={16} /></span>
                                    {t('agencyPage.about.title', 'About our partner')}
                                </h3>
                                <div
                                    className="about-text"
                                    dangerouslySetInnerHTML={{
                                        __html: agency?.short_description || t('agencyPage.about.default')
                                    }}
                                />
                            </div>

                            <style>{`
                                .agency-about { padding: 20px 0 0 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #ffffff; margin-top: 18px; border-top: 1px solid #e6efe9; }
                                .agency-about .container { width: 100%; max-width: none; margin: 0 auto; padding: 0 20px; }
                                .about-title { display:flex; align-items:center; gap:8px; font-size: 22px; font-weight: 800; color:#0f1f1b; margin: 0 0 8px 0; text-align:left; }
                                .about-title .ico { display:inline-flex; color:#048667; }
                                .about-text { color:#4a5568; line-height:1.7; text-align:left; }
                            `}</style>
                        </section>
                        {/* Policies */}
                        <section className="agency-policies">
                                    <div className="container">
                                        <h3 className="policies-title">
                                            <span className="ico"><FaInfoCircle size={16} /></span>
                                            {t('agencyPage.policies.title', 'Agency Policies')}
                                        </h3>
                                        <div className="policies-card">
                                            {(() => {
                                                const items = t(`agencyPage.policiesByCategory.${categoryKey}`, { returnObjects: true }) || [];
                                                return (Array.isArray(items) ? items : []).map((p, idx) => (
                                                    <div key={idx} className="policy-row">
                                                        <span className="check"><FaCheckCircle size={16} /></span>
                                                        <div>
                                                            <div className="row-title">{p.title}</div>
                                                            <p className="row-text">{p.text}</p>
                                                        </div>
                                                    </div>
                                                ));
                                            })()}
                                        </div>
                                    </div>
                                </section>

                                <style>{`
                                    .agency-policies { padding: 14px 0 0 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 18px; border-top: 1px solid #e6efe9; }
                                    .agency-policies .container { width: 100%; max-width: none; margin: 0 auto; padding: 0 20px; }
                                    .policies-title { display:flex; align-items:center; gap:8px; font-size:22px; font-weight:800; color:#0f1f1b; margin: 0 0 12px 0; }
                                    .policies-title .ico { display:inline-flex; color:#048667; }
                                    .policies-card { background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:14px; }
                                    .policy-row { display:flex; gap:12px; align-items:flex-start; padding:10px 8px; border-radius:10px; }
                                    .policy-row + .policy-row { border-top: 1px dashed #eef2f6; }
                                    .check { color:#048667; display:inline-flex; margin-top:4px; }
                                    .row-title { font-weight:700; color:#0f172a; margin-bottom: 2px; }
                                    .row-text { color:#4a5568; margin:0; line-height:1.6; }
                                `}</style>

                                <section className="agency-more">
                                    <div className="container">
                                        <h3 className="more-title">
                                            <span className="ico"><FaInfoCircle size={16} /></span>
                                            {t('agencyPage.moreDetails.title', 'More details')}
                                        </h3>
                                        <p className="more-text">{visibleDescription}{isTruncated && !expandMore ? '…' : ''}</p>
                                        {isTruncated && (
                                            <button className="more-btn" onClick={() => setExpandMore(!expandMore)}>
                                                <span className="more-label">{expandMore ? t('common.show_less', 'Show Less') : t('common.see_more', 'Read More')}</span>
                                                {expandMore ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
                                            </button>
                                        )}
                                    </div>

                                    <style>{`
                                        .agency-more { padding: 12px 0 0 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 18px; border-top: 1px solid #e6efe9; }
                                        .agency-more .container { width: 100%; max-width: none; margin: 0 auto; padding: 0 20px; }
                                        .more-title { display:flex; align-items:center; gap:8px; font-size:22px; font-weight:800; color:#0f1f1b; margin: 0 0 8px 0; }
                                        .more-title .ico { display:inline-flex; color:#0a6a54; }
                                        .more-text { color:#4a5568; line-height:1.7; margin: 0 0 8px 0; }
                                        .more-btn { background:none; border:none; color:#048667; font-weight:700; cursor:pointer; padding: 6px 8px; border-radius:8px; display:inline-flex; align-items:center; gap:6px; }
                                        .more-btn:hover { background:#f2faf8; }
                                    `}</style>
                                </section>

                                <section className="agency-listings-section">
                                    <div className="agency__listings">
                                        <h2 className="section-title_borderd listings-title"><span className="ico"><FaListUl size={16} /></span>{t('agencyPage.availableListings.title', 'Available Listings')}</h2>
                                        <Recommended
                                            type={categoryKey}
                                            classes="agency-listings"
                                            agency_id={agency.id}
                                            disableHeading={true}
                                        />
                                    </div>
                                    <style>{`
                                        .agency-listings-section { padding: 12px 0 0 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 18px; border-top: 1px solid #e6efe9; }
                                        .agency-listings-section .agency__listings { width: 100%; margin: 0; padding: 0 10px; }
                                    `}</style>
                                    <style>{`
                                        .agency-listings-section .listings-title { font-weight: 800; font-size: 22px; color:#0f1f1b; margin: 0 0 8px 0; display:flex; align-items:center; gap:8px; }
                                        .agency-listings-section .listings-title .ico { display:inline-flex; color:#048667; }
                                    `}</style>
                                </section>

                                <section className="agency-faq">
                                    <div className="container">
                                        <h3 className="faq-title">
                                            <span className="ico"><FaInfoCircle size={16} /></span>
                                            {t('agencyPage.faq.title', 'Frequently Asked Questions')}
                                        </h3>
                                        {(() => {
                                            const items = t('agencyPage.faq.items', { returnObjects: true });
                                            const list = Array.isArray(items) ? items : [];
                                            const [openIdx, setOpenIdxLocal] = [faqOpenIdx, setFaqOpenIdx];
                                            return (
                                                <div className="faq-list">
                                                    {list.map((q, idx) => {
                                                        const isOpen = openIdx === idx;
                                                        return (
                                                            <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                                                                <button className="faq-header" onClick={() => setOpenIdxLocal(isOpen ? null : idx)} aria-expanded={isOpen}>
                                                                    <span className="question">{q}</span>
                                                                    <span className="chevron" aria-hidden>
                                                                        {isOpen ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
                                                                    </span>
                                                                </button>
                                                                {isOpen && (
                                                                    <div className="faq-body">
                                                                        <p className="answer">{t('agencyPage.faq.answerFallback', 'Contact our support if you need more details about this question.')}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })()}
                                    </div>

                                    <style>{`
                                        .agency-faq { padding: 14px 0 0 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 18px; border-top: 1px solid #e6efe9; }
                                        .agency-faq .container { width: 100%; max-width: none; margin: 0 auto; padding: 0 20px; }
                                        .faq-title { display:flex; align-items:center; gap:8px; font-size:22px; font-weight:800; color:#0f1f1b; margin: 0 0 12px 0; }
                                        .faq-title .ico { display:inline-flex; color:#048667; }
                                        .faq-list { display:flex; flex-direction:column; gap:10px; }
                                        .faq-item { background:#fff; border:1px solid #e2e8f0; border-radius:10px; overflow:hidden; }
                                        .faq-header { width:100%; background:transparent; border:none; padding:14px 16px; display:flex; justify-content:space-between; align-items:center; cursor:pointer; text-align:left; }
                                        .question { font-weight:700; color:#0f172a; }
                                        .chevron { color:#718096; display:inline-flex; }
                                        .faq-body { padding: 0 16px 14px 16px; }
                                        .answer { margin:0; color:#4a5568; line-height:1.6; }
                                    `}</style>
                                </section>

                                <section className="agency-contact-cta">
                                    <div className="container">
                                        <h3 className="cta-title">{t('agencyPage.contactCta.title', 'Ready to book or have a question?')}</h3>
                                        <p className="cta-sub">{t('agencyPage.contactCta.subtitle', 'Contact MarHire support for assistance with any listing from this partner.')}</p>
                                        <div className="cta-actions">
                                            <a href={getWtspUrl()} target="_blank" className="btn btn-whatsapp">
                                                <FaWhatsapp size={18} /> {t('agencyPage.contactCta.whatsapp', 'Chat on WhatsApp')}
                                            </a>
                                            <a href="mailto:support@marhire.com" className="btn btn-secondary">
                                                <FaEnvelope size={16} /> {t('agencyPage.contactCta.email', 'Email Support')}
                                            </a>
                                        </div>
                                    </div>

                                    <style>{`
                                        .agency-contact-cta { padding: 18px 0 28px 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); margin-top: 18px; border-top: 1px solid #e6efe9; }
                                        .agency-contact-cta .container { width: 100%; max-width: none; margin: 0 auto; padding: 0 20px; display:flex; flex-direction:column; align-items:center; text-align:center; }
                                        .cta-title { margin:0; font-size:22px; font-weight:800; color:#0f1f1b; }
                                        .cta-sub { margin:6px 0 12px 0; color:#4a5568; }
                                        .cta-actions { display:flex; gap:12px; flex-wrap:wrap; justify-content:center; }
                                        .btn { display:inline-flex; align-items:center; gap:8px; padding:10px 16px; border-radius:10px; text-decoration:none; font-weight:600; }
                                        .btn-whatsapp { background:#048667; color:#fff; }
                                        .btn-secondary { background:#fff; color:#1f2937; border:1px solid #e2e8f0; }
                                    `}</style>
                                </section>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Agency;
