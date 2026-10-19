import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { env } from "@/lib/env";

export const metadata: Metadata = {
  title: `Política de privacidade | ${env.brandName}`,
  description: `Como a ${env.brandName} trata dados pessoais nesta página, conforme a LGPD.`,
  alternates: { canonical: "/privacidade" },
};

// ATENÇÃO: modelo com placeholders entre [colchetes]. Precisa de revisão jurídica antes de publicar.
export default function PrivacidadePage() {
  const email = env.contactEmail;
  return (
    <LegalPage title="Política de privacidade" updated="[DATA]">
      <p>
        Esta política explica como a <strong>{env.brandName}</strong> trata dados pessoais de quem
        visita esta página, em conformidade com a Lei Geral de Proteção de Dados (Lei nº
        13.709/2018, LGPD).
      </p>

      <h2>1. Controlador</h2>
      <p>
        Controlador dos dados: <strong>[RAZÃO SOCIAL]</strong>, inscrito no CNPJ sob o nº{" "}
        <strong>[CNPJ]</strong>, com endereço em [ENDEREÇO]. Contato para assuntos de privacidade e
        encarregado (DPO): <strong>{email}</strong>.
      </p>

      <h2>2. Dados coletados</h2>
      <ul>
        <li>
          <strong>Preferência de cookies:</strong> sua escolha (aceitar ou recusar) fica salva no
          armazenamento local do seu navegador. Não sai do seu aparelho.
        </li>
        <li>
          <strong>Meta Pixel (somente se você aceitar):</strong> dados de navegação como páginas
          vistas, cliques no botão de compra, identificadores de dispositivo e navegador, endereço
          IP e cookies da Meta.
        </li>
        <li>
          <strong>Parâmetros de campanha:</strong> UTMs e identificadores de anúncio presentes no
          link de acesso, repassados à plataforma de checkout para atribuir a origem da venda.
        </li>
        <li>
          <strong>Dados da compra:</strong> nome, e-mail, documento e dados de pagamento são
          coletados diretamente pela plataforma de checkout [NOME DA PLATAFORMA], não por esta
          página.
        </li>
      </ul>

      <h2>3. Finalidade</h2>
      <ul>
        <li>Medir o desempenho de anúncios e desta página.</li>
        <li>Atribuir a venda à campanha de origem.</li>
        <li>Processar a compra e entregar o material por e-mail.</li>
        <li>Responder a contatos e pedidos de reembolso.</li>
      </ul>

      <h2>4. Bases legais</h2>
      <ul>
        <li>
          <strong>Consentimento</strong> (art. 7º, I): Meta Pixel e cookies de medição.
        </li>
        <li>
          <strong>Execução de contrato</strong> (art. 7º, V): processamento da compra e entrega do
          produto.
        </li>
        <li>
          <strong>Cumprimento de obrigação legal</strong> (art. 7º, II): registros fiscais e de
          consumo.
        </li>
        <li>
          <strong>Legítimo interesse</strong> (art. 7º, IX): segurança e prevenção a fraudes, quando
          aplicável. [REVISAR]
        </li>
      </ul>

      <h2>5. Compartilhamento</h2>
      <ul>
        <li>
          <strong>Meta Platforms</strong> (Meta Pixel), apenas com seu consentimento. A Meta pode
          tratar dados fora do Brasil, conforme a política dela.
        </li>
        <li>
          <strong>Plataforma de checkout</strong> [NOME DA PLATAFORMA], responsável pelo pagamento e
          pela entrega.
        </li>
        <li>Autoridades, quando houver obrigação legal ou ordem judicial.</li>
      </ul>
      <p>Não vendemos dados pessoais.</p>

      <h2>6. Retenção</h2>
      <p>
        A preferência de cookies fica no seu navegador até você apagá-la. Dados de medição seguem os
        prazos da Meta. Dados de compra são mantidos pelo prazo exigido pela legislação fiscal e de
        consumo: [PRAZO].
      </p>

      <h2>7. Seus direitos</h2>
      <p>Conforme o art. 18 da LGPD, você pode, a qualquer momento:</p>
      <ul>
        <li>confirmar se tratamos seus dados e acessá-los;</li>
        <li>corrigir dados incompletos ou desatualizados;</li>
        <li>pedir anonimização, bloqueio ou eliminação de dados desnecessários;</li>
        <li>pedir a portabilidade dos dados;</li>
        <li>saber com quem compartilhamos seus dados;</li>
        <li>revogar o consentimento;</li>
        <li>reclamar à Autoridade Nacional de Proteção de Dados (ANPD).</li>
      </ul>
      <p>
        Para exercer seus direitos, escreva para <strong>{email}</strong>. Responderemos em até
        [PRAZO DE RESPOSTA].
      </p>

      <h2>8. Como mudar sua escolha de cookies</h2>
      <p>
        Apague os dados deste site nas configurações do seu navegador. Na próxima visita, o aviso de
        cookies aparece de novo.
      </p>

      <h2>9. Alterações</h2>
      <p>Esta política pode ser atualizada. A data no topo indica a versão vigente.</p>
    </LegalPage>
  );
}
