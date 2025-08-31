import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import { getLocalizedUrl } from "../../utils/localeManager";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

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

const HomeBlogSection = () => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language || 'en';
    const [loading, setLoading] = useState(true);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        let mounted = true;
        const fetchArticles = async () => {
            try {
                const response = await axios.get("/api/get_articles_api", { params: { limit: 10 } });
                if (!mounted) return;
                const list = response?.data?.articles || [];
                setArticles(list.slice(0, 10));
            } catch (err) {
                console.error(err);
                setArticles([]);
            } finally {
                if (mounted) setLoading(false);
            }
        };
        fetchArticles();
        return () => { mounted = false; };
    }, []);

    return (
        <section className="home-blog-section" style={{ background: '#F2F9F7', padding: '36px 0' }}>
            <div className="mh-blog-container" style={{ maxWidth: 1100, margin: '0 auto', paddingLeft: 0, paddingRight: 0 }}>
                <div className="text-center" style={{ marginBottom: 16 }}>
                    <h2 style={{ fontWeight: 800, fontSize: '1.8rem', color: '#0f1f1b', margin: 0 }}>
                        {t('home.blog.title', 'From Our Travel Blog')}
                    </h2>
                    <p style={{ marginTop: 8, color: '#5b6b6d' }}>
                        {t('home.blog.subtitle', 'Get insider tips, travel guides, and inspiration for your next Moroccan adventure.')}
                    </p>
                </div>

                {loading ? (
                    <div className="blog-grid container">
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <div className="blog-card" key={idx}>
                                <div className="blog-card__image"><Skeleton height={180} /></div>
                                <div className="blog-card__content">
                                    <Skeleton width={80} height={20} />
                                    <Skeleton height={20} style={{ marginTop: 10 }} />
                                    <Skeleton count={2} style={{ marginTop: 6 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        loop
                        watchOverflow={false}
                        breakpoints={{ 770: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }}
                        className="mh-blog-swiper"
                    >
                        {articles.map((article) => (
                            <SwiperSlide key={article.slug}>
                                <a className="blog-card mh-blog-card" href={`${getLocalizedUrl('article/' + article.slug)}`}>
                                    <div className="blog-card__image">
                                        <img src={"/" + article.featured_img} alt={getTranslatedField(article,'title',currentLocale)} />
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
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}

                <div className="load-more__sect">
                    <a href={getLocalizedUrl('blog')} className="load-more load-more--rounded load-more--white">
                        {t('home.blog.readMoreArticles', 'Read More Articles')} <span style={{marginLeft:6}}>→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default HomeBlogSection;


