
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Anchor, Shield, Calendar, Sun, Tag } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Essaouira Boat Trips & Fishing Charters | MarHire',
  description: 'Book an authentic boat trip from Essaouira\'s historic port. Find deals on traditional fishing trips and coastal tours with verified local captains.',
};

const boatFeatures = [
    { icon: UserCheck, title: 'Authentic Local Captains', description: 'Sail with experienced local fishermen who know the waters of Essaouira like the back of their hand.' },
    { icon: Anchor, title: 'Traditional Fishing Trips', description: 'Experience traditional line fishing and enjoy a fresh fish barbecue on board.' },
    { icon: Shield, title: 'Safety First', description: 'All vessels are equipped with necessary safety gear for a secure trip on the Atlantic.' },
    { icon: Calendar, title: 'Flexible Booking', description: 'Book a short tour around the island or a half-day fishing adventure.' },
    { icon: Sun, title: 'See the Iconic Port', description: 'Get a unique view of Essaouira\'s famous Skala de la Ville and blue fishing boats from the water.' },
    { icon: Tag, title: 'Transparent Pricing', description: 'The price includes the boat, captain, and fishing equipment. No hidden costs.' },
];

const boatTypes = ["Fishing Boat", "Traditional Boat", "Sailing Boat"];

const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city === 'Essaouira');

export default function BoatRentalEssaouiraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Boat Trips in Essaouira"
          description="Experience the maritime soul of Essaouira. Book an authentic fishing trip with a local captain or a scenic tour around the Mogador islands. A unique way to see the historic city from the sea."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="essaouira blue boats"
        >
          <SearchTabs fixedCategory="boats" fixedLocation="essaouira" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Boat Trip in Essaouira with MarHire?"
                features={boatFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Boat Trips by Type in Essaouira"
                items={boatTypes}
                listings={boatListings}
                basePath="/search/boats"
                filterType='boatType'
                paramName='boatType'
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
