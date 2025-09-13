import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';

// Helper: translate with English fallback
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

const FreeTexts = ({ slug, subcategory, city, categorySlug }) => {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language || 'en';
    const [pageData, setPageData] = useState(null);
    const [texts, setTexts] = useState([]);

    // Helper function to get proper category name from slug
    const getCategoryName = (slug) => {
        switch (slug) {
            case 'car-rental':
                return 'Car Rental';
            case 'private-driver':
                return 'Private Driver';
            case 'boats':
                return 'Boat Rental';
            case 'things-to-do':
                return 'Things to Do';
            default:
                return slug;
        }
    };

    // Helper function to interpolate dynamic content
    const interpolateText = (text) => {
        if (!text) return '';

        let interpolated = text;

        // Replace subcategory token
        if (subcategory && interpolated.includes('{{subcategory}}')) {
            interpolated = interpolated.replace(/\{\{subcategory\}\}/g, subcategory);
        }

        // Replace city token
        if (city && interpolated.includes('{{city}}')) {
            interpolated = interpolated.replace(/\{\{city\}\}/g, city);
        }

        // Replace category token
        if (categorySlug && interpolated.includes('{{category}}')) {
            const categoryName = getCategoryName(categorySlug);
            interpolated = interpolated.replace(/\{\{category\}\}/g, categoryName);
        }

        return interpolated;
    };

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const response = await axios.get("/api/get_free_texts", {
                    params: { slug: slug },
                });

                const page = response.data;
                setPageData(page);

                // Get translated content sections with fallback
                let contentSections;
                if (page?.translated_fields && page.translated_fields.content_sections) {
                    contentSections = getTranslatedField(page, 'content_sections', currentLocale);
                } else {
                    contentSections = page?.content_sections;
                }

                // Handle both array and JSON string formats
                let parsedSections = [];
                if (Array.isArray(contentSections)) {
                    parsedSections = contentSections;
                } else if (typeof contentSections === 'string') {
                    try {
                        parsedSections = JSON.parse(contentSections);
                    } catch (e) {
                        console.warn('Failed to parse content sections JSON:', e);
                        parsedSections = [];
                    }
                } else if (contentSections) {
                    // If it's an object, try to convert to array
                    parsedSections = [contentSections];
                }

                setTexts(Array.isArray(parsedSections) ? parsedSections : []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTexts();
    }, [slug, currentLocale]);

    // Safety check - ensure texts is always an array
    const safeTexts = Array.isArray(texts) ? texts : [];

    return (
        <section className="two-col-container">
            <div className="two-col-grid">
                {safeTexts.map((text, idx) => (
                    <div className="two-col-item" key={idx}>
                        <h3>{interpolateText(text?.title || '')}</h3>
                        <p>{interpolateText(text?.text || '')}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FreeTexts;
