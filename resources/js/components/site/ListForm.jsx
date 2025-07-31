import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";

const ListForm = () => {
    const [formData, setFormData] = useState({
        companyName: "",
        ownerName: "",
        email: "",
        phone: "",
        whatsapp: "",
        city: "",
        category: "",
        description: "",
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
                        <div className="form-row">
                            <div
                                className={`form-group col-md-6 ${
                                    errors.companyName ? "error" : ""
                                }`}
                            >
                                <label htmlFor="companyName">
                                    Company Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="companyName"
                                    name="companyName"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    placeholder="Your company name"
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
                                    Owner's Full Name
                                </label>
                                <input
                                    type="text"
                                    id="ownerName"
                                    name="ownerName"
                                    className="form-control"
                                    value={formData.ownerName}
                                    onChange={handleChange}
                                    placeholder="Your full name"
                                />
                                {errors.ownerName && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div
                                className={`form-group col-md-6 ${
                                    errors.email ? "error" : ""
                                }`}
                            >
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Your business email"
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
                                <label htmlFor="phone">Phone Number</label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    className="form-control"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Your business phone number"
                                />
                                {errors.phone && (
                                    <span className="error-message">
                                        This field is required
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="form-row">
                            <div
                                className={`form-group col-md-12 ${
                                    errors.category ? "error" : ""
                                }`}
                            >
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    className="form-control"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    <option value="">
                                        Select your category
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
                        </div>

                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="whatsapp">
                                    WhatsApp Number
                                </label>
                                <input
                                    type="tel"
                                    id="whatsapp"
                                    name="whatsapp"
                                    className="form-control"
                                    value={formData.whatsapp}
                                    onChange={handleChange}
                                    placeholder="Your WhatsApp number"
                                />
                            </div>

                            <div
                                className={`form-group col-md-6 ${
                                    errors.city ? "error" : ""
                                }`}
                            >
                                <label htmlFor="city">City</label>
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

                        <div className="form-group">
                            <label htmlFor="description">
                                Service Description
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="What do you offer, what's included, terms, etc."
                                rows="5"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="submit-button btn-search-v2"
                            disabled={submittingFrm}
                        >
                            {submittingFrm ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                )}
            </div>
            {submittingFrm && <div className="fixed inset-0 z-40" />}
        </section>
    );
};

export default ListForm;
