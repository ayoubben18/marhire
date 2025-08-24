
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
  title: 'Car Rental Rabat | Best Deals at Airport (RBA) & City | MarHire',
  description: 'Find the best deals on car rental in Rabat. Compare prices on economy cars, sedans, and SUVs for hire at Rabat-Salé Airport (RBA) or in the city. Book online with MarHire.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'Ideal for Business & Tourism', description: 'Rent a professional sedan for business meetings or a compact car for exploring the capital.' },
    { icon: BarChart, title: 'Unlimited Kilometers Available', description: 'Explore Rabat, Casablanca, and the surrounding areas without mileage restrictions on most rentals.' },
    { icon: Plane, title: 'Rabat-Salé Airport Car Hire', description: 'Start your trip instantly with convenient car hire at Rabat-Salé Airport (RBA).' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Drive with confidence knowing that 24/7 support is included with every rental in Rabat.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your Rabat car rental in minutes with instant confirmation.' },
];

const carTypes = ["Economy", "SUV", "Sedan", "Hatchback"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Skoda"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Rabat');

export default function CarRentalRabatPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Rabat"
          description="Navigate Morocco's capital with ease. Find the best deals on car rentals in Rabat, from executive sedans for business to practical city cars for exploring historic sites. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="rabat cityscape"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="rabat" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Rabat with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Rabat"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Rabat"
                items={carBrands}
                listings={carListings}
                basePath="/search/cars"
                filterType='brand'
                paramName='carBrand'
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
