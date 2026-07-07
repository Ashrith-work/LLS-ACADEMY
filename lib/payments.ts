import { track } from "@/lib/tracking";
import { DEV_BYPASS } from "@/lib/utils";

export interface OrderInput {
  /** "course" = single course, "bundle" = all-access. */
  kind: "course" | "bundle";
  itemId: string; // course id or "all-access"
  amount: number; // in ₹ (whole rupees)
  buyer: { name: string; email: string; phone: string };
}

/**
 * initiatePayment — Razorpay web checkout (never app-store checkout).
 *
 * TODO: wire Razorpay. Two pieces:
 *
 * 1. SERVER — order creation lives in app/api/create-order/route.ts.
 *    It calls Razorpay's Orders API with the amount (in paise) and returns
 *    { orderId, keyId } to this client.
 *
 * 2. CLIENT — mount Razorpay's checkout script and open it with the order:
 *
 *    // Load once, lazily (never in first paint):
 *    //   const s = document.createElement("script");
 *    //   s.src = "https://checkout.razorpay.com/v1/checkout.js";
 *    //   document.body.appendChild(s); await scriptLoaded(s);
 *    //
 *    //   const res = await fetch("/api/create-order", {
 *    //     method: "POST",
 *    //     body: JSON.stringify(order),
 *    //   });
 *    //   const { orderId, keyId } = await res.json();
 *    //
 *    //   new (window as any).Razorpay({
 *    //     key: keyId,
 *    //     order_id: orderId,
 *    //     name: "Live Life Shameless",
 *    //     prefill: { name: order.buyer.name, email: order.buyer.email, contact: order.buyer.phone },
 *    //     theme: { color: "#FF4E2B" },
 *    //     handler: () => { window.location.href = "/checkout/success"; },
 *    //     modal: { ondismiss: () => { window.location.href = "/checkout/failed"; } },
 *    //   }).open();
 *
 * Until wired, the dev bypass simulates a successful payment so the whole
 * funnel is clickable end-to-end.
 */
export async function initiatePayment(order: OrderInput): Promise<void> {
  track("payment_initiated", { amount: order.amount, items: order.itemId, kind: order.kind });

  if (DEV_BYPASS) {
    // Simulate the gateway round-trip, then land on success.
    await new Promise((r) => setTimeout(r, 700));
    window.location.href = `/checkout/success?item=${encodeURIComponent(order.itemId)}&kind=${order.kind}`;
    return;
  }

  // TODO: wire Razorpay (see comment above). Without keys we fail safe:
  window.location.href = "/checkout/failed";
}
