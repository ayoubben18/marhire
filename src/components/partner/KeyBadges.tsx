
import * as React from 'react';
import { Handshake, ShieldCheck, Plane, Fuel, UserCheck, Tag, Languages, LifeBuoy, Anchor, Shield, Clock, Sun, Users, Star, CheckSquare } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import type { Partner, Category } from '@/lib/partners';

const carFeatures = [
    { icon: ShieldCheck, text: "No-Deposit Options", description: "Available on selected cars with a small surcharge." },
    { icon: Plane, text: "Airport Delivery", description: "Car can be delivered to the airport terminal." },
    { icon: Fuel, text: "Same-to-Same Fuel", description: "Return the car with the same fuel level you received it with." },
    { icon: Handshake, text: "24/7 Road Support", description: "Roadside assistance is available around the clock." },
];

const driverFeatures = [
    { icon: Plane, text: "Airport Meet & Greet", description: "Your driver will wait for you in the arrivals hall." },
    { icon: Tag, text: "Fixed Transparent Pricing", description: "The price you see is the price you pay for the trip." },
    { icon: Languages, text: "Multilingual Drivers", description: "Professional drivers who speak multiple languages." },
    { icon: LifeBuoy, text: "24/7 Support via MarHire", description: "Our central support team is always available to help." },
];

const boatFeatures = [
    { icon: Anchor, text: "Captain & Crew Included", description: "An experienced captain and crew are included for your safety." },
    { icon: Shield, text: "All Safety Equipment", description: "Life jackets and all required safety gear are on board." },
    { icon: Clock, text: "Flexible Rental Hours", description: "Book for a few hours, a half-day, or a full-day adventure." },
    { icon: Sun, text: "Weather Guarantee", description: "Reschedule for free or get a full refund for bad weather." },
];

const activityFeatures = [
    { icon: UserCheck, text: "Official Licensed Guides", description: "Activities are led by knowledgeable and certified local guides." },
    { icon: Users, text: "Small Group or Private", description: "Choose between intimate private tours or sociable small groups." },
    { icon: Star, text: "Top-Rated Experiences", description: "Curated activities highly rated by fellow travelers." },
    { icon: CheckSquare, text: "Instant Confirmation", description: "Book your spot instantly and receive your voucher." },
];


const getFeaturesForCategory = (category: Category) => {
    switch(category) {
        case 'Cars':
            return carFeatures;
        case 'Private Drivers':
            return driverFeatures;
        case 'Boats':
            return boatFeatures;
        case 'Activities':
            return activityFeatures;
        default:
            return [];
    }
}


export function KeyBadges({ partner }: { partner: Partner }) {
  const features = getFeaturesForCategory(partner.category);

  if (features.length === 0) {
      return null;
  }

  return (
    <div className="border-y bg-background">
      <div className="container py-4">
        <div className="grid grid-cols-2 justify-center gap-x-4 gap-y-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4">
          {features.map((feature, index) => (
             <TooltipProvider key={index}>
              <Tooltip>
                <TooltipTrigger asChild>
                    <div className="flex flex-col items-center gap-2 text-center text-sm font-medium text-muted-foreground">
                        <feature.icon className="h-6 w-6 text-primary" />
                        <span>{feature.text}</span>
                    </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{feature.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>
      </div>
    </div>
  );
}
