import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black, Noto_Sans_Telugu } from "next/font/google";
import { AuthProvider } from "@/lib/auth/dev-auth";
import { SITE } from "@/lib/data/site";
import "./globals.css";

/* Display: confident, heavy, distinctive. Body: clean + readable.
   Noto Sans Telugu sits in the fallback stack so Telugu glyphs render
   beautifully wherever they appear in mixed Tinglish copy. */
const display = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});
const body = Archivo({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const telugu = Noto_Sans_Telugu({
  subsets: ["telugu"],
  weight: ["400", "700"],
  variable: "--font-telugu",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Live Life Shameless — Telugu lo nerchuko, life lo edagandi",
    template: "%s · Live Life Shameless",
  },
  description:
    "24 self-paced courses in Tinglish (Telugu + English) — sales, communication, business, personal brand, career. Shashank tho nerchukondi. Lifetime access.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Live Life Shameless — Telugu course academy",
    description:
      "Sales, communication, business, career — 24 courses in Tinglish. Telugu lo nerchuko, life lo pedda ga aalochinchuko.",
    locale: "te_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Life Shameless — Telugu course academy",
    description: "24 courses in Tinglish — sales, communication, business, career. Lifetime access.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0E14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="te" className={`${display.variable} ${body.variable} ${telugu.variable}`}>
      <body className="font-body bg-ink text-cream antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
