"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { whatsappUrl } from "@/lib/data";

export function WhatsAppButton() {
  const [firstVisit, setFirstVisit] = useState(false);

  useEffect(() => {
    const key = "tembo-whatsapp-seen";
    if (!window.sessionStorage.getItem(key)) {
      setFirstVisit(true);
      window.sessionStorage.setItem(key, "true");
    }
  }, []);

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      className={`whatsapp-float${firstVisit ? " first-visit" : ""}`}
      aria-label="Plan your trip with us on WhatsApp"
    >
      <span className="whatsapp-tooltip">Plan your trip with us</span>
      <MessageCircle aria-hidden="true" />
    </a>
  );
}
