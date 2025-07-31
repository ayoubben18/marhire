import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion";

export default function FAQSectionCustom({ faqs, title }) {
    return (
        <section className="py-12 bg-soft-white">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-2xl font-bold text-charcoal-text mb-8 text-center">
                    {title ? title : "Frequently Asked Questions"}
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
