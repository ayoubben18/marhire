
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { Shield, BarChart, Plane, LifeBuoy, Fuel, Check } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';

export const metadata: Metadata = {
  title: 'Range Rover Rental Morocco | Hire Vogue, Sport & Evoque | MarHire',
  description: 'Rent a Range Rover in Morocco. Find deals on luxury Range Rover models like the Vogue, Sport, and Evoque for the ultimate in style and capability in Marrakech and Casablanca.',
};

const rangeRoverFeatures = [
    { icon: Shield, title: 'Unrivaled Luxury & Comfort', description: 'Experience a serene and luxurious cabin, with premium materials and a commanding view of the road.' },
    { icon: BarChart, title: 'Go-Anywhere Capability', description: 'With legendary 4x4 capabilities, a Range Rover is as comfortable on city streets as it is on mountain tracks.' },
    { icon: Plane, title: 'VIP Airport Delivery Service', description: 'Have your Range Rover waiting for you with our exclusive meet and greet service at major Moroccan airports.' },
    { icon: LifeBuoy, title: 'Icon of Automotive Design', description: 'Make a definitive statement of style and sophistication wherever your journey takes you.' },
    { icon: Fuel, title: 'Advanced Technology & Safety', description: 'Drive with confidence, surrounded by cutting-edge driver aids and safety systems.' },
    { icon: Check, title: 'Perfect for Prestigious Events', description: 'A Range Rover is the perfect vehicle for weddings, business travel, or any special occasion.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('range rover'));

export default function RangeRoverRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Range Rover Rental in Morocco"
          description="The pinnacle of luxury and capability. Rent a Range Rover for an unparalleled travel experience in Morocco. We offer prestigious models like the Range Rover Vogue and Sport, perfect for any terrain or occasion."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="range rover driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Range Rover in Morocco?"
                features={rangeRoverFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Range Rover Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/range-rover"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/range-rover" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
