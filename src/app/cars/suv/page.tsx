
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
  title: 'SUV Car Rental Morocco | Hire Duster, Kadjar & 4x4s | MarHire',
  description: 'Find the best deals on SUV car rentals in Morocco. Compare prices on popular models like the Dacia Duster, perfect for exploring the Atlas Mountains or family road trips.',
};

const suvFeatures = [
    { icon: Shield, title: 'Versatility for All Terrains', description: 'With higher ground clearance, an SUV is perfect for Morocco\'s diverse landscapes, from city streets to mountain roads.' },
    { icon: BarChart, title: 'Spacious for Passengers & Luggage', description: 'Enjoy ample room for your family, friends, and all your luggage, ensuring a comfortable journey.' },
    { icon: Plane, title: 'Commanding Driving Position', description: 'The higher driving position of an SUV provides better visibility and a feeling of safety on the road.' },
    { icon: LifeBuoy, title: 'Ideal for Family Adventures', description: 'SUVs are the perfect choice for family road trips, offering space, comfort, and safety.' },
    { icon: Fuel, title: 'Robust and Reliable', description: 'Built to be tough, SUVs provide a sense of security and reliability, no matter where your adventure takes you.' },
    { icon: Check, title: 'Great Value for a Large Vehicle', description: 'SUVs like the Dacia Duster offer incredible space and capability for a very affordable rental price.' },
];

const cities = ["Marrakech", "Agadir", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => ['Dacia Duster', 'Renault Kadjar', 'Jeep Wrangler', 'Range Rover Vogue', 'Toyota Land Cruiser', 'Porsche Cayenne'].includes(l.name));

export default function SuvRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="SUV Car Rental in Morocco"
          description="Your perfect companion for adventure. Rent a versatile and spacious SUV like the popular Dacia Duster. Ideal for family road trips, mountain excursions, and exploring everything Morocco has to offer in comfort and style."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="suv in atlas mountains"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent an SUV in Morocco?"
                features={suvFeatures}
            />
            
            <CategoryBrowseSection
                title="Find SUV Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/suv"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/suv" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
