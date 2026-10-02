import { ChevronDown, MapPin } from "lucide-react";
import type { ItineraryDay } from "@/lib/types";

export function ItineraryAccordion({ itinerary }: { itinerary: ItineraryDay[] }) {
  return (
    <div className="itinerary-list">
      {itinerary.map((item, index) => (
        <details key={item.day} open={index === 0}>
          <summary><span className="day-number">Day {item.day}</span><strong>{item.title}</strong><ChevronDown /></summary>
          <div className="itinerary-content"><MapPin /><p>{item.description}</p></div>
        </details>
      ))}
    </div>
  );
}
