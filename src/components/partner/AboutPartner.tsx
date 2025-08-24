
import * as React from 'react';
import type { Partner } from '@/lib/partners';
import { Info } from 'lucide-react';
import { Section } from './Section';

export function AboutPartner({ partner }: { partner: Partner }) {
  if (!partner.shortAbout) return null;

  return (
    <Section
        icon={Info}
        title="About our partner"
    >
        <div className="prose max-w-none dark:prose-invert text-muted-foreground">
            <p>{partner.shortAbout}</p>
        </div>
    </Section>
  );
}
