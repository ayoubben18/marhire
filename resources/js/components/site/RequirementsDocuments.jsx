import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

const RequirementsDocuments = () => {
    const { t } = useTranslation();

    const items = [
        {
            title: t('joinUs.requirementsDocs.items.companyRegistration.title', 'Company Registration'),
            desc: t('joinUs.requirementsDocs.items.companyRegistration.desc', "Valid ICE (Identifiant Commun de l'Entreprise) and RC (Registre du Commerce) numbers."),
        },
        {
            title: t('joinUs.requirementsDocs.items.businessLicense.title', 'Business License'),
            desc: t('joinUs.requirementsDocs.items.businessLicense.desc', 'Proof of your specific business license (e.g., transport touristique, location de voitures).'),
        },
        {
            title: t('joinUs.requirementsDocs.items.ownerId.title', "Owner's Identification"),
            desc: t('joinUs.requirementsDocs.items.ownerId.desc', "A copy of the owner's national ID card (CNIE) or passport."),
        },
        {
            title: t('joinUs.requirementsDocs.items.serviceDetails.title', 'Service Details'),
            desc: t('joinUs.requirementsDocs.items.serviceDetails.desc', 'Clear information about your services, including pricing, cancellation policies, and insurance details.'),
        },
    ];

    return (
        <section className="requirements-docs">
            <div className="container">
                <div className="layout">
                    <div className="illustration" aria-hidden>
                        <span>200 × 80</span>
                    </div>
                    <div className="content">
                        <h2 className="title">{t('joinUs.requirementsDocs.title', 'Requirements & Documents')}</h2>
                        <p className="subtitle">{t('joinUs.requirementsDocs.subtitle', 'To ensure a safe and trustworthy marketplace for travelers, we require all our partners to be licensed and fully compliant with local regulations. Before applying, please have the following documents ready:')}</p>

                        <ul className="bullet-list">
                            {items.map((it, idx) => (
                                <li key={idx} className="bullet-item">
                                    <CheckCircle2 size={18} color="#048667" className="check" />
                                    <div>
                                        <strong>{it.title}:</strong> {it.desc}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <p className="footnote">
                            {t('joinUs.requirementsDocs.footnote', 'Submitting these helps us speed up the verification process and build a foundation of trust. For more details, review our partner terms.')} <a href="/support">partner terms</a>.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .requirements-docs { padding: 70px 0; background: #f7f8f9; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
                .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
                .layout { display: grid; grid-template-columns: 1fr 1.2fr; gap: 32px; align-items: start; }
                .illustration { background: #e6ecef; border: 1px solid #e2e8f0; border-radius: 16px; min-height: 520px; display: flex; align-items: center; justify-content: center; color: #cbd5e0; font-size: 64px; font-weight: 700; }
                .illustration span { opacity: 0.85; }
                .content { padding-top: 4px; }
                .requirements-docs .title { font-size: 2.2rem; font-weight: 800; color: #1a202c; margin: 0 0 12px 0; text-align: left; }
                .subtitle { color: #718096; font-size: 1rem; line-height: 1.7; margin: 0 0 16px 0; }
                .bullet-list { list-style: none; padding: 0; margin: 0 0 12px 0; display: flex; flex-direction: column; gap: 14px; }
                .bullet-item { display: flex; gap: 10px; align-items: flex-start; color: #2d3748; }
                .check { margin-top: 3px; flex-shrink: 0; }
                .footnote { margin-top: 12px; color: #2d3748; }
                .footnote a { color: #048667; font-weight: 700; text-decoration: none; }
                @media (max-width: 900px) { .layout { grid-template-columns: 1fr; gap: 20px; } .illustration { min-height: 300px; font-size: 48px; } .title { font-size: 2rem; } }
            `}</style>
        </section>
    );
};

export default RequirementsDocuments;


