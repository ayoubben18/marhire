
import * as React from 'react';
import { AppHeader } from '@/components/app-header';
import { 
  AboutHero, 
  StoryAndVision, 
  TimelineSection, 
  WhyChooseMarHire,
  OurServices,
  SafetyAndTrust,
  OperatingCities,
  ContactUs,
  ResourcesFaq
} from '@/components/about-page-sections';
import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'About MarHire - Our Mission to Simplify Morocco Travel',
  description: 'Learn about MarHire, our story, and our mission to connect travelers with the best local cars, drivers, boats, and activities Morocco has to offer.',
};


export default function AboutPage() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' }
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <AppHeader />
      <main className="flex-1">
        <AboutHero breadcrumbs={<Breadcrumbs items={breadcrumbItems} />} />
        <StoryAndVision />
        <TimelineSection />
        <WhyChooseMarHire />
        <OurServices />
        <SafetyAndTrust />
        <OperatingCities />
        <ContactUs />
        <ResourcesFaq />
      </main>
    </div>
  );
}
