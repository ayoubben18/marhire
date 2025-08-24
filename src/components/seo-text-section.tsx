
import * as React from 'react';
import Link from 'next/link';

const Column = ({ children }: { children: React.ReactNode }) => (
    <div className="space-y-6">{children}</div>
);

const SectionBlock = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="space-y-2">
        <h3 className="font-headline text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm">{children}</p>
    </div>
);

export function SeoTextSection() {
  return (
    <section className="bg-background py-12 md:py-16 border-t">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <Column>
            <SectionBlock title="Your Trusted Car Rental Marketplace in Morocco">
                MarHire is your premier destination for finding the best car rental deals across Morocco. Whether you need a cheap car hire from Agadir airport, a luxury vehicle in Marrakech, or a family-friendly SUV in Casablanca, our platform connects you with verified local agencies.
            </SectionBlock>
             <SectionBlock title="No-Deposit & Airport Car Hire Options">
                We specialize in offering flexible options, including <Link href="/search/cars?depositRequired=No" className="text-primary hover:underline font-medium">car rentals with no deposit</Link>, unlimited kilometers, and instant online booking. Our transparent pricing means no hidden fees, ensuring you can book your vehicle with confidence and start your Moroccan road trip without any hassle.
            </SectionBlock>
            <SectionBlock title="A Fleet for Every Journey">
                From economical city cars perfect for navigating the medinas to rugged 4x4s ready for an Atlas Mountains adventure, our partners provide a diverse fleet to suit your travel needs. Compare prices and book the perfect car for your trip today.
            </SectionBlock>
          </Column>
          <Column>
            <SectionBlock title="Book Private Drivers, Boats & Activities with Ease">
                Beyond cars, MarHire is your all-in-one platform for unforgettable travel experiences. Book a professional, multilingual <Link href="/private-drivers" className="text-primary hover:underline font-medium">private driver in Morocco</Link> for seamless airport transfers or comfortable inter-city travel.
            </SectionBlock>
             <SectionBlock title="Coastal Adventures & Yacht Charters">
                Explore the stunning coastline with a private boat rental in Agadir or book a luxury yacht charter in Tangier for a day you'll never forget. From fishing trips to sunset cruises, discover Morocco from the water.
            </SectionBlock>
            <SectionBlock title="Curated Tours & Unforgettable Experiences">
                We also offer a curated selection of the best <Link href="/activities" className="text-primary hover:underline font-medium">things to do in Morocco</Link>, from guided city tours in Fes to exhilarating desert adventures from Marrakech. Every partner is vetted to guarantee quality and safety.
            </SectionBlock>
          </Column>
        </div>
      </div>
    </section>
  );
}
