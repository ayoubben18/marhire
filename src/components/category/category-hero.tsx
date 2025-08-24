
"use client";

import * as React from 'react';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

type CategoryHeroProps = {
    title: string;
    description: string;
    imageUrl: string;
    imageHint: string;
    children: React.ReactNode;
}

export function CategoryHero({ title, description, imageUrl, imageHint, children }: CategoryHeroProps) {
    const triggerMobileSearch = () => {
        const trigger = document.querySelector('[data-trigger-mobile-search-overlay]') as HTMLElement;
        if (trigger) {
            trigger.click();
        }
    };
    
    return (
        <div className="relative w-full bg-primary/5 pt-12">
            <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover opacity-20"
                data-ai-hint={imageHint}
            />
            <div className="container text-center relative z-10 flex flex-col justify-between min-h-[50vh] md:min-h-0">
                <div className="pb-8">
                    <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-4">
                        {title}
                    </h1>
                    <p className="mt-4 text-lg text-foreground/80 max-w-3xl mx-auto">
                        {description}
                    </p>
                    <div className="mt-8">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
