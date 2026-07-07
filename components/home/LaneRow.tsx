import type { Lane } from "@/lib/types";
import { coursesByLane } from "@/lib/data/courses";
import { LANE_STYLES, cn } from "@/lib/utils";
import { CourseCard } from "@/components/course/CourseCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Netflix-style lane row — horizontal scroll, live courses first.
 * Chunking by goal-lane keeps every decision among a handful, never 24 at once.
 */
export function LaneRow({ lane }: { lane: Lane }) {
  const styles = LANE_STYLES[lane.id];
  const courses = [...coursesByLane(lane.id)].sort((a, b) =>
    a.status === b.status ? Number(!!b.anchor) - Number(!!a.anchor) : a.status === "live" ? -1 : 1,
  );

  return (
    <Reveal>
      <section aria-labelledby={`lane-${lane.id}`} className="py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-4 flex items-baseline gap-3">
            <span className={cn("h-2.5 w-2.5 rounded-full", styles.bg)} aria-hidden />
            <h2 id={`lane-${lane.id}`} className="font-display text-xl text-cream sm:text-2xl">
              {lane.label}
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted">{lane.hook}</p>
        </div>
        <div className="scrollbar-none flex gap-4 overflow-x-auto px-4 pb-2 sm:px-[max(1rem,calc((100vw-72rem)/2+1rem))]">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} from={`home-lane-${lane.id}`} showStartHere />
          ))}
        </div>
      </section>
    </Reveal>
  );
}
