import type { FaqItem, Guarantee, Testimonial } from "@/lib/types";

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
export const GUARANTEES: Guarantee[] = [
  { title: "Recorded lessons", desc: "Plain English, self-paced, lifetime access.", icon: "play-circle" },
  { title: "Certificate", desc: "Finish, then add it to LinkedIn.", icon: "award" },
  { title: "WhatsApp community", desc: "Same journey — questions, wins, accountability.", icon: "users" },
  { title: "Monthly live Q&A with Shashank", desc: "Your doubts, answered live.", icon: "radio" },
  { title: "Weekly teardowns", desc: "Real feedback on your pitch, content, and answers.", icon: "message-square" },
  { title: "Points toward a 1:1 with Shashank", desc: "Finish and stay active to earn a call.", icon: "star" },
];

/** TODO: SAMPLE testimonials — replace with real, permissioned ones (video > text). */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Expected another motivation video. Instead it told me exactly what to do — step by step. Closed 2 deals my first month.",
    name: "Ravi Teja",
    city: "Karimnagar",
    outcome: "Field sales → team lead in 8 months",
  },
  {
    quote:
      "Always the silent one in meetings. Used the Communication frameworks to present to managers for the first time — it became my appraisal highlight.",
    name: "Sandhya",
    city: "Vijayawada",
    outcome: "First promotion in 3 years",
  },
  {
    quote:
      "Stalled 4 years worrying what people would think. The course challenges broke that fear. Now I run my own tuition business — and it's profitable.",
    name: "Prashanth",
    city: "Nizamabad",
    outcome: "Started his own coaching business",
  },
  {
    quote:
      "Avoided interviews because my English wasn't perfect. Practised the Crack an Interview scripts, got an offer on my third try. Didn't expect this much for ₹499.",
    name: "Divya",
    city: "Hyderabad",
    outcome: "Placed at an MNC — 40% above target",
  },
];

/** FAQ — answers the REAL objections, plainly. No dodging the no-refund policy. */
export const FAQS: FaqItem[] = [
  {
    q: "Is this just motivational gyaan?",
    a: "No. Every course ships with frameworks, scripts, templates and assignments. The goal isn't to inspire you — it's to get you to do. Everything you get is listed on each course page. Go check.",
  },
  {
    q: "Will I actually finish it? I've dropped courses before.",
    a: "Built for it: short lessons, WhatsApp accountability, weekly teardowns. Lifetime access means no pressure — but the community keeps you moving.",
  },
  {
    q: "How do I get access after paying?",
    a: "Instant. Pay, your account unlocks, and you start right away — on any device.",
  },
  {
    q: "What's the refund policy?",
    a: "No refunds on digital courses. That's exactly why we list everything you get, upfront.",
  },
  {
    q: "Does it work on a phone? How much data?",
    a: "Any phone. Lessons stream light; download over WiFi to watch data-free later.",
  },
  {
    q: "What if my English isn't strong?",
    a: "Perfectly fine. Lessons are plain English, and courses like Crack an Interview hand you the exact scripts. Plenty of students started right here.",
  },
];

/** Footer copy + link columns. */
export const FOOTER = {
  tagline: "Learn what school skipped. Think bigger. A StartupWithShashank brand.",
  explore: [
    { label: "All courses", href: "/#courses" },
    { label: "All-access bundle", href: "/all-access" },
    { label: "Find your course", href: "/start" },
    { label: "Shashank's story", href: "/about" },
  ],
  help: [
    { label: "Terms & refund policy", href: "/terms" },
    { label: "Instagram — 3.8M+ reached", href: "#" },
    { label: "Support", href: "#" },
  ],
};

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
