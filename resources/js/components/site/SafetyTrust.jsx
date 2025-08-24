import { useTranslation } from "react-i18next";
import { FaShieldAlt } from "react-icons/fa";

const SafetyTrust = () => {
    const { t } = useTranslation();
    const policies = t('aboutPage.safety.items', {
        returnObjects: true,
        defaultValue: [
            "Centralized Booking & Support",
            "Verified & Trusted Agencies",
            "Refund and Cancellation Policies",
            "No Deposit Options",
            "24/7 WhatsApp Support",
            "Airport Pickup Guarantee",
        ]
    });

    return (
        <section className="safety-section">
            <div className="container">
                <h2 className="safety-title">{t('aboutPage.safety.title', 'Our Safety & Trust Policies')}</h2>
                <div className="policies-grid">
                    {policies.map((policy, index) => (
                        <div key={index} className="policy">
                            <span className="icon">
                                <FaShieldAlt size={14} />
                            </span>
                            <span className="label">{policy}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .safety-section { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background:#ffffff; padding: 20px 0 24px; }
                .safety-section .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
                .safety-title { text-align: center; font-size: 22px; font-weight: 800; color: #0f1f1b; margin: 0 0 14px 0; }

                .policies-grid { max-width: 820px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px 18px; }
                .policy { display: flex; align-items: center; gap: 10px; }
                .policy .icon { width: 32px; height: 32px; border-radius: 50%; background: rgba(4, 134, 103, 0.08); color: #048667; display: inline-flex; align-items: center; justify-content: center; }
                .policy .label { font-size: 14px; color: #111827; font-weight: 600; }

                @media (max-width: 900px) { .policies-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 560px) { .policies-grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default SafetyTrust;
