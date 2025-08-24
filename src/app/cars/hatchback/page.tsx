
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
  title: 'Hatchback Car Rental Morocco | Hire Clio, Peugeot 208 | MarHire',
  description: 'Find the best deals on hatchback car rentals in Morocco. Compare prices on popular and fuel-efficient models like the Renault Clio and Peugeot 208 in Marrakech, Agadir, and more.',
};

const hatchbackFeatures = [
    { icon: Shield, title: 'Perfect for City Navigation', description: 'The compact size and agility of a hatchback make it easy to drive and park in bustling Moroccan cities.' },
    { icon: BarChart, title: 'Excellent Fuel Economy', description: 'Hatchbacks are among the most fuel-efficient cars, helping you save money on your Moroccan road trip.' },
    { icon: Plane, title: 'Convenient Airport Pickup', description: 'Hatchbacks are widely available for immediate pickup at all major Moroccan airports.' },
    { icon: LifeBuoy, title: 'Versatile for Couples & Small Families', description: 'With seating for up to 5 and flexible luggage space, hatchbacks are great all-rounders.' },
    { icon: Fuel, title: 'Affordable Rental Rates', description: 'Renting a hatchback is one of the most budget-friendly ways to explore Morocco independently.' },
    { icon: Check, title: 'Easy to Drive', description: 'Their straightforward handling makes hatchbacks a comfortable and stress-free choice for most drivers.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => ['Renault Clio', 'Peugeot 208', 'Hyundai i10', 'Kia Picanto', 'Fiat 500'].includes(l.name));

export default function HatchbackRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Hatchback Car Rental in Morocco"
          description="The smart choice for exploring Morocco. Rent a versatile and fuel-efficient hatchback like the Renault Clio or Peugeot 208. Perfect for city driving, coastal roads, and budget-conscious travelers, with deals available across the country."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="peugeot 208 car"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Hatchback for Your Morocco Trip?"
                features={hatchbackFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Hatchback Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/hatchback"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/hatchback" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
