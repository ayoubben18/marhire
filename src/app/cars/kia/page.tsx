
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { Shield, BarChart, Plane, LifeBuoy, Fuel, Check } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';

export const metadata: Metadata = {
  title: 'Kia Car Rental Morocco | Hire Picanto & More | MarHire',
  description: 'Rent a Kia in Morocco. Find great deals on stylish and economical Kia models like the Picanto, a popular choice for city driving in Marrakech, Agadir, and Casablanca.',
};

const kiaFeatures = [
    { icon: Shield, title: 'Modern Style & Design', description: 'Kia cars stand out with their modern and attractive designs, adding a touch of style to your journey.' },
    { icon: BarChart, title: 'Packed with Features', description: 'Enjoy a range of modern features and technology, even in compact models, for a comfortable drive.' },
    { icon: Plane, title: 'Convenient City & Airport Pickup', description: 'Kia models are a popular choice and are readily available for pickup across Morocco\'s major cities and airports.' },
    { icon: LifeBuoy, title: 'Reliable and Safe', description: 'Known for their reliability and strong safety ratings, Kia cars offer peace of mind on the road.' },
    { icon: Fuel, title: 'Excellent Fuel Economy', description: 'Kia\'s efficient engines make them a smart, budget-friendly choice for exploring Morocco.' },
    { icon: Check, title: 'Fun and Easy to Drive', description: 'With their nimble handling, Kia cars are enjoyable to drive, whether in the city or on scenic routes.' },
];

const cities = ["Tangier", "Marrakech", "Agadir", "Casablanca", "Fes", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('kia'));

export default function KiaRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Kia Car Rental in Morocco"
          description="Drive with style and confidence. Compare prices on popular Kia models like the economical Kia Picanto. A reliable, feature-packed, and affordable choice for your travels in Morocco."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="kia car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Kia in Morocco?"
                features={kiaFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Kia Rentals in Morocco's Main Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/kia"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/kia" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
