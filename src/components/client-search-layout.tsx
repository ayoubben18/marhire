
"use client"

import * as React from 'react';
import { SlidersHorizontal } from 'lucide-react';
import { AppHeader } from '@/components/app-header';
import { Filters } from '@/components/filters';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useRouter, usePathname } from 'next/navigation';
import type { SearchCategory } from '@/lib/types';
import { ScrollArea } from './ui/scroll-area';
import { SearchTabs } from './search-tabs';

const CATEGORY_MAP: Record<string, SearchCategory> = {
    'cars': 'car-rental',
    'private-drivers': 'private-driver',
    'boats': 'boats',
    'activities': 'activities',
};


export function ClientSearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const pathname = usePathname();

  const categorySlug = pathname.split('/')[2] || '';
  const category = categorySlug ? CATEGORY_MAP[categorySlug] : undefined;

  
  const resetFilters = () => {
    router.push(pathname, { scroll: false });
  };

  const filtersComponent = (
    <Filters category={category} />
  );

  return (
     <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <div className="container flex-1 py-6">
        <div className="mb-6">
            <SearchTabs fixedCategory={categorySlug} />
        </div>
        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
             <div className="sticky top-20 bg-card rounded-lg shadow-sm border">
                <div className="flex items-center justify-between border-b p-4">
                  <h2 className="font-headline text-lg font-semibold">Filters</h2>
                  <Button variant="link" size="sm" onClick={resetFilters} className="text-sm">Reset All</Button>
                </div>
                <ScrollArea className="h-[calc(100vh-12rem)]">
                  {filtersComponent}
                </ScrollArea>
              </div>
          </aside>
          <main className="lg:col-span-3">
            <div className="lg:hidden mb-4">
              <Sheet>
                  <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                      <SlidersHorizontal className="mr-2 h-4 w-4" />
                      Show Filters
                  </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[320px] p-0 bg-card">
                  <SheetHeader className="p-4 border-b flex flex-row items-center justify-between space-y-0">
                      <SheetTitle>Filters</SheetTitle>
                      <Button variant="link" size="sm" onClick={resetFilters} className="text-sm h-auto p-0">Reset All</Button>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-4rem)]">
                    {filtersComponent}
                  </ScrollArea>
                  </SheetContent>
              </Sheet>
            </div>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
