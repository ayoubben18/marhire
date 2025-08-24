
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
  title: 'Intercity Transfers Morocco | Private Driver Between Cities | MarHire',
  description: 'Book a private driver for comfortable and safe intercity transfers in Morocco. Fixed prices for travel between Marrakech, Fes, Casablanca, Agadir, and more.',
};

const intercityFeatures = [
    { icon: UserCheck, title: 'Safe & Professional Drivers', description: 'Our experienced drivers prioritize your safety and comfort on long-distance journeys.' },
    { icon: Tag, title: 'Fixed-Price Routes', description: 'Know the full cost upfront. Our fixed prices for city-to-city transfers include fuel and tolls.' },
    { icon: Plane, title: 'Door-to-Door Service', description: 'Enjoy the convenience of being picked up from your hotel in one city and dropped off at your next.' },
    { icon: Car, title: 'Comfortable, Air-Conditioned Vehicles', description: 'Travel in a spacious, modern vehicle, ensuring a relaxing journey between Moroccan cities.' },
    { icon: Languages, title: 'Stop for Photos Along the Way', description: 'Unlike a bus or train, a private transfer allows for the flexibility to stop at scenic spots.' },
    { icon: Calendar, title: 'Book Your Transfer in Advance', description: 'Schedule your city-to-city travel easily online and travel with peace of mind.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes", "Tangier", "Rabat"];
const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver');

export default function IntercityTransferPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Intercity Transfers in Morocco"
          description="Travel between Morocco's major cities in comfort and style. Book a private driver for your transfer from Marrakech to Fes, Casablanca to Rabat, or any other route. A safe, reliable, and convenient alternative to public transport."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="car on moroccan highway"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Private Intercity Transfer?"
                features={intercityFeatures}
            />
            
            <CategoryBrowseSection
                title="Popular Intercity Routes"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/intercity" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
