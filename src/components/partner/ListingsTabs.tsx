
"use client";

import * as React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import type { Listing as PartnerPageListing } from '@/lib/partners';
import { MOCK_LISTINGS, type Listing } from '@/lib/mock-data';
import { ListingCard } from '@/components/listing-card';
import { Section } from './Section';

type ListingsTabsProps = {
  listings: PartnerPageListing[];
};


export function ListingsTabs({ listings }: ListingsTabsProps) {

  // Find the full listing details from the main mock data source
  // In a real app, this join would happen in the backend/API
  const detailedListings = listings
    .map(partnerListing => MOCK_LISTINGS.find(mock => mock.id === partnerListing.id))
    .filter((l): l is Listing => !!l);
    
  if (!listings || detailedListings.length === 0) {
    return (
        <Section title="Available Listings">
            <div className="text-center py-8">
                <p className="text-muted-foreground">This partner does not have any listings available on MarHire at the moment.</p>
            </div>
        </Section>
    );
  }


  return (
    <Section title="Available Listings">
        <div className="!p-0">
          <Carousel
              opts={{
                align: "start",
                loop: detailedListings.length > 4,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {detailedListings.map((listing) => (
                  <CarouselItem key={listing.id} className="basis-full sm:basis-1/2 lg:basis-1/2 xl:basis-1/3 pl-2 md:pl-4">
                     <div className="p-1 h-full">
                        <ListingCard listing={listing} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {detailedListings.length > 3 && (
                <>
                  <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                  <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                </>
              )}
            </Carousel>
        </div>
    </Section>
  );
}
