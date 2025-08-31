
# Sangini AI — Showcase Starter (No Images)

This is a **mobile-first PWA** starter that runs in **showcase mode** with **demo data only**.
It implements the navigation, language sorting by state/device locale, WhatsApp-like chat
mechanics (sent/delivered/read ticks), locked media with upsell, Refer & Earn wallet credits,
Gallery (publishing ON by default), and Profile settings — **without any images**.

> Source strategy & sachet pricing borrowed from the Sangini AI v3 plan for Tier‑3 India. (See the business plan for pricing, growth, and constraints.)

## What’s included
- Next.js App Router + TypeScript + Tailwind (Uber‑like black & white)
- PWA manifest + service worker (basic)
- In‑memory **demo API** (`src/demo/*`) — no backend required
- Language modal: **only device locale + IP (mock)** for state detection
- OTP flow via **WhatsApp OTP** (mocked) — **enter `0000`** to verify in demo
- WhatsApp‑familiar chat UI with **ticks** and **top action pills**
- **Locked media** for unauthenticated + free authenticated users (tap → Upsell)
- **Calls** (mock overlay; no recording)
- **Refer & Earn** (₹10 wallet credit on simulated friend join)
- **Community Gallery** default **ON** (toggle in Profile → Privacy)
- Hamburger links to **Telegram / Discord / X**
- **CMS ready**: Strapi content‑type schemas and seed JSON (no images)

## Quick start

1) **Install deps**
```bash
npm i
```

2) **Run dev**
```bash
npm run dev
```
Open http://localhost:3000

3) **Demo tips**
- First load shows Language selection. It uses device locale + a mocked IP‑to‑state (`Punjab`).
- Pick a category → Discover → **Start Chat**.
- Any feature or send triggers **OTP** modal. Enter **0000** as the code.
- Media tiles are **🔒 locked** for free users. Tap to see **Upsell** with sachet SKUs + **Refer & Earn (₹10)**.
- Gallery shows **My media** (from your chat) + **Community** (publishing ON by default).
- Profile → Privacy: toggle Publishing and Read receipts; Wallet & Purchases; Refer & Earn.
- Calls: opens **mock call** overlay (no recording).

## Strapi (optional, to manage models/categories/scenes/SKUs)
- Install Strapi v4: `npx create-strapi-app@latest cms --quickstart`
- Copy the folder `cms/strapi/src/api/*` into your Strapi project.
- Start Strapi, create entries (no images needed). Update `src/demo/useCms.ts` to fetch from your instance (disabled by default).

## Notes
- This starter is **SFW**. Roleplay scenes and categories are **consenting‑adult** only.
- No device‑permission prompts are used for geo/state detection; **device locale + mock IP‑state** only.
- OTP is mocked. **Do not** connect real WhatsApp OTP here.

MIT License.
