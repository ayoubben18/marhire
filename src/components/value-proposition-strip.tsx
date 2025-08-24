import * as React from 'react';
import { Award, ShieldCheck, Tag, Sparkles, CircleDollarSign } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const propositions = [
  { icon: Award, text: 'Explore Morocco with Verified Local Experts' },
  { icon: ShieldCheck, text: 'Trusted Local Partners' },
  { icon: Tag, text: 'No Hidden Fees' },
  { icon: Sparkles, text: 'Instant Booking' },
  { icon: CircleDollarSign, text: 'No Deposit' },
];

export function ValuePropositionStrip() {
  return (
    <div className="bg-primary/5 border-b">
      <div className="container py-3">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2">
            {propositions.map((prop, index) => (
                <div key={index} className="flex items-center gap-2 text-sm font-medium text-primary">
                    <prop.icon className="h-4 w-4" />
                    <span>{prop.text}</span>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
