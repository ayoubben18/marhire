
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
  title: 'Renault Car Rental Morocco | Hire Clio & Megane | MarHire',
  description: 'Rent a Renault in Morocco. Find the best prices on the fuel-efficient Renault Clio and the comfortable Renault Megane. A popular and reliable choice for your Morocco travels.',
};

const renaultFeatures = [
    { icon: Shield, title: 'Proven Reliability', description: 'Renault cars like the Clio and Megane are known for their reliability and are well-suited to Moroccan driving conditions.' },
    { icon: BarChart, title: 'Modern & Comfortable', description: 'Enjoy a comfortable ride with modern features, including A/C and up-to-date entertainment systems.' },
    { icon: Plane, title: 'Easy Airport Pickup', description: 'Renault models are widely available for pickup at all major Moroccan airports.' },
    { icon: LifeBuoy, title: 'Great All-Rounders', description: 'Perfect for city driving, long-distance road trips, and everything in between.' },
    { icon: Fuel, title: 'Fuel-Efficient Engines', description: 'Benefit from low fuel consumption with Renault\'s efficient engine technology, saving you money on your trip.' },
    { icon: Check, title: 'Book with Confidence', description: 'Compare prices from verified local agencies and book your Renault rental instantly online.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('renault'));

export default function RenaultRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Renault Car Rental in Morocco"
          description="Find the best deals on Renault rentals across Morocco. We offer popular models like the agile Renault Clio and the comfortable Renault Megane. A perfect, reliable choice for your city exploration or cross-country road trip."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="renault clio driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Renault in Morocco?"
                features={renaultFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Renault Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/renault"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/renault" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
