import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

const PartnerFAQ = () => {
    const { t } = useTranslation();
    const items = t('joinUs.partnerFaq.items', { returnObjects: true });
    const list = Array.isArray(items) ? items : [];
    const [openIdx, setOpenIdx] = useState(null);

    return (
        <section className="partner-faq">
            <div className="container">
                <h2 className="title">{t('joinUs.partnerFaq.title', 'Frequently Asked Questions')}</h2>
                <div className="grid">
                    {list.map((it, idx) => {
                        const isOpen = openIdx === idx;
                        const bodyId = `faq-panel-${idx}`;
                        return (
                            <div key={idx} className={`accordion ${isOpen ? 'open' : ''}`}>
                                <button
                                    className="accordion-header"
                                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                                    aria-expanded={isOpen}
                                    aria-controls={bodyId}
                                >
                                    <span className="question">{it.q}</span>
                                    <span className="chevron" aria-hidden>
                                        <ChevronDown size={18} />
                                    </span>
                                </button>
                                {isOpen && (
                                    <div id={bodyId} className="accordion-body">
                                        <p className="answer">{it.a}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .partner-faq { padding: 70px 0; background: #f7f8f9; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); }
                .container { max-width: 900px; margin: 0 auto; padding: 0 20px; }
                .title { text-align: center; font-size: 2rem; font-weight: 800; color: #1a202c; margin: 0 0 20px 0; }
                .grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
                .accordion { background: #fff; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; }
                .accordion-header { width: 100%; background: transparent; border: none; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; text-align: left; }
                .question { font-weight: 700; color: #1a202c; }
                .chevron { color: #718096; margin-left: 12px; transition: transform 0.2s ease; display: inline-flex; }
                .accordion.open .chevron { transform: rotate(180deg); }
                .accordion-body { padding: 0 20px 16px 20px; }
                .answer { margin: 0; color: #4a5568; line-height: 1.6; }
                @media (max-width: 768px) { .container { max-width: 100%; } }
            `}</style>
        </section>
    );
};

export default PartnerFAQ;


