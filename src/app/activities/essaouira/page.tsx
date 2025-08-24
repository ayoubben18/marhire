
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
  title: 'Things to Do in Essaouira | Horse Riding, Quad Biking & Surfing | MarHire',
  description: 'Book the best things to do in Essaouira. Find deals on horse riding on the beach, quad biking in the dunes, and surfing lessons. All activities with verified local providers.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Experienced Local Instructors', description: 'Our Essaouira partners are certified professionals in surfing, horse riding, and quad biking.' },
    { icon: Check, title: 'All Equipment Included', description: 'We provide all necessary gear for your activity, from surfboards and wetsuits to horses and helmets.' },
    { icon: Bus, title: 'Beach & Dune Adventures', description: 'Experience the unique landscapes around Essaouira, from its vast beaches to the sandy dunes.' },
    { icon: Star, title: 'Top-Rated Coastal Activities', description: 'We only list the best activities in Essaouira, highly rated by travelers for fun and safety.' },
    { icon: Users, title: 'Suitable for All Levels', description: 'Whether you\'re a beginner or an expert, we have an experience tailored to your skill level.' },
    { icon: XCircle, title: 'Flexible Booking', description: 'Book your Essaouira activity with confidence, with easy cancellation options available for most tours.' },
];

const activityTypes = ["Horse Riding", "Quad Biking", "Surfing", "Camel Ride"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Essaouira');

export default function ActivitiesEssaouiraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Essaouira"
          description="Feel the wind in your hair with an unforgettable adventure in Essaouira. Book a stunning horse ride along the beach, a thrilling quad bike tour in the dunes, or a surfing lesson in the Atlantic waves."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="horse riding essaouira beach"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="essaouira" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Essaouira Activities with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Essaouira by Type"
                items={activityTypes}
                listings={activityListings}
                basePath="/search/activities"
                filterType='activityType'
                paramName='activityType'
            />
            
            <div className="container">
                <PopularDestinations />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
