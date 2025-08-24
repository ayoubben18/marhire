
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
  title: 'Things to Do in Marrakech | Camel Rides, Cooking Classes & Tours | MarHire',
  description: 'Book the best things to do in Marrakech. Find deals on desert quad biking, camel rides in the Palmeraie, and guided city tours. All activities with verified local providers.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Professional & Licensed Guides', description: 'Your safety is our priority. All our Marrakech tours are led by experienced and licensed local guides.' },
    { icon: Check, title: 'All Equipment Included', description: 'We provide all necessary gear for your activity, from quad bikes and helmets to tagines and spices.' },
    { icon: Bus, title: 'Hotel Pickup Included', description: 'Most of our activities and day trips include convenient pickup and drop-off from your hotel or riad in Marrakech.' },
    { icon: Star, title: 'Top-Rated Marrakech Adventures', description: 'We only list the best activities in Marrakech that are highly rated by travelers for fun and quality.' },
    { icon: Users, title: 'Small Group or Private', description: 'Choose from sociable small group tours or personalized private experiences tailored to your interests.' },
    { icon: XCircle, title: 'Flexible Booking', description: 'Book your Marrakech activity with confidence, with easy cancellation options available for most tours.' },
];

const activityTypes = ["Quad Biking", "Camel Ride", "City Tour", "Hot Air Balloon", "Cooking Class"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Marrakech');

export default function ActivitiesMarrakechPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Marrakech"
          description="Get your adrenaline pumping with a quad bike tour in the Agafay desert, experience a magical sunset camel ride, or learn the secrets of Moroccan cuisine in a traditional riad. Your next Marrakech adventure starts here."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="marrakech market spices"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="marrakech" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Marrakech Activities with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Marrakech by Type"
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
