
import * as React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';

export function ListingCardHorizontalSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardContent className="p-0">
        <div className="flex">
          <Skeleton className="h-auto w-2/5" />
          <div className="flex-1 p-4 sm:p-6">
            <div className="space-y-2 mb-4">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-32" />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
             <div className="mt-4 flex flex-wrap gap-2">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
            <div className="mt-auto flex items-end justify-between pt-6">
              <div className="space-y-1">
                <Skeleton className="h-7 w-24" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-12 w-32 rounded-lg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
