# Live Life Shameless — Academy & Funnel

Marketing + funnel website for the LLS Telugu course business (a StartupWithShashank brand).
Next.js App Router · TypeScript · Tailwind · Framer Motion · React Three Fiber · React Hook Form + Zod · NextAuth.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
```

That's it. The **dev bypass** is on by default in `next dev`, so the entire funnel —
goal router → signup gate → path → checkout → success — is clickable with **no keys at all**.

Deploys to Vercel with zero config (`vercel` or connect the repo).

## The two intentional stubs

Everything is built; exactly two things are wired-but-stubbed:

### 1. Razorpay payment

| What | Where |
| --- | --- |
| Server order-create API (commented, ready) | `app/api/create-order/route.ts` |
| Client checkout mount + handler (commented, ready) | `lib/payments.ts` → `initiatePayment()` |
| Keys | `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `NEXT_PUBLIC_RAZORPAY_KEY_ID` in `.env.local` |

Steps: `npm i razorpay` → add keys → uncomment the marked blocks in both files → add a
signature-verifying webhook route before granting access (noted in the TODO).
**Important:** the route recomputes the amount server-side from course data — keep it that way.

### 2. Google OAuth

| What | Where |
| --- | --- |
| NextAuth config (Google provider, ready) | `lib/auth/options.ts` |
| Route handler | `app/api/auth/[...nextauth]/route.ts` |
| The "Continue with Google" button | `components/router/SignupGate.tsx` (swap the dev-bypass branch for `signIn("google")` — the exact line is in a TODO comment) |
| Keys | `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXTAUTH_SECRET` in `.env.local` |

Copy `.env.example` → `.env.local` and fill in values.

## Turning OFF the dev bypass for production

The bypass (`lib/utils.ts` → `DEV_BYPASS`) is on when `NEXT_PUBLIC_DEV_BYPASS=true` **or**
when running `next dev`. Production builds have it **off by default**. To be explicit, set
`NEXT_PUBLIC_DEV_BYPASS=false` in your Vercel env. When off: the Google button calls real
OAuth, and the pay button requires real Razorpay wiring.

## Editing courses, prices, copy

One source of truth, all typed:

| Content | File |
| --- | --- |
| All 27 courses (titles, prices, hooks, lanes, live/coming-soon), bundle price, founding-pricing flag, router recommendation logic | `lib/data/courses.ts` |
| Testimonials, FAQ, Shashank story, deliverables, site name/links | `lib/data/site.ts` |
| Colour tokens ("Bold Ink & Ember") | `tailwind.config.ts` + `app/globals.css` |
| Fonts | `app/layout.tsx` |

Change a price in `courses.ts` and it updates everywhere — cards, ladders, value stack, checkout.
The bundle price is a marked `TODO: editable placeholder` (₹9,999). Set `FOUNDING_PRICING = true`
to activate founding prices on the anchors.

## Site map / funnel logic

- `/` — academy homepage (browse + abundance): hero (progressive 3D), goal-router entry, Netflix-style lane rows, bundle value-stack, proof, FAQ
- `/start` — gated goal-router: goal → 2 skippable questions → signup gate → redirect
- `/path` — "your path": ONE recommendation + lane ladder + bundle upsell
- `/courses/[slug]` — conversion landing template (ad traffic): one offer, no nav, no other prices; coming-soon courses render a waitlist
- `/all-access` — bundle page, premium-first value stack
- `/checkout` — max two options (Hick's Law), RHF+Zod buyer form, trust badges
- `/checkout/success` · `/checkout/failed` — next steps / recovery
- `/about`, `/terms` (no-refund policy stated plainly), `/api/leads`, `/api/waitlist`

## Analytics

Every funnel action calls `track(event, props)` in `lib/tracking.ts` (currently `console.debug`
+ TODO). The goal-router answer distribution is the business's Telugu-audience dataset — wire
PostHog/GA4/sheet before running ads. Lead + waitlist API routes (`app/api/leads`, `app/api/waitlist`)
log to server console with TODOs for a sheet/Supabase/CRM.

## Performance rules baked in

- WebGL hero loads **only** on capable desktops after idle (`components/home/HeroVisual.tsx`);
  phones, slow connections, `saveData`, and `prefers-reduced-motion` always get the pure-CSS fallback —
  they never download three.js.
- All motion is reduced-motion-aware; FAQ uses native `<details>`; fonts use `display: swap`.
- No images yet (gradient placeholders) — when adding real thumbnails use `next/image`.

## Remaining TODOs (all marked in-code)

Search the repo for `TODO:` — real testimonials, Shashank photo + course thumbnails, production
domain in `lib/data/site.ts`, WhatsApp invite + support links, analytics backend, lead/waitlist
persistence, Razorpay, Google OAuth, legal review of terms.
