import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/site/Footer";
import axios from "axios";

const Partners = () => {
    const { t } = useTranslation();
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPartners();
    }, []);

    const fetchPartners = async () => {
        try {
            const response = await axios.get('/api/get_active_agencies');
            setPartners(response.data.agencies);
        } catch (error) {
            console.error('Error fetching partners:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
    <>
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-3xl font-bold mb-4 text-center">
                {t("partners.title", "Our Trusted Partners")}
            </h1>
            <p className="text-center mb-8 text-lg">
                {t("partners.description", "MarHire partners with top local agencies and world brands to provide you with the best, most reliable travel experience in Morocco.")}
            </p>
            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : partners.length > 0 ? (
                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-12">
                    {partners.map((partner) => (
                        <a
                            key={partner.id}
                            href={`/agency/${partner.slug}`}
                            className="flex flex-col items-center p-6 rounded-lg bg-gray-50 shadow-sm hover:shadow-md transition"
                        >
                            <img
                                src={partner.agency_logo ? `/${partner.agency_logo}` : "/images/not-found.png"}
                                alt={partner.agency_name}
                                className="mb-4 h-16 object-contain"
                                style={{ maxWidth: 120 }}
                                onError={(e) => {
                                    e.target.src = "/images/not-found.png";
                                }}
                            />
                            <h2 className="text-xl font-semibold mb-2">
                                {partner.agency_name}
                            </h2>
                            <div 
                                className="text-sm text-gray-600 text-center"
                                dangerouslySetInnerHTML={{ 
                                    __html: partner.short_description || t("partners.defaultDescription", "Trusted partner in Morocco")
                                }}
                            />
                            {partner.city && (
                                <p className="text-xs text-gray-500 mt-2">
                                    {partner.city.city_name}
                                </p>
                            )}
                        </a>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-gray-600">{t("partners.noPartners", "No partners available at the moment.")}</p>
                </div>
            )}
            <div className="text-center my-10">
                <h2 className="text-lg font-semibold mb-2">
                    {t("partners.becomePartner", "Become a MarHire Partner")}
                </h2>
                <p className="mb-4">
                    {t("partners.becomePartnerDesc", "Are you a local agency, tour operator, or travel business in Morocco?")} <br />
                    {t("partners.becomePartnerCta", "Join MarHire and reach thousands of international travelers.")}
                </p>
                <a
                    href="/list-your-property"
                    className="inline-block px-6 py-2 text-white rounded-full font-medium hover:bg-teal-700 transition btn-style1"
                >
                    {t("partners.applyButton", "Apply to Partner with Us")}
                </a>
            </div>
        </div>
        <Footer />
    </>
    );
};

export default Partners;
