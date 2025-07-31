import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export default function FAQSection({faqsData}) {
    const faqs = faqsData ? faqsData : [
        {
            question:
                "What makes MarHire different from other travel booking websites?",
            answer: "MarHire is a Morocco-based platform that offers handpicked services from verified local providers. Unlike international platforms, MarHire guarantees no hidden fees, personalized local support, and listings carefully reviewed for safety, reliability, and authenticity. You're not just booking a service - you're experiencing Morocco like a local.",
        },
        {
            question: "Can I really rent a car in Morocco without a deposit?",
            answer: "Yes, MarHire offers many options with no deposit required, particularly for economy and family cars. These listings are clearly marked, giving travelers peace of mind and more flexibility, especially if you prefer to pay on arrival or in cash.",
        },
        {
            question:
                "Are the private drivers on MarHire trustworthy and professional?",
            answer: "All private drivers are vetted, multilingual, and trained to deliver exceptional service. They not only transport you but also offer cultural insights, local recommendations, and flexible itineraries. Whether it's a business trip or a desert tour, you're in safe hands.",
        },
        {
            question: "How does MarHire ensure the quality of its services?",
            answer: "Every car, boat, and tour is listed by a licensed local agency and reviewed manually. We gather real customer feedback and continuously update listings to maintain high standards. Transparency and quality are our priorities.",
        },
        {
            question: "What is included when I book with MarHire?",
            answer: "Booking usually includes the main service (car, driver, tour, or boat), insurance, and add-ons like Wi-Fi, fuel, or water when available. Each listing page specifies exactly what is included, so there are no surprises.",
        },
    ];

    return (
        <section className="py-12 bg-soft-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-charcoal-text mb-8 text-center">
                    Frequently Asked Questions
                </h2>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left text-lg font-medium text-charcoal-text hover:text-teal-green">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-charcoal-text/90">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
