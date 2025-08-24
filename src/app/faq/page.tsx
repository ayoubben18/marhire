
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { LifeBuoy } from 'lucide-react';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'FAQ - Car Rental, Drivers & Tours in Morocco | MarHire',
  description: 'Find answers to your questions about booking car rentals, private drivers, airport transfers, and activities in Morocco. Learn about payments, insurance, cancellations, and more.',
};

const TERMS_URL = '/legal/terms';
const PRIVACY_URL = '/legal/privacy';
const CONTACT_EMAIL = 'info@marhire.com';
const WHATSAPP_URL = 'https://wa.me/212660745055';
const SUPPORT_HOURS = '7/7, from 09:00 to 21:00 (Morocco Time, GMT+1)';


const bookingFaqs = [
    { q: "What payment methods do you accept?", a: "We offer flexible payment options. You can pay securely online with most major credit cards (Visa, Mastercard, etc.). For many services, a 'Pay on Delivery' option is also available, allowing you to pay in cash when you meet your provider." },
    { q: "Are there any hidden fees?", a: "No. MarHire is committed to transparent pricing. The total price you see at checkout includes all mandatory fees and taxes. Any optional add-ons are clearly stated." },
    { q: "Do I need to pay a deposit for my booking?", a: "It depends. Many car rentals are available with a no-deposit option, which may include a small surcharge. For luxury vehicles or specific partners, a refundable security deposit may be required on your credit card at pickup. Check each listing for details." },
    { q: "How do I change or cancel my booking?", a: "Since we don't have user accounts yet, all changes and cancellations are handled by our support team. Please contact us via email or WhatsApp with your booking reference number." },
    { q: "When will I receive my refund after a cancellation?", a: "Once a refund is approved according to the booking's policy, we process it immediately. It typically takes 5-10 business days for the funds to appear back on your original payment method." },
    { q: "Do you offer discounts for longer rentals?", a: "Yes, many partners offer reduced daily rates for longer car rental periods (e.g., 7+ days). The discount is automatically calculated and reflected in the total price when you select your dates." },
    { q: "How do I get an invoice for my booking?", a: "You will receive a confirmation email that serves as a detailed receipt. If you require a formal invoice, please contact our support team with your booking reference." },
    { q: "Is it safe to pay online?", a: "Absolutely. Our payment processor is fully PCI-compliant and uses industry-standard encryption. We never store your full credit card details on our servers." },
];

const carFaqs = [
    { q: "What is included in my car rental?", a: "Standard rentals include basic insurance (CDW), third-party liability, and local taxes. The mileage policy (e.g., unlimited kilometers) often depends on the rental duration; always check the listing details." },
    { q: "What are the age and license requirements?", a: "The minimum age is usually 21, but can be 23 or 25 for certain cars. You must have held your valid driving license for at least one year. \n➤ **Tip:** We strongly recommend carrying an International Driving Permit (IDP) to avoid any issues." },
    { q: "Can I have the car delivered to my airport or hotel?", a: "Yes, airport and hotel delivery is a standard service. Many partners offer free delivery within their city limits. Any applicable fees are shown on the listing." },
    { q: "What is the fuel policy?", a: "Our standard policy is 'Same-to-Same.' You receive the car with a certain level of fuel and are expected to return it with the same amount to avoid extra charges." },
    { q: "Can I rent a car in one city and return it in another?", a: "Yes, one-way rentals between major Moroccan cities (e.g., Marrakech to Fes) are possible. This service may incur a one-way fee. Cross-border travel outside Morocco is not permitted." },
    { q: "What should I do in case of a breakdown or accident?", a: "First, ensure everyone is safe. For any accident, you must contact the police to get a report (*constat*), as it is required for insurance. Then, call the 24/7 roadside assistance number on your rental voucher." },
];

const driverFaqs = [
    { q: "How do airport transfers work?", a: "Your professional driver will monitor your flight and wait in the arrivals hall with a sign bearing your name. The price for your airport transfer is fixed, so you don't have to worry about traffic or extra costs." },
    { q: "Are the drivers multilingual?", a: "Yes, our private drivers are professionals who typically speak multiple languages, including French, Arabic, and English. Some also speak Spanish or German; check the driver's profile for details." },
    { q: "Can I book a driver for a city-to-city transfer?", a: "Absolutely. We offer comfortable intercity transfers, such as from Marrakech to Agadir or Casablanca to Rabat. It's a great way to travel between cities without the hassle of public transport." },
    { q: "What about luggage, child seats, and waiting time?", a: "Each vehicle has a specified luggage capacity. Child seats can be requested in advance. For airport transfers, a standard waiting time (usually 60 minutes) is included for free." },
    { q: "How do I change my pickup time or location?", a: "To make any changes to your private driver booking, please contact our support team via WhatsApp or email as soon as possible, and we will coordinate with the driver." },
    { q: "How do I pay for my private driver?", a: "Similar to our other services, you can book your private driver or airport transfer in Morocco by paying securely online or choosing a 'Pay in Cash' option where available." },
];

const boatActivityFaqs = [
    { q: "What's included in a boat rental or activity?", a: "This varies, but typically includes safety equipment, a guide/skipper, and necessary gear. For boat rentals, the fuel policy will be specified. Always check the 'What's Included' section on the listing page." },
    { q: "What happens if there's bad weather?", a: "Safety is our priority. If a boat trip or outdoor activity is cancelled by the provider due to bad weather, you will be offered the choice to either reschedule or receive a full refund." },
    { q: "Can I book a private boat trip or tour?", a: "Yes, many listings for boat rentals and activities in cities like Marrakech or Agadir are available as private experiences, allowing you to customize the itinerary with the provider." },
    { q: "Are there age limits or safety measures for children?", a: "Most activities are family-friendly, but some may have age or height restrictions for safety. Life jackets, including child sizes, are provided for all boat trips. Please check the listing details." },
    { q: "Is hotel pickup available for activities?", a: "Many tours and activities include complimentary pickup and drop-off from centrally located hotels. You can verify this on the listing page and provide your hotel details during checkout." },
    { q: "How do I cancel or change an activity booking?", a: "To cancel or modify your activity, please contact our support team. Be sure to check the cancellation policy on your booking confirmation, as cutoff times may vary." },
];

const policyFaqs = [
    { q: "What documents do I need at pickup?", a: `For car rentals, you'll need your driving license, passport/ID, and booking voucher. For all services, the lead booker should have an ID. An International Driving Permit (IDP) is highly recommended for driving.` },
    { q: "Who is responsible for traffic fines, tolls, and parking?", a: "The renter is fully responsible for all traffic fines, road tolls, and parking fees incurred. Unpaid fines will be charged by the rental agency, often with an administrative fee." },
    { q: "What are my insurance options?", a: "All car rentals include basic third-party liability and CDW with an excess (deductible). You can often upgrade to a 'full protection' package at the rental desk to reduce or eliminate this excess." },
    { q: "How is my personal data handled?", a: `We only collect data necessary to complete your booking. For full details, please read our <a href="${PRIVACY_URL}" class="underline font-medium text-primary">Privacy Policy</a>.` },
    { q: "Where can I find the full terms of service?", a: `All bookings are subject to our platform rules. You can review our complete <a href="${TERMS_URL}" class="underline font-medium text-primary">Terms & Conditions</a> for more information.` },
    { q: "What if I have a complaint or an issue with a provider?", a: "Your satisfaction is our priority. Please contact MarHire support immediately. We will act as a mediator to help resolve the situation with the local partner fairly and efficiently." },
];

const contactFaqs = [
    { q: "What is the best way to contact you?", a: `For urgent issues, the fastest way is via <a href="${WHATSAPP_URL}" target="_blank" rel="noopener noreferrer" class="underline font-medium text-primary">WhatsApp</a>. For general questions, changes, or cancellations, you can email us at ${CONTACT_EMAIL}.` },
    { q: "What are your support hours?", a: `Our support team is available ${SUPPORT_HOURS}.` },
    { q: "What is the difference between general and emergency support?", a: "General support handles bookings and questions during business hours. Emergency support (via the number on your voucher) is for immediate, on-the-road issues like breakdowns and is available 24/7." },
    { q: "How long does it take to get a response?", a: "We pride ourselves on fast responses. WhatsApp messages are typically answered within minutes, while emails are answered within a few hours during our support window." },
];


const FaqSection = ({ title, faqs }: { title: string, faqs: { q: string, a: string }[] }) => (
    <div className="mb-12">
        <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-6">{title}</h2>
        <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
                <AccordionItem value={`item-${index + 1}`} key={index}>
                    <AccordionTrigger className="text-left font-headline font-semibold text-base sm:text-lg hover:no-underline text-foreground">
                        {faq.q}
                    </AccordionTrigger>
                    <AccordionContent>
                         <div className="text-base text-muted-foreground" dangerouslySetInnerHTML={{ __html: faq.a.replace(/\n/g, '<br />') }} />
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    </div>
);


export default function FaqPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'FAQ', href: '/faq' }
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <div className="w-full bg-primary/5 py-12 md:py-16">
            <div className="container mx-auto max-w-4xl text-center px-4">
                <Breadcrumbs items={breadcrumbItems} />
                <Badge variant="secondary" className="text-sm py-1 px-3 rounded-lg font-semibold mt-6">
                    <LifeBuoy className="mr-2 h-4 w-4" /> Help Center
                </Badge>
                <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight text-foreground mt-4">
                Frequently Asked Questions
                </h1>
                <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
                    Find quick answers to your questions about booking car rentals, private drivers, tours, and activities in Morocco.
                </p>
            </div>
        </div>

        <div className="py-12 md:py-16">
            <div className="container max-w-4xl">
                <FaqSection title="Bookings & Payment" faqs={bookingFaqs} />
                <FaqSection title="Cars" faqs={carFaqs} />
                <FaqSection title="Private Drivers & Transfers" faqs={driverFaqs} />
                <FaqSection title="Boats & Activities" faqs={boatActivityFaqs} />
                <FaqSection title="Policies & Legal" faqs={policyFaqs} />
                <FaqSection title="Contact & Support" faqs={contactFaqs} />

                 <div className="mt-12 text-center rounded-lg border bg-card p-6">
                    <h3 className="font-headline text-xl font-semibold">Can't find your answer?</h3>
                    <p className="mt-2 text-muted-foreground">
                        Our team is ready to help. Contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline">{CONTACT_EMAIL}</a> or chat with us on <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline">WhatsApp</a>.
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">Support Hours: {SUPPORT_HOURS}</p>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
