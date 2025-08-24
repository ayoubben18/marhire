
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
  title: 'Things to Do in Tangier | City Tours, Asilah & Hercules Cave | MarHire',
  description: 'Book the best things to do in Tangier. Find deals on guided city tours, day trips to the artistic town of Asilah, and visits to the legendary Hercules Cave.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Knowledgeable Local Guides', description: 'Our Tangier guides are passionate about their city\'s unique history and multicultural influences.' },
    { icon: Check, title: 'Private & Customizable Tours', description: 'Most of our tours can be privatized, allowing you to tailor the itinerary to your interests and pace.' },
    { icon: Bus, title: 'Comfortable Day Trips', description: 'Travel in comfort to nearby gems like the white-washed town of Asilah or the blue city of Chefchaouen.' },
    { icon: Star, title: 'Explore Iconic Landmarks', description: 'Visit legendary sites like the Kasbah, the American Legation, and the Caves of Hercules with an expert.' },
    { icon: Users, title: 'For History Buffs & Art Lovers', description: 'Tangier has a rich artistic and literary history, which our specialized tours bring to life.' },
    { icon: XCircle, title: 'Book with Flexibility', description: 'Secure your Tangier tour with confidence, with easy cancellation options available for most activities.' },
];

const activityTypes = ["City Tour", "Day Trip", "Food Tour", "Boat Tour"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Tangier');

export default function ActivitiesTangierPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Tangier"
          description="Discover the gateway between Europe and Africa. Book a guided tour of the historic Kasbah, take a day trip to the charming artist town of Asilah, or stand at Cap Spartel where the oceans meet."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="tangier kasbah view"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="tangier" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Tangier Activities with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Tangier by Type"
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
