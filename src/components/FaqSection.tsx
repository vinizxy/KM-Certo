import { faq } from "@/content/page";

export function FaqSection() {
  return (
    <section
      id="perguntas"
      aria-labelledby="perguntas-titulo"
      className="mx-auto w-full max-w-[1040px] border-t border-line-soft px-6 py-11 md:px-10 md:py-16"
    >
      <h2 id="perguntas-titulo" className="display text-[2.25rem] md:text-[3rem]">
        {faq.title}
      </h2>
      <div className="mt-7 grid gap-3 md:grid-cols-2 md:gap-4">
        {faq.items.map((item) => (
          <article key={item.q} className="rounded-[10px] border border-line-soft bg-surface p-5">
            <h3 className="text-lg font-semibold text-text">{item.q}</h3>
            <p className="mt-2 text-muted">{item.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
