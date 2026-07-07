import { NextResponse } from "next/server";

/**
 * Razorpay order creation — SERVER side of the payment flow.
 * The client (lib/payments.ts → initiatePayment) POSTs here, gets back an
 * order id, and opens Razorpay's checkout with it.
 *
 * TODO: wire Razorpay. Steps:
 *   1. `npm install razorpay`
 *   2. Add RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET to .env.local
 *   3. Uncomment the implementation below.
 *   4. IMPORTANT: recompute the amount server-side from lib/data/courses.ts
 *      (never trust a client-sent amount).
 *   5. Add a webhook route (app/api/razorpay-webhook/route.ts) to verify the
 *      payment signature before granting course access.
 */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));

  // ── TODO: real implementation ────────────────────────────────
  // import Razorpay from "razorpay";
  // import { getCourse, BUNDLE, effectivePrice } from "@/lib/data/courses";
  //
  // const amountRupees =
  //   body.kind === "bundle" ? BUNDLE.price : effectivePrice(getCourse(body.itemId)!);
  //
  // const rzp = new Razorpay({
  //   key_id: process.env.RAZORPAY_KEY_ID!,
  //   key_secret: process.env.RAZORPAY_KEY_SECRET!,
  // });
  // const order = await rzp.orders.create({
  //   amount: amountRupees * 100, // paise
  //   currency: "INR",
  //   notes: { itemId: body.itemId, kind: body.kind },
  // });
  // return NextResponse.json({ orderId: order.id, keyId: process.env.RAZORPAY_KEY_ID });
  // ─────────────────────────────────────────────────────────────

  console.log("[stub] create-order called with:", body);
  return NextResponse.json(
    { error: "Razorpay not wired yet — see TODO in app/api/create-order/route.ts" },
    { status: 501 },
  );
}
