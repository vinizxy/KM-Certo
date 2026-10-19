import { offer } from "@/content/page";
import { CheckoutLink } from "./CheckoutLink";
import { ArrowRightIcon, CheckIcon, LockIcon } from "./icons";
import { JourneySection } from "./JourneySection";

export function OfferSection() {
  return (
    <JourneySection id="oferta" chip={offer.chip} title={offer.title} className="pb-16 md:pb-24">
      <p className="mt-3 text-lg text-text-soft">{offer.lead}</p>

      <div className="mt-7 max-w-[34rem] rounded-[12px] border-2 border-accent bg-surface p-6 shadow-[0_24px_60px_-30px_rgb(255_176_0/0.35)] md:p-8">
        <p className="flex items-baseline gap-3">
          <span className="display text-[4rem] leading-none text-accent md:text-[5rem]">
            {offer.price}
          </span>
          <span className="font-mono text-sm font-semibold tracking-[0.08em] text-muted uppercase">
            {offer.priceNote}
          </span>
        </p>

        <ul className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
          {offer.items.map((item) => (
            <li key={item} className="flex gap-3 text-text">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ok-bg text-ok">
                <CheckIcon size={14} strokeWidth={3} />
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <CheckoutLink className="btn-primary mt-7 w-full">
          {offer.cta}
          <ArrowRightIcon size={22} />
        </CheckoutLink>

        <p className="mt-5 flex gap-2.5 text-sm text-muted">
          <LockIcon size={18} className="mt-0.5 shrink-0 text-muted" />
          <span>{offer.footer}</span>
        </p>
      </div>
    </JourneySection>
  );
}
