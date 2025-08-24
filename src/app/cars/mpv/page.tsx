
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
  title: 'MPV & Minivan Rental Morocco | 7-9 Seater Cars | MarHire',
  description: 'Find the best deals on MPV and minivan rentals in Morocco. Compare prices on 7, 8, and 9-seater cars, perfect for families and large groups, in Marrakech, Agadir, and Casablanca.',
};

const mpvFeatures = [
    { icon: Shield, title: 'Space for the Whole Family', description: 'With 7, 8, or 9 seats, MPVs and minivans offer ample room for large families or groups traveling together.' },
    { icon: BarChart, title: 'Generous Luggage Capacity', description: 'Travel without compromise. Our MPVs have plenty of space for all your luggage, pushchairs, and shopping.' },
    { icon: Plane, title: 'Convenient for Airport Transfers', description: 'Start your group trip with ease by picking up a spacious minivan directly from the airport.' },
    { icon: LifeBuoy, title: 'Comfortable Long-Distance Travel', description: 'The spacious interiors ensure a comfortable journey for all passengers on longer road trips between cities.' },
    { icon: Fuel, title: 'Cost-Effective for Groups', description: 'Renting one large vehicle is often more economical and convenient than hiring multiple smaller cars.' },
    { icon: Check, title: 'Safe and Reliable', description: 'Our partners offer modern, well-maintained MPVs with high safety standards for your peace of mind.' },
];

const cities = ["Agadir", "Marrakech", "Casablanca", "Fes", "Tangier", "Rabat"];
const carListings = MOCK_LISTINGS.filter(l => (l.specs.seats || 0) >= 7);

export default function MpvRentalPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="MPV & Minivan Rental in Morocco"
          description="The perfect solution for group travel. Rent a spacious 7, 8, or 9-seater MPV for your family vacation or group adventure. Find great deals on reliable minivans across Morocco, ensuring everyone travels in comfort."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="family van driving"
        >
          <SearchTabs fixedCategory="cars" />
        </CategoryHero>

        <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Rent an MPV in Morocco?"
                features={mpvFeatures}
            />
            
            <CategoryBrowseSection
                title="Find MPV & Minivan Rentals by City"
                items={cities}
                listings={carListings}
                basePath="/cars/mpv"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/cars/mpv" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
