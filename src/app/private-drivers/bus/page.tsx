
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
  title: 'Bus & Coach Hire with Driver Morocco | Group Travel | MarHire',
  description: 'Book a comfortable bus or coach with a professional driver for large group travel in Morocco. Perfect for corporate events, tourist groups, and weddings in Marrakech and Casablanca.',
};

const busFeatures = [
    { icon: UserCheck, title: 'Travel Together Seamlessly', description: 'Our buses and coaches are the perfect solution for keeping large groups of 20+ people together.' },
    { icon: Tag, title: 'Economical for Large Groups', description: 'Hiring one bus is far more cost-effective and simpler to manage than multiple smaller vehicles.' },
    { icon: Plane, title: 'Professional & Experienced Drivers', description: 'Your group is in safe hands with our professional drivers, experienced in handling large vehicles and group logistics.' },
    { icon: Car, title: 'Comfortable & Modern Coaches', description: 'Travel in comfort with features like air conditioning, reclining seats, and ample luggage space.' },
    { icon: Languages, title: 'Ideal for Tours & Events', description: 'Perfect for corporate outings, wedding guest transportation, and multi-day group tours across Morocco.' },
    { icon: Calendar, title: 'Customized Itineraries', description: 'We work with you to plan the perfect route and schedule for your group\'s specific needs.' },
];

const cities = ["Marrakech", "Casablanca", "Agadir", "Fes"];
const driverListings = MOCK_LISTINGS.filter(l => l.name.toLowerCase().includes('bus') || l.name.toLowerCase().includes('sprinter'));

export default function BusDriverPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <CategoryHero
          title="Hire a Bus with a Private Driver in Morocco"
          description="The ultimate solution for large group transportation. Book a modern and comfortable bus or coach with a professional driver for your corporate event, wedding, or group tour. Travel together seamlessly and affordably."
          imageUrl="https://placehold.co/1920x600.png"
          imageHint="tourist bus morocco"
        >
          <SearchTabs fixedCategory="private-drivers" />
        </CategoryHero>

         <div className="space-y-8 py-12 md:space-y-16 md:py-16">
            <WhyBookCategory
                title="Benefits of Hiring a Bus with a Driver"
                features={busFeatures}
            />
            
            <CategoryBrowseSection
                title="Find a Bus with a Driver by City"
                items={cities}
                listings={driverListings}
                basePath="/search/private-drivers"
                filterType='city'
                paramName='location'
            />
            
            <div className="container">
                <PopularDestinations basePath="/private-drivers/bus" />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
