import React, { useEffect, useState } from "react";
import { MdVerified } from "react-icons/md";
import { FaRegCalendarAlt, FaWhatsapp } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import SearchItem from "../components/site/SearchItem";
import Footer from "../components/site/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Recommended from "../components/site/Recommended";

const Agency = ({ slug }) => {
    const [loading, setLoading] = useState(true);
    const [agency, setAgency] = useState(null);
    const [listings, setListings] = useState([
        {
            id: "1",
            title: "Dacia Logane",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_68386377bba20small.webp",
            similarText: "",
            rating: 4.0,
            ratingLabel: "Average",
            price: "From $35.56/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 2,
            title: "Hyndai Accent",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6811010a66040small.webp",
            similarText: "",
            rating: 4.3,
            ratingLabel: "Average",
            price: "From $45.00/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 3,
            title: "Fiat Tipo",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6810f932c91afsmall.webp",
            similarText: "",
            rating: 4.8,
            ratingLabel: "Average",
            price: "From $50.00/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
        {
            id: 4,
            title: "VW Golf 8",
            image: "https://cdn.rents.ma/storage/listingsmall/cars/cars-for-rent_6810e2fba4749small.webp",
            similarText: "",
            rating: 4.0,
            ratingLabel: "Average",
            price: "From $35.56/day",
            features: ["Automatic", "AC", "4 Seats", "No Deposit"],
            type: "car",
        },
    ]);

    const fetchAgency = async () => {
        try {
            const response = await axios.get("/api/get_agency", {
                params: { slug: slug },
            });
            console.log(response.data);
            setAgency(response.data.agency);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const getWtspUrl = () => {
        const url = `https://marhire.bytech.ma/agency/${slug}`;
        const message = encodeURIComponent(
            `Hello,\nI am interested in booking:\n\Agency:${agency.agency_name} \n\nURL: ${url}\n\nCould you please provide more details about availability, pricing, and the booking process?\n\nThank you!`
        );
        // For WhatsApp link:
        const whatsappLink = `https://wa.me/+212660745055?text=${message}`;

        return whatsappLink;
    };

    const formatCreatedAt = () => {
        if (!agency?.created_at) return "";
        const date = new Date(agency.created_at);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        fetchAgency();
    }, []);

    return (
        <>
            <div className="bt-page">
                {loading ? (
                    <div className="agency-card">
                        <Skeleton height={18} width={120} />
                        <Skeleton height={12} width={100} />
                    </div>
                ) : (
                    <>
                        <div className="agency-card">
                            <div className="agency__informations">
                                <div className="agency__informations__img">
                                    <img
                                        src={`/${
                                            agency.agency_logo ??
                                            "/images/default-agency.jpeg"
                                        }`}
                                        alt={agency.agency_name}
                                        onError={(e) =>
                                            (e.target.src =
                                                "/images/default-agency.jpeg")
                                        }
                                    />
                                </div>

                                <div className="agency__informations__details">
                                    <h1 className="agency__name">
                                        {agency.agency_name}{" "}
                                        <span className="verified-badge">
                                            <MdVerified />
                                        </span>
                                    </h1>
                                    <h2 className="agency__category">
                                        {agency.category
                                            ? agency.category.category
                                            : ""}
                                    </h2>
                                    <div
                                        className="agency__desc"
                                        dangerouslySetInnerHTML={{
                                            __html: agency.short_description,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            <div className="agency__bottom">
                                <div className="agency__bottom__infos">
                                    <div className="agency__created_at">
                                        <FaRegCalendarAlt /> Created at{" "}
                                        {formatCreatedAt()}
                                    </div>
                                    <div className="agency__location">
                                        <FaLocationDot />{" "}
                                        {agency?.city
                                            ? agency.city.city_name + " , Maroc"
                                            : ""}
                                    </div>
                                </div>
                                <div className="agency__informations__cta">
                                    <a
                                        href={getWtspUrl()}
                                        target="_blank"
                                        className="cta-wtsp"
                                    >
                                        <FaWhatsapp size={22} /> Whatsapp
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="singlelisting-card">
                            <h3 class="singlelisting__h3">Description</h3>
                            <div
                                class="singlelisting__p"
                                dangerouslySetInnerHTML={{
                                    __html: agency.description,
                                }}
                            ></div>
                        </div>
                        <div className="agency__listings">
                            <h2 className="section-title_borderd">Listings</h2>
                            <Recommended
                                type="cars"
                                classes="agency-listings"
                                agency_id={agency.id}
                                disableHeading={true}
                            />
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </>
    );
};

export default Agency;
