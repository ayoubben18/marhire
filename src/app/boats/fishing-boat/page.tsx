
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
  title: 'Fishing Trips & Charters in Morocco | Agadir & Casablanca | MarHire',
  description: 'Book a private fishing boat charter in Morocco. Find the best deep-sea and coastal fishing trips in Agadir and Casablanca with experienced local captains and all gear included.',
};

const fishingFeatures = [
    { icon: UserCheck, title: 'Experienced Local Captains', description: 'Our charters are led by seasoned captains who know the best local fishing spots to maximize your chances of a great catch.' },
    { icon: Anchor, title: 'All Fishing Gear Included', description: 'Just bring your enthusiasm! We provide all the necessary rods, reels, bait, and tackle for your fishing adventure.' },
    { icon: Shield, title: 'Safety as a Priority', description: 'Our boats are fully equipped with safety gear, and our crews are trained to ensure a safe and enjoyable trip for everyone.' },
    { icon: Calendar, title: 'Half-Day & Full-Day Trips', description: 'Choose from a variety of trip lengths to suit your schedule, from a quick morning session to a full day on the water.' },
    { icon: Sun, title: 'For All Skill Levels', description: 'Whether you\'re a seasoned angler or a complete novice, our crew will provide assistance and guidance to make your trip a success.' },
    { icon: Tag, title: 'Private Charter Experience', description: 'Enjoy the boat all to yourselves. Our private charters are perfect for groups of friends, families, or corporate outings.' },
];

const cities = ["Agadir", "Casablanca"];
const boatListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('fishing'));

export default function FishingBoatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Book a Fishing Trip in Morocco"
          description="Cast a line in the rich waters of the Atlantic. Book a private fishing boat charter for an exciting day of deep-sea or coastal fishing. Our experienced captains in Agadir and Casablanca provide all the gear and expertise for a memorable adventure."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="fishing boat on ocean"
        >
          <SearchTabs fixedCategory="boats" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Fishing Charter with MarHire?"
                features={fishingFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Fishing Trips by City"
                items={cities}
                listings={boatListings}
                basePath="/search/boats"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/boats/fishing-boat" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
