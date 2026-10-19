import { plan } from "@/content/page";
import { ArrowDownIcon, CheckIcon } from "./icons";
import { JourneySection } from "./JourneySection";

export function PlanSection() {
  return (
    <JourneySection id="plano" chip={plan.chip} title={plan.title}>
      <div className="mt-5 grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-12">
        <p className="max-w-[52ch] text-lg text-text-soft">{plan.text}</p>
        <ul className="flex flex-col gap-4">
          {plan.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ok-bg text-ok">
                <CheckIcon size={16} strokeWidth={3} />
              </span>
              <span className="text-text-soft">{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <a href="#oferta" className="text-link mt-6">
        {plan.cta}
        <ArrowDownIcon size={18} />
      </a>
    </JourneySection>
  );
}
