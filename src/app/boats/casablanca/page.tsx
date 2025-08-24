
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Anchor, Shield, Calendar, Sun, Tag } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Casablanca Boat Rentals & Fishing Charters | MarHire',
  description: 'Book private boat rentals and fishing trips in Casablanca. Compare prices for boat tours and fishing charters from the Casablanca Marina with verified local operators.',
};

const boatFeatures = [
    { icon: UserCheck, title: 'Verified Local Operators', description: 'All boat trips from Casablanca are offered by licensed and experienced maritime professionals.' },
    { icon: Anchor, title: 'Experienced Captains', description: 'Relax and enjoy the view. Our boat rentals include a professional captain and crew.' },
    { icon: Shield, title: 'Safety First', description: 'Every vessel is equipped with all necessary safety gear, including life jackets for all passengers.' },
    { icon: Calendar, title: 'Flexible Booking', description: 'Book a half-day or full-day fishing trip or coastal tour.' },
    { icon: Sun, title: 'Weather Guarantee', description: 'If your trip is cancelled by the captain due to weather, we offer a free reschedule or a full refund.' },
    { icon: Tag, title: 'Transparent Pricing', description: 'The price you see includes fuel for standard trips and all port fees. No hidden costs.' },
];

const boatTypes = ["Fishing Boat", "Speedboat", "Luxury Yacht"];

const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city === 'Casablanca');

export default function BoatRentalCasablancaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Boat & Fishing Trips in Casablanca"
          description="Experience Casablanca from the Atlantic. Book a private fishing charter or a relaxing boat tour to see the city skyline and the magnificent Hassan II Mosque from the water."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="casablanca coastline boat"
        >
          <SearchTabs fixedCategory="boats" fixedLocation="casablanca" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Boat Trip in Casablanca with MarHire?"
                features={boatFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Boat Rentals by Type in Casablanca"
                items={boatTypes}
                listings={boatListings}
                basePath="/search/boats"
                filterType='boatType'
                paramName='boatType'
            />
            
            <div className="container">
                <PopularDestinations basePath="/boats" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
