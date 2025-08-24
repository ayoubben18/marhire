
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
  title: 'Hyundai Car Rental Morocco | Hire i10, Accent & More | MarHire',
  description: 'Rent a Hyundai in Morocco. Find great deals on reliable and economical Hyundai models like the i10 and Accent, available for hire in Marrakech, Agadir, and Casablanca.',
};

const hyundaiFeatures = [
    { icon: Shield, title: 'Reliability and Peace of Mind', description: 'Hyundai cars are known for their reliability and build quality, ensuring a trouble-free rental experience.' },
    { icon: BarChart, title: 'Modern Features & Comfort', description: 'Enjoy modern comforts like air conditioning, and infotainment systems, even in our economy models.' },
    { icon: Plane, title: 'Widely Available for Pickup', description: 'Hyundai models are a popular choice and are readily available at airports and city locations across Morocco.' },
    { icon: LifeBuoy, title: 'Excellent Value for Money', description: 'Get a high-quality, modern vehicle at an affordable price, making your travel budget go further.' },
    { icon: Fuel, title: 'Great Fuel Efficiency', description: 'Hyundai\'s efficient engines help you save on fuel costs, whether you\'re driving in the city or on the highway.' },
    { icon: Check, title: 'Easy and Familiar to Drive', description: 'Hyundai cars offer an intuitive and comfortable driving experience, perfect for navigating new roads.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('hyundai'));

export default function HyundaiRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Hyundai Car Rental in Morocco"
          description="Rent a reliable and modern Hyundai for your Moroccan travels. Compare prices on popular models like the compact Hyundai i10 and the comfortable Hyundai Accent. A smart and dependable choice for any journey."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="hyundai car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent a Hyundai in Morocco?"
                features={hyundaiFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Hyundai Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/hyundai"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/hyundai" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
