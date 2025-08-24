
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { CityCarousel } from '@/components/category/city-carousel';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Check, Bus, Star, Users, XCircle } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Things to Do in Morocco | Day Trips, Private & Guided Tours | MarHire',
  description: 'Book unforgettable things to do in Morocco. Find the best deals on desert quad biking, camel rides, and guided city tours. Book private tours and day trips in Marrakech, Agadir, and more.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Official Licensed Guides', description: 'Explore with confidence. All our guided tours are led by certified, knowledgeable local guides.' },
    { icon: Check, title: 'Instant Confirmation', description: 'Book your spot in minutes and receive your activity voucher instantly.' },
    { icon: Bus, title: 'Hotel Pickup Included', description: 'Many of our activities and day trips include convenient pickup and drop-off from your hotel.' },
    { icon: Star, title: 'Highly-Rated Experiences', description: 'We only list top-rated activities that are loved by fellow travelers.' },
    { icon: Users, title: 'Small Group or Private Tours', description: 'Choose between sociable small group tours or intimate private tours.' },
    { icon: XCircle, title: 'Free & Easy Cancellation', description: 'Book with flexibility. Most activities offer free cancellation up to 24 hours in advance.' },
];

const cities = ["Marrakech", "Agadir", "Fes", "Tangier", "Casablanca"];
const activityTypes = ["Quad Biking", "Camel Ride", "City Tour", "Surfing", "Hot Air Balloon", "Cooking Class"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity');

export default function ActivitiesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Find Top Tours & Activities in Morocco"
          description="Discover and book the best activities Morocco has to offer. From thrilling desert day trips and quad bike tours to authentic guided tours in a Marrakech riad, your next adventure starts here."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="hot air balloons morocco"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Guided Tours & Day Trips in Morocco with MarHire?"
                features={activityFeatures}
            />

            <CityCarousel
                title="Find Activities & Things to Do in Top Moroccan Destinations"
                cities={cities}
                basePath="/activities"
            />
            
            <CategoryBrowseSection
                title="Browse Things to Do by City"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />

            <CategoryBrowseSection
                title="Browse by Activity Type"
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
