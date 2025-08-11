import React from "react";
import { useTranslation } from "react-i18next";
import { getLocalizedUrl } from "../../utils/localeManager";

const SingleListingPolicies = ({ loading, depositRequired = 'No' }) => {
    const { t } = useTranslation();
    
    return (
        !loading && (
            <div className="singlelisting-card">
                <h3 className="singlelisting__h3">{t("listing.policies.title")}</h3>
                <div>
                    <ul className="desc-list">
                        <li>
                            <a href="javascript:void(0)">
                                {t("listing.policies.deposit.title")}: {depositRequired == 'Yes' ? t("common.yes") : t("common.no")}
                            </a>
                        </li>
                        <li>
                            <a href="javascript:void(0)">{t("listing.policies.insurance")}: {t("listing.policies.fullInsurance")}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl("terms-conditions")}>{t("listing.policies.bookingPolicy")}</a>
                        </li>
                        <li>
                            <a href={getLocalizedUrl("cancellation-policy")}>{t("listing.policies.cancellationRules")}</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    );
};

export default SingleListingPolicies;
