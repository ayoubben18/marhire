import React from "react";
import { useTranslation } from "react-i18next";
import CarRentalSpecs from "./CarRentalSpecs";
import BoatRentalSpecs from "./BoatRentalSpecs";
import PrivateDriverSpecs from "./PrivateDriverSpecs";
import ThingsToDoSpecs from "./ThingsToDoSpecs";

const EnhancedListingSpecs = ({ listing, loading = false, categoryId = 2 }) => {
    const { t } = useTranslation();

    if (loading || !listing) {
        return (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">{t("listing.specs.title")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="h-16 bg-gray-200 rounded-lg"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const renderCategorySpecs = () => {
        switch (parseInt(categoryId)) {
            case 1:
                return <CarRentalSpecs listing={listing} />;
            case 2:
                return <PrivateDriverSpecs listing={listing} />;
            case 3:
                return <BoatRentalSpecs listing={listing} />;
            case 4:
                return <ThingsToDoSpecs listing={listing} />;
            default:
                return <CarRentalSpecs listing={listing} />;
        }
    };

    return (
        <div className="singlelisting-card">
            <h3 className="singlelisting__h3">{t("listing.specs.title")}</h3>
            {renderCategorySpecs()}
        </div>
    );
};

export default EnhancedListingSpecs;