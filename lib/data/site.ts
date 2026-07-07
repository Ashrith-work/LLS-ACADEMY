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
  tagline: "Telugu lo nerchuko. Life lo pedda ga aalochinchuko.",
  url: "https://livelifeshameless.in", // TODO: set the real production domain
  instagramReach: "38 lakh+",
  whatsappInviteUrl: "#", // TODO: real WhatsApp community invite link
};

/** Everything a buyer gets with ANY course — concrete, no fluff. */
export const DELIVERABLES = [
  { title: "Recorded lessons in Tinglish", detail: "Telugu + English mix — mee bhasha lo, mee pace lo, lifetime access." },
  { title: "Certificate of completion", detail: "Course complete cheyagane certificate — LinkedIn lo pettukovachu." },
  { title: "WhatsApp community", detail: "Same journey lo unna Telugu vaallatho — questions, wins, accountability." },
  { title: "Monthly live Q&A with Shashank", detail: "Prathi nela live session — mee doubts ki direct answers." },
  { title: "Weekly teardown feedback", detail: "Mee pitch/content/answers meeda community teardown — real feedback, real improvement." },
  { title: "Points toward 1:1 with Shashank", detail: "Course complete chesi, active ga unte — Shashank tho 1:1 call ki points earn cheyyandi." },
];

/** TODO: SAMPLE testimonials — replace with real, permissioned ones (video > text). */
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Ravi Teja",
    place: "Karimnagar",
    quote:
      "Nenu anukunna motivation video la untundi ani. Kaadu — direct ga 'ila cheyyi' ani cheppadu. Art of Selling chesaka first month lo ne 2 deals close chesa.",
    result: "Field sales → team lead in 8 months",
  },
  {
    name: "Sandhya",
    place: "Vijayawada",
    quote:
      "Meetings lo nenu eppudu silent. Communication course lo cheppina frameworks use chesi first time managers mundu presentation ichha — appraisal lo adhe point ayyindi.",
    result: "First promotion in 3 years",
  },
  {
    name: "Prashanth",
    place: "Nizamabad",
    quote:
      "'Emanukuntaro' ani 4 years aagipoya. LLS course challenges vall ah bhayam break ayyindi. Ippudu na own tuition business nadipistunna — oorike kaadu, profit tho.",
    result: "Started his own coaching business",
  },
  {
    name: "Divya",
    place: "Hyderabad",
    quote:
      "English perfect ga radu ani interviews avoid chesedanni. Crack an Interview lo scripts practice chesi — third attempt lo offer vachindi. ₹499 ki intha value expect cheyyaledu.",
    result: "Placed at an MNC, 40% above expected package",
  },
];

/** FAQ — answers the REAL objections, plainly. No dodging the no-refund policy. */
export const FAQS: FaqItem[] = [
  {
    q: "Idi kuda 'motivation gyaan' ena?",
    a: "Kaadu. Prathi course lo frameworks, scripts, templates, assignments untayi — 'inspire' cheyyadam kaadu, 'implement' cheyyadam goal. Prathi course page lo exact ga em istamo list chesam — chudandi, judge cheyyandi.",
  },
  {
    q: "Nenu complete chestano? Chala courses konni vadalesa...",
    a: "Anduke lifetime access + WhatsApp community + monthly live Q&A. Tinglish lo undadam valla lectures heavy ga anipinchavu. Weekly teardowns lo mee progress ki accountability untundi. Only watch cheyyadam kaadu — cheyyadam.",
  },
  {
    q: "Payment chesaka access ela vastundi?",
    a: "Payment success avvagane instant ga access details + WhatsApp community invite vastayi. Emaina problem unte community lo or support ki message cheyyandi — 24 hours lo resolve chestam.",
  },
  {
    q: "Refund policy enti?",
    a: "Refunds ledu — idi mundhe clear ga cheptunnam. Digital course kabatti access ichaka vapas teesukolem. Anduke prathi course page lo em untundo full ga chupistam, konni free previews kuda istam. Sure ga unnappude konandi — mem pressure cheyyam.",
  },
  {
    q: "Phone lo work avtunda? Data entha kavali?",
    a: "Full ga mobile kosam design chesam. Videos konchem data-friendly quality lo kuda available — patchy network unna chudavachu. Download options courses platform lo untayi.",
  },
  {
    q: "English raakapothe problem aa?",
    a: "Assalu kaadu — adhe point. Anni courses Tinglish lo (Telugu + English mix). English fluency avasaram ledu; konni English terms industry lo ela use avtayo ade context lo nerchukuntaru.",
  },
];

/** Shashank's story beats — authenticity, not guru-polish.
 *  TODO: SAMPLE copy — tighten with real dates/details from Shashank. */
export const STORY = {
  headline: "Guru kaadu. Mee laane struggle chesina manishi.",
  beats: [
    {
      title: "Engineering → confusion",
      body: "Andarilaane engineering chesa. Andarilaane 'next enti' ani bhayapadda. Difference okkate — aa bhayam tho aagipoledu.",
    },
    {
      title: "Sales floor nunchi director varaku",
      body: "Luxury Escapes lo regional business development director ayyaanu — backdoor kaadu, references kaadu. Selling nerchukuni, cheyyi, fail avvi, malli cheyyi.",
    },
    {
      title: "IIM Lucknow — nerchukovadam aapaledu",
      body: "Executive education IIM Lucknow lo. Degree kosam kaadu — business ni deep ga ardham chesukovadaniki.",
    },
    {
      title: "Bootstrap founder",
      body: "Evari funding lekunda StartupWithShashank build chesa. 38 lakh+ mandiki reach ayye Telugu community — okka rupai ad spend start lo lekunda.",
    },
    {
      title: "Ippudu — mee vantu",
      body: "Nenu nerchukunnadi antha Tinglish lo, direct ga, affordable ga. Endukante naaku telusu — chinna town lo talent ki kaadu kotha, opportunity ki kotha.",
    },
  ],
};
