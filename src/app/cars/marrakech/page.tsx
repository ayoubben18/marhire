
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
  title: 'Car Rental Marrakech | Best Deals at Airport (RAK) | MarHire',
  description: 'Find the best deals on car rental in Marrakech. Compare prices on cheap cars, SUVs, and luxury vehicles with no-deposit options. Book your Marrakech car hire at the airport (RAK) or in Gueliz.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'No-Deposit Options', description: 'Rent a car in Marrakech with zero deposit required on many of our most popular vehicles.' },
    { icon: BarChart, title: 'Unlimited Kilometers', description: 'Explore Marrakech and beyond without worrying about mileage limits on most of our rentals.' },
    { icon: Plane, title: 'Marrakech Airport Car Hire', description: 'Pick up your car hassle-free from Marrakech-Menara Airport (RAK) the moment you arrive.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Your safety is our priority. Every rental in Marrakech comes with 24/7 on-road support.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No hidden costs. Our partners offer clear and fair fuel policies, usually "Same-to-Same".' },
    { icon: Check, title: 'Instant Booking', description: 'Secure your car rental in Marrakech in just a few clicks with instant online confirmation.' },
];

const carTypes = ["Economy", "SUV", "Luxury", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Audi", "BMW", "Mercedes"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Marrakech');

export default function CarRentalMarrakechPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Marrakech"
          description="Explore the Red City and its stunning surroundings at your own pace. Find the best deals on car rentals in Marrakech from trusted local agencies. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="marrakech street palm trees"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="marrakech" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Marrakech with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Marrakech"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Marrakech"
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
