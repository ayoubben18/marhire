
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
  title: 'Luxury Car Rental Morocco | Hire BMW, Mercedes, Audi | MarHire',
  description: 'Experience Morocco in style with a luxury car rental. Compare prices on premium vehicles like BMW, Mercedes-Benz, and Audi. Available in Marrakech, Casablanca, and Agadir.',
};

const luxuryCarFeatures = [
    { icon: Shield, title: 'Premium Vehicle Fleet', description: 'Choose from a curated selection of high-end vehicles from prestigious brands like BMW, Mercedes, and Audi.' },
    { icon: BarChart, title: 'Unmatched Comfort & Style', description: 'Travel in ultimate comfort with premium interiors, advanced features, and powerful performance.' },
    { icon: Plane, title: 'VIP Airport Meet & Greet', description: 'Enjoy a seamless airport pickup experience with our VIP meet and greet service.' },
    { icon: LifeBuoy, title: 'Dedicated Support', description: 'Receive priority support and assistance throughout your luxury rental period.' },
    { icon: Fuel, title: 'Perfect for Special Occasions', description: 'Make a statement at a wedding, business event, or simply treat yourself to a superior driving experience.' },
    { icon: Check, title: 'Guaranteed Model Availability', description: 'When you book a luxury car with us, you are guaranteed to receive the specified model or a better one.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.price.perDay > 80);

export default function LuxuryCarRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Luxury Car Rental in Morocco"
          description="Elevate your Moroccan journey with a premium vehicle. We offer an exclusive selection of luxury cars from top brands like Mercedes-Benz, BMW, and Audi. Perfect for business travel, special occasions, or simply enjoying the road in style."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="mercedes benz driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="The MarHire Luxury Experience"
                features={luxuryCarFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Luxury Car Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/luxury"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/luxury" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
