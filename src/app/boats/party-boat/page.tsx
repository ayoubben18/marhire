
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
  title: 'Party Boat Rental Morocco | Agadir Celebrations | MarHire',
  description: 'Book the ultimate party boat experience in Agadir. Find large boats with sound systems, food, and fun for birthdays, bachelor parties, or any special celebration on the water.',
};

const partyBoatFeatures = [
    { icon: UserCheck, title: 'Spacious Decks for Groups', description: 'Our party boats are designed to comfortably accommodate larger groups, with plenty of space for socializing and dancing.' },
    { icon: Anchor, title: 'Onboard Sound System', description: 'Get the party started with a powerful onboard sound system. Connect your own playlist or enjoy our curated mixes.' },
    { icon: Shield, title: 'Professional Crew & Safety', description: 'Enjoy your celebration knowing a professional captain and crew are on hand to ensure your safety.' },
    { icon: Calendar, title: 'Catering & Drink Packages', description: 'Customize your event with optional food and beverage packages, from simple snacks to full barbecue lunches.' },
    { icon: Sun, title: 'Perfect for Any Celebration', description: 'Ideal for birthdays, bachelor/bachelorette parties, corporate events, or just a fun day out with friends.' },
    { icon: Tag, title: 'All-Inclusive Pricing', description: 'Our party packages often include the boat, crew, fuel, and basic amenities for a straightforward booking experience.' },
];

const cities = ["Agadir"];
const boatListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('party'));

export default function PartyBoatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Book Your Private Party Boat"
          description="Celebrate in style on the waters of Agadir. Charter a private party boat for your next special event. Our boats are equipped with sound systems and ample space, perfect for birthdays, bachelor parties, or a memorable day with friends."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="group celebrating on boat"
        >
          <SearchTabs fixedCategory="boats" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book a Party Boat with MarHire?"
                features={partyBoatFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Party Boats by City"
                items={cities}
                listings={boatListings}
                basePath="/search/boats"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/boats/party-boat" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
