
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { CityCarousel } from '@/components/category/city-carousel';
import { PopularDestinations } from '@/components/popular-destinations';
import { Shield, BarChart, Plane, LifeBuoy, Fuel, Check } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';


export const metadata: Metadata = {
  title: 'Car Rental Morocco | Cheap Car Hire Airport & No Deposit | MarHire',
  description: 'Find the best cheap car rental in Morocco. Compare prices on car hire from Morocco airports (Marrakech, Agadir, etc.) with no deposit options. Book your economy car, SUV, or luxury vehicle today.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'No-Deposit Options', description: 'Rent with ease. Many of our partners offer no-deposit car rental in Morocco on economy and compact cars.' },
    { icon: BarChart, title: 'Unlimited Kilometers', description: 'Explore Morocco without limits. Most rentals of 3+ days include unlimited mileage.' },
    { icon: Plane, title: 'Airport Car Hire', description: 'Start your trip right away. We offer convenient car hire at all major Moroccan airports.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Your safety is our priority. Every rental includes 24/7 support for any on-road issues.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".' },
    { icon: Check, title: 'Instant Booking Confirmation', description: 'Book your car rental in minutes and receive your confirmation instantly.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carTypes = ["Economy", "SUV", "Luxury", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Audi", "BMW", "Mercedes"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental');

export default function CarRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Compare Car Rental Deals in Morocco"
          description="From agile city cars for navigating the medinas to spacious SUVs for your family road trip, find the perfect vehicle. Compare deals from trusted local agencies for cheap car rental with transparent pricing and instant booking."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="car driving on moroccan road"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Morocco with MarHire?"
                features={carRentalFeatures}
            />

            <CityCarousel
                title="Find Car Rentals in Morocco's Top Cities"
                cities={cities}
                basePath="/cars"
            />
            
            <CategoryBrowseSection
                title="Car Hire by City"
                items={cities}
                listings={carListings}
                basePath="/search/cars"
                filterType='city'
                paramName='location'
            />

            <CategoryBrowseSection
                title="Cheap, Luxury & SUV Car Rental Morocco"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />

            <CategoryBrowseSection
                title="Browse Car Hire by Brand"
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
