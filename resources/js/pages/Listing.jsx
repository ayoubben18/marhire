import { useEffect, useState, Fragment } from "react";
import Footer from "../components/site/Footer";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Core components
import BookingFrm from "../components/site/BookingFrm";

// Import listing components that we're currently using
import ListingBreadcrumbs from "../components/site/listing/ListingBreadcrumbs";
import ListingHeader from "../components/site/listing/ListingHeader";
import ListingGallerySingle from "../components/site/listing/ListingGallerySingle";
import ListingGalleryViator from "../components/site/listing/ListingGalleryViator";

// Components to be added one by one
import ListingSpecifications from "../components/site/listing/ListingSpecifications";
import ListingTrustNotes from "../components/site/listing/ListingTrustNotes";
import ListingOverview from "../components/site/listing/ListingOverview";
import BookingTerms from "../components/site/listing/BookingTerms";
import SpecialNotes from "../components/site/listing/SpecialNotes";
import WhatsIncluded from "../components/site/listing/WhatsIncluded";
import MeetingPoint from "../components/site/listing/MeetingPoint";
import DealerNote from "../components/site/listing/DealerNote";
import ListingDescription from "../components/site/listing/ListingDescription";
// import TrustBadges from "../components/site/listing/TrustBadges";
// import ListingPolicies from "../components/site/listing/ListingPolicies";
// import SingleListingAddons from "../components/site/SingleListingAddons";
import RelatedProducts from "../components/site/RelatedProducts";

// Helper function to get translated field
const getTranslatedField = (listing, field, locale) => {
    if (listing?.translated_fields && listing.translated_fields[field]) {
        if (listing.translated_fields[field][locale]) {
            return listing.translated_fields[field][locale];
        }
        if (listing.translated_fields[field]["en"]) {
            return listing.translated_fields[field]["en"];
        }
    }
    return listing?.[field] || "";
};

// Helper to check if a component would render content
const hasContent = (listing, field) => {
    if (!listing) return false;

    // Check for translated fields
    if (listing?.translated_fields && listing.translated_fields[field]) {
        const translatedField = listing.translated_fields[field];
        // Check if any language has content
        return Object.values(translatedField).some(
            (value) => value && value.trim() !== ""
        );
    }

    // Check regular field
    return listing[field] && listing[field].trim() !== "";
};

const Listing = ({ slug }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [loading, setLoading] = useState(true);
    const [listing, setListing] = useState(null);
    const [searchParams, setSearchParams] = useState(null);
    const [enableSticky, setEnableSticky] = useState(false);

    const fetchListing = async () => {
        try {
            const response = await axios.get("/api/get_listing", {
                params: {
                    slug,
                    locale: currentLocale,
                },
            });

            console.log("Listing data received:", response.data.listing);
            console.log(
                "All listing fields:",
                Object.keys(response.data.listing)
            );
            console.log("Car Type Obj:", response.data.listing.car_type_obj);
            console.log("Car Model Obj:", response.data.listing.car_model_obj);
            setListing(response.data.listing);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        // Read search parameters from session storage or URL
        const storedParams = sessionStorage.getItem("searchParams");
        if (storedParams) {
            try {
                const params = JSON.parse(storedParams);
                // Validate params structure
                if (params && typeof params === "object") {
                    setSearchParams(params);
                } else {
                    console.error("Invalid search params structure");
                    sessionStorage.removeItem("searchParams");
                }
            } catch (e) {
                console.error("Error parsing search params:", e);
                // Remove corrupted data
                sessionStorage.removeItem("searchParams");
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
    }, [currentLocale]);

    // Enable sticky for laptop and desktop screens
    useEffect(() => {
        const checkStickyEligibility = () => {
            // Enable sticky for screens >= 1025px width (laptops and desktops)
            setEnableSticky(window.innerWidth >= 1025);
        };

        // Check on mount and resize
        checkStickyEligibility();
        window.addEventListener("resize", checkStickyEligibility);

        return () =>
            window.removeEventListener("resize", checkStickyEligibility);
    }, []);

    return (
        <>
            <div className="bt-page listing-details">
                <div className="listing-container">
                    <div className="listing-container__left w-full">
                        {/* 1. Breadcrumbs */}
                        <ListingBreadcrumbs
                            loading={loading}
                            listing={listing}
                            currentLocale={currentLocale}
                            getTranslatedField={getTranslatedField}
                            t={t}
                        />

                        {/* 2. Title (H1) + Location + Provider */}
                        <ListingHeader
                            loading={loading}
                            listing={listing}
                            currentLocale={currentLocale}
                            getTranslatedField={getTranslatedField}
                        />

                        {/* 3. Gallery - Use correct gallery based on category */}
                        {/* Note: Category IDs in database: Car=2, Driver=3, Boat=4, Activities=5 */}
                        {listing?.category_id === 2 ? (
                            <ListingGallerySingle
                                loading={loading}
                                listing={listing}
                            />
                        ) : (
                            <ListingGalleryViator
                                loading={loading}
                                listing={listing}
                            />
                        )}
                        <div className="lg:hidden">
                        <div className="listing-section-separator"></div>
                        </div>
                        {/* Mobile Booking Form - Shows below gallery on small devices */}
                        <div className="mobile-booking-form lg:hidden">
                            <BookingFrm
                                loading={loading}
                                listingId={listing?.id}
                                categoryId={listing?.category_id}
                                listing={listing}
                                searchParams={searchParams}
                                formId="mobile-booking-form"
                            />
                        </div>
                        <div className="listing-section-separator"></div>

                        {/* 4. Specifications with Icons */}
                        <ListingSpecifications
                            loading={loading}
                            listing={listing}
                        />
                        <div className="listing-section-separator"></div>

                        {/* 5. Trust Notes / Why Book With Us */}
                        <ListingTrustNotes
                            loading={loading}
                            listing={listing}
                        />
                        <div className="listing-section-separator"></div>

                        {/* 6. Overview */}
                        <ListingOverview loading={loading} listing={listing} />
                        {!loading &&
                            hasContent(listing, "short_description") && (
                                <div className="listing-section-separator"></div>
                            )}

                        {/* 7. Booking Terms */}
                        <BookingTerms loading={loading} />
                        <div className="listing-section-separator"></div>

                        {/* 8. Special Notes and Requirements */}
                        <SpecialNotes loading={loading} listing={listing} />
                        {!loading && hasContent(listing, "special_notes") && (
                            <div className="listing-section-separator"></div>
                        )}

                        {/* 9. What's Included */}
                        <WhatsIncluded loading={loading} listing={listing} />
                        {!loading &&
                            (listing?.included?.length > 0 ||
                                listing?.not_included?.length > 0 ||
                                listing?.notIncluded?.length > 0) && (
                                <div className="listing-section-separator"></div>
                            )}

                        {/* 10. Meeting and Pickup (For Things to Do only) */}
                        {listing?.category_id === 5 && (
                            <MeetingPoint loading={loading} listing={listing} />
                        )}
                        {!loading &&
                            listing?.category_id === 5 &&
                            (listing?.meeting_point ||
                                listing?.pickup_info) && (
                                <div className="listing-section-separator"></div>
                            )}

                        {/* 11. Dealer Note */}
                        <DealerNote loading={loading} listing={listing} />
                        {!loading && hasContent(listing, "dealer_note") && (
                            <div className="listing-section-separator"></div>
                        )}

                        {/* 12. Everything You Need to Know */}
                        <ListingDescription
                            loading={loading}
                            listing={listing}
                        />
                        {!loading && hasContent(listing, "description") && (
                            <div className="listing-section-separator"></div>
                        )}

                        {/* 13. Related Products */}
                        <RelatedProducts
                            category={listing?.category_id}
                            loading={loading}
                        />
                    </div>
                    <div
                        className={`listing-container__right hidden lg:block ${
                            enableSticky ? "sticky-enabled" : ""
                        }`}
                    >
                        {/* 16. Sticky Booking Form - Desktop only */}
                        <BookingFrm
                            loading={loading}
                            listingId={listing?.id}
                            categoryId={listing?.category_id}
                            listing={listing}
                            searchParams={searchParams}
                            formId="desktop-booking-form"
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Listing;
