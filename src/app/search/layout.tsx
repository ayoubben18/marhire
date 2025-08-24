
'use client';

import * as React from 'react';
import { ClientSearchLayout } from '@/components/client-search-layout';

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
      <ClientSearchLayout>
        {children}
      </ClientSearchLayout>
  );
}
