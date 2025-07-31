import React from "react";
import ListingIcons from "./ListingIcons";

const TYPES = {
    2: "cars",
    3: "boats",
    4: "drivers",
    5: "activities",
};

const SingleListingSpecs = ({ loading, item, category = 2 }) => {
    const type = TYPES[category] || "cars";

    return (
        !loading &&
        item && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">Specs & Features</h3>
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
