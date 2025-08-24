
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
  title: 'Car Rental Tangier | Airport (TNG) & Port Deals | MarHire',
  description: 'Find the best deals on car rental in Tangier. Compare prices on economy cars, SUVs, and luxury vehicles for hire at Tangier Airport (TNG) or the port. Book online with MarHire.',
};

const carRentalFeatures = [
    { icon: Plane, title: 'Airport & Port Pickup', description: 'Conveniently collect your car from Ibn Battouta Airport (TNG) or the Tangier Med Port.' },
    { icon: BarChart, title: 'Explore Northern Morocco', description: 'A rental car is the perfect way to take day trips to the blue city of Chefchaouen and the artistic town of Asilah.' },
    { icon: Shield, title: 'No-Deposit Options', description: 'Rent with ease in Tangier. Many partners offer no-deposit car rental on a range of vehicles.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Drive with confidence knowing that 24/7 support is included with every rental in Tangier.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your Tangier car rental in minutes with instant confirmation.' },
];

const carTypes = ["Economy", "SUV", "Sedan", "Hatchback"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Kia"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Tangier');

export default function CarRentalTangierPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Tangier"
          description="Discover the gateway to Africa and its stunning surroundings. Find great deals on car rentals in Tangier, perfect for exploring the city or taking day trips to Chefchaouen. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="tangier coastline"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="tangier" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Tangier with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Tangier"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Tangier"
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
