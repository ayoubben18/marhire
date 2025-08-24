
/**
 * @fileoverview Mock data layer for fetching partner and listing information.
 * In a real application, this would connect to a database or a CMS.
 */

import { MOCK_PARTNERS, MOCK_LISTINGS as ALL_LISTINGS } from './data';
import type { Listing as FullListing } from './types';

// --- TYPE DEFINITIONS ---

export type Category = "Cars" | "Private Drivers" | "Boats" | "Activities";
export type ListingCategory = "car" | "driver" | "boat" | "activity";

export type Listing = {
  id: string;
  title: string;
  category: ListingCategory;
  city: string;
  image: string;
  specs?: string[];          // e.g., ["SUV", "Automatic", "A/C", "7 seats"]
  tags?: string[];           // e.g., ["No Deposit", "Unlimited KM*"]
  pricePerDay?: number;
  slug?: string;
};

export type Partner = {
  slug: string;
  name: string;
  city: string;
  category: Category;
  logo: string;
  coverImage?: string;
  verified: boolean;
  languages?: string[];      // ["English","French","Arabic","Spanish"]
  agencyEmail?: string;
  agencyWhatsappUrl?: string;
  shortAbout: string;
  longAbout: string;
  policies: {
    deposit: string;
    fuel: "Same-to-same";
    kilometers: string;
    pickupDocs: string;
    changes: string;
    intercity: string;
    crossBorder: "Not allowed";
  };
  openingHours?: string[];   // e.g., ["Mon–Sun 09:00–21:00"]
};


// --- API FUNCTIONS ---

export async function getPartners(): Promise<Partner[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return MOCK_PARTNERS;
}

export async function getPartnerBySlug(slug: string): Promise<Partner | null> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  const partner = MOCK_PARTNERS.find(p => p.slug === slug);
  return partner || null;
}

export async function getPartnerListings(partnerSlug: string): Promise<FullListing[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const partner = MOCK_PARTNERS.find(p => p.slug === partnerSlug);
  if (!partner) return [];

  // Filter the main listings by the partner's name.
  return ALL_LISTINGS.filter(listing => listing.provider.name === partner.name);
}
