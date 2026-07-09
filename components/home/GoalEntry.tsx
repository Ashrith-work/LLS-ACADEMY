/**
 * GoalEntry — centered framed banner hero (video).
 *
 * A dark full-width band (#0b0b0d) with a centered ~1120px wrapper. The video
 * sits in a frame: rounded corners (16px), soft shadow, thin subtle border.
 * It fills the frame width (w-full, h-auto) with nothing cropped, colors untouched.
 * Autoplay / muted / loop / playsinline; poster paints first frame instantly.
 *
 * Assets in /public: hero-banner.mp4 (web loop), hero-banner-poster.jpg (still).
 */

const VIDEO_SRC = "/hero-banner.mp4";
const POSTER_SRC = "/hero-banner-poster.jpg";

export function GoalEntry() {
  return (
    <section className="bg-[#0b0b0d]" aria-label="Hero">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:py-16">
        <div className="min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-[#111214] shadow-[0_24px_70px_-24px_rgba(0,0,0,0.75),0_6px_18px_rgba(0,0,0,0.45)] sm:min-h-[320px]">
          <video
            className="block h-auto w-full"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={POSTER_SRC}
            aria-label="Hero video"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  );
}
