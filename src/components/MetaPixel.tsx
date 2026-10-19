"use client";

import { useEffect } from "react";
import { env } from "@/lib/env";
import { CONSENT_EVENT, getConsent, loadPixel, type ConsentChoice } from "@/lib/tracking";

/**
 * Carrega o Meta Pixel SOMENTE após consentimento. Sem NEXT_PUBLIC_META_PIXEL_ID, não faz nada.
 * Dispara PageView e ViewContent ao carregar; InitiateCheckout vem dos CTAs de checkout.
 */
export function MetaPixel() {
  useEffect(() => {
    const id = env.metaPixelId;
    if (!id) return;
    if (getConsent() === "granted") {
      loadPixel(id);
      return;
    }
    const onConsent = (e: Event) => {
      if ((e as CustomEvent<ConsentChoice>).detail === "granted") loadPixel(id);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}
