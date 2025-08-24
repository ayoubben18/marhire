
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
  title: 'Private Driver Fes | Airport Transfers (FEZ) & Tours | MarHire',
  description: 'Book a professional private driver in Fes for reliable airport transfers from FEZ, city tours, or day trips to Meknes and Volubilis. Fixed prices and comfortable vehicles.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'All our Fes chauffeurs are licensed, experienced, and experts in navigating the region.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Pricing', description: 'The price for your Fes private driver is confirmed upfront. No surprises or hidden costs.' },
    { icon: Plane, title: 'Reliable Fes Airport Pickup', description: 'Your driver tracks your flight to Fes-Saïss Airport (FEZ) and waits for you upon arrival.' },
    { icon: Car, title: 'Comfortable & Clean Vehicles', description: 'Travel in modern, air-conditioned vehicles suitable for city tours or longer excursions.' },
    { icon: Languages, title: 'Knowledgeable Local Guides', description: 'Many of our drivers also act as local guides, enriching your day trips to Meknes or Chefchaouen.' },
    { icon: Calendar, title: 'Book Your Trips in Advance', description: 'Secure your private driver for tours and transfers easily online with instant confirmation.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Fes');

export default function PrivateDriverFesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Fes"
          description="Explore the cultural heart of Morocco with a professional private driver. Ideal for navigating the ancient city, reliable airport transfers from FEZ, and comfortable day trips to Meknes, Volubilis, or the blue city of Chefchaouen."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="fes medina view"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="fes" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Fes Private Driver with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Fes"
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
