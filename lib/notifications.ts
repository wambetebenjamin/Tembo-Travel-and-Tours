import type { BookingPayload } from "@/lib/types";

function bookingText(booking: BookingPayload, id: string) {
  return [
    `New Tembo booking enquiry (${id})`,
    `Package: ${booking.tourName}`,
    `Traveller: ${booking.name}`,
    `Email: ${booking.email}`,
    `Phone: ${booking.phone}`,
    `Travel date: ${booking.travelDate}`,
    `Group size: ${booking.groupSize}`,
    booking.specialRequests ? `Requests: ${booking.specialRequests}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendWhatsAppNotification(booking: BookingPayload, id: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return { configured: false };

  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: process.env.WHATSAPP_NOTIFICATION_TO || "254112272061",
      type: "text",
      text: { body: bookingText(booking, id), preview_url: false },
    }),
  });
  if (!response.ok) throw new Error(`WhatsApp notification failed with ${response.status}`);
  return { configured: true };
}

export async function sendBookingEmails(booking: BookingPayload, id: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !from) return { configured: false };

  const send = (to: string, subject: string, text: string) =>
    fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], subject, text }),
    });

  const confirmation = send(
    booking.email,
    `We received your ${booking.tourName} enquiry`,
    `Hello ${booking.name},\n\nAsante for planning with Tembo Travel and Tours. We received your enquiry ${id} and our Nairobi team will respond shortly.\n\nTravel date: ${booking.travelDate}\nGroup size: ${booking.groupSize}\n\nTembo Travel and Tours`,
  );
  const team = send(
    process.env.BOOKING_TEAM_EMAIL || "bookings@example.com",
    `New booking enquiry: ${booking.tourName}`,
    bookingText(booking, id),
  );

  const responses = await Promise.all([confirmation, team]);
  if (responses.some((response) => !response.ok)) throw new Error("One or more booking emails failed.");
  return { configured: true };
}
