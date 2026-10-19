import { AudienceSection } from "@/components/AudienceSection";
import { BonusSection } from "@/components/BonusSection";
import { CalendarPreview } from "@/components/CalendarPreview";
import { FaqSection } from "@/components/FaqSection";
import { Footer } from "@/components/Footer";
import { Hero, SiteHeader } from "@/components/Hero";
import { Journey } from "@/components/Journey";
import { OfferSection } from "@/components/OfferSection";
import { PlanSection } from "@/components/PlanSection";
import { ProblemSection } from "@/components/ProblemSection";
import { StickyCta } from "@/components/StickyCta";
import { seo } from "@/content/page";
import { env } from "@/lib/env";

// schema.org Product. Proibido: aggregateRating e review (não há avaliações reais).
const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: seo.productName,
  description: seo.productDescription,
  image: `${env.siteUrl}/og.png`,
  brand: { "@type": "Brand", name: env.brandName },
  offers: {
    "@type": "Offer",
    price: seo.price,
    priceCurrency: seo.currency,
    availability: "https://schema.org/InStock",
    url: `${env.siteUrl}/`,
  },
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Hero />
        <Journey>
          <ProblemSection />
          <PlanSection />
          <CalendarPreview />
          <BonusSection />
          <AudienceSection />
          <OfferSection />
        </Journey>
        <FaqSection />
      </main>
      <Footer />
      <StickyCta />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
