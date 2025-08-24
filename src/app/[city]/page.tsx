
"use client";

import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { TopDeals } from '@/components/top-deals';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { PopularDestinations } from '@/components/popular-destinations';
import { Award, ShieldCheck, Tag, Sparkles, CircleDollarSign, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CityPageHero } from '@/components/city-page-hero';
import { useParams, notFound } from 'next/navigation';
import { SearchTabs } from '@/components/search-tabs';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SeoTextSection } from '@/components/seo-text-section';

const CITIES: Record<string, {name: string, image: string, alt: string, hint: string}> = {
    agadir: { name: 'Agadir', image: 'https://placehold.co/1920x600.png', alt: 'Vibrant beachfront of Agadir', hint: 'agadir morocco beach' },
    marrakech: { name: 'Marrakech', image: 'https://placehold.co/1920x600.png', alt: 'Jemaa el-Fnaa square in Marrakech at sunset', hint: 'marrakech morocco market' },
    casablanca: { name: 'Casablanca', image: 'https://placehold.co/1920x600.png', alt: 'Hassan II Mosque in Casablanca', hint: 'casablanca morocco mosque' },
    fes: { name: 'Fes', image: 'https://placehold.co/1920x600.png', alt: 'Historic leather tanneries of Fes', hint: 'fes morocco tanneries' },
    tangier: { name: 'Tangier', image: 'https://placehold.co/1920x600.png', alt: 'The coastal city of Tangier overlooking the Strait of Gibraltar', hint: 'tangier morocco coast' },
    essaouira: { name: 'Essaouira', image: 'https://placehold.co/1920x600.png', alt: 'The historic port of Essaouira with blue fishing boats', hint: 'essaouira morocco port' },
    rabat: { name: 'Rabat', image: 'https://placehold.co/1920x600.png', alt: 'The Mausoleum of Mohammed V in Rabat', hint: 'rabat morocco landmark' },
    chefchaouen: { name: 'Chefchaouen', image: 'https://placehold.co/1920x600.png', alt: 'The famous blue streets of Chefchaouen', hint: 'chefchaouen morocco blue city' },
};


const WhyBookMarHire = ({ city }: { city: string }) => {
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);
    const features = [
        { icon: ShieldCheck, title: 'Verified Local Providers', description: `Every partner in ${cityName} is vetted for quality and reliability.` },
        { icon: Tag, title: 'Transparent Pricing', description: 'No hidden fees on any booking. What you see is what you pay.' },
        { icon: Sparkles, title: 'Instant Booking', description: 'Book your service in minutes with instant confirmation.' },
        { icon: CircleDollarSign, title: 'No Deposit Options', description: `Many car rentals in ${cityName} are available without a deposit.` },
        { icon: Award, title: 'Curated Experiences', description: 'Handpicked activities and tours to show you the best of the city.' },
        { icon: LifeBuoy, title: '24/7 Local Support', description: 'Our Morocco-based team is always here to help you.' },
    ];
    return (
        <section className="w-full py-12 md:py-16">
            <div className="container">
                <div className="text-center">
                    <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                        Why Book Car Rentals & Tours with MarHire in {cityName}
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        From cheap car rentals with no deposit to professional private drivers for airport transfers and tours, we provide a seamless and authentic experience for your Moroccan adventure.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl shadow-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="font-headline text-lg font-semibold">{feature.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}

export default function CityPage() {
  const params = useParams();
  const citySlug = Array.isArray(params.city) ? params.city[0] : params.city;

  const cityDetails = citySlug ? CITIES[citySlug] : undefined;

  React.useEffect(() => {
    if (!cityDetails) {
        //notFound();
    }
  }, [cityDetails]);

  if (!citySlug || !cityDetails) {
    return null;
  }

  const carListings = MOCK_LISTINGS.filter(l => l.type === 'Car Rental' && l.location.city.toLowerCase() === citySlug).slice(0, 8);
  const driverListings = MOCK_LISTINGS.filter(l => l.type === 'Private Driver' && l.location.city.toLowerCase() === citySlug).slice(0, 8);
  const boatListings = MOCK_LISTINGS.filter(l => l.type === 'Boat' && l.location.city.toLowerCase() === citySlug).slice(0, 8);
  const activityListings = MOCK_LISTINGS.filter(l => l.type === 'Activity' && l.location.city.toLowerCase() === citySlug).slice(0, 8);
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: cityDetails.name, href: `/${citySlug}` }
  ];


  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
          <CityPageHero
              cityName={cityDetails.name}
              heroImage={cityDetails.image}
              imageAlt={cityDetails.alt}
              imageHint={cityDetails.hint}
              breadcrumbs={<Breadcrumbs items={breadcrumbItems} />}
          >
            <SearchTabs fixedLocation={citySlug} />
          </CityPageHero>
        

        <div className={cn("space-y-8 md:space-y-12 pt-12")}>
            <WhyBookMarHire city={citySlug} />

            {carListings.length > 0 && (
              <div className="bg-car-rental-bg">
                  <div className="container py-8 md:py-12">
                    <TopDeals 
                      title={`Top Car Rental Deals in ${cityDetails.name}`}
                      exploreLink={`/search/cars?location=${citySlug}`}
                      exploreText="Explore All Cars"
                      badges={["No Deposit", "Unlimited Kilometers", "Airport Pickup"]}
                      cities={[]}
                      listings={carListings}
                    />
                  </div>
                </div>
            )}

            {driverListings.length > 0 && (
                <div className="bg-private-driver-bg">
                  <div className="container py-8 md:py-12">
                    <TopDeals
                        title={`Private Drivers in ${cityDetails.name}`}
                        exploreLink={`/search/private-drivers?location=${citySlug}`}
                        exploreText="Book a Private Driver"
                        badges={["Airport Transfers", "Multilingual", "Business Trips"]}
                        cities={[]}
                        listings={driverListings}
                    />
                  </div>
                </div>
            )}

            {boatListings.length > 0 && (
                <div className='bg-boat-rental-bg'>
                  <div className="container py-8 md:py-12">
                    <TopDeals
                        title={`Boat & Yacht Rentals in ${cityDetails.name}`}
                        exploreLink={`/search/boats?location=${citySlug}`}
                        exploreText="Cruises, Fishing Trips & Private Yachts"
                        badges={["With Captain", "Sunset Trips", "Group or Private"]}
                        cities={[]}
                        listings={boatListings}
                    />
                  </div>
                </div>
            )}

            {activityListings.length > 0 && (
                 <div className="bg-things-to-do-bg">
                  <div className="container py-8 md:py-12">
                    <TopDeals
                        title={`Things to Do in ${cityDetails.name}`}
                        exploreLink={`/search/activities?location=${citySlug}`}
                        exploreText="Local Tours & Unique Experiences"
                        badges={["Local Tours", "Family Friendly", "Instant Booking"]}
                        cities={[]}
                        listings={activityListings}
                    />
                  </div>
                </div>
            )}
            
             <div className="container py-8 md:py-12">
                <PopularDestinations />
            </div>
        </div>
        <SeoTextSection />
      </main>
    </div>
  );
}
