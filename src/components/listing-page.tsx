

"use client";

import * as React from 'react';
import Image from 'next/image';
import { MapPin, User, Cog, Snowflake, Droplet, Bolt, Fuel, Route, Anchor, Users, Briefcase, Languages, UserCheck, BarChart, Check, ShieldCheck, Award, FileText, ClipboardList, Info, MessageSquare, X, ChevronDown, Eye, Star, HeartHandshake, ArrowLeft, ArrowRight, Grid3x3 } from 'lucide-react';
import type { Listing, SearchParams } from '@/lib/types';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { BookingCard } from './booking-card';
import { Separator } from './ui/separator';
import { ListingCard } from './listing-card';
import { MOCK_LISTINGS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Breadcrumbs } from './breadcrumbs';


const SpecItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string | number | null }) => {
    if (!value) return null;
    return (
        <div className="flex items-center gap-3">
            <Icon className="h-6 w-6 text-primary flex-shrink-0" />
            <div>
                <p className="text-sm text-muted-foreground">{label}</p>
                <p className="font-semibold text-foreground text-base">{value}</p>
            </div>
        </div>
    );
};

const Section = ({ icon: Icon, title, children, className }: { icon: React.ElementType, title: string, children: React.ReactNode, className?: string }) => (
    <div className={cn("py-8", className)}>
        <div className="flex items-center gap-3 mb-6">
            <Icon className="h-6 w-6 text-primary" />
            <h2 className="font-headline text-2xl font-bold">{title}</h2>
        </div>
        <div className="text-muted-foreground prose max-w-none dark:prose-invert">
            {children}
        </div>
    </div>
);

const CarSpecs = ({ specs }: { specs: Listing['specs'] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
        <SpecItem icon={User} label="Seats" value={specs.seats} />
        <SpecItem icon={Cog} label="Transmission" value={specs.transmission} />
        <SpecItem icon={specs.fuelType === 'Electric' ? Bolt : Droplet} label="Fuel Type" value={specs.fuelType} />
        {specs.hasAc && <SpecItem icon={Snowflake} label="A/C" value="Available" />}
        <SpecItem icon={Fuel} label="Fuel Policy" value={specs.fuelPolicy} />
        <SpecItem icon={Route} label="Mileage" value={`${specs.kmPolicy} Km`} />
    </div>
);

const DriverSpecs = ({ specs }: { specs: Listing['specs'] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
        <SpecItem icon={Users} label="Passengers" value={specs.seats} />
        <SpecItem icon={Briefcase} label="Luggage" value={specs.luggage} />
        <SpecItem icon={Languages} label="Languages" value={specs.languages?.join(', ')} />
    </div>
);

const BoatSpecs = ({ specs }: { specs: Listing['specs'] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
        <SpecItem icon={Users} label="Capacity" value={specs.seats} />
        <SpecItem icon={Anchor} label="Captain" value={specs.captain} />
    </div>
);

const ActivitySpecs = ({ specs }: { specs: Listing['specs'] }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-6">
        <SpecItem icon={UserCheck} label="Type" value={specs.activityType} />
        <SpecItem icon={BarChart} label="Difficulty" value={specs.difficulty} />
    </div>
);

const ImageGallery = ({ listing }: { listing: Listing }) => {
    const images = [listing.image, ...(listing.gallery || [])].filter(Boolean);
    const totalImages = images.length;
    const [open, setOpen] = React.useState(false);
    const [api, setApi] = React.useState<CarouselApi>();
    const [startIndex, setStartIndex] = React.useState(0);

    const openModal = (index: number) => {
        setStartIndex(index);
        setOpen(true);
    };
    
    React.useEffect(() => {
        if (open && api) {
            api.scrollTo(startIndex, true);
        }
    }, [open, api, startIndex]);

    const renderGrid = () => {
        if (totalImages === 0) {
            return (
                <div className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-2xl bg-muted flex items-center justify-center">
                    <p className="text-muted-foreground">No images available</p>
                </div>
            );
        }

        if (totalImages === 1) {
            return (
                <div onClick={() => openModal(0)} className="relative h-[300px] md:h-[450px] w-full overflow-hidden rounded-2xl group cursor-pointer">
                    <Image src={images[0]} alt={listing.name} fill className="object-cover rounded-2xl" data-ai-hint="service showcase" />
                </div>
            );
        }
        
        if (totalImages > 1 && totalImages < 5) {
            const gridClass = `grid-cols-${Math.min(totalImages, 3)} grid-rows-1`;
            return (
                 <div className={`relative grid ${gridClass} gap-2 h-[300px] md:h-[450px] overflow-hidden rounded-2xl`}>
                     {images.slice(0, 4).map((img, index) => (
                        <div key={index} onClick={() => openModal(index)} className="relative h-full w-full group cursor-pointer">
                            <Image src={img} alt={`${listing.name} gallery image ${index + 1}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="service showcase thumb" />
                        </div>
                    ))}
                 </div>
            )
        }

        return (
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-2 h-[300px] md:h-[450px] overflow-hidden rounded-2xl group">
                {/* Main Image */}
                <div onClick={() => openModal(0)} className="relative h-full w-full cursor-pointer">
                    <Image src={images[0]} alt={listing.name} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="service showcase main" />
                </div>
                {/* Grid for smaller images */}
                <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2">
                    {images.slice(1, 5).map((img, index) => (
                        <div key={index} onClick={() => openModal(index+1)} className="relative h-full w-full cursor-pointer">
                            <Image src={img} alt={`${listing.name} gallery image ${index + 2}`} fill className="object-cover transition-transform duration-300 group-hover:scale-105" data-ai-hint="service showcase thumb" />
                        </div>
                    ))}
                </div>
                {/* Overlay and button */}
                <div onClick={() => openModal(0)} className="absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100 cursor-pointer">
                    <div className="absolute bottom-4 right-4">
                        <Button variant="secondary" className="transition-transform group-hover:scale-105">
                            <Grid3x3 className="mr-2 h-4 w-4" />
                            Show all photos
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {renderGrid()}
            <DialogContent className="max-w-5xl p-0 bg-transparent border-0 h-[90vh]">
                 <DialogTitle className="sr-only">Image gallery for {listing.name}</DialogTitle>
                <Carousel setApi={setApi} className="w-full h-full" opts={{ loop: true, startIndex: startIndex }}>
                    <CarouselContent className="h-full">
                        {images.map((img, index) => (
                            <CarouselItem key={index} className="h-full">
                                <div className="relative w-full h-full flex items-center justify-center p-2">
                                    <Image src={img} alt={`${listing.name} gallery image ${index + 1}`} width={1200} height={800} className="rounded-xl object-contain h-full w-auto" data-ai-hint="service showcase modal" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10" />
                    <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 h-10 w-10" />
                </Carousel>
            </DialogContent>
        </Dialog>
    );
};


const InclusionsExclusions = ({ listing }: { listing: Listing }) => {
    const commonIncluded = ["24/7 WhatsApp Support", "Local Taxes"];
    const getSpecificInclusions = () => {
        switch(listing.type) {
            case 'Car Rental':
                return [
                    "Basic Collision Damage Waiver (CDW)",
                    "Third-Party Liability Insurance (TPL)",
                    `${listing.specs.kmPolicy} Mileage`,
                    "24/7 Roadside Assistance",
                    listing.badges.freeCancellation && "Free Cancellation up to 48h",
                ].filter(Boolean) as string[];
            case 'Private Driver':
                return ["Professional Licensed Driver", "Fuel & Vehicle Costs", "Airport Meet & Greet"];
            case 'Boat':
                return [
                    listing.specs.captain === "With Captain" && "Captain & Crew",
                    "Safety Equipment (Life Vests)",
                    "Basic Fuel Allowance"
                ].filter(Boolean) as string[];
            case 'Activity':
                 return ["Professional Licensed Guide", "All Necessary Equipment", "Hotel Pickup & Drop-off (selected areas)"];
            default:
                return [];
        }
    }
    const allIncluded = [...getSpecificInclusions(), ...commonIncluded];

    const getExclusions = () => {
        switch(listing.type) {
            case 'Car Rental':
                return ["Fuel (return with same level)", "Tolls & Parking Fees", "Young Driver Surcharge", "One-way Rental Fees (if applicable)"];
            case 'Private Driver':
                return ["Gratuity for the driver", "Entry fees to attractions", "Meals & Driver Accommodation (on multi-day trips)"];
            case 'Boat':
                return ["Food and Beverages", "Gratuity for the crew", "Port fees for special destinations"];
            case 'Activity':
                return ["Meals and Drinks", "Gratuity for the guide", "Souvenirs or Personal Expenses"];
            default:
                return [];
        }
    }
    const allExcluded = getExclusions();

    return (
        <div>
            <h3 className="font-headline text-lg font-semibold mt-4 mb-2 text-foreground not-prose">What's Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {allIncluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 no-underline">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <h3 className="font-headline text-lg font-semibold mt-6 mb-2 text-foreground not-prose">What's Not Included</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {allExcluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-3 no-underline">
                        <X className="h-5 w-5 text-destructive flex-shrink-0" />
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

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
            <p className={cn(!isExpanded && "relative after:absolute after:bottom-0 after:left-0 after:h-12 after:w-full after:bg-gradient-to-t after:from-background after:to-transparent")}>
                {displayText}
            </p>
            <Button variant="link" onClick={toggleExpanded} className="p-0 font-bold text-base">
                {isExpanded ? 'Read Less' : 'Read More'}
                <ChevronDown className={cn("ml-1 h-5 w-5 transition-transform", isExpanded && "rotate-180")} />
            </Button>
        </div>
    );
};

const longDescriptionText = "Embark on an unforgettable journey with our premium Renault Clio, the perfect companion for navigating the vibrant streets of Marrakech and the scenic routes of Morocco. This vehicle is meticulously maintained to ensure your safety and comfort, offering a smooth and reliable driving experience. Whether you're planning a city tour, a coastal drive, or an adventure into the Atlas Mountains, the Clio's efficient fuel consumption and compact size make it an ideal choice. \n\n Our rental package is designed for your peace of mind. It includes comprehensive insurance with a standard excess, 24/7 roadside assistance, and unlimited kilometers, giving you the freedom to explore without limits. We believe in transparent pricing, so there are no hidden fees. The price you see is the price you pay. For your convenience, we offer flexible pickup and drop-off options, including at the airport, your hotel, or our city office. We also provide add-ons such as child seats and GPS navigation systems to cater to all your travel needs. Our dedicated team is available around the clock via WhatsApp to assist you with any queries or support you may require during your rental period. Book with us and experience a hassle-free car rental service that prioritizes your satisfaction and safety.";

const WhyBookWithUs = () => {
    const items = [
        { icon: ShieldCheck, text: "Verified & Trusted Local Partner" },
        { icon: Award, text: "Top-Rated for Quality & Service" },
        { icon: MessageSquare, text: "24/7 WhatsApp Support Included" },
        { icon: Check, text: "Instant Booking Confirmation" },
    ];
    return (
        <ul className="space-y-3">
            {items.map((item, index) => (
                 <li key={index} className="flex items-center gap-3 no-underline">
                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium text-base text-foreground">{item.text}</span>
                </li>
            ))}
        </ul>
    )
}

const getCategoryInfo = (type: string) => {
    switch (type) {
        case 'Car Rental': return { label: 'Cars', href: '/search/cars' };
        case 'Private Driver': return { label: 'Private Drivers', href: '/search/private-drivers' };
        case 'Boat': return { label: 'Boats', href: '/search/boats' };
        case 'Activity': return { label: 'Activities', href: '/search/activities' };
        default: return { label: 'Search', href: '/search' };
    }
}

export function ListingPage({ listing, searchParams }: { listing: Listing; searchParams?: SearchParams }) {
    const { name, type, image, provider, location, specs, badges } = listing;

    const renderSpecs = () => {
        switch (type) {
            case 'Car Rental': return <CarSpecs specs={specs} />;
            case 'Private Driver': return <DriverSpecs specs={specs} />;
            case 'Boat': return <BoatSpecs specs={specs} />;
            case 'Activity': return <ActivitySpecs specs={specs} />;
            default: return null;
        }
    };

    const similarListings = MOCK_LISTINGS.filter(l => l.type === listing.type && l.id !== listing.id).slice(0, 8);
    
    const categoryInfo = getCategoryInfo(listing.type);
    const breadcrumbItems = [
      { label: 'Home', href: '/' },
      { label: categoryInfo.label, href: categoryInfo.href },
      { label: listing.name, href: `/listing/${listing.id}` }
    ];

    return (
        <>
            <div className="container pt-4 pb-8 md:pb-12">
                <Breadcrumbs items={breadcrumbItems} />

                <div className="flex items-start justify-between gap-4 my-6">
                   <div className="flex-1">
                        <Badge>{type}</Badge>
                        <h1 className="font-headline text-3xl md:text-4xl font-bold">{name}</h1>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mt-2">
                            <div className="flex items-center gap-1.5">
                                <MapPin className="h-5 w-5" />
                                <span>{location.city}, Morocco</span>
                            </div>
                        </div>
                   </div>
               </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    
                    <div className="lg:col-span-3 space-y-8">
                       
                        <ImageGallery listing={listing} />

                        <div className="flex items-center gap-4 py-6 border-y">
                            <Avatar className="h-14 w-14 border flex-shrink-0">
                                <AvatarImage src={provider.logo} alt={provider.name} data-ai-hint="company logo" />
                                <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                {provider.isVerified && (
                                    <p className="text-foreground font-semibold flex items-center gap-1.5"><ShieldCheck className="h-5 w-5 text-primary" /> Hosted by a verified partner</p>
                                )}
                            </div>
                        </div>
                        
                        <div className="lg:hidden">
                            <BookingCard listing={listing} searchParams={searchParams} />
                        </div>
                        
                        <Section icon={ClipboardList} title="Specifications">
                            <div className="not-prose">
                                {renderSpecs()}
                            </div>
                        </Section>
                        <Separator />

                        <Section icon={HeartHandshake} title="Why Book With Us">
                           <WhyBookWithUs />
                        </Section>
                        <Separator />

                         <Section icon={Info} title="Overview">
                            <LongDescription text={longDescriptionText.substring(0, 500)} />
                        </Section>
                        <Separator />

                        <Section icon={FileText} title="Booking Terms">
                             <p>Please read our full <a href="/legal/terms" className="underline">Terms & Conditions</a> and <a href="/legal/cancellation" className="underline">Cancellation Policy</a>. A valid ID and driving license (for vehicle rentals) are required. International Driving Permit may be required for non-EU/US licenses.</p>
                        </Section>
                        <Separator />

                        <Section icon={Award} title="Special Notes">
                            <p>This partner offers airport pickup and drop-off. Please provide your flight number during checkout. For any special requests, please use the 'Additional Notes' field or contact us on WhatsApp.</p>
                        </Section>
                        <Separator />
                        
                        <Section icon={ClipboardList} title="What's Included and not included">
                            <InclusionsExclusions listing={listing} />
                        </Section>
                        <Separator />

                        <Section icon={Star} title="From Our Partner">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-14 w-14 border">
                                    <AvatarImage src={provider.logo} alt={provider.name} data-ai-hint="company logo" />
                                    <AvatarFallback>{provider.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <blockquote className="border-l-4 border-primary pl-4 italic">
                                    "We are delighted to welcome you and ensure you have an exceptional experience exploring the beauty of Morocco. Our team is committed to providing top-quality service and reliable vehicles."
                                </blockquote>
                            </div>
                        </Section>
                        <Separator />
                        
                        <Section icon={Info} title="Description">
                            <LongDescription text={longDescriptionText} />
                        </Section>

                    </div>
                    
                    <aside className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-24 space-y-6">
                            <BookingCard listing={listing} searchParams={searchParams} />
                        </div>
                    </aside>
                </div>
            </div>
            
            <div className="bg-primary/5">
                <div className="container py-8 md:py-12">
                    <div className="flex items-center gap-3 mb-6">
                        <ClipboardList className="h-6 w-6 text-primary" />
                        <h2 className="font-headline text-2xl font-bold">Compare Similar Listings</h2>
                    </div>
                   <div className="not-prose relative">
                         <Carousel opts={{ align: "start", loop: false }} className="w-full">
                            <CarouselContent className="-ml-2 md:-ml-4">
                                {similarListings.map(listing => (
                                    <CarouselItem key={listing.id} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 pl-2 md:pl-4">
                                        <div className="p-1 h-full">
                                            <ListingCard listing={listing} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                             <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                            <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md hidden md:flex" />
                        </Carousel>
                   </div>
                </div>
            </div>
        </>
    );
}
