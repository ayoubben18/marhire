
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Check, Bus, Star, Users, XCircle } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';

export const metadata: Metadata = {
  title: 'Horse Riding Morocco | Beach & Mountain Treks | MarHire',
  description: 'Book unforgettable horse riding tours in Morocco. Find guided horseback adventures along the beaches of Agadir and Essaouira or through the scenic foothills of the Atlas Mountains.',
};

const horseRidingFeatures = [
    { icon: UserCheck, title: 'Experienced Equestrian Guides', description: 'Our tours are led by professional guides who ensure your safety and match you with a horse suited to your level.' },
    { icon: Check, title: 'Well-Cared-For Horses', description: 'We partner with reputable stables that prioritize the health and well-being of their horses.' },
    { icon: Bus, title: 'Stunning Natural Scenery', description: 'Explore Morocco\'s most beautiful landscapes, from vast beaches to tranquil forests and mountain trails.' },
    { icon: Star, title: 'Suitable for All Levels', description: 'Whether you\'re a complete beginner or an experienced rider, we have a horseback tour for you.' },
    { icon: Users, title: 'Private or Group Rides', description: 'Choose an intimate private ride for a personalized experience or join a small group to meet other riders.' },
    { icon: XCircle, title: 'All Equipment Provided', description: 'Helmets and all necessary riding gear are included for a safe and comfortable experience.' },
];

const cities = ["Agadir", "Essaouira", "Marrakech"];
const activityListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('horse'));

export default function HorseRidingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Horse Riding Adventures in Morocco"
          description="Discover the beauty of Morocco from a different perspective. Book a guided horseback ride along the stunning Atlantic coast near Agadir and Essaouira, or explore the picturesque trails of the Atlas Mountain foothills. An unforgettable experience for riders of all levels."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="horse riding on beach"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Horse Riding Tour with MarHire?"
                features={horseRidingFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Horse Riding Experiences by Location"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/horse-ride" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
