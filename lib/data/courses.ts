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
  title: "All-Access — anni 24 courses",
  price: 9999, // TODO: editable placeholder
  hook: "Okka decision. Prathi skill. Lifetime access.",
};

export const LANES: Lane[] = [
  {
    id: "sell",
    label: "Sell better",
    hook: "Convince cheyyadam vachaka, income ki limit undadu.",
    accent: "ember",
  },
  {
    id: "brand",
    label: "Build your brand",
    hook: "Mee peru oka asset avvali — opportunities meeku raavaali.",
    accent: "violet",
  },
  {
    id: "grow",
    label: "Grow in career & life",
    hook: "Room lo ki enter avvagane notice avvali. Overlooked kaadu.",
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
    hook: "Sell cheyyadam vachina vaadiki salary cap undadu.",
    description:
      "Selling ante pushy ga undadam kaadu — oka system. Cold call nunchi closing varaku, Shashank field lo use chesina exact framework. Tinglish lo, direct ga.",
    whatYouGet: [
      "6+ hours recorded lessons (Tinglish)",
      "Objection-handling scripts — Telugu customer scenarios",
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
    hook: "Companies ki ammadam nerchuko — deal size lakhs lo untundi.",
    description:
      "B2B lo buyer okkadu kaadu, committee untundi. Long cycle, big ticket. Aa game ela adali — prospecting to procurement — step by step.",
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
    hook: "Customer 'chusta le' annapudu deal close cheyyadam nerchuko.",
    description:
      "Retail, D2C, services — direct customer ki ammadam lo psychology antha. Price objection, trust building, repeat sales. Field-tested, no theory.",
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
    hook: "Business start cheyyataniki lakhs avasaram ledu — sariaina plan chalu.",
    description:
      "Bootstrap ga start chesi run cheyyadam ela — Shashank own story tho sahaa. First customer, first revenue, first profit. Capital kanna clarity mukhyam.",
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
    hook: "Launch day ni event ga kaadu — revenue machine ga plan cheyyi.",
    description:
      "Product ready ayyaka silence lo release cheyyakudadhu. Waitlist, hype, pricing, first-week sales — full launch playbook.",
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
    hook: "Business lo biggest risk market kaadu — nee own doubts.",
    description:
      "Failure fear, comparison, imposter feeling — ivi handle cheyyakapothe strategy work avvadu. Founder mindset ni build chese practical course. Gyaan kaadu — tools.",
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
    hook: "Idea meeda money pettadam kanna mundu — adi ammudavtundo ledho test cheyyi.",
    description:
      "90% startups fail avvadaniki reason: evariki avasaram leni product. Idea ni cheap ga, fast ga validate chese exact process.",
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
    hook: "Manchi product saripodu — kanipinchali, gurthundali, ammudavvali.",
    description:
      "Brand ante logo kaadu. Positioning, messaging, D2C channels — chinna budget tho pedda brand feel ela create cheyyalo.",
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
    hook: "Online lo customers ni systematically teeskura — luck meeda kaadu.",
    description:
      "Ads, content, funnels, WhatsApp marketing — Telugu market ki work ayye digital playbook antha okka chota. Agency ki ivvakunda nuvve nadipinchagalav.",
    whatYouGet: [
      "6 hours recorded lessons",
      "Funnel templates",
      "Ad-copy swipe file (Tinglish)",
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
    hook: "Opportunities skill valla kaadu — evariki telusu nuvvu unnavani.",
    description:
      "Contacts leni valla talent waste avtundi. Introvert aina sare network build cheyyadam — events, DMs, follow-ups — awkward feel avvakunda.",
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
    hook: "Antha nuvve chesthe business kaadu adi — job. Team build cheyyi.",
    description:
      "First hire eppudu, evarini, entha ki — and manage ela. Chinna team tho pedda output teese playbook.",
    whatYouGet: ["2+ hours recorded lessons", "Hiring scorecard template", "Certificate + community access"],
    thumb: th("sell", 0),
  },
  {
    id: "women-entrepreneurship",
    title: "Women Entrepreneurship",
    lane: "sell",
    price: 1499,
    status: "live",
    hook: "'Aadapilla ki business enduku' anevaallaki answer — mee revenue.",
    description:
      "Family expectations, capital access, safety, credibility — women founders face chese real barriers ki practical answers. Business basics kuda covered.",
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
    hook: "Nee peru vinagane 'aa person ah, superb' anali — adi asset.",
    description:
      "Personal brand ante famous avvadam kaadu — nee field lo trusted name avvadam. Shashank 38 lakh+ reach build chesina exact approach, zero nunchi.",
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
    hook: "Camera mundhu freeze avvakunda — scroll aapese content cheyyi.",
    description:
      "Ideas, hooks, scripting, shooting on a phone, editing basics — consistent ga content create chese full system. Perfection kaadu, consistency.",
    whatYouGet: [
      "4 hours recorded lessons",
      "Hook formulas (Tinglish)",
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
    hook: "Followers kaadu point — reach ni income ga marchadam.",
    description:
      "Algorithm, reels strategy, monetization — Instagram ni serious income channel ga treat chese course. Demand validate ayyaka shoot avtundi — waitlist lo join avvandi.",
    whatYouGet: ["Reels growth system", "Monetization playbook", "Certificate + community access"],
    thumb: th("brand", 0),
  },
  {
    id: "freelancing-get-close-clients",
    title: "Freelancing — Get & Close Clients",
    lane: "brand",
    price: 1499,
    status: "coming-soon",
    hook: "Skill undi, clients levu ante — adi skill problem kaadu, sales problem.",
    description:
      "Portfolio, pricing, proposals, retainers — freelancing ni side-hustle nunchi full income ga grow cheyyadam. Waitlist lo join avvandi.",
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
    hook: "Room lo ki enter avvagane overlooked avvadam aapeyyi.",
    description:
      "English fluency kaadu point — clarity, presence, confidence. Meetings lo, interviews lo, life lo — matladite vinali, adigithe jaragali. Flagship communication course.",
    whatYouGet: [
      "7+ hours recorded lessons (Tinglish)",
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
    hook: "'Emanukuntaro' ane bhayam nee life ni chinnadiga chestundi. Break it.",
    description:
      "The signature course. Log evaluation fear, comfort zone, chinna-town conditioning — vaatini systematically break chese transformation program. Shashank philosophy antha idhe.",
    whatYouGet: [
      "8+ hours recorded lessons",
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
    hook: "Confidence born-with kaadu — build chesukune skill.",
    description:
      "Stage fear, comparison, 'nenu saripovanu' feeling — confidence ni daily practice tho build chese starter course. First step ki perfect.",
    whatYouGet: ["2+ hours recorded lessons", "Daily confidence drills", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "deal-with-failure",
    title: "Deal with Failure",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Fail avvadam problem kaadu — akkade aagipodam problem.",
    description:
      "Exam fail, business fail, breakup, rejection — bounce back avvadam oka process. Motivation kaadu, method.",
    whatYouGet: ["2 hours recorded lessons", "Bounce-back action plan", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "crack-an-interview",
    title: "Crack an Interview",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Interview lo reject avvadam talent valla kaadu — preparation valla.",
    description:
      "HR rounds, 'tell me about yourself', salary negotiation — Telugu students/professionals ki interviews crack chese direct playbook.",
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
    hook: "First job decision 10 years ni decide chestundi — random ga teesukoku.",
    description:
      "Package chusi kaadu — growth, learning, exposure chusi choose cheyyadam ela. Career start lo unna prathi okkariki.",
    whatYouGet: ["2 hours recorded lessons", "Job evaluation scorecard", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "make-an-impact-in-a-meeting",
    title: "Make an Impact in a Meeting",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Meeting lo silent ga unte promotion lo kuda silent ga untav.",
    description:
      "Points cheppadaniki bhayam, seniors mundu freeze — meetings lo confident ga contribute chesi notice avvadam ela.",
    whatYouGet: ["2 hours recorded lessons", "Meeting contribution frameworks", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "grow-in-a-corporate-company",
    title: "Grow in a Corporate Company",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Hard work okkate saripodu — visibility + politics navigate cheyyali.",
    description:
      "Appraisals, managers, office politics, promotions — corporate ladder ni smart ga ekkhadam. Ex-director experience nunchi direct ga.",
    whatYouGet: ["3 hours recorded lessons", "Appraisal preparation kit", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "create-more-opportunities",
    title: "Create More Opportunities",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "Luck kosam wait cheyyadam kaadu — opportunities create chesukovadam.",
    description:
      "Side projects, visibility, asking — opportunities attract chese habits and systems. Chinna town lo unna sare.",
    whatYouGet: ["2 hours recorded lessons", "Opportunity pipeline tracker", "Certificate + community access"],
    thumb: th("grow", 0),
  },
  {
    id: "leverage-claude-automations",
    title: "Leverage Claude & Automations",
    lane: "grow",
    price: 499,
    status: "live",
    hook: "AI use chese vaadu, cheyyani vaadi kanna 10x fast — ye side lo untav?",
    description:
      "Claude tho emails, content, research, automations — daily work lo AI ni practically use cheyyadam. Non-techies ki kuda.",
    whatYouGet: ["3 hours recorded lessons", "Ready-to-use prompt library", "Certificate + community access"],
    thumb: th("grow", 1),
  },
  {
    id: "spoken-english",
    title: "Spoken English — Fluency + Confidence",
    lane: "grow",
    price: 999,
    status: "coming-soon",
    hook: "English radani kaadu — matladataniki bhayam. Rendu fix cheddam.",
    description:
      "Grammar classes kaadu — real situations lo confident ga English matladatam. Telugu medium background unna vallaki design chesindi. Waitlist lo join avvandi.",
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
