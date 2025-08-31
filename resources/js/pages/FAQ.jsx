import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"; // update the path if needed
import { FaHome } from "react-icons/fa";
import { getLocalizedUrl } from "../utils/localeManager";

const CONTACT_EMAIL = 'info@marhire.com';
const WHATSAPP_URL = 'https://wa.me/212660745055';

const Hero = () => {
    const { t } = useTranslation();
    return (
        <div className="sitemap-hero">
            <div className="hero-content">
                <div className="container">
                    <div className="hero-text-content">
                        <div className="hero-nav-path">
                            <div className="nav-path-container">
                                <a href={getLocalizedUrl('/')} title={t('common.home', 'Home')} className="nav-home-link"><FaHome size={14} /></a>
                                <span className="nav-path-arrow">›</span>
                                <span className="nav-current-page">{t('faq.breadcrumb', 'FAQ')}</span>
                            </div>
                        </div>
                        <h1 className="hero-title">{t('faq.title', 'Frequently Asked Questions')}</h1>
                        <p className="hero-subtitle">{t('faq.subtitle', 'Find quick answers to your questions about booking car rentals, private drivers, tours, and activities in Morocco.')}</p>
                    </div>
                </div>
            </div>
            <style>{`
                .sitemap-hero { position: relative; padding: 48px 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f6faf8; }
                .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: #203233; }
                .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; }
                .hero-nav-path { margin-bottom: 12px; }
                .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #627577; }
                .nav-home-link { text-decoration: none; color: #627577; }
                .nav-path-arrow { color: #627577; font-size: 12px; }
                .nav-current-page { color: #203233; font-size: 13px; }
                .hero-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; text-align: center; }
                .hero-subtitle { font-size: 1.05rem; font-weight: 400; margin-bottom: 0; line-height: 1.6; max-width: 800px; text-align: center; color: #495b5d; }
                @media (min-width: 768px) { .hero-title { font-size: 2.6rem; } }
            `}</style>
        </div>
    );
};

const buildFaqSections = (t) => {
    const primary = t('joinUs.faq.sections', { returnObjects: true });
    const fallback = t('faq.sections', { returnObjects: true });
    const sections = (primary && typeof primary === 'object') ? primary : ((fallback && typeof fallback === 'object') ? fallback : {});
    const order = ['bookings','cars','drivers','boats','policies','contact'];
    return order
        .map((key) => sections[key])
        .filter(Boolean);
};

const FAQ = () => {
    const { t } = useTranslation();
    const sections = buildFaqSections(t);
    return (
    <>
    <Hero />
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        {sections.map((sec, i) => (
            <section key={i} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{sec?.title}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {(sec?.items || []).map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${i}-${idx}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        ))}

        {/* Bottom Help Card */}
        <div className="mt-12 text-center rounded-lg border bg-white p-6">
            <h3 className="text-xl font-semibold">{t('joinUs.faq.bottom.title', "Can't find your answer?")}</h3>
            <p className="mt-2">
                {t('joinUs.faq.bottom.textPrefix', 'Our team is ready to help. Contact us at')}{' '}
                <a href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: '#048667' }}>{CONTACT_EMAIL}</a>{' '}
                {t('joinUs.faq.bottom.textSuffix', 'or chat with us on')}{' '}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#048667' }}>{t('joinUs.faq.bottom.whatsappLabel', 'WhatsApp')}</a>.
            </p>
            <p className="mt-2 text-xs text-gray-500">{t('joinUs.faq.bottom.supportHours', 'Support Hours: 7/7, from 09:00 to 21:00 (Morocco Time, GMT+1)')}</p>
        </div>
    </div>
    <FreeTexts slug="faq" />
    <Footer />
    </>
);
};

export default FAQ;
