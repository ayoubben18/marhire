import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

function PartnerHeroSkeleton() {
  return (
    <div className="relative w-full bg-primary/5 pt-12 pb-10 md:pt-20 md:pb-16">
      <div className="container relative">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-3">
          <div className="flex justify-center md:justify-start">
            <Skeleton className="h-32 w-32 rounded-2xl" />
          </div>
          <div className="text-center md:col-span-2 md:text-left space-y-3">
            <Skeleton className="h-5 w-48 mx-auto md:mx-0" />
            <Skeleton className="h-10 w-3/4 mx-auto md:mx-0" />
            <Skeleton className="h-6 w-1/3 mx-auto md:mx-0" />
            <div className="flex flex-wrap justify-center gap-2 md:justify-start pt-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
            </div>
          </div>
        </div>
         <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Skeleton className="h-12 w-full sm:w-56" />
            <Skeleton className="h-12 w-full sm:w-48" />
        </div>
      </div>
    </div>
  );
}

function KeyBadgesSkeleton() {
    return (
        <div className="border-y bg-background">
            <div className="container py-4">
                <div className="grid grid-cols-2 justify-center gap-x-4 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2">
                            <Skeleton className="h-6 w-6 rounded-full" />
                            <Skeleton className="h-4 w-24" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function ListingsGridSkeleton() {
    return (
        <div className="container py-12">
             <Skeleton className="h-10 w-64 mx-auto mb-8" />
             <div className="flex justify-center mb-8">
                <Skeleton className="h-10 w-[400px] rounded-lg" />
             </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {Array.from({ length: 4 }).map((_, i) => (
                    <Card key={i} className="rounded-2xl overflow-hidden">
                        <CardContent className="p-0">
                            <Skeleton className="aspect-[3/2] w-full" />
                            <div className="p-4 space-y-3">
                                <Skeleton className="h-5 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                                <div className="flex justify-between items-end pt-4">
                                     <div className="space-y-2">
                                        <Skeleton className="h-4 w-12" />
                                        <Skeleton className="h-6 w-20" />
                                     </div>
                                     <Skeleton className="h-9 w-24 rounded-md" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                 ))}
            </div>
        </div>
    )
}

export default function PartnerLoading() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
        <AppHeader />
        <main className="flex-1">
            <PartnerHeroSkeleton />
            <KeyBadgesSkeleton />
            <ListingsGridSkeleton />
        </main>
    </div>
  );
}