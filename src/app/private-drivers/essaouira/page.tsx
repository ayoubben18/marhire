
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
  title: 'Private Driver Essaouira | Transfers to Marrakech & Agadir | MarHire',
  description: 'Book a professional private driver in Essaouira for comfortable transfers to Marrakech or Agadir airports and hotels. Fixed prices and reliable, modern vehicles.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'Our Essaouira drivers are experienced, punctual, and know the coastal routes perfectly.' },
    { icon: Tag, title: 'Fixed-Price Transfers', description: 'The price for your journey to or from Essaouira is confirmed upfront. No surprises.' },
    { icon: Plane, title: 'Connect to Major Airports', description: 'Travel stress-free with a pre-booked transfer from Essaouira to Marrakech (RAK) or Agadir (AGA) airports.' },
    { icon: Car, title: 'Comfortable, Modern Vehicles', description: 'Relax on your journey in a clean, modern, and air-conditioned vehicle.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Our drivers speak English and French, ensuring a smooth experience.' },
    { icon: Calendar, title: 'Book Your Transfer in Advance', description: 'Secure your transportation from the coast easily online with instant confirmation.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Essaouira');

export default function PrivateDriverEssaouiraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Essaouira"
          description="Travel to and from the windy city in comfort. Book a professional private driver for a reliable transfer from Essaouira to Marrakech, Agadir, or Casablanca. A safe and relaxing alternative to buses or taxis."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="essaouira port"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="essaouira" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Essaouira Transfer with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Essaouira"
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
