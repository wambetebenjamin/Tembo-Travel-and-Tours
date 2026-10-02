import toursData from "@/data/tours.json";
import type { Destination, TourPackage } from "@/lib/types";

export const tours = toursData as TourPackage[];

export const destinations: Destination[] = [
  {
    slug: "maasai-mara",
    name: "Maasai Mara",
    country: "Kenya",
    image: "/images/maasai-mara.jpg",
    imageAlt: "Elephants and safari travellers in Maasai Mara",
    description: "Golden plains, big-cat sightings and the pulse of the Great Migration.",
  },
  {
    slug: "zanzibar",
    name: "Zanzibar",
    country: "Tanzania",
    image: "/images/zanzibar-traveller.jpg",
    imageAlt: "Traveller on Zanzibar's white sand coast",
    description: "Swahili history, spice gardens and warm Indian Ocean shallows.",
  },
  {
    slug: "amboseli",
    name: "Amboseli",
    country: "Kenya",
    image: "/images/amboseli-elephants.jpg",
    imageAlt: "Elephant herd on open savannah",
    description: "Celebrated elephant families and clear-day views of Kilimanjaro.",
  },
  {
    slug: "diani-beach",
    name: "Diani Beach",
    country: "Kenya",
    image: "/images/kenya-coast.jpg",
    imageAlt: "Aerial view of the white sand Kenyan coast",
    description: "Powder-soft sand, reef adventures and effortless coastal days.",
  },
  {
    slug: "gorilla-trekking-uganda",
    name: "Gorilla Trekking",
    country: "Uganda",
    image: "/images/uganda-gorilla.jpg",
    imageAlt: "Mountain gorilla in a green forest",
    description: "A moving, ranger-led encounter in Bwindi's ancient rainforest.",
  },
];

export const testimonials = [
  {
    name: "Wanjiku M.",
    country: "Kenya",
    tour: "Diani Family Escape",
    rating: 5,
    image: "/images/traveller-wanjiku.jpg",
    text: "Tembo made a multi-generation holiday feel easy. Every transfer was on time, the children were considered, and we never felt rushed.",
  },
  {
    name: "Asha N.",
    country: "Tanzania",
    tour: "Maasai Mara Signature Safari",
    rating: 5,
    image: "/images/traveller-asha.jpg",
    text: "Our guide read the landscape beautifully. We saw so much, but the quiet sundowner overlooking the plains is what I still talk about.",
  },
  {
    name: "Nasra K.",
    country: "Kenyan diaspora, UK",
    tour: "Zanzibar Spice & Sea",
    rating: 5,
    image: "/images/traveller-nasra.jpg",
    text: "Planning from abroad was simple and transparent. Tembo answered every question and built in enough free time for us to truly rest.",
  },
  {
    name: "Daniel R.",
    country: "Canada",
    tour: "Uganda Gorilla Encounter",
    rating: 5,
    image: "/images/safari-guide.jpg",
    text: "A thoughtful itinerary from start to finish. The trek briefing, lodge and local team were exceptional, and every detail felt responsible.",
  },
];

export const safariCategories = [
  { name: "Budget Safaris", image: "/images/safari-road.jpg", href: "/search?category=Budget", size: "large" },
  { name: "Luxury Safaris", image: "/images/balloon-safari.jpg", href: "/search?category=Luxury", size: "small" },
  { name: "Family Safaris", image: "/images/elephant-calves.jpg", href: "/search?category=Family", size: "small" },
  { name: "Honeymoon Safaris", image: "/images/mara-lions.jpg", href: "/search?category=Honeymoon", size: "wide" },
  { name: "Group Tours", image: "/images/elephant-encounter.jpg", href: "/search?category=Group", size: "small" },
  { name: "Day Trips", image: "/images/safari-sunset.jpg", href: "/search?duration=1", size: "small" },
];

export function getTour(slug: string) {
  return tours.find((tour) => tour.slug === slug);
}

export function getDestination(slug: string) {
  return destinations.find((destination) => destination.slug === slug);
}

export const whatsappUrl =
  "https://wa.me/254112272061?text=Hello!%20I%20would%20like%20to%20plan%20a%20trip%20with%20Tembo%20Travel.";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://www.tembotravel.co.ke";

export const BLUR_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxNicgaGVpZ2h0PScxMCc+PHJlY3Qgd2lkdGg9JzE2JyBoZWlnaHQ9JzEwJyBmaWxsPScjZWNlZmY4Jy8+PC9zdmc+";
