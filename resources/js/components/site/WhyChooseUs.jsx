import React from "react";

const WhyChooseUs = ({ title, subtitle, features }) => {
    return (
        <section className="chooseus-container">
            <div className="head">
                <h2 className="title">{title}</h2>
                {subtitle ? <p className="subtitle">{subtitle}</p> : null}
            </div>

            <div className="grid">
                {features.slice(0, 6).map((feature, index) => (
                    <div key={index} className="card">
                        {feature.icon ? (
                            <div className="ico">
                                {typeof feature.icon === 'string' ? (
                                    <img src={feature.icon} alt={feature.title} />
                                ) : (
                                    feature.icon
                                )}
                            </div>
                        ) : null}
                        <h3 className="card-title">{feature.title}</h3>
                        <p className="card-desc">{feature.desc}</p>
                    </div>
                ))}
            </div>

            <style>{`
                .chooseus-container { margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); padding: 40px 0; background: #ffffff; }
                .head { text-align: center; margin: 0 0 16px 0; }
                .title { font-size: 22px; font-weight: 800; color: #0f1f1b; margin: 0; }
                .subtitle { margin: 6px 0 0 0; color: #6b7280; font-size: 14px; }

                .grid { max-width: 1200px; margin: 0 auto; padding: 0 24px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
                .card { background: #ffffff; border: 1px solid #e6efe9; border-radius: 14px; padding: 22px; display: flex; flex-direction: column; align-items: center; text-align: center; }
                .ico { width: 56px; height: 56px; border-radius: 50%; background: #f2faf8; border: 1px solid #a7d7cd; display: inline-flex; align-items: center; justify-content: center; margin: 6px 0 10px; }
                .ico img { width: 26px; height: 26px; object-fit: contain; }
                .ico svg { width: 26px; height: 26px; color: #048667; }
                .card-title { margin: 0 0 6px 0; font-size: 17px; font-weight: 800; color: #0f1f1b; }
                .card-desc { margin: 0; color: #6b7280; font-size: 14px; line-height: 1.6; }

                @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
                @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
};

export default WhyChooseUs;
