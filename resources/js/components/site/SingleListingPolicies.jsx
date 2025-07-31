import React from "react";

const SingleListingPolicies = ({ loading, depositRequired = 'No' }) => {
    return (
        !loading && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">Rental Policies</h3>
                <div>
                    <ul className="desc-list">
                        <li>
                            <a href="javascript:void(0)">Deposit required: {depositRequired == 'Yes' ? 'Yes' : 'No'} </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">Insurance info: Full Insurance</a>
                        </li>
                        <li>
                            <a href="/terms-conditions">Booking policy</a>
                        </li>
                        <li>
                            <a href="/cancellation-policy">Cancellation/refund rules</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
};

export default SingleListingPolicies;
