import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Helper function to get translated field
const getTranslatedField = (listing, field, locale) => {
    if (listing?.translated_fields && listing.translated_fields[field]) {
        if (listing.translated_fields[field][locale]) {
            return listing.translated_fields[field][locale];
        }
        if (listing.translated_fields[field]['en']) {
            return listing.translated_fields[field]['en'];
        }
    }
    return listing?.[field] || '';
};

const SingleListingShortDescription = ({ listing, loading }) => {
    const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    
    return (
        !loading && listing && (
            <>
                <div className="singlelisting-card">
                    <h3 className="singlelisting__h3">{t("listing.description.shortDescription")}</h3>
                    <div
                        className="singlelisting__p"
                        dangerouslySetInnerHTML={{
                            __html: getTranslatedField(listing, 'short_description', currentLocale),
                        }}
                    ></div>
                </div>
                {getTranslatedField(listing, 'description', currentLocale) && (
                    <div className="singlelisting-card">
                        <h3 className="singlelisting__h3">{t("listing.description.title")}</h3>
                        <div
                            className="singlelisting__p"
                            dangerouslySetInnerHTML={{
                                __html: getTranslatedField(listing, 'description', currentLocale),
                            }}
                        ></div>
                    </div>
                )}
            </>
        )
    );
};

export default SingleListingShortDescription;
