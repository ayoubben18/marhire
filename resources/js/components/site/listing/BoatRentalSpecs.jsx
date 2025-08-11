import React from "react";
import { useTranslation } from "react-i18next";
import { 
    FaShip, 
    FaUserTie, 
    FaUsers, 
    FaMapMarkerAlt 
} from "react-icons/fa";
import { getTranslatedField } from "../../../utils/apiLocale";

const SpecItem = ({ icon, label, value, children }) => {
    if (!value || value === "" || value === null || value === undefined) {
        return null;
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
                <div className="text-blue-600 text-xl flex-shrink-0">
                    {icon}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-600 truncate">{label}</p>
                    <p className="text-base font-semibold text-gray-900 mt-1">
                        {children || value}
                    </p>
                </div>
            </div>
        </div>
    );
};

const BoatRentalSpecs = ({ listing }) => {
    const { t } = useTranslation();
    
    if (!listing) return null;

    const specs = [
        {
            icon: <FaShip />,
            label: t("listing.specs.boatType", "Boat Type"),
            value: getTranslatedField(listing, "boat_type") || listing.boat_type
        },
        {
            icon: <FaUserTie />,
            label: t("listing.specs.captain", "Captain"),
            value: listing.captain || listing.with_captain,
            renderValue: () => {
                const captain = listing.captain || listing.with_captain;
                return captain === "Yes" || captain === "1" || captain === 1 
                    ? t("listing.specs.included", "Included")
                    : t("listing.specs.notIncluded", "Not Included");
            }
        },
        {
            icon: <FaUsers />,
            label: t("listing.specs.capacity", "Capacity"),
            value: listing.capacity,
            renderValue: () => listing.capacity 
                ? `${listing.capacity} ${t("listing.specs.passengers", "passengers")}`
                : null
        },
        {
            icon: <FaMapMarkerAlt />,
            label: t("listing.specs.departureLocation", "Departure Location"),
            value: listing.departure_location,
            renderValue: () => {
                let location = "";
                
                // Try to build location from city and marina
                if (listing.city?.city_name) {
                    location = listing.city.city_name;
                }
                
                if (listing.marina || listing.departure_location) {
                    const marina = listing.marina || listing.departure_location;
                    if (location && marina !== location) {
                        location += ` - ${marina}`;
                    } else if (!location) {
                        location = marina;
                    }
                }
                
                return location || listing.departure_location;
            }
        }
    ];

    const validSpecs = specs.filter(spec => {
        if (spec.renderValue) {
            const renderedValue = spec.renderValue();
            return renderedValue !== null && renderedValue !== "" && renderedValue !== undefined;
        }
        return spec.value && spec.value !== "" && spec.value !== null;
    });

    if (validSpecs.length === 0) {
        return (
            <div className="text-gray-500 text-center py-8">
                {t("listing.specs.noSpecsAvailable", "No specifications available for this boat.")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {validSpecs.map((spec, index) => (
                <SpecItem
                    key={index}
                    icon={spec.icon}
                    label={spec.label}
                    value={spec.value}
                >
                    {spec.renderValue ? spec.renderValue() : spec.value}
                </SpecItem>
            ))}
        </div>
    );
};

export default BoatRentalSpecs;