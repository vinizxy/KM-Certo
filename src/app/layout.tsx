import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed, IBM_Plex_Mono } from "next/font/google";
import { CookieConsent } from "@/components/CookieConsent";
import { seo } from "@/content/page";
import { env } from "@/lib/env";
import "./globals.css";

// next/font baixa as fontes no build e serve do próprio domínio: zero requisição ao Google em runtime.
// Só a fonte dos títulos é pré-carregada: ela pinta o LCP (h1). As outras chegam logo depois,
// com fallback de métricas ajustadas (sem salto de layout).
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  // 600 foi tirado por não ser usado em nenhum lugar: menos um arquivo no caminho do LCP.
  weight: ["700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  subsets: ["latin"],
  // 500 removido: cada peso é um arquivo e uma nova diagramação da página quando chega.
  weight: ["400", "600"],
  variable: "--font-barlow",
  display: "swap",
  preload: false,
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-plex-mono",
  display: "swap",
  preload: false,
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
      {/* Configuração lida por src/enhance (o único JS da página). */}
      <body data-checkout={env.checkoutUrl} data-pixel={env.metaPixelId} data-price={seo.price}>
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-[8px] bg-accent px-4 py-3 font-semibold text-bg-deep focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        {children}
        <CookieConsent />
        {/* Módulo = carregado sem bloquear e executado depois do parse do HTML. */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script type="module" src="/enhance.js" />
      </body>
    </html>
  );
}
