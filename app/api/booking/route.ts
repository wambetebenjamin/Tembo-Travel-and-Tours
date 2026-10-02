import { NextResponse } from "next/server";
import type { BookingPayload } from "@/lib/types";
import { sendBookingEmails, sendWhatsAppNotification } from "@/lib/notifications";
import { saveBooking } from "@/lib/storage";
import { validateBooking } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as Partial<BookingPayload>;
    const errors = validateBooking(input);
    if (errors.length) return NextResponse.json({ error: "Please check your details.", errors }, { status: 400 });

    const booking = {
      tourSlug: String(input.tourSlug).trim(),
      tourName: String(input.tourName).trim(),
      name: String(input.name).trim(),
      email: String(input.email).trim().toLowerCase(),
      phone: String(input.phone).trim(),
      travelDate: String(input.travelDate),
      groupSize: Number(input.groupSize),
      specialRequests: String(input.specialRequests || "").trim().slice(0, 2000),
    } satisfies BookingPayload;

    const id = `TMB-${Date.now().toString(36).toUpperCase()}-${crypto.randomUUID().slice(0, 5).toUpperCase()}`;
    const record = { ...booking, id, status: "new", createdAt: new Date().toISOString() };
    const stored = await saveBooking(id, record);
    const delivery = await Promise.allSettled([
      sendWhatsAppNotification(booking, id),
      sendBookingEmails(booking, id),
    ]);
    const whatsappText = encodeURIComponent(`Hello! I just submitted enquiry ${id} for ${booking.tourName}. My name is ${booking.name}.`);

    return NextResponse.json({
      message: "Asante! Your enquiry is in. Our Nairobi team will be in touch shortly.",
      bookingId: id,
      saved: stored.configured ? "vercel-kv" : "request-accepted",
      notifications: delivery.map((result) => result.status),
      whatsappUrl: `https://wa.me/254112272061?text=${whatsappText}`,
    }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We couldn’t submit your enquiry. Please try WhatsApp or call +254 112 272 061." }, { status: 500 });
  }
}
