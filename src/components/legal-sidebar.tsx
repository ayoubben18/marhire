
"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const legalNavLinks = [
  { href: '/legal/terms', title: 'Terms & Conditions' },
  { href: '/legal/privacy', title: 'Privacy Policy' },
  { href: '/legal/cookies', title: 'Cookie Policy' },
  { href: '/legal/cancellation', title: 'Cancellation Policy' },
  { href: '/legal/insurance', title: 'Insurance Conditions' },
];

export function LegalSidebar() {
  const pathname = usePathname();

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-xl">Legal Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <nav className="flex flex-col space-y-2">
          {legalNavLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              )}
            >
              {link.title}
            </Link>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
