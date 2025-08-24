
import * as React from 'react';
import { HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { Partner, Category } from '@/lib/partners';
import { Section } from './Section';

const FAQ_MAP: Record<Category, { q: string; a: string }[]> = {
  "Cars": [
    {
      q: "Do you offer no-deposit rentals?",
      a: "Yes, for many of our economy and compact cars, we offer a no-deposit option which may include a small surcharge. For luxury or premium vehicles, a standard refundable security deposit is typically required on a credit card at the time of pickup."
    },
    {
      q: "Is unlimited kilometers included?",
      a: "Unlimited kilometers are generally included for rentals lasting three days or more. For shorter rentals, a daily mileage limit (e.g., 250km/day) may apply. Please check the specific terms on the listing page before booking."
    },
    {
      q: "What documents do I need to pick up my vehicle?",
      a: "You will need your original valid driver's license (held for at least one year), your passport or national ID card, and your MarHire booking voucher. For licenses not in the Latin alphabet, an International Driving Permit (IDP) is strongly recommended."
    },
    {
      q: "Can you deliver the car to the airport or my hotel?",
      a: "Yes, we offer delivery and collection services to the local airport and most hotels within the city limits. Airport delivery is often free, while hotel delivery may have a small fee depending on the location. You can specify your preference during checkout."
    },
    {
      q: "How do I change or cancel my booking?",
      a: "Since MarHire does not use user accounts yet, all changes and cancellations must be handled through MarHire's central support team. Please contact them via WhatsApp or email with your booking reference number, and they will coordinate with us."
    },
    {
      q: "Can I rent a car in one city and return it in another?",
      a: "Yes, we support one-way rentals to other major Moroccan cities. This service is subject to vehicle availability and may include a one-way drop-off fee. Please inquire with MarHire to arrange an intercity rental."
    }
  ],
  "Private Drivers": [
    {
      q: "Is the price for a private driver per person or per vehicle?",
      a: "The price is always for the entire vehicle, not per person. The total cost covers the driver, vehicle, and fuel for the agreed-upon service, up to the vehicle's maximum passenger capacity."
    },
    {
      q: "What's included in an airport transfer?",
      a: "An airport transfer includes a professional driver who will meet you in the arrivals hall with a sign, help with your luggage, and drive you directly to your destination. The price is fixed, so you don't have to worry about traffic or hidden costs."
    },
    {
      q: "Are your drivers multilingual?",
      a: "Yes, our drivers are professionals who typically speak multiple languages, including French, Arabic, and often English or Spanish. This ensures clear communication throughout your journey."
    },
    {
      q: "Can I book a driver for a multi-day tour across Morocco?",
      a: "Absolutely. We specialize in creating custom multi-day itineraries. Contact MarHire support with your desired route, and we will provide a comprehensive quote that includes the driver's service, vehicle, fuel, and accommodation."
    },
    {
      q: "How much luggage can I bring?",
      a: "Each vehicle has a specified luggage capacity listed on its profile. If you have oversized luggage or more bags than indicated, please inform MarHire support when booking to ensure we provide a suitable vehicle."
    }
  ],
  "Boats": [
    {
      q: "Is a skipper or captain included in the boat rental?",
      a: "Most of our boat and yacht rentals include the services of a professional, licensed skipper. This is done for your safety and to ensure a relaxing experience. Some smaller boats may be available for bareboat charter if you have the appropriate license."
    },
    {
      q: "What happens if there's bad weather on the day of our trip?",
      a: "Safety is our top priority. If the captain determines that the weather conditions are unsafe, we will offer you the choice to either reschedule your trip for another day at no extra cost or receive a full refund."
    },
    {
      q: "Is fuel included in the price?",
      a: "For shorter trips and standard tours, a basic fuel allowance is typically included. For full-day private charters, fuel may be charged based on consumption. This will be clearly stated in the listing details."
    },
    {
      q: "Can we bring our own food and drinks on board?",
      a: "Yes, you are generally welcome to bring your own food and drinks. Some luxury charters may also offer catering packages as an add-on. Please check the specific listing for details or ask us."
    },
    {
      q: "What safety equipment is on the boat?",
      a: "All our vessels are equipped with all necessary safety gear, including life jackets for all passengers (including children), first-aid kits, and communication devices, in compliance with maritime regulations."
    }
  ],
  "Activities": [
    {
      q: "Is hotel pickup and drop-off included?",
      a: "Many of our tours and activities include complimentary pickup and drop-off from centrally located hotels and riads. Please check the 'What's Included' section of the listing to confirm if this service is available for your accommodation."
    },
    {
      q: "What should I wear for my activity?",
      a: "We recommend comfortable, casual clothing. For desert activities like quad biking or camel riding, closed-toe shoes are essential. For mountain excursions, it's wise to bring layers as temperatures can change. Specific recommendations are provided on the listing page."
    },
    {
      q: "Are the activities suitable for children and families?",
      a: "Most of our activities are family-friendly! Any age or height restrictions for safety reasons (e.g., on quad bikes) will be clearly noted in the activity description. We have many tours designed specifically for families to enjoy together."
    },
    {
      q: "What if I need to cancel my activity booking?",
      a: "Our cancellation policies are flexible. Many activities offer free cancellation up to 24 or 48 hours before the start time. Please contact MarHire support with your booking details to process a cancellation or modification."
    },
    {
      q: "Are the guides licensed and multilingual?",
      a: "Yes, all our activities are led by official, licensed local guides who are experts in their field. They are typically multilingual, speaking English, French, and Arabic to provide a rich and informative experience."
    }
  ]
};

export function FAQPartner({ partner }: { partner: Partner }) {
  const faqs = React.useMemo(() => {
    return FAQ_MAP[partner.category] || [];
  }, [partner.category]);

  if (faqs.length === 0) return null;

  const getFaqWithCity = (question: string) => {
    return question.replace(/ in \w+\??/g, ` in ${partner.city}?`);
  }

  return (
    <Section
        icon={HelpCircle}
        title="Frequently Asked Questions"
    >
        <div className="container max-w-4xl p-0">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index + 1}`} key={index}>
                        <AccordionTrigger className="text-left font-headline font-semibold text-lg hover:no-underline text-foreground">
                            {getFaqWithCity(faq.q)}
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-muted-foreground prose max-w-none">
                            {faq.a}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </Section>
  );
}
