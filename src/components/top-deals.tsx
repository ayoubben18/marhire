

"use client";

import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ListingCard } from './listing-card';
import type { Listing } from '@/lib/types';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';


interface TopDealsProps {
    title: string;
    exploreLink: string;
    exploreText: string;
    badges: string[];
    cities: string[];
    listings: Listing[];
}

export function TopDeals({ title, exploreLink, exploreText, badges, cities, listings }: TopDealsProps) {
    const [activeCity, setActiveCity] = React.useState('All Cities');

    const filteredListings = React.useMemo(() => {
        if (activeCity === 'All Cities') {
            return listings;
        }
        return listings.filter(listing => listing.location.city === activeCity);
    }, [activeCity, listings]);

  return (
    <section className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                    {title}
                </h2>
                 <div className="flex flex-wrap gap-2 mt-2">
                    {badges.map(badge => (
                        <Badge key={badge} variant="secondary" className="gap-1.5 pr-3">
                            <Check className="h-4 w-4 text-primary"/>
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>
            <Button asChild variant="link" className="text-primary text-base p-0 h-auto self-start md:self-center">
                <Link href={exploreLink}>{exploreText} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-6">
            <Button
              key="all"
              variant={activeCity === 'All Cities' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCity('All Cities')}
              className="rounded-full px-4"
            >
              All Cities
            </Button>
            {cities.map(city => (
                <Button key={city} variant={activeCity === city ? 'default' : 'outline'} size="sm" onClick={() => setActiveCity(city)} className="rounded-full px-4">
                    {city}
                </Button>
            ))}
        </div>
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
                                <h3 className="font-headline mt-4 text-xl font-semibold">No Deals Found</h3>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    There are currently no deals available in {activeCity}. Try selecting "All Cities".
                                </p>
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
    </section>
  );
}
