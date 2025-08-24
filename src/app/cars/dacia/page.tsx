
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
  title: 'Dacia Car Rental Morocco | Hire Duster & Logan | MarHire',
  description: 'Rent a Dacia in Morocco. Find the best prices on the popular Dacia Duster SUV and Dacia Logan sedan. Reliable, spacious, and perfect for Moroccan roads. Book online today.',
};

const daciaFeatures = [
    { icon: Shield, title: 'Reliable and Robust', description: 'Dacia vehicles like the Duster and Logan are known for their reliability and ability to handle Moroccan roads.' },
    { icon: BarChart, title: 'Spacious and Practical', description: 'Enjoy ample space for passengers and luggage, making them perfect for families and road trips.' },
    { icon: Plane, title: 'Available at Major Airports', description: 'Pick up your Dacia rental directly from the airport in Marrakech, Agadir, Casablanca, and more.' },
    { icon: LifeBuoy, title: 'Excellent Value for Money', description: 'Dacia offers a fantastic combination of space, comfort, and affordability for your Morocco trip.' },
    { icon: Fuel, title: 'Efficient Diesel Engines', description: 'Most of our Dacia models are equipped with fuel-efficient diesel engines to help you save on fuel costs.' },
    { icon: Check, title: 'No-Deposit Options', description: 'We offer no-deposit rental options on many of our Dacia vehicles for a hassle-free experience.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('dacia'));

export default function DaciaRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Dacia Car Rental in Morocco"
          description="Rent the perfect vehicle for your Moroccan adventure. We offer the best prices on popular Dacia models, including the spacious Dacia Duster SUV and the reliable Dacia Logan sedan. Ideal for families, road trips, and exploring the diverse terrain of Morocco."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="dacia duster morocco"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Dacia for Your Moroccan Road Trip?"
                features={daciaFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Dacia Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/dacia"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/dacia" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
