
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
  title: 'Mercedes-Benz Car Rental Morocco | Hire C-Class, S-Class | MarHire',
  description: 'Rent a Mercedes-Benz in Morocco. Find deals on luxury Mercedes models like the C-Class and S-Class for an unparalleled driving experience in Marrakech, Casablanca, and Agadir.',
};

const mercedesFeatures = [
    { icon: Shield, title: 'Unmistakable Luxury & Prestige', description: 'Experience the pinnacle of automotive luxury, comfort, and state-of-the-art technology.' },
    { icon: BarChart, title: 'Effortless Performance', description: 'Enjoy a smooth, powerful, and serene driving experience that makes every journey a pleasure.' },
    { icon: Plane, title: 'VIP Airport Meet & Greet', description: 'Arrange for your Mercedes-Benz to be delivered with a premium meet and greet service at major airports.' },
    { icon: LifeBuoy, title: 'Superior Safety Systems', description: 'Travel with ultimate peace of mind, protected by Mercedes-Benz\'s industry-leading safety innovations.' },
    { icon: Fuel, title: 'Timeless, Elegant Design', description: 'Arrive in style. The timeless design of a Mercedes-Benz is perfect for business travel or special occasions.' },
    { icon: Check, title: 'Guaranteed Premium Service', description: 'Renting a Mercedes-Benz comes with the promise of exceptional service and a meticulously maintained vehicle.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('mercedes'));

export default function MercedesRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Mercedes-Benz Car Rental in Morocco"
          description="Indulge in unparalleled luxury and comfort. Compare prices on prestigious Mercedes-Benz models, including the elegant C-Class and the flagship S-Class. The definitive choice for a first-class travel experience in Morocco."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="mercedes benz driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Mercedes-Benz in Morocco?"
                features={mercedesFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Mercedes-Benz Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/mercedes"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/mercedes" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
