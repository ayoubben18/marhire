
import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Mail, MessageSquare } from 'lucide-react';
import { Section } from './Section';

const MARHIRE_WHATSAPP_URL = 'https://wa.me/212660745055';
const MARHIRE_EMAIL = 'info@marhire.com';

export function ContactCTA() {
  return (
    <Section className="border-b-0">
        <div className="container flex flex-col items-center justify-between gap-4 text-center">
            <div>
                <h3 className="font-headline text-2xl font-bold text-foreground">
                    Ready to book or have a question?
                </h3>
                <p className="mt-2 text-muted-foreground">
                    Contact MarHire support for assistance with any listing from this partner.
                </p>
            </div>
            <div className="flex w-full flex-shrink-0 flex-col gap-3 sm:w-auto sm:flex-row mt-4">
                <Button size="lg" asChild className="w-full sm:w-auto">
                    <Link href={MARHIRE_WHATSAPP_URL} target="_blank">
                        <MessageSquare className="mr-2 h-5 w-5" /> Chat on WhatsApp
                    </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
                    <Link href={`mailto:${MARHIRE_EMAIL}`}>
                        <Mail className="mr-2 h-5 w-5" /> Email Support
                    </Link>
                </Button>
            </div>
        </div>
    </Section>
  );
}
