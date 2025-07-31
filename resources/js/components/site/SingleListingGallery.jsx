import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleListingGallery = ({ listing, loading }) => {
    const images = [
        "/images/img1.png",
        "/images/img2.png",
        "/images/img3.png",
        "/images/img4.png",
        "/images/img5.png",
    ];
    const [activePricing, setActivePricing] = useState(1);

    useEffect(() => {
        console.log("rendering");
        console.log(listing);
    });

    return loading || !listing ? (
        <div className="singlelisting-infos">
            <div className="singlelisting-infos__content">
                <Skeleton height={18} width={120} />
                <Skeleton height={12} width={100} />
            </div>
            <div className="singlelisting-infos__image">
                <Skeleton height={120} />
            </div>
        </div>
    ) : (
        <>
            <div className="gallery-card">
                <div className="gallery-grid">
                    {listing.galleries &&
                        listing.galleries.map((img, idx) => (
                            <div className="main-image" key={idx}>
                                <img src={`/${img.file_path}`} />
                            </div>
                        ))}

                    {/* <div className="small-image more">
                        <img src={images[4]} alt="Gallery 5" />
                        <div className="overlay">+26</div>
                    </div> */}
                </div>
                <div className="pt-3 px-2">
                    <h1 className="singlelisting__name">{listing.title}</h1>
                    <h2 className="singlelisting__location">
                        <FaLocationDot size={16} color="#f21500" />{" "}
                        {listing.city.city_name}, Maroc
                    </h2>
                </div>
            </div>
            <div className="singlelisting-card singlelisting-card__pricing">
                {listing.category_id !== 3 &&
                    listing?.act_pricings.map((pricing, idx) => (
                        <div
                            className={`singlelisting-card__item ${
                                activePricing === idx + 1
                                    ? "singlelisting-card__item--active"
                                    : ""
                            }`}
                            onClick={() => setActivePricing(idx + 1)}
                            key={idx}
                        >
                            <span className="singlelisting__price">
                                {pricing.price} €
                            </span>
                            <span className="price-label">
                                / {pricing.element}
                            </span>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default SingleListingGallery;
