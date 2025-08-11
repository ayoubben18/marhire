import React from "react";
import { useTranslation } from "react-i18next";
import { 
    FaCar, 
    FaTag, 
    FaUsers, 
    FaSuitcase, 
    FaLanguage 
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

const PrivateDriverSpecs = ({ listing }) => {
    const { t } = useTranslation();
    
    if (!listing) return null;

    const specs = [
        {
            icon: <FaCar />,
            label: t("listing.specs.vehicleType", "Vehicle Type"),
            value: getTranslatedField(listing, "vehicle_type") || listing.vehicle_type || listing.service_type
        },
        {
            icon: <FaTag />,
            label: t("listing.specs.vehicleModel", "Vehicle Model"),
            value: getTranslatedField(listing, "vehicle_model") || listing.vehicle_model || listing.car_model
        },
        {
            icon: <FaUsers />,
            label: t("listing.specs.maxPassengers", "Max Passengers"),
            value: listing.max_passengers,
            renderValue: () => listing.max_passengers 
                ? `${listing.max_passengers} ${t("listing.specs.passengers", "passengers")}`
                : null
        },
        {
            icon: <FaSuitcase />,
            label: t("listing.specs.maxLuggage", "Max Luggage"),
            value: listing.max_luggage,
            renderValue: () => {
                if (listing.max_luggage) {
                    const luggageCount = parseInt(listing.max_luggage);
                    if (!isNaN(luggageCount)) {
                        return `${luggageCount} ${t("listing.specs.bags", "bags")}`;
                    }
                    return listing.max_luggage;
                }
                return null;
            }
        },
        {
            icon: <FaLanguage />,
            label: t("listing.specs.languages", "Languages"),
            value: listing.languages,
            renderValue: () => {
                let languages = listing.languages;
                
                // If languages is an array, join them
                if (Array.isArray(languages)) {
                    languages = languages.join(", ");
                }
                
                // If it's a translated field, try to get the translation
                if (typeof languages === "string") {
                    const translatedLanguages = getTranslatedField(listing, "languages");
                    if (translatedLanguages && translatedLanguages !== languages) {
                        languages = translatedLanguages;
                    }
                }
                
                // Fallback for common patterns
                if (!languages || languages === "") {
                    // Check if there are language-related fields
                    const langFields = ["arabic", "english", "french", "spanish"];
                    const availableLanguages = langFields.filter(lang => listing[lang] === "Yes" || listing[lang] === 1);
                    
                    if (availableLanguages.length > 0) {
                        languages = availableLanguages.map(lang => 
                            lang.charAt(0).toUpperCase() + lang.slice(1)
                        ).join(", ");
                    } else {
                        languages = t("listing.specs.multilingual", "Multilingual");
                    }
                }
                
                return languages;
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
                {t("listing.specs.noSpecsAvailable", "No specifications available for this service.")}
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

export default PrivateDriverSpecs;