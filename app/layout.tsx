import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth/dev-auth";
import { CartProvider } from "@/lib/cart/cart";
import { AddCourseBadge } from "@/components/ui/AddCourseBadge";
import { SITE } from "@/lib/data/site";
import "./globals.css";

/* Premium luxury type — Inter across the board.
   Display: heavy Inter (up to 800) for confident, tight headlines.
   Body:    Inter for crisp, legible copy, nav + buttons.
   Both CSS variables point at the same family so the existing
   font-display / font-body Tailwind utilities keep working. */
const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const display = inter;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Live Life Shameless — Learn the skills, level up your life",
    template: "%s · Live Life Shameless",
  },
  description:
    "24 self-paced courses in clear, simple English — sales, communication, business, personal brand, career. Learn with Shashank. Lifetime access.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Live Life Shameless — online course academy",
    description:
      "Sales, communication, business, career — 24 courses in clear, simple English. Learn the skills and think bigger.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Life Shameless — online course academy",
    description: "24 courses in clear, simple English — sales, communication, business, career. Lifetime access.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0D1854",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body text-inkText antialiased">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
        <AddCourseBadge />
      </body>
    </html>
  );
}
