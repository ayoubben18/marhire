
import { cn } from "@/lib/utils";
import * as React from "react";

type SectionProps = {
    icon?: React.ElementType;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export function Section({ icon: Icon, title, children, className }: SectionProps) {
    return (
        <section className={cn("border-b", className)}>
            <div className="container py-12 md:py-16">
                 {title && (
                    <div className="flex items-center gap-3 mb-8">
                        {Icon && <Icon className="h-7 w-7 text-primary" />}
                        <h2 className="font-headline text-2xl font-bold md:text-3xl">
                           {title}
                        </h2>
                    </div>
                )}
                {children}
            </div>
        </section>
    )
}
