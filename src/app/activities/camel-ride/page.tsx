
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
  title: 'Morocco Camel Ride Tours | Marrakech & Agadir | MarHire',
  description: 'Book a classic Morocco camel ride. Find deals on sunset camel trekking in the palm groves of Marrakech or along the beaches of Agadir. An iconic Moroccan experience.',
};

const camelRideFeatures = [
    { icon: UserCheck, title: 'Authentic Experience', description: 'Enjoy a traditional camel ride led by local guides for a truly authentic Moroccan adventure.' },
    { icon: Check, title: 'Stunning Sunset Views', description: 'Our most popular tours take place at sunset, offering breathtaking photo opportunities.' },
    { icon: Bus, title: 'Hotel Pickup Included', description: 'Most of our camel riding tours include convenient hotel pickup and drop-off.' },
    { icon: Star, title: 'Perfect for All Ages', description: 'A gentle camel trek is a fun and memorable activity for the whole family.' },
    { icon: Users, title: 'Traditional Attire Provided', description: 'Get into the spirit by wearing the provided traditional Tuareg dress for fantastic photos.' },
    { icon: XCircle, title: 'Book with Flexibility', description: 'Secure your spot with easy online booking and flexible cancellation options.' },
];

const cities = ["Marrakech", "Agadir"];
const activityListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('camel'));

export default function CamelRidePage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Iconic Camel Rides in Morocco"
          description="Experience one of Morocco's most iconic activities. Embark on a gentle camel trek through the lush Palmeraie of Marrakech or along the beautiful sandy beaches of Agadir. A perfect, relaxing adventure for all ages, especially at sunset."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="camel ride morocco"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Camel Ride with MarHire?"
                features={camelRideFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Camel Riding Experiences by City"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/camel-ride" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
