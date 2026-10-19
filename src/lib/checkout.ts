import { env } from "./env";

/**
 * Parâmetros repassados da URL da página para a URL do checkout.
 * Chave = nome na página; valor = nome esperado pela plataforma de checkout.
 * Ex.: se a plataforma usa "src" para o que chega como "sck", troque aqui.
 */
export const forwardedParams: Record<string, string> = {
  utm_source: "utm_source",
  utm_medium: "utm_medium",
  utm_campaign: "utm_campaign",
  utm_content: "utm_content",
  utm_term: "utm_term",
  fbclid: "fbclid",
  src: "src",
  sck: "sck",
};

const STORAGE_KEY = "kmcerto:params";

/** Guarda os parâmetros de entrada para não perdê-los se a pessoa navegar para /privacidade e voltar. */
function readParams(search: string): Record<string, string> {
  const incoming = new URLSearchParams(search);
  const found: Record<string, string> = {};
  for (const key of Object.keys(forwardedParams)) {
    const value = incoming.get(key);
    if (value) found[key] = value.slice(0, 500);
  }

  try {
    if (Object.keys(found).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
      return found;
    }
    const saved = sessionStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as Record<string, string>) : found;
  } catch {
    return found;
  }
}

/** URL base do checkout, ou null quando a variável ainda não foi configurada. */
export function baseCheckoutUrl(): string | null {
  return env.checkoutUrl || null;
}

/** Monta a URL final do checkout repassando UTMs, fbclid e src/sck. Roda só no navegador. */
export function buildCheckoutUrl(search: string = window.location.search): string | null {
  const base = baseCheckoutUrl();
  if (!base) return null;

  let url: URL;
  try {
    url = new URL(base);
  } catch {
    return null;
  }

  const params = readParams(search);
  for (const [key, value] of Object.entries(params)) {
    const target = forwardedParams[key];
    if (target && !url.searchParams.has(target)) url.searchParams.set(target, value);
  }
  return url.toString();
}
