import React from "react";
import { useTranslation } from "react-i18next";
import { BadgePercent, Banknote, LineChart } from "lucide-react";

const Card = ({ icon, title, desc }) => (
    <div className="card">
        <div className="icon-wrap">{icon}</div>
        <h4 className="card-title">{title}</h4>
        <p className="card-desc">{desc}</p>
    </div>
);

const FairCommissions = () => {
    const { t } = useTranslation();

    const cards = [
        {
            icon: <BadgePercent size={26} color="#048667" strokeWidth={2} />,
            title: t('joinUs.commissions.cards.transparentCommission.title', 'Transparent Commission'),
            desc: t('joinUs.commissions.cards.transparentCommission.desc', 'You only pay a competitive, fixed commission on confirmed bookings. No hidden costs, ever.'),
        },
        {
            icon: <Banknote size={26} color="#048667" strokeWidth={2} />,
            title: t('joinUs.commissions.cards.monthlyPayouts.title', 'Reliable Monthly Payouts'),
            desc: t('joinUs.commissions.cards.monthlyPayouts.desc', 'Receive your earnings automatically every month via secure bank transfer.'),
        },
        {
            icon: <LineChart size={26} color="#048667" strokeWidth={2} />,
            title: t('joinUs.commissions.cards.performanceDashboard.title', 'Performance Dashboard'),
            desc: t('joinUs.commissions.cards.performanceDashboard.desc', 'Track your bookings, view earnings reports, and get insights to optimize your listings.'),
        },
    ];

    return (
        <section className="fair-commissions">
            <div className="container">
                <div className="header">
                    <h2 className="title">{t('joinUs.commissions.title', 'Fair Commissions & Fast Payouts')}</h2>
                    <p className="subtitle">{t('joinUs.commissions.subtitle', "Our business model is simple: we grow together. We've designed our financial system to be transparent, fair, and beneficial for our partners.")}</p>
                </div>
                <div className="commissions-grid">
                    {cards.map((c, idx) => (
                        <Card key={idx} icon={c.icon} title={c.title} desc={c.desc} />
                    ))}
                </div>
            </div>

            <style>{`
                .fair-commissions { padding: 70px 0; background: #ffffff; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
                .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
                .header { text-align: center; margin-bottom: 28px; }
                .title { font-size: 2rem; font-weight: 800; color: #1a202c; margin: 0 0 12px 0; }
                .subtitle { color: #718096; font-size: 1rem; line-height: 1.6; max-width: 880px; margin: 0 auto; }
                .commissions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 24px; }
                .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 8px; }
                .icon-wrap { width: 48px; height: 48px; border-radius: 999px; background: #e6f3f0; display: flex; align-items: center; justify-content: center; }
                .card-title { margin: 4px 0 4px 0; font-weight: 700; color: #1a202c; }
                .card-desc { margin: 0; color: #4a5568; line-height: 1.6; }
                @media (max-width: 768px) { .commissions-grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default FairCommissions;


