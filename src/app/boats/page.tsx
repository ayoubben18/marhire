
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { CityCarousel } from '@/components/category/city-carousel';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Anchor, Shield, Calendar, Sun, Tag } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Boat Rental Morocco & Yacht Charters | Agadir, Tangier | MarHire',
  description: 'Book private boat tours, yacht charters, and fishing trips in Morocco. Compare prices for sunset cruises and luxury yachts in Agadir, Marrakech (Lalla Takerkoust), Tangier, and more.',
};

const boatFeatures = [
    { icon: UserCheck, title: 'Verified Local Operators', description: 'All boat trips are offered by licensed and experienced maritime professionals.' },
    { icon: Anchor, title: 'Captain & Crew Included', description: 'Relax and enjoy the view. Most of our boat rentals include a professional captain and crew.' },
    { icon: Shield, title: 'Safety First', description: 'Every vessel is equipped with all necessary safety gear, including life jackets for all passengers.' },
    { icon: Calendar, title: 'Flexible Booking', description: 'Book by the hour for a half-day, or a full-day adventure on the water for your private boat tour.' },
    { icon: Sun, title: 'Bad Weather Guarantee', description: 'If your trip is cancelled by the captain due to weather, we offer a free reschedule or a full refund.' },
    { icon: Tag, title: 'Transparent Pricing', description: 'The price you see includes fuel for standard trips and all port fees. No hidden costs for your yacht charter.' },
];

const cities = ["Agadir", "Tangier", "Marrakech", "Casablanca"];
const boatTypes = ["Luxury Yacht", "Speedboat", "Fishing Boat", "Catamaran", "Jet Ski"];

const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat');

export default function BoatRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Boat Rentals & Yacht Charters in Morocco"
          description="From thrilling jet ski rides in Agadir to luxury yacht charters in Tangier, discover Morocco's stunning coastline and lakes. Book an unforgettable fishing trip, sunset cruise, or private boat tour."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="yacht on the ocean"
        >
          <SearchTabs fixedCategory="boats" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Boat Rental in Morocco with MarHire?"
                features={boatFeatures}
            />

             <CityCarousel
                title="Find Boat Rentals in Coastal Cities"
                cities={cities}
                basePath="/boats"
            />
            
            <CategoryBrowseSection
                title="Boat, Yacht & Fishing Trip Rentals by Type"
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
