import React from "react";
import { useTranslation } from "react-i18next";
import { 
    FaCar, 
    FaTag, 
    FaCalendarAlt, 
    FaGasPump, 
    FaCogs, 
    FaSnowflake, 
    FaTachometerAlt, 
    FaIdCard, 
    FaMoneyCheckAlt 
} from "react-icons/fa";
import { MdEventSeat } from "react-icons/md";
import { GiCarDoor } from "react-icons/gi";
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

const CarRentalSpecs = ({ listing }) => {
    const { t } = useTranslation();
    
    if (!listing) return null;

    const specs = [
        {
            icon: <FaCar />,
            label: t("listing.specs.carType", "Car Type"),
            value: getTranslatedField(listing, "car_type") || listing.car_type
        },
        {
            icon: <FaTag />,
            label: t("listing.specs.brand", "Brand"),
            value: getTranslatedField(listing, "car_brand") || listing.car_brand
        },
        {
            icon: <FaCalendarAlt />,
            label: t("listing.specs.year", "Year"),
            value: listing.year
        },
        {
            icon: <FaGasPump />,
            label: t("listing.specs.fuelType", "Fuel Type"),
            value: getTranslatedField(listing, "fuel_type") || listing.fuel_type
        },
        {
            icon: <FaCogs />,
            label: t("listing.specs.transmission", "Transmission"),
            value: getTranslatedField(listing, "transmission") || listing.transmission
        },
        {
            icon: <MdEventSeat />,
            label: t("listing.specs.seats", "Seats"),
            value: listing.number_of_seats || listing.seats,
            renderValue: () => {
                const seats = listing.number_of_seats || listing.seats;
                return seats ? `${seats} ${t("listing.specs.seatsUnit", "seats")}` : null;
            }
        },
        {
            icon: <GiCarDoor />,
            label: t("listing.specs.doors", "Doors"),
            value: listing.number_of_doors || listing.doors,
            renderValue: () => {
                const doors = listing.number_of_doors || listing.doors;
                return doors ? `${doors} ${t("listing.specs.doorsUnit", "doors")}` : null;
            }
        },
        {
            icon: <FaSnowflake />,
            label: t("listing.specs.airCondition", "Air Conditioning"),
            value: listing.air_conditioning || listing.air_condition || listing.ac,
            renderValue: () => {
                const ac = listing.air_conditioning || listing.air_condition || listing.ac;
                return ac === "Yes" || ac === "1" || ac === 1 
                    ? t("listing.specs.included", "Included")
                    : t("listing.specs.notIncluded", "Not Included");
            }
        },
        {
            icon: <FaTachometerAlt />,
            label: t("listing.specs.mileagePolicy", "Mileage Policy"),
            value: getTranslatedField(listing, "mileage_policy") || listing.mileage_policy
        },
        {
            icon: <FaGasPump />,
            label: t("listing.specs.fuelPolicy", "Fuel Policy"),
            value: getTranslatedField(listing, "fuel_policy") || listing.fuel_policy
        },
        {
            icon: <FaIdCard />,
            label: t("listing.specs.driverAgeRequirement", "Driver Age Requirement"),
            value: listing.driver_age_requirement,
            renderValue: () => listing.driver_age_requirement 
                ? `${listing.driver_age_requirement}+ ${t("listing.specs.years", "years")}`
                : null
        },
        {
            icon: <FaMoneyCheckAlt />,
            label: t("listing.specs.deposit", "Deposit"),
            value: listing.deposit || listing.deposit_required,
            renderValue: () => {
                const deposit = listing.deposit || listing.deposit_required;
                if (deposit === "Yes" || deposit === "1" || deposit === 1) {
                    return t("listing.specs.depositRequired", "Required");
                } else if (deposit === "No" || deposit === "0" || deposit === 0) {
                    return t("listing.specs.noDeposit", "Not Required");
                }
                return deposit;
            }
        }
    ];

    const validSpecs = specs.filter(spec => {
        if (spec.renderValue) {
            return spec.renderValue() !== null && spec.renderValue() !== "";
        }
        return spec.value && spec.value !== "" && spec.value !== null;
    });

    if (validSpecs.length === 0) {
        return (
            <div className="text-gray-500 text-center py-8">
                {t("listing.specs.noSpecsAvailable", "No specifications available for this vehicle.")}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
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

export default CarRentalSpecs;