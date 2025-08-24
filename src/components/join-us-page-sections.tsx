
'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Handshake, Zap, BarChart, MessageSquare, PlusCircle, UserCheck, Check, Building, FileText, BadgePercent, Banknote, Star, Phone, Mail, ArrowRight } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { submitPartnerApplication, type FormState } from '@/app/join-us/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const PRIMARY_CONTACT_WHATSAPP_URL = 'https://wa.me/212660745055'; // Placeholder

export function JoinUsHero({ breadcrumbs }: { breadcrumbs: React.ReactNode }) {
  return (
    <section id="hero" className="relative w-full py-20 md:py-32 bg-private-driver-bg overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="A scenic road winding through the mountains of Morocco, representing travel and partnership."
          fill
          priority
          className="object-cover"
          data-ai-hint="morocco travel partnership"
        />
      </div>
      <div className="container mx-auto text-center relative px-4 sm:px-6 lg:px-8">
        {breadcrumbs}
        <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-4">
          Partner with MarHire — List Cars, Drivers, Boats & Activities in Morocco
        </h1>
        <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
          Join Morocco’s trusted marketplace to connect your car rentals, private driver services, boat tours, or local activities with thousands of travelers. We handle the marketing and bookings, so you can focus on providing exceptional service.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-base h-12" asChild>
                <Link href="#partner-form">Apply Now</Link>
            </Button>
             <Button size="lg" variant="outline" className="w-full sm:w-auto text-base h-12 text-primary border-primary/50 hover:bg-primary/5 hover:text-primary" asChild>
                <Link href={PRIMARY_CONTACT_WHATSAPP_URL} target="_blank">
                    <MessageSquare className="mr-2 h-5 w-5" /> Chat on WhatsApp
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

export function WhyPartnerSection() {
    const features = [
        { icon: Zap, title: "Effortless SEO & Reach", description: "Get discovered by travelers searching for services in Morocco. We invest in marketing so your listings rank higher." },
        { icon: BarChart, title: "Grow with Zero Upfront Cost", description: "Our commission-based model means we only succeed when you do. No setup fees, no monthly subscriptions." },
        { icon: MessageSquare, title: "24/7 Human Support", description: "Our local, multilingual team is available on WhatsApp and email to help you and your customers, anytime." },
        { icon: PlusCircle, title: "Fast & Easy Onboarding", description: "Our team helps you create optimized listings. We handle the tech, you just provide the service details." },
        { icon: UserCheck, title: "Dedicated Partner Profile", description: "Showcase your brand with a professional profile featuring your services, policies, and customer reviews." },
        { icon: Handshake, title: "A True Partnership", description: "We work with you to maximize your bookings, providing insights and support to help your business thrive in cities like Agadir and Marrakech." },
    ];
    return (
        <section id="why-partner" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Unlock Your Business's Full Potential</h2>
                    <p className="mt-4 text-lg text-muted-foreground">MarHire isn't just a listing site; we're your growth partner. We provide the tools, technology, and support to connect you with a global audience of travelers seeking quality experiences in Morocco.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-card">
                           <CardHeader>
                             <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                            <CardDescription>{feature.description}</CardDescription>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function HowItWorksSection() {
    const steps = [
        { number: 1, title: "Submit Your Application", description: "Fill out our simple online form with your company details and services. It only takes a few minutes." },
        { number: 2, title: "Verification & Review", description: "Our team reviews your application and documents within 24-48 hours to ensure you meet our quality standards." },
        { number: 3, title: "We Build Your Listings", description: "Once approved, we work with you to create professional, high-converting listings for your services, complete with photos and clear details." },
        { number: 4, title: "Go Live & Get Bookings", description: "Your listings are published across MarHire, instantly visible to travelers looking for services in Agadir, Marrakech, and all over Morocco." },
    ];
    return (
        <section id="how-it-works" className="py-16 md:py-24 bg-private-driver-bg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Getting Started is Simple</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our streamlined process is designed to get your business online and ready for bookings as quickly as possible.</p>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -translate-y-1/2" aria-hidden="true"></div>
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {steps.map((step) => (
                            <div key={step.number} className="relative flex flex-col items-center text-center p-4">
                                 <div className="relative z-10 w-16 h-16 rounded-full bg-background border-2 border-primary text-primary flex items-center justify-center ring-8 ring-private-driver-bg mb-4">
                                    <span className="font-headline text-2xl font-bold">{step.number}</span>
                                </div>
                                <h3 className="font-headline text-lg font-semibold mt-2">{step.title}</h3>
                                <p className="mt-1 text-muted-foreground text-sm">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export function WhoCanJoinSection() {
    const providerTypes = [
        { icon: Building, title: "Car Rental Agencies", description: "Licensed agencies offering a fleet of vehicles, from economy cars to luxury SUVs." },
        { icon: UserCheck, title: "Private Drivers & Chauffeurs", description: "Professional drivers and companies providing airport transfers, city tours, and intercity travel." },
        { icon: Building, title: "Boat & Yacht Operators", description: "Businesses offering boat tours, fishing charters, yacht rentals, and water sports." },
        { icon: Building, title: "Tour & Activity Providers", description: "Licensed guides and companies offering experiences like quad biking, camel rides, and city tours." },
    ];
     return (
        <section id="who-can-join" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Who Can Partner with Us?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">We partner with professional, licensed, and customer-focused businesses in Morocco's tourism sector. If you provide outstanding service, we want to hear from you.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {providerTypes.map((type) => (
                         <Card key={type.title} className="rounded-2xl hover:shadow-xl transition-shadow duration-300 bg-card">
                            <CardHeader className='items-center text-center'>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <type.icon className="h-7 w-7" />
                                </div>
                                <CardTitle>{type.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{type.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <p className="text-center mt-8 text-muted-foreground">We are actively seeking partners in <Link href="#" className="font-semibold text-primary hover:underline">all major Moroccan cities</Link>, including Agadir, Marrakech, Casablanca, Fes, Tangier, and more.</p>
            </div>
        </section>
     );
}

export function RequirementsSection() {
  return (
    <section id="requirements" className="py-16 md:py-24 bg-private-driver-bg">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4 sm:px-6 lg:px-8">
        <div className="relative h-80 md:h-full w-full rounded-2xl overflow-hidden">
            <Image
                src="https://placehold.co/1200x800.png"
                alt="A collection of required documents for partnership, like licenses and ID cards."
                fill
                className="object-cover"
                data-ai-hint="documents paperwork"
                sizes="(max-width: 768px) 100vw, 50vw"
             />
        </div>
        <div className="space-y-4">
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Requirements & Documents</h2>
          <p className="text-lg text-muted-foreground">To ensure a safe and trustworthy marketplace for travelers, we require all our partners to be licensed and fully compliant with local regulations. Before applying, please have the following documents ready:</p>
            <ul className="space-y-3">
                <li className="flex items-start gap-3"><Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span><strong>Company Registration:</strong> Valid ICE (Identifiant Commun de l'Entreprise) and RC (Registre du Commerce) numbers.</span></li>
                <li className="flex items-start gap-3"><Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span><strong>Business License:</strong> Proof of your specific business license (e.g., transport touristique, location de voitures).</span></li>
                <li className="flex items-start gap-3"><Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span><strong>Owner's Identification:</strong> A copy of the owner's national ID card (CNIE) or passport.</span></li>
                <li className="flex items-start gap-3"><Check className="h-6 w-6 text-primary flex-shrink-0 mt-1" /><span><strong>Service Details:</strong> Clear information about your services, including pricing, cancellation policies, and insurance details.</span></li>
            </ul>
           <p className="text-sm text-muted-foreground pt-2">Submitting these helps us speed up the verification process and build a foundation of trust. For more details, review our <Link href="/legal/terms" className="font-semibold text-primary hover:underline">partner terms</Link>.</p>
        </div>
      </div>
    </section>
  );
}

export function CommissionSection() {
    const points = [
        { icon: BadgePercent, title: "Transparent Commission", description: "You only pay a competitive, fixed commission on confirmed bookings. No hidden costs, ever." },
        { icon: Banknote, title: "Reliable Monthly Payouts", description: "Receive your earnings automatically every month via secure bank transfer." },
        { icon: BarChart, title: "Performance Dashboard", description: "Track your bookings, view earnings reports, and get insights to optimize your listings." },
    ];
    return (
        <section id="commission" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Fair Commissions & Fast Payouts</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Our business model is simple: we grow together. We've designed our financial system to be transparent, fair, and beneficial for our partners.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {points.map((point) => (
                        <Card key={point.title} className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border">
                            <CardHeader>
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6 mx-auto">
                                    <point.icon className="h-7 w-7" />
                                </div>
                                <CardTitle>{point.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CardDescription>{point.description}</CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

export function FaqSection({ faqItems }: { faqItems: { question: string, answer: string }[] }) {
    return (
        <section id="faq" className="py-16 md:py-24 bg-background">
             <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 max-w-3xl mx-auto">
                    <h2 className="font-headline text-3xl md:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
                    <p className="mt-4 text-lg text-muted-foreground">Here are answers to some common questions from our potential partners. For more information, feel free to contact us.</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                        {faqItems.map((faq, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className="text-left font-headline font-semibold text-lg hover:no-underline text-foreground">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-muted-foreground prose max-w-none">
                                    <p>{faq.answer}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
             </div>
        </section>
    );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full text-base h-12" disabled={pending}>
      {pending ? "Submitting Application..." : "Apply Now"}
    </Button>
  );
}

export function PartnerFormSection() {
    const { toast } = useToast();
    const initialState: FormState = { message: '', errors: {}, success: false };
    const [state, formAction] = useActionState(submitPartnerApplication, initialState);
    const formRef = React.useRef<HTMLFormElement>(null);

    React.useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast({
                    title: "Application Submitted!",
                    description: state.message,
                });
                formRef.current?.reset();
            } else {
                 toast({
                    variant: "destructive",
                    title: "Submission Error",
                    description: state.message,
                });
            }
        }
    }, [state, toast]);

    return (
        <section id="partner-form" className="py-16 md:py-24 bg-private-driver-bg">
            <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                <Card className="rounded-2xl shadow-lg border">
                  <CardHeader className="text-center p-6 sm:p-8">
                    <CardTitle className="text-3xl font-bold font-headline">Become a MarHire Partner</CardTitle>
                    <CardDescription className="max-w-xl mx-auto">Fill out the form below to start the process. Our team is excited to learn about your business and will contact you shortly after reviewing your application.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 sm:p-8 pt-0">
                    <form ref={formRef} action={formAction} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="companyName">Company Name*</Label>
                                <Input id="companyName" name="companyName" placeholder="Your Company S.A.R.L" required />
                                {state.errors?.companyName && <p className="text-sm font-medium text-destructive">{state.errors.companyName[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="ownerName">Owner's Full Name*</Label>
                                <Input id="ownerName" name="ownerName" placeholder="e.g., Mohamed Alami" required />
                                {state.errors?.ownerName && <p className="text-sm font-medium text-destructive">{state.errors.ownerName[0]}</p>}
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="iceNumber">ICE Number*</Label>
                                <Input id="iceNumber" name="iceNumber" placeholder="Identifiant Commun de l'Entreprise" required />
                                {state.errors?.iceNumber && <p className="text-sm font-medium text-destructive">{state.errors.iceNumber[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="rcNumber">RC Number*</Label>
                                <Input id="rcNumber" name="rcNumber" placeholder="Registre du Commerce" required />
                                {state.errors?.rcNumber && <p className="text-sm font-medium text-destructive">{state.errors.rcNumber[0]}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Category*</Label>
                                <Select name="category" required>
                                    <SelectTrigger className="h-10"><SelectValue placeholder="Select service category" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Cars">Car Rentals</SelectItem>
                                        <SelectItem value="Private Drivers">Private Drivers</SelectItem>
                                        <SelectItem value="Boats">Boats</SelectItem>
                                        <SelectItem value="Activities">Activities</SelectItem>
                                    </SelectContent>
                                </Select>
                                {state.errors?.category && <p className="text-sm font-medium text-destructive">{state.errors.category[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Primary City*</Label>
                                <Select name="city" required>
                                    <SelectTrigger className="h-10"><SelectValue placeholder="Select your city" /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Agadir">Agadir</SelectItem>
                                        <SelectItem value="Marrakech">Marrakech</SelectItem>
                                        <SelectItem value="Fes">Fes</SelectItem>
                                        <SelectItem value="Casablanca">Casablanca</SelectItem>
                                        <SelectItem value="Tangier">Tangier</SelectItem>
                                        <SelectItem value="Rabat">Rabat</SelectItem>
                                        <SelectItem value="Essaouira">Essaouira</SelectItem>
                                    </SelectContent>
                                </Select>
                                {state.errors?.city && <p className="text-sm font-medium text-destructive">{state.errors.city[0]}</p>}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="email">Email*</Label>
                                <Input id="email" name="email" type="email" placeholder="your@company.com" required />
                                {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email[0]}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone*</Label>
                                <Input id="phone" name="phone" type="tel" placeholder="e.g., +212 6 00 00 00 00" required />
                                {state.errors?.phone && <p className="text-sm font-medium text-destructive">{state.errors.phone[0]}</p>}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="whatsapp">WhatsApp Number*</Label>
                            <Input id="whatsapp" name="whatsapp" type="tel" placeholder="Number for customer communication" required />
                            {state.errors?.whatsapp && <p className="text-sm font-medium text-destructive">{state.errors.whatsapp[0]}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="serviceDescription">Service Description*</Label>
                            <Textarea id="serviceDescription" name="serviceDescription" placeholder="Briefly describe your main services, what makes your company special, and your typical customer. (100-800 characters)" rows={5} required minLength={100} maxLength={800} />
                             {state.errors?.serviceDescription && <p className="text-sm font-medium text-destructive">{state.errors.serviceDescription[0]}</p>}
                        </div>
                        <div className="space-y-4 pt-2">
                            <div className="flex items-start space-x-3">
                                <Checkbox id="isAuthorized" name="isAuthorized" required />
                                <div className="grid gap-1.5 leading-none">
                                    <Label htmlFor="isAuthorized" className="font-normal text-sm">I confirm that I am the owner or an authorized representative of this company.</Label>
                                     {state.errors?.isAuthorized && <p className="text-sm font-medium text-destructive">{state.errors.isAuthorized[0]}</p>}
                                </div>
                            </div>
                            <div className="flex items-start space-x-3">
                                <Checkbox id="acceptTerms" name="acceptTerms" required />
                                <div className="grid gap-1.5 leading-none">
                                <Label htmlFor="acceptTerms" className="font-normal text-sm">
                                    I have read and agree to the MarHire <Link href="/legal/terms" className="font-semibold text-primary hover:underline">Terms of Service</Link> and <Link href="/legal/privacy" className="font-semibold text-primary hover:underline">Privacy Policy</Link>.
                                </Label>
                                {state.errors?.acceptTerms && <p className="text-sm font-medium text-destructive">{state.errors.acceptTerms[0]}</p>}
                                </div>
                            </div>
                        </div>
                        <SubmitButton />
                    </form>
                  </CardContent>
                </Card>
            </div>
        </section>
    );
}


export function PartnerContactFooter() {
    return (
        <section id="contact-footer" className="py-16 bg-background border-t">
            <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                <Card className="rounded-2xl bg-card">
                    <CardContent className="p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-6">
                        <div className="flex-1">
                            <h2 className="font-headline text-2xl md:text-3xl font-bold text-foreground">Have Questions Before You Join?</h2>
                            <p className="text-muted-foreground mt-2">
                                Our partner onboarding team is ready to help. Reach out to us directly for any inquiries.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
                             <Button asChild variant="outline" size="lg" className="text-base text-primary hover:text-primary border-primary/50 hover:bg-primary/5">
                                <a href={PRIMARY_CONTACT_WHATSAPP_URL} target="_blank">
                                    <MessageSquare className="mr-2 h-5 w-5" />
                                    WhatsApp Us
                                </a>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="text-base text-primary hover:text-primary border-primary/50 hover:bg-primary/5">
                                <a href="mailto:partners@marhire.com">
                                    <Mail className="mr-2 h-5 w-5" />
                                    Email Us
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                 <div className="text-center mt-8 text-sm text-muted-foreground">
                    <p>Review our <Link href="/legal/terms" className="font-medium text-foreground hover:underline">Terms & Conditions</Link> and <Link href="/legal/privacy" className="font-medium text-foreground hover:underline">Privacy Policy</Link>.</p>
                </div>
            </div>
        </section>
    );
}
