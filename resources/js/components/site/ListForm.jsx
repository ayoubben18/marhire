import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { MdVerified } from "react-icons/md";
import RequiredAsterisk from "./RequiredAsterisk";

const ListForm = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        whatsapp: "",
        iceNumber: "",
        rcNumber: "",
        city: "",
        category: "",
        description: "",
        confirmOwner: false,
        confirmTerms: false,
    });
    const [cities, setCities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittingFrm, setSubmittingFrm] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!formData.companyName) newErrors.companyName = true;
        if (!formData.ownerName) newErrors.ownerName = true;
        if (!formData.email) newErrors.email = true;
        if (!formData.phone) newErrors.phone = true;
        if (!formData.category) newErrors.category = true;
        if (!formData.city) newErrors.city = true;
        if (!formData.confirmOwner) newErrors.confirmOwner = true;
        if (!formData.confirmTerms) newErrors.confirmTerms = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmittingFrm(true);
        try {
            const response = await axios.post("/api/agency_request", formData);

            setIsSubmitted(true);
        } catch (err) {
            console.log(err);
        } finally {
            setSubmittingFrm(false);
        }

        setErrors({});
    };

    const getCities = async () => {
        try {
            const response = await axios.get("/api/get_cities");

            setCities(response.data.cities);
        } catch (err) {
            console.log(err);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/get_categories");

            setCategories(response.data.categories);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getCities();
        getCategories();
    }, []);

    return (
        <>
        <section className="apply-card" id="apply-form">
            <div className="apply-container">
                <div className="apply-header">
                    <h2 className="apply-title">{t('joinUs.applicationForm.title', 'Become a MarHire Partner')}</h2>
                    <p className="apply-subtitle">{t('joinUs.applicationForm.subtitle', 'Fill out the form below to start the process. Our team is excited to learn about your business and will contact you shortly after reviewing your application.')}</p>
                </div>

                {isSubmitted ? (
                    <div className="alert alert-success">
                        <b>Thank you!</b>
                        <p>
                            We'll review your listing and get in touch within 48
                            hours.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="application-form">
                        {/* Row 1: Company Name | Owner's Full Name */}
                        <div className="form-row">
                            <div
                                className={`form-group ${
                                    errors.companyName ? "error" : ""
                                }`}
                            >
                                <label htmlFor="companyName">
                                    {t('joinUs.applicationForm.companyName.label', 'Company Name')}<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.companyName.placeholder', 'Your Company S.A.R.L')}
                                />
                                {errors.companyName && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div
                                className={`form-group ${
                                    errors.ownerName ? "error" : ""
                                }`}
                            >
                                <label htmlFor="ownerName">
                                    {t("joinUs.applicationForm.ownerName.label", "Owner's Full Name")}<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    className="form-control"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.ownerName.placeholder', 'e.g., Mohamed Alami')}
                                />
                                {errors.ownerName && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 2: ICE Number | RC Number */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="iceNumber">
                                    {t('joinUs.applicationForm.iceNumber.label', 'ICE Number')}<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="iceNumber"
                                    name="iceNumber"
                                    className="form-control"
                                    value={formData.iceNumber}
                                    onChange={handleChange}
                                    placeholder={t("joinUs.applicationForm.iceNumber.placeholder", "Identifiant Commun de l'Entreprise")}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="rcNumber">
                                    {t('joinUs.applicationForm.rcNumber.label', 'RC Number')}<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="rcNumber"
                                    name="rcNumber"
                                    className="form-control"
                                    value={formData.rcNumber}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.rcNumber.placeholder', 'Registre du Commerce')}
                                />
                            </div>
                        </div>

                        {/* Row 3: Category | Primary City */}
                        <div className="form-row">
                            <div
                                className={`form-group ${
                                    errors.category ? "error" : ""
                                }`}
                            >
                                <label htmlFor="category">{t('joinUs.applicationForm.category.label', 'Category')}<RequiredAsterisk /></label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('joinUs.applicationForm.category.placeholder', 'Select service category')}</option>
                                    {categories.map((category) => (
                                        <option
                                            value={category.id}
                                            key={category.id}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                                {errors.category && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div
                                className={`form-group ${
                                    errors.city ? "error" : ""
                                }`}
                            >
                                <label htmlFor="city">{t('joinUs.applicationForm.city.label', 'Primary City')}<RequiredAsterisk /></label>
                                <select
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    value={formData.city}
                                    onChange={handleChange}
                                >
                                    <option value="">{t('joinUs.applicationForm.city.placeholder', 'Select your city')}</option>
                                    {cities.map((city) => (
                                        <option value={city.id} key={city.id}>
                                            {city.city_name}
                                        </option>
                                    ))}
                                </select>
                                {errors.city && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 4: Email | Phone */}
                        <div className="form-row">
                            <div
                                className={`form-group ${
                                    errors.email ? "error" : ""
                                }`}
                            >
                                <label htmlFor="email">{t('joinUs.applicationForm.email.label', 'Email')}<RequiredAsterisk /></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.email.placeholder', 'your@company.com')}
                                />
                                {errors.email && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div
                                className={`form-group ${
                                    errors.phone ? "error" : ""
                                }`}
                            >
                                <label htmlFor="phone">{t('joinUs.applicationForm.phone.label', 'Phone')}<RequiredAsterisk /></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.phone.placeholder', 'e.g., +212 6 00 00 00 00')}
                                />
                                {errors.phone && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Row 5: WhatsApp Number */}
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="whatsapp">
                                    {t('joinUs.applicationForm.whatsapp.label', 'WhatsApp Number')}<RequiredAsterisk />
                                </label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    className="form-control"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder={t('joinUs.applicationForm.whatsapp.placeholder', 'Number for customer communication')}
                                />
                            </div>
                        </div>

                        {/* Row 6: Service Description */}
                        <div className="form-group">
                            <label htmlFor="description">
                                {t('joinUs.applicationForm.description.label', 'Service Description')}<RequiredAsterisk />
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder={t('joinUs.applicationForm.description.placeholder', 'Briefly describe your main services, what makes your company special, and your typical customer (100-800 characters)')}
                                rows="5"
                            ></textarea>
                        </div>

                        {/* Confirmation Checkboxes */}
                        <div className="form-group">
                            <div className={`custom-control custom-checkbox ${errors.confirmOwner ? "error" : ""}`}>
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="confirmOwner"
                                    name="confirmOwner"
                                    checked={formData.confirmOwner}
                                    onChange={handleChange}
                                />
                                <label className="custom-control-label" htmlFor="confirmOwner">
                                    {t('joinUs.applicationForm.confirmOwner', 'I confirm that I am the owner or an authorized representative of this company.')}
                                </label>
                                {errors.confirmOwner && (
                                    <span className="error-message d-block">
                                        You must confirm this to proceed
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className={`custom-control custom-checkbox ${errors.confirmTerms ? "error" : ""}`}>
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="confirmTerms"
                                    name="confirmTerms"
                                    checked={formData.confirmTerms}
                                    onChange={handleChange}
                                />
                                <label className="custom-control-label" htmlFor="confirmTerms">
                                    {t('joinUs.applicationForm.agreePrefix', 'I have read and agree to the MarHire')} <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" style={{ color: '#048667', textDecoration: 'underline' }}>{t('joinUs.contactHelp.terms', 'Terms & Conditions')}</a> {t('common.and', 'and')} <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#048667', textDecoration: 'underline' }}>{t('joinUs.contactHelp.privacy', 'Privacy Policy')}</a>.
                                </label>
                                {errors.confirmTerms && (
                                    <span className="error-message d-block">
                                        You must accept the terms to proceed
                                    </span>
                                )}
                            </div>
                        </div>

                        <button type="submit" className="apply-submit" disabled={submittingFrm}>{submittingFrm ? t('joinUs.applicationForm.submitting', 'Submitting...') : t('joinUs.applicationForm.apply', 'Apply Now')}</button>
                    </form>
                )}
            </div>
            {submittingFrm && <div className="fixed inset-0 z-40" />}
        </section>

        <style>{`
            .apply-card { display: flex; justify-content: center; }
            .apply-container { width: 100%; max-width: 980px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 28px; box-shadow: 0 2px 10px rgba(0,0,0,0.04); }
            .apply-header { text-align: center; margin-bottom: 18px; }
            .apply-title { margin: 0 0 6px 0; font-size: 1.8rem; font-weight: 800; color: #1a202c; }
            .apply-subtitle { margin: 0; color: #6b7280; font-size: .95rem; }

            .application-form { display: flex; flex-direction: column; gap: 14px; }
            .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
            .form-row .form-group { width: 100%; }
            .form-group { display: flex; flex-direction: column; gap: 6px; }
            .form-group label { font-weight: 600; color: #1f2937; font-size: .95rem; }
            .form-control, .form-group select, .form-group textarea { width: 100%; border: 1px solid #e5e7eb; border-radius: 10px; padding: 12px 14px; background: #ffffff; outline: none; box-sizing: border-box; }
            .form-group select { padding-right: 40px; height: 44px; }
            .form-control:focus, .form-group select:focus, .form-group textarea:focus { border-color: #a7d7cd; box-shadow: 0 0 0 3px rgba(4,134,103,0.12); background: #fff; }
            .custom-control { display: flex; gap: 10px; align-items: flex-start; }
            .custom-control-input { margin-top: 4px; }
            .apply-submit { width: 100%; background: #048667; color: #fff; border: none; padding: 12px 16px; border-radius: 10px; font-weight: 700; cursor: pointer; }
            .apply-submit:disabled { opacity: .7; cursor: not-allowed; }

            @media (max-width: 768px) { .form-row { grid-template-columns: 1fr; } .apply-container { padding: 20px; } }
        `}</style>
        </>
    );
};

export default ListForm;
