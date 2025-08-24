
"use client";

import * as React from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Listing, SearchParams, SortOption } from '@/lib/types';
import { ResultsToolbar } from '@/components/results-toolbar';
import { ListingCardHorizontal } from '@/components/listing-card-horizontal';
import { ListingCardHorizontalSkeleton } from '@/components/listing-card-horizontal-skeleton';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';

const ITEMS_PER_PAGE = 8;

interface SearchResultsClientProps {
    initialListings: Listing[];
    initialPageTitle: string;
    searchParams: SearchParams;
}

export function SearchResultsClient({ initialListings, initialPageTitle, searchParams }: SearchResultsClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentSearchParams = useSearchParams();

  const [isLoading, setIsLoading] = React.useState(true);
  const [sortBy, setSortBy] = React.useState<SortOption>(
    (searchParams.sortBy as SortOption) || 'recommended'
  );
  const [visibleCount, setVisibleCount] = React.useState(ITEMS_PER_PAGE);

  React.useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [currentSearchParams]);

  const handleSortChange = (newSortBy: SortOption) => {
    setSortBy(newSortBy);
    const newParams = new URLSearchParams(currentSearchParams);
    newParams.set('sortBy', newSortBy);
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleLoadMore = () => {
    setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  const visibleListings = initialListings.slice(0, visibleCount);
  
  return (
    <div>
      <h1 className="font-headline text-3xl font-bold">{initialPageTitle}</h1>
      <ResultsToolbar 
          resultsCount={initialListings.length}
          sortBy={sortBy}
          setSortBy={handleSortChange}
      />
      {isLoading ? (
        <div className="mt-6 grid grid-cols-1 gap-6">
          {Array.from({ length: 4 }).map((_, i) => <ListingCardHorizontalSkeleton key={i} />)}
        </div>
      ) : visibleListings.length > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-6">
            {visibleListings.map(listing => (
              <ListingCardHorizontal key={listing.id} listing={listing} searchParams={searchParams} />
            ))}
          </div>
          {initialListings.length > visibleCount && (
            <div className="mt-8 text-center">
              <Button onClick={handleLoadMore} size="lg">Load More Results</Button>
            </div>
          )}
        </>
      ) : (
        <EmptyState resetFilters={resetFilters} />
      )}
    </div>
  );
}
