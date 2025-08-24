
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
  title: 'Car Rental Casablanca | Airport (CMN) & City Deals | MarHire',
  description: 'Find the best deals on car rental in Casablanca. Compare prices on economy cars, SUVs, and luxury vehicles for hire at Casablanca Airport (CMN) or in the city. Book online with MarHire.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'VIP Airport Service', description: 'Pick up your car directly at Mohammed V Airport (CMN) for a seamless start to your business or leisure trip.' },
    { icon: BarChart, title: 'Executive & Luxury Fleet', description: 'Choose from a wide range of premium sedans and SUVs perfect for business travel in Casablanca.' },
    { icon: Plane, title: 'Flexible Rental Periods', description: 'Rent by the day, week, or month to suit your needs, with long-term rental discounts available.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Drive with confidence knowing that 24/7 support is included with every rental in Casablanca.' },
    { icon: Fuel, title: 'Transparent Policies', description: 'No surprises at the counter. Our partners offer clear fuel and insurance policies.' },
    { icon: Check, title: 'Instant Online Booking', description: 'Compare prices and book your Casablanca car rental in minutes with instant confirmation.' },
];

const carTypes = ["Economy", "SUV", "Luxury", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot", "Audi", "BMW", "Mercedes"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Casablanca');

export default function CarRentalCasablancaPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Casablanca"
          description="Navigate Morocco's economic hub with ease. Find the best deals on car rentals in Casablanca, from executive sedans for business trips to practical city cars for exploring. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="casablanca city street"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="casablanca" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Casablanca with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Casablanca"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Casablanca"
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
