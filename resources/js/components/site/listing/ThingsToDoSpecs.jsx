import React from "react";
import { useTranslation } from "react-i18next";
import { 
    FaRunning, 
    FaMapMarkedAlt, 
    FaUsers, 
    FaChartLine 
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

const ThingsToDoSpecs = ({ listing }) => {
    const { t } = useTranslation();
    
    if (!listing) return null;

    const specs = [
        {
            icon: <FaRunning />,
            label: t("listing.specs.activityType", "Activity Type"),
            value: getTranslatedField(listing, "activity_type") || listing.activity_type,
            renderValue: () => {
                // Try to get from activity_type_obj if available
                if (listing.activity_type_obj?.option) {
                    return getTranslatedField(listing.activity_type_obj, "option") || listing.activity_type_obj.option;
                }
                return getTranslatedField(listing, "activity_type") || listing.activity_type;
            }
        },
        {
            icon: <FaMapMarkedAlt />,
            label: t("listing.specs.pickupIncluded", "Pickup Included"),
            value: listing.pickup_included,
            renderValue: () => {
                const pickup = listing.pickup_included || listing.meeting_point;
                if (pickup === "Yes" || pickup === "1" || pickup === 1) {
                    return t("listing.specs.included", "Included");
                } else if (pickup === "No" || pickup === "0" || pickup === 0) {
                    return t("listing.specs.notIncluded", "Not Included");
                } else if (listing.meeting_point && listing.meeting_point !== "Yes" && listing.meeting_point !== "No") {
                    return listing.meeting_point;
                }
                return pickup;
            }
        },
        {
            icon: <FaUsers />,
            label: t("listing.specs.privateOrGroup", "Tour Type"),
            value: listing.private_or_group || listing.tour_type,
            renderValue: () => {
                const tourType = listing.private_or_group || listing.tour_type;
                if (tourType === "private" || tourType === "Private") {
                    return t("listing.specs.privateTour", "Private Tour");
                } else if (tourType === "group" || tourType === "Group") {
                    return t("listing.specs.groupTour", "Group Tour");
                }
                return getTranslatedField(listing, "private_or_group") || tourType;
            }
        },
        {
            icon: <FaUsers />,
            label: t("listing.specs.groupSize", "Group Size"),
            value: listing.group_size || listing.group_size_max,
            renderValue: () => {
                const groupSize = listing.group_size || listing.group_size_max;
                if (groupSize) {
                    if (groupSize === "unlimited" || groupSize === "Unlimited") {
                        return t("listing.specs.unlimited", "Unlimited");
                    }
                    const size = parseInt(groupSize);
                    if (!isNaN(size)) {
                        return `${size} ${t("listing.specs.maxPeople", "max people")}`;
                    }
                    return groupSize;
                }
                return null;
            }
        },
        {
            icon: <FaChartLine />,
            label: t("listing.specs.difficultyLevel", "Difficulty Level"),
            value: listing.difficulty_level || listing.difficulty,
            renderValue: () => {
                const difficulty = listing.difficulty_level || listing.difficulty;
                if (difficulty) {
                    // Translate common difficulty levels
                    const difficultyMap = {
                        "easy": t("listing.specs.difficultyEasy", "Easy"),
                        "moderate": t("listing.specs.difficultyModerate", "Moderate"),
                        "medium": t("listing.specs.difficultyModerate", "Moderate"),
                        "hard": t("listing.specs.difficultyHard", "Hard"),
                        "difficult": t("listing.specs.difficultyHard", "Hard"),
                        "challenging": t("listing.specs.difficultyChallenging", "Challenging"),
                        "beginner": t("listing.specs.difficultyBeginner", "Beginner"),
                        "intermediate": t("listing.specs.difficultyIntermediate", "Intermediate"),
                        "advanced": t("listing.specs.difficultyAdvanced", "Advanced")
                    };
                    
                    const lowerDifficulty = difficulty.toLowerCase();
                    if (difficultyMap[lowerDifficulty]) {
                        return difficultyMap[lowerDifficulty];
                    }
                    
                    return getTranslatedField(listing, "difficulty_level") || 
                           getTranslatedField(listing, "difficulty") || 
                           difficulty;
                }
                return null;
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
                {t("listing.specs.noSpecsAvailable", "No specifications available for this activity.")}
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

export default ThingsToDoSpecs;