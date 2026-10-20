import { safety } from "@/content/page";
import { AlertIcon } from "./icons";

/** Aviso de segurança: sempre renderizado, sem depender de JS. */
export function SafetyNotice() {
  return (
    <aside
      aria-label={safety.title}
      className="flex gap-3 rounded-[10px] border border-warn/40 bg-warn-bg p-4 md:p-5"
    >
      <AlertIcon size={22} className="mt-0.5 shrink-0 text-warn" />
      <p className="text-[0.9375rem] leading-snug font-semibold text-warn">{safety.text}</p>
    </aside>
  );
}
