import React from "react";
import { useTranslation } from "react-i18next";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoMdCloseCircleOutline } from "react-icons/io";

const SingleListingIncluded = ({ includeds = [], notIncludeds = [], loading }) => {
    const { t } = useTranslation();
    
    return (
        !loading && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">
                    {t("listing.included.title")} / {t("listing.included.notIncluded")}
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
