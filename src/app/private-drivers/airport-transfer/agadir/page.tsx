
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
  title: 'Agadir Airport Transfers (AGA) | Fixed Price Private Driver | MarHire',
  description: 'Book a reliable, fixed-price airport transfer from Agadir Al-Massira Airport (AGA). Professional private drivers with meet & greet service for a stress-free arrival in Agadir.',
};

const airportTransferFeatures = [
    { icon: Plane, title: 'Guaranteed Airport Meet & Greet', description: 'Your driver waits in the arrivals hall at AGA with a name sign, making your pickup seamless.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Price', description: 'The price you book is the final price for your Agadir transfer. No hidden fees for traffic, tolls, or flight delays.' },
    { icon: UserCheck, title: 'Flight Monitoring Included', description: 'Your driver tracks your flight and adjusts pickup time for any delays, ensuring they are there when you land.' },
    { icon: Car, title: 'Comfortable, Private Vehicles', description: 'Travel to your hotel or riad in a clean, modern, and air-conditioned vehicle exclusively for you.' },
    { icon: Languages, title: 'Professional, Vetted Drivers', description: 'Our Agadir drivers are licensed, experienced professionals dedicated to your safety and comfort.' },
    { icon: Calendar, title: '24/7 Availability', description: 'We provide reliable airport transfer services around the clock to accommodate any flight schedule in Agadir.' },
];

const otherAgadirDriverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Agadir').slice(0,8);

export default function AgadirAirportTransferPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Agadir Airport Transfer (AGA)"
          description="Start your Agadir trip stress-free with a pre-booked airport transfer. We offer fixed-price pickups with professional private drivers from Agadir Al-Massira Airport (AGA) directly to your hotel or riad in Agadir, Taghazout, or beyond."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="agadir airport arrivals driver"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="agadir" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book an Airport Transfer in Agadir?"
                features={airportTransferFeatures}
            />
            
            <CategoryBrowseSection
                title="Other Private Driver Services in Agadir"
                items={[]}
                listings={otherAgadirDriverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/airport-transfer" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
