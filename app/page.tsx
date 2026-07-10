import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { GoalEntry } from "@/components/home/GoalEntry";
import { CourseFinderHero } from "@/components/CourseFinderHero";
import { LaneRow } from "@/components/home/LaneRow";
import { ReelsRail } from "@/components/home/ReelsRail";
import { BundleSection } from "@/components/home/BundleSection";
import { ProofSection } from "@/components/home/ProofSection";
import { Faq } from "@/components/home/Faq";
import { LANES } from "@/lib/data/courses";

/**
 * The academy homepage — browse + abundance, for brand/organic traffic.
 * Section order is the trust arc: desire (hero) → abundance (lanes)
 * → value (bundle) → trust (proof) → objections (FAQ).
 */
export default function HomePage() {
  return (
    <>
      <TopBar />
      <main>
        <GoalEntry />
        <CourseFinderHero />
        <div id="courses" className="border-y border-ink/10 py-4">
          {LANES.map((lane, i) => (
            <LaneRow key={lane.id} lane={lane} index={i} />
          ))}
        </div>
        <ReelsRail />
        <BundleSection />
        <ProofSection />
        <Faq bgClass="bg-bone/60" />
      </main>
      <Footer />
    </>
  );
}
