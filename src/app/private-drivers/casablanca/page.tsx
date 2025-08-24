
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
  title: 'Private Driver Casablanca | Airport Transfers (CMN) & Tours | MarHire',
  description: 'Book a professional private driver in Casablanca for fixed-price airport transfers from CMN, business travel, or city tours. Luxury vehicles and reliable service guaranteed.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'All our Casablanca chauffeurs are licensed, experienced, and vetted for professionalism.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Pricing', description: 'The price you see is the price you pay. No hidden fees for your Casablanca private driver service.' },
    { icon: Plane, title: 'Guaranteed Airport Pickup', description: 'Your driver monitors your flight and waits for you at Mohammed V Airport with a name sign.' },
    { icon: Car, title: 'Executive & Modern Vehicles', description: 'Travel in style and comfort in a fleet of clean, modern, and air-conditioned vehicles.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Many of our Casablanca drivers speak English and French.' },
    { icon: Calendar, title: 'Ideal for Business Travel', description: 'Rely on our punctual and discreet service for all your business transportation needs in the city.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Casablanca');

export default function PrivateDriverCasablancaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Casablanca"
          description="Navigate Morocco's bustling economic hub with efficiency and style. Book a professional private driver for your Casablanca airport transfer, business meetings, or city tours. Fixed prices and reliable service guaranteed."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="casablanca mosque"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="casablanca" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Casablanca Private Driver with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Casablanca"
                items={vehicleTypes}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='vehicle'
                paramName='carType'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
