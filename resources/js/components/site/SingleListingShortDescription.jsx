import React, { useEffect } from "react";

const SingleListingShortDescription = ({ listing, loading }) => {
    return (
        !loading && (
            <>
                <div className="singlelisting-card">
                    <h3 className="singlelisting__h3">Short Description</h3>
                    <div
                        className="singlelisting__p"
                        dangerouslySetInnerHTML={{
                            __html: listing.short_description,
                        }}
                    ></div>
                </div>
                {listing.description && (
                    <div className="singlelisting-card">
                        <h3 className="singlelisting__h3">Details</h3>
                        <div
                            className="singlelisting__p"
                            dangerouslySetInnerHTML={{
                                __html: listing.description,
                            }}
                        ></div>
                    </div>
                )}
            </>
        )
    );
};

export default SingleListingShortDescription;
