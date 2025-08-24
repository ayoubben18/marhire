
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
  title: 'Luxury Yacht Charter Morocco | Agadir, Casablanca & Tangier | MarHire',
  description: 'Charter a private luxury yacht in Morocco. Find the best deals on crewed yacht rentals in Agadir, Casablanca and Tangier for day trips, sunset cruises, or special events.',
};

const yachtFeatures = [
    { icon: UserCheck, title: 'Professional Captain & Crew', description: 'Relax and indulge. All our luxury yacht charters include a professional captain and crew to cater to your every need.' },
    { icon: Anchor, title: 'Gourmet Onboard Options', description: 'Enhance your experience with optional private chefs, gourmet catering, and premium beverage packages.' },
    { icon: Shield, title: 'Utmost Privacy & Exclusivity', description: 'A private yacht charter offers the ultimate exclusive setting for you and your guests.' },
    { icon: Calendar, title: 'Customizable Itineraries', description: 'Work with the captain to create the perfect itinerary, whether it\'s exploring the coast or anchoring in a secluded bay.' },
    { icon: Sun, title: 'Perfect for Special Occasions', description: 'Celebrate a birthday, anniversary, or corporate event in style on the deck of a luxury yacht.' },
    { icon: Tag, title: 'Transparent Charter Pricing', description: 'Our prices clearly outline what is included, from crew to basic fuel allowances, ensuring no surprises.' },
];

const cities = ["Agadir", "Tangier", "Casablanca"];
const boatListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('yacht'));

export default function YachtCharterPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Charter a Private Luxury Yacht in Morocco"
          description="Experience the ultimate in luxury and exclusivity with a private yacht charter. Explore Morocco's stunning coastline from the comfort of a fully-crewed yacht. Perfect for day trips, sunset cruises, or unforgettable special events in Agadir, Tangier, and more."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="luxury yacht on ocean"
        >
          <SearchTabs fixedCategory="boats" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Charter a Yacht with MarHire?"
                features={yachtFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Luxury Yacht Charters by City"
                items={cities}
                listings={boatListings}
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
