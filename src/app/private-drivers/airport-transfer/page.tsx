
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
  title: 'Morocco Airport Transfers | Fixed Price Pickup (RAK, CMN, AGA) | MarHire',
  description: 'Book reliable airport transfers in Morocco with fixed prices. Professional private drivers for pickups at Marrakech (RAK), Casablanca (CMN), Agadir (AGA), and more.',
};

const airportTransferFeatures = [
    { icon: UserCheck, title: 'Flight Monitoring Included', description: 'Your driver tracks your flight and adjusts pickup time for any delays, ensuring they are there when you arrive.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Price', description: 'The price you book is the final price. No hidden fees for traffic, tolls, or waiting time.' },
    { icon: Plane, title: 'Meet & Greet Service', description: 'Your driver will be waiting in the arrivals hall with a sign bearing your name for a stress-free pickup.' },
    { icon: Car, title: 'Comfortable, Private Vehicles', description: 'Travel in a clean, modern, and air-conditioned vehicle exclusively for you and your party.' },
    { icon: Languages, title: 'Professional, Vetted Drivers', description: 'Our drivers are licensed, experienced professionals dedicated to your safety and comfort.' },
    { icon: Calendar, title: '24/7 Availability', description: 'We provide reliable airport transfer services around the clock to accommodate any flight schedule.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes", "Tangier", "Rabat"];
const driverListings = MOCK_LISTINGS.filter(l => l.location.neighborhood.toLowerCase().includes('airport'));

export default function AirportTransferPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Reliable Morocco Airport Transfers"
          description="Start your Moroccan trip stress-free with a pre-booked airport transfer. We offer fixed-price pickups with professional private drivers at all major airports, including Marrakech (RAK), Casablanca (CMN), Agadir (AGA), Fes (FEZ), and Tangier (TNG)."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="airport arrivals hall driver"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Airport Transfer with MarHire?"
                features={airportTransferFeatures}
            />
            
            <CategoryBrowseSection
                title="Book an Airport Transfer by City"
                items={cities}
                listings={driverListings}
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
