
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { CityCarousel } from '@/components/category/city-carousel';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Tag, Plane, Car, Languages, Calendar } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Private Driver Morocco & Airport Transfers | Fixed Price | MarHire',
  description: 'Book a professional private driver in Morocco for airport transfers with fixed prices. Reliable chauffeur service for city tours or inter-city travel in Marrakech, Casablanca, and more.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'All our chauffeurs are licensed, experienced, and vetted for professionalism and local knowledge.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Pricing', description: 'The price you see is the price you pay. No hidden fees for fuel, tolls, or waiting time for your private driver.' },
    { icon: Plane, title: 'Morocco Airport Transfer', description: 'Your driver monitors your flight and waits for you in the arrivals hall with a name sign for a reliable airport pickup.' },
    { icon: Car, title: 'Comfortable, Modern Vehicles', description: 'Travel in style and comfort in a fleet of clean, modern, and air-conditioned vehicles.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Many of our drivers speak English, French, Spanish, and Arabic.' },
    { icon: Calendar, title: 'Flexible Chauffeur Services', description: 'Book by the hour, for a specific trip, or for multi-day tours across Morocco.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes", "Tangier", "Rabat"];
const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver');

export default function PrivateDriverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Morocco"
          description="Travel with comfort, safety, and style. Book a professional, multilingual private driver for your Morocco airport transfer, city tours, business trips, or multi-day excursions with fixed, all-inclusive pricing."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="luxury car interior"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book a Chauffeur Service in Morocco with MarHire?"
                features={driverFeatures}
            />

             <CityCarousel
                title="Find a Private Driver in Morocco's Top Cities"
                cities={cities}
                basePath="/private-drivers"
            />
            
            <CategoryBrowseSection
                title="Airport Transfer & Private Drivers by City"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />

            <CategoryBrowseSection
                title="Book a Chauffeur Service by Vehicle Type"
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
