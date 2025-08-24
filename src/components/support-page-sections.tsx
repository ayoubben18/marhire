
"use client";

import * as React from 'react';
import { Phone, Mail, MessageSquare, Search, ShieldCheck, CreditCard, XCircle, FileText, Lock, Users, Anchor, UserCheck, Star, Zap, Plane, Check, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast"
import Link from 'next/link';
import { Breadcrumbs } from '@/components/breadcrumbs';

export function SupportHero({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  return (
    <section className="w-full bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto max-w-5xl text-center px-4">
        {breadcrumbs}
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-6">
          Support & Help Center
        </h1>
        <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Reach us anytime — before, during, or after your booking. Our local team responds fast via WhatsApp, phone, or email.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['English', 'French', 'Arabic', 'Spanish'].map(lang => (
                 <Badge key={lang} variant="secondary" className="text-sm py-1 px-3 rounded-lg">{lang}</Badge>
            ))}
        </div>
         <p className="mt-4 text-sm text-muted-foreground">Based in Morocco (Africa/Casablanca, GMT+1)</p>
      </div>
    </section>
  );
}

export function ContactOptions() {
  const contactCards = [
    {
      icon: MessageSquare,
      title: "WhatsApp Support",
      description: "Live chat with our team 24/7 on WhatsApp for bookings, changes, or urgent questions. Typical reply time: under 10 minutes.",
      ctaText: "Chat on WhatsApp",
      href: "https://wa.me/212660745055",
      primary: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Email us anytime at info@marhire.com. We reply within one business day (usually a few hours). Attach your booking code for faster help.",
      ctaText: "Email Us",
      href: "mailto:info@marhire.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Prefer to talk? Call +212 660 745 055 during business hours (Mon–Sun, 09:00–20:00 GMT+1). For after-hours issues, use WhatsApp 24/7.",
      ctaText: "Call Now",
      href: "tel:+212660745055"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contactCards.map((card, index) => (
            <Card key={index} className="flex flex-col rounded-2xl shadow-sm hover:shadow-lg transition-shadow bg-card">
              <CardContent className="p-6 sm:p-8 flex-1 flex flex-col">
                <card.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-headline text-xl font-bold">{card.title}</h3>
                <p className="text-muted-foreground mt-2 flex-1">{card.description}</p>
                <Button asChild className="mt-6 w-full" variant={card.primary ? 'default' : 'outline'}>
                  <Link href={card.href} target="_blank">{card.ctaText}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border-2 border-destructive/50 bg-destructive/10 p-6 sm:p-8 text-center md:text-left md:flex md:items-center md:justify-between">
           <div>
             <h3 className="font-headline text-xl font-bold text-destructive">Emergency & Roadside Assistance</h3>
             <p className="text-destructive/80 mt-2 max-w-3xl mx-auto md:mx-0">
                For active bookings (cars, drivers, boats): we’re available 24/7 for roadside help, delays, or last-minute changes. Share your booking code and location; we’ll coordinate with your verified provider immediately.
             </p>
           </div>
           <Button asChild className="mt-4 md:mt-0 md:ml-6 flex-shrink-0 bg-destructive hover:bg-destructive/90 text-destructive-foreground">
             <Link href="https://wa.me/212660745055" target='_blank'>Get Emergency Help</Link>
           </Button>
        </div>
      </div>
    </section>
  );
}

export function HelpTopics() {
    const topics = [
        { icon: Zap, title: "Bookings & Changes", description: "Edit dates, passenger counts, or services (cars, private drivers, boats, activities). Instant confirmation when available." },
        { icon: CreditCard, title: "Payments & Refunds", description: "Pay on arrival (where available), card payments, secure checkout, refund timelines, receipts, and invoices." },
        { icon: XCircle, title: "Cancellations & Fees", description: "Free-cancellation tags, cut-off times, and how refunds are processed for each category." },
        { icon: ShieldCheck, title: "Insurance & Protection", description: "Basic vs. full coverage, deposit vs. no-deposit options, and damage protection add-ons." },
        { icon: Car, title: "Cars & Roadside Assistance", description: "License requirements, automatic vs. manual, unlimited kilometers, checkpoints, and 24/7 roadside help." },
        { icon: Plane, title: "Private Drivers & Transfers", description: "Airport pickup, meet-and-greet, multilingual chauffeurs, fixed pricing, and business-trip support." },
        { icon: Anchor, title: "Boats & Activities", description: "With/without captain, group sizes, safety notes, and what’s included (fuel, gear, guide)." },
        { icon: Lock, title: "Account, Privacy & Data", description: "Managing your info, GDPR requests, and how we keep your data secure." }
    ];

    return (
        <section id="help-topics" className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto max-w-6xl px-4">
                <div className="text-center mb-12">
                     <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Help Topics</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {topics.map((topic, index) => (
                        <Card key={index} className="text-center p-6 rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-card">
                            <CardHeader className="p-0 items-center">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                                    <topic.icon className="h-7 w-7" />
                                </div>
                                <CardTitle>{topic.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-2">
                                <CardDescription>{topic.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FeaturedFaqs() {
    const faqs = [
        { q: "How fast does MarHire respond on WhatsApp?", a: "We’re online 24/7 and usually reply in under 10 minutes. For urgent car rental or airport transfer issues, WhatsApp is the fastest channel." },
        { q: "Can I book without a deposit?", a: "Yes. Many of our partners offer no-deposit rental options, which you can filter for during your search. This provides greater flexibility and peace of mind for your trip." },
        { q: "How do refunds and cancellations work?", a: "Free-cancellation is available on many listings up to a set cutoff. When you cancel within the window, refunds are processed to your original payment method. See Cancellation Policy and each listing’s terms." },
        { q: "Do you provide roadside assistance?", a: "Yes. For active car bookings, we coordinate 24/7 roadside help with our verified local agencies. Share your booking code and location on WhatsApp." },
        { q: "Which languages does support cover?", a: "We offer support in English, French, Arabic, and Spanish. Tell us your preferred language when you reach out." },
        { q: "Is my data safe when I book?", a: "Yes. Payments are processed over secure, encrypted connections. We comply with GDPR and only use your data to manage your booking and support requests." }
    ];

    return (
        <section id="faq" className="py-16 md:py-24 bg-background">
             <div className="container mx-auto max-w-4xl px-4">
                <div className="text-center mb-12">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Featured FAQs</h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem value={`item-${index + 1}`} key={index}>
                            <AccordionTrigger className="text-left font-headline font-semibold text-lg hover:no-underline text-foreground">
                                {faq.q}
                            </AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.a}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
             </div>
        </section>
    );
}

export function ContactForm() {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      setIsSubmitting(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "Thanks! We'll get back to you within one business day.",
      });
      // Here you would reset the form
    };

    return (
        <section className="py-16 md:py-24 bg-primary/5">
            <div className="container mx-auto max-w-3xl px-4">
                <Card className="rounded-2xl shadow-lg bg-card">
                  <CardHeader className="text-center p-6 sm:p-8">
                    <CardTitle className="text-3xl font-bold font-headline">Send Us a Message</CardTitle>
                    <CardDescription>We reply by email within one business day. For urgent issues, use WhatsApp 24/7.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 pt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input id="name" placeholder="Enter your full name" required />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input id="email" type="email" placeholder="Enter your email address" required />
                            </div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="phone">Phone (optional)</Label>
                            <Input id="phone" placeholder="Enter your phone number" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">How can we help you?</Label>
                            <Textarea id="message" placeholder="Please describe your issue or question..." rows={6} required />
                        </div>
                        <div className="flex items-start space-x-2">
                            <Checkbox id="terms" required />
                            <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                                I agree to the <Link href="/legal/privacy" className="underline hover:text-primary">Privacy Policy</Link>.
                            </Label>
                        </div>
                        <Button type="submit" className="w-full text-base py-6" disabled={isSubmitting}>
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </form>
                  </CardContent>
                </Card>
            </div>
        </section>
    );
}

export function TrustGuarantees() {
    const guarantees = [
        { icon: ShieldCheck, text: "Verified & Trusted Agencies" },
        { icon: CreditCard, text: "Price Transparency" },
        { icon: Lock, text: "Secure Online Payments" },
        { icon: Check, text: "Free-Cancellation Options" },
        { icon: MessageSquare, text: "24/7 WhatsApp Support" },
        { icon: Car, text: "No-Deposit Rentals" },
    ];

    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8 text-center">
                    {guarantees.map((item, index) => (
                        <div key={index} className="flex flex-col items-center gap-2">
                            <item.icon className="h-7 w-7 text-primary" />
                            <span className="text-sm font-semibold text-muted-foreground">{item.text}</span>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 text-sm text-muted-foreground">
                    <p>Need business/partner help? <Link href="/join-us" className="font-semibold text-primary hover:underline">Visit Partner Support</Link> to list your services or manage bookings.</p>
                </div>
            </div>
        </section>
    );
}
