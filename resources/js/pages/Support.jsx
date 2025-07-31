import React, { useState } from "react";
import HeroSection2 from "../components/site/HeroSection2";
import Footer from "../components/site/Footer";
import { FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa6";
import axios from "axios";
import FreeTexts from "../components/site/FreeTexts";

const quickLinks = [
    {
        title: "WhatsApp Support",
        icon: <FaWhatsapp className="text-green-500" size={36} />,
        description: (
            <>
                Live chat with our team 24/7 on&nbsp;
                <a
                    href="https://wa.me/212660745055"
                    className="text-green-700 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    WhatsApp
                </a>
                .
            </>
        ),
    },
    {
        title: "Email Support",
        icon: <FaEnvelope className="text-blue-600" size={36} />,
        description: (
            <>
                Email us anytime at&nbsp;
                <a
                    href="mailto:info@marhire.com"
                    className="text-blue-600 underline"
                >
                    info@marhire.com
                </a>
                . We respond within one business day.
            </>
        ),
    },
    {
        title: "Phone Support",
        icon: <FaPhone className="text-teal-700" size={36} />,
        description: (
            <>
                Prefer to talk? Call us at&nbsp;
                <a href="tel:+212660745055" className="text-teal-700 underline">
                    +212 660 745 055
                </a>{" "}
                during business hours.
            </>
        ),
    },
];

const Support = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });
    const [status, setStatus] = useState({
        submitted: false,
        error: false,
        loading: false,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, loading: true });

        if (!form.name || !form.email || !form.message) {
            setStatus({ submitted: false, error: true, loading: false });
            return;
        }

        try {
            const response = await axios.post("/api/submit_contact", form);

            setStatus({ submitted: true, error: false, loading: false });
            setForm({ name: "", email: "", phone: "", message: "" });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <HeroSection2 bgImg="https://marhire.bytech.ma/images/banner2.png" />

            <div className="container mx-auto px-4 py-12 max-w-3xl">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    Support & Help Center
                </h1>
                <p className="text-center mb-10 text-lg">
                    Reach us anytime — before, during, or after your booking.{" "}
                    <br />
                    Our team responds fast via WhatsApp, phone, or email.
                </p>

                {/* Quick Contact Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
                    {quickLinks.map((q, i) => (
                        <div
                            key={i}
                            className="bg-white border rounded-xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow transition"
                        >
                            <div className="mb-3">{q.icon}</div>
                            <h2 className="font-semibold text-lg mb-1">
                                {q.title}
                            </h2>
                            <p className="text-sm mb-3">{q.description}</p>
                        </div>
                    ))}
                </div>

                {/* Contact Form */}
                <div className="bg-white/90 border rounded-xl shadow-md p-8 mb-14">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                        Send Us a Message
                    </h2>
                    <form
                        className="space-y-4"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                name="name"
                                placeholder="Your Name"
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--color1)]"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="email"
                                type="email"
                                placeholder="Your Email"
                                className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--color1)]"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <input
                            name="phone"
                            type="tel"
                            placeholder="Phone (optional)"
                            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[var(--color1)]"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <textarea
                            name="message"
                            placeholder="How can we help you?"
                            className="border rounded px-3 py-2 w-full h-28 focus:outline-none focus:ring-2 focus:ring-[var(--color1)]"
                            value={form.message}
                            onChange={handleChange}
                            required
                        />
                        <button
                            className="btn-style1 w-full py-2 text-lg"
                            type="submit"
                            disabled={status.loading}
                        >
                            {status.loading ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                    {/* Feedback */}
                    {status.submitted && (
                        <div className="text-green-600 font-medium mt-4 text-center">
                            ✅ Thank you! Your message has been sent. We'll get
                            back to you soon.
                        </div>
                    )}
                    {status.error && (
                        <div className="text-red-500 font-medium mt-4 text-center">
                            ❌ Please fill in all required fields.
                        </div>
                    )}
                </div>

                {/* Optional: Short FAQ or link */}
                <div className="text-center mb-6">
                    <h3 className="text-lg font-semibold mb-1">
                        Looking for quick answers?
                    </h3>
                    <p>
                        Visit our{" "}
                        <a href="/faq" className="text-blue-600 underline">
                            FAQ page
                        </a>{" "}
                        for details about bookings, payments, refunds, and more.
                    </p>
                </div>
                <FreeTexts slug="support" />
            </div>

            <Footer />
        </>
    );
};

export default Support;
