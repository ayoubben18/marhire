import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import RequiredAsterisk from "./RequiredAsterisk";

const ListForm = () => {
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
        <section className="form-section" id="apply-form">
            <div className="container">
                <h2>Contact / Apply Now</h2>
                <p className="form-intro">
                    Please fill in the following fields to list your service on
                    MarHire:
                </p>

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
                                className={`form-group col-md-6 ${
                                    errors.companyName ? "error" : ""
                                }`}
                            >
                                <label htmlFor="companyName">
                                    Company Name<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Your Company S.A.R.L"
                                />
                                {errors.companyName && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div
                                className={`form-group col-md-6 ${
                                    errors.ownerName ? "error" : ""
                                }`}
                            >
                                <label htmlFor="ownerName">
                                    Owner's Full Name<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    className="form-control"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    placeholder="e.g., Mohamed Alami"
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
                            <div className="form-group col-md-6">
                                <label htmlFor="iceNumber">
                                    ICE Number<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="iceNumber"
                                    name="iceNumber"
                                    className="form-control"
                                    value={formData.iceNumber}
                                    onChange={handleChange}
                                    placeholder="Identifiant Commun de l'Entreprise"
                                />
                            </div>

                            <div className="form-group col-md-6">
                                <label htmlFor="rcNumber">
                                    RC Number<RequiredAsterisk />
                                </label>
                                <input
                                    type="text"
                                    id="rcNumber"
                                    name="rcNumber"
                                    className="form-control"
                                    value={formData.rcNumber}
                                    onChange={handleChange}
                                    placeholder="Registre du Commerce"
                                />
                            </div>
                        </div>

                        {/* Row 3: Category | Primary City */}
                        <div className="form-row">
                            <div
                                className={`form-group col-md-6 ${
                                    errors.category ? "error" : ""
                                }`}
                            >
                                <label htmlFor="category">Category<RequiredAsterisk /></label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select service category
                                    </option>
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
                                className={`form-group col-md-6 ${
                                    errors.city ? "error" : ""
                                }`}
                            >
                                <label htmlFor="city">Primary City<RequiredAsterisk /></label>
                                <select
                                    id="city"
                                    name="city"
                                    className="form-control"
                                    value={formData.city}
                                    onChange={handleChange}
                                >
                                    <option value="">Select your city</option>
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
                                className={`form-group col-md-6 ${
                                    errors.email ? "error" : ""
                                }`}
                            >
                                <label htmlFor="email">Email<RequiredAsterisk /></label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="your@company.com"
                                />
                                {errors.email && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>

                            <div
                                className={`form-group col-md-6 ${
                                    errors.phone ? "error" : ""
                                }`}
                            >
                                <label htmlFor="phone">Phone<RequiredAsterisk /></label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="e.g., +212 6 00 00 00 00"
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
                            <div className="form-group col-md-12">
                                <label htmlFor="whatsapp">
                                    WhatsApp Number<RequiredAsterisk />
                                </label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    className="form-control"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="Number for customer communication"
                                />
                            </div>
                        </div>

                        {/* Row 6: Service Description */}
                        <div className="form-group">
                            <label htmlFor="description">
                                Service Description<RequiredAsterisk />
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Briefly describe your main services, what makes your company special, and your typical customer (100-800 characters)"
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
                                    I confirm that I am the owner or an authorized representative of this company.
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
                                    I have read and agree to the MarHire <a href="/terms-conditions" target="_blank" rel="noopener noreferrer" style={{ color: '#048667', textDecoration: 'underline' }}>Terms of Service</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#048667', textDecoration: 'underline' }}>Privacy Policy</a>.
                                </label>
                                {errors.confirmTerms && (
                                    <span className="error-message d-block">
                                        You must accept the terms to proceed
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="submit-button btn-search-v2"
                            disabled={submittingFrm}
                        >
                            {submittingFrm ? "Submitting..." : "Apply Now"}
                        </button>
                    </form>
                )}
            </div>
            {submittingFrm && <div className="fixed inset-0 z-40" />}
        </section>
    );
};

export default ListForm;
