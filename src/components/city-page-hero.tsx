
"use client";

import * as React from 'react';
import Image from 'next/image';
import { Button } from './ui/button';
import { Search } from 'lucide-react';

type CityPageHeroProps = {
    cityName: string;
    heroImage: string;
    imageAlt: string;
    imageHint: string;
    breadcrumbs: React.ReactNode;
    children: React.ReactNode;
}

export function CityPageHero({ cityName, heroImage, imageAlt, imageHint, breadcrumbs, children }: CityPageHeroProps) {
    const triggerMobileSearch = () => {
        const trigger = document.querySelector('[data-trigger-mobile-search-overlay]') as HTMLElement;
        if (trigger) {
            trigger.click();
        }
    };
    
    return (
        <div className="relative w-full bg-primary/5 pt-12">
            <Image
                src={heroImage}
                alt={imageAlt}
                fill
                className="object-cover opacity-20"
                data-ai-hint={imageHint}
            />
            <div className="container text-center relative z-10 flex flex-col justify-between min-h-[50vh] md:min-h-0">
                <div className="pb-8">
                    {breadcrumbs}
                    <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-4">
                        Explore {cityName} with Verified Local Experts
                    </h1>
                    <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
                        The best deals on car rentals, private drivers, boat trips, and activities in {cityName}, all in one place.
                    </p>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
