import { env } from "@/lib/env";

type CheckoutLinkProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Link real para o checkout externo (mesma aba). O HTML já aponta para a URL base;
 * src/enhance acrescenta UTMs/fbclid/src/sck e dispara InitiateCheckout no clique.
 * Sem URL configurada, cai em #oferta.
 */
export function CheckoutLink({ children, className = "" }: CheckoutLinkProps) {
  return (
    <a href={env.checkoutUrl || "#oferta"} data-checkout className={className}>
      {children}
    </a>
  );
}
