
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ListingCard } from '@/components/listing-card';
import type { Listing } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type FilterType = 'city' | 'carType' | 'brand' | 'boatType' | 'vehicle' | 'activityType';

interface CategoryBrowseSectionProps {
    title: string;
    items: string[];
    listings: Listing[];
    basePath: string;
    filterType: FilterType;
    paramName: string;
}

const filterListings = (listings: Listing[], filterType: FilterType, filterValue: string): Listing[] => {
    return listings.filter(listing => {
        switch (filterType) {
            case 'city':
                return listing.location.city === filterValue;
            case 'carType':
                if (filterValue === 'Economy') return listing.price.perDay < 40;
                if (filterValue === 'SUV') return listing.name.toLowerCase().includes('duster') || listing.name.toLowerCase().includes('kadjar');
                if (filterValue === 'Luxury') return listing.price.perDay > 80;
                if (filterValue === 'Family VAN') return listing.specs.seats && listing.specs.seats >= 7;
                return false;
            case 'brand':
                return listing.name.toLowerCase().includes(filterValue.toLowerCase());
            case 'boatType':
                 if (filterValue === 'Jet Ski') return listing.name.toLowerCase().includes('jet ski');
                return listing.name.toLowerCase().includes(filterValue.replace(' ', '').toLowerCase());
            case 'vehicle':
                if (filterValue === 'Luxury Sedan') return (listing.name.includes('S-Class') || listing.name.includes('BMW 7'));
                if (filterValue === 'Minivan') return (listing.name.includes('V-Class') || listing.name.includes('Tourneo'));
                if (filterValue === 'SUV') return (listing.name.includes('Range Rover') || listing.name.includes('Land Cruiser'));
                if (filterValue === 'Business VAN') return (listing.name.includes('Sprinter'));
                return false;
            case 'activityType':
                 return listing.name.toLowerCase().includes(filterValue.toLowerCase().replace(' ', ''));
            default:
                return true;
        }
    }).slice(0, 8);
};


export function CategoryBrowseSection({ title, items, listings, basePath, filterType, paramName }: CategoryBrowseSectionProps) {
    const [activeItem, setActiveItem] = React.useState(items[0]);

    const filteredListings = React.useMemo(() => {
        return filterListings(listings, filterType, activeItem);
    }, [activeItem, listings, filterType]);

  return (
    <section className="w-full">
        <div className="container">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        {title}
                    </h2>
                </div>
                 <Button asChild variant="link" className="text-primary text-base p-0 h-auto self-start md:self-center">
                    <Link href={basePath}>Explore All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>

            <Tabs value={activeItem} onValueChange={setActiveItem} className="mt-6">
                <TabsList className="h-auto bg-transparent p-0 flex flex-wrap gap-2 justify-start">
                    {items.map(item => (
                        <TabsTrigger key={item} value={item} className="rounded-full border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary">
                            {item}
                        </TabsTrigger>
                    ))}
                </TabsList>
            </Tabs>
            
            <div className="mt-8 relative">
                <Carousel opts={{ align: "start", loop: false }} className="w-full">
                    <CarouselContent className="-ml-2 md:-ml-4">
                        {filteredListings.length > 0 ? (
                            filteredListings.map(listing => (
                                <CarouselItem key={listing.id} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2 md:pl-4">
                                    <div className="p-1 h-full">
                                        <ListingCard listing={listing} />
                                    </div>
                                </CarouselItem>
                            ))
                        ) : (
                            <CarouselItem className="w-full">
                                <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card/50 p-12 text-center h-96">
                                    <h3 className="font-headline mt-4 text-xl font-semibold">No Listings Found</h3>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        There are currently no listings available for {activeItem}.
                                    </p>
                                </div>
                            </CarouselItem>
                        )}
                         {filteredListings.length > 0 && (
                            <CarouselItem className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2 md:pl-4">
                                <div className="p-1 h-full flex items-center justify-center">
                                     <Button asChild variant="outline" size="lg">
                                        <Link href={`${basePath}?${paramName}=${activeItem.toLowerCase()}`}>
                                            View all for {activeItem} <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </CarouselItem>
                        )}
                    </CarouselContent>
                    {filteredListings.length > 4 && (
                        <>
                            <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                        </>
                    )}
                </Carousel>
            </div>
        </div>
    </section>
  );
}
