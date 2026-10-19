import { KmChip } from "./KmChip";

type JourneySectionProps = {
  id: string;
  chip: { km?: number; label: string };
  title: string;
  children: React.ReactNode;
  className?: string;
};

/** Uma "marca de quilometragem": marcador no trilho, chip mono e título (h2). */
export function JourneySection({ id, chip, title, children, className = "" }: JourneySectionProps) {
  const titleId = `${id}-titulo`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={`relative scroll-mt-4 py-11 pr-6 pl-[60px] md:py-16 md:pr-10 md:pl-[104px] ${className}`}
    >
      <span aria-hidden="true" data-marker className="journey-marker" />
      <KmChip {...chip} />
      <h2 id={titleId} className="display mt-3 text-[2.25rem] md:text-[3rem]">
        {title}
      </h2>
      {children}
    </section>
  );
}
