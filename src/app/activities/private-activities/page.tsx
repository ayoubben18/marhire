
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
  title: 'Private Tours & Activities in Morocco | MarHire',
  description: 'Book exclusive private guided tours and activities in Morocco. Enjoy a personalized experience with a private guide for city walks, desert trips, and family adventures.',
};

const privateTourFeatures = [
    { icon: UserCheck, title: 'Your Own Personal Guide', description: 'Enjoy the undivided attention of a professional, licensed guide who can cater the tour to your interests.' },
    { icon: Check, title: 'Flexible & Custom Itineraries', description: 'Have the freedom to adjust the schedule, spend more time where you like, and explore at your own pace.' },
    { icon: Bus, title: 'Private Transportation', description: 'Your tour includes a comfortable, air-conditioned vehicle exclusively for your group.' },
    { icon: Star, title: 'Exclusive Access', description: 'Private tours can sometimes offer access to places or experiences not available to larger groups.' },
    { icon: Users, title: 'Perfect for Families & Groups', description: 'A private tour is ideal for families with children, couples, or groups of friends wanting a more intimate experience.' },
    { icon: XCircle, title: 'Guaranteed Quality & Safety', description: 'We partner with top-rated providers who specialize in high-quality private tours across Morocco.' },
];

const cities = ["Marrakech", "Agadir", "Fes", "Tangier"];
const activityListings = MOCK_LISTINGS.filter(l => l.specs.activityType === 'Private');

export default function PrivateActivitiesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Book Exclusive Private Tours in Morocco"
          description="Discover Morocco your way with a private tour. From personalized walking tours of the Fes medina to a bespoke family adventure in the Atlas Mountains, book an exclusive experience with a dedicated guide and private vehicle."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="private guide explaining something"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="The Benefits of a Private Tour"
                features={privateTourFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Private Tours in Top Moroccan Cities"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/private-activities" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
