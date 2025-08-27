import React, { useMemo } from "react";
import UnifiedListings from "./UnifiedListings";

/**
 * ListingsByCity
 *
 * Small reusable wrapper that renders UnifiedListings with a row of city buttons.
 * It forwards all data-related props to UnifiedListings and uses its built-in
 * tabs behavior to switch the active city without reimplementing fetching logic.
 *
 * Props:
 * - title: string (section title)
 * - subtitle?: string
 * - categories: number | number[]
 * - cities: string[]               // tabs list (city names as shown in DB)
 * - initialCity?: string           // optional preferred tab to preselect
 * - perPage?: number
 * - page?: number
 * - locale?: string
 * - disableHeading?: boolean
 * - subcategories?: number[]
 * - agencies?: number[]
 */
const ListingsByCity = ({
    title,
    subtitle = null,
    categories,
    cities = [],
    initialCity = null,
    perPage = 8,
    page = 1,
    locale = null,
    disableHeading = false,
    subcategories = [],
    agencies = [],
}) => {
    // Ensure provided cities are unique and optionally re-order so initialCity appears first
    const cityTabs = useMemo(() => {
        const unique = Array.from(new Set(cities.filter(Boolean)));
        if (initialCity && unique.includes(initialCity)) {
            return [initialCity, ...unique.filter((c) => c !== initialCity)];
        }
        return unique;
    }, [cities, initialCity]);

    return (
        <UnifiedListings
            title={title}
            subtitle={subtitle}
            tabs={cityTabs}
            // data props forwarded
            categories={categories}
            subcategories={subcategories}
            agencies={agencies}
            cities={[]} // cities are driven by tabs; pass empty base
            perPage={perPage}
            page={page}
            locale={locale}
            disableHeading={disableHeading}
        />
    );
};

export default ListingsByCity;


