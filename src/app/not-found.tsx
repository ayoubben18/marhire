
import * as React from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { Button } from '@/components/ui/button';
import { SearchX, ArrowRight } from 'lucide-react';

export default function NotFoundPage() {
  const popularLinks = [
    { title: 'Car Rentals in Marrakech', href: '/search/cars/marrakech' },
    { title: 'Activities in Agadir', href: '/search/activities/agadir' },
    { title: 'Private Drivers in Casablanca', href: '/search/private-drivers/casablanca' },
    { title: 'Explore All Destinations', href: '/' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container text-center py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                <SearchX className="h-8 w-8" />
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                404 - Page Not Found
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
                Oops! The page you are looking for does not exist. It might have been moved or deleted.
            </p>
            <Button asChild size="lg" className="mt-8">
                <Link href="/">Return to Homepage</Link>
            </Button>
            <div className="mt-12 max-w-md mx-auto">
                <h2 className="font-headline text-lg font-semibold text-foreground">Or, try one of these popular links:</h2>
                <div className="mt-4 flex flex-col items-center gap-2">
                    {popularLinks.map(link => (
                        <Button key={link.href} asChild variant="link" className="text-base text-primary">
                             <Link href={link.href}>
                                {link.title}
                                <ArrowRight className="ml-2 h-4 w-4" />
                             </Link>
                        </Button>
                    ))}
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
