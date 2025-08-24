

import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { ListingPage } from '@/components/listing-page';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import type { SearchParams } from '@/lib/types';

type Props = {
  params: { id: string }
  searchParams: SearchParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = MOCK_LISTINGS.find(l => l.id === params.id);
  if (!listing) {
    return {
      title: 'Listing Not Found | MarHire',
    };
  }

  const { name, type, location } = listing;
  const title = `${name} ${type} in ${location.city} | MarHire`;
  const description = `Book the ${name} ${type} in ${location.city}, Morocco. Verified partner, instant booking, and best price guarantee with MarHire.`;

  return {
    title,
    description,
  };
}

export default function SingleListingPage({ params, searchParams }: Props) {
  const listing = MOCK_LISTINGS.find(l => l.id === params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <ListingPage listing={listing} searchParams={searchParams} />
      </main>
    </div>
  );
}
