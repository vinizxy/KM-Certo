const fmt = new Intl.NumberFormat("pt-BR");

type KmChipProps = { id?: string; km?: number; label: string };

/**
 * Chip mono de abertura de seção ("KM 1.000 · O PROBLEMA").
 * O HTML já traz o valor final; src/enhance faz o número contar de 0 até ele ao entrar na tela.
 * Sem JS ou com reduced-motion, o chip aparece pronto.
 */
export function KmChip({ id, km, label }: KmChipProps) {
  const finalText = km === undefined ? label : `KM ${fmt.format(km)} · ${label}`;
  return (
    <p className="chip">
      <span id={id} className="sr-only">
        {finalText}
      </span>
      <span aria-hidden="true">
        {km !== undefined && (
          <>
            KM{" "}
            <span
              data-km={km}
              className="inline-block text-right"
              style={{ minWidth: `${fmt.format(km).length}ch` }}
            >
              {fmt.format(km)}
            </span>{" "}
            ·{" "}
          </>
        )}
        {label}
      </span>
    </p>
  );
}
