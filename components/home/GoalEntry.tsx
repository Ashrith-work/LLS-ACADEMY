/**
 * GoalEntry — centered framed banner hero (video).
 *
 * A warm paper full-width band (bone #F4EEE2) with a centered ~1120px wrapper.
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
    <section className="bg-white" aria-label="Hero">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 sm:py-16">
        <div className="min-h-[200px] overflow-hidden rounded-2xl border border-ink/10 bg-mist shadow-brutalLg sm:min-h-[320px]">
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
