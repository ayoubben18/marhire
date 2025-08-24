
'use client';

import * as React from 'react';
import type { Partner } from '@/lib/partners';
import { Info, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Section } from './Section';

const LongDescription = ({ text }: { text: string }) => {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const TRUNCATE_LENGTH = 400;

    const toggleExpanded = () => setIsExpanded(!isExpanded);

    const displayText = isExpanded ? text : `${text.substring(0, TRUNCATE_LENGTH)}...`;

    if (text.length <= TRUNCATE_LENGTH) {
        return <p>{text}</p>;
    }

    return (
        <div>
            <div className={cn("prose max-w-none dark:prose-invert text-muted-foreground space-y-4", !isExpanded && "relative after:absolute after:bottom-0 after:left-0 after:h-16 after:w-full after:bg-gradient-to-t after:from-background after:to-transparent")}>
                <p>{displayText}</p>
            </div>
            <Button variant="link" onClick={toggleExpanded} className="p-0 font-bold text-base mt-2">
                {isExpanded ? 'Read Less' : 'Read More'}
                <ChevronDown className={cn("ml-1 h-5 w-5 transition-transform", isExpanded && "rotate-180")} />
            </Button>
        </div>
    );
};


export function MoreDetails({ partner }: { partner: Partner }) {
  return (
    <Section
        icon={Info}
        title="More details"
    >
        <LongDescription text={partner.longAbout} />
    </Section>
  );
}
