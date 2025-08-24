
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
  title: 'Skoda Car Rental Morocco | Hire Octavia & More | MarHire',
  description: 'Rent a Skoda in Morocco. Find great prices on the spacious and reliable Skoda Octavia, an excellent choice for comfortable family and business travel in Casablanca and beyond.',
};

const skodaFeatures = [
    { icon: Shield, title: 'Exceptional Space & Practicality', description: 'Skoda cars are renowned for their cavernous boots and generous interior space, perfect for luggage and passengers.' },
    { icon: BarChart, title: 'Comfortable & Relaxing Drive', description: 'Enjoy a smooth and quiet ride, making long journeys between Moroccan cities effortless.' },
    { icon: Plane, title: 'Smart Features', description: 'Benefit from clever features and thoughtful design touches that make your rental experience easier.' },
    { icon: LifeBuoy, title: 'Reliable and Well-Engineered', description: 'Built with Volkswagen Group technology, Skodas are known for their reliability and solid build quality.' },
    { icon: Fuel, title: 'Great Fuel Efficiency', description: 'Skoda\'s efficient engines, particularly the diesels, offer excellent mileage, saving you money on fuel.' },
    { icon: Check, title: 'Superb Value for Money', description: 'Skoda offers a near-premium experience and incredible space for a very competitive rental price.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('skoda'));

export default function SkodaRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Skoda Car Rental in Morocco"
          description="The smart choice for space and comfort. Compare deals on the incredibly practical Skoda Octavia, offering ample room for passengers and luggage. Ideal for family holidays and business travel."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="skoda car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Skoda in Morocco?"
                features={skodaFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Skoda Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/skoda"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/skoda" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
