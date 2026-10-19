import Link from "next/link";
import { env } from "@/lib/env";
import { GaugeIcon } from "./icons";

type LegalPageProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

/** Moldura das páginas legais. Texto com placeholders entre [colchetes]: requer revisão jurídica. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <header className="mx-auto flex w-full max-w-[760px] items-center justify-between gap-4 px-6 pt-5 md:pt-8">
        <Link
          href="/"
          className="flex min-h-12 items-center gap-2 font-display text-lg font-bold tracking-[0.06em] text-text no-underline"
        >
          <GaugeIcon size={24} className="text-accent" />
          {env.brandName.toUpperCase()}
        </Link>
        <Link href="/" className="flex min-h-12 items-center font-semibold text-accent underline">
          Voltar à página
        </Link>
      </header>
      <main
        id="conteudo"
        tabIndex={-1}
        className="legal mx-auto w-full max-w-[760px] px-6 pt-10 pb-20 outline-none"
      >
        <h1 className="display text-[2.75rem] md:text-[3.5rem]">{title}</h1>
        <p className="mt-3 font-mono text-xs tracking-[0.08em] text-muted uppercase">
          Última atualização: {updated}
        </p>
        <div className="mt-8">{children}</div>
      </main>
    </>
  );
}
