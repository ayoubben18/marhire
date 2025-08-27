import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import axios from "axios";
import { FaHome, FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { getLocalizedUrl } from "../utils/localeManager";

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
            {article && (
                <div className="article-hero">
                    <div className="hero-content">
                        <div className="container">
                            <div className="hero-text-content">
                                <div className="hero-nav-path">
                                    <div className="nav-path-container">
                                        <a href={getLocalizedUrl('/')} title={t('common.home','Home')} className="nav-home-link"><FaHome size={14} /></a>
                                        <span className="nav-path-arrow">›</span>
                                        <a href={getLocalizedUrl('/blog')} className="nav-home-link">{t('blog.title','Blog')}</a>
                                        <span className="nav-path-arrow">›</span>
                                        <span className="nav-current-page">{getTranslatedField(article, 'title', currentLocale)}</span>
                                    </div>
                                </div>
                                {article.category && (
                                    <span className="badge badge--secondary" style={{ marginBottom: 6 }}>{article.category.category}</span>
                                )}
                                <h1 className="hero-title">{getTranslatedField(article, 'title', currentLocale)}</h1>
                                <div className="article-meta">
                                    <span className="meta-item"><FaRegCalendarAlt size={12} /> {article.created_at ? (new Date(article.created_at)).toISOString().slice(0,10) : (article.date || '')}</span>
                                    <span className="meta-sep">•</span>
                                    <span className="meta-item"><FaUser size={12} /> {article.author || 'MarHire Team'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>{`
                        .article-hero { position: relative; padding: 36px 0 30px; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: transparent; }
                        .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: #203233; }
                        .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; text-align: center; }
                        .hero-nav-path { margin-bottom: 10px; }
                        .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #627577; }
                        .nav-home-link { text-decoration: none; color: #048667; }
                        .nav-path-arrow { color: #627577; font-size: 12px; }
                        .nav-current-page { color: #203233; font-size: 13px; }
                        .hero-title { font-size: 2rem; font-weight: 800; margin: 6px 0 6px; line-height: 1.25; }
                        .article-meta { display: flex; align-items: center; gap: 10px; color: #627577; font-size: 13px; }
                        .article-meta .meta-item { display: inline-flex; align-items: center; gap: 6px; }
                        .article-meta .meta-sep { opacity: .6; }
                        @media (min-width: 768px) { .hero-title { font-size: 2.4rem; } }
                    `}</style>
                </div>
            )}

            <div className="bt-page single-article">
                {article && (
                    <>
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
            <FreeTexts slug="article" />
            <Footer />
        </>
    );
};

export default Article;
