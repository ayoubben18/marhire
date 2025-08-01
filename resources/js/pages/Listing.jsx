import { useEffect, useState } from "react";
import SingleListingInfoCard from "../components/site/SingleListingInfoCard";
import Footer from "../components/site/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { IoMdPerson } from "react-icons/io";
import { GiCarDoor } from "react-icons/gi";
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
import SingleListingPricing from "../components/site/SingleListingPricing";
import SingleListingShortDescription from "../components/site/SingleListingShortDescription";
import SingleListingSpecs from "../components/site/SingleListingSpecs";
import SingleListingIncluded from "../components/site/SingleListingIncluded";
import RelatedProducts from "../components/site/RelatedProducts";
import SingleListingBottom from "../components/site/SingleListingBottom";
import SingleListingAddons from "../components/site/SingleListingAddons";
import SingleListingPolicies from "../components/site/SingleListingPolicies";
import BookingFrm from "../components/site/BookingFrm";
import SingleListingGallery from "../components/site/SingleListingGallery";
import axios from "axios";

const Listing = ({ slug }) => {
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);
    const [searchParams, setSearchParams] = useState(null);

    const fetchListing = async () => {
        try {
            const response = await axios.get("/api/get_listing", {
                params: { slug },
            });

            setListing(response.data.listing);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Read search parameters from session storage or URL
        const storedParams = sessionStorage.getItem('searchParams');
        if (storedParams) {
            try {
                const params = JSON.parse(storedParams);
                // Validate params structure
                if (params && typeof params === 'object') {
                    setSearchParams(params);
                } else {
                    console.error('Invalid search params structure');
                    sessionStorage.removeItem('searchParams');
                }
            } catch (e) {
                console.error('Error parsing search params:', e);
                // Remove corrupted data
                sessionStorage.removeItem('searchParams');
            }
        }
        
        // Also check URL parameters as fallback
        const urlParams = new URLSearchParams(window.location.search);
        if (!searchParams && urlParams.toString()) {
            const params = {};
            for (const [key, value] of urlParams) {
                params[key] = value;
            }
            setSearchParams(params);
        }
        
        setTimeout(() => {
            fetchListing();
        }, 1200);
    }, []);

    return (
        <>
            <div className="bt-page listing-details">
                <div className="listing-container">
                    <div className="listing-container__left">
                        {listing?.category_id !== 2 ? (
                            <SingleListingGallery
                                listing={listing}
                                loading={loading}
                            />
                        ) : (
                            <SingleListingInfoCard
                                loading={loading}
                                listing={listing}
                            />
                        )}

                        <div className="singlelisting-cancelation">
                            {loading ? (
                                <>
                                    <Skeleton height={12} width={120} />
                                    <Skeleton height={12} width={100} />
                                </>
                            ) : (
                                <>
                                    <div className="free-cancelation__img">
                                        <img src="https://marhire.bytech.ma/images/icons/icon1.svg" />
                                    </div>
                                    <div>
                                        <h3 className="singlelisting__h3">
                                            Free Cancellation
                                        </h3>
                                        <p className="singlelisting__p">
                                            Lock in this price today, cancel
                                            free of charge up to 6 hours before
                                            pick-up to get 100% refund.
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                        <SingleListingShortDescription
                            listing={listing}
                            loading={loading}
                        />
                        <SingleListingSpecs
                            loading={loading}
                            item={listing}
                            category={listing?.category_id}
                        />

                        <SingleListingIncluded
                            includeds={listing?.included || []}
                            notIncludeds={listing?.not_included || []}
                            loading={loading}
                        />
                        {listing?.addons && (
                            <SingleListingAddons
                                addons={listing?.addons || []}
                                loading={loading}
                            />
                        )}
                        <SingleListingPolicies
                            loading={loading}
                            depositRequired={listing?.deposit_required}
                        />
                        {listing && (
                            <RelatedProducts
                                loading={loading}
                                category={listing?.category_id}
                            />
                        )}
                    </div>
                    <div className="listing-container__right">
                        <BookingFrm 
                            loading={loading} 
                            listingId={listing?.id}
                            categoryId={listing?.category_id}
                            listing={listing}
                            searchParams={searchParams}
                        />
                        <SingleListingPricing loading={loading} />
                    </div>
                </div>
            </div>
            <SingleListingBottom listing={listing} />
            <Footer />
        </>
    );
};

export default Listing;
