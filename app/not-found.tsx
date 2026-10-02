import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return <main id="main-content" className="not-found"><Compass /><p className="eyebrow">A little off route</p><h1>We couldn&apos;t find that page.</h1><p>The journey may have moved, but there is plenty more of East Africa to explore.</p><Link href="/" className="button button-amber">Return home</Link></main>;
}
