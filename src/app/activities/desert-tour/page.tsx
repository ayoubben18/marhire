
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
  title: 'Morocco Desert Tours | Sahara Trips from Marrakech & Fes | MarHire',
  description: 'Book the best Morocco desert tours. Find deals on shared and private Sahara trips from Marrakech or Fes to Merzouga and Zagora. Camel trekking and luxury desert camps.',
};

const desertTourFeatures = [
    { icon: UserCheck, title: 'Experienced Local Guides', description: 'Our desert tours are led by knowledgeable local guides who ensure your safety and provide rich cultural insights.' },
    { icon: Check, title: 'Verified Desert Camps', description: 'We partner with trusted operators offering comfortable and authentic Sahara desert camps, from standard to luxury.' },
    { icon: Bus, title: 'Comfortable Transportation', description: 'Travel to the desert in modern, air-conditioned vehicles with professional drivers for a smooth journey.' },
    { icon: Star, title: 'All-Inclusive Packages', description: 'Most of our desert tours include transportation, accommodation, meals (dinners and breakfasts), and camel trekking.' },
    { icon: Users, title: 'Shared or Private Tours', description: 'Choose a budget-friendly shared tour to meet other travelers or a private tour for a fully customized experience.' },
    { icon: XCircle, title: 'Flexible Itineraries', description: 'Find a range of itineraries, from 2-day trips to Zagora to 3 or 4-day immersive tours of the Merzouga dunes.' },
];

const cities = ["Marrakech", "Fes", "Ouarzazate"];
const activityListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('desert'));

export default function DesertToursPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Book Unforgettable Morocco Desert Tours"
          description="Experience the magic of the Sahara with our selection of top-rated desert tours. Choose from shared or private trips starting from Marrakech or Fes, including camel trekking, overnight stays in Berber camps, and stunning sunsets over the Erg Chebbi dunes."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="sahara desert camel trek"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Sahara Desert Tour with MarHire?"
                features={desertTourFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Desert Tours by Starting City"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/desert-tour" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
