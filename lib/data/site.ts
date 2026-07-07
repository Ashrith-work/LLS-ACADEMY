import type { FaqItem, Testimonial } from "@/lib/types";

/**
 * Site-wide copy — testimonials, FAQ, Shashank's story, deliverables.
 * TODO: all testimonials and story beats below are clearly-labelled SAMPLE copy
 * written in the target voice. Replace with real, permissioned quotes before launch.
 */

export const SITE = {
  name: "Live Life Shameless",
  shortName: "LLS",
  company: "StartupWithShashank",
  tagline: "Learn what school skipped. Think bigger about your life.",
  url: "https://livelifeshameless.in", // TODO: set the real production domain
  instagramReach: "3.8M+",
  whatsappInviteUrl: "#", // TODO: real WhatsApp community invite link
};

/** Everything a buyer gets with ANY course — concrete, no fluff. */
export const DELIVERABLES = [
  { title: "Recorded video lessons", detail: "Clear, plain-English lessons — learn at your own pace, with lifetime access." },
  { title: "Certificate of completion", detail: "Finish the course and get a certificate you can add to LinkedIn." },
  { title: "WhatsApp community", detail: "People on the same journey as you — questions, wins, and accountability." },
  { title: "Monthly live Q&A with Shashank", detail: "A live session every month — direct answers to your doubts." },
  { title: "Weekly teardown feedback", detail: "Community teardowns of your pitch, content, and answers — real feedback, real improvement." },
  { title: "Points toward 1:1 with Shashank", detail: "Complete a course and stay active to earn points toward a 1:1 call with Shashank." },
];

/** TODO: SAMPLE testimonials — replace with real, permissioned ones (video > text). */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ravi Teja",
    place: "Karimnagar",
    quote:
      "I expected another motivation video. It wasn't — it told me exactly what to do, step by step. After Art of Selling, I closed 2 deals in the first month itself.",
    result: "Field sales → team lead in 8 months",
  },
  {
    name: "Sandhya",
    place: "Vijayawada",
    quote:
      "I was always silent in meetings. I used the frameworks from the Communication course to present in front of managers for the first time — that became the highlight of my appraisal.",
    result: "First promotion in 3 years",
  },
  {
    name: "Prashanth",
    place: "Nizamabad",
    quote:
      "I stalled for 4 years worrying about what people would think. The LLS course challenges broke that fear. Now I run my own tuition business — and it's actually profitable.",
    result: "Started his own coaching business",
  },
  {
    name: "Divya",
    place: "Hyderabad",
    quote:
      "I used to avoid interviews because my English wasn't perfect. I practised the scripts in Crack an Interview and got an offer on my third attempt. I didn't expect this much value for ₹499.",
    result: "Placed at an MNC, 40% above expected package",
  },
];

/** FAQ — answers the REAL objections, plainly. No dodging the no-refund policy. */
export const FAQS: FaqItem[] = [
  {
    q: "Is this just more 'motivational gyaan'?",
    a: "No. Every course comes with frameworks, scripts, templates and assignments — the goal isn't to inspire you, it's to get you to implement. We've listed exactly what you get on every course page — go look, and judge for yourself.",
  },
  {
    q: "Will I actually finish it? I've dropped courses before...",
    a: "That's exactly why you get lifetime access, a WhatsApp community and a monthly live Q&A. Lessons are kept short and practical so they never feel heavy. The weekly teardowns keep you accountable to your progress. This isn't about watching — it's about doing.",
  },
  {
    q: "How do I get access after paying?",
    a: "The moment your payment succeeds, you instantly get your access details and a WhatsApp community invite. If anything goes wrong, message us in the community or via support — we'll resolve it within 24 hours.",
  },
  {
    q: "What's the refund policy?",
    a: "No refunds — we're upfront about this. Because it's a digital course, we can't take back access once it's granted. That's why we show you everything a course contains, and give you free previews too. Buy only when you're sure — we won't pressure you.",
  },
  {
    q: "Does it work on a phone? How much data do I need?",
    a: "It's fully designed for mobile. Videos are also available in a data-friendly quality, so you can watch even on a patchy network. Download options are available inside the course platform.",
  },
  {
    q: "What if my English isn't strong?",
    a: "That's completely fine — that's the whole point. The lessons are taught in clear, simple English with no jargon, so you never need to be fluent to follow along. You'll also pick up how key industry terms are actually used, in context.",
  },
];

/** Shashank's story beats — authenticity, not guru-polish.
 *  TODO: SAMPLE copy — tighten with real dates/details from Shashank. */
export const STORY = {
  headline: "Not a guru. Someone who struggled just like you.",
  beats: [
    {
      title: "Engineering → confusion",
      body: "I did engineering like everyone else. I panicked about 'what next' like everyone else. The only difference — I didn't let that fear stop me.",
    },
    {
      title: "From the sales floor to director",
      body: "I became a regional business development director at Luxury Escapes — no backdoor, no references. I learned to sell, did it, failed, and did it again.",
    },
    {
      title: "IIM Lucknow — never stopped learning",
      body: "Executive education at IIM Lucknow. Not for the degree — to understand business deeply.",
    },
    {
      title: "Bootstrapped founder",
      body: "I built StartupWithShashank without anyone's funding — a community that reaches 3.8M+ people, with zero ad spend at the start.",
    },
    {
      title: "Now — it's your turn",
      body: "Everything I learned, taught plainly, directly and affordably. Because I know it firsthand — in a small town, talent isn't the shortage, opportunity is.",
    },
  ],
};
