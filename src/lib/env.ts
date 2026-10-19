/**
 * Variáveis públicas, embutidas no build (export estático).
 * Vazias = placeholder pendente (ver README).
 */
const clean = (v: string | undefined) => (v ?? "").trim();

export const env = {
  siteUrl: clean(process.env.NEXT_PUBLIC_SITE_URL).replace(/\/$/, "") || "http://localhost:3000",
  checkoutUrl: clean(process.env.NEXT_PUBLIC_CHECKOUT_URL),
  metaPixelId: clean(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  contactEmail: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "[E-MAIL]",
  brandName: clean(process.env.NEXT_PUBLIC_BRAND_NAME) || "Km Certo Moto",
};
