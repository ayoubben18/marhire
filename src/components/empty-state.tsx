"use client"

import * as React from 'react'
import { Car, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

type EmptyStateProps = {
  resetFilters: () => void;
}

export function EmptyState({ resetFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed bg-card p-12 text-center mt-6">
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Search className="h-8 w-8 text-primary" />
      </div>
      <h3 className="font-headline mt-4 text-xl font-semibold">No results found</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Try adjusting your search or filters to find what you're looking for.
      </p>
      <Button onClick={resetFilters} className="mt-6">
        Clear All Filters
      </Button>
    </div>
  )
}
