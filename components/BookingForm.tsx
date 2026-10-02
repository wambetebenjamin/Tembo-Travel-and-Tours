"use client";

import { ArrowRight, CalendarDays, Mail, MessageCircle, Phone, UserRound, Users } from "lucide-react";
import { FormEvent, useState } from "react";

export function BookingForm({ tourSlug, tourName }: { tourSlug: string; tourName: string }) {
  const [status, setStatus] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setStatus("");
    setWhatsapp("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      tourSlug,
      tourName,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      travelDate: formData.get("travelDate"),
      groupSize: Number(formData.get("groupSize")),
      specialRequests: formData.get("specialRequests"),
    };

    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { message?: string; error?: string; errors?: string[]; whatsappUrl?: string };
      if (!response.ok) throw new Error(data.errors?.[0] || data.error || "Unable to send your enquiry.");
      setStatus(data.message || "Your enquiry has been received.");
      setWhatsapp(data.whatsappUrl || "");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send your enquiry.");
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="booking-heading"><small>Start planning</small><h2>Book this journey</h2><p>No payment yet. Our team will confirm availability and tailor the details with you.</p></div>
      <label><span><UserRound />Name</span><input type="text" name="name" autoComplete="name" required minLength={2} placeholder="Your full name" /></label>
      <label><span><Mail />Email</span><input type="email" name="email" autoComplete="email" required placeholder="you@example.com" /></label>
      <label><span><Phone />Phone</span><input type="tel" name="phone" autoComplete="tel" required placeholder="+254 700 000 000" /></label>
      <div className="form-row">
        <label><span><CalendarDays />Travel date</span><input type="date" name="travelDate" min={new Date().toISOString().split("T")[0]} required /></label>
        <label><span><Users />Group size</span><input type="number" name="groupSize" min="1" max="100" defaultValue="2" required /></label>
      </div>
      <label><span>Special requests</span><textarea name="specialRequests" rows={4} placeholder="Celebration, room preferences, accessibility or anything else…" /></label>
      <button className="button button-amber booking-submit" type="submit" disabled={sending}>{sending ? "Sending…" : "Book Now"}<ArrowRight /></button>
      <p className="form-status" aria-live="polite">{status}</p>
      {whatsapp ? <a className="whatsapp-link booking-whatsapp" href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Continue on WhatsApp</a> : null}
      <p className="form-fineprint">By enquiring, you agree to be contacted about this trip. We never sell your details.</p>
    </form>
  );
}
