
import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles } from '@/lib/blog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Morocco Travel Blog | Car Rental Tips & Destination Guides | MarHire',
  description: 'Explore the MarHire travel blog for expert tips on car rental, private drivers, and things to do in Morocco. Read our guides to Marrakech, Agadir, Fes, and beyond.',
};

export default async function BlogIndexPage() {
  const articles = await getArticles();
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <div className="w-full bg-primary/5 py-12 md:py-16">
          <div className="container mx-auto max-w-4xl text-center px-4">
              <Breadcrumbs items={breadcrumbItems} />
              <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-6">
                MarHire Travel Blog
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                Your expert guide to traveling in Morocco. Get insider tips on car rentals, find the best private tours, and discover hidden gems across the country.
              </p>
          </div>
      </div>
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link key={article.slug} href={`/blog/${article.slug}`} className="group block">
              <Card className="h-full overflow-hidden rounded-2xl transition-shadow duration-300 hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="relative aspect-video w-full">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={article.imageHint}
                    />
                  </div>
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-2">{article.category}</Badge>
                    <h2 className="font-headline text-xl font-bold leading-tight text-foreground group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{article.description}</p>
                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                        <span>{article.date}</span>
                        <div className="flex items-center gap-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                            Read More <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
