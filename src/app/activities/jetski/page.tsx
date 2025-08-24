
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
  title: 'Jet Ski Rental Morocco | Agadir & Marrakech Lake | MarHire',
  description: 'Book a thrilling jet ski adventure in Morocco. Find the best deals on jet ski rentals in Agadir or on the Lalla Takerkoust lake near Marrakech. No license required.',
};

const jetSkiFeatures = [
    { icon: UserCheck, title: 'Professional Instructors', description: 'Your safety is our priority. All rentals include a full safety briefing and supervision from certified instructors.' },
    { icon: Check, title: 'Modern, Powerful Jet Skis', description: 'Ride with confidence on our fleet of well-maintained and modern jet skis.' },
    { icon: Bus, title: 'No License Required', description: 'You don\'t need a special license to enjoy a jet ski ride under the supervision of our partners.' },
    { icon: Star, title: 'All Safety Gear Included', description: 'We provide you with a life jacket and all necessary safety equipment for a worry-free experience.' },
    { icon: Users, title: 'Solo or Tandem Rides', description: 'Ride solo for maximum thrills or share the fun with a friend on a tandem jet ski.' },
    { icon: XCircle, title: 'Book by the Minute', description: 'Choose a rental duration that suits you, from a quick 20-minute blast to a full hour of fun.' },
];

const cities = ["Agadir", "Marrakech"];
const activityListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('jet ski'));

export default function JetSkiPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="High-Speed Jet Ski Adventures"
          description="Experience the ultimate adrenaline rush on the water. Rent a jet ski for a thrilling ride in the bay of Agadir or on the scenic Lalla Takerkoust lake near Marrakech. Perfect for adventure seekers and water sports enthusiasts."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="jet ski on water"
        >
          <SearchTabs fixedCategory="activities" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Jet Ski Rental with MarHire?"
                features={jetSkiFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Jet Ski Rentals by Location"
                items={cities}
                listings={activityListings}
                basePath="/search/activities"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/activities/jetski" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
