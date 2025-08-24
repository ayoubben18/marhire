
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
  title: 'Volkswagen Car Rental Morocco | Hire Golf, Passat | MarHire',
  description: 'Rent a Volkswagen in Morocco. Find deals on reliable and comfortable VW models like the Golf and Passat, perfect for city driving and long-distance travel across Morocco.',
};

const volkswagenFeatures = [
    { icon: Shield, title: 'Renowned German Engineering', description: 'Experience the solid build quality, reliability, and refined driving experience of a Volkswagen.' },
    { icon: BarChart, title: 'Comfortable for Long Journeys', description: 'VW cars are known for their comfortable interiors and smooth ride, making them ideal for touring Morocco.' },
    { icon: Plane, title: 'Available at Major Airports', description: 'Pick up your Volkswagen rental conveniently at major airports like Marrakech, Casablanca, and Agadir.' },
    { icon: LifeBuoy, title: 'High Safety Standards', description: 'Drive with peace of mind, thanks to Volkswagen\'s commitment to safety and advanced features.' },
    { icon: Fuel, title: 'Efficient and Powerful Engines', description: 'VW\'s TSI and TDI engines offer a great balance of performance and fuel economy.' },
    { icon: Check, title: 'A Smart and Practical Choice', description: 'A Volkswagen rental offers a premium feel, practicality, and great value for your money.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('volkswagen'));

export default function VolkswagenRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Volkswagen Car Rental in Morocco"
          description="A smart choice for comfort and reliability. Compare prices on popular Volkswagen models like the versatile VW Golf and the spacious VW Passat. The perfect companion for any Moroccan journey."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="volkswagen car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Volkswagen in Morocco?"
                features={volkswagenFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Volkswagen Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/volkswagen"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/volkswagen" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
