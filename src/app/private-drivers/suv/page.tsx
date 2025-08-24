
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
  title: 'SUV Private Driver Morocco | Hire a 4x4 with Driver | MarHire',
  description: 'Book a comfortable and spacious SUV with a professional private driver in Morocco. Perfect for family travel, extra luggage, or exploring the Atlas Mountains.',
};

const suvFeatures = [
    { icon: UserCheck, title: 'More Space for Passengers', description: 'SUVs offer generous legroom and space, ensuring a comfortable ride for families and small groups.' },
    { icon: Tag, title: 'Ample Luggage Capacity', description: 'Travel without worry. Our SUVs have plenty of room for all your luggage, sports equipment, or shopping.' },
    { icon: Plane, title: 'Ideal for Mountain Roads', description: 'The robust build and higher ground clearance of an SUV make it perfect for scenic drives in the Atlas Mountains.' },
    { icon: Car, title: 'Travel in Style & Safety', description: 'Our fleet includes modern and stylish SUVs known for their excellent safety features.' },
    { icon: Languages, title: 'Professional Chauffeurs', description: 'Your SUV comes with an experienced driver, so you can sit back, relax, and enjoy the views.' },
    { icon: Calendar, title: 'Available for All Services', description: 'Book an SUV for airport transfers, city tours, intercity travel, or multi-day tours.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes", "Tangier"];
const driverListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('suv') || l.name.toLowerCase().includes('4x4') || l.name.toLowerCase().includes('land cruiser'));

export default function SuvDriverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Book an SUV with a Private Driver in Morocco"
          description="Travel with extra space, comfort, and capability. Hire a premium SUV with a professional chauffeur for your family vacation, business trip, or mountain excursion. Available in Marrakech, Agadir, and more."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="suv in atlas mountains"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Choose an SUV for Your Private Transfer?"
                features={suvFeatures}
            />
            
            <CategoryBrowseSection
                title="Find an SUV with a Driver by City"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/suv" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
