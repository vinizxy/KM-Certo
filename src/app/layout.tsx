import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { MetaPixel } from "@/components/MetaPixel";
import { seo } from "@/content/page";
import { env } from "@/lib/env";
import "./globals.css";

// next/font baixa as fontes no build e serve do próprio domínio: zero requisição ao Google em runtime.
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: env.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: env.brandName,
    title: seo.title,
    description: seo.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Plano Km Certo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1116",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${barlowCondensed.variable} ${barlow.variable} ${plexMono.variable}`}
    >
      <body>
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-[8px] bg-accent px-4 py-3 font-semibold text-bg-deep focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {children}
        <CookieConsent />
        <MetaPixel />
      </body>
    </html>
  );
}
