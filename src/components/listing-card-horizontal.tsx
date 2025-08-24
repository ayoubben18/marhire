
import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { MapPin, User, Cog, Snowflake, Droplet, Bolt, Car, Fuel, Shield, Check, ShieldCheck, Route, Anchor, Users, Briefcase, Languages, UserCheck, BarChart, Zap, MessageSquare, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import type { Listing, SearchParams as SearchParamsType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { StarRating } from './star-rating';
import { ListingCardHorizontalSkeleton } from './listing-card-horizontal-skeleton';
import { ClientOnly } from './client-only';

type ListingCardProps = {
  listing: Listing;
  searchParams: SearchParamsType;
};

const SpecTag = ({ icon: Icon, label }: { icon: React.ElementType; label: string | undefined }) => (
  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
    <Icon className="h-4 w-4" />
    <span>{label}</span>
  </div>
);

const PolicyBadge = ({
  icon: Icon,
  label,
  tooltip,
  variant,
}: {
  icon: React.ElementType;
  label: string;
  tooltip: string;
  variant: 'cancellation' | 'verified' | 'no-deposit';
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge
          variant="outline"
          className={cn('gap-1.5 font-medium', {
            'border-green-600/50 bg-green-500/10 text-green-700': variant === 'cancellation',
            'border-primary/50 bg-primary/10 text-primary': variant === 'verified',
             'border-blue-600/50 bg-blue-500/10 text-blue-700': variant === 'no-deposit',
          })}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Badge>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

function ListingCardHorizontalClient({ listing, searchParams }: ListingCardProps) {
    const { id, name, type, image, provider, location, specs, badges, price } = listing;
    const [whatsAppHref, setWhatsAppHref] = React.useState('');
    
    React.useEffect(() => {
        const getWhatsAppMessage = () => {
            const listingUrl = `${window.location.origin}/listing/${id}`;
            const message = `Hi MarHire team,\nI’m interested in the following listing:\nListing Title: ${name}\nListing Link: ${listingUrl}\nCould you please confirm availability, price, and provide any additional details?\n(Please do NOT modify this message)`;
            return encodeURIComponent(message);
        }
        setWhatsAppHref(`https://wa.me/212660745055?text=${getWhatsAppMessage()}`);
    }, [id, name]);

  const getPriceLabel = () => {
    switch (type) {
      case 'Car Rental':
        return (
          <p className="text-xl font-bold text-foreground">€{price.perDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
        );
      case 'Boat':
        if (price.perHour) {
          return (
            <p className="text-xl font-bold text-foreground">€{price.perHour}<span className="text-sm font-normal text-muted-foreground">/hour</span></p>
          );
        }
        return ( // Fallback for boats if perHour is not set
          <p className="text-xl font-bold text-foreground">€{price.perDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
        );
      case 'Activity':
        return (
            <p className="text-xl font-bold text-foreground">€{price.perDay}<span className="text-sm font-normal text-muted-foreground">/person</span></p>
        );
      case 'Private Driver':
         if (price.perTrip) {
          return (
            <p className="text-xl font-bold text-foreground">€{price.perTrip}<span className="text-sm font-normal text-muted-foreground">/trip</span></p>
          );
        }
        return ( // Fallback for drivers
          <p className="text-xl font-bold text-foreground">€{price.perDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
        );
      default:
        return (
            <p className="text-xl font-bold text-foreground">€{price.perDay}<span className="text-sm font-normal text-muted-foreground">/day</span></p>
        );
    }
  }
  
  const renderCarSpecs = () => (
    <>
      <SpecTag icon={User} label={`${specs.seats} Seats`} />
      <SpecTag icon={Cog} label={specs.transmission} />
      <SpecTag icon={specs.fuelType === 'Electric' ? Bolt : Droplet} label={specs.fuelType} />
      {specs.hasAc && <SpecTag icon={Snowflake} label="A/C" />}
      <SpecTag icon={Fuel} label={specs.fuelPolicy} />
      <SpecTag icon={Route} label={`${specs.kmPolicy} Km`} />
    </>
  );

  const renderBoatSpecs = () => (
    <>
      <SpecTag icon={Anchor} label={specs.captain} />
      <SpecTag icon={Users} label={`${specs.seats} capacity`} />
    </>
  );

  const renderDriverSpecs = () => (
    <>
      <SpecTag icon={Users} label={`${specs.seats} passengers`} />
      <SpecTag icon={Briefcase} label={`${specs.luggage} luggage`} />
      <SpecTag icon={Languages} label={specs.languages?.join(', ')} />
    </>
  );

  const renderActivitySpecs = () => (
    <>
      <SpecTag icon={UserCheck} label={specs.activityType} />
      <SpecTag icon={BarChart} label={`${specs.difficulty} difficulty`} />
    </>
  );
  
  const renderSpecs = () => {
    switch (type) {
      case 'Car Rental': return renderCarSpecs();
      case 'Boat': return renderBoatSpecs();
      case 'Private Driver': return renderDriverSpecs();
      case 'Activity': return renderActivitySpecs();
      default: return null;
    }
  }

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if(whatsAppHref) {
      window.open(whatsAppHref, '_blank', 'noopener,noreferrer');
    }
  };
  
  const urlSearchParams = new URLSearchParams(searchParams as any);
  const listingUrl = `/listing/${id}?${urlSearchParams.toString()}`;

  return (
    <Link href={listingUrl} className="block group">
        <Card className="w-full overflow-hidden rounded-lg shadow-sm transition-all hover:shadow-lg bg-card flex flex-col sm:flex-row">
        <CardContent className="p-0 flex flex-col sm:flex-row flex-1">
            <div className="relative h-48 sm:h-auto sm:w-[250px] md:w-[300px] w-full flex-shrink-0">
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint="car rental"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 300px, 250px"
            />
            </div>
            <div className="flex flex-1 flex-col p-4 md:p-6">
                <div className='flex justify-between items-start'>
                    <div className="flex-1 pr-4">
                        <Badge className="mb-1 text-xs w-fit chip">{type}</Badge>
                        <h3 className="font-headline text-lg font-bold leading-tight text-foreground">
                            {name}
                            {type === 'Car Rental' && <span className="text-sm font-normal text-muted-foreground"> or similar</span>}
                        </h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>{location.city}, Morocco</span>
                        </div>
                    </div>
                     <div className="flex-shrink-0 flex flex-col items-end">
                       <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
                         <AvatarImage src={provider.logo} alt={provider.name} data-ai-hint="company logo" />
                         <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                       </Avatar>
                     </div>
                </div>
                
                <div className="my-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                {renderSpecs()}
                </div>

                <div className="flex flex-wrap gap-2">
                {badges.freeCancellation && (
                    <PolicyBadge
                    icon={Check}
                    label="Free Cancellation"
                    tooltip="Cancel for free up to 48 hours before pickup."
                    variant="cancellation"
                    />
                )}
                 {badges.noDeposit && (
                    <PolicyBadge
                        icon={Shield}
                        label="No Deposit"
                        tooltip="No deposit option is available for this listing "
                        variant="no-deposit"
                    />
                )}
                {provider.isVerified && (
                    <PolicyBadge
                    icon={ShieldCheck}
                    label="Verified Partner"
                    tooltip="This partner is verified by MarHire for quality and reliability."
                    variant="verified"
                    />
                )}
                </div>

                <div className="mt-auto flex items-end justify-between pt-3">
                <div className="sm:hidden">
                    <p className="text-xs text-muted-foreground">Start from</p>
                    {getPriceLabel()}
                </div>
                 <div className="hidden sm:block text-right">
                        <p className="text-xs text-muted-foreground">Start from</p>
                        {getPriceLabel()}
                    </div>
                <div className="flex items-center gap-2">
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="icon" className="bg-green-500 hover:bg-green-600 rounded-lg h-11 w-11" disabled={!whatsAppHref} onClick={handleWhatsAppClick}>
                                <MessageSquare className="h-6 w-6 text-white" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Inquire on WhatsApp</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button size="lg" className="rounded-lg h-11 text-base">Book Now</Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Proceed to booking</p>
                        </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
                </div>
            </div>
        </CardContent>
        </Card>
    </Link>
  );
}


export function ListingCardHorizontal(props: ListingCardProps) {
  return (
    <ClientOnly>
      <ListingCardHorizontalClient {...props} />
    </ClientOnly>
  );
}
