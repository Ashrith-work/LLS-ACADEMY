import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * Lead capture — signup-gate submissions (email/phone paths) and router
 * answers land here. This data is the business's Telugu-audience dataset.
 *
 * TODO: wire a real backend — pick one:
 *   - Google Sheet via Apps Script webhook (fastest to ship)
 *   - Supabase table `leads`
 *   - Your CRM's inbound API
 * Keep the payload shape below stable.
 */
const LeadSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(15).optional(),
  method: z.enum(["google", "email", "phone", "dev-bypass"]),
  // Router answers — the research instrument.
  goal: z.string().optional(),
  stage: z.string().optional(),
  blocker: z.string().optional(),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LeadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid lead payload" }, { status: 400 });
  }

  // TODO: persist the lead (sheet / Supabase / CRM). For now, log it.
  console.log("[stub] lead captured:", parsed.data);

  return NextResponse.json({ ok: true });
}
