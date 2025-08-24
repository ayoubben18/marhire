
import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { AppFooter } from '@/components/app-footer';
import { Poppins, Noto_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { BackToTopButton } from '@/components/back-to-top-button';
import { ClientOnly } from '@/components/client-only';

const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-poppins',
});

const fontNotoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-sans',
});


export const metadata: Metadata = {
  title: 'MarHire Marketplace - Cars, Drivers, Boats & Activities in Morocco',
  description: 'Your trusted marketplace for booking cars, boats, drivers, and activities in Morocco. Find the best deals with local experts, no hidden fees, and 24/7 support.',
  openGraph: {
    title: 'MarHire Marketplace - Cars, Drivers, Boats & Activities in Morocco',
    description: 'Your trusted marketplace for booking cars, boats, drivers, and activities in Morocco. Find the best deals with local experts, no hidden fees, and 24/7 support.',
    url: 'https://marhire.com', // Replace with your actual domain
    siteName: 'MarHire',
    images: [
      {
        url: 'https://placehold.co/1200x630.png', // Replace with a branded image
        width: 1200,
        height: 630,
        alt: 'MarHire Marketplace',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MarHire Marketplace - Cars, Drivers, Boats & Activities in Morocco',
    description: 'Your trusted marketplace for booking cars, boats, drivers, and activities in Morocco. Find the best deals with local experts, no hidden fees, and 24/7 support.',
    images: ['https://placehold.co/1200x630.png'], // Replace with a branded image
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", fontPoppins.variable, fontNotoSans.variable)} suppressHydrationWarning>
        {children}
        <ClientOnly>
          <AppFooter />
        </ClientOnly>
        <Toaster />
        <BackToTopButton />
      </body>
    </html>
  );
}
