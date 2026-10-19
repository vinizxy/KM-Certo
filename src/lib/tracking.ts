/**
 * Consentimento (LGPD) e eventos do Meta Pixel.
 * Nada é carregado nem disparado sem consentimento explícito.
 */

export type ConsentChoice = "granted" | "denied";

const CONSENT_KEY = "kmcerto:consent";
export const CONSENT_EVENT = "kmcerto:consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  loaded?: boolean;
  version?: string;
  push?: Fbq;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

export function getConsent(): ConsentChoice | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: ConsentChoice) {
  try {
    localStorage.setItem(CONSENT_KEY, choice);
  } catch {
    // Armazenamento bloqueado: a escolha vale só para esta visita.
  }
  window.dispatchEvent(new CustomEvent<ConsentChoice>(CONSENT_EVENT, { detail: choice }));
}

/** Injeta o fbevents.js oficial uma única vez. */
export function loadPixel(pixelId: string) {
  if (window.fbq) return;

  const fbq: Fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue!.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", pixelId);
  fbq("track", "PageView");
  fbq("track", "ViewContent", {
    content_name: "Plano Km Certo",
    content_type: "product",
    value: 37,
    currency: "BRL",
  });
}

export function trackInitiateCheckout() {
  window.fbq?.("track", "InitiateCheckout", { value: 37, currency: "BRL" });
}
