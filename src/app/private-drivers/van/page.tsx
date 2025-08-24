
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Tag, Plane, Car, Languages, Calendar } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';

export const metadata: Metadata = {
  title: 'Van & Minivan with Driver Morocco | Group Transfers | MarHire',
  description: 'Book a comfortable van or minivan with a professional driver for group travel in Morocco. Perfect for families, corporate events, and group tours. Seats up to 8 passengers.',
};

const vanFeatures = [
    { icon: UserCheck, title: 'Ideal for Group Travel', description: 'With seating for up to 8 passengers, our vans are perfect for families, friends, and corporate groups.' },
    { icon: Tag, title: 'Cost-Effective for Groups', description: 'Traveling together in one vehicle is more economical and fun than booking multiple cars.' },
    { icon: Plane, title: 'Spacious Airport Transfers', description: 'Ensure a comfortable airport transfer with plenty of room for all passengers and their luggage.' },
    { icon: Car, title: 'Modern & Comfortable Fleet', description: 'Travel in a modern, air-conditioned van like the Mercedes V-Class for a premium experience.' },
    { icon: Languages, title: 'Professional Group Chauffeurs', description: 'Our drivers are experienced in handling group logistics, ensuring a smooth and efficient journey.' },
    { icon: Calendar, title: 'Perfect for Day Trips & Tours', description: 'Book a van with a driver for a private group day trip to the Atlas Mountains, Essaouira, and more.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes", "Tangier"];
const driverListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('van') || l.name.toLowerCase().includes('v-class') || l.name.toLowerCase().includes('tourneo'));

export default function VanDriverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Hire a Van with a Private Driver in Morocco"
          description="The perfect solution for group travel. Book a spacious and comfortable minivan or van with a professional driver for your family vacation, group tour, or business event. Available for airport transfers, intercity travel, and day trips."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="mercedes v-class van"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Benefits of Hiring a Van with a Driver"
                features={vanFeatures}
            />
            
            <CategoryBrowseSection
                title="Find a Van with a Driver by City"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/van" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
