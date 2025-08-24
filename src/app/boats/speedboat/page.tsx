
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
  title: 'Speedboat Rental Morocco | Agadir & Tangier | MarHire',
  description: 'Book a thrilling speedboat adventure in Morocco. Find the best prices on private speedboat rentals and tours in Agadir and Tangier for a fast and fun day on the water.',
};

const speedboatFeatures = [
    { icon: UserCheck, title: 'Experienced Skippers', description: 'Our speedboat rentals come with licensed and experienced skippers to ensure your safety.' },
    { icon: Anchor, title: 'Explore Secluded Coves', description: 'A speedboat allows you to quickly reach beautiful, secluded beaches and coves that are inaccessible by land.' },
    { icon: Shield, title: 'Full Safety Equipment', description: 'Every boat is equipped with life jackets and all necessary safety gear for a worry-free trip.' },
    { icon: Calendar, title: 'Book by the Hour', description: 'Enjoy maximum flexibility by renting a speedboat for just an hour or for a full-day adventure.' },
    { icon: Sun, title: 'Perfect for Water Sports', description: 'Many of our speedboat charters include options for water skiing, wakeboarding, or inflatable toys.' },
    { icon: Tag, title: 'Best Price Guaranteed', description: 'We work with verified local operators to offer you the best possible prices on speedboat rentals.' },
];

const cities = ["Agadir", "Tangier", "Marrakech"];
const boatListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('speedboat') || l.name.toLowerCase().includes('jet ski'));

export default function SpeedboatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Rent a Private Speedboat in Morocco"
          description="Experience the thrill of the open water with a private speedboat rental. Perfect for exploring the coastline, water sports, or a quick trip to a secluded beach, book your speedboat adventure in Agadir, Tangier, or Marrakech's Lalla Takerkoust lake."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="speedboat on water"
        >
          <SearchTabs fixedCategory="boats" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Speedboat with MarHire?"
                features={speedboatFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Speedboat Rentals by Location"
                items={cities}
                listings={boatListings}
                basePath="/search/boats"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/boats/speedboat" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
