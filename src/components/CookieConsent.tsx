"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { consent } from "@/content/page";
import { env } from "@/lib/env";
import { getConsent, setConsent, type ConsentChoice } from "@/lib/tracking";

/**
 * Banner mínimo de consentimento (LGPD). Só existe se houver Pixel configurado:
 * sem rastreador, não há o que consentir.
 */
export function CookieConsent() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // localStorage só existe no navegador; o banner nasce fechado no HTML estático.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (env.metaPixelId && getConsent() === null) setOpen(true);
  }, []);

  if (!open) return null;

  const choose = (choice: ConsentChoice) => {
    setConsent(choice);
    setOpen(false);
  };

  return (
    <div
      role="region"
      aria-label="Consentimento de cookies"
      className="fixed inset-x-3 bottom-3 z-50 rounded-[10px] border border-line bg-surface p-4 shadow-[0_16px_40px_-12px_rgb(0_0_0/0.8)] md:inset-x-auto md:right-6 md:bottom-6 md:max-w-[26rem]"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <p className="text-[0.9375rem] text-text-soft">
        {consent.text}{" "}
        <Link href="/privacidade" className="text-accent underline">
          {consent.more}
        </Link>
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-12 rounded-[8px] border border-line font-semibold text-text hover:bg-[#1f242d]"
        >
          {consent.decline}
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-12 rounded-[8px] border border-line font-semibold text-text hover:bg-[#1f242d]"
        >
          {consent.accept}
        </button>
      </div>
    </div>
  );
}
