import React from "react";
import { useTranslation } from "react-i18next";
import { Building, User, Ship, Map } from "lucide-react";

const Card = ({ icon, title, desc }) => (
    <div className="partner-card">
        <div className="icon-wrap">
            {icon}
        </div>
        <h3 className="card-title">{title}</h3>
        <p className="card-desc">{desc}</p>
    </div>
);

const WhoCanPartner = () => {
    const { t } = useTranslation();

    const cards = [
        {
            icon: <Building size={28} strokeWidth={2.2} color="#048667" />,
            title: t('joinUs.whoCanPartner.cards.cars.title', 'Car Rental Agencies'),
            desc: t(
                'joinUs.whoCanPartner.cards.cars.desc',
                'Licensed agencies offering a fleet of vehicles, from economy cars to luxury SUVs.'
            ),
        },
        {
            icon: <User size={28} strokeWidth={2.2} color="#048667" />,
            title: t('joinUs.whoCanPartner.cards.drivers.title', 'Private Drivers & Chauffeurs'),
            desc: t(
                'joinUs.whoCanPartner.cards.drivers.desc',
                'Professional drivers and companies providing airport transfers, city tours, and intercity travel.'
            ),
        },
        {
            icon: <Ship size={28} strokeWidth={2.2} color="#048667" />,
            title: t('joinUs.whoCanPartner.cards.boats.title', 'Boat & Yacht Operators'),
            desc: t(
                'joinUs.whoCanPartner.cards.boats.desc',
                'Businesses offering boat tours, fishing charters, yacht rentals, and water sports.'
            ),
        },
        {
            icon: <Map size={28} strokeWidth={2.2} color="#048667" />,
            title: t('joinUs.whoCanPartner.cards.activities.title', 'Tour & Activity Providers'),
            desc: t(
                'joinUs.whoCanPartner.cards.activities.desc',
                'Licensed guides and companies offering experiences like quad biking, camel rides, and city tours.'
            ),
        },
    ];

    return (
        <section className="who-can-partner">
            <div className="container">
                <div className="header">
                    <h2 className="title">{t('joinUs.whoCanPartner.title', 'Who Can Partner with Us?')}</h2>
                    <p className="subtitle">
                        {t(
                            'joinUs.whoCanPartner.subtitle',
                            "We partner with professional, licensed, and customer-focused businesses in Morocco's tourism sector. If you provide outstanding service, we want to hear from you."
                        )}
                    </p>
                </div>

                <div className="grid">
                    {cards.map((c, i) => (
                        <Card key={i} icon={c.icon} title={c.title} desc={c.desc} />
                    ))}
                </div>

                <p className="footnote">
                    {t(
                        'joinUs.whoCanPartner.footnote',
                        'We are actively seeking partners in all major Moroccan cities, including Agadir, Marrakech, Casablanca, Fes, Tangier, and more.'
                    )}
                </p>
            </div>

            <style>{`
                .who-can-partner { padding: 70px 0; background: #ffffff; }
                .container { max-width: 1140px; margin: 0 auto; padding: 0 20px; }
                .header { text-align: center; margin-bottom: 28px; }
                .title { font-size: 2rem; font-weight: 800; color: #1a202c; margin: 0 0 12px 0; }
                .subtitle { color: #718096; font-size: 1rem; line-height: 1.6; max-width: 880px; margin: 0 auto; }

                .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; margin-top: 26px; align-items: stretch; }
                .partner-card { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 28px; box-shadow: 0 1px 0 rgba(0,0,0,0.02); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; height: 100%; text-align: center; }
                .icon-wrap { width: 48px; height: 48px; border-radius: 999px; background: #e6f3f0; color: #048667; display: flex; align-items: center; justify-content: center; margin-bottom: 6px; }
                .icon-wrap :global(svg) { color: #048667; stroke: #048667; }
                .card-title { font-size: 1.25rem; font-weight: 700; color: #1a202c; margin: 0; }
                .card-desc { color: #4a5568; font-size: 0.95rem; line-height: 1.6; margin: 0; }
                .footnote { color: #2d3748; font-size: 0.95rem; margin-top: 18px; text-align: left; }
                .footnote strong, .footnote a { color: #048667; font-weight: 700; text-decoration: none; }

                @media (max-width: 768px) {
                    .who-can-partner { padding: 60px 0; }
                    .grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </section>
    );
};

export default WhoCanPartner;


