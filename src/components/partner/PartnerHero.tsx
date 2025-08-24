
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import type { Partner, Category } from '@/lib/partners';
import { Breadcrumbs } from '../breadcrumbs';

const MARHIRE_WHATSAPP_URL = 'https://wa.me/212660745055';
const MARHIRE_EMAIL = 'info@marhire.com';

type PartnerHeroProps = {
  partner: Partner;
  breadcrumbs: React.ReactNode;
};

const categoryDisplayMap: Record<Category, string> = {
    "Cars": "Car Rental",
    "Private Drivers": "Private Driver",
    "Boats": "Boat Rental",
    "Activities": "Things to do",
};


export function PartnerHero({ partner, breadcrumbs }: PartnerHeroProps) {
  return (
    <section className="relative w-full bg-primary/5 pt-12 pb-16 md:pt-16 md:pb-20">
      <div className="container relative text-center">
          {breadcrumbs}
          <div className="flex justify-center mb-6 mt-6">
            <div className="relative h-24 w-24 flex-shrink-0 rounded-2xl border-4 border-background bg-background shadow-lg">
              <Image
                src={partner.logo}
                alt={`${partner.name} logo`}
                fill
                className="rounded-xl object-contain p-2"
                data-ai-hint="company logo"
              />
            </div>
          </div>
          
          {partner.verified && (
            <Badge className="mb-3 border-primary/50 bg-primary/10 text-primary">
              <ShieldCheck className="mr-1.5 h-4 w-4" />
              Verified local partner on MarHire
            </Badge>
          )}
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {partner.name}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {partner.city}, Morocco
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="border-primary/50 text-primary font-medium">
              {categoryDisplayMap[partner.category] || partner.category}
            </Badge>
          </div>
        
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
                <Link href={MARHIRE_WHATSAPP_URL} target="_blank">
                    <MessageSquare className="mr-2 h-5 w-5" /> Contact on WhatsApp
                </Link>
            </Button>
             <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                <Link href={`mailto:${MARHIRE_EMAIL}`}>
                    <Mail className="mr-2 h-5 w-5" /> Send an Email
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
