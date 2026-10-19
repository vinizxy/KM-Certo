import Link from "next/link";
import { footer } from "@/content/page";
import { env } from "@/lib/env";
import { GaugeIcon } from "./icons";
import { SafetyNotice } from "./SafetyNotice";

export function Footer() {
  const email = env.contactEmail;
  const hasEmail = email.includes("@");
  return (
    <footer className="mx-auto w-full max-w-[1040px] px-6 pt-4 pb-28 md:px-10 md:pb-12">
      <SafetyNotice />
      <div className="mt-8 flex flex-col gap-5 border-t border-line-soft pt-8 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.06em] text-text">
          <GaugeIcon size={22} className="text-accent" />
          {env.brandName.toUpperCase()}
        </p>
        <nav
          aria-label="Rodapé"
          className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6"
        >
          <p className="flex min-h-12 items-center gap-2 text-muted">
            {footer.contactLabel}:{" "}
            {hasEmail ? (
              <a href={`mailto:${email}`} className="text-text-soft underline">
                {email}
              </a>
            ) : (
              <span className="text-text-soft">{email}</span>
            )}
          </p>
          <Link href="/privacidade" className="flex min-h-12 items-center text-text-soft underline">
            {footer.privacy}
          </Link>
          <Link href="/termos" className="flex min-h-12 items-center text-text-soft underline">
            {footer.terms}
          </Link>
        </nav>
      </div>
      <p className="mt-4 text-sm text-muted">
        © {new Date().getFullYear()} {env.brandName}
      </p>
    </footer>
  );
}
