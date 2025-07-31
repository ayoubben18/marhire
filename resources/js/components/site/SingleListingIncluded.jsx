import React from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SingleListingIncluded = ({ includeds = [], notIncludeds = [], loading }) => {
    return (
        !loading && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">
                    What's Included / Not Included
                </h3>
                <div className="singlelisting__included">
                    <div className="flex-1">
                        {includeds.map((item, idx) => (
                            <div className="singlelisting__included__item">
                                <span className="icon">
                                    <IoMdCheckmarkCircleOutline />
                                </span>{" "}
                                <span>{item.item}</span>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1">
                        {notIncludeds.map((item, idx) => (
                            <div className="singlelisting__included__item">
                                <span className="icon red">
                                    <IoMdCloseCircleOutline />
                                </span>{" "}
                                <span>{item.item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    );
};

export default SingleListingIncluded;
