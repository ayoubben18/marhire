
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
  title: 'Car Rental Agadir | Best Deals & No Deposit Options | MarHire',
  description: 'Find the best deals on car rental in Agadir. Compare prices on economy cars, SUVs, and luxury vehicles with no-deposit options. Book your Agadir car hire today.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'No-Deposit Options', description: 'Rent with ease in Agadir. Many partners offer no-deposit car rental on economy and compact cars.' },
    { icon: BarChart, title: 'Unlimited Kilometers', description: 'Explore the Souss-Massa region without limits. Most rentals of 3+ days include unlimited mileage.' },
    { icon: Plane, title: 'Agadir Airport Car Hire', description: 'Start your trip instantly with convenient car hire at Agadir Al-Massira Airport (AGA).' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Your safety is our priority. Every rental in Agadir includes 24/7 support.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".' },
    { icon: Check, title: 'Instant Booking Confirmation', description: 'Book your car rental in minutes and receive your confirmation instantly.' },
];

const carTypes = ["Economy", "SUV", "Luxury", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Audi", "BMW", "Mercedes"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Agadir');

export default function CarRentalAgadirPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Agadir"
          description="Find the best deals on car rentals in Agadir. Compare prices from trusted local agencies for your Agadir adventure. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="agadir beach road"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="agadir" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Agadir with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Agadir"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Agadir"
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
