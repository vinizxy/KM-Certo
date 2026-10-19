import fs from "node:fs";
import path from "node:path";
import { HelmetIcon } from "./icons";

const FILE = "mascot.webp";
// Ajuste para as dimensões reais da ilustração quando ela chegar.
const WIDTH = 480;
const HEIGHT = 560;

/**
 * Personagem ilustrado da marca. Lido no build: se /public/mascot.webp existir, renderiza a imagem;
 * senão, mostra o espaço reservado. O alt descreve uma ilustração, nunca uma pessoa real.
 */
export function Mascot({ className = "" }: { className?: string }) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", FILE));

  if (exists) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- export estático; imagem já otimizada em webp
      <img
        src={`/${FILE}`}
        width={WIDTH}
        height={HEIGHT}
        alt="Ilustração do personagem da marca Km Certo Moto"
        loading="lazy"
        decoding="async"
        className={`h-full w-full rounded-[10px] object-contain ${className}`}
      />
    );
  }

  return (
    <div
      className={`flex h-full min-h-[11rem] flex-col items-center justify-center gap-3 rounded-[10px] border-2 border-dashed border-line p-4 text-center text-muted ${className}`}
    >
      <HelmetIcon size={36} className="text-line" />
      <p className="font-mono text-[0.6875rem] leading-snug font-semibold tracking-[0.08em]">
        PERSONAGEM DA MARCA (ILUSTRAÇÃO A DEFINIR)
      </p>
    </div>
  );
}
