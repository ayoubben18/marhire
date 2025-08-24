
"use client";

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const destinations = [
  { name: 'Agadir', listings: '40+', slug: 'agadir', image: 'https://placehold.co/1200x800.png', hint: "beach city" },
  { name: 'Marrakech', listings: '40+', slug: 'marrakech', image: 'https://placehold.co/1200x800.png', hint: "market square" },
  { name: 'Casablanca', listings: '40+', slug: 'casablanca', image: 'https://placehold.co/1200x800.png', hint: "modern city" },
  { name: 'Fes', listings: '40+', slug: 'fes', image: 'https://placehold.co/1200x800.png', hint: "old medina" },
  { name: 'Tangier', listings: '40+', slug: 'tangier', image: 'https://placehold.co/1200x800.png', hint: "coastal city" },
  { name: 'Essaouira', listings: '40+', slug: 'essaouira', image: 'https://placehold.co/1200x800.png', hint: "port city" },
  { name: 'Rabat', listings: '40+', slug: 'rabat', image: 'https://placehold.co/1200x800.png', hint: "capital city" },
  { name: 'Chefchaouen', listings: '20+', slug: 'chefchaouen', image: 'https://placehold.co/1200x800.png', hint: "blue city" },
];

interface PopularDestinationsProps {
    basePath?: string;
}

export function PopularDestinations({ basePath = "" }: PopularDestinationsProps) {
  return (
    <section>
        <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Explore Popular Destinations in Morocco
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
                Explore Morocco by City & Service. Find the best deals on car rentals, private drivers, boats and activities.
            </p>
        </div>
        <div className="mt-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {destinations.map((dest) => (
                <CarouselItem key={dest.name} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-2 md:pl-4">
                   <Link href={`${basePath}/${dest.slug}`} className="group p-1 block">
                      <Card className="overflow-hidden rounded-2xl transition-all hover:shadow-lg">
                          <CardContent className="p-0">
                              <div className="relative h-80">
                                  <Image src={dest.image} alt={dest.name} fill className="object-cover" data-ai-hint={dest.hint} />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                  <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                                      <h3 className="font-headline text-xl md:text-2xl font-bold">{dest.name}</h3>
                                      <p className="text-sm md:text-base">{dest.listings} Listings</p>
                                  </div>
                                  <div className="absolute top-4 right-4 bg-background/80 text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                      <ArrowRight className="h-5 w-5" />
                                  </div>
                              </div>
                          </CardContent>
                      </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
          </Carousel>
        </div>
    </section>
  );
}
