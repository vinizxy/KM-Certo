"use client";

import { useEffect, useRef } from "react";

/**
 * Trilho vertical (spine) da página. A linha se preenche com accent conforme o scroll,
 * e cada marcador acende quando o preenchimento passa por ele.
 * Com prefers-reduced-motion: estado final (linha cheia, marcadores acesos), sem animação.
 */
export function Journey({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const layout = () => {
      const last = markers.at(-1);
      if (!last) return 0;
      const rootTop = el.getBoundingClientRect().top;
      const lastCenter = last.getBoundingClientRect().top - rootTop + last.offsetHeight / 2;
      el.style.setProperty("--spine-end", `${Math.max(0, el.offsetHeight - lastCenter)}px`);
      return lastCenter;
    };

    const update = () => {
      frame = 0;
      const length = layout();
      if (reduced.matches) {
        el.style.setProperty("--spine-progress", "1");
        markers.forEach((m) => (m.dataset.reached = "true"));
        return;
      }
      const rootTop = el.getBoundingClientRect().top;
      const filled = Math.min(Math.max(window.innerHeight * 0.6 - rootTop, 0), length);
      el.style.setProperty("--spine-progress", length ? String(filled / length) : "0");
      for (const m of markers) {
        const center = m.getBoundingClientRect().top - rootTop + m.offsetHeight / 2;
        m.dataset.reached = center <= filled + 1 ? "true" : "false";
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(el);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={root} className="journey relative mx-auto w-full max-w-[1040px]">
      <div aria-hidden="true" className="journey-spine">
        <div className="journey-fill" />
      </div>
      {children}
    </div>
  );
}
