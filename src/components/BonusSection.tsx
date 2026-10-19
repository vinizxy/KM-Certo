import { bonus } from "@/content/page";
import { JourneySection } from "./JourneySection";

export function BonusSection() {
  return (
    <JourneySection id="bonus" chip={bonus.chip} title={bonus.title}>
      <p className="mt-4 max-w-[52ch] text-lg text-text-soft">{bonus.text}</p>
      <figure className="mt-7">
        <div className="grid max-w-[34rem] grid-cols-2 gap-3">
          {bonus.cards.map((c) => (
            <div key={c.label} className="rounded-[10px] border border-line bg-surface p-4">
              <p className="font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted">
                {c.label}
              </p>
              <p className="mt-2 font-mono text-[1.375rem] font-semibold text-text tabular-nums">
                {c.value}
              </p>
            </div>
          ))}
        </div>
        <figcaption className="mt-3 text-sm text-muted">{bonus.caption}</figcaption>
      </figure>
    </JourneySection>
  );
}
