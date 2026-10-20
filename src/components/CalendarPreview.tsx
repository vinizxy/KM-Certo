import { calendar, calendarRows, type Who } from "@/content/page";
import { ArrowDownIcon, UserIcon, WrenchIcon } from "./icons";
import { JourneySection } from "./JourneySection";

function WhoPill({ who }: { who: Who }) {
  const isYou = who === "voce";
  const Icon = isYou ? UserIcon : WrenchIcon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-sans text-sm font-semibold whitespace-nowrap sm:px-2.5 ${
        isYou ? "bg-ok-bg text-ok" : "bg-warn-bg text-warn"
      }`}
    >
      <Icon size={14} strokeWidth={2.5} className="hidden sm:block" />
      {calendar.whoLabels[who]}
    </span>
  );
}

export function CalendarPreview() {
  return (
    <JourneySection id="previa" chip={calendar.chip} title={calendar.title}>
      <p className="mt-4 max-w-[52ch] text-muted">{calendar.intro}</p>

      <div className="mt-7 overflow-hidden rounded-[10px] border border-line bg-bg-deep">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Prévia do calendário de manutenção: item, intervalo em km e quem faz
          </caption>
          <thead>
            <tr className="border-b border-line">
              {[calendar.columns.item, calendar.columns.every, calendar.columns.who].map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="px-2.5 py-3 font-mono text-[0.6875rem] font-semibold tracking-[0.08em] text-muted uppercase md:px-5"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendarRows.map((row) => (
              <tr key={row.item} className="border-b border-line-soft last:border-b-0">
                <th scope="row" className="px-2.5 py-3.5 font-semibold text-text md:px-5">
                  {row.item}
                </th>
                <td className="px-2.5 py-3.5 font-mono text-sm font-semibold whitespace-nowrap text-accent tabular-nums md:px-5">
                  {row.every}
                </td>
                <td className="px-2.5 py-3.5 md:px-5">
                  <WhoPill who={row.who} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 max-w-[60ch] text-sm text-muted">{calendar.note}</p>
      <a href="#oferta" className="text-link mt-3">
        {calendar.cta}
        <ArrowDownIcon size={18} />
      </a>
    </JourneySection>
  );
}
