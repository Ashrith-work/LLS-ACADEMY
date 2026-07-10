-- Reels: short vertical course-teaser videos shown on the site.
--
-- NOTE: This project's course catalog is static TypeScript (lib/data/courses.ts),
-- not a database table, so there is no `courses` table to reference. The real link
-- to the catalog is `course_slug` (matches a Course.slug). `course_id` is kept as an
-- optional column for the day the catalog moves into Postgres — add the FK back then:
--   alter table reels
--     add constraint reels_course_id_fkey
--     foreign key (course_id) references courses(id) on delete set null;

create table if not exists reels (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  hook text not null,
  course_id uuid,
  course_slug text not null,
  video_url text,
  poster_url text,
  captions_url text,
  duration_seconds int,
  cta_label text default 'Start course',
  sort_order int default 0,
  is_published boolean default true,
  created_at timestamptz default now()
);

-- Fast lookup of published reels in display order, and per-course filtering.
create index if not exists reels_published_order_idx
  on reels (sort_order)
  where is_published = true;
create index if not exists reels_course_slug_idx
  on reels (course_slug);

alter table reels enable row level security;

-- Anyone (anon included) may read published reels; writes stay service-role only.
create policy "public read published reels"
  on reels for select using (is_published = true);
