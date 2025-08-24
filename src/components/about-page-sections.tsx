
"use client";

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Award, ShieldCheck, MessageSquare, Briefcase, Star, Wallet, ArrowRight, Check, Phone, Mail, Globe, Navigation, Rocket, Expand, Package } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from './ui/tooltip';

const MoroccoFlagIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" className="h-5 w-5" aria-label="Morocco Flag">
    <rect width="900" height="600" fill="#c1272d"/>
    <path d="M450 214.24l-64.88 199.52h200.4l-165.2-123.32 99.36 189.56z" fill="none" stroke="#006233" strokeWidth="21.1"/>
  </svg>
);


export function AboutHero({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  return (
    <section id="intro" className="relative w-full py-20 md:py-32 bg-primary/5">
       <Image
        src="https://images.unsplash.com/photo-1503917988258-322abc8b3386?q=80&w=1980"
        alt="Scenic view of Morocco"
        fill
        className="object-cover opacity-10"
        data-ai-hint="morocco landscape"
      />
      <div className="container mx-auto text-center relative px-4 sm:px-6 lg:px-8">
        {breadcrumbs}
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-4">
          About MarHire
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Welcome to MarHire, your all-in-one travel companion in Morocco from the vibrant streets of Marrakech to the beaches of Agadir, the historic alleys of Fes, and beyond. We are more than just a travel platform. We are a bridge between curious travelers and the finest local experiences Morocco has to offer.
        </p>
      </div>
    </section>
  );
}

export function StoryAndVision() {
  return (
    <section id="story" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-8">
        <div className="space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Story & Vision</h2>
          <p className="text-lg text-muted-foreground">
             MarHire was founded by two engineers with a passion for travel who saw how hard it was to plan Morocco the right way: scattered providers, hidden fees, and uneven quality. We built MarHire to fix that one reliable place to book trusted local services at fair prices, with clear policies and real human support.
          </p>
          <blockquote className="border-l-4 border-primary pl-4 sm:pl-6 py-2">
            <p className="text-lg font-medium text-foreground italic">
              “Morocco’s best local experiences should be easily accessible to everyone without middlemen, confusion, or guesswork.”
            </p>
          </blockquote>
          <p className="text-lg text-muted-foreground">
             That vision guides everything we do. We verify every partner, standardize policies, and surface real availability across cars, private drivers, boats, and activities so you can compare options, book in minutes, and focus on your trip. Many rentals require no deposit, pricing is transparent, and support is multilingual (English/French/Arabic) and truly 24/7 via WhatsApp, phone, or email.
          </p>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden">
             <Image
                src="https://placehold.co/1200x800.png"
                alt="Founders of MarHire"
                fill
                className="object-cover"
                data-ai-hint="team photo"
             />
        </div>
      </div>
    </section>
  );
}

export function TimelineSection() {
    const timelineEvents = [
        { year: "2023", event: "Launched in Agadir, Morocco", icon: Rocket },
        { year: "2024", event: "Expanded nationwide", icon: Expand },
        { year: "2025", event: "Introduced boats, tours & more", icon: Package }
    ];

    return (
        <section id="timeline" className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Journey</h2>
                </div>
                <div className="relative max-w-3xl mx-auto">
                    <div className="absolute top-6 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
                    <div className="relative flex justify-between">
                        {timelineEvents.map((item, index) => (
                            <div key={index} className="relative flex flex-col items-center text-center w-1/3 px-2">
                                <div className="relative z-10 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-8 ring-primary/5">
                                    <item.icon className="h-6 w-6" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-headline text-lg sm:text-xl font-bold">{item.year}</h3>
                                    <p className="mt-1 text-muted-foreground text-sm">{item.event}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}


export function WhyChooseMarHire() {
    const features = [
        { icon: ShieldCheck, title: 'Verified Local Partners', description: 'All agencies are screened and approved.' },
        { icon: Wallet, title: 'Transparent Pricing', description: 'No hidden fees, clear policies.' },
        { icon: MessageSquare, title: 'Multilingual Support', description: 'English, French, Arabic service.' },
        { icon: Briefcase, title: 'Full Digital Experience', description: 'Book online in minutes.' },
        { icon: Check, title: 'No Deposit on Most Rentals', description: 'Especially for economy vehicles.' },
        { icon: Award, title: 'All-in-One Platform', description: 'Cars, drivers, boats, tours & more.' }
    ];

    return (
        <section id="why-us" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Why Choose MarHire?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="text-center p-6 sm:p-8 rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-card">
                            <CardHeader className="p-0 items-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                                    <feature.icon className="h-7 w-7" />
                                </div>
                                <CardTitle>{feature.title}</CardTitle>
                            </CardHeader>
                           <CardContent className="p-0 mt-2">
                             <CardDescription>{feature.description}</CardDescription>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function OurServices() {
    const services = [
        { title: 'Car Rentals', description: 'Cars of all types cheap, luxury, family vans, or SUVs. Delivered at the airport with full insurance, many without deposit.', href: '/search/car-rental' },
        { title: 'Private Drivers', description: 'Professional bilingual chauffeurs for business, tourism, or airport transfers.', href: '/search/private-driver' },
        { title: 'Boat Rentals', description: 'Book a luxury yacht, fishing boat, or speedboat for parties or sunset cruises.', href: '/search/boats' },
        { title: 'Activities & Tours', description: 'Quad biking, camel rides, jet skis, and cultural walks all over Morocco.', href: '/search/activities' }
    ];

    return (
        <section id="services" className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Services</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                         <Card key={index} className="overflow-hidden rounded-2xl group transition-all hover:shadow-xl bg-card">
                            <CardHeader>
                                <CardTitle>{service.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{service.description}</CardDescription>
                                <Button asChild variant="link" className="p-0 font-semibold mt-4">
                                    <Link href={service.href}>
                                        Explore
                                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function SafetyAndTrust() {
  const policies = [
    "Centralized Booking & Support",
    "Verified & Trusted Agencies",
    "Refund and Cancellation Policies",
    "No Deposit Options",
    "24/7 WhatsApp Support",
    "Airport Pickup Guarantee"
  ];
  return (
    <section id="safety" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Our Safety & Trust Policies</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 sm:gap-y-6 max-w-4xl mx-auto">
          {policies.map((policy, index) => (
            <div key={index} className="flex items-center gap-3 sm:gap-4">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <span className="font-medium text-base sm:text-lg text-foreground">{policy}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function OperatingCities() {
    const cities = [
        { name: 'Agadir', listings: '40+', href: '/search/car-rental?location=Agadir', image: 'https://placehold.co/1200x800.png', hint: 'beach city' },
        { name: 'Marrakech', listings: '40+', href: '/search/car-rental?location=Marrakech', image: 'https://placehold.co/1200x800.png', hint: 'market square' },
        { name: 'Casablanca', listings: '40+', href: '/search/car-rental?location=Casablanca', image: 'https://placehold.co/1200x800.png', hint: 'modern city' },
        { name: 'Fes', listings: '40+', href: '/search/car-rental?location=Fes', image: 'https://placehold.co/1200x800.png', hint: 'old medina' },
        { name: 'Tangier', listings: '40+', href: '/search/car-rental?location=Tangier', image: 'https://placehold.co/1200x800.png', hint: 'coastal city' },
    ];
    return (
        <section id="locations" className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Where We Operate</h2>
                </div>
                 <Carousel
                    opts={{
                    align: "start",
                    loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                    {cities.map((dest) => (
                        <CarouselItem key={dest.name} className="basis-4/5 sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
                            <Link href={dest.href} className="group p-1 block">
                                <Card className="overflow-hidden rounded-2xl transition-all hover:shadow-lg">
                                    <CardContent className="p-0">
                                        <div className="relative h-80">
                                            <Image src={dest.image} alt={dest.name} fill className="object-cover" data-ai-hint={dest.hint} />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                            <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                                                <h3 className="font-headline text-xl md:text-2xl font-bold">{dest.name}</h3>
                                                <p className="text-sm md:text-base">{dest.listings} Listings</p>
                                            </div>
                                            <div className="absolute top-4 right-4 bg-background/80 text-foreground rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <ArrowRight className="h-5 w-5" />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </CarouselItem>
                    ))}
                    </CarouselContent>
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1 sm:-translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Previous</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1 sm:translate-x-4 h-10 w-10 bg-white/80 hover:bg-white text-foreground border-slate-300 shadow-md" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Next</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Carousel>
            </div>
        </section>
    );
}

export function ContactUs() {
    return (
        <section id="contact" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Card className="rounded-2xl bg-card shadow-lg">
                    <CardContent className="p-6 sm:p-10 flex flex-col items-center justify-center text-center gap-4">
                        <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Contact Us</h2>
                        <p className="text-muted-foreground max-w-md">
                            Have questions or need help with a booking? Our team is here for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 mt-4">
                            <Button asChild variant="outline" size="lg" className="text-base text-primary border-primary/50 hover:bg-primary/5 hover:text-primary">
                                <a href="mailto:info@marhire.com">
                                    <Mail className="mr-2 h-5 w-5" />
                                    info@marhire.com
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base text-primary border-primary/50 hover:bg-primary/5 hover:text-primary">
                                <a href="tel:+212660745055">
                                    <Phone className="mr-2 h-5 w-5" />
                                    +212 660-745055
                                </a>
                            </Button>
                        </div>
                         <div className="mt-4 border-t w-full pt-6">
                            <p className="text-center text-muted-foreground font-semibold">
                                Chat support available 24/7 on WhatsApp.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export function ResourcesFaq() {
    const faqs = [
        { question: "Entry & Visa Basics", answer: "Many travelers can enter Morocco visa-free or with an eVisa for short stays. Always check the latest requirements with the Moroccan consulate and ensure your passport is valid for the duration of your trip." },
        { question: "Money & Payments in Morocco", answer: "The local currency is MAD (dirham). ATMs are common in cities; cards work at larger hotels and shops, but cash is preferred in markets and taxis. Keep small bills for tips and avoid dynamic currency conversion—pay in MAD." },
        { question: "Car Rental Essentials (Morocco)", answer: "Your home-country license is usually accepted; an International Driving Permit is recommended. Compare automatic vs. manual, confirm insurance and roadside assistance, and check deposit vs. no-deposit options. Watch speed limits and carry documents at checkpoints." },
        { question: "Getting Around & Airport Transfers", answer: "Pre-book a private driver for fixed pricing and a meet-and-greet at arrivals, or use official taxi stands. Trains and intercity buses connect major cities; plan extra time during holidays and peak seasons." },
        { question: "Safety, Etiquette & Common Scams", answer: "Morocco is generally safe; stay street-smart, use licensed guides/drivers, and be cautious with unsolicited “helpers.” Dress modestly near religious sites, ask before photographing people, and keep valuables secure. 24/7 WhatsApp support adds peace of mind." }
    ];

    return (
        <section id="resources" className="py-16 md:py-24 bg-primary/5">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Resources</h2>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqs.map((faq, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-left font-headline font-semibold text-lg hover:no-underline text-foreground">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
             </div>
        </section>
    );
}
