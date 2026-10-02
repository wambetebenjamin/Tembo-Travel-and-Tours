import type { BookingPayload } from "@/lib/types";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s()-]{7,20}$/;

export function validateBooking(input: Partial<BookingPayload>) {
  const errors: string[] = [];
  if (!input.name || input.name.trim().length < 2) errors.push("Please enter your full name.");
  if (!input.email || !emailPattern.test(input.email)) errors.push("Please enter a valid email address.");
  if (!input.phone || !phonePattern.test(input.phone)) errors.push("Please enter a valid phone number.");
  if (!input.travelDate || Number.isNaN(Date.parse(input.travelDate))) errors.push("Please choose a travel date.");
  if (!input.groupSize || input.groupSize < 1 || input.groupSize > 100) errors.push("Group size must be between 1 and 100.");
  if (!input.tourSlug || !input.tourName) errors.push("A tour package is required.");
  return errors;
}

export function isValidEmail(email: string) {
  return emailPattern.test(email);
}
