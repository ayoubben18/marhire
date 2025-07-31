import React, { useEffect, useState } from "react";
import Footer from "../components/site/Footer";
import axios from "axios";

const Article = ({ slug }) => {
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get("/api/get_article_api", {
                    params: { slug: slug },
                });

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
                            <h1 className="article__title">{article.title}</h1>
                        </div>
                        <div className="article__content">
                            {article.featured_img && (
                                <img
                                    src={"/" + article.featured_img}
                                    alt={article.title}
                                    className="article__featuredImg"
                                />
                            )}
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: article.content
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
