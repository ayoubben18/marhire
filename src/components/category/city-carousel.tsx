
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
import { Button } from '../ui/button';

type CityCarouselProps = {
    title: string;
    cities: string[];
    basePath: string;
};

const cityImageMap: Record<string, { image: string, hint: string }> = {
    Agadir: { image: 'https://placehold.co/1200x800.png', hint: 'agadir beach' },
    Marrakech: { image: 'https://placehold.co/1200x800.png', hint: 'marrakech market' },
    Casablanca: { image: 'https://placehold.co/1200x800.png', hint: 'casablanca mosque' },
    Fes: { image: 'https://placehold.co/1200x800.png', hint: 'fes tanneries' },
    Tangier: { image: 'https://placehold.co/1200x800.png', hint: 'tangier coast' },
    Rabat: { image: 'https://placehold.co/1200x800.png', hint: 'rabat landmark' },
    Essaouira: { image: 'https://placehold.co/1200x800.png', hint: 'essaouira port' },
};

export function CityCarousel({ title, cities, basePath }: CityCarouselProps) {
  return (
    <section className="bg-primary/5">
        <div className="container py-12 md:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                        {title}
                    </h2>
                </div>
                <Button asChild variant="link" className="text-primary text-base p-0 h-auto self-start md:self-center">
                    <Link href={basePath}>Explore All Cities <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
            </div>
            <div className="mt-10">
            <Carousel
                opts={{
                align: "start",
                loop: cities.length > 5,
                }}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                {cities.map((city) => (
                    <CarouselItem key={city} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 pl-2 md:pl-4">
                    <Link href={`${basePath}/${city.toLowerCase()}`} className="group p-1 block">
                        <Card className="overflow-hidden rounded-2xl transition-all hover:shadow-lg">
                            <CardContent className="p-0">
                                <div className="relative h-80">
                                    <Image src={cityImageMap[city]?.image || 'https://placehold.co/1200x800.png'} alt={city} fill className="object-cover" data-ai-hint={cityImageMap[city]?.hint || 'city scape'} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                                        <h3 className="font-headline text-xl md:text-2xl font-bold">{city}</h3>
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
        </div>
    </section>
  );
}
