import Footer from "../components/site/Footer";
import FreeTexts from "../components/site/FreeTexts";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../components/ui/accordion"; // update the path if needed

const faqData = [
    {
        category: "Popular Topics",
        faqs: [
            {
                question: "What is MarHire and how does it work?",
                answer: "MarHire is Morocco's all-in-one travel platform where you can easily book car rentals, private drivers, boat rentals, and tourist activities all from trusted local agencies. You browse listings, fill out a quick form, and we confirm everything for you.",
            },
            {
                question: "What services can I book on MarHire?",
                answer: "You can book cars (with or without drivers), boats, and tours/activities in top cities like Agadir, Marrakech, Fes, Casablanca, Tangier, and more.",
            },
            {
                question: "Is MarHire a rental agency?",
                answer: "No. MarHire is a booking platform that connects you with the best local providers. We ensure quality, verify each partner, and support your booking from start to finish.",
            },
            {
                question:
                    "Why should I book through MarHire instead of directly with an agency?",
                answer: "We simplify everything. We offer the best price, centralized support, and only work with verified, reviewed partners. Plus, you avoid language barriers or scams.",
            },
            {
                question: "Do I need an account to book?",
                answer: "No, you can book as a guest. But if you create a free account, you'll be able to track bookings, manage history, and get exclusive deals.",
            },
            {
                question: "Is MarHire available in all Moroccan cities?",
                answer: "We currently operate in major destinations like Agadir, Marrakech, Fes, Casablanca, Rabat, and Tangier, and we're constantly expanding.",
            },
            {
                question: "How far in advance should I book?",
                answer: "At least 2 days in advance for all services. Car rentals also require a minimum of 3 days rental duration.",
            },
            {
                question: "What's included in the prices shown?",
                answer: "Prices include insurance, verified provider service, and customer support. Add-ons (like a child seat or hotel pickup) are shown before you book.",
            },
            {
                question: "Can I trust the providers listed?",
                answer: "Yes. All agencies go through a strict verification process. We check their licenses, service quality, and client reviews.",
            },
            {
                question: "Is support available during my trip?",
                answer: "Yes. MarHire offers pre- and post-booking support via email and WhatsApp, 7 days a week.",
            },
            {
                question:
                    "Can I rent a car and book activities in one checkout?",
                answer: "Soon! For now, each service is booked separately. But our multi-service checkout feature is in development.",
            },
            {
                question: "How do I contact customer service?",
                answer: "Just go to our Contact Page. You can message us through WhatsApp, email, or the support form.",
            },
            {
                question: "Is MarHire safe for international travelers?",
                answer: "Absolutely. We cater to global tourists with multilingual support, transparent pricing, and no hidden fees.",
            },
            {
                question: "Can agencies list their services on MarHire?",
                answer: "Yes. If you're a verified provider, you can list your services here and join Morocco's fastest-growing travel platform.",
            },
        ],
    },
    {
        category: "General Booking",
        faqs: [
            {
                question: "How do I book a service on MarHire?",
                answer: "Just select your desired service (Car, Driver, Boat, or Activity), pick your dates, fill in the booking form, and submit. No account is needed — we'll handle the rest.",
            },
            {
                question: "Do I need to pay in advance?",
                answer: "For most services, only a small commission is paid online. The rest is paid directly upon arrival or delivery.",
            },
            {
                question: "Is my booking confirmed immediately?",
                answer: "Not instantly. After submission, we verify availability and confirm via email or WhatsApp within 24 hours.",
            },
            {
                question: "Can I cancel my booking?",
                answer: "Yes. Most services allow free cancellation up to 24–48 hours before the booking date. Please check the cancellation policy on each listing.",
            },
            {
                question: "What if I don't receive a confirmation?",
                answer: "Check your spam folder. If it's not there within 24 hours, please reach out through our contact page.",
            },
            {
                question: "Can I book last-minute?",
                answer: "All bookings must be made at least 2 days in advance to ensure proper preparation and availability.",
            },
            {
                question: "What payment methods are accepted?",
                answer: "You can pay your deposit online using secure payment methods. The remaining amount is typically paid by cash or card upon delivery.",
            },
            {
                question: "Will I receive an invoice?",
                answer: "Yes, we send a booking confirmation and invoice summary by email once confirmed.",
            },
            {
                question: "Can I modify my booking?",
                answer: "Yes, contact our support team as early as possible and we'll do our best to adjust your reservation.",
            },
            {
                question: "Are all providers verified?",
                answer: "Yes. All our partners go through a verification process to ensure quality and reliability.",
            },
            {
                question: "Do I need to create an account to book?",
                answer: "No, guest bookings are allowed. But creating an account lets you view history and manage bookings more easily.",
            },
            {
                question: "Are prices shown final?",
                answer: "Yes, the price you see includes taxes, insurance (if applicable), and all selected extras. No hidden fees.",
            },
            {
                question: "How do I contact MarHire support?",
                answer: "Visit our Contact Page to chat, call, or email us directly.",
            },
            {
                question: "What happens if the service provider cancels?",
                answer: "We'll immediately contact you and offer an alternative option or full refund.",
            },
        ],
    },
    {
        category: "Car Rental",
        faqs: [
            {
                question: "What is the minimum rental duration?",
                answer: "All car rentals require a minimum of 3 full days.",
            },
            {
                question: "Can I rent a car without a deposit?",
                answer: "Yes! Many of our cars come with no deposit required. It's clearly mentioned on each listing.",
            },
            {
                question: "What's included in the car rental?",
                answer: "Your rental includes standard insurance, 24/7 support, and unlimited kilometers (unless stated otherwise).",
            },
            {
                question: "Can I upgrade my insurance?",
                answer: "Yes, you can choose a low-excess insurance upgrade during booking for extra peace of mind.",
            },
            {
                question: "What documents are required to rent a car?",
                answer: "You'll need a valid driving license, passport or ID, and in some cases, an international driving permit.",
            },
            {
                question: "Is airport delivery available?",
                answer: "Absolutely! Most rentals offer Agadir, Marrakech, and Casablanca airport pickup/drop-off.",
            },
            {
                question: "Do I need a credit card?",
                answer: "Not always. Many rentals accept cash or card on delivery, and some don't require a deposit at all.",
            },
            {
                question: "Are fuel and mileage policies flexible?",
                answer: "Yes. We offer unlimited mileage and a full-to-full fuel policy on most cars.",
            },
            {
                question:
                    "Can I rent a car in one city and drop it off in another?",
                answer: "Yes, one-way rentals are possible. Just select your pickup and drop-off cities during booking.",
            },
            {
                question: "Do you offer luxury cars?",
                answer: "Yes. We feature BMW, Mercedes, Audi, Porsche, and more for luxury travelers.",
            },
            {
                question: "Is there a young driver fee?",
                answer: "Drivers under 26 may be subject to additional verification or insurance fees, depending on the vehicle.",
            },
            {
                question: "Can I add a child seat or extra driver?",
                answer: "Yes add-ons like child seats, boosters, and extra drivers can be selected during booking.",
            },
            {
                question: "How are car prices calculated?",
                answer: "Prices adjust dynamically by day/week/month. Longer rentals usually mean lower daily rates.",
            },
            {
                question: "Can I contact the rental agency directly?",
                answer: "All communication goes through MarHire to ensure transparency and service quality.",
            },
        ],
    },
    {
        category: "Boat Rental",
        faqs: [
            {
                question: "Are boat rentals private or shared?",
                answer: "You can choose either. Most listings offer private charters for families, friends, or events.",
            },
            {
                question: "Is a captain included?",
                answer: 'Yes, all boats with "With Captain" enabled come with an experienced licensed captain.',
            },
            {
                question: "Do I need a boating license?",
                answer: "No license is needed. Our rentals always include a captain or crew.",
            },
            {
                question: "What's included in the price?",
                answer: "Most listings include fuel, snacks, life jackets, and more. Check the “What's Included” section.",
            },
            {
                question: "Can I bring my own food or drinks?",
                answer: "Yes, unless restricted by the provider. Alcohol may not be included or allowed in some listings.",
            },
            {
                question: "Can I book for a party or event?",
                answer: "Absolutely. Select Private Party or Sunset Cruise under “Purpose” while booking.",
            },
            {
                question: "Are there any age restrictions?",
                answer: "Generally, no. Children are welcome under adult supervision. Safety gear is provided.",
            },
            {
                question: "Can I fish during the trip?",
                answer: "Yes, many boats are equipped for fishing trips. Select that option in the booking.",
            },
            {
                question: "What happens if the weather is bad?",
                answer: "We offer reschedule or refund options in case of unsafe weather conditions.",
            },
            {
                question: "Is the price per person or per group?",
                answer: "Boat rentals are typically priced per boat, based on duration.",
            },
            {
                question: "Where do trips depart from?",
                answer: "Departure locations are listed on each boat page (e.g., Agadir Marina, Casablanca Port).",
            },
            {
                question: "Are life jackets provided?",
                answer: "Yes life jackets and safety equipment are always provided for all passengers.",
            },
            {
                question: "Can I book a boat in advance?",
                answer: "Yes. Bookings must be made at least 2 days in advance.",
            },
            {
                question: "Do I need to arrive early?",
                answer: "Yes please arrive 15 minutes before departure time.",
            },
        ],
    },
    {
        category: "Private Drivers",
        faqs: [
            {
                question: "What types of services do drivers offer?",
                answer: "Airport transfers, business travel, intercity rides, and full-day tours all with professional drivers.",
            },
            {
                question: "Are drivers multilingual?",
                answer: "Yes, most of our drivers speak English, French, and Arabic.",
            },
            {
                question: "Is the price per person or per trip?",
                answer: "Prices are based on the vehicle and duration, not per person.",
            },
            {
                question: "Can I choose a luxury car with a driver?",
                answer: "Yes. We offer Mercedes, BMW, Toyota Prado, and more.",
            },
            {
                question: "Do I need to tip the driver?",
                answer: "Tipping is not required but always appreciated.",
            },
            {
                question: "Is fuel included?",
                answer: "Yes, all bookings include fuel and tolls unless stated otherwise.",
            },
            {
                question: "Can I book just for an airport transfer?",
                answer: "Absolutely. Select Airport Transfer during booking.",
            },
            {
                question: "Are drivers available for full-day bookings?",
                answer: "Yes, we offer hourly, half-day, full-day, and multi-day packages.",
            },
            {
                question: "How many people can the car accommodate?",
                answer: "Each listing includes maximum passengers and luggage info.",
            },
            {
                question: "Are pets allowed?",
                answer: "Depends on the car and driver. Please mention it in your additional notes.",
            },
            {
                question: "What if my flight is delayed?",
                answer: "Provide your flight number our team tracks delays and adjusts accordingly.",
            },
            {
                question: "Can I request a female driver?",
                answer: "If available, yes. Please mention this request in the booking notes.",
            },
            {
                question: "Are driver services refundable?",
                answer: "Yes you can cancel up to 48 hours in advance for a full refund.",
            },
            {
                question: "Can I contact the driver directly?",
                answer: "No all coordination goes through MarHire for quality control.",
            },
        ],
    },
    {
        category: "Activities",
        faqs: [
            {
                question: "Are activities private or in groups?",
                answer: "We offer both. Check each listing for “Private” or “Group” options.",
            },
            {
                question: "Is pickup included for activities?",
                answer: "Yes, if marked as “Pickup Included” in the listing. Otherwise, a meeting point is provided.",
            },
            {
                question: "What's included in the price?",
                answer: "Each listing details what's included and not included — like guides, snacks, or gear.",
            },
            {
                question: "Are tours available in English?",
                answer: "Yes. Most providers speak English, French, and Arabic.",
            },
            {
                question: "Is there a minimum group size?",
                answer: "Some activities require at least 2 people. It will be shown on the listing page.",
            },
            {
                question: "Can I bring kids?",
                answer: "Yes many experiences are family-friendly. Check the “Minimum Age” section.",
            },
            {
                question: "Do I need special gear?",
                answer: "If gear is required, it's usually included. For example: helmets for quad tours.",
            },
            {
                question: "Are there any physical requirements?",
                answer: "Some activities have difficulty ratings (easy, medium, hard). Choose what suits your level.",
            },
            {
                question: "Is insurance included?",
                answer: "Yes, all activities include basic coverage.",
            },
            {
                question: "What happens if I'm late?",
                answer: "Please arrive at least 15 minutes early. Late arrivals may forfeit their booking.",
            },
            {
                question: "Can I cancel an activity?",
                answer: "Yes up to 24 hours before the start time.",
            },
            {
                question: "Are discounts available for groups?",
                answer: "Many activities offer discounts for groups of 5+.",
            },
            {
                question: "How long do activities last?",
                answer: "Duration ranges from 1 hour to full-day. It's clearly shown on each listing.",
            },
            {
                question: "Can I book an activity for a specific time?",
                answer: "Yes. Select your preferred time (morning, afternoon, or evening) during checkout.",
            },
        ],
    },
];

const FAQ = () => (
    <>
    <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-4 text-center">
            Frequently Asked Questions
        </h1>
        <p className="text-center mb-8 text-lg">
            Got a question about booking with MarHire? Start here!
        </p>
        {faqData.map((cat, i) => (
            <section key={i} className="mb-8">
                <h2 className="text-xl font-semibold mb-3">{cat.category}</h2>
                <Accordion type="single" collapsible className="w-full">
                    {cat.faqs.map((faq, idx) => (
                        <AccordionItem key={idx} value={`item-${i}-${idx}`}>
                            <AccordionTrigger className="text-left text-lg font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-700">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>
        ))}

        {/* Bottom Info Section */}
        <div className="mt-12 text-center border-t pt-6">
            <div className="mb-2 font-semibold text-lg">Still need help?</div>
            <p>
                Contact us anytime via{" "}
                <a
                    href="mailto:info@marhire.com"
                    className="text-blue-600 underline"
                >
                    email
                </a>{" "}
                or{" "}
                <a
                    href="https://wa.me/212660745055"
                    className="text-green-600 underline"
                >
                    WhatsApp
                </a>{" "}
                - we're real people, no bots!
            </p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                <div className="p-4 rounded bg-gray-100">
                    <b>Book with Total Confidence:</b> From verified partners
                    to clear terms, your booking is always protected with
                    MarHire.
                </div>
                <div className="p-4 rounded bg-gray-100">
                    <b>Earn Rewards Every Time:</b> Get travel credits with
                    every booking. The more you explore, the more you save.
                </div>
                <div className="p-4 rounded bg-gray-100">
                    <b>All-in-One Travel Platform:</b> Cars, drivers, boats,
                    and tours all in one place, all under one trusted brand.
                </div>
                <div className="p-4 rounded bg-gray-100">
                    <b>Tourist-Friendly, Hassle-Free:</b> No language
                    barrier, no scams - we're locals who know how to make your
                    trip safe, smooth, and unforgettable.
                </div>
            </div>
        </div>
    </div>
    <FreeTexts slug="faq" />
    <Footer />
    </>
    
);

export default FAQ;
