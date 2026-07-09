// lib/courses.ts
// LLS course catalog + intent-based search. Framework-agnostic, zero deps.
// Update this file whenever you add/rename a course.

export type CategoryKey = "sell" | "brand" | "grow";

export interface Category {
  label: string;
  color: string; // dot color used in the UI
}

export interface Course {
  slug: string; // maps to /courses/<slug>
  title: string;
  tag: string; // one-line tagline shown on the card
  cat: CategoryKey;
  price: number | null; // null = coming soon
  start?: boolean; // a "Start here ★" course for its goal
  signature?: boolean;
  soon?: boolean; // coming soon / waitlist
  kw: string[]; // keywords the search matches against
}

export const CATEGORIES: Record<CategoryKey, Category> = {
  sell: { label: "Sell better", color: "#F5A524" },
  brand: { label: "Build your brand", color: "#5FD3B4" },
  grow: { label: "Career & life", color: "#A78BFA" },
};

export const COURSES: Course[] = [
  // ---- Sell better ----
  { slug: "art-of-selling", title: "Art of Selling", tag: "Once you can sell, there's no cap on your salary.", cat: "sell", price: 2499, start: true,
    kw: ["selling","sales","sell","convince","persuade","persuasion","close","closing","deal","deals","pitch","negotiate","negotiation","objection","income","salary","revenue","customer"] },
  { slug: "start-business-minimum-money", title: "Start a Business with Minimum Money", tag: "You don't need lakhs to start a business — you need the right plan.", cat: "sell", price: 1499, start: true,
    kw: ["business","startup","start","entrepreneur","entrepreneurship","founder","bootstrap","low","investment","minimum","money","finance","budget","capital","funds","funding","cash","side","small","own"] },
  { slug: "sales-b2b", title: "Sales B2B", tag: "Learn to sell to companies — where deal sizes run into lakhs.", cat: "sell", price: 1999,
    kw: ["b2b","corporate","enterprise","company","companies","account","client","deal","big","sales","sell","business"] },
  { slug: "sales-b2c", title: "Sales B2C", tag: "Learn to close the deal even when the customer says 'I'll think about it.'", cat: "sell", price: 1999,
    kw: ["b2c","retail","consumer","customer","close","deal","direct","shop","sales","sell","walkin"] },
  { slug: "launch-a-product", title: "Launch a Product", tag: "Don't treat launch day as an event — plan it as a revenue machine.", cat: "sell", price: 1499,
    kw: ["launch","product","gtm","market","release","campaign","revenue","go"] },
  { slug: "mindset-to-ace-business", title: "Mindset to Ace Business", tag: "The biggest risk in business isn't the market — it's your own doubts.", cat: "sell", price: 1499,
    kw: ["mindset","business","doubt","risk","entrepreneur","thinking","motivation","mental","fear"] },
  { slug: "validate-business-idea", title: "Validate a Business Idea", tag: "Before you put money into an idea — test whether it will actually sell.", cat: "sell", price: 999,
    kw: ["validate","validation","idea","test","research","mvp","demand","feasibility","money","business","proof"] },
  { slug: "marketing-branding-d2c", title: "Marketing, Branding & D2C", tag: "A good product isn't enough — it has to be seen, remembered and sold.", cat: "sell", price: 999,
    kw: ["marketing","branding","brand","d2c","positioning","awareness","promotion","visibility","product"] },
  { slug: "full-digital-marketing", title: "Full Digital Marketing", tag: "Get customers online systematically — not by luck.", cat: "sell", price: 999,
    kw: ["digital","marketing","online","seo","ads","google","facebook","performance","leads","funnel","ppc","social"] },
  { slug: "importance-of-networking", title: "Importance of Networking", tag: "Opportunities don't come from skill alone — they come from who knows you exist.", cat: "sell", price: 999,
    kw: ["networking","network","connections","contacts","referrals","relationships","opportunities","community","linkedin"] },
  { slug: "women-entrepreneurship", title: "Women Entrepreneurship", tag: "To everyone who asks 'why does a girl need a business' — let your revenue answer.", cat: "sell", price: 1499,
    kw: ["women","woman","girl","female","entrepreneur","business","ladies"] },
  { slug: "hire-your-first-team", title: "Hire Your First Team", tag: "If you do everything yourself, it's not a business — it's a job. Build a team.", cat: "sell", price: null, soon: true,
    kw: ["hire","hiring","team","recruit","employees","delegate","staff","scale","manage","people"] },
  // ---- Build your brand ----
  { slug: "build-a-personal-brand", title: "Build a Personal Brand", tag: "People should hear your name and say 'oh, that person — brilliant.' That's an asset.", cat: "brand", price: 999, start: true,
    kw: ["personal","brand","branding","reputation","influence","authority","known","positioning","image","credibility","name"] },
  { slug: "how-to-create-content", title: "How to Create Content", tag: "Stop freezing in front of the camera — make content that stops the scroll.", cat: "brand", price: 999,
    kw: ["content","creation","video","camera","posts","scripting","storytelling","creator","filming","editing"] },
  { slug: "instagram-reels-growth", title: "Instagram & Reels Growth", tag: "Followers aren't the point — turning reach into income is.", cat: "brand", price: null, soon: true,
    kw: ["instagram","reels","insta","ig","followers","reach","viral","social","growth","engagement"] },
  { slug: "freelancing-get-close-clients", title: "Freelancing — Get & Close Clients", tag: "You have the skill but no clients? That's not a skill problem — it's a sales problem.", cat: "brand", price: null, soon: true,
    kw: ["freelance","freelancing","clients","gigs","upwork","fiverr","projects","freelancer","selfemployed"] },
  // ---- Grow in career & life ----
  { slug: "art-of-communication", title: "Art of Communication", tag: "Stop being overlooked the moment you walk into the room.", cat: "grow", price: 2499, start: true,
    kw: ["communication","communicate","speaking","speech","articulate","express","presentation","talk","conversation","verbal","clarity","presence","overlooked"] },
  { slug: "live-life-shameless", title: "Live Life Shameless", tag: "The fear of 'what will people think' keeps your life small. Break it.", cat: "grow", price: 2499, start: true, signature: true,
    kw: ["shameless","fear","judgement","judgment","doubt","courage","bold","overthinking","people","pleasing","confidence","mindset","life"] },
  { slug: "become-more-confident", title: "Become More Confident", tag: "Confidence isn't something you're born with — it's a skill you build.", cat: "grow", price: 499,
    kw: ["confidence","confident","esteem","shy","shyness","belief","nervous","selfbelief"] },
  { slug: "deal-with-failure", title: "Deal with Failure", tag: "Failing isn't the problem — stopping there is.", cat: "grow", price: 499,
    kw: ["failure","fail","rejection","setback","resilience","comeback","mistakes","quitting","disappointment"] },
  { slug: "crack-an-interview", title: "Crack an Interview", tag: "Getting rejected in an interview isn't about talent — it's about preparation.", cat: "grow", price: 499,
    kw: ["interview","interviews","job","placement","hr","resume","cv","hiring","preparation","offer","mock","questions"] },
  { slug: "choose-your-first-job", title: "Choose Your First Job", tag: "Your first job decides the next 10 years — don't pick it at random.", cat: "grow", price: 499,
    kw: ["first","job","career","offer","selection","fresher","freshers","decision","company"] },
  { slug: "make-an-impact-in-a-meeting", title: "Make an Impact in a Meeting", tag: "Stay silent in meetings and you'll be silent in the promotion list too.", cat: "grow", price: 499,
    kw: ["meeting","meetings","speak","presentation","boss","managers","visibility","promotion","contribute","present","standup"] },
  { slug: "grow-in-a-corporate-company", title: "Grow in a Corporate Company", tag: "Hard work alone isn't enough — you have to navigate visibility and politics.", cat: "grow", price: 499,
    kw: ["corporate","company","office","workplace","promotion","politics","career","appraisal","manager","professional","visibility","mnc","ladder"] },
  { slug: "create-more-opportunities", title: "Create More Opportunities", tag: "Don't wait for luck — create your own opportunities.", cat: "grow", price: 499,
    kw: ["opportunities","opportunity","luck","growth","chances","doors","options","noticed"] },
  { slug: "leverage-claude-automations", title: "Leverage Claude & Automations", tag: "People who use AI move 10x faster than those who don't — which side will you be on?", cat: "grow", price: 499,
    kw: ["ai","artificial","intelligence","claude","chatgpt","automation","automations","productivity","tools","workflow","gpt","prompt","efficiency","tech"] },
  { slug: "spoken-english", title: "Spoken English — Fluency + Confidence", tag: "It's not that you can't speak English — it's the fear of speaking. Let's fix both.", cat: "grow", price: null, soon: true,
    kw: ["english","spoken","fluency","fluent","vocabulary","grammar","language","accent","speak"] },
];

// Intent expansion — lets queries with no literal course match still resolve
// to the right cluster (e.g. "finance" -> money / business courses).
const SYN: Record<string, string[]> = {
  finance: ["money","business","budget"], money: ["finance","budget","business"], cash: ["money","finance"],
  invest: ["money","business","idea"], investment: ["money","business"], funding: ["money","business"], budget: ["money","finance"],
  startup: ["business","entrepreneur"], entrepreneur: ["business","startup"],
  marketing: ["digital","branding","d2c"], ads: ["marketing","digital"], seo: ["digital","marketing"],
  brand: ["personal","branding","reputation"], reputation: ["brand","personal"],
  speaking: ["communication","presentation"], speech: ["communication"], presentation: ["communication","meeting"],
  confidence: ["confident","shameless","fear"], shy: ["confidence","shameless"], fear: ["shameless","confidence"],
  interview: ["job","placement"], placement: ["interview","job"], job: ["interview","career","first"],
  career: ["corporate","job","growth"], corporate: ["career","office","company"], office: ["corporate","company"],
  content: ["reels","instagram","video"], video: ["content","camera"], youtube: ["content","video"],
  english: ["spoken","fluency","communication"],
  ai: ["claude","automation","chatgpt"], automation: ["ai","claude"], chatgpt: ["ai","claude"],
  networking: ["network","connections"],
  women: ["woman","girl","female"], girl: ["women","female"],
  freelance: ["clients","freelancing"], freelancing: ["clients","freelance"], clients: ["freelance","sales"],
  sales: ["selling","sell"], sell: ["sales","selling"], negotiation: ["sales","selling"],
  promotion: ["corporate","career","meeting"],
};

const STOP = new Set(["to","a","an","the","in","of","my","how","i","want","wanna","learn","me","for","and","with","on","is","it","be","do","can","get","become","make","about","at","as","or","im","need","help","start","better","some","that","this"]);

function tokenize(str: string) {
  const raw = str.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
  const base = raw.filter((w) => w.length >= 2 && !STOP.has(w));
  const set = new Set(base);
  base.forEach((t) => (SYN[t] || []).forEach((x) => set.add(x)));
  return { tokens: Array.from(set), phrase: base.join(" ") };
}

function scoreCourse(c: Course, tokens: string[], phrase: string): number {
  let s = 0;
  const title = c.title.toLowerCase();
  const tag = c.tag.toLowerCase();
  const titleWords = title.split(/[^a-z0-9]+/);
  if (phrase && c.kw.includes(phrase)) s += 8;
  if (phrase.length > 3 && title.includes(phrase)) s += 6;
  if (phrase.length > 4 && tag.includes(phrase)) s += 3;
  for (const t of tokens) {
    if (c.kw.includes(t)) s += 5;
    else if (t.length >= 4 && c.kw.some((k) => k.includes(t) || t.includes(k))) s += 3;
    if (titleWords.includes(t)) s += 4;
    else if (t.length >= 4 && title.includes(t)) s += 2;
    if (tag.includes(t)) s += 1;
  }
  if (c.soon) s -= 0.5;
  return s;
}

export interface SearchResult {
  starter: Course | null; // the recommended "start here" course
  results: Course[]; // other related courses
  phrase: string;
  fallback: boolean; // true when nothing matched and we show goal starters
}

export function searchCourses(str: string, limit = 6): SearchResult {
  const { tokens, phrase } = tokenize(str);
  if (!tokens.length) return { starter: null, results: [], phrase: str.trim(), fallback: false };

  const scored = COURSES.map((c) => ({ c, s: scoreCourse(c, tokens, phrase) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || (a.c.soon ? 1 : 0) - (b.c.soon ? 1 : 0));

  let results = scored.map((x) => x.c);
  let fallback = false;
  if (!results.length) {
    fallback = true;
    results = COURSES.filter((c) => c.start && !c.soon);
  }

  let starter = results.find((c) => c.start && !c.soon) || null;
  if (!starter && results.length) {
    const topCat = results[0].cat;
    starter = COURSES.find((c) => c.cat === topCat && c.start && !c.soon) || null;
  }
  const more = results.filter((c) => c !== starter).slice(0, limit);
  return { starter, results: more, phrase: str.trim(), fallback };
}
