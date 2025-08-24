
"use client";

import * as React from 'react';
import { Award, ShieldCheck, Tag, Sparkles, CircleDollarSign, Search } from 'lucide-react';
import Image from 'next/image';
import { SearchTabsFallback } from './search-tabs-fallback';
import { Button } from './ui/button';

const propositions = [
  { icon: ShieldCheck, text: 'Trusted Local Partners' },
  { icon: Tag, text: 'No Hidden Fees' },
  { icon: Sparkles, text: 'Instant Booking' },
  { icon: CircleDollarSign, text: 'No Deposit' },
];

export function HeroSection({ children }: { children: React.ReactNode }) {
  const triggerMobileSearch = () => {
    const trigger = document.querySelector('[data-trigger-mobile-search-overlay]') as HTMLElement;
    if (trigger) {
      trigger.click();
    }
  }

  return (
    <div className="relative w-full pt-12 pb-12 overflow-hidden bg-primary/5">
       <Image
        src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=2070"
        alt="Crowd at a concert"
        fill
        className="object-cover object-center opacity-10"
        data-ai-hint="morocco travel"
      />
       <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
      <div className="container text-center relative z-10 flex flex-col justify-between min-h-[50vh] md:min-h-0">
        <div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
            Explore Morocco with Verified Local Experts
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            The best deals on car rentals, private drivers, boat trips, and activities, all in one place.
            </p>
            <div className="mt-8">
                {children}
            </div>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
                {propositions.map((prop, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm font-medium text-primary">
                        <prop.icon className="h-4 w-4" />
                        <span>{prop.text}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
