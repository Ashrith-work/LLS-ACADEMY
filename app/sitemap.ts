import type { MetadataRoute } from "next";
import { COURSES } from "@/lib/data/courses";
import { SITE } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  return [
    { url: base, priority: 1 },
    { url: `${base}/start`, priority: 0.9 },
    { url: `${base}/all-access`, priority: 0.9 },
    { url: `${base}/about`, priority: 0.6 },
    { url: `${base}/terms`, priority: 0.3 },
    ...COURSES.map((c) => ({ url: `${base}/courses/${c.id}`, priority: 0.8 })),
  ];
}
