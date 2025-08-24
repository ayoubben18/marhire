
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
  title: 'Quad Biking Agadir | Guided Desert Dune Tours | MarHire',
  description: 'Book a thrilling quad biking adventure in Agadir. Find the best deals on guided quad tours in the sandy dunes near Agadir for an unforgettable desert experience.',
};

const quadBikingFeatures = [
    { icon: UserCheck, title: 'Professional & Certified Guides', description: 'Your safety is our priority. All our Agadir quad tours are led by experienced guides.' },
    { icon: Check, title: 'All Equipment Included', description: 'We provide you with a well-maintained quad bike, helmet, and all necessary safety gear.' },
    { icon: Bus, title: 'Hotel Pickup Included', description: 'Most of our quad biking experiences include convenient pickup and drop-off from your hotel in Agadir.' },
    { icon: Star, title: 'Top-Rated Quad Adventures', description: 'We only list the best quad biking tours that are highly rated by travelers for fun and safety.' },
    { icon: Users, title: 'Suitable for All Levels', description: 'Whether you\'re a beginner or an experienced rider, our guides will tailor the experience to your level.' },
    { icon: XCircle, title: 'Flexible Booking', description: 'Book your Agadir quad tour with confidence, with easy cancellation options available for most tours.' },
];

const otherAgadirActivityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Agadir').slice(0,8);

export default function AgadirQuadBikingPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Quad Biking Agadir"
          description="Get your adrenaline pumping with a guided quad bike tour through Agadir's stunning sand dunes. Ride across the pre-Saharan landscape for an unforgettable adventure. Perfect for all skill levels."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="quad biking in agadir desert"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="agadir" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Quad Biking Tour in Agadir?"
                features={quadBikingFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Other Activities in Agadir"
                items={[]}
                listings={otherAgadirActivityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/quad-biking"/>
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
