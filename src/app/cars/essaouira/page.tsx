
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
  title: 'Car Rental Essaouira | Best Deals for Coastal Drives | MarHire',
  description: 'Find the best deals on car rental in Essaouira. Compare prices on economy cars and SUVs, perfect for exploring the Atlantic coast. Book your Essaouira car hire today.',
};

const carRentalFeatures = [
    { icon: Shield, title: 'No-Deposit Options', description: 'Rent with ease in Essaouira. Many partners offer no-deposit car rental on economy and compact cars.' },
    { icon: BarChart, title: 'Perfect for Coastal Drives', description: 'Explore the scenic coastal road to Agadir or Safi at your own pace.' },
    { icon: Plane, title: 'Convenient City Pickup', description: 'Pick up your car from our partner locations in the city, ready for your adventure.' },
    { icon: LifeBuoy, title: '24/7 Roadside Assistance', description: 'Your safety is our priority. Every rental in Essaouira includes 24/7 support.' },
    { icon: Fuel, title: 'Transparent Fuel Policies', description: 'No surprises. Our partners offer clear fuel policies, typically "Same-to-Same".' },
    { icon: Check, title: 'Instant Booking Confirmation', description: 'Book your car rental in minutes and receive your confirmation instantly.' },
];

const carTypes = ["Economy", "SUV", "Hatchback", "Family VAN"];
const carBrands = ["Dacia", "Renault", "Hyundai", "Peugeot"];

const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city === 'Essaouira');

export default function CarRentalEssaouiraPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Car Rental in Essaouira"
          description="Discover the windswept coast and charming countryside around Essaouira with your own vehicle. Find great deals on reliable cars for your coastal adventure. Book with transparent pricing and instant confirmation."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="essaouira city walls"
        >
          <SearchTabs fixedCategory="cars" fixedLocation="essaouira" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Car Hire in Essaouira with MarHire?"
                features={carRentalFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Car Rentals by Type in Essaouira"
                items={carTypes}
                listings={carListings}
                basePath="/search/cars"
                filterType='carType'
                paramName='carType'
            />
             <CategoryBrowseSection
                title="Browse Car Rentals by Brand in Essaouira"
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
