import React from "react";
import { useTranslation } from "react-i18next";
import ListingIcons from "./ListingIcons";

const TYPES = {
    1: "cars",
    2: "drivers",
    3: "boats",
    4: "activities",
};

const SingleListingSpecs = ({ loading, item, category = 2 }) => {
    const { t } = useTranslation();
    const type = TYPES[category] || "cars";

    return (
        !loading &&
        item && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">{t("listing.specs.title")}</h3>
                {
                    <ListingIcons
                        type={type}
                        l={item}
                        classes="singlelisting__features grid-3"
                        withoutLocation={true}
                    />
                }
                {/* <div className="singlelisting__features grid-3">
                    {features.map((feature, indx) => (
                        <div className="singlelisting__feature" key={indx}>
                            <span className="singlelisting__feature__icon">
                                {feature.icon && feature.icon}
                            </span>
                            <span>{feature.name}</span>
                        </div>
                    ))}
                </div> */}
            </div>
        )
    );
};

export default SingleListingSpecs;
