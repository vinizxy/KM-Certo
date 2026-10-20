import { hero } from "@/content/page";
import { env } from "@/lib/env";
import { ArrowDownIcon, GaugeIcon } from "./icons";
import { Mascot } from "./Mascot";
import { Odometer } from "./Odometer";

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-6 pt-5 md:px-10 md:pt-8">
      <p className="flex items-center gap-2 font-display text-lg font-bold tracking-[0.06em] text-text">
        <GaugeIcon size={26} className="text-accent" />
        <span>{env.brandName.toUpperCase()}</span>
      </p>
      <span className="chip rounded-full border border-line px-3 py-1.5">{hero.formatChip}</span>
    </header>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="mx-auto w-full max-w-[1040px] px-6 pb-12 md:px-10 md:pb-20"
    >
      <div className="mt-10 grid gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:items-center md:gap-12">
        <div className="flex flex-col items-start">
          <Odometer {...hero.odometer} />

          <h1 id="hero-title" className="display mt-7 text-[min(3.125rem,14vw)] md:text-[4.5rem]">
            {hero.title.before}
            <span className="text-accent">{hero.title.highlight}</span>
            {hero.title.after}
          </h1>

          <p className="mt-5 max-w-[34ch] text-lg leading-snug font-semibold text-text md:text-xl">
            {hero.subtitle}
          </p>
          <p className="mt-3 max-w-[48ch] text-muted">{hero.hook}</p>

          <a href="#oferta" className="btn-primary mt-7 w-full sm:w-auto">
            {hero.cta}
            <ArrowDownIcon size={22} />
          </a>
          <p className="mt-3 font-mono text-xs font-semibold tracking-[0.08em] text-muted">
            {hero.micro}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 md:gap-4">
          <div
            className="relative flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-[10px] border border-line bg-surface p-4 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.8)]"
            aria-label="Capa do guia Plano Km Certo (espaço reservado)"
            role="img"
          >
            <span className="font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted">
              {hero.cover.kicker}
            </span>
            <div>
              <div className="mb-3 h-1 w-10 bg-accent" aria-hidden="true" />
              <p className="display text-[1.75rem] md:text-[2.25rem]">{hero.cover.title}</p>
              <p className="mt-2 text-sm leading-snug text-text-soft">{hero.cover.subtitle}</p>
            </div>
            <GaugeIcon size={28} className="text-accent" />
          </div>
          <Mascot />
        </div>
      </div>
    </section>
  );
}
