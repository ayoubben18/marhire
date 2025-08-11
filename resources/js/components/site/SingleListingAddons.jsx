import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Checkbox from "@mui/material/Checkbox";
import axios from "axios";

const label = { inputProps: { "aria-label": "Addons" } };

const SingleListingAddons = ({ addons = [], loading }) => {
    const { t } = useTranslation();
    
    return (
        !loading && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">{t("listing.addons.title")}</h3>
                <div className="addons__list">
                    {addons.map((item) => (
                        <div className="addons__item" key={item.addon.id}>
                            <div>
                                <Checkbox {...label} color="success" />
                                <div>{item.addon.addon}</div>
                            </div>
                            <div className="addon__item_price">
                                {item.addon.price} €
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default SingleListingAddons;
