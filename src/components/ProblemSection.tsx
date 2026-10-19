import { problem } from "@/content/page";
import { ArrowDownIcon } from "./icons";
import { JourneySection } from "./JourneySection";

export function ProblemSection() {
  return (
    <JourneySection id="problema" chip={problem.chip} title={problem.title}>
      <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-4">
        {problem.items.map((item) => (
          <li
            key={item.n}
            className="flex flex-col gap-2 rounded-[10px] border border-line-soft bg-surface p-5"
          >
            <span
              className="font-mono text-sm font-semibold tracking-[0.08em] text-danger"
              aria-hidden="true"
            >
              {item.n}
            </span>
            <h3 className="font-display text-[1.5rem] leading-[1.05] font-bold text-text uppercase">
              {item.title}
            </h3>
            <p className="text-muted">{item.text}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 max-w-[52ch] text-lg leading-snug font-medium text-text">
        {problem.bridge}
      </p>
      <a href="#plano" className="text-link mt-1">
        {problem.bridgeLink}
        <ArrowDownIcon size={18} />
      </a>
    </JourneySection>
  );
}
