"use client";

import { useEffect, useState } from "react";
import { baseCheckoutUrl, buildCheckoutUrl } from "@/lib/checkout";
import { trackInitiateCheckout } from "@/lib/tracking";

type CheckoutLinkProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Link real para o checkout externo (mesma aba). O HTML estático já aponta para a URL base;
 * no navegador, a URL ganha UTMs/fbclid/src/sck da página. Sem URL configurada, cai em #oferta.
 */
export function CheckoutLink({ children, className = "" }: CheckoutLinkProps) {
  const [href, setHref] = useState(() => baseCheckoutUrl() ?? "#oferta");

  useEffect(() => {
    const url = buildCheckoutUrl();
    // Sincroniza com dados que só existem no navegador (query string da visita).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (url) setHref(url);
  }, []);

  return (
    <a href={href} className={className} onClick={trackInitiateCheckout}>
      {children}
    </a>
  );
}
