
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
  title: 'Things to Do in Fes | Guided Tours, Artisan Workshops | MarHire',
  description: 'Book the best things to do in Fes. Find deals on guided walking tours of the medina, artisan workshops, and day trips to Meknes and Volubilis. All activities with verified local guides.',
};

const activityFeatures = [
    { icon: UserCheck, title: 'Official Licensed Guides', description: 'Our Fes tours are led by expert local guides who can navigate the 9,000 alleys of the medina.' },
    { icon: Check, title: 'Authentic Cultural Experiences', description: 'Go beyond the surface with tours focusing on Fes\'s unique history, crafts, and culinary traditions.' },
    { icon: Bus, title: 'Comfortable Day Trips', description: 'Explore nearby historical sites like Meknes and the Roman ruins of Volubilis in a comfortable, air-conditioned vehicle.' },
    { icon: Star, title: 'Top-Rated Fes Itineraries', description: 'We only list the most insightful and highly-rated tours that are loved by fellow travelers.' },
    { icon: Users, title: 'Small Group or Private Tours', description: 'Choose a sociable small group tour or a personalized private experience tailored to your interests.' },
    { icon: XCircle, title: 'Book with Flexibility', description: 'Secure your Fes tour with confidence, with easy cancellation options available for most activities.' },
];

const activityTypes = ["Medina Tour", "Artisan Workshop", "Cooking Class", "Day Trip"];

const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city === 'Fes');

export default function ActivitiesFesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Top Tours & Activities in Fes"
          description="Immerse yourself in the spiritual capital of Morocco. Book a guided walking tour to navigate the ancient medina, take part in an artisan workshop, or embark on a historical day trip to the Roman ruins of Volubilis."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="fes tannery"
        >
          <SearchTabs fixedCategory="activities" fixedLocation="fes" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Fes Tours with MarHire?"
                features={activityFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Activities in Fes by Type"
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
