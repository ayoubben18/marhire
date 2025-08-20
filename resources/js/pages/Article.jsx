import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Footer from "../components/site/Footer";
import axios from "axios";

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

const Article = ({ slug }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                console.log('Fetching article with locale:', currentLocale, 'slug:', slug);
                const response = await axios.get("/api/get_article_api", {
                    params: { slug: slug },
                });
                console.log('Article response:', response.data);
                setArticle(response.data.article);
            } catch (err) {
                console.error(err);
            }
        };

        fetchArticle();
    }, []);

    return (
        <>
            <div className="bt-page single-article">
                {article && (
                    <>
                        <div className="article__head">
                            {article.category && (
                                <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                    <span className="category-badge">
                                        {article.category.category}
                                    </span>
                                </div>
                            )}
                            <h1 className="article__title">{getTranslatedField(article, 'title', currentLocale)}</h1>
                        </div>
                        <div className="article__content">
                            {article.featured_img && (
                                <img
                                    src={"/" + article.featured_img}
                                    alt={getTranslatedField(article, 'title', currentLocale)}
                                    className="article__featuredImg"
                                />
                            )}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: getTranslatedField(article, 'content', currentLocale)
                                }}
                            ></div>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Article;
