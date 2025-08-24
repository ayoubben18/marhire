

import * as React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPartnerBySlug, getPartnerListings, Partner } from '@/lib/partners';

// Import all the new partner page components
import { PartnerHero } from '@/components/partner/PartnerHero';
import { KeyBadges } from '@/components/partner/KeyBadges';
import { Policies } from '@/components/partner/Policies';
import { ListingsTabs } from '@/components/partner/ListingsTabs';
import { FAQPartner } from '@/components/partner/FAQPartner';
import { ContactCTA } from '@/components/partner/ContactCTA';
import { AppHeader } from '@/components/app-header';
import { MoreDetails } from '@/components/partner/MoreDetails';
import { AboutPartner } from '@/components/partner/AboutPartner';
import { Breadcrumbs } from '@/components/breadcrumbs';

type PartnerPageProps = {
  params: {
    slug: string;
  };
};

// --- METADATA GENERATION ---
export async function generateMetadata({ params }: PartnerPageProps): Promise<Metadata> {
  const partner = await getPartnerBySlug(params.slug);

  if (!partner) {
    return {
      title: 'Partner Not Found | MarHire',
      description: 'The partner you are looking for could not be found.',
    };
  }

  const title = `${partner.name} — ${partner.city} | Verified Partner on MarHire`;
  const description = `Book verified ${partner.category.toLowerCase()} from ${partner.name} in ${partner.city}. Enjoy transparent pricing, no-deposit options, and 24/7 support with MarHire.`;
  const canonicalUrl = `/partners/${partner.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'MarHire',
      images: [
        {
          url: partner.logo || 'https://placehold.co/1200x630.png',
          width: 1200,
          height: 630,
          alt: `Services from ${partner.name} in ${partner.city}`,
        },
      ],
      type: 'profile',
    },
    twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [partner.logo || 'https://placehold.co/1200x630.png'],
    }
  };
}

// --- JSON-LD SCHEMA ---
const JsonLd = ({ partner }: { partner: Partner }) => {
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://www.marhire.com"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Partners",
           "item": "https://www.marhire.com/our-partners"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": partner.name
        }
      ]
    };

    const businessSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": partner.name,
        "url": `https://www.marhire.com/partners/${partner.slug}`,
        "logo": partner.logo,
        ...(partner.openingHours && { "openingHours": partner.openingHours }),
        "provider": {
            "@type": "Organization",
            "name": "MarHire"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
             <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
            />
        </>
    );
};

// --- PAGE COMPONENT ---
export default async function PartnerPage({ params }: PartnerPageProps) {
  const partner = await getPartnerBySlug(params.slug);
  
  if (!partner) {
    notFound();
  }

  const listings = await getPartnerListings(partner.slug);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Our Partners', href: '/our-partners' },
    { label: partner.name, href: `/partners/${partner.slug}` }
  ];
  
  return (
    <>
      <JsonLd partner={partner} />
      <div className="flex min-h-screen w-full flex-col bg-background">
        <AppHeader />
        <main className="flex-1">
          <PartnerHero partner={partner} breadcrumbs={<Breadcrumbs items={breadcrumbItems} />} />
          <KeyBadges partner={partner} />
          <div className='divide-y divide-border'>
            <AboutPartner partner={partner} />
            <Policies partner={partner} />
            <MoreDetails partner={partner} />
            <ListingsTabs listings={listings} />
            <FAQPartner partner={partner} />
            <ContactCTA />
          </div>
        </main>
      </div>
    </>
  );
}
