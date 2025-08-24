
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { getPartners, type Partner, type Category } from '@/lib/partners';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Our Partners | MarHire',
  description: 'Browse our network of trusted and verified local partners for car rentals, private drivers, boat tours, and activities across Morocco.',
};

const PartnerCategorySection = ({ title, partners }: { title: string, partners: Partner[] }) => {
    if (partners.length === 0) return null;
    return (
        <section className="py-8">
            <h2 className="font-headline text-2xl font-bold md:text-3xl mb-6">{title}</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
                {partners.map(partner => (
                    <li key={partner.slug}>
                        <Link href={`/partners/${partner.slug}`} className="text-muted-foreground hover:text-primary hover:underline flex items-center gap-2 py-1">
                           <ArrowRight className="h-4 w-4 text-primary/50" />
                           <span>{partner.name} ({partner.city})</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    )
};


export default async function OurPartnersPage() {
  const partners = await getPartners();
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Partners', href: '/our-partners' }
  ];

  const partnersByCategory = partners.reduce((acc, partner) => {
    const category = partner.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(partner);
    return acc;
  }, {} as Record<Category, Partner[]>);

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="w-full bg-primary/5 py-12 md:py-16">
            <div className="container mx-auto max-w-4xl text-center px-4">
                 <Breadcrumbs items={breadcrumbItems} />
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-6">
                    Our Trusted Partners
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    We work with the best local agencies across Morocco to bring you a curated selection of high-quality, reliable services. Each partner is verified to ensure your travel experience is safe and memorable.
                </p>
            </div>
        </div>
        <div className="container py-8 md:py-12 divide-y divide-border">
            <PartnerCategorySection title="Car Rental Partners" partners={partnersByCategory['Cars'] || []} />
            <PartnerCategorySection title="Private Driver Services" partners={partnersByCategory['Private Drivers'] || []} />
            <PartnerCategorySection title="Boat & Yacht Partners" partners={partnersByCategory['Boats'] || []} />
            <PartnerCategorySection title="Activity & Tour Providers" partners={partnersByCategory['Activities'] || []} />
        </div>
      </main>
    </div>
  );
}
