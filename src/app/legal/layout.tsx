
"use client";

import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { LegalSidebar } from '@/components/legal-sidebar';
import { usePathname } from 'next/navigation';
import { Breadcrumbs } from '@/components/breadcrumbs';

const legalNavLinks = [
  { href: '/legal/terms', title: 'Terms & Conditions' },
  { href: '/legal/privacy', title: 'Privacy Policy' },
  { href: '/legal/cookies', title: 'Cookie Policy' },
  { href: '/legal/cancellation', title: 'Cancellation Policy' },
  { href: '/legal/insurance', title: 'Insurance Conditions' },
];

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const currentPage = legalNavLinks.find(link => link.href === pathname);

  const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: 'Legal', href: '/legal/terms' },
  ];
  if(currentPage) {
    breadcrumbItems.push({ label: currentPage.title, href: currentPage.href });
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <div className="container flex-1 py-8 md:py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <LegalSidebar />
          </aside>
          <main className="md:col-span-3">
            <Breadcrumbs items={breadcrumbItems} className="mb-6" />
            <div className="prose max-w-none dark:prose-invert">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
