
import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { 
  SupportHero,
  ContactOptions,
  HelpTopics,
  FeaturedFaqs,
  ContactForm,
  TrustGuarantees
} from '@/components/support-page-sections';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Support & Help Center | MarHire — 24/7 WhatsApp, Bookings & Refunds (Morocco)',
  description: 'Get fast support for car rentals, private drivers, boats, and activities in Morocco. 24/7 WhatsApp, phone and email. Cancellations, refunds, airport transfers, roadside help.',
};

export default function SupportPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Support', href: '/support' }
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <SupportHero breadcrumbs={<Breadcrumbs items={breadcrumbItems} />} />
        <ContactOptions />
        <HelpTopics />
        <FeaturedFaqs />
        <ContactForm />
        <TrustGuarantees />
      </main>
    </div>
  );
}
