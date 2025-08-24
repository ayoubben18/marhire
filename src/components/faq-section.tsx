
"use client";

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes MarHire different from other travel booking websites?",
    answer: "Our listings are curated by Moroccans who know the country better than anyone. You get real recommendations, culturally rich activities, and local prices — not just what's mass-marketed to tourists. We connect you directly with verified local partners."
  },
  {
    question: "Can I really rent a car in Morocco without a deposit?",
    answer: "Yes! Many of our partners offer no-deposit rental options, which you can filter for during your search. This provides greater flexibility and peace of mind for your trip."
  },
  {
    question: "Are the private drivers on MarHire trustworthy and professional?",
    answer: "Absolutely. Every driver on our platform is part of a verified local agency, vetted for professionalism, safety, and local knowledge. We prioritize your comfort and security."
  },
  {
    question: "How does MarHire ensure the quality of its services?",
    answer: "We don't list everything — only the best. Every car, driver, boat, or activity is reviewed for quality, comfort, and traveler satisfaction. We maintain a high standard by working closely with our handpicked local partners."
  },
  {
    question: "What is included when I book with MarHire?",
    answer: "Each listing has a detailed description of what is included. We believe in transparent pricing, so you'll see clear information about inclusions like insurance, fuel policies, and any extra fees before you book. No surprises."
  }
];

export function FaqSection() {
  return (
    <section className="w-full py-12 md:py-16">
        <div className="text-center">
            <h2 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-foreground">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-base text-muted-foreground max-w-2xl mx-auto">
              Have questions? We have answers. Here are some of the most common questions we get.
            </p>
        </div>
        <div className="mt-10 max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index+1}`} key={index}>
                        <AccordionTrigger className="text-left font-headline font-semibold text-base hover:no-underline text-foreground">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    </section>
  );
}
