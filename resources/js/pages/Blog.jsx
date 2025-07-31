import { useEffect, useState } from "react";
import Footer from "../components/site/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";

const Blog = () => {
    const [loadingMore, setLoadingMore] = useState(false);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(false);
    const [skip, setSkip] = useState(0);
    const [lastBlog, setLastBlog] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const fetchArticles = async () => {
                try {
                    const response = await axios.get("/api/get_articles_api");
                    setLastBlog(response.data.latest);
                    setArticles(response.data.articles);
                    setSkip(response.data.articles.length + 1);
                    setHasMore(response.data.articles.length === 6);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            fetchArticles();
        }, 500);
    }, []);

    useEffect(() => {
        console.log(articles);
    }, [articles]);

    const loadMore = async () => {
        setLoadingMore(true);

        try {
            const response = await axios.get("/api/get_articles_api", {
                params: { skip: skip },
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
            <div className="bt-page">
                <div className="blog__intro">
                    {loading ? (
                        <>
                            <Skeleton
                                height={220}
                                style={{ marginBottom: "30px" }}
                            />
                        </>
                    ) : (
                        lastBlog && (
                            <div className="last-blog">
                                <a href={`/article/${lastBlog.slug}`}>
                                    <div className="blog-img">
                                        <img
                                            src={"/" + lastBlog.featured_img}
                                            alt={lastBlog.title}
                                        />
                                    </div>
                                    <div className="blog-bottom">
                                        <h2 className="blog__title">
                                            {lastBlog.title}
                                        </h2>
                                        <p className="blog__desc">
                                            {lastBlog.short_description}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        )
                    )}
                </div>
                {loading ? (
                    <div
                        className="blog__list"
                        style={{ marginBottom: "60px" }}
                    >
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <>
                                <div className="blog__article">
                                    <Skeleton
                                        height={220}
                                        style={{ marginTop: "12px" }}
                                    />
                                    <Skeleton height={20} />
                                </div>
                            </>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className="blog__list">
                            {articles.map((article, idx) => (
                                <div className="blog__article" key={idx}>
                                    <div className="blog__img">
                                        <img
                                            src={"/" + article.featured_img}
                                            alt={article.title}
                                        />
                                    </div>
                                    <div className="blog__content">
                                        <h2 className="blog__title">
                                            <a
                                                href={`/article/${article.slug}`}
                                            >
                                                {article.title}
                                            </a>
                                        </h2>
                                        <p className="blog__desc">
                                            {article.short_description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            {loadingMore &&
                                Array.from({ length: 3 }).map((_, idx) => (
                                    <>
                                        <div className="blog__article">
                                            <Skeleton
                                                height={220}
                                                style={{ marginTop: "12px" }}
                                            />
                                            <Skeleton height={20} />
                                        </div>
                                    </>
                                ))}
                        </div>

                        {!loadingMore && hasMore && (
                            <div className="load-more__sect">
                                <button
                                    className="load-more"
                                    onClick={loadMore}
                                >
                                    Load More
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Blog;
