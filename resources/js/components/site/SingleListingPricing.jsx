import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SingleListingPricing = ({ loading }) => {
    return loading ? (
        <div className="singlelisting-pricing">
            <Skeleton height={12} width={120} />
            <Skeleton height={12} width={100} />
        </div>
    ) : (
        <div className="singlelisting-pricing">
            <div className="booking__price">
                <span className="booking__price__lbl">Price</span>
                <span className="booking__price__price">26.00 €</span>
            </div>
            <div className="booking__price">
                <span className="booking__price__lbl">Extra / Addons</span>
                <span className="booking__price__price">10.00 €</span>
            </div>
            <div className="booking__price">
                <span className="booking__price__lbl">Tax</span>
                <span className="booking__price__price">Included</span>
            </div>
            <div className="booking__price--total">
                <span className="booking__price__lbl">Total</span>
                <span className="booking__price__price">36.00 €</span>
            </div>
        </div>
    );
};

export default SingleListingPricing;
