import React from "react";
import { useTranslation } from "react-i18next";
import { FaCheckCircle, FaCertificate, FaComments, FaDollarSign, FaShieldAlt, FaStar } from "react-icons/fa";

const PartnershipRequirements = () => {
    const { t } = useTranslation();

    const requirements = [
        {
            icon: <FaCertificate size={24} />,
            title: t('joinUs.requirements.registration.title', 'Valid Business Registration'),
            description: t('joinUs.requirements.registration.desc', 'Your business must be legally registered in Morocco with valid documentation'),
            color: '#3B82F6'
        },
        {
            icon: <FaStar size={24} />,
            title: t('joinUs.requirements.standards.title', 'Professional Service Standards'),
            description: t('joinUs.requirements.standards.desc', 'Maintain high-quality services, clean vehicles/equipment, and professional staff'),
            color: '#F59E0B'
        },
        {
            icon: <FaComments size={24} />,
            title: t('joinUs.requirements.communication.title', 'Responsive Communication'),
            description: t('joinUs.requirements.communication.desc', 'Respond to booking requests within 4 hours and maintain clear customer communication'),
            color: '#10B981'
        },
        {
            icon: <FaDollarSign size={24} />,
            title: t('joinUs.requirements.pricing.title', 'Competitive Pricing'),
            description: t('joinUs.requirements.pricing.desc', 'Offer fair, transparent pricing that provides value to travelers'),
            color: '#8B5CF6'
        },
        {
            icon: <FaShieldAlt size={24} />,
            title: t('joinUs.requirements.insurance.title', 'Valid Insurance Coverage'),
            description: t('joinUs.requirements.insurance.desc', 'Maintain appropriate insurance for your services and business operations'),
            color: '#EF4444'
        },
        {
            icon: <FaCheckCircle size={24} />,
            title: t('joinUs.requirements.commitment.title', 'Commitment to Excellence'),
            description: t('joinUs.requirements.commitment.desc', 'Dedication to providing exceptional experiences and building long-term partnerships'),
            color: '#06B6D4'
        }
    ];

    return (
        <section className="partnership-requirements-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        {t('joinUs.requirements.title', 'Partnership Requirements')}
                    </h2>
                    <p className="section-subtitle">
                        {t('joinUs.requirements.subtitle', 'We maintain high standards to ensure the best experience for travelers and partners')}
                    </p>
                </div>

                <div className="requirements-grid">
                    {requirements.map((requirement, index) => (
                        <div key={index} className="requirement-item">
                            <div 
                                className="requirement-icon"
                                style={{ color: requirement.color }}
                            >
                                {requirement.icon}
                            </div>
                            <div className="requirement-content">
                                <h3 className="requirement-title">
                                    {requirement.title}
                                </h3>
                                <p className="requirement-description">
                                    {requirement.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bottom-note">
                    <div className="note-card">
                        <h4 className="note-title">
                            {t('joinUs.requirements.note.title', 'Ready to Meet Our Standards?')}
                        </h4>
                        <p className="note-text">
                            {t('joinUs.requirements.note.text', 'If you meet these requirements and are committed to providing exceptional service, we\'d love to have you join our partner network.')}
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .partnership-requirements-section {
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
                    margin-bottom: 60px;
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
                    max-width: 700px;
                    margin: 0 auto;
                    line-height: 1.6;
                }

                .requirements-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
                    gap: 30px;
                    margin-bottom: 60px;
                }

                .requirement-item {
                    display: flex;
                    align-items: flex-start;
                    padding: 25px;
                    background: #f8fafc;
                    border-radius: 12px;
                    border-left: 4px solid #e2e8f0;
                    transition: all 0.3s ease;
                }

                .requirement-item:hover {
                    transform: translateX(5px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    border-left-color: var(--color1, #3B82F6);
                }

                .requirement-icon {
                    flex-shrink: 0;
                    width: 48px;
                    height: 48px;
                    border-radius: 50%;
                    background: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 20px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                }

                .requirement-content {
                    flex-grow: 1;
                }

                .requirement-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 8px;
                    line-height: 1.3;
                }

                .requirement-description {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                }

                .bottom-note {
                    text-align: center;
                }

                .note-card {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 40px 30px;
                    border-radius: 16px;
                    max-width: 600px;
                    margin: 0 auto;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
                }

                .note-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    margin-bottom: 15px;
                    line-height: 1.3;
                }

                .note-text {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    margin: 0;
                    opacity: 0.95;
                }

                @media (max-width: 768px) {
                    .partnership-requirements-section {
                        padding: 60px 0;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .section-subtitle {
                        font-size: 1.1rem;
                    }

                    .requirements-grid {
                        grid-template-columns: 1fr;
                        gap: 25px;
                        margin-bottom: 50px;
                    }

                    .requirement-item {
                        padding: 20px;
                        flex-direction: column;
                        text-align: center;
                    }

                    .requirement-icon {
                        margin-right: 0;
                        margin-bottom: 15px;
                    }

                    .requirement-title {
                        font-size: 1.125rem;
                    }

                    .note-card {
                        padding: 30px 20px;
                    }

                    .note-title {
                        font-size: 1.25rem;
                    }

                    .note-text {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .section-title {
                        font-size: 1.75rem;
                    }
                    
                    .requirements-grid {
                        grid-template-columns: 1fr;
                    }

                    .requirement-item {
                        padding: 15px;
                    }

                    .note-card {
                        padding: 25px 15px;
                    }
                }
            `}</style>
        </section>
    );
};

export default PartnershipRequirements;