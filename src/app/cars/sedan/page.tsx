
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
  title: 'Sedan Car Rental Morocco | Hire Logan, Accent & More | MarHire',
  description: 'Find great deals on sedan car rentals in Morocco. Compare prices on comfortable and practical sedans like the Dacia Logan and Hyundai Accent, perfect for families and business travel.',
};

const sedanFeatures = [
    { icon: Shield, title: 'Comfortable for Long Journeys', description: 'Sedans offer a smooth and comfortable ride, making them ideal for intercity travel and long road trips.' },
    { icon: BarChart, title: 'Generous Luggage Space', description: 'The separate boot provides ample and secure space for luggage, perfect for travelers with multiple bags.' },
    { icon: Plane, title: 'Professional & Business Ready', description: 'A sedan presents a professional image, making it a great choice for business travelers.' },
    { icon: LifeBuoy, title: 'Safe and Stable Handling', description: 'Sedans are known for their stable and predictable handling, ensuring a confident drive on highways.' },
    { icon: Fuel, title: 'Excellent Fuel Economy', description: 'Many modern sedans, especially those with diesel engines, offer fantastic fuel efficiency.' },
    { icon: Check, title: 'Great Value Rentals', description: 'Sedans provide a superb balance of space, comfort, and affordability for your Moroccan travels.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => ['Dacia Logan', 'Hyundai Accent', 'Skoda Octavia'].includes(l.name) || l.name.includes('Series') || l.name.includes('Class'));

export default function SedanRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Sedan Car Rental in Morocco"
          description="The perfect balance of comfort, space, and efficiency. Rent a sedan like the Dacia Logan or Hyundai Accent for your family holiday or business trip. Find great deals on reliable sedans across Morocco."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="sedan car driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Sedan for Your Trip?"
                features={sedanFeatures}
            />
            
            <CategoryBrowseSection
                title="Find Sedan Rentals in Top Moroccan Cities"
                items={cities}
                listings={carListings}
                basePath="/cars/sedan"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/sedan" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
