"use client"

import * as React from 'react'
import { Star, StarHalf, StarOff } from 'lucide-react'
import { cn } from '@/lib/utils'

type StarRatingProps = {
  rating: number
  totalStars?: number
  className?: string
  iconSize?: number
}

export function StarRating({ rating, totalStars = 5, className, iconSize=16 }: StarRatingProps) {
  const fullStars = Math.floor(rating)
  const halfStar = rating % 1 >= 0.5 ? 1 : 0
  const emptyStars = totalStars - fullStars - halfStar

  return (
    <div className={cn('flex items-center gap-0.5 text-amber-500', className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} size={iconSize} className="fill-current" />
      ))}
      {halfStar === 1 && <StarHalf size={iconSize} className="fill-current" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} size={iconSize} className="text-gray-300" />
      ))}
    </div>
  )
}
