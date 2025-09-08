import React from "react";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";

const RequirementsDocuments = ({ imageSrc = null, imageAlt = "" }) => {
    const { t } = useTranslation();
    const altText = imageAlt || t('joinUs.requirementsDocs.title', 'Requirements & Documents');

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
        <section className="rd-requirements-docs">
            <div className="rd-container">
                <div className="rd-layout">
                    <div className={`rd-illustration${imageSrc ? '' : ' placeholder'}`} aria-hidden={imageSrc ? undefined : true}>
                        {imageSrc ? (
                            <img src={imageSrc} alt={altText} />
                        ) : (
                            <span>200 × 80</span>
                        )}
                    </div>
                    <div className="rd-content">
                        <h2 className="rd-title">{t('joinUs.requirementsDocs.title', 'Requirements & Documents')}</h2>
                        <p className="rd-subtitle">{t('joinUs.requirementsDocs.subtitle', 'To ensure a safe and trustworthy marketplace for travelers, we require all our partners to be licensed and fully compliant with local regulations. Before applying, please have the following documents ready:')}</p>

                        <ul className="rd-bullet-list">
                            {items.map((it, idx) => (
                                <li key={idx} className="rd-bullet-item">
                                    <CheckCircle2 size={18} color="#048667" className="rd-check" />
                                    <div>
                                        <strong>{it.title}:</strong> {it.desc}
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <p className="rd-footnote">
                            {t('joinUs.requirementsDocs.footnote', 'Submitting these helps us speed up the verification process and build a foundation of trust. For more details, review our partner terms.')} <a href="/support">partner terms</a>.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .rd-requirements-docs { padding: 70px 0; background: #f7f8f9; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
                .rd-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
                .rd-layout { display: grid; grid-template-columns: 1.2fr 1fr; gap: 36px; align-items: start; }
                .rd-illustration { background: #e6ecef; border: 1px solid #e2e8f0; border-radius: 16px; min-height: 600px; width: 100%; position: relative; padding: 0; color: #cbd5e0; font-size: 64px; font-weight: 700; overflow: hidden; }
                .rd-illustration img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover !important; object-position: center; display: block; }
                .rd-illustration.placeholder span { opacity: 0.85; }
                .rd-content { padding-top: 4px; }
                .rd-requirements-docs .rd-title { font-size: 2.2rem; font-weight: 800; color: #1a202c; margin: 0 0 12px 0; text-align: left; }
                .rd-subtitle { color: #718096; font-size: 1rem; line-height: 1.7; margin: 0 0 16px 0; }
                .rd-bullet-list { list-style: none; padding: 0; margin: 0 0 12px 0; display: flex; flex-direction: column; gap: 14px; }
                .rd-bullet-item { display: flex; gap: 10px; align-items: flex-start; color: #2d3748; }
                .rd-check { margin-top: 3px; flex-shrink: 0; }
                .rd-footnote { margin-top: 12px; color: #2d3748; }
                .rd-footnote a { color: #048667; font-weight: 700; text-decoration: none; }
                @media (max-width: 900px) { .rd-layout { grid-template-columns: 1fr; gap: 20px; } .rd-illustration { min-height: 360px; font-size: 48px; } .rd-title { font-size: 2rem; } }
            `}</style>
        </section>
    );
};

export default RequirementsDocuments;


