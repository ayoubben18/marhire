
import * as React from 'react';
import type { Metadata } from 'next';
import { AppHeader } from '@/components/app-header';
import { 
  JoinUsHero,
  WhyPartnerSection,
  HowItWorksSection,
  WhoCanJoinSection,
  RequirementsSection,
  CommissionSection,
  FaqSection,
  PartnerFormSection,
  PartnerContactFooter
} from '@/components/join-us-page-sections';
import { Breadcrumbs } from '@/components/breadcrumbs';

const PRIMARY_DOMAIN = 'https://www.marhire.com'; // Replace with actual domain

export const metadata: Metadata = {
  title: 'Partner with MarHire: List Your Cars, Drivers & Tours in Morocco',
  description: 'Join MarHire to list your car rentals, private drivers, boats, or activities. Reach more travelers in Morocco, get 24/7 support, and grow your business with our commission-based model.',
  alternates: {
    canonical: `${PRIMARY_DOMAIN}/join-us`,
  },
  openGraph: {
    title: 'Partner with MarHire: List Your Cars, Drivers & Tours in Morocco',
    description: 'Join MarHire to list your car rentals, private drivers, boats, or activities. Reach more travelers in Morocco and grow your business with our commission-based model.',
    url: `${PRIMARY_DOMAIN}/join-us`,
    siteName: 'MarHire',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a branded OG image
        width: 1200,
        height: 630,
        alt: 'A collage of a rental car, a private driver, and a tour activity in Morocco.',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner with MarHire: List Your Cars, Drivers & Tours in Morocco',
    description: 'Join MarHire to list your car rentals, private drivers, boats, or activities. Reach more travelers in Morocco and grow your business with our commission-based model.',
    images: [`https://placehold.co/1200x630.png`], // Replace with a branded Twitter image
  },
  robots: "index, follow",
};

const faqItems = [
    { question: "How long does the approval process take?", answer: "Our goal is to review and approve new partner applications within 24-48 hours. Once we verify your documents and services, we'll begin building your listing right away." },
    { question: "What are the fees or commission rates?", answer: "MarHire operates on a transparent, commission-based model. You only pay a small percentage when you get a confirmed booking. There are no sign-up fees or monthly costs. For detailed rates, please see our commissions page or contact us." },
    { question: "How and when do I get paid?", answer: "We process partner payouts on a monthly basis via secure bank transfer. You can track all your bookings, earnings, and payout statements directly from your partner dashboard." },
    { question: "Can I edit my pricing and availability?", answer: "Yes. You have full control over your listings. You can update pricing, block out dates, and manage availability easily through your dedicated partner dashboard at any time." },
    { question: "How can I pause my listings if I'm fully booked?", answer: "You can temporarily disable or pause any of your listings directly from your partner dashboard with a single click, preventing new bookings until you're ready to reactivate." },
    { question: "What are your support hours for partners?", answer: "We provide dedicated partner support via WhatsApp and email. Our team is based in Morocco and is available to assist you with any questions or urgent issues 7 days a week." },
    { question: "Is there a long-term contract?", answer: "No, we believe in flexible partnerships. You can join MarHire without any long-term commitment and can choose to remove your listings at any time, as outlined in our partner agreement." },
    { question: "How is my business and customer data handled?", answer: "We take data privacy seriously. All data is handled in compliance with our Privacy Policy. Your business information is secure, and we only share what's necessary to facilitate bookings." },
    { question: "Can I list my services in multiple cities like Agadir and Marrakech?", answer: "Absolutely. If you operate in multiple locations across Morocco, you can create and manage listings for each city under a single partner account." },
    { question: "I'm already on other platforms. Is it easy to list with MarHire?", answer: "Yes, our team makes it simple. Just provide us with your service details, and we'll handle the initial setup to get your listings live on MarHire quickly and efficiently." },
];

const JsonLd = () => {
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "MarHire",
      "url": PRIMARY_DOMAIN,
      "logo": `${PRIMARY_DOMAIN}/marhire-logo.png`, // Placeholder
      "sameAs": [
        "https://www.facebook.com/marhire", // Placeholder
        "https://www.instagram.com/marhire" // Placeholder
      ]
    };

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqItems.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </>
    );
};


export default function JoinUsPage() {
   const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Become a Partner', href: '/join-us' }
  ];

  return (
    <>
      <JsonLd />
      <div className="flex min-h-screen w-full flex-col bg-base">
        <AppHeader />
        <main className="flex-1">
          <JoinUsHero breadcrumbs={<Breadcrumbs items={breadcrumbItems} />} />
          <WhyPartnerSection />
          <HowItWorksSection />
          <WhoCanJoinSection />
          <RequirementsSection />
          <CommissionSection />
          <FaqSection faqItems={faqItems} />
          <PartnerFormSection />
          <PartnerContactFooter />
        </main>
      </div>
    </>
  );
}
