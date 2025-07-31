import axios from "axios";
import React, { useEffect, useState } from "react";

const FreeTexts = ({ slug }) => {
    const [texts, setTexts] = useState([]);

    useEffect(() => {
        const fetchTexts = async () => {
            try {
                const response = await axios.get("/api/get_free_texts", {
                    params: { slug: slug },
                });

                setTexts(response.data?.content_sections ?? []);
            } catch (err) {
                console.log(err);
            }
        };

        fetchTexts();
    }, []);

    return (
        <section className="two-col-container">
            <div className="two-col-grid">
                {texts.map((text, idx) => (
                    <div className="two-col-item" key={idx}>
                        <h3>{text.title}</h3>
                        <p>{text.text}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FreeTexts;
