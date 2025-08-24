
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
  title: 'Luxury Yacht Charter Casablanca | Private Boat Tours | MarHire',
  description: 'Charter a private luxury yacht in Casablanca. Find the best deals on crewed yacht rentals from the Casablanca Marina for day trips or special events.',
};

const yachtFeatures = [
    { icon: UserCheck, title: 'Professional Captain & Crew', description: 'Relax and indulge. All our luxury yacht charters in Casablanca include a professional captain and crew.' },
    { icon: Anchor, title: 'See the City from the Sea', description: 'Get a unique perspective of the Casablanca skyline and the magnificent Hassan II Mosque from the water.' },
    { icon: Shield, title: 'Utmost Privacy & Exclusivity', description: 'A private yacht charter from Casablanca Marina offers the ultimate exclusive setting for you and your guests.' },
    { icon: Calendar, title: 'Customizable Itineraries', description: 'Work with the captain to create the perfect itinerary, whether it\'s a coastal cruise or anchoring for a swim.' },
    { icon: Sun, title: 'Perfect for Special Occasions', description: 'Celebrate a birthday, anniversary, or corporate event in style on the deck of a luxury yacht in Casablanca.' },
    { icon: Tag, title: 'Transparent Charter Pricing', description: 'Our prices clearly outline what is included, from crew to basic fuel, ensuring no surprises for your charter.' },
];

const otherCasablancaBoatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city === 'Casablanca').slice(0,8);

export default function CasablancaYachtCharterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Yacht Charter Casablanca"
          description="Experience the ultimate in luxury with a private yacht charter from Casablanca Marina. Explore the Atlantic coastline from the comfort of a fully-crewed yacht. Perfect for day trips, business events, or unforgettable special occasions."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="luxury yacht casablanca"
        >
          <SearchTabs fixedCategory="boats" fixedLocation="casablanca" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book a Yacht Charter in Casablanca?"
                features={yachtFeatures}
            />
            
            <CategoryBrowseSection
                title="Discover Other Boat Trips in Casablanca"
                items={[]}
                listings={otherCasablancaBoatListings}
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
