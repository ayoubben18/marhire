
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
  title: 'Shared Group Tours & Activities in Morocco | MarHire',
  description: 'Find and book budget-friendly shared group activities across Morocco. Join small group tours for desert trips, city walks, and outdoor adventures in Marrakech, Fes, and Agadir.',
};

const groupTourFeatures = [
    { icon: UserCheck, title: 'Meet Fellow Travelers', description: 'Shared tours are a great way to meet like-minded people from around the world.' },
    { icon: Check, title: 'Budget-Friendly Prices', description: 'Enjoy the best experiences Morocco has to offer at a lower price point by sharing the cost.' },
    { icon: Bus, title: 'Guaranteed Departures', description: 'Many of our popular group tours have guaranteed daily or weekly departures.' },
    { icon: Star, title: 'Top-Rated Itineraries', description: 'We only list the most popular and highly-rated group tours with proven, reliable operators.' },
    { icon: Users, title: 'Small Group Sizes', description: 'Even in a shared tour, we prioritize small group sizes for a more personal and enjoyable experience.' },
    { icon: XCircle, title: 'Easy Online Booking', description: 'Secure your spot on a popular tour instantly with our simple booking process.' },
];

const cities = ["Marrakech", "Agadir", "Fes", "Tangier"];
const activityListings = MOCK_LISTINGS.filter(l => l.specs.activityType === 'Group');

export default function GroupActivitiesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Join a Shared Group Tour in Morocco"
          description="Explore Morocco and meet new people with our selection of small group tours. Perfect for solo travelers and those on a budget, our shared activities include desert trips from Marrakech, guided city tours in Fes, and boat trips in Agadir."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="group of travelers happy"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Shared Group Tour?"
                features={groupTourFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Group Activities in Top Cities"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/group-activities" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
