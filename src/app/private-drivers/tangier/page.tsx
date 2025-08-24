
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
  title: 'Private Driver Tangier | Airport Transfers (TNG) & Tours | MarHire',
  description: 'Book a professional private driver in Tangier for reliable airport transfers from TNG, city tours, or day trips to Chefchaouen and Asilah. Fixed prices and premium vehicles.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'All our Tangier chauffeurs are licensed, experienced, and known for their punctuality.' },
    { icon: Tag, title: 'Fixed, Transparent Pricing', description: 'The price for your Tangier private driver is confirmed upfront. No hidden fees or surprises.' },
    { icon: Plane, title: 'Reliable Tangier Airport Pickup', description: 'Your driver tracks your flight to Ibn Battouta Airport (TNG) and waits for you upon arrival.' },
    { icon: Car, title: 'Executive & Modern Vehicles', description: 'Travel in comfort and style in a fleet of clean, modern, air-conditioned sedans and minivans.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Many of our Tangier drivers speak English, Spanish, and French.' },
    { icon: Calendar, title: 'Day Trips to Chefchaouen & Asilah', description: 'Book a comfortable and convenient private day trip to the region\'s most famous sights.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Tangier');

export default function PrivateDriverTangierPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Tangier"
          description="Discover the gateway to Africa in comfort and style. Book a professional private driver for your Tangier airport transfer, city tours, or excursions to the blue city of Chefchaouen. Fixed prices and reliable service guaranteed."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="tangier coastline"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="tangier" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Tangier Private Driver with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Tangier"
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
