/**
 * Trilho vertical (spine) da página. A linha se preenche com accent conforme o scroll,
 * e cada marcador acende quando o preenchimento passa por ele (src/enhance).
 * Com prefers-reduced-motion: estado final (linha cheia, marcadores acesos), sem animação.
 */
export function Journey({ children }: { children: React.ReactNode }) {
  return (
    <div data-journey className="journey relative mx-auto w-full max-w-[1040px]">
      <div aria-hidden="true" className="journey-spine">
        <div className="journey-fill" />
      </div>
      {children}
    </div>
  );
}
