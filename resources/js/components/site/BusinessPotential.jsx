import React from "react";
import { useTranslation } from "react-i18next";
import {
    BarChart,
    MessageSquare,
    PlusCircle,
    User,
    Shield,
    TrendingUp,
} from "lucide-react";

const BusinessPotential = () => {
    const { t } = useTranslation();

    const features = [
        {
            icon: <TrendingUp size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.seo.title",
                "Effortless SEO & Reach"
            ),
            description: t(
                "joinUs.businessPotential.features.seo.description",
                "Get discovered by travelers searching for services in Morocco. We invest in marketing so your listings rank higher."
            ),
        },
        {
            icon: <BarChart size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.zeroCost.title",
                "Grow with Zero Upfront Cost"
            ),
            description: t(
                "joinUs.businessPotential.features.zeroCost.description",
                "Our commission-based model means we only succeed when you do. No setup fees, no monthly subscriptions."
            ),
        },
        {
            icon: <MessageSquare size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.support.title",
                "24/7 Human Support"
            ),
            description: t(
                "joinUs.businessPotential.features.support.description",
                "Our local, multilingual team is available on WhatsApp and email to help you and your customers, anytime."
            ),
        },
        {
            icon: <PlusCircle size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.onboarding.title",
                "Fast & Easy Onboarding"
            ),
            description: t(
                "joinUs.businessPotential.features.onboarding.description",
                "Our team helps you create optimized listings. We handle the tech, you just provide the service details."
            ),
        },
        {
            icon: <User size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.profile.title",
                "Dedicated Partner Profile"
            ),
            description: t(
                "joinUs.businessPotential.features.profile.description",
                "Showcase your brand with a professional profile featuring your services, policies, and customer reviews."
            ),
        },
        {
            icon: <Shield size={40} strokeWidth={1.5} />,
            title: t(
                "joinUs.businessPotential.features.partnership.title",
                "A True Partnership"
            ),
            description: t(
                "joinUs.businessPotential.features.partnership.description",
                "We work with you to maximize your bookings, providing insights and support to help your business thrive in cities like Agadir and Marrakech."
            ),
        },
    ];

    return (
        <section className="business-potential-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        {t(
                            "joinUs.businessPotential.title",
                            "Unlock Your Business’s Full Potential"
                        )}
                    </h2>
                    <p className="section-subtitle">
                        {t(
                            "joinUs.businessPotential.subtitle",
                            "MarHire isn't just a listing site; we're your growth partner. We provide the tools, technology, and support to connect you with a global audience of travelers seeking quality experiences in Morocco."
                        )}
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div className="feature-card" key={index}>
                            <div className="feature-icon-wrapper">
                                {feature.icon}
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                .business-potential-section {
                    padding: 80px 0;
                    background-color: #ffffff;
                }
                .container {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 20px;
                }
                .section-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 60px;
                    max-width: 800px;
                    margin-left: auto;
                    margin-right: auto;
                }
                .section-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1a202c;
                    margin-bottom: 1rem;
                }
                .section-subtitle {
                    font-size: 1.125rem;
                    color: #4a5568;
                    line-height: 1.6;
                }
                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 30px;
                }
                .feature-card {
                    background-color: #f7fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 40px;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
                }
                .feature-icon-wrapper {
                    width: 64px;
                    height: 64px;
                    border-radius: 50%;
                    background-color: #e6f3f0;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 20px;
                    color: #048667;
                }
                .feature-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 10px;
                }
                .feature-description {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.6;
                }
                @media (max-width: 992px) {
                    .features-grid {
                        grid-template-columns: 1fr;
                    }
                }
                @media (max-width: 768px) {
                    .business-potential-section {
                        padding: 60px 0;
                    }
                    .section-title {
                        font-size: 2rem;
                    }
                    .section-subtitle {
                        font-size: 1rem;
                    }
                    .feature-card {
                        padding: 30px;
                    }
                }
            `}</style>
        </section>
    );
};

export default BusinessPotential;
