import { consent } from "@/content/page";
import { env } from "@/lib/env";

/**
 * Banner mínimo de consentimento (LGPD). Só é renderizado se houver Pixel configurado:
 * sem rastreador, não há o que consentir. Nasce escondido; src/enhance mostra quando
 * ainda não há escolha salva e cuida dos botões.
 */
export function CookieConsent() {
  if (!env.metaPixelId) return null;

  return (
    <div
      data-consent-banner
      hidden
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-3 bottom-3 z-50 rounded-[10px] border border-line bg-surface p-4 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[26rem]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <p className="text-[0.9375rem] text-text-soft">
        {consent.text}{" "}
        <a href="/privacidade" className="text-accent underline">
          {consent.more}
        </a>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          data-consent="denied"
          className="min-h-12 rounded-[8px] border border-line font-semibold text-text hover:bg-[#1f242d]"
        >
          {consent.decline}
        </button>
        <button
          type="button"
          data-consent="granted"
          className="min-h-12 rounded-[8px] border border-line font-semibold text-text hover:bg-[#1f242d]"
        >
          {consent.accept}
        </button>
      </div>
    </div>
  );
}
