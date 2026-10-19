"use client";

import { useEffect, useRef, useState } from "react";

const fmt = new Intl.NumberFormat("pt-BR");
const DURATION = 600;

type KmChipProps = { km?: number; label: string };

/**
 * Chip mono de abertura de seção ("KM 1.000 · O PROBLEMA").
 * O número conta de 0 até o valor ao entrar na tela. O HTML estático já traz o valor final,
 * então sem JS ou com reduced-motion o chip aparece pronto.
 */
export function KmChip({ km, label }: KmChipProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState<number | undefined>(km);
  const finalText = km === undefined ? label : `KM ${fmt.format(km)} · ${label}`;

  useEffect(() => {
    const el = ref.current;
    if (km === undefined || !el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (el.getBoundingClientRect().top < window.innerHeight) return; // já visível: não reinicia

    let frame = 0;
    setValue(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 4); // ease-out exponencial
          setValue(Math.round(km * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [km]);

  return (
    <p ref={ref} className="chip">
      <span className="sr-only">{finalText}</span>
      <span aria-hidden="true">
        {km !== undefined && (
          <>
            KM{" "}
            <span
              className="inline-block text-right"
              style={{ minWidth: `${fmt.format(km).length}ch` }}
            >
              {fmt.format(value ?? km)}
            </span>{" "}
            ·{" "}
          </>
        )}
        {label}
      </span>
    </p>
  );
}
