import { audience } from "@/content/page";
import { CheckIcon, XIcon } from "./icons";
import { JourneySection } from "./JourneySection";

export function AudienceSection() {
  return (
    <JourneySection id="para-quem" chip={audience.chip} title={audience.title}>
      <div className="mt-7 grid gap-3 md:grid-cols-2 md:gap-4">
        <div className="rounded-[10px] border border-[#1f5236] bg-ok-bg p-5">
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.08em] text-ok">
            <CheckIcon size={18} strokeWidth={3} />
            {audience.yes.title}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {audience.yes.items.map((i) => (
              <li key={i} className="flex gap-2.5 text-text">
                <CheckIcon size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-ok" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[10px] border border-line bg-surface p-5">
          <h3 className="flex items-center gap-2 font-mono text-sm font-semibold tracking-[0.08em] text-danger">
            <XIcon size={18} strokeWidth={3} />
            {audience.no.title}
          </h3>
          <ul className="mt-4 flex flex-col gap-3">
            {audience.no.items.map((i) => (
              <li key={i} className="flex gap-2.5 text-text-soft">
                <XIcon size={18} strokeWidth={2.5} className="mt-1 shrink-0 text-danger" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </JourneySection>
  );
}
