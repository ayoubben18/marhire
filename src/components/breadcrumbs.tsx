
"use client";

import * as React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

type BreadcrumbItem = {
    label: string;
    href: string;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {

    return (
        <nav aria-label="Breadcrumb" className={cn("text-xs text-muted-foreground", className)}>
            <ol className="flex items-center space-x-1 justify-center">
                {items.map((item, index) => (
                    <li key={index} className="flex items-center">
                        {index > 0 && (
                            <ChevronRight className="h-3 w-3 shrink-0 mx-1" />
                        )}
                        <Link
                            href={item.href}
                            className={cn(
                                'transition-colors hover:text-primary',
                                index === items.length - 1 ? 'font-medium text-foreground pointer-events-none' : ''
                            )}
                            aria-current={index === items.length - 1 ? 'page' : undefined}
                        >
                           {index === 0 ? <Home className="h-3 w-3 shrink-0" /> : item.label}
                           {index === 0 && <span className="ml-1.5 sr-only">{item.label}</span>}
                        </Link>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
