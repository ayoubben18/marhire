import axios from "axios";
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Helper function to get translated field
const getTranslatedField = (item, field, locale) => {
    if (item?.translated_fields && item.translated_fields[field]) {
        if (item.translated_fields[field][locale]) {
            return item.translated_fields[field][locale];
        }
        if (item.translated_fields[field]['en']) {
            return item.translated_fields[field]['en'];
        }
    }
    return item?.[field] || '';
};

const Legal = ({ title, type }) => {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language || 'en';
    
    const links = [
        { name: "Terms & Conditions", url: "/terms-conditions" },
        { name: "Privacy Policy", url: "/privacy-policy" },
        { name: "Cookie Policy", url: "/cookie-policy" },
        { name: "Cancelation Policy", url: "/cancellation-policy" },
        { name: "Insurance Conditions", url: "/insurance-conditions" },
    ];

    const [content, setContent] = useState("");
    const [legalData, setLegalData] = useState(null);

    useEffect(() => {
        const fetchPageContent = async () => {
            try {
                const response = await axios.get("/api/legal_content_api", {
                    params: { 
                        type: title,
                        locale: currentLocale 
                    },
                });

                setLegalData(response.data);
                // Use translated content if available, fallback to original content
                if (response.data.translated_fields) {
                    const translatedContent = getTranslatedField(response.data, 'content', currentLocale);
                    setContent(translatedContent || response.data.content);
                } else {
                    setContent(response.data.content);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchPageContent();
    }, [title, currentLocale]);

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
                    <h1 className="simplepage-title">
                        {legalData && legalData.translated_fields ? 
                            getTranslatedField(legalData, 'title', currentLocale) || title : 
                            title
                        }
                    </h1>
                    <div dangerouslySetInnerHTML={{ __html: content }}>
                    </div>
                </div>
            </div>
            <FreeTexts slug="legal" />
            <Footer />
        </>
    );
};

export default Legal;
