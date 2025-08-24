
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
  title: 'Porsche Car Rental Morocco | Hire Cayenne & More | MarHire',
  description: 'Rent a Porsche in Morocco for the ultimate luxury sports car experience. Find deals on the Porsche Cayenne, perfect for a stylish and powerful journey in Marrakech or Casablanca.',
};

const porscheFeatures = [
    { icon: Shield, title: 'Unmatched Sporting Performance', description: 'Experience legendary Porsche engineering, with exhilarating acceleration and superb handling.' },
    { icon: BarChart, title: 'Luxury, Comfort, and Style', description: 'Travel in a meticulously crafted interior that combines premium materials with sporty elegance.' },
    { icon: Plane, title: 'Exclusive VIP Airport Delivery', description: 'Arrange for your Porsche to be delivered with our premium meet and greet service at key airports.' },
    { icon: LifeBuoy, title: 'An Unforgettable Statement', description: 'A Porsche is more than a car; it\'s an experience. Perfect for making any occasion truly special.' },
    { icon: Fuel, title: 'Surprising Everyday Usability', description: 'Models like the Cayenne offer thrilling performance without sacrificing practicality for passengers and luggage.' },
    { icon: Check, title: 'Guaranteed Exclusivity', description: 'When you rent a Porsche, you are booking a unique and exclusive vehicle for a memorable driving adventure.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('porsche'));

export default function PorscheRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Porsche Car Rental in Morocco"
          description="For the ultimate driving enthusiast. Experience the thrill of a Porsche on the open roads of Morocco. We offer exclusive rentals of iconic models like the powerful Porsche Cayenne, blending luxury, performance, and style."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="porsche cayenne driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Porsche for Your Moroccan Adventure?"
                features={porscheFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Porsche Rentals in Key Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/porsche"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/porsche" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
