
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Tag, Plane, Car, Languages, Calendar } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Private Driver Rabat | Airport Transfers (RBA) & City Travel | MarHire',
  description: 'Book a professional private driver in Rabat for reliable airport transfers from RBA, business travel, and comfortable transfers to Casablanca. Premium service guaranteed.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Discreet Drivers', description: 'Our Rabat chauffeurs are licensed, experienced, and provide a discreet service ideal for business.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Pricing', description: 'The price you see is the price you pay. No hidden fees for your Rabat private driver service.' },
    { icon: Plane, title: 'Guaranteed Airport Pickup', description: 'Your driver monitors your flight and waits for you at Rabat-Salé Airport (RBA) with a name sign.' },
    { icon: Car, title: 'Executive & Modern Vehicles', description: 'Travel in comfort and style in a fleet of clean, modern, and air-conditioned vehicles.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Our Rabat drivers speak English and French, perfect for international visitors.' },
    { icon: Calendar, title: 'Ideal for Business & Official Travel', description: 'Rely on our punctual service for all your transportation needs in the capital city.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Rabat');

export default function PrivateDriverRabatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Rabat"
          description="Navigate Morocco's capital with efficiency and sophistication. Book a professional private driver for your Rabat airport transfer, business meetings, or comfortable travel to Casablanca. Fixed prices and reliable service guaranteed."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="hassan tower rabat"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="rabat" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Rabat Chauffeur with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Rabat"
                items={vehicleTypes}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='vehicle'
                paramName='carType'
            />
            
            <div className="container">
                <PopularDestinations />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
