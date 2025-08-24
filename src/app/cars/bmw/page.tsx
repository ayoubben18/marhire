
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
  title: 'BMW Car Rental Morocco | Hire 3 Series, X5 & More | MarHire',
  description: 'Rent a BMW in Morocco. Find great prices on luxury BMW models like the 3 Series sedan and X5 SUV. Enjoy the ultimate driving machine in Marrakech, Casablanca, and Agadir.',
};

const bmwFeatures = [
    { icon: Shield, title: 'The Ultimate Driving Machine', description: 'Experience unparalleled driving dynamics, powerful engines, and responsive handling on Moroccan roads.' },
    { icon: BarChart, title: 'Luxury & Comfort', description: 'Travel in style with BMW\'s premium interiors, advanced technology, and exceptional comfort.' },
    { icon: Plane, title: 'VIP Airport Pickup', description: 'Arrange for your BMW to be waiting for you at major airports like Casablanca (CMN) and Marrakech (RAK).' },
    { icon: LifeBuoy, title: 'Iconic and Prestigious', description: 'Whether for a business trip or a special occasion, a BMW makes a powerful statement.' },
    { icon: Fuel, title: 'Performance and Efficiency', description: 'BMW\'s EfficientDynamics technology ensures a thrilling drive without compromising on fuel economy.' },
    { icon: Check, title: 'Guaranteed Model Availability', description: 'Book a specific BMW model with confidence, knowing it will be the car you receive.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('bmw'));

export default function BmwRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="BMW Car Rental in Morocco"
          description="Elevate your driving experience in Morocco with a luxury BMW rental. Compare deals on iconic models like the sporty BMW 3 Series and the commanding BMW X5. The perfect choice for those who demand performance and style."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="bmw car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a BMW for Your Morocco Trip?"
                features={bmwFeatures}
            />
            
            <CategoryBrowseSection
                title="Find BMW Rentals in Morocco's Key Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/bmw"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/bmw" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
