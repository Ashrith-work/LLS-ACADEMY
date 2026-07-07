import type { Lane } from "@/lib/types";
import { coursesByLane } from "@/lib/data/courses";
import { LANE_STYLES, cn } from "@/lib/utils";
import { CourseCard } from "@/components/course/CourseCard";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Reel-style lane row — the cards auto-slide continuously like a reel and
 * pause on hover/focus so they stay clickable. Live courses first.
 * The track holds two copies of the cards; it slides exactly one copy width
 * (-50%) and loops seamlessly. Respects prefers-reduced-motion.
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
            <span className={cn("h-3 w-3 rounded-full", styles.bg)} aria-hidden />
            <h2 id={`lane-${lane.id}`} className="font-display text-xl font-semibold text-ink sm:text-2xl">
              {lane.label}
            </h2>
          </div>
          <p className="mb-5 text-sm text-muted">{lane.hook}</p>
        </div>
        {/*
          Reel: auto-slides on devices with a hover-capable pointer (desktop),
          pausing on hover/focus. On TOUCH devices (no hover) the animation is
          off and the row becomes a normal swipe carousel — so cards stay tappable.
        */}
        <div className="group scrollbar-none overflow-x-auto [@media(hover:hover)]:overflow-hidden motion-reduce:overflow-x-auto">
          <div className="flex w-max gap-4 px-4 pb-2 animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] [@media(hover:none)]:animate-none motion-reduce:animate-none">
            {courses.map((c) => (
              <CourseCard key={c.id} course={c} from={`home-lane-${lane.id}`} showStartHere />
            ))}
            {/* Second copy — only for the seamless desktop loop; hidden on touch, reduced-motion & from assistive tech. */}
            {courses.map((c) => (
              <span key={`dup-${c.id}`} className="contents [@media(hover:none)]:hidden motion-reduce:hidden" aria-hidden>
                <CourseCard course={c} from={`home-lane-${lane.id}`} showStartHere />
              </span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}
