import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { FaHome } from 'react-icons/fa';
import { getLocalizedUrl } from "../utils/localeManager";

// Helper function to get translated field
const getTranslatedField = (item, field, locale) => {
    console.log(`Getting translated field: ${field} for locale: ${locale}`, item?.translated_fields?.[field]);
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

const Blog = () => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [skip, setSkip] = useState(0);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const fetchArticles = async () => {
                try {
                    console.log('Fetching articles with locale:', currentLocale);
                    const response = await axios.get("/api/get_articles_api", {
                        params: { locale: currentLocale }
                    });
                    console.log('Articles response:', response.data);
                    setArticles(response.data.articles);
                    setSkip(response.data.articles.length);
                    setHasMore(response.data.articles.length === 6);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchArticles();
        }, 500);
    }, [currentLocale]);

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    const loadMore = async () => {
        setLoadingMore(true);

        try {
            const response = await axios.get("/api/get_articles_api", {
                params: { skip: skip, locale: currentLocale },
            });
            setArticles((prev) => [...prev, ...response.data.articles]);
            setHasMore(response.data.articles.length === 6);
            setSkip((prev) => prev + response.data.articles.length);
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingMore(false);
        }
    };

    return (
        <>
            <div className="blog-hero">
                <div className="hero-content">
                    <div className="container">
                        <div className="hero-text-content">
                            <div className="hero-nav-path">
                                <div className="nav-path-container">
                                    <a href={getLocalizedUrl('/')} title={t('common.home', 'Home')} className="nav-home-link"><FaHome size={14} /></a>
                                    <span className="nav-path-arrow">›</span>
                                    <span className="nav-current-page">{t('blog.title','Blog')}</span>
                                </div>
                            </div>
                            <h1 className="hero-title">{t('blog.hero.title','MarHire Travel Blog')}</h1>
                            <p className="hero-subtitle">{t('blog.hero.subtitle','Your expert guide to traveling in Morocco. Get insider tips on car rentals, find the best private tours, and discover hidden gems across the country.')}</p>
                        </div>
                    </div>
                </div>
                <style>{`
                    .blog-hero { position: relative; padding: 48px 0; margin-left: calc(50% - 50vw); margin-right: calc(50% - 50vw); background: #f6faf8; }
                    .hero-content { position: relative; z-index: 3; width: 100%; display: flex; justify-content: center; color: #203233; }
                    .hero-text-content { display: flex; flex-direction: column; align-items: center; max-width: 900px; margin: 0 auto; padding: 0 20px; width: 100%; }
                    .hero-nav-path { margin-bottom: 12px; }
                    .nav-path-container { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 600; color: #627577; }
                    .nav-home-link { text-decoration: none; color: #048667; }
                    .nav-path-arrow { color: #627577; font-size: 12px; }
                    .nav-current-page { color: #203233; font-size: 13px; }
                    .hero-title { font-size: 2.2rem; font-weight: 800; margin-bottom: 0.5rem; line-height: 1.2; text-align: center; }
                    .hero-subtitle { font-size: 1.05rem; font-weight: 400; margin-bottom: 0; line-height: 1.6; max-width: 800px; text-align: center; color: #495b5d; }
                    @media (min-width: 768px) { .hero-title { font-size: 2.6rem; } }
                `}</style>
            </div>

            <div className="blog-grid container">
                {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                        <div className="blog-card" key={idx}>
                            <div className="blog-card__image"><Skeleton height={180} /></div>
                            <div className="blog-card__content">
                                <Skeleton width={80} height={20} />
                                <Skeleton height={20} style={{ marginTop: 10 }} />
                                <Skeleton count={2} style={{ marginTop: 6 }} />
                            </div>
                        </div>
                    ))
                ) : (
                    articles.map((article) => (
                        <a className="blog-card" key={article.slug} href={`/${currentLocale}/article/${article.slug}`}>
                            <div className="blog-card__image">
                                <img 
                                    src={article.featured_img ? "/" + article.featured_img : "/images/not-found.png"} 
                                    alt={getTranslatedField(article,'title',currentLocale)}
                                    onError={(e) => {e.target.src = "/images/not-found.png"}}
                                />
                            </div>
                            <div className="blog-card__content">
                                {article.category && (<span className="badge badge--secondary">{article.category.category}</span>)}
                                <h2 className="blog-card__title">{getTranslatedField(article,'title',currentLocale)}</h2>
                                <p className="blog-card__desc line-clamp-3">{getTranslatedField(article,'short_description',currentLocale)}</p>
                                <div className="blog-card__meta">
                                    <span>{article.created_at?.slice(0,10)}</span>
                                    <span className="read-more">{t('common.readMore','Read More')} →</span>
                                </div>
                            </div>
                        </a>
                    ))
                )}
            </div>

            {!loading && !loadingMore && hasMore && (
                <div className="load-more__sect">
                    <button className="load-more" onClick={loadMore}>{t('blog.loadMore')}</button>
                </div>
            )}
            <FreeTexts slug="blog" />
            <Footer />
        </>
    );
};

export default Blog;
