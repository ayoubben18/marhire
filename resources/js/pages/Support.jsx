import React, { useMemo, useState } from "react";
import { FaHome } from "react-icons/fa";
import Footer from "../components/site/Footer";
import {
    FaWhatsapp,
    FaEnvelope,
    FaPhone,
    FaBolt,
    FaCreditCard,
    FaCircleXmark,
    FaShieldHalved,
    FaCar,
    FaPlane,
    FaAnchor,
    FaLock,
    FaCheck
} from "react-icons/fa6";
import axios from "axios";
import FreeTexts from "../components/site/FreeTexts";
import { useTranslation } from "react-i18next";

const Support = () => {
    const { t } = useTranslation();

    const contactCards = useMemo(() => ([
        {
            icon: FaWhatsapp,
            title: t('support.contact.whatsapp.title', 'WhatsApp Support'),
            description: t(
                'support.contact.whatsapp.desc',
                'Live chat with our team 24/7 on WhatsApp for bookings, changes, or urgent questions. Typical reply time: under 10 minutes.'
            ),
            cta: t('support.contact.whatsapp.cta', 'Chat on WhatsApp'),
            href: 'https://wa.me/212660745055',
            primary: true
        },
        {
            icon: FaEnvelope,
            title: t('support.contact.email.title', 'Email Support'),
            description: t(
                'support.contact.email.desc',
                'Email us anytime at info@marhire.com. We reply within one business day (usually a few hours). Attach your booking code for faster help.'
            ),
            cta: t('support.contact.email.cta', 'Email Us'),
            href: 'mailto:info@marhire.com'
        },
        {
            icon: FaPhone,
            title: t('support.contact.phone.title', 'Phone Support'),
            description: t(
                'support.contact.phone.desc',
                'Prefer to talk? Call +212 660 745 055 during business hours (Mon–Sun, 09:00–20:00 GMT+1). For after-hours issues, use WhatsApp 24/7.'
            ),
            cta: t('support.contact.phone.cta', 'Call Now'),
            href: 'tel:+212660745055'
        }
    ]), [t]);

    const helpTopics = useMemo(() => ([
        { icon: FaBolt, title: t('support.topics.bookings.title', 'Bookings & Changes'), description: t('support.topics.bookings.desc', 'Edit dates, passenger counts, or services (cars, private drivers, boats, activities). Instant confirmation when available.') },
        { icon: FaCreditCard, title: t('support.topics.payments.title', 'Payments & Refunds'), description: t('support.topics.payments.desc', 'Pay on arrival (where available), card payments, secure checkout, refund timelines, receipts, and invoices.') },
        { icon: FaCircleXmark, title: t('support.topics.cancellations.title', 'Cancellations & Fees'), description: t('support.topics.cancellations.desc', 'Free-cancellation tags, cut-off times, and how refunds are processed for each category.') },
        { icon: FaShieldHalved, title: t('support.topics.insurance.title', 'Insurance & Protection'), description: t('support.topics.insurance.desc', 'Basic vs. full coverage, deposit vs. no-deposit options, and damage protection add-ons.') },
        { icon: FaCar, title: t('support.topics.cars.title', 'Cars & Roadside Assistance'), description: t('support.topics.cars.desc', 'License requirements, automatic vs. manual, unlimited kilometers, checkpoints, and 24/7 roadside help.') },
        { icon: FaPlane, title: t('support.topics.drivers.title', 'Private Drivers & Transfers'), description: t('support.topics.drivers.desc', 'Airport pickup, meet-and-greet, multilingual chauffeurs, fixed pricing, and business-trip support.') },
        { icon: FaAnchor, title: t('support.topics.boats.title', 'Boats & Activities'), description: t('support.topics.boats.desc', 'With/without captain, group sizes, safety notes, and what’s included (fuel, gear, guide).') },
        { icon: FaLock, title: t('support.topics.account.title', 'Account, Privacy & Data'), description: t('support.topics.account.desc', 'Managing your info, GDPR requests, and how we keep your data secure.') }
    ]), [t]);

    const faqs = useMemo(() => ([
        { q: t('support.faqs.q1', 'How fast does MarHire respond on WhatsApp?'), a: t('support.faqs.a1', "We’re online 24/7 and usually reply in under 10 minutes. For urgent car rental or airport transfer issues, WhatsApp is the fastest channel.") },
        { q: t('support.faqs.q2', 'Can I book without a deposit?'), a: t('support.faqs.a2', 'Yes. Many of our partners offer no-deposit rental options, which you can filter for during your search. This provides greater flexibility and peace of mind for your trip.') },
        { q: t('support.faqs.q3', 'How do refunds and cancellations work?'), a: t('support.faqs.a3', 'Free-cancellation is available on many listings up to a set cutoff. When you cancel within the window, refunds are processed to your original payment method. See Cancellation Policy and each listing’s terms.') },
        { q: t('support.faqs.q4', 'Do you provide roadside assistance?'), a: t('support.faqs.a4', 'Yes. For active car bookings, we coordinate 24/7 roadside help with our verified local agencies. Share your booking code and location on WhatsApp.') },
        { q: t('support.faqs.q5', 'Which languages does support cover?'), a: t('support.faqs.a5', 'We offer support in English, French, Arabic, and Spanish. Tell us your preferred language when you reach out.') },
        { q: t('support.faqs.q6', 'Is my data safe when I book?'), a: t('support.faqs.a6', 'Yes. Payments are processed over secure, encrypted connections. We comply with GDPR and only use your data to manage your booking and support requests.') }
    ]), [t]);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
        terms: false,
    });
    const [status, setStatus] = useState({ submitted: false, error: false, loading: false });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ submitted: false, error: false, loading: true });
        if (!form.name || !form.email || !form.message || !form.terms) {
            setStatus({ submitted: false, error: true, loading: false });
            return;
        }
        try {
            await axios.post("/api/submit_contact", {
                name: form.name,
                email: form.email,
                phone: form.phone,
                message: form.message,
            });
            setStatus({ submitted: true, error: false, loading: false });
            setForm({ name: "", email: "", phone: "", message: "", terms: false });
        } catch (err) {
            setStatus({ submitted: false, error: true, loading: false });
        }
    };

    return (
        <>
            <div className="support-hero">
                <div className="hero-background">
                    <img src="/images/auth-background.webp" alt={t('support.title', 'Support & Help Center')} className="hero-bg-image" />
                    <div className="hero-overlay"></div>
                </div>
                <div className="hero-content">
                    <div className="container">
                        <div className="hero-text-content">
                            <div className="hero-nav-path">
                                <div className="nav-path-container">
                                    <a href="/" title={t('common.home', 'Home')} className="nav-home-link"><FaHome size={14} /></a>
                                    <span className="nav-path-arrow">›</span>
                                    <span className="nav-current-page">{t('support.breadcrumb', 'Support')}</span>
                                </div>
                            </div>
                            <h1 className="hero-title">{t('support.title', 'Support & Help Center')}</h1>
                            <p className="hero-subtitle">{t('support.subtitle', 'Reach us anytime — before, during, or after your booking. Our local team responds fast via WhatsApp, phone, or email.')}</p>
                            <div className="hero-langs">
                                {['English', 'French', 'Arabic', 'Spanish'].map((lang) => (
                                    <span key={lang} className="chip-pill">{lang}</span>
                                ))}
                            </div>
                            <p className="hero-timezone">{t('support.timezone', 'Based in Morocco (Africa/Casablanca, GMT+1)')}</p>
                        </div>
                    </div>
                </div>
                <style>{`
                    .support-hero { position: relative; min-height: 46vh; padding: 60px 0; display: flex; align-items: center; justify-content: center; overflow: hidden; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f6faf8; }
                    .hero-background { display: none; }
                    .hero-bg-image { width: 100%; height: 100%; object-fit: cover; object-position: center; opacity: 0.18; }
                    .hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(4,134,103,0.08) 0%, rgba(0,0,0,0.05) 100%); z-index: 2; }
                    .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: #203233; }
                    .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; }
                    .hero-nav-path { margin-bottom: 12px; }
                    .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #627577; }
                    .nav-home-link { text-decoration: none; color: #627577; }
                    .nav-path-arrow { color: #627577; font-size: 12px; }
                    .nav-current-page { color: #203233; font-size: 13px; }
                    .hero-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; text-align: center; }
                    .hero-subtitle { font-size: 1.05rem; font-weight: 400; margin-bottom: 0.75rem; line-height: 1.6; max-width: 800px; text-align: center; color: #495b5d; }
                    .hero-langs { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; margin-top: 6px; }
                    .chip-pill { display:inline-flex; align-items:center; border:1px solid #a7d7cd; color:#048667; background:#f2faf8; border-radius: 999px; font-weight: 700; font-size: 12px; padding: 6px 10px; }
                    .hero-timezone { color: #6b7d7f; font-size: 12px; margin-top: 4px; }
                    @media (min-width: 768px) { .hero-title { font-size: 2.8rem; } .hero-subtitle { font-size: 1.15rem; } }
                `}</style>
            </div>

            <div className="py-12 md:py-16 bg-white">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {contactCards.map((card, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition border p-6 sm:p-8 flex flex-col">
                                <card.icon className="h-10 w-10 mb-4 text-[#048667]" />
                                <h3 className="text-xl font-bold">{card.title}</h3>
                                <p className="text-gray-600 mt-2 flex-1">{card.description}</p>
                                <a
                                    href={card.href}
                                    target={card.href.startsWith('http') ? "_blank" : undefined}
                                    rel={card.href.startsWith('http') ? "noreferrer" : undefined}
                                    className={`mt-6 w-full inline-flex items-center justify-center rounded-lg border px-4 py-2 font-semibold ${card.primary ? 'bg-[#048667] text-white border-[#048667] hover:opacity-90' : 'bg-white text-[#048667] border-[#048667] hover:bg-[#048667]/10'}`}
                                >
                                    {card.cta}
                                </a>
                        </div>
                    ))}
                </div>

                    <div className="mt-10 md:mt-12 rounded-2xl border-2 border-red-200 bg-red-50 p-6 sm:p-8 text-center md:text-left md:flex md:items-center md:justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-red-600">{t('support.emergency.title', 'Emergency & Roadside Assistance')}</h3>
                            <p className="text-red-600/80 mt-2 max-w-3xl mx-auto md:mx-0">
                                {t('support.emergency.desc', "For active bookings (cars, drivers, boats): we’re available 24/7 for roadside help, delays, or last-minute changes. Share your booking code and location; we’ll coordinate with your verified provider immediately.")}
                            </p>
                        </div>
                        <a
                            href="https://wa.me/212660745055"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-4 md:mt-0 md:ml-6 inline-flex items-center justify-center rounded-lg bg-red-600 text-white px-5 py-2.5 font-semibold hover:bg-red-700"
                        >
                            {t('support.emergency.cta', 'Get Emergency Help')}
                        </a>
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-16 bg-[#f6faf8]">
                <div className="container mx-auto max-w-6xl px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">{t('support.topics.title', 'Help Topics')}</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {helpTopics.map((topic, i) => (
                            <div key={i} className="bg-white text-center p-6 rounded-2xl border hover:shadow-md transition">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#048667]/10 text-[#048667] mx-auto mb-5">
                                    <topic.icon className="h-7 w-7" />
                                </div>
                                <div className="text-lg font-semibold">{topic.title}</div>
                                <div className="text-gray-600 mt-2">{topic.description}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-16 bg-[#f6faf8]">
                <div className="container mx-auto max-w-4xl px-4">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold">{t('support.faqs.title', 'Featured FAQs')}</h2>
                    </div>
                    <div className="divide-y rounded-2xl border bg-white">
                        {faqs.map((item, idx) => (
                            <FaqItem key={idx} question={item.q} answer={item.a} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="py-12 md:py-16 bg-[#f6faf8]">
                <div className="container mx-auto max-w-3xl px-4">
                    <div className="bg-white rounded-2xl shadow border">
                        <div className="text-center p-6 sm:p-8">
                            <h3 className="text-3xl font-bold">{t('support.form.title', 'Send Us a Message')}</h3>
                            <p className="text-gray-600 mt-1">{t('support.form.subtitle', "We reply by email within one business day. For urgent issues, use WhatsApp 24/7.")}</p>
                        </div>
                        <div className="p-6 sm:p-8 pt-0">
                            <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-700">{t('support.form.name', 'Your Name')}</label>
                                        <input id="name" name="name" placeholder={t('support.form.namePlaceholder', 'Enter your full name')} required value={form.name} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#048667]" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">{t('support.form.email', 'Your Email')}</label>
                                        <input id="email" name="email" type="email" placeholder={t('support.form.emailPlaceholder', 'Enter your email address')} required value={form.email} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#048667]" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="phone" className="text-sm font-medium text-gray-700">{t('support.form.phone', 'Phone (optional)')}</label>
                                    <input id="phone" name="phone" placeholder={t('support.form.phonePlaceholder', 'Enter your phone number')} value={form.phone} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#048667]" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-gray-700">{t('support.form.message', 'How can we help you?')}</label>
                                    <textarea id="message" name="message" placeholder={t('support.form.messagePlaceholder', 'Please describe your issue or question...')} rows={6} required value={form.message} onChange={handleChange} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#048667]"></textarea>
                        </div>
                                <label className="flex items-start gap-2 text-sm text-gray-600">
                                    <input type="checkbox" name="terms" checked={form.terms} onChange={handleChange} required className="mt-1" />
                                    <span>
                                        {t('support.form.privacyConsent', 'I agree to the')} <a href="/privacy-policy" className="underline text-[#048667]">{t('support.form.privacyPolicy', 'Privacy Policy')}</a>.
                                    </span>
                                </label>
                                <button type="submit" className="w-full py-3 text-lg rounded-lg font-semibold bg-[#048667] text-white hover:opacity-90" disabled={status.loading}>
                                    {status.loading ? t('support.form.sending', 'Sending...') : t('support.form.send', 'Send Message')}
                        </button>
                    </form>
                    {status.submitted && (
                        <div className="text-green-600 font-medium mt-4 text-center">
                                    {t('support.form.success', "✅ Thank you! Your message has been sent. We'll get back to you soon.")}
                        </div>
                    )}
                    {status.error && (
                        <div className="text-red-500 font-medium mt-4 text-center">
                                    {t('support.form.error', '❌ Please fill in all required fields.')}
                        </div>
                    )}
                        </div>
                    </div>
                </div>
                </div>

            <div className="py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 text-center">
                        {[ 
                            { icon: FaShieldHalved, text: t('support.trust.verified', 'Verified & Trusted Agencies') },
                            { icon: FaCreditCard, text: t('support.trust.price', 'Price Transparency') },
                            { icon: FaLock, text: t('support.trust.secure', 'Secure Online Payments') },
                            { icon: FaCheck, text: t('support.trust.freeCancel', 'Free-Cancellation Options') },
                            { icon: FaWhatsapp, text: t('support.trust.whatsapp', '24/7 WhatsApp Support') },
                            { icon: FaCar, text: t('support.trust.deposit', 'No-Deposit Rentals') },
                        ].map((item, index) => (
                            <div key={index} className="flex flex-col items-center gap-2">
                                <item.icon className="h-7 w-7 text-[#048667]" />
                                <span className="text-sm font-semibold text-gray-600">{item.text}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-10 text-sm text-gray-600">
                        {t('support.trust.partnerHelp', 'Need business/partner help?')} <a href="/list-your-property" className="font-semibold text-[#048667] underline">{t('support.trust.partnerSupport', 'Visit Partner Support')}</a> {t('support.trust.manage', 'to list your services or manage bookings.')}        
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <FreeTexts slug="support" />
            </div>

            <Footer />
        </>
    );
};

const FaqItem = ({ question, answer }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="px-4 md:px-6">
            <button
                type="button"
                className="w-full text-left py-4 md:py-5 font-semibold text-lg hover:no-underline flex items-center justify-between"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
            >
                <span>{question}</span>
                <span className={`transition-transform ${open ? 'rotate-45' : ''}`}>+</span>
            </button>
            {open && (
                <div className="pb-5 text-base text-gray-600 border-t">
                    <p className="pt-4">{answer}</p>
                </div>
            )}
        </div>
    );
};

export default Support;
