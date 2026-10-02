export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface TourPrice {
  label: string;
  people: string;
  price: number;
  note?: string;
}

export interface TourPackage {
  slug: string;
  name: string;
  destination: string;
  country: string;
  category: string;
  durationDays: number;
  durationNights: number;
  image: string;
  imageAlt: string;
  summary: string;
  highlights: string[];
  priceFrom: number;
  rating: number;
  reviews: number;
  featured: boolean;
  itinerary: ItineraryDay[];
  inclusions: string[];
  exclusions: string[];
  prices: TourPrice[];
}

export interface Destination {
  slug: string;
  name: string;
  country: string;
  image: string;
  imageAlt: string;
  description: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
}

export interface BookingPayload {
  tourSlug: string;
  tourName: string;
  name: string;
  email: string;
  phone: string;
  travelDate: string;
  groupSize: number;
  specialRequests?: string;
}
