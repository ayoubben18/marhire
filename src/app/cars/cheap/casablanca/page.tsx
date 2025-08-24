
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
  title: 'Cheap Car Rental Casablanca | Best Deals & No Deposit Options | MarHire',
  description: 'Find the best deals on cheap car rental in Casablanca. Compare prices on economy cars like the Dacia Logan and Renault Clio with no-deposit options. Book your budget Casablanca car hire today.',
};

const cheapCarFeatures = [
    { icon: Shield, title: 'No-Deposit Options Available', description: 'Many of our cheapest cars in Casablanca come with no-deposit options, freeing up your travel budget.' },
    { icon: BarChart, title: 'Excellent Fuel Economy', description: 'Save money on fuel with our selection of efficient petrol and diesel economy cars.' },
    { icon: Plane, title: 'Convenient Airport Pickup', description: 'Collect your cheap rental car directly from Casablanca Mohammed V Airport (CMN).' },
    { icon: LifeBuoy, title: 'Includes Basic Insurance', description: 'All rentals come with the necessary third-party liability insurance for peace of mind.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'Avoid surprises with clear "Same-to-Same" or "Full-to-Full" fuel policies from our partners.' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your cheap Casablanca car rental in minutes with instant confirmation.' },
];

const otherCasablancaCarListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Casablanca').slice(0,8);


export default function CheapCarRentalCasablancaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Cheap Car Rental Casablanca"
          description="Looking for an affordable way to explore Casablanca and its surroundings? Compare our best prices on economy car rentals. Find great deals on reliable and fuel-efficient cars like the Renault Clio and Dacia Logan, with no-deposit options available."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="dacia logan car casablanca"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="casablanca" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Economy Car in Casablanca?"
                features={cheapCarFeatures}
            />
            
            <CategoryBrowseSection
                title="Explore More Car Hire in Casablanca"
                items={[]}
                listings={otherCasablancaCarListings}
                basePath="/search/cars"
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
