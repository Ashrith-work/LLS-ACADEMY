import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * "Coming soon" waitlist — validates demand before a course is shot.
 * Waitlist size per courseId is a direct go/no-go signal for production.
 *
 * TODO: wire a real backend (sheet / Supabase / CRM) — same options as
 * app/api/leads/route.ts. Keep courseId in every row.
 */
const WaitlistSchema = z.object({
  courseId: z.string().min(1),
  email: z.string().email(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = WaitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid waitlist payload" }, { status: 400 });
  }

  // TODO: persist. For now, log it.
  console.log("[stub] waitlist joined:", parsed.data);

  return NextResponse.json({ ok: true });
}
