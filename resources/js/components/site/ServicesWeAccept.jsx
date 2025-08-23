import React from "react";
import { useTranslation } from "react-i18next";
import { FaCar, FaUserTie, FaShip, FaCompass } from "react-icons/fa";

const ServicesWeAccept = () => {
    const { t } = useTranslation();

    const services = [
        {
            icon: <FaCar size={50} />,
            title: t('joinUs.services.cars.title', 'Car Rentals'),
            description: t('joinUs.services.cars.desc', 'Economy, compact, luxury, SUVs, and specialty vehicles for all travel needs'),
            color: '#3B82F6',
            bgColor: '#EBF4FF'
        },
        {
            icon: <FaUserTie size={50} />,
            title: t('joinUs.services.drivers.title', 'Private Drivers'),
            description: t('joinUs.services.drivers.desc', 'Professional chauffeur services, airport transfers, and guided city tours'),
            color: '#10B981',
            bgColor: '#ECFDF5'
        },
        {
            icon: <FaShip size={50} />,
            title: t('joinUs.services.boats.title', 'Boat Rentals'),
            description: t('joinUs.services.boats.desc', 'Yacht charters, fishing boats, speedboats, and water sports equipment'),
            color: '#F59E0B',
            bgColor: '#FFFBEB'
        },
        {
            icon: <FaCompass size={50} />,
            title: t('joinUs.services.activities.title', 'Tours & Activities'),
            description: t('joinUs.services.activities.desc', 'Desert tours, cultural experiences, adventure activities, and local attractions'),
            color: '#8B5CF6',
            bgColor: '#F3E8FF'
        }
    ];

    return (
        <section className="services-we-accept-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">
                        {t('joinUs.servicesAccept.title', 'What Can You List?')}
                    </h2>
                    <p className="section-subtitle">
                        {t('joinUs.servicesAccept.subtitle', 'We welcome quality service providers across all major travel categories')}
                    </p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div key={index} className="service-card">
                            <div 
                                className="service-icon-container"
                                style={{ backgroundColor: service.bgColor }}
                            >
                                <div 
                                    className="service-icon"
                                    style={{ color: service.color }}
                                >
                                    {service.icon}
                                </div>
                            </div>
                            <div className="service-content">
                                <h3 className="service-title">
                                    {service.title}
                                </h3>
                                <p className="service-description">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="cta-section">
                    <p className="cta-text">
                        {t('joinUs.servicesAccept.cta', 'Don\'t see your service category? Contact us - we\'re always expanding!')}
                    </p>
                </div>
            </div>

            <style>{`
                .services-we-accept-section {
                    padding: 80px 0;
                    background: linear-gradient(135deg, #fafafa 0%, #f0f4f8 100%);
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

                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                    margin-bottom: 60px;
                }

                .service-card {
                    background: white;
                    border-radius: 16px;
                    padding: 35px 25px;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: all 0.3s ease;
                    border: 1px solid #e2e8f0;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                .service-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
                }

                .service-icon-container {
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 25px auto;
                    transition: all 0.3s ease;
                }

                .service-card:hover .service-icon-container {
                    transform: scale(1.05);
                }

                .service-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .service-content {
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                }

                .service-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: #1a202c;
                    margin-bottom: 15px;
                    line-height: 1.3;
                }

                .service-description {
                    font-size: 1rem;
                    color: #4a5568;
                    line-height: 1.6;
                    margin: 0;
                    flex-grow: 1;
                }

                .cta-section {
                    text-align: center;
                    padding: 40px 20px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
                }

                .cta-text {
                    font-size: 1.1rem;
                    color: #4a5568;
                    font-style: italic;
                    margin: 0;
                    max-width: 600px;
                    margin-left: auto;
                    margin-right: auto;
                    line-height: 1.6;
                }

                @media (max-width: 768px) {
                    .services-we-accept-section {
                        padding: 60px 0;
                    }

                    .section-title {
                        font-size: 2rem;
                    }

                    .section-subtitle {
                        font-size: 1.1rem;
                    }

                    .services-grid {
                        grid-template-columns: 1fr;
                        gap: 25px;
                        margin-bottom: 50px;
                    }

                    .service-card {
                        padding: 30px 20px;
                    }

                    .service-icon-container {
                        width: 80px;
                        height: 80px;
                        margin-bottom: 20px;
                    }

                    .service-title {
                        font-size: 1.25rem;
                    }

                    .cta-section {
                        padding: 30px 15px;
                    }

                    .cta-text {
                        font-size: 1rem;
                    }
                }

                @media (max-width: 480px) {
                    .section-title {
                        font-size: 1.75rem;
                    }
                    
                    .service-card {
                        padding: 25px 15px;
                    }

                    .service-icon-container {
                        width: 70px;
                        height: 70px;
                    }
                }
            `}</style>
        </section>
    );
};

export default ServicesWeAccept;