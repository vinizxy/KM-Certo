import { sticky } from "@/content/page";
import { CheckoutLink } from "./CheckoutLink";

/**
 * Barra fixa no rodapé (só mobile). Nasce escondida; src/enhance mostra quando o hero
 * sai da tela e esconde enquanto a seção da oferta está visível.
 */
export function StickyCta() {
  return (
    <div data-sticky data-visible="false" inert className="sticky-cta md:hidden">
      <div className="flex min-h-[64px] items-center justify-between gap-3 px-4 py-2">
        <p className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-text">{sticky.label}</span>
          <span className="font-mono text-sm font-semibold text-accent">{sticky.price}</span>
        </p>
        <CheckoutLink className="btn-primary min-h-12 px-5 text-lg">{sticky.cta}</CheckoutLink>
      </div>
    </div>
  );
}
