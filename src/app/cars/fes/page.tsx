
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
  title: 'Car Rental Fes | Airport (FEZ) & City Deals | MarHire',
  description: 'Find great deals on car rental in Fes. Compare prices on economy cars and sedans for hire at Fes-Saïss Airport (FEZ) or in the city. Book online with MarHire.',
};

const carRentalFeatures = [
    { icon: Plane, title: 'Convenient Fes Airport Hire', description: 'Pick up your car directly at Fes-Saïss Airport (FEZ) for a smooth start to your trip.' },
    { icon: BarChart, title: 'Ideal for Day Trips', description: 'Rent a car to independently explore nearby Meknes, the Roman ruins of Volubilis, and the blue city of Chefchaouen.' },
    { icon: Shield, title: 'Verified Local Agencies', description: 'We partner with trusted, local Fes car rental agencies to ensure quality vehicles and reliable service.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Drive with confidence knowing that 24/7 support is included with every rental in Fes.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'Our partners offer clear and fair "Same-to-Same" fuel policies to avoid any surprises.' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your Fes car rental in minutes with instant online confirmation.' },
];

const carTypes = ["Economy", "Sedan", "Hatchback", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Skoda"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Fes');

export default function CarRentalFesPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Fes"
          description="Explore Morocco's cultural capital and its surroundings with the freedom of your own vehicle. Find great deals on reliable cars for day trips to Meknes or Chefchaouen. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="fes medina"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="fes" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Fes with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Fes"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Fes"
                items={carBrands}
                listings={carListings}
                basePath="/search/cars"
                filterType='brand'
                paramName='carBrand'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
