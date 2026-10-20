type OdometerProps = {
  value: string;
  unit: string;
  label: string;
};

/** Odômetro estático de 5 dígitos. O texto acessível é a leitura completa. */
export function Odometer({ value, unit, label }: OdometerProps) {
  const digits = value.padStart(5, "0").slice(-5).split("");
  return (
    <figure className="flex flex-col gap-2">
      <div
        className="flex flex-wrap items-end gap-2"
        role="img"
        aria-label={`Odômetro marcando ${value} ${unit}`}
      >
        <div className="flex gap-1">
          {digits.map((d, i) => (
            <span
              key={i}
              className="flex aspect-[34/46] w-[min(34px,calc((100vw-64px)/5))] items-center justify-center rounded-[4px] border border-line bg-bg-deep font-mono text-[min(1.625rem,7.5vw)] font-semibold text-accent tabular-nums shadow-[inset_0_-10px_14px_-10px_rgb(0_0_0/0.9)]"
            >
              {d}
            </span>
          ))}
        </div>
        <span className="pb-1 font-mono text-sm font-semibold tracking-[0.08em] text-muted">
          {unit}
        </span>
      </div>
      <figcaption className="font-mono text-xs tracking-[0.08em] text-muted uppercase">
        {label}
      </figcaption>
    </figure>
  );
}
