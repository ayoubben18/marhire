
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';

function ScrollToTop() {
    const pathname = usePathname();
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
