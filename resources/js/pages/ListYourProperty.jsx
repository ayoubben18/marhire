import React from "react";
import { useTranslation } from "react-i18next";
import HeroSectionJoinUs from "../components/site/HeroSectionJoinUs";
import BusinessPotential from "../components/site/BusinessPotential";
import GettingStartedSimple from "../components/site/GettingStartedSimple";
import ValueProposition from "../components/site/ValueProposition";
import HowItWorksSteps from "../components/site/HowItWorksSteps";
import ServicesWeAccept from "../components/site/ServicesWeAccept";
import PartnershipRequirements from "../components/site/PartnershipRequirements";
import ListForm from "../components/site/ListForm";
import WhoCanPartner from "../components/site/WhoCanPartner";
import FAQSectionCustom from "../components/site/FAQSectionCustom";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import RequirementsDocuments from "../components/site/RequirementsDocuments";
import FairCommissions from "../components/site/FairCommissions";
import PartnerFAQ from "../components/site/PartnerFAQ";

const ListYourProperty = () => {
    const { t } = useTranslation();

    // Updated FAQ content for partnership page
    const faqs = [
        {
            question: t('joinUs.faq.cost.question', 'How much does it cost to join MarHire?'),
            answer: t('joinUs.faq.cost.answer', 'Joining MarHire is completely free. There are no upfront listing fees, monthly charges, or hidden costs. We only earn a small commission when you receive confirmed bookings.'),
        },
        {
            question: t('joinUs.faq.approval.question', 'How long does the approval process take?'),
            answer: t('joinUs.faq.approval.answer', 'Most applications are reviewed and approved within 48 hours. We may request additional documentation to verify your business, which could extend the process by 1-2 business days.'),
        },
        {
            question: t('joinUs.faq.commission.question', 'What commission do you charge?'),
            answer: t('joinUs.faq.commission.answer', 'Our commission varies by service category and is only charged on confirmed bookings. We\'ll discuss the exact rates during your application process - our fees are always transparent and competitive.'),
        },
        {
            question: t('joinUs.faq.bookings.question', 'How do I receive booking requests?'),
            answer: t('joinUs.faq.bookings.answer', 'You\'ll receive booking notifications via email and WhatsApp with full customer details. You can respond directly or use our partner dashboard to manage requests.'),
        },
        {
            question: t('joinUs.faq.updates.question', 'Can I update my listings after they\'re approved?'),
            answer: t('joinUs.faq.updates.answer', 'Yes! You\'ll have access to a partner dashboard where you can update your listings, pricing, availability, photos, and business information anytime.'),
        },
        {
            question: t('joinUs.faq.support.question', 'What kind of support do you provide to partners?'),
            answer: t('joinUs.faq.support.answer', 'We provide dedicated partner support in Arabic, French, and English. This includes onboarding assistance, listing optimization, marketing guidance, and ongoing technical support.'),
        },
    ];

    return (
        <>
            {/* Hero Section with join-us.jpg background */}
            <HeroSectionJoinUs />
            <BusinessPotential />
            <GettingStartedSimple />
            <WhoCanPartner />

           
            {/* Application Form Section */}
            <RequirementsDocuments imageSrc="/images/partner-us/partner-us.jpg" imageAlt={t('joinUs.requirementsDocs.title', 'Requirements & Documents')} />
            <FairCommissions />
            <PartnerFAQ />
            <section className="form-section" id="partnership-form">
                <div className="container">
                    <div className="form-header">
                        <h2 className="form-title">
                            {t('joinUs.form.title', 'Ready to Join? Apply Now')}
                        </h2>
                        <p className="form-subtitle">
                            {t('joinUs.form.subtitle', 'Fill out the form below and we\'ll get back to you within 24 hours')}
                        </p>
                    </div>
                    
                    {/* Keep the existing ListForm component unchanged */}
                    <ListForm />
                </div>

                <style>{`
                    .form-section {
                        padding: 80px 0;
                        background: #F8F7F3;
                        margin-left: calc(50% - 50vw);
                        margin-right: calc(50% - 50vw);
                    }

                    .container {
                        max-width: 920px;
                        margin: 0 auto;
                        padding: 0 20px;
                    }

                    .form-header { display: none; }

                    .form-title {
                        font-size: 2.5rem;
                        font-weight: 700;
                        color: #1a202c;
                        margin-bottom: 1rem;
                        line-height: 1.2;
                    }

                    .form-subtitle {
                        font-size: 1.25rem;
                        color: #4a5568;
                        font-weight: 400;
                        line-height: 1.6;
                        margin: 0;
                    }

                    @media (max-width: 768px) {
                        .form-section {
                            padding: 60px 0;
                        }

                        .form-title {
                            font-size: 2rem;
                        }

                        .form-subtitle {
                            font-size: 1.1rem;
                        }

                        .form-header {
                            margin-bottom: 40px;
                        }
                    }

                    @media (max-width: 480px) {
                        .form-title {
                            font-size: 1.75rem;
                        }

                        .form-subtitle {
                            font-size: 1rem;
                        }
                    }
                `}</style>
            </section>

            {/* Post-form contact help section */}
            <section className="post-help">
                <div className="help-container">
                    <div className="help-left">
                        <h3 className="help-title">{t('joinUs.contactHelp.title', 'Have Questions Before You Join?')}</h3>
                        <p className="help-sub">{t('joinUs.contactHelp.subtitle', 'Our partner onboarding team is ready to help. Reach out to us directly for any inquiries.')}</p>
                    </div>
                    <div className="help-actions">
                        <a className="help-btn" href="https://wa.me/212660745055" target="_blank" rel="noreferrer">{t('joinUs.contactHelp.whatsapp', 'WhatsApp Us')}</a>
                        <a className="help-btn outline" href="mailto:support@marhire.com">{t('joinUs.contactHelp.email', 'Email Us')}</a>
                    </div>
                </div>
                <p className="help-foot">
                    {t('joinUs.contactHelp.review', 'Review our')} <a href="/terms-conditions">{t('joinUs.contactHelp.terms', 'Terms & Conditions')}</a> {t('common.and', 'and')} <a href="/privacy-policy">{t('joinUs.contactHelp.privacy', 'Privacy Policy')}</a>.
                </p>

                <style>{`
                    .post-help { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: 30px 0; }
                    .help-container { max-width: 1100px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 14px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
                    .help-left { max-width: 620px; }
                    .help-title { font-size: 1.8rem; font-weight: 800; color: #1a202c; margin: 0 0 8px 0; }
                    .help-sub { margin: 0; color: #4a5568; }
                    .help-actions { display: flex; gap: 14px; flex-wrap: wrap; }
                    .help-btn { display: inline-flex; align-items: center; justify-content: center; padding: 12px 18px; border-radius: 12px; border: 1px solid #a7d7cd; color: #048667; text-decoration: none; background: #f2faf8; transition: background .2s ease; }
                    .help-btn:hover { background: #e6f6f1; }
                    .help-btn.outline { background: transparent; }
                    .help-foot { text-align: center; color: #4a5568; margin: 10px 0 0 0; }
                    .help-foot a { color: #048667; text-decoration: none; font-weight: 700; }
                    @media (max-width: 900px) { .help-container { flex-direction: column; align-items: flex-start; } .help-actions { width: 100%; } }
                `}</style>
            </section>
            
            {/* Keep existing components */}
            <FreeTexts slug="list-your-property" />
            <Footer />
        </>
    );
};

export default ListYourProperty;
