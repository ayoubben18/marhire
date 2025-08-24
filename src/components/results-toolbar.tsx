
"use client"

import * as React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { SortOption } from '@/lib/types'
import { cn } from '@/lib/utils'

type ResultsToolbarProps = {
  resultsCount: number;
  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;
};

const sortOptions: { value: SortOption, label: string }[] = [
  { value: 'recommended', label: 'Recommended' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];


export function ResultsToolbar({ resultsCount, sortBy, setSortBy }: ResultsToolbarProps) {
  return (
    <div className="mt-4 flex flex-col items-baseline justify-between gap-4 border-b pb-4 sm:flex-row sm:items-center">
      <p className="text-sm text-muted-foreground">
        <span className="font-bold text-foreground">{resultsCount}</span> results found
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Sort by:</span>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px] rounded-lg bg-background">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
