import React from "react";
import { useTranslation } from "react-i18next";

const ResourcesSection = () => {
    const { t } = useTranslation();

    const items = [
        {
            q: t('aboutPage.resources.items.0.q', 'Entry & Visa Basics'),
            a: t('aboutPage.resources.items.0.a', 'Many travelers can enter Morocco visa-free or with an eVisa for short stays. Always check the latest requirements with the Moroccan consulate and ensure your passport is valid for the duration of your trip.'),
        },
        {
            q: t('aboutPage.resources.items.1.q', 'Money & Payments in Morocco'),
            a: t('aboutPage.resources.items.1.a', 'The local currency is MAD (dirham). ATMs are common in cities; cards work at larger hotels and shops, but cash is preferred in markets and taxis. Keep small bills for tips and avoid dynamic currency conversion—pay in MAD.'),
        },
        {
            q: t('aboutPage.resources.items.2.q', 'Car Rental Essentials (Morocco)'),
            a: t('aboutPage.resources.items.2.a', 'Your home-country license is usually accepted; an International Driving Permit is recommended. Confirm insurance and roadside assistance, and check deposit vs. no-deposit options.'),
        },
        {
            q: t('aboutPage.resources.items.3.q', 'Getting Around & Airport Transfers'),
            a: t('aboutPage.resources.items.3.a', 'Pre-book a private driver for fixed pricing and meet-and-greet at arrivals, or use official taxi stands. Trains and intercity buses connect major cities; plan extra time during peak seasons.'),
        },
        {
            q: t('aboutPage.resources.items.4.q', 'Safety, Etiquette & Common Scams'),
            a: t('aboutPage.resources.items.4.a', 'Morocco is generally safe; use licensed guides/drivers and be cautious with unsolicited helpers. Dress modestly near religious sites, ask before photographing people, and keep valuables secure.'),
        },
    ];

    return (
        <section className="resources-section">
            <div className="container">
                <h2 className="title">{t('aboutPage.resources.title', 'Resources')}</h2>

                <div className="faqs">
                    {items.map((it, idx) => (
                        <details className="faq" key={idx}>
                            <summary className="question">{it.q}</summary>
                            <div className="answer">{it.a}</div>
                        </details>
                    ))}
                </div>
            </div>

            <style>{`
                .resources-section { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f6faf8; padding: 40px 0 46px; }
                .resources-section .container { max-width: 1000px; margin: 0 auto; padding: 0 24px; }
                .title { text-align: center; font-size: 22px; font-weight: 800; color: #0f1f1b; margin: 0 0 18px 0; }

                .faqs { max-width: 820px; margin: 0 auto; display: grid; gap: 12px; }
                .faq { background: #ffffff; border: 1px solid #e6efe9; border-radius: 14px; overflow: hidden; }
                .question { display: block; cursor: pointer; list-style: none; padding: 16px 18px; font-weight: 800; color: #0f1f1b; position: relative; }
                .question::-webkit-details-marker { display: none; }
                .question:after { content: '+'; position: absolute; right: 16px; top: 50%; transform: translateY(-50%); color: #6b7280; font-weight: 800; }
                .faq[open] .question:after { content: '-'; }
                .answer { padding: 0 18px 16px 18px; color: #4a5568; font-size: 14px; line-height: 1.7; }
            `}</style>
        </section>
    );
};

export default ResourcesSection;


