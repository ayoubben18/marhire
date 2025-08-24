
"use client";

import * as React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube, Linkedin, Car, User, Ship, Mountain } from 'lucide-react';
import { Button } from './ui/button';
import { Copyright } from './copyright';
import { ClientOnly } from './client-only';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Custom TikTok Icon component
const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a4.25 4.25 0 1 1-4.25-4.25V6.82a7.45 7.45 0 1 0 7.45 7.45v-3.41a.87.87 0 0 1 .87-.87h2.32a.87.87 0 0 0 .87-.87V6.69a.87.87 0 0 0-.87-.87h-2.32Z"></path>
  </svg>
);

const PinterestIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        stroke="currentColor" 
        strokeWidth="0" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
    >
        <path d="M12.64,3.62A9.5,9.5,0,1,0,22,15.17,8.27,8.27,0,0,1,21.5,13a6.14,6.14,0,0,0-1.2-2.7,1,1,0,0,0-1.45-.19c-.39.31-.69.93-.7,1.31s.21,1.15.21,1.15a6.2,6.2,0,0,1-1.7,3.3,5.52,5.52,0,0,1-4.6,1.43,6,6,0,0,1-5.31-6.19,6.56,6.56,0,0,1,6.85-6.43,4.12,4.12,0,0,1,3.42,1.8,1,1,0,0,0,1.38.2,1,1,0,0,0,.19-1.35A6.09,6.09,0,0,0,13.62,2,7.5,7.5,0,0,0,5,10.1,7.6,7.6,0,0,0,13.2,18a7.14,7.14,0,0,0,6.6-5.52,1,1,0,0,0,0-.73,7.88,7.88,0,0,0-2.3-5.08A8.47,8.47,0,0,1,12.64,3.62Z" />
    </svg>
);


const footerLinks = {
  explore: [
    { title: 'Car Rentals', href: '/cars' },
    { title: 'Private Drivers', href: '/private-drivers' },
    { title: 'Boat Rentals', href: '/boats' },
    { title: 'Activities & Tours', href: '/activities' },
  ],
  destinations: [
    { title: 'Agadir', href: '/agadir' },
    { title: 'Marrakech', href: '/marrakech' },
    { title: 'Casablanca', href: '/casablanca' },
    { title: 'Fes', href: '/fes' },
    { title: 'Tangier', href: '/tangier' },
    { title: 'Essaouira', href: '/essaouira' },
    { title: 'Rabat', href: '/rabat' },
  ],
  company: [
    { title: 'About MarHire', href: '/about' },
    { title: 'Our Partners', href: '/our-partners'},
    { title: 'Support', href: '/support' },
    { title: 'Become a Partner', href: '/join-us' },
    { title: 'FAQs', href: '/faq' },
    { title: 'Travel Blog', href: '/blog' },
    { title: 'Sitemap', href: '/sitemap' },
  ],
  legal: [
    { title: 'Terms & Conditions', href: '/legal/terms' },
    { title: 'Privacy Policy', href: '/legal/privacy' },
    { title: 'Cookie Policy', href: '/legal/cookies' },
    { title: 'Cancellation Policy', href: '/legal/cancellation' },
    { title: 'Insurance Conditions', href: '/legal/insurance' },
  ],
};

const subcategoryLinks = {
    cars: {
        icon: Car,
        title: "Cars",
        links: [
            { title: 'Car Rental Agadir', href: '/cars/agadir' },
            { title: 'Car Rental Casablanca', href: '/cars/casablanca' },
            { title: 'Car Rental Essaouira', href: '/cars/essaouira' },
            { title: 'Car Rental Fes', href: '/cars/fes' },
            { title: 'Car Rental Marrakech', href: '/cars/marrakech' },
            { title: 'Car Rental Rabat', href: '/cars/rabat' },
            { title: 'Car Rental Tangier', href: '/cars/tangier' },
            { title: 'Cheap Car Rental', href: '/cars/cheap' },
            { title: 'Luxury Car Rental', href: '/cars/luxury' },
            { title: 'SUV Rental', href: '/cars/suv' },
            { title: 'MPV & Van Rental', href: '/cars/mpv' },
            { title: 'Hatchback Rental', href: '/cars/hatchback' },
            { title: 'Sedan Rental', href: '/cars/sedan' },
            { title: 'Dacia Rentals', href: '/cars/dacia' },
            { title: 'Renault Rentals', href: '/cars/renault' },
            { title: 'Peugeot Rentals', href: '/cars/peugeot' },
            { title: 'Hyundai Rentals', href: '/cars/hyundai' },
            { title: 'Kia Rentals', href: '/cars/kia' },
            { title: 'Fiat Rentals', href: '/cars/fiat' },
            { title: 'Volkswagen Rentals', href: '/cars/volkswagen' },
            { title: 'Audi Rentals', href: '/cars/audi' },
            { title: 'BMW Rentals', href: '/cars/bmw' },
            { title: 'Mercedes Rentals', href: '/cars/mercedes' },
            { title: 'Porsche Rentals', href: '/cars/porsche' },
            { title: 'Range Rover Rentals', href: '/cars/range-rover' },
            { title: 'Skoda Rentals', href: '/cars/skoda' },
        ]
    },
    drivers: {
        icon: User,
        title: "Private Drivers",
        links: [
            { title: 'Private Driver Agadir', href: '/private-drivers/agadir' },
            { title: 'Private Driver Casablanca', href: '/private-drivers/casablanca' },
            { title: 'Private Driver Essaouira', href: '/private-drivers/essaouira' },
            { title: 'Private Driver Fes', href: '/private-drivers/fes' },
            { title: 'Private Driver Marrakech', href: '/private-drivers/marrakech' },
            { title: 'Private Driver Rabat', href: '/private-drivers/rabat' },
            { title: 'Private Driver Tangier', href: '/private-drivers/tangier' },
            { title: 'Airport Transfers', href: '/private-drivers/airport-transfer' },
            { title: 'Intercity Transfers', href: '/private-drivers/intercity' },
            { title: 'SUV with Driver', href: '/private-drivers/suv' },
            { title: 'Van with Driver', href: '/private-drivers/van' },
            { title: 'Minivan with Driver', href: '/private-drivers/minivan' },
            { title: 'Sedan with Driver', href: '/private-drivers/sedan' },
            { title: 'Bus with Driver', href: '/private-drivers/bus' },
        ]
    },
    boats: {
        icon: Ship,
        title: "Boats",
        links: [
            { title: 'Boat Rental Agadir', href: '/boats/agadir' },
            { title: 'Boat Rental Casablanca', href: '/boats/casablanca' },
            { title: 'Boat Rental Essaouira', href: '/boats/essaouira' },
            { title: 'Boat Rental Tangier', href: '/boats/tangier' },
            { title: 'Yacht Charters', href: '/boats/yacht' },
            { title: 'Luxury Yacht Charters', href: '/boats/luxury-yacht' },
            { title: 'Speedboat Rentals', href: '/boats/speedboat' },
            { title: 'Fishing Boat Charters', href: '/boats/fishing-boat' },
            { title: 'Party Boat Rentals', href: '/boats/party-boat' },
        ]
    },
     activities: {
        icon: Mountain,
        title: "Activities",
        links: [
            { title: 'Activities in Agadir', href: '/activities/agadir' },
            { title: 'Activities in Casablanca', href: '/activities/casablanca' },
            { title: 'Activities in Essaouira', href: '/activities/essaouira' },
            { title: 'Activities in Fes', href: '/activities/fes' },
            { title: 'Activities in Marrakech', href: '/activities/marrakech' },
            { title: 'Activities in Rabat', href: '/activities/rabat' },
            { title: 'Activities in Tangier', href: '/activities/tangier' },
            { title: 'Camel Ride Tours', href: '/activities/camel-ride' },
            { title: 'Desert Tours', href: '/activities/desert-tour' },
            { title: 'Quad Biking', href: '/activities/quad' },
            { title: 'Horse Riding', href: '/activities/horse-ride' },
            { title: 'Jet Ski Rental', href: '/activities/jetski' },
            { title: 'Private Activities', href: '/activities/private-activities' },
            { title: 'Group Activities', href: '/activities/group-activities' },
        ]
    }
};

const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61574828086317', icon: Facebook },
    { name: 'Instagram', href: 'https://www.instagram.com/marhirecom/', icon: Instagram },
    { name: 'X', href: 'https://x.com/marhirecom', icon: Twitter },
    { name: 'TikTok', href: 'https://www.tiktok.com/@marhirecom', icon: TikTokIcon },
    { name: 'Pinterest', href: 'https://www.pinterest.com/marhirecom/', icon: PinterestIcon },
    { name: 'YouTube', href: 'https://www.youtube.com/@MarHire', icon: Youtube },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/marhire/', icon: Linkedin },
]

const FooterLinkColumn = ({ title, links }: { title: string; links: { title: string; href: string }[] }) => (
  <div className="space-y-4">
    <h4 className="font-headline font-semibold text-foreground">{title}</h4>
    <ul className="space-y-2">
      {links.map((link) => (
        <li key={link.title}>
          <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

const PaymentIcons = () => (
    <div className="flex flex-wrap items-center gap-4">
        <p className="text-sm font-semibold">Payments:</p>
        <div className="flex flex-wrap items-center gap-2">
            <img src="https://placehold.co/40x25.png" alt="UnionPay" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="MasterCard" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="Visa" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="Amex" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="JCB" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="Diners Club" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="Discover" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="Apple Pay" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="PayPal" className="h-6" data-ai-hint="payment method" />
            <img src="https://placehold.co/40x25.png" alt="CMI" className="h-6" data-ai-hint="payment method" />
        </div>
    </div>
);


export function AppFooter() {
  const footerColumns = [
    { title: "Explore MarHire", links: footerLinks.explore },
    { title: "Top Destinations", links: footerLinks.destinations },
    { title: "Company", links: footerLinks.company },
    { title: "Legal & Policy", links: footerLinks.legal }
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container py-12 md:py-16">
        <ClientOnly>
          <div className="bg-base rounded-2xl p-6 md:p-8 border mb-12">
             <h3 className="font-headline text-lg font-semibold text-foreground text-center mb-4">Browse Our Services by Category</h3>
            <Tabs defaultValue="cars" className="w-full">
              <TabsList className="flex flex-wrap h-auto justify-center">
                {Object.entries(subcategoryLinks).map(([key, category]) => (
                  <TabsTrigger key={key} value={key} className="py-2.5">
                    <category.icon className="mr-2 h-5 w-5" />
                    {category.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(subcategoryLinks).map(([key, category]) => (
                <TabsContent key={key} value={key} className="pt-6">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-6 gap-y-2">
                    {category.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                          {link.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {footerColumns.map(col => (
              <FooterLinkColumn key={col.title} title={col.title} links={col.links} />
            ))}
          </div>

          <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-wrap items-center gap-2">
                  {socialLinks.map(social => (
                      <Button key={social.name} asChild variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                          <a href={social.href} aria-label={social.name} target="_blank" rel="noopener noreferrer">
                              <social.icon className="h-5 w-5" />
                          </a>
                      </Button>
                  ))}
              </div>
              <PaymentIcons />
          </div>

          <div className="mt-8 pt-8 border-t">
              <Copyright />
          </div>
        </ClientOnly>
      </div>
    </footer>
  );
}
