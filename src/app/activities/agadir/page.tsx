
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
  title: 'Things to Do in Agadir | Quad Biking, Surfing & Tours | MarHire',
  description: 'Book the best things to do in Agadir. Find deals on quad biking in the desert, surfing in Taghazout, and guided tours to Paradise Valley. All activities with verified local providers.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Professional & Certified Guides', description: 'Your safety is our priority. All our tours are led by experienced and licensed local guides.' },
    { icon: Check, title: 'All Equipment Included', description: 'We provide all necessary gear for your activity, from quad bikes and helmets to surfboards and wetsuits.' },
    { icon: Bus, title: 'Hotel Pickup Included', description: 'Most of our activities and day trips include convenient pickup and drop-off from your hotel in Agadir.' },
    { icon: Star, title: 'Top-Rated Agadir Adventures', description: 'We only list the best activities in Agadir that are highly rated by travelers for fun and safety.' },
    { icon: Users, title: 'Suitable for All Levels', description: 'Whether you\'re a beginner or an expert, we have an experience tailored to your skill level.' },
    { icon: XCircle, title: 'Flexible Booking', description: 'Book your Agadir activity with confidence, with easy cancellation options available for most tours.' },
];

const activityTypes = ["Quad Biking", "Camel Ride", "City Tour", "Surfing", "Paradise Valley", "Sandboarding"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Agadir');

export default function ActivitiesAgadirPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Agadir"
          description="Get your adrenaline pumping with a quad bike tour in the pre-Saharan dunes, learn to surf in world-famous Taghazout, or take a relaxing day trip to Paradise Valley. Your next Agadir adventure starts here."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="quad biking in agadir desert"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="agadir" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Agadir Activities with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Agadir by Type"
                items={activityTypes}
                listings={activityListings}
                basePath="/search/activities"
                filterType='activityType'
                paramName='activityType'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
