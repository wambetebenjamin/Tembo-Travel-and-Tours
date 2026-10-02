"use client";

import { CalendarDays, MapPin, Search, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export function SearchWidget() {
  const router = useRouter();

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      if (String(value).trim()) params.set(key, String(value));
    });
    router.push(`/search?${params.toString()}`);
  }

  return (
    <form className="hero-search" onSubmit={submit} aria-label="Search tour packages">
      <label className="search-field">
        <MapPin aria-hidden="true" />
        <span><small>Destination</small>
          <select name="destination" defaultValue="">
            <option value="">Where to?</option>
            <option>Maasai Mara</option><option>Amboseli</option><option>Zanzibar</option>
            <option>Diani Beach</option><option>Bwindi</option><option>Serengeti</option>
          </select>
        </span>
      </label>
      <label className="search-field">
        <CalendarDays aria-hidden="true" />
        <span><small>Travel date</small><input type="date" name="date" min={new Date().toISOString().split("T")[0]} /></span>
      </label>
      <label className="search-field">
        <Users aria-hidden="true" />
        <span><small>Travellers</small><input type="number" name="travellers" min="1" max="30" defaultValue="2" /></span>
      </label>
      <button className="button button-amber search-submit" type="submit"><Search aria-hidden="true" />Search Packages</button>
    </form>
  );
}
