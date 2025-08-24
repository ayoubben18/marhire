import React from "react";
import { useTranslation } from "react-i18next";
import { FaMapMarkerAlt, FaPlus, FaShip } from "react-icons/fa";

const JourneyTimeline = () => {
    const { t } = useTranslation();

    const items = [
        {
            year: "2023",
            icon: <FaMapMarkerAlt size={16} />,
            title: t('aboutPage.journey.2023.title', 'Launched in Agadir, Morocco'),
        },
        {
            year: "2024",
            icon: <FaPlus size={16} />,
            title: t('aboutPage.journey.2024.title', 'Expanded nationwide'),
        },
        {
            year: "2025",
            icon: <FaShip size={16} />,
            title: t('aboutPage.journey.2025.title', 'Introduced boats, tours & more'),
        },
    ];

    return (
        <section className="journey-timeline">
            <div className="container">
                <h2 className="timeline-title">{t('aboutPage.journey.title', 'Our Journey')}</h2>
                <div className="timeline-grid">
                    {items.map((it, idx) => (
                        <div key={idx} className="timeline-item">
                            <div className="timeline-icon">
                                {it.icon}
                            </div>
                            <div className="timeline-year">{it.year}</div>
                            <div className="timeline-desc">{it.title}</div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .journey-timeline { background: #f1f7f5; padding: 36px 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); border-top: 1px solid #e6efe9; }
                .journey-timeline .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
                .timeline-title { text-align: center; font-size: 24px; font-weight: 800; color: #0f1f1b; margin: 0 0 18px 0; }
                .timeline-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; align-items: start; position: relative; }
                .timeline-grid:before { content: ''; position: absolute; top: 38px; left: 0; right: 0; height: 2px; background: #e0eee9; }
                .timeline-item { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; position: relative; }
                .timeline-icon { width: 36px; height: 36px; border-radius: 50%; background: #048667; color: #fff; display: inline-flex; align-items: center; justify-content: center; z-index: 1; }
                .timeline-year { font-weight: 800; color: #0f1f1b; }
                .timeline-desc { font-size: 12px; color: #6b7280; }
                @media (max-width: 800px) { .timeline-grid { grid-template-columns: 1fr; } .timeline-grid:before { display:none; } .journey-timeline { padding: 28px 0; } }
            `}</style>
        </section>
    );
};

export default JourneyTimeline;


