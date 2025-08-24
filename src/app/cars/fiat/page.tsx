
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
  title: 'Fiat Car Rental Morocco | Hire Fiat 500 & More | MarHire',
  description: 'Rent a Fiat in Morocco. Find the best deals on the stylish and fun Fiat 500, perfect for navigating the vibrant city streets of Marrakech, Casablanca, and Agadir.',
};

const fiatFeatures = [
    { icon: Shield, title: 'Perfect for City Driving', description: 'The compact size of cars like the Fiat 500 makes them ideal for navigating narrow medina streets and finding parking.' },
    { icon: BarChart, title: 'Iconic Italian Style', description: 'Travel with flair. Fiat\'s distinctive and chic designs add a touch of fun to your Moroccan adventure.' },
    { icon: Plane, title: 'Easy Airport & City Pickup', description: 'Fiat models are widely available for convenient pickup at major airports and city centers across Morocco.' },
    { icon: LifeBuoy, title: 'Excellent Fuel Economy', description: 'Fiat\'s efficient engines are perfect for budget-conscious travelers, helping you save on fuel costs.' },
    { icon: Fuel, title: 'Fun to Drive', description: 'Enjoy a nimble and responsive driving experience that makes exploring Morocco\'s cities and coastal roads a joy.' },
    { icon: Check, title: 'Affordable Rental Options', description: 'Fiat rentals offer a fantastic combination of style, practicality, and affordability.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('fiat'));

export default function FiatRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Fiat Car Rental in Morocco"
          description="Add a dash of Italian style to your Moroccan holiday. Compare prices on fun and economical Fiat models, including the iconic Fiat 500. The perfect, agile choice for zipping through bustling city streets and exploring coastal towns."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="fiat 500 car"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Fiat in Morocco?"
                features={fiatFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Fiat Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/fiat"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/fiat" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
