import axios from "axios";
import Footer from "../components/site/Footer";
import React, { useEffect, useState } from "react";

const Legal = ({ title, type }) => {
    const links = [
        { name: "Terms & Conditions", url: "/terms-conditions" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Cookie Policy", url: "/cookie-policy" },
        { name: "Cancelation Policy", url: "/cancellation-policy" },
        { name: "Insurance Conditions", url: "/insurance-conditions" },
    ];

    const [content, setContent] = useState("");

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const response = await axios.get("/api/legal_content_api", {
                    params: { type: title },
                });

                setContent(response.data.content);
            } catch (err) {
                console.error(err);
            }
        };

        fetchPageContent();
    }, []);

    return (
        <>
            <div className="bt-page legal-page">
                <div className="legal__leftSide">
                    <ul>
                        {links.map((link, idx) => (
                            <li key={idx}>
                                <a
                                    href={link.url}
                                    className={
                                        link.name === title ? "active" : ""
                                    }
                                >
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="legal__content">
                    <h1 className="simplepage-title">{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: content }}>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Legal;
