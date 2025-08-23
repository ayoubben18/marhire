import React from "react";
import { useTranslation } from "react-i18next";
import {
    FaBolt,
    FaChartLine,
    FaComments,
    FaPlusCircle,
    FaUserTie,
    FaHandshake
} from "react-icons/fa";

const ValueProposition = () => {
    const { t } = useTranslation();

    const benefits = [
        {
            icon: <FaBolt />,
            title: t('joinUs.benefits.seo.title', 'Effortless SEO & Reach'),
            description: t('joinUs.benefits.seo.desc', 'Get discovered by travelers searching for services in Morocco. We invest in marketing so your listings rank higher.'),
        },
        {
            icon: <FaChartLine />,
            title: t('joinUs.benefits.cost.title', 'Grow with Zero Upfront Cost'),
            description: t('joinUs.benefits.cost.desc', 'Our commission-based model means we only succeed when you do. No setup fees, no monthly subscriptions.'),
        },
        {
            icon: <FaComments />,
            title: t('joinUs.benefits.support.title', 'Dedicated Support'),
            description: t('joinUs.benefits.support.desc', 'Get multilingual support in Arabic, French & English from our dedicated partner success team'),
        },
        {
            icon: <FaPlusCircle />,
            title: t('joinUs.benefits.onboarding.title', 'Fast & Easy Onboarding'),
            description: t('joinUs.benefits.onboarding.desc', 'Our team helps you create optimized listings. We handle the tech, you just provide the service details.'),
        },
        {
            icon: <FaUserTie size={32} />,
            title: t('joinUs.benefits.profile.title', 'Dedicated Partner Profile'),
            description: t('joinUs.benefits.profile.desc', 'Showcase your brand with a professional profile featuring your services, policies, and customer reviews.'),
        },
        {
            icon: <FaHandshake size={32} />,
            title: t('joinUs.benefits.partnership.title', 'A True Partnership'),
            description: t('joinUs.benefits.partnership.desc', 'We work with you to maximize your bookings, providing insights and support to help your business thrive in cities like Agadir and Marrakech.'),
        }
    ];

    return (
        <section className="value-proposition-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        {t('joinUs.valueProps.title', 'Why Partner with MarHire?')}
                    </h2>
                    <p className="section-subtitle">
                        {t('joinUs.valueProps.subtitle', 'Join over 200+ trusted partners across Morocco')}
                    </p>
                </div>
                
                <div className="benefits-grid">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="benefit-card">
                            <div className="benefit-icon">
                                {benefit.icon}
                            </div>
                            <h3 className="benefit-title">
                                {benefit.title}
                            </h3>
                            <p className="benefit-description">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .value-proposition-section {
                    padding: 80px 0;
                    background-color: #f8f9fa;
                }

                .container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                .section-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 60px;
                    flex-wrap: wrap;
                }

                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1a202c;
                    line-height: 1.2;
                    margin-right: 20px;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: #4a5568;
                    font-weight: 400;
                    max-width: 400px;
                    line-height: 1.6;
                }

                .benefits-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }

                .benefit-card {
                    background: #ffffff;
                    padding: 30px;
                    border-radius: 12px;
                    text-align: left;
                    border: 1px solid #e9ecef;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                }

                .benefit-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
                }

                .benefit-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: #e6f3f0;
                    margin-bottom: 20px;
                    color: #048667;
                }
                
                .benefit-icon svg {
                    font-size: 24px;
                }

                .benefit-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 12px;
                    line-height: 1.3;
                }

                .benefit-description {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                }

                @media (max-width: 992px) {
                    .benefits-grid {
                        grid-template-columns: 1fr;
                    }
                }

                @media (max-width: 768px) {
                    .section-header {
                        flex-direction: column;
                        align-items: flex-start;
                        text-align: left;
                        margin-bottom: 40px;
                    }

                    .section-title {
                        font-size: 2rem;
                        margin-bottom: 1rem;
                    }

                    .section-subtitle {
                        font-size: 1rem;
                        max-width: 100%;
                    }
                    
                    .value-proposition-section {
                        padding: 60px 0;
                    }

                    .benefits-grid {
                        gap: 20px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ValueProposition;