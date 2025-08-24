
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
  title: 'Peugeot Car Rental Morocco | Hire 208, 308 & More | MarHire',
  description: 'Rent a Peugeot in Morocco. Find great prices on popular Peugeot models like the 208 hatchback and 308, known for their style and fuel efficiency. Available in all major cities.',
};

const peugeotFeatures = [
    { icon: Shield, title: 'Stylish European Design', description: 'Travel with a touch of French flair. Peugeot cars are known for their sharp, modern, and distinctive designs.' },
    { icon: BarChart, title: 'Comfortable & Engaging Drive', description: 'Enjoy a comfortable ride with Peugeot\'s innovative i-Cockpit and well-tuned suspension.' },
    { icon: Plane, title: 'Widely Available Across Morocco', description: 'Peugeot is a popular brand, ensuring good availability for pickup at major airports and city locations.' },
    { icon: LifeBuoy, title: 'Excellent Safety Ratings', description: 'Drive with confidence knowing that Peugeot cars consistently achieve high safety ratings.' },
    { icon: Fuel, title: 'Outstanding Fuel Efficiency', description: 'Peugeot\'s modern petrol and diesel engines are highly efficient, helping you save on travel costs.' },
    { icon: Check, title: 'Great All-Round Value', description: 'Peugeot rentals offer a fantastic package of style, comfort, efficiency, and affordable pricing.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('peugeot'));

export default function PeugeotRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Peugeot Car Rental in Morocco"
          description="A stylish and economical choice for your trip. Compare deals on popular Peugeot models like the agile 208 and versatile 308. Perfect for city driving and long-distance touring with excellent fuel economy."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="peugeot car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Peugeot in Morocco?"
                features={peugeotFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Peugeot Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/peugeot"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/peugeot" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
