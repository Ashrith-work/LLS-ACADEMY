import type { Course, Lane, LaneId } from "@/lib/types";

/**
 * ─────────────────────────────────────────────────────────────────
 * SINGLE SOURCE OF TRUTH for courses, lanes and pricing.
 * Edit prices/titles/hooks here — every page renders from this file.
 *
 * Pricing tiers: ₹499 / ₹999 / ₹1,499 / ₹1,999 / ₹2,499
 * Founding pricing: flip FOUNDING_PRICING to true and the anchors
 * show their foundingPrice with the regular price struck through.
 * ─────────────────────────────────────────────────────────────────
 */

/** Flip to true during a founding-member launch window. */
export const FOUNDING_PRICING = false;

/** All-access bundle — one-time payment, lifetime access.
 *  TODO: placeholder price — set the real bundle price before launch. */
export const BUNDLE = {
  id: "all-access",
  title: "All-Access — all 24 courses",
  price: 9999, // TODO: editable placeholder
  hook: "One decision. Every skill. Lifetime access.",
};

export const LANES: Lane[] = [
  {
    id: "sell",
    label: "Sell better",
    hook: "Once you can convince people, there's no cap on your income.",
    accent: "ember",
  },
  {
    id: "brand",
    label: "Build your brand",
    hook: "Your name should be an asset — opportunities should come to you.",
    accent: "violet",
  },
  {
    id: "grow",
    label: "Grow in career & life",
    hook: "Get noticed the moment you walk into the room. No more being overlooked.",
    accent: "teal",
  },
];

/* Placeholder thumbnail gradients per lane — replaced by real course art later.
   TODO: replace thumb gradients with real course thumbnails (next/image). */
const T = {
  sell: [
    { from: "#2A1410", to: "#4A1D12" },
    { from: "#33170F", to: "#1E1C28" },
  ],
  brand: [
    { from: "#1D1636", to: "#33245C" },
    { from: "#241B44", to: "#1E1C28" },
  ],
  grow: [
    { from: "#0E2A24", to: "#124A3D" },
    { from: "#0F2E29", to: "#1E1C28" },
  ],
};
const th = (lane: LaneId, i: number) => T[lane][i % 2];

export const COURSES: Course[] = [
  /* ── LANE: Sell better ─────────────────────────────────────── */
  {
    id: "art-of-selling",
    title: "Art of Selling",
    lane: "sell",
    price: 2499,
    foundingPrice: 1499,
    anchor: true,
    status: "live",
    hook: "Once you can sell, there's no cap on your salary.",
    description:
      "Selling isn't about being pushy — it's a system. From the cold call to the close, this is the exact framework Shashank used in the field. Direct and practical.",
    whatYouGet: [
      "6+ hours of recorded lessons",
      "Objection-handling scripts for real customer scenarios",
      "Closing framework worksheet",
      "Certificate + WhatsApp community access",
      "Monthly live Q&A with Shashank",
    ],
    thumb: th("sell", 0),
  },
  {
    id: "sales-b2b",
    title: "Sales B2B",
    lane: "sell",
    price: 1999,
    status: "live",
    hook: "Learn to sell to companies — where deal sizes run into lakhs.",
    description:
      "In B2B, the buyer isn't one person — it's a committee. Long cycle, big ticket. How to play that game — from prospecting to procurement — step by step.",
    whatYouGet: [
      "4+ hours recorded lessons",
      "B2B outreach templates (email + LinkedIn)",
      "Deal-stage tracker",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },
  {
    id: "sales-b2c",
    title: "Sales B2C",
    lane: "sell",
    price: 1999,
    status: "live",
    hook: "Learn to close the deal even when the customer says 'I'll think about it.'",
    description:
      "Retail, D2C, services — selling directly to a customer is all psychology. Price objections, trust building, repeat sales. Field-tested, no theory.",
    whatYouGet: [
      "4+ hours recorded lessons",
      "Price-objection playbook",
      "Follow-up message templates",
      "Certificate + community access",
    ],
    thumb: th("sell", 0),
  },
  {
    id: "start-business-minimum-money",
    title: "Start a Business with Minimum Money",
    lane: "sell",
    price: 1499,
    anchor: true,
    status: "live",
    hook: "You don't need lakhs to start a business — you need the right plan.",
    description:
      "How to start and run a business bootstrapped — with Shashank's own story included. First customer, first revenue, first profit. Clarity matters more than capital.",
    whatYouGet: [
      "5+ hours recorded lessons",
      "Zero-to-first-customer checklist",
      "Lean budget planner",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },
  {
    id: "launch-a-product",
    title: "Launch a Product",
    lane: "sell",
    price: 1499,
    status: "live",
    hook: "Don't treat launch day as an event — plan it as a revenue machine.",
    description:
      "Once your product is ready, don't release it in silence. Waitlist, hype, pricing, first-week sales — the full launch playbook.",
    whatYouGet: [
      "4 hours recorded lessons",
      "Launch-week calendar template",
      "Pricing decision framework",
      "Certificate + community access",
    ],
    thumb: th("sell", 0),
  },
  {
    id: "mindset-to-ace-business",
    title: "Mindset to Ace Business",
    lane: "sell",
    price: 1499,
    status: "live",
    hook: "The biggest risk in business isn't the market — it's your own doubts.",
    description:
      "Fear of failure, comparison, imposter feelings — no strategy works until you handle these. A practical course to build the founder mindset. Not gyaan — tools.",
    whatYouGet: [
      "3+ hours recorded lessons",
      "Decision-making frameworks",
      "Weekly self-review template",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },
  {
    id: "validate-business-idea",
    title: "Validate a Business Idea",
    lane: "sell",
    price: 999,
    status: "live",
    hook: "Before you put money into an idea — test whether it will actually sell.",
    description:
      "90% of startups fail for one reason: a product nobody needs. The exact process to validate an idea cheaply and fast.",
    whatYouGet: [
      "3 hours recorded lessons",
      "Validation experiment templates",
      "Customer-interview script",
      "Certificate + community access",
    ],
    thumb: th("sell", 0),
  },
  {
    id: "marketing-branding-d2c",
    title: "Marketing, Branding & D2C",
    lane: "sell",
    price: 999,
    status: "live",
    hook: "A good product isn't enough — it has to be seen, remembered and sold.",
    description:
      "A brand isn't a logo. Positioning, messaging, D2C channels — how to create the feel of a big brand on a small budget.",
    whatYouGet: [
      "4 hours recorded lessons",
      "Positioning worksheet",
      "D2C channel playbook",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },
  {
    id: "full-digital-marketing",
    title: "Full Digital Marketing",
    lane: "sell",
    price: 999,
    status: "live",
    hook: "Get customers online systematically — not by luck.",
    description:
      "Ads, content, funnels, WhatsApp marketing — the entire digital playbook in one place. Run it yourself instead of handing it to an agency.",
    whatYouGet: [
      "6 hours of recorded lessons",
      "Funnel templates",
      "Ad-copy swipe file",
      "Certificate + community access",
    ],
    thumb: th("sell", 0),
  },
  {
    id: "importance-of-networking",
    title: "Importance of Networking",
    lane: "sell",
    price: 999,
    status: "live",
    hook: "Opportunities don't come from skill alone — they come from who knows you exist.",
    description:
      "Talent goes to waste without contacts. How to build a network even if you're an introvert — events, DMs, follow-ups — without it ever feeling awkward.",
    whatYouGet: [
      "3 hours recorded lessons",
      "Outreach message templates",
      "Follow-up system",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },
  {
    id: "hire-your-first-team",
    title: "Hire Your First Team",
    lane: "sell",
    price: 499,
    status: "coming-soon",
    hook: "If you do everything yourself, it's not a business — it's a job. Build a team.",
    description:
      "Your first hire — when, who, for how much, and how to manage them. The playbook to get big output from a small team.",
    whatYouGet: ["2+ hours of recorded lessons", "Hiring scorecard template", "Certificate + community access"],
    thumb: th("sell", 0),
  },
  {
    id: "women-entrepreneurship",
    title: "Women Entrepreneurship",
    lane: "sell",
    price: 1499,
    status: "live",
    hook: "To everyone who asks 'why does a girl need a business' — let your revenue answer.",
    description:
      "Family expectations, access to capital, safety, credibility — practical answers to the real barriers women founders face. Business basics are covered too.",
    whatYouGet: [
      "4 hours recorded lessons",
      "Home-business starter checklist",
      "Community of women founders",
      "Certificate + community access",
    ],
    thumb: th("sell", 1),
  },

  /* ── LANE: Build your brand ────────────────────────────────── */
  {
    id: "build-a-personal-brand",
    title: "Build a Personal Brand",
    lane: "brand",
    price: 999,
    anchor: true,
    status: "live",
    hook: "People should hear your name and say 'oh, that person — brilliant.' That's an asset.",
    description:
      "A personal brand isn't about being famous — it's about being a trusted name in your field. The exact approach Shashank used to build a 3.8M+ reach, from zero.",
    whatYouGet: [
      "5 hours recorded lessons",
      "Content pillar worksheet",
      "30-day posting plan",
      "Weekly content teardown feedback",
      "Certificate + community access",
    ],
    thumb: th("brand", 0),
  },
  {
    id: "how-to-create-content",
    title: "How to Create Content",
    lane: "brand",
    price: 999,
    status: "live",
    hook: "Stop freezing in front of the camera — make content that stops the scroll.",
    description:
      "Ideas, hooks, scripting, shooting on a phone, editing basics — the full system to create content consistently. Not perfection, consistency.",
    whatYouGet: [
      "4 hours of recorded lessons",
      "Hook formulas",
      "Phone-shooting setup guide",
      "Certificate + community access",
    ],
    thumb: th("brand", 1),
  },
  {
    id: "instagram-reels-growth",
    title: "Instagram & Reels Growth",
    lane: "brand",
    price: 999,
    status: "coming-soon",
    hook: "Followers aren't the point — turning reach into income is.",
    description:
      "Algorithm, reels strategy, monetization — a course that treats Instagram as a serious income channel. It'll be filmed once demand is validated — join the waitlist.",
    whatYouGet: ["Reels growth system", "Monetization playbook", "Certificate + community access"],
    thumb: th("brand", 0),
  },
  {
    id: "freelancing-get-close-clients",
    title: "Freelancing — Get & Close Clients",
    lane: "brand",
    price: 1499,
    status: "coming-soon",
    hook: "You have the skill but no clients? That's not a skill problem — it's a sales problem.",
    description:
      "Portfolio, pricing, proposals, retainers — how to grow freelancing from a side-hustle into a full income. Join the waitlist.",
    whatYouGet: ["Client-outreach system", "Pricing & proposal templates", "Certificate + community access"],
    thumb: th("brand", 1),
  },

  /* ── LANE: Grow in career & life ───────────────────────────── */
  {
    id: "art-of-communication",
    title: "Art of Communication",
    lane: "grow",
    price: 2499,
    foundingPrice: 1499,
    anchor: true,
    status: "live",
    hook: "Stop being overlooked the moment you walk into the room.",
    description:
      "Fluency isn't the point — clarity, presence and confidence are. In meetings, in interviews, in life: when you speak, people should listen; when you ask, things should happen. Our flagship communication course.",
    whatYouGet: [
      "7+ hours of recorded lessons",
      "Speaking frameworks for meetings/interviews",
      "Practice assignments with community feedback",
      "Certificate + WhatsApp community",
      "Monthly live Q&A with Shashank",
    ],
    thumb: th("grow", 0),
  },
  {
    id: "live-life-shameless",
    title: "Live Life Shameless",
    lane: "grow",
    price: 2499,
    foundingPrice: 1499,
    anchor: true,
    signature: true,
    status: "live",
    hook: "The fear of 'what will people think' keeps your life small. Break it.",
    description:
      "The signature course. Fear of judgment, the comfort zone, small-town conditioning — a transformation program that systematically breaks all of it. This is Shashank's entire philosophy.",
    whatYouGet: [
      "8+ hours of recorded lessons",
      "Comfort-zone breaking challenges (weekly)",
      "Self-audit workbook",
      "Certificate + WhatsApp community",
      "Monthly live Q&A + points toward 1:1 with Shashank",
    ],
    thumb: th("grow", 1),
  },
  {
    id: "become-more-confident",
    title: "Become More Confident",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Confidence isn't something you're born with — it's a skill you build.",
    description:
      "Stage fear, comparison, the feeling that 'I'm not good enough' — a starter course that builds confidence through daily practice. Perfect for a first step.",
    whatYouGet: ["2+ hours of recorded lessons", "Daily confidence drills", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "deal-with-failure",
    title: "Deal with Failure",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Failing isn't the problem — stopping there is.",
    description:
      "A failed exam, a failed business, a breakup, a rejection — bouncing back is a process. Not motivation, a method.",
    whatYouGet: ["2 hours of recorded lessons", "Bounce-back action plan", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "crack-an-interview",
    title: "Crack an Interview",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Getting rejected in an interview isn't about talent — it's about preparation.",
    description:
      "HR rounds, 'tell me about yourself', salary negotiation — a direct playbook to help students and professionals crack interviews.",
    whatYouGet: [
      "3 hours recorded lessons",
      "Answer frameworks for top 20 questions",
      "Salary negotiation script",
      "Certificate + community access",
    ],
    thumb: th("grow", 0),
  },
  {
    id: "choose-your-first-job",
    title: "Choose Your First Job",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Your first job decides the next 10 years — don't pick it at random.",
    description:
      "How to choose based on growth, learning and exposure — not just the package. For everyone at the start of their career.",
    whatYouGet: ["2 hours of recorded lessons", "Job evaluation scorecard", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "make-an-impact-in-a-meeting",
    title: "Make an Impact in a Meeting",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Stay silent in meetings and you'll be silent in the promotion list too.",
    description:
      "Afraid to make your point, freezing in front of seniors — how to contribute confidently in meetings and get noticed.",
    whatYouGet: ["2 hours of recorded lessons", "Meeting contribution frameworks", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "grow-in-a-corporate-company",
    title: "Grow in a Corporate Company",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Hard work alone isn't enough — you have to navigate visibility and politics.",
    description:
      "Appraisals, managers, office politics, promotions — how to climb the corporate ladder smartly. Straight from an ex-director's experience.",
    whatYouGet: ["3 hours of recorded lessons", "Appraisal preparation kit", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "create-more-opportunities",
    title: "Create More Opportunities",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Don't wait for luck — create your own opportunities.",
    description:
      "Side projects, visibility, asking — the habits and systems that attract opportunities. Even if you're in a small town.",
    whatYouGet: ["2 hours of recorded lessons", "Opportunity pipeline tracker", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "leverage-claude-automations",
    title: "Leverage Claude & Automations",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "People who use AI move 10x faster than those who don't — which side will you be on?",
    description:
      "Emails, content, research and automations with Claude — how to use AI practically in your daily work. Made for non-techies too.",
    whatYouGet: ["3 hours of recorded lessons", "Ready-to-use prompt library", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "spoken-english",
    title: "Spoken English — Fluency + Confidence",
    lane: "grow",
    price: 999,
    status: "coming-soon",
    hook: "It's not that you can't speak English — it's the fear of speaking. Let's fix both.",
    description:
      "Not grammar classes — speaking English confidently in real situations. Designed for people from a regional-medium background. Join the waitlist.",
    whatYouGet: ["Situation-based speaking practice", "Daily fluency drills", "Certificate + community access"],
    thumb: th("grow", 0),
  },
];

/* ── Derived helpers ─────────────────────────────────────────── */

export const getCourse = (id: string) => COURSES.find((c) => c.id === id);

export const coursesByLane = (lane: LaneId) => COURSES.filter((c) => c.lane === lane);

export const getLane = (id: LaneId) => LANES.find((l) => l.id === id)!;

/** Ladder: cheap → premium within a lane (for "your path" pages). */
export const laneLadder = (lane: LaneId) =>
  [...coursesByLane(lane)].sort((a, b) => a.price - b.price);

/** Anchor(s) of a lane — the "start here" course(s). */
export const laneAnchors = (lane: LaneId) => coursesByLane(lane).filter((c) => c.anchor);

/** Total catalogue value — used for the bundle value-stack ("₹31,000+ value"). */
export const catalogueValue = () => COURSES.reduce((sum, c) => sum + c.price, 0);

/** Value-stack ordering: premium first, so the first number seen is high. */
export const valueStack = () => [...COURSES].sort((a, b) => b.price - a.price);

/** Live course count, for honest headline numbers. */
export const LIVE_COUNT = COURSES.filter((c) => c.status === "live").length;
export const TOTAL_COUNT = COURSES.length;

export const effectivePrice = (c: Course) =>
  FOUNDING_PRICING && c.foundingPrice ? c.foundingPrice : c.price;

/**
 * Persona-level defaulting for the goal router.
 * Within the chosen lane we pick the anchor that best fits the answers —
 * never a site-wide "most popular".
 */
export function recommendCourse(goal: LaneId, stage: string, blocker: string) {
  const anchors = laneAnchors(goal);
  if (goal === "grow") {
    // Two anchors in this lane: confidence-blocked → signature (LLS); otherwise communication.
    if (blocker === "confidence" || blocker === "freeze") {
      return getCourse("live-life-shameless")!;
    }
    return getCourse("art-of-communication")!;
  }
  if (goal === "sell") {
    // Not yet running something → start-a-business anchor; already selling → Art of Selling.
    if (stage === "student") return getCourse("start-business-minimum-money")!;
    return getCourse("art-of-selling")!;
  }
  return anchors[0] ?? coursesByLane(goal)[0];
}
