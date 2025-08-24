
import * as React from 'react';
import { Award, ShieldCheck, MessageSquare, Briefcase, Star, Wallet } from 'lucide-react';

const features = [
  {
    icon: Award,
    title: 'Local Experts, Local Experiences',
    description: "Our listings are curated by Moroccans who know the country better than anyone. You get real recommendations, culturally rich activities, and local prices — not just what's mass-marketed to tourists.",
  },
  {
    title: 'Transparent Pricing, No Hidden Fees',
    icon: ShieldCheck,
    description: "What you see is what you pay. MarHire partners only with verified local agencies who commit to no surprise charges and clear booking policies.",
  },
  {
    title: '24/7 Human Support',
    icon: MessageSquare,
    description: "Our team is local, multilingual, and available on WhatsApp, phone, or email to help you before, during, and after your trip.",
  },
  {
    title: 'Airport Pickup, Anywhere',
    icon: Briefcase,
    description: "Whether you land in Agadir, Marrakech, or Fes, your car or driver will be waiting. Stress-free travel starts at the airport gate.",
  },
  {
    title: 'Handpicked, Reviewed Listings',
    icon: Star,
    description: "We don't list everything — only the best. Every car, driver, boat, or activity is reviewed for quality, comfort, and traveler satisfaction.",
  },
  {
    title: 'Book Now, Pay Later',
    icon: Wallet,
    description: "Many of our services let you reserve without a credit card and pay upon arrival — perfect for travelers who value flexibility.",
  }
];

export function FeatureList() {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="container">
        <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Why Travelers Love MarHire
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              We provide a seamless and trustworthy experience for your Moroccan adventure.
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
  );
}
