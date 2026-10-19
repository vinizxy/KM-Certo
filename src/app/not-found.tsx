import Link from "next/link";
import { Odometer } from "@/components/Odometer";

export default function NotFound() {
  return (
    <main
      id="conteudo"
      className="mx-auto flex min-h-[80vh] w-full max-w-[760px] flex-col items-start justify-center px-6 py-16"
    >
      <Odometer value="00404" unit="KM" label="Rota não encontrada" />
      <h1 className="display mt-7 text-[3rem] md:text-[4rem]">Esse caminho não está no mapa</h1>
      <p className="mt-4 max-w-[44ch] text-lg text-muted">
        A página que você procurou não existe ou mudou de endereço.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Voltar ao Plano Km Certo
      </Link>
    </main>
  );
}
