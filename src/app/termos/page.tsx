import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Termos de uso | ${env.brandName}`,
  description: `Condições de compra e uso do guia Plano Km Certo, da ${env.brandName}.`,
  alternates: { canonical: "/termos" },
};

// ATENÇÃO: modelo com placeholders entre [colchetes]. Precisa de revisão jurídica antes de publicar.
export default function TermosPage() {
  const email = env.contactEmail;
  return (
    <LegalPage title="Termos de uso" updated="[DATA]">
      <p>
        Estes termos regem a compra e o uso do guia digital <strong>Plano Km Certo</strong>,
        oferecido por <strong>[RAZÃO SOCIAL]</strong>, CNPJ <strong>[CNPJ]</strong> (“
        {env.brandName}”).
      </p>

      <h2>1. O produto</h2>
      <p>
        Guia em PDF de manutenção preventiva para moto de trabalho, com calendário por
        quilometragem, checklist, tabela de serviços com faixas de preço de referência, sinais de
        alerta e uma planilha de km e gastos como bônus. Não é curso, consultoria nem serviço
        mecânico.
      </p>

      <h2>2. Aviso de segurança</h2>
      <p>
        O conteúdo é educativo. Não substitui o manual do fabricante nem um mecânico qualificado.
        Freios, pneus e direção afetam a sua segurança e devem ser avaliados por profissional. As
        faixas de preço são referências e variam por região, oficina e modelo.
      </p>

      <h2>3. Compra e entrega</h2>
      <p>
        O pagamento é único, no valor de R$ 37, processado pela plataforma [NOME DA PLATAFORMA]. O
        acesso é enviado ao e-mail informado na compra, depois da confirmação do pagamento.
      </p>

      <h2>4. Garantia e reembolso</h2>
      <p>
        Você tem 7 dias, contados da compra, para pedir o reembolso, conforme o art. 49 do Código de
        Defesa do Consumidor. O pedido é feito pela plataforma de checkout ou pelo e-mail{" "}
        <strong>{email}</strong>.
      </p>

      <h2>5. Licença de uso</h2>
      <p>
        A compra dá direito ao uso pessoal do material. Não é permitido revender, redistribuir ou
        publicar o conteúdo, total ou parcialmente, sem autorização por escrito.
      </p>

      <h2>6. Responsabilidade</h2>
      <p>
        A {env.brandName} não se responsabiliza por danos decorrentes de serviços feitos sem
        acompanhamento profissional ou em desacordo com o manual do fabricante. [REVISAR]
      </p>

      <h2>7. Privacidade</h2>
      <p>
        O tratamento de dados pessoais está descrito na{" "}
        <Link href="/privacidade">Política de privacidade</Link>.
      </p>

      <h2>8. Foro e contato</h2>
      <p>
        Fica eleito o foro de [CIDADE/UF], sem prejuízo do foro do domicílio do consumidor. Dúvidas:{" "}
        <strong>{email}</strong>.
      </p>
    </LegalPage>
  );
}
