# Tembo Travel and Tours

A Next.js 14 App Router website for a Nairobi-based East African travel company.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production services

The site works with local JSON/MDX content without external credentials. For persistent booking/newsletter storage and transactional notifications, copy `.env.example` to `.env.local` and configure:

- Vercel KV / Upstash-compatible REST credentials
- Meta WhatsApp Cloud API credentials
- Resend email credentials

Without provider credentials, booking submissions are validated and acknowledged with a direct WhatsApp continuation link. On Vercel, configure KV before accepting live bookings so enquiries persist beyond a serverless request.

## Content

- Tour packages: `data/tours.json`
- Blog articles: `content/blog/*.mdx`
- Photo provenance: `image-credits.md`
- Global design system: `app/globals.css`

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Framework security note

This project is pinned to **Next.js 14.2.35** because the delivery brief explicitly requires Next.js 14. As of October 2026, `npm audit` reports upstream advisories that no 14.x release fixes. The project avoids remote image patterns, AVIF optimisation, rewrites, middleware and Server Actions, which removes several affected surfaces, but a move to a supported patched Next.js major is recommended before launch if the Next.js 14 constraint can be relaxed.
