/**
 * GoalEntry — centered framed banner hero (video).
 *
 * A cool porcelain full-width band (paper #EEF0F8) with a centered ~1120px wrapper.
 * The video sits in a frame: rounded corners (16px), soft warm shadow, thin
 * subtle border. It fills the frame width (w-full, h-auto) with nothing cropped,
 * colors untouched. Autoplay / muted / loop / playsinline; poster paints the
 * first frame instantly.
 *
 * Assets in /public: hero-banner.mp4 (web loop), hero-banner-poster.jpg (still).
 */

const VIDEO_SRC = "/hero-banner.mp4";
const POSTER_SRC = "/hero-banner-poster.jpg";

export function GoalEntry() {
  return (
    <section className="relative overflow-hidden bg-paper" aria-label="Hero">
      {/* Floating amber gradient blur behind the hero frame. */}
      <div
        aria-hidden
        className="hero-glow left-1/2 top-4 h-[420px] w-[720px] max-w-[92vw] -translate-x-1/2 animate-blob motion-reduce:animate-none"
      />
      <div className="relative mx-auto w-full max-w-[1120px] px-5 pt-10 pb-2 sm:pt-16 sm:pb-2">
        <div className="animate-fade-up overflow-hidden rounded-[24px] border border-white/[0.08] bg-mist shadow-brutalLg ring-1 ring-white/5 min-h-[200px] sm:min-h-[320px]">
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
