"use client";

import * as React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type StarRatingFilterProps = {
  rating: number;
  setRating: (rating: number) => void;
};

export function StarRatingFilter({ rating, setRating }: StarRatingFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Tooltip key={star}>
              <TooltipTrigger asChild>
                <div>
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn("h-10 w-10 rounded-lg", {
                      "bg-primary/10 border-primary text-primary": rating >= star,
                    })}
                    onClick={() => setRating(rating === star ? 0 : star)}
                  >
                    <Star
                      className={cn('h-5 w-5', {
                        'fill-current': rating >= star,
                      })}
                    />
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{star} star{star > 1 ? 's' : ''}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <span className="ml-2 text-sm text-muted-foreground">{rating > 0 ? `${rating} stars & up` : 'Any'}</span>
    </div>
  );
}
