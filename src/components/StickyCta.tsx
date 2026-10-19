"use client";

import { useEffect, useState } from "react";
import { sticky } from "@/content/page";
import { CheckoutLink } from "./CheckoutLink";

/**
 * Barra fixa no rodapé (só mobile). Aparece quando o hero sai da tela
 * e some enquanto a seção da oferta está visível.
 */
export function StickyCta() {
  const [heroGone, setHeroGone] = useState(false);
  const [inOffer, setInOffer] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    const offer = document.getElementById("oferta");
    if (!hero || !offer) return;

    const heroIo = new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting));
    const offerIo = new IntersectionObserver(([e]) => setInOffer(e.isIntersecting));
    heroIo.observe(hero);
    offerIo.observe(offer);
    return () => {
      heroIo.disconnect();
      offerIo.disconnect();
    };
  }, []);

  const visible = heroGone && !inOffer;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-deep/95 backdrop-blur-sm transition-[translate,opacity] duration-300 ease-out md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      inert={!visible}
    >
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
