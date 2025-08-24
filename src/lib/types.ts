export type ListingType = "Car Rental" | "Private Driver" | "Boat" | "Activity";
export type SearchCategory = 'car-rental' | 'private-driver' | 'boats' | 'activities';
export type SortOption = "recommended" | "price-asc" | "price-desc";

export type Listing = {
  id: string;
  name: string;
  type: ListingType;
  image: string;
  gallery?: string[];
  provider: {
    name: string;
    logo: string;
    isVerified: boolean;
  };
  location: {
    city: string;
    neighborhood: string;
  };
  specs: {
    seats?: number;
    transmission?: "Automatic" | "Manual";
    fuelType?: "Petrol" | "Diesel" | "Hybrid" | "Electric";
    hasAc?: boolean;
    doors?: number;
    fuelPolicy?: "Full to Full" | "Same to Same";
    kmPolicy?: "Unlimited" | "Limited";
    deposit?: number;
    // Boat specs
    captain?: "With Captain" | "Without Captain";
    // Private Driver specs
    luggage?: number;
    languages?: string[];
    // Activity specs
    activityType?: "Group" | "Private";
    difficulty?: "Easy" | "Medium" | "Hard";
  };
  badges: {
    freeCancellation?: boolean;
    noDeposit?: boolean;
  };
  price: {
    perDay: number;
    perHour?: number;
    perTrip?: number;
  };
};

export type SearchParams = {
  location?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  dropoffDate?: string;
  pickupTime?: string;
  dropoffTime?: string;
  people?: string;
  [key: string]: string | string[] | undefined;
};
