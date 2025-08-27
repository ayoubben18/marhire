import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import HeroSectionPartners from "../components/site/HeroSectionPartners";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { getLocalizedUrl } from "../utils/localeManager";

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

    // Group partners by category using known IDs and translation keys
    const CATEGORY_ORDER = [2, 3, 4, 5];
    const grouped = useMemo(() => {
        const groups = partners.reduce((acc, partner) => {
            const key = Number(partner.category_id) || -1;
            if (!acc[key]) acc[key] = [];
            acc[key].push(partner);
            return acc;
        }, {});
        return groups;
    }, [partners]);

    const categoryLabel = (id) => {
        switch (Number(id)) {
            case 2:
                return t('categories.carRental', 'Car Rental');
            case 3:
                return t('categories.privateDriver', 'Private Driver');
            case 4:
                return t('categories.boatRental', 'Boat Rental');
            case 5:
                return t('categories.activity', 'Activity');
            default:
                return t('partners.otherCategory', 'Other');
        }
    };

    return (
    <>
        <HeroSectionPartners />
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="text-3xl font-bold mb-4 text-center">
                {t("partners.title", "Our Trusted Partners")}
            </h1>
            <p className="text-center mb-10 text-lg">
                {t("partners.description", "MarHire partners with top local agencies and world brands to provide you with the best, most reliable travel experience in Morocco.")}
            </p>

            {loading ? (
                <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                </div>
            ) : partners.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">{t("partners.noPartners", "No partners available at the moment.")}</p>
                </div>
            ) : (
                <div className="space-y-10">
                    {CATEGORY_ORDER.filter((catId) => grouped[catId] && grouped[catId].length > 0).map((catId) => (
                        <section key={catId}>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-2xl font-semibold">{categoryLabel(catId)}</h2>
                                <span className="text-sm text-gray-500">{grouped[catId].length}</span>
                            </div>
                            <ul className="partners-grid">
                                {grouped[catId].map((partner) => (
                                    <li key={partner.id}>
                                        <a href={getLocalizedUrl(`/agency/${partner.slug}`)} className="partner-link">
                                            <FaArrowRight size={12} className="arrow" />
                                            <span className="label">{partner.agency_name}{partner.city?.city_name ? ` (${partner.city.city_name})` : ''}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    ))}

                    {grouped[-1] && grouped[-1].length > 0 && (
                        <section>
                            <div className="flex items-center justify-between mb-3">
                                <h2 className="text-2xl font-semibold">{categoryLabel(-1)}</h2>
                                <span className="text-sm text-gray-500">{grouped[-1].length}</span>
                            </div>
                            <ul className="partners-grid">
                                {grouped[-1].map((partner) => (
                                    <li key={partner.id}>
                                        <a href={getLocalizedUrl(`/agency/${partner.slug}`)} className="partner-link">
                                            <FaArrowRight size={12} className="arrow" />
                                            <span className="label">{partner.agency_name}{partner.city?.city_name ? ` (${partner.city.city_name})` : ''}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    )}
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
                    href={getLocalizedUrl('/list-your-property')}
                    className="inline-block px-6 py-2 text-white rounded-full font-medium hover:opacity-90 transition btn-style1"
                >
                    {t("partners.applyButton", "Apply to Partner with Us")}
                </a>
            </div>

            <style>{`
                .partners-grid { display: grid; grid-template-columns: repeat(1, minmax(0, 1fr)); gap: 8px 16px; }
                @media (min-width: 640px){ .partners-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }}
                @media (min-width: 768px){ .partners-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }}
                @media (min-width: 1024px){ .partners-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }}
                .partner-link { display:flex; align-items:center; gap:8px; color:#5f6b6d; text-decoration:none; padding:8px 6px; border-radius:10px; }
                .partner-link:hover { color:#048667; background:#f2faf8; }
                .arrow { color:#048667; }
                .label { overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
            `}</style>
        </div>
        <FreeTexts slug="partners" />
        <Footer />
    </>
    );
};

export default Partners;
