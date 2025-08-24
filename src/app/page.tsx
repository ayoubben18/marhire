
import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { PopularDestinations } from '@/components/popular-destinations';
import { TopDeals } from '@/components/top-deals';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { FeatureList } from '@/components/feature-list';
import { FaqSection } from '@/components/faq-section';
import { HeroSection } from '@/components/hero-section';
import { SearchTabs } from '@/components/search-tabs';
import { SeoTextSection } from '@/components/seo-text-section';
import { BlogSection } from '@/components/blog-section';

export default function MarketplacePage() {
  const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental').slice(0, 8);
  const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver').slice(0, 8);
  const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat').slice(0, 8);
  const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity').slice(0, 8);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <HeroSection>
          <SearchTabs />
        </HeroSection>
        
        <div className="space-y-8 pt-12 md:space-y-12">
            <div className="container">
              <PopularDestinations />
            </div>

            <div className="bg-car-rental-bg">
              <div className="container py-8 md:py-12">
                <TopDeals 
                  title="Top Car Rental Deals"
                  exploreLink="/search/cars"
                  exploreText="Explore All Cars"
                  badges={["No Deposit", "Unlimited Kilometers", "Airport Pickup"]}
                  cities={["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes"]}
                  listings={carListings}
                />
              </div>
            </div>
            
            <div className="bg-private-driver-bg">
              <div className="container py-8 md:py-12">
                <TopDeals
                    title="Private Drivers You Can Rely On"
                    exploreLink="/search/private-drivers"
                    exploreText="Book a Private Driver"
                    badges={["Multilingual", "Airport Transfers", "Business Trips"]}
                    cities={["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes"]}
                    listings={driverListings}
                />
              </div>
            </div>

            <div className='bg-boat-rental-bg'>
              <div className="container py-8 md:py-12">
                <TopDeals
                    title="Boat Rentals & Private Cruises"
                    exploreLink="/search/boats"
                    exploreText="Browse Boats & Cruises"
                    badges={["With Captain", "Sunset Trips", "Group or Private"]}
                    cities={["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes"]}
                    listings={boatListings}
                />
              </div>
            </div>

            <div className="bg-things-to-do-bg">
              <div className="container py-8 md:py-12">
                <TopDeals
                    title="Top Things to Do in Morocco"
                    exploreLink="/search/activities"
                    exploreText="Discover Activities"
                    badges={["Local Tours", "Family Friendly", "Instant Booking"]}
                    cities={["Agadir", "Marrakech", "Casablanca", "Tangier", "Fes"]}
                    listings={activityListings}
                />
              </div>
            </div>

            <div className='bg-[#f9f5f4]'>
               <div className="container py-8 md:py-12">
                <FeatureList />
               </div>
            </div>

            <div className="bg-primary/5">
                <div className="container py-8 md:py-12">
                    <BlogSection />
                </div>
            </div>
            
            <div className="bg-background">
              <div className="container py-8 md:py-12">
                <FaqSection />
              </div>
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
