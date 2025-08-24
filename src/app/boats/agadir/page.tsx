
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
  title: 'Agadir Boat Rentals & Yacht Charters | Private Tours | MarHire',
  description: 'Book private boat rentals, luxury yacht charters, and sunset cruises in Agadir. Compare prices for boat tours and fishing trips from the Agadir Marina with verified local operators.',
};

const boatFeatures = [
    { icon: UserCheck, title: 'Verified Local Operators', description: 'All boat trips from Agadir are offered by licensed and experienced maritime professionals.' },
    { icon: Anchor, title: 'Captain & Crew Included', description: 'Relax and enjoy the view. All our boat rentals include a professional captain and crew.' },
    { icon: Shield, title: 'Safety First', description: 'Every vessel is equipped with all necessary safety gear, including life jackets for all passengers.' },
    { icon: Calendar, title: 'Flexible Booking', description: 'Book by the hour, for a half-day, or a full-day adventure for your private boat tour.' },
    { icon: Sun, title: 'Bad Weather Guarantee', description: 'If your trip is cancelled by the captain due to weather, we offer a free reschedule or a full refund.' },
    { icon: Tag, title: 'Transparent Pricing', description: 'The price you see includes fuel for standard trips and all port fees. No hidden costs for your boat tour.' },
];

const boatTypes = ["Luxury Yacht", "Speedboat", "Fishing Boat", "Catamaran", "Jet Ski"];

const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city === 'Agadir');

export default function BoatRentalAgadirPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Boat Rentals in Agadir"
          description="From luxury yacht charters from the marina to private sunset cruises and fishing trips, discover Agadir's coastline. Book an unforgettable experience with verified local operators."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="yacht in agadir marina"
        >
          <SearchTabs fixedCategory="boats" fixedLocation="agadir" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Boat Rental in Agadir with MarHire?"
                features={boatFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Boat Rentals by Type in Agadir"
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
