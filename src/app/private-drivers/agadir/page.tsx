
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
  title: 'Private Driver Agadir | Airport Transfers (AGA) & Tours | MarHire',
  description: 'Book a reliable private driver in Agadir for fixed-price airport transfers from AGA, city tours, or day trips to Paradise Valley and Taghazout. Professional service guaranteed.',
};

const driverFeatures = [
    { icon: UserCheck, title: 'Professional & Vetted Drivers', description: 'All our Agadir chauffeurs are licensed, experienced, and vetted for professionalism.' },
    { icon: Tag, title: 'Fixed, All-Inclusive Pricing', description: 'The price you see is the price you pay. No hidden fees for your Agadir private driver service.' },
    { icon: Plane, title: 'Guaranteed Airport Pickup', description: 'Your driver monitors your flight and waits for you at Al-Massira Airport with a name sign, even if you are delayed.' },
    { icon: Car, title: 'Comfortable, Modern Vehicles', description: 'Travel in style and comfort in a fleet of clean, modern, and air-conditioned vehicles.' },
    { icon: Languages, title: 'Multilingual Chauffeurs', description: 'Communicate with ease. Many of our Agadir drivers speak English, French, and German.' },
    { icon: Calendar, title: 'Flexible Booking', description: 'Book by the hour, for a specific transfer, or for a full-day tour. Secure your driver online in minutes.' },
];

const vehicleTypes = ["Luxury Sedan", "Minivan", "SUV", "Business VAN"];

const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city === 'Agadir');

export default function PrivateDriverAgadirPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Private Drivers in Agadir"
          description="Travel with comfort, safety, and style. Book a professional, multilingual private driver for your Agadir airport transfer, city tours, or excursions to Taghazout. Fixed prices and reliable service guaranteed."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="agadir marina"
        >
          <SearchTabs fixedCategory="private-drivers" fixedLocation="agadir" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Why Book Your Agadir Private Driver with MarHire?"
                features={driverFeatures}
            />
            
            <CategoryBrowseSection
                title="Browse Driver Services by Vehicle Type in Agadir"
                items={vehicleTypes}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='vehicle'
                paramName='carType'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
