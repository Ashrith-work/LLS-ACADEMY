import { TopBar } from "@/components/layout/TopBar";
import { Footer } from "@/components/layout/Footer";
import { GoalEntry } from "@/components/home/GoalEntry";
import { LaneRow } from "@/components/home/LaneRow";
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
        <div id="courses" className="bg-[#F1EAD9] py-10 border-y border-ink/10">
          {LANES.map((lane) => (
            <LaneRow key={lane.id} lane={lane} />
          ))}
        </div>
        <BundleSection />
        <ProofSection />
        <Faq bgClass="bg-[#F1EAD9]" />
      </main>
      <Footer />
    </>
  );
}
