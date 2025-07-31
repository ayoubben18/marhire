import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdPerson } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
import { FaLocationDot } from "react-icons/fa6";
import {
    Users,
    Car,
    Tag,
    Snowflake,
    Calendar,
    Settings2,
    Gauge,
    Fuel,
    Info,
    UserRound,
} from "lucide-react";

const SingleListingInfoCard = ({ listing, loading }) => {
    const [activePricing, setActivePricing] = useState(1);
    const [features, setFeatures] = useState([]);

    useEffect(() => {
        if (listing) {
            setFeatures([
                {
                    name: `${listing.seats} Seats`,
                    icon: <UserRound size={16} />,
                },
                {
                    name: `${listing.doors} Doors`,
                    icon: <GiCarDoor size={16} />,
                },
                { name: `${listing.year}`, icon: <Calendar size={16} /> },
                {
                    name: `${listing.mileage_policy}`,
                    icon: <Gauge size={16} />,
                },
                {
                    name: `Fuel: ${listing.fuel_policy}`,
                    icon: <Fuel size={16} />,
                },
            ]);
        }
    });

    return loading ? (
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
            <div className="singlelisting-infos">
                <div className="singlelisting-infos__content">
                    <h1 className="singlelisting__name">{listing.title}</h1>
                    <h2 className="singlelisting__location">
                        <FaLocationDot size={16} color="#f21500" />{" "}
                        {listing.city.city_name} , Maroc
                    </h2>
                    <div className="singlelisting__features grid-3">
                        {features.map((feature, indx) => (
                            <div className="singlelisting__feature" key={indx}>
                                <span className="singlelisting__feature__icon">
                                    {feature.icon && feature.icon}
                                </span>
                                <span>{feature.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="singlelisting__agency">
                        {listing.provider.agency_logo && (
                            <img
                                src={`/${listing.provider.agency_logo}`}
                                alt="agency Logo"
                                className="singlelisting__agency__logo"
                            />
                        )}
                    </div>
                </div>
                <div className="singlelisting-infos__image">
                    <img
                        src={
                            listing.galleries && listing.galleries.length
                                ? "/" + listing.galleries[0].file_path
                                : ""
                        }
                    />
                </div>
            </div>
            {listing.category_id == 2 && (
                <div className="singlelisting-card singlelisting-card__pricing">
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 1
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(1)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_day} €
                        </span>
                        <span className="price-label">/ day</span>
                    </div>

                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 2
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(2)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_week} €
                        </span>
                        <span className="price-label">/ week</span>
                    </div>
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 3
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(3)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_month} €
                        </span>
                        <span className="price-label">/ month</span>
                    </div>
                </div>
            )}

            {listing.category_id == 4 && (
                <div className="singlelisting-card singlelisting-card__pricing">
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 1
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(1)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_hour} €
                        </span>
                        <span className="price-label">/ hour</span>
                    </div>

                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 2
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(2)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_half_day} €
                        </span>
                        <span className="price-label">/ half-day</span>
                    </div>
                    <div
                        className={`singlelisting-card__item ${
                            activePricing === 3
                                ? "singlelisting-card__item--active"
                                : ""
                        }`}
                        onClick={() => setActivePricing(3)}
                    >
                        <span className="singlelisting__price">
                            {listing.price_per_day} €
                        </span>
                        <span className="price-label">/ day</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default SingleListingInfoCard;
