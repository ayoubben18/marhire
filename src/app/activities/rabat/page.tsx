
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
  title: 'Things to Do in Rabat | Guided Tours of Kasbah & Mausoleum | MarHire',
  description: 'Book the best things to do in Rabat. Find deals on guided walking tours of the Kasbah of the Udayas, the Hassan Tower, and the Mausoleum of Mohammed V.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Expert Historical Guides', description: 'Our Rabat guides are experts in the rich history of the capital, from ancient ruins to modern landmarks.' },
    { icon: Check, title: 'Private & In-Depth Tours', description: 'Enjoy a personalized tour that allows you to explore Rabat\'s key sites at your own pace.' },
    { icon: Bus, title: 'Comfortable Sightseeing', description: 'Combine walking tours with private transport to comfortably visit sites across Rabat and Salé.' },
    { icon: Star, title: 'Explore UNESCO World Heritage', description: 'Discover Rabat\'s UNESCO-listed sites with a guide who can bring their stories to life.' },
    { icon: Users, title: 'Ideal for Culture & History Lovers', description: 'Rabat offers a more tranquil, yet deeply historical, experience compared to other imperial cities.' },
    { icon: XCircle, title: 'Book Your Tour with Ease', description: 'Secure your spot on a guided tour of Rabat with simple online booking and flexible options.' },
];

const activityTypes = ["City Tour", "Historical Tour", "Food Tour", "Boat Trip"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Rabat');

export default function ActivitiesRabatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Rabat"
          description="Discover the tranquil elegance of Morocco's capital. Book a guided tour of the stunning Kasbah of the Udayas, marvel at the Hassan Tower, and explore the ancient ruins of Chellah."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="kasbah of the udayas rabat"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="rabat" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Rabat Tours with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Rabat by Type"
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
