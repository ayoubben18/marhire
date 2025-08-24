
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
  title: 'Luxury Yacht Charter Tangier | Private Boat Tours | MarHire',
  description: 'Charter a private luxury yacht in Tangier. Find the best deals on crewed yacht rentals from the Tangier Marina for day trips, sunset cruises, or special events.',
};

const yachtFeatures = [
    { icon: UserCheck, title: 'Professional Captain & Crew', description: 'Relax and indulge. All our luxury yacht charters in Tangier include a professional captain and crew.' },
    { icon: Anchor, title: 'Explore the Strait of Gibraltar', description: 'Experience the unique meeting point of the Atlantic and Mediterranean with stunning views of two continents.' },
    { icon: Shield, title: 'Utmost Privacy & Exclusivity', description: 'A private yacht charter from Tangier Marina offers the ultimate exclusive setting for you and your guests.' },
    { icon: Calendar, title: 'Customizable Itineraries', description: 'Work with the captain to create the perfect itinerary, whether it\'s a coastal cruise or anchoring in a secluded bay.' },
    { icon: Sun, title: 'Perfect for Special Occasions', description: 'Celebrate a birthday, anniversary, or corporate event in style on the deck of a luxury yacht in Tangier.' },
    { icon: Tag, title: 'Transparent Charter Pricing', description: 'Our prices clearly outline what is included, from crew to basic fuel, ensuring no surprises for your charter.' },
];

const otherTangierBoatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city === 'Tangier').slice(0,8);

export default function TangierYachtCharterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Yacht Charter Tangier"
          description="Experience the ultimate in luxury with a private yacht charter from Tangier Marina. Explore the stunning Strait of Gibraltar from the comfort of a fully-crewed yacht. Perfect for day trips, sunset cruises, or unforgettable special events."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="luxury yacht tangier"
        >
          <SearchTabs fixedCategory="boats" fixedLocation="tangier" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book a Yacht Charter in Tangier?"
                features={yachtFeatures}
            />
            
            <CategoryBrowseSection
                title="Discover Other Boat Trips in Tangier"
                items={[]}
                listings={otherTangierBoatListings}
                basePath="/search/boats"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/boats/yacht-charters" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
