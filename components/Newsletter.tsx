"use client";

import { ArrowRight, Mail } from "lucide-react";
import { FormEvent, useState } from "react";

export function Newsletter() {
  const [status, setStatus] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("Joining…");
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") || "");
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = (await response.json()) as { message?: string; error?: string };
    setStatus(data.message || data.error || "Please try again.");
    if (response.ok) form.reset();
  }

  return (
    <section className="newsletter section-pad">
      <div className="newsletter-inner" data-reveal="up">
        <span className="newsletter-icon"><Mail /></span>
        <p className="eyebrow">Notes from the road</p>
        <h2>Get travel deals before everyone else.</h2>
        <p>Seasonal offers, practical guides and new East African journeys. Useful, occasional, never noisy.</p>
        <form onSubmit={submit}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" name="email" placeholder="Your email address" autoComplete="email" required />
          <button type="submit" className="button button-ocean">Join the list <ArrowRight /></button>
        </form>
        <p className="form-status" aria-live="polite">{status}</p>
      </div>
    </section>
  );
}
