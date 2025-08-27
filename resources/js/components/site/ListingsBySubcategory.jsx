import React, { useMemo } from "react";
import UnifiedListings from "./UnifiedListings";

/**
 * ListingsBySubcategory
 * 
 * Component for displaying listings filtered by subcategory options (brands, types, etc.)
 * Works similarly to ListingsByCity but uses subcategory filtering instead.
 */
const ListingsBySubcategory = ({
    title,
    subtitle = null,
    categories,
    subcategoryOptions = [], // Array of {id, name} objects for tabs
    initialOption = null,
    perPage = 8,
    page = 1,
    locale = null,
    disableHeading = false,
    agencies = [],
}) => {
    // Ensure provided options are unique and optionally re-order so initialOption appears first
    const optionTabs = useMemo(() => {
        const tabs = subcategoryOptions.map(opt => ({
            id: opt.id,
            name: opt.name
        }));
        
        if (initialOption) {
            const initial = tabs.find(t => t.name === initialOption);
            if (initial) {
                return [initial, ...tabs.filter(t => t.name !== initialOption)];
            }
        }
        return tabs;
    }, [subcategoryOptions, initialOption]);

    return (
        <UnifiedListings
            title={title}
            subtitle={subtitle}
            tabs={optionTabs}
            // data props forwarded
            categories={categories}
            subcategories={[]} // Will be driven by selected tab
            agencies={agencies}
            cities={[]}
            perPage={perPage}
            page={page}
            locale={locale}
            disableHeading={disableHeading}
            useSubcategoryFilter={true} // Flag to indicate subcategory filtering
        />
    );
};

export default ListingsBySubcategory;