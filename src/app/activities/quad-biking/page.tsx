
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
  title: 'Quad Biking Morocco | Agafay Desert & Agadir Dunes | MarHire',
  description: 'Book thrilling quad biking adventures in Morocco. Find the best deals on guided quad tours in the Agafay desert near Marrakech or the sandy dunes of Agadir.',
};

const quadBikingFeatures = [
    { icon: UserCheck, title: 'Professional & Certified Guides', description: 'Your safety is our priority. All our quad tours are led by experienced guides.' },
    { icon: Check, title: 'All Equipment Included', description: 'We provide you with a well-maintained quad bike, helmet, and all necessary safety gear.' },
    { icon: Bus, title: 'Hotel Pickup Available', description: 'Many of our quad biking experiences include convenient pickup and drop-off from your hotel.' },
    { icon: Star, title: 'Top-Rated Quad Adventures', description: 'We only list the best quad biking tours that are highly rated by travelers.' },
    { icon: Users, title: 'Suitable for All Levels', description: 'Whether you\'re a beginner or an experienced rider, our guides will tailor the experience to your level.' },
    { icon: XCircle, title: 'Flexible Booking', description: 'Book your quad tour with confidence, with easy cancellation options available.' },
];

const cities = ["Marrakech", "Agadir"];
const activityListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('quad'));

export default function QuadBikingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Morocco Quad Biking Adventures"
          description="Get your adrenaline pumping with a guided quad bike tour through Morocco's stunning landscapes. Explore the rocky Agafay desert from Marrakech or ride across the epic sand dunes near Agadir for an unforgettable adventure."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="quad biking desert"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Quad Biking Tour with MarHire?"
                features={quadBikingFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Quad Biking Experiences by City"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/quad-biking" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
