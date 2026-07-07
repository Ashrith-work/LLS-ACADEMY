import type { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import { AuthProvider } from "@/lib/auth/dev-auth";
import { SITE } from "@/lib/data/site";
import "./globals.css";

/* Display: confident, heavy, distinctive. Body: clean + readable. */
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
  themeColor: "#0E0E14",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body bg-ink text-cream antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
