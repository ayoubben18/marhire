import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import { useTranslation } from "react-i18next";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"; // update the path if needed

const CONTACT_EMAIL = 'info@marhire.com';
const WHATSAPP_URL = 'https://wa.me/212660745055';

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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
            {t('joinUs.faq.title', 'Frequently Asked Questions')}
        </h1>
        <p className="text-center mb-8 text-lg">
            Got a question about booking with MarHire? Start here!
        </p>
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
