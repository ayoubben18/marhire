
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { getArticles } from '@/lib/blog';
import { getPartners } from '@/lib/partners';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { MOCK_LISTINGS } from '@/lib/mock-data';

export const metadata: Metadata = {
  title: 'Sitemap | MarHire',
  description: 'Navigate the MarHire website. Find links to all our pages including car rentals, private drivers, activities, city guides, legal information, and our travel blog.',
};

const mainPages = [
  { href: '/', title: 'Homepage' },
  { href: '/about', title: 'About Us' },
  { href: '/support', title: 'Support & Help Center' },
  { href: '/join-us', title: 'Become a Partner' },
  { href: '/our-partners', title: 'Our Partners' },
  { href: '/faq', title: 'Frequently Asked Questions' },
  { href: '/blog', title: 'Travel Blog' },
  { href: '/search', title: 'Search All Listings' },
];

const legalPages = [
  { href: '/legal/terms', title: 'Terms & Conditions' },
  { href: '/legal/privacy', title: 'Privacy Policy' },
  { href: '/legal/cookies', title: 'Cookie Policy' },
  { href: '/legal/cancellation', title: 'Cancellation Policy' },
  { href: '/legal/insurance', title: 'Insurance Conditions' },
];

const categoryPages = [
    { href: '/cars', title: 'Car Rentals' },
    { href: '/private-drivers', title: 'Private Drivers' },
    { href: '/boats', title: 'Boat Rentals' },
    { href: '/activities', title: 'Activities & Tours' },
];

const cities = [
    { slug: 'agadir', name: 'Agadir' },
    { slug: 'marrakech', name: 'Marrakech' },
    { slug: 'casablanca', name: 'Casablanca' },
    { slug: 'fes', name: 'Fes' },
    { slug: 'tangier', name: 'Tangier' },
    { slug: 'essaouira', name: 'Essaouira' },
    { slug: 'rabat', name: 'Rabat' },
    { slug: 'chefchaouen', name: 'Chefchaouen' },
];

const cityPages = cities.map(city => ({ href: `/${city.slug}`, title: city.name }));

const categoryCityLinks = categoryPages.flatMap(category => 
    cities.map(city => ({
        href: `/search/${category.href.substring(1)}?location=${city.slug}`,
        title: `${category.title} in ${city.name}`
    }))
);


const SitemapSection = ({ title, links }: { title: string, links: { href: string, title: string }[] }) => (
    <div className="mb-8 pt-8">
        <h2 className="font-headline text-2xl font-bold mb-4">{title}</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-2">
            {links.map(link => (
                <li key={link.href}>
                    <Link href={link.href} className="text-muted-foreground hover:text-primary hover:underline text-ellipsis overflow-hidden whitespace-nowrap block" title={link.title}>
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);


export default async function SitemapPage() {
  const articles = await getArticles();
  const partners = await getPartners();
  const listings = MOCK_LISTINGS;
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Sitemap', href: '/sitemap' }
  ];

  const articleLinks = articles.map(article => ({
    href: `/blog/${article.slug}`,
    title: article.title,
  }));

  const partnerLinks = partners.map(partner => ({
      href: `/partners/${partner.slug}`,
      title: `${partner.name} (${partner.city})`,
  }))

  const listingLinks = listings.map(listing => ({
      href: `/listing/${listing.id}`,
      title: `${listing.name} - ${listing.type}`,
  }));

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="w-full bg-primary/5 py-12 md:py-16">
            <div className="container mx-auto max-w-4xl text-center px-4">
                 <Breadcrumbs items={breadcrumbItems} />
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-6">
                    Sitemap
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Use this sitemap to navigate through all the pages available on the MarHire platform.
                </p>
            </div>
        </div>
        <div className="container py-8 md:py-12 divide-y divide-border">
            <SitemapSection title="Main Pages" links={mainPages} />
            <SitemapSection title="Category Pages" links={categoryPages} />
            <SitemapSection title="City Guides" links={cityPages} />
            <SitemapSection title="Search by Category & City" links={categoryCityLinks} />
            <SitemapSection title="Blog Articles" links={articleLinks} />
            <SitemapSection title="Our Partners" links={partnerLinks} />
            <SitemapSection title="All Listings" links={listingLinks} />
            <SitemapSection title="Legal" links={legalPages} />
        </div>
      </main>
    </div>
  );
}
