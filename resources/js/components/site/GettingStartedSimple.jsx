import React from "react";
import { useTranslation } from "react-i18next";

const GettingStartedSimple = () => {
    const { t } = useTranslation();

    const steps = [
        {
            number: t('joinUs.howItWorks.stepsExact.one.number', '1'),
            title: t('joinUs.howItWorks.stepsExact.one.title', 'Submit Your Application'),
            description: t(
                'joinUs.howItWorks.stepsExact.one.desc',
                "Fill out our simple online form with your company details and services. It only takes a few minutes."
            ),
        },
        {
            number: t('joinUs.howItWorks.stepsExact.two.number', '2'),
            title: t('joinUs.howItWorks.stepsExact.two.title', 'Verification & Review'),
            description: t(
                'joinUs.howItWorks.stepsExact.two.desc',
                "Our team reviews your application and documents within 24-48 hours to ensure you meet our quality standards."
            ),
        },
        {
            number: t('joinUs.howItWorks.stepsExact.three.number', '3'),
            title: t('joinUs.howItWorks.stepsExact.three.title', 'We Build Your Listings'),
            description: t(
                'joinUs.howItWorks.stepsExact.three.desc',
                "Once approved, we work with you to create professional, high-converting listings for your services, complete with photos and clear details."
            ),
        },
        {
            number: t('joinUs.howItWorks.stepsExact.four.number', '4'),
            title: t('joinUs.howItWorks.stepsExact.four.title', 'Go Live & Get Bookings'),
            description: t(
                'joinUs.howItWorks.stepsExact.four.desc',
                "Your listings are published across MarHire, instantly visible to travelers looking for services in Agadir, Marrakech, and all over Morocco."
            ),
        },
    ];

    return (
        <section className="getting-started-simple">
            <div className="container">
                <div className="header">
                    <h2 className="title">
                        {t('joinUs.howItWorks.title', 'Getting Started is Simple')}
                    </h2>
                    <p className="subtitle">
                        {t(
                            'joinUs.howItWorks.subtitle',
                            'Our streamlined process is designed to get your business online and ready for bookings as quickly as possible.'
                        )}
                    </p>
                </div>

                <div className="steps-row">
                    {steps.map((step, idx) => (
                        <div key={idx} className="step">
                            <div className="circle">{step.number}</div>
                            <h3 className="step-title">{step.title}</h3>
                            <p className="step-desc">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .getting-started-simple {
                    padding: 70px 0;
                    background: #f7f8f9;
                    margin-left: calc(50% - 50vw);
                    margin-right: calc(50% - 50vw);
                }

                .container {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .header {
                    text-align: center;
                    margin-bottom: 40px;
                }

                .title {
                    font-size: 2.2rem;
                    font-weight: 800;
                    color: #1a202c;
                    margin: 0 0 12px 0;
                }

                .subtitle {
                    color: #718096;
                    font-size: 1rem;
                    line-height: 1.6;
                    max-width: 760px;
                    margin: 0 auto;
                }

                .steps-row {
                    position: relative;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 24px;
                }

                /* thin connector line behind circles on desktop */
                .steps-row:before {
                    content: '';
                    position: absolute;
                    left: 3%;
                    right: 3%;
                    top: 34px;
                    height: 1px;
                    background: #e2e8f0;
                }

                .step {
                    text-align: center;
                    padding: 10px 12px 0;
                }

                .circle {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    border: 2px solid #048667;
                    color: #048667;
                    font-weight: 700;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: #fff;
                    margin: 0 auto 14px auto;
                    position: relative;
                    z-index: 1;
                }

                .step-title {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin: 0 0 8px 0;
                }

                .step-desc {
                    font-size: 0.95rem;
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 1024px) {
                    .steps-row {
                        grid-template-columns: repeat(2, 1fr);
                        row-gap: 36px;
                    }
                    .steps-row:before {
                        display: none;
                    }
                }

                @media (max-width: 640px) {
                    .getting-started-simple {
                        padding: 60px 0;
                    }
                    .title {
                        font-size: 1.8rem;
                    }
                    .steps-row {
                        grid-template-columns: 1fr;
                        row-gap: 28px;
                    }
                }
            `}</style>
        </section>
    );
};

export default GettingStartedSimple;


