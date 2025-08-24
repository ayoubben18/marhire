
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { SearchTabs } from '@/components/search-tabs';
import { CategoryHero } from '@/components/category/category-hero';
import { WhyBookCategory } from '@/components/category/why-book-category';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { CategoryBrowseSection } from '@/components/category/category-browse-section';
import { PopularDestinations } from '@/components/popular-destinations';
import { UserCheck, Tag, Plane, Car, Languages, Calendar } from 'lucide-react';
import { SeoTextSection } from '@/components/seo-text-section';

export const metadata: Metadata = {
  title: 'Sedan with Driver Morocco | Business & Airport Transfers | MarHire',
  description: 'Book a comfortable sedan with a professional driver in Morocco. Ideal for business travel, airport transfers, and couples. Fixed prices on models like the Mercedes C-Class.',
};

const sedanFeatures = [
    { icon: UserCheck, title: 'Professional & Discreet Service', description: 'Our chauffeurs provide a professional and discreet service, perfect for business travelers and VIPs.' },
    { icon: Tag, title: 'Ideal for Individuals or Couples', description: 'A comfortable sedan is the perfect choice for solo travelers or couples seeking a premium experience.' },
    { icon: Plane, title: 'Stylish Airport Transfers', description: 'Arrive in style with a private transfer in a modern and comfortable sedan from any major Moroccan airport.' },
    { icon: Car, title: 'Comfortable Long-Distance Travel', description: 'The smooth ride and quiet cabin of a sedan make it ideal for comfortable intercity journeys.' },
    { icon: Languages, title: 'Executive-Level Vehicles', description: 'Our fleet includes premium sedans known for their comfort, style, and safety features.' },
    { icon: Calendar, title: 'Fixed, Transparent Pricing', description: 'Enjoy the peace of mind of a fixed, all-inclusive price for your journey, with no hidden costs.' },
];

const cities = ["Casablanca", "Marrakech", "Agadir", "Tangier", "Rabat"];
const driverListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('sedan') || l.name.toLowerCase().includes('c-class') || l.name.toLowerCase().includes('s-class') || l.name.toLowerCase().includes('octavia') || l.name.toLowerCase().includes('5 series'));

export default function SedanDriverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Hire a Sedan with a Private Driver in Morocco"
          description="The smart choice for business and leisure travel. Book a comfortable and stylish sedan with a professional chauffeur for your airport transfers, city tours, or intercity journeys. Travel in comfort and arrive in style."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="luxury sedan driving"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose a Sedan with a Driver?"
                features={sedanFeatures}
            />
            
            <CategoryBrowseSection
                title="Find a Sedan with a Driver by City"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/sedan" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
