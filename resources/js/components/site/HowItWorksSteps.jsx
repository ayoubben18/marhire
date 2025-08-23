import React from "react";
import { useTranslation } from "react-i18next";
import { FaClipboardList, FaUserCheck, FaListAlt, FaDollarSign } from "react-icons/fa";

const HowItWorksSteps = () => {
    const { t } = useTranslation();

    const steps = [
        {
            number: "01",
            icon: <FaClipboardList size={40} />,
            title: t('joinUs.steps.apply.title', 'Apply'),
            description: t('joinUs.steps.apply.desc', 'Submit your business details through our simple application form'),
            color: '#EF4444'
        },
        {
            number: "02", 
            icon: <FaUserCheck size={40} />,
            title: t('joinUs.steps.verified.title', 'Get Verified'),
            description: t('joinUs.steps.verified.desc', 'We review your application and verify your business in just 48 hours'),
            color: '#F59E0B'
        },
        {
            number: "03",
            icon: <FaListAlt size={40} />,
            title: t('joinUs.steps.list.title', 'List Your Services'),
            description: t('joinUs.steps.list.desc', 'Add your offerings to our platform with help from our onboarding team'),
            color: '#10B981'
        },
        {
            number: "04",
            icon: <FaDollarSign size={40} />,
            title: t('joinUs.steps.earn.title', 'Start Earning'),
            description: t('joinUs.steps.earn.desc', 'Receive bookings from travelers and grow your business with MarHire'),
            color: '#8B5CF6'
        }
    ];

    return (
        <section className="how-it-works-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        {t('joinUs.howItWorks.title', 'Getting Started is Simple')}
                    </h2>
                    <p className="section-subtitle">
                        {t('joinUs.howItWorks.subtitle', 'Join our marketplace in 4 easy steps')}
                    </p>
                </div>

                <div className="steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="step-item">
                            <div className="step-number" style={{ backgroundColor: step.color }}>
                                {step.number}
                            </div>
                            <div className="step-icon" style={{ color: step.color }}>
                                {step.icon}
                            </div>
                            <h3 className="step-title">
                                {step.title}
                            </h3>
                            <p className="step-description">
                                {step.description}
                            </p>
                            {index < steps.length - 1 && (
                                <div className="step-connector"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .how-it-works-section {
                    padding: 80px 0;
                    background: white;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 70px;
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 1rem;
                    line-height: 1.2;
                }

                .section-subtitle {
                    font-size: 1.25rem;
                    color: #4a5568;
                    font-weight: 400;
                    max-width: 600px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .steps-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                    position: relative;
                }

                .step-item {
                    text-align: center;
                    position: relative;
                    padding: 30px 20px;
                }

                .step-number {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    color: white;
                    font-size: 1.5rem;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px auto;
                    position: relative;
                    z-index: 2;
                }

                .step-icon {
                    margin-bottom: 24px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .step-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 16px;
                    line-height: 1.3;
                }

                .step-description {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                    max-width: 280px;
                    margin-left: auto;
                    margin-right: auto;
                }

                .step-connector {
                    position: absolute;
                    top: 60px;
                    right: -20px;
                    width: 40px;
                    height: 2px;
                    background: #e2e8f0;
                    z-index: 1;
                }

                @media (max-width: 768px) {
                    .how-it-works-section {
                        padding: 60px 0;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .section-subtitle {
                        font-size: 1.1rem;
                    }

                    .steps-container {
                        grid-template-columns: 1fr;
                        gap: 50px;
                    }

                    .step-connector {
                        display: none;
                    }

                    .step-item {
                        padding: 20px 15px;
                    }

                    .step-title {
                        font-size: 1.25rem;
                    }

                    /* Add vertical connectors for mobile */
                    .step-item:not(:last-child)::after {
                        content: '';
                        position: absolute;
                        bottom: -25px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 2px;
                        height: 50px;
                        background: #e2e8f0;
                        z-index: 1;
                    }
                }

                @media (max-width: 480px) {
                    .section-title {
                        font-size: 1.75rem;
                    }
                    
                    .step-number {
                        width: 50px;
                        height: 50px;
                        font-size: 1.25rem;
                    }

                    .step-description {
                        max-width: 100%;
                    }
                }

                @media (min-width: 769px) and (max-width: 1199px) {
                    .steps-container {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    
                    .step-connector {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorksSteps;