
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
  title: 'Cheap Car Rental Morocco | Best Deals & No Deposit Options | MarHire',
  description: 'Find the best deals on cheap car rental in Morocco. Compare prices on economy cars like the Dacia Logan and Renault Clio with no-deposit options in Marrakech, Agadir, and Casablanca.',
};

const cheapCarFeatures = [
    { icon: Shield, title: 'No-Deposit Options', description: 'Free up your travel budget. Many of our cheapest cars are available with no security deposit required.' },
    { icon: BarChart, title: 'Excellent Fuel Economy', description: 'Save money at the pump with our selection of efficient petrol and diesel economy cars like the Renault Clio.' },
    { icon: Plane, title: 'Convenient Airport Pickup', description: 'Collect your budget rental car directly from the airport in Marrakech, Agadir, and more.' },
    { icon: LifeBuoy, title: 'Includes Basic Insurance', description: 'Every rental comes with the necessary third-party liability insurance for your peace of mind on the road.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'Avoid surprises with clear "Same-to-Same" or "Full-to-Full" fuel policies from our local partners.' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your cheap car rental in minutes with instant confirmation.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
// Filter for all cheap cars once, then reuse it
const cheapCarListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.price.perDay < 40);

export default function CheapCarRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Find the Best Cheap Car Rental Deals in Morocco"
          description="Looking for an affordable way to explore Morocco? Compare prices on our most popular economy cars. Find great deals on reliable vehicles like the Renault Clio and Dacia Logan, with no-deposit options available."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="dacia logan car morocco"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Economy Car with MarHire?"
                features={cheapCarFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Cheap Car Rentals by City"
                items={cities}
                listings={cheapCarListings} // Use the pre-filtered cheap listings
                basePath="/cars/cheap"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/cheap" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
