
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
  title: 'Audi Car Rental Morocco | Hire A3, Q5 & More | MarHire',
  description: 'Rent an Audi in Morocco. Find deals on luxury Audi models like the A3 sedan and Q5 SUV. Experience premium German engineering and style in Marrakech, Casablanca, and Agadir.',
};

const audiFeatures = [
    { icon: Shield, title: 'Premium Driving Experience', description: 'Enjoy the perfect blend of performance, comfort, and cutting-edge technology that defines the Audi brand.' },
    { icon: BarChart, title: 'Sleek & Stylish Designs', description: 'Make a statement with Audi\'s sophisticated and modern designs, perfect for business or pleasure.' },
    { icon: Plane, title: 'Available at Major Airports', description: 'Pick up your Audi rental directly from the airport in Casablanca, Marrakech, and other key locations.' },
    { icon: LifeBuoy, title: 'Advanced Safety Features', description: 'Drive with confidence thanks to Audi\'s renowned safety systems and build quality.' },
    { icon: Fuel, title: 'Efficient Performance', description: 'Audi\'s modern engines offer a compelling combination of power and fuel efficiency.' },
    { icon: Check, title: 'Guaranteed Model', description: 'When you book a specific Audi model with our premium partners, you are guaranteed to get that car or better.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('audi'));

export default function AudiRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Audi Car Rental in Morocco"
          description="Experience your Moroccan journey with the sophistication and performance of an Audi. Compare prices on popular models like the agile Audi A3 and the versatile Audi Q5. The perfect choice for a premium travel experience."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="audi car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent an Audi in Morocco?"
                features={audiFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Audi Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/audi"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/audi" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
