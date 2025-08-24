
import * as React from 'react';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import type { Listing, SearchParams, SortOption } from '@/lib/types';
import { SearchResultsClient } from './search-results-client';

export const dynamic = 'force-dynamic';

function filterAndSortListings(searchParams: SearchParams): { filteredListings: Listing[], pageTitle: string } {
    let results: Listing[] = [...MOCK_LISTINGS];
    let title = 'All Listings';
    
    // Fallback if no category is provided
    if (!searchParams.category) {
        return { filteredListings: results, pageTitle: 'All Search Results' };
    }
    
    const categoryParam = typeof searchParams.category === 'string' ? searchParams.category : '';
    const locationParam = typeof searchParams.location === 'string' ? searchParams.location : '';
    const sortBy = typeof searchParams.sortBy === 'string' ? searchParams.sortBy as SortOption : 'recommended';

    const CATEGORIES: Record<string, string> = {
        'cars': 'Car Rental',
        'private-drivers': 'Private Driver',
        'boats': 'Boat',
        'activities': 'Activity',
    };

    const formatSlug = (slug: string) => {
        if (!slug) return '';
        if (slug === 'cars') return 'Car Rentals';
        if (slug === 'private-drivers') return 'Private Drivers';
        return slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    const listingTypeParam = categoryParam ? CATEGORIES[categoryParam] : undefined;

    if (listingTypeParam) {
        results = results.filter(l => l.type === listingTypeParam);
        const formattedCategory = formatSlug(categoryParam);
        const formattedLocation = locationParam ? formatSlug(locationParam) : 'Morocco';
        title = `${formattedCategory} in ${formattedLocation}`;
    }
    if (locationParam) {
        results = results.filter(l => l.location.city.toLowerCase() === locationParam.toLowerCase());
    }

    Object.entries(searchParams).forEach(([key, value]) => {
        if (!value) return;
        if (key === 'priceRange') {
            const [min, max] = value.toString().split(',').map(Number);
            results = results.filter(l => l.price.perDay >= min && l.price.perDay <= max);
        }
        // Add other filters as needed, ensuring they check the category
    });

    const sortedResults = results.sort((a, b) => {
        switch (sortBy) {
            case 'price-asc': return a.price.perDay - b.price.perDay;
            case 'price-desc': return b.price.perDay - a.price.perDay;
            default: return 0;
        }
    });

    return { filteredListings: sortedResults, pageTitle: title };
}

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
  const { filteredListings, pageTitle } = filterAndSortListings(searchParams);

  return (
    <SearchResultsClient 
        initialListings={filteredListings}
        initialPageTitle={pageTitle}
        searchParams={searchParams}
    />
  );
}
