# Plano Km Certo — página de vendas

Landing page de página única do guia digital **Plano Km Certo** (marca **Km Certo Moto**).
Next.js (App Router) + TypeScript + Tailwind CSS v4, com export estático (`out/`).

Direção visual "Painel de moto": o scroll é um odômetro. Cada seção é uma marca de quilometragem
no trilho vertical à esquerda, que se preenche com a cor de destaque conforme a leitura avança.

## Instalação

```bash
npm install
cp .env.example .env.local   # preencha as variáveis
npm run dev                  # http://localhost:3000
```

Scripts:

| Script                 | O que faz                                        |
| ---------------------- | ------------------------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento                      |
| `npm run build`        | Gera o site estático em `out/` (inclui os passos abaixo) |
| `npm run build:enhance`| Compila `src/enhance` para `public/enhance.js` (esbuild) |
| `npm run preview`      | Serve `out/` em http://localhost:4173            |
| `npm run lint`         | ESLint (regras do Next + Prettier)               |
| `npm run typecheck`    | TypeScript sem emitir arquivos                   |
| `npm run format`       | Prettier (com ordenação de classes Tailwind)     |

## Arquitetura de performance

A página não usa hidratação do React. Todos os componentes são de servidor e o HTML sai pronto do build.

- **Único JS:** `src/enhance/index.ts` (cerca de 1,7 KB gzip) cuida do trilho que se preenche, da contagem dos chips, dos links de checkout com UTMs, da barra fixa, do banner de cookies e do Pixel. A configuração chega por `data-*` no `<body>` (`src/app/layout.tsx`).
- **Pós-build:** `scripts/strip-next-runtime.mjs` remove do HTML exportado o runtime do React/Next (cerca de 140 KB gzip que só serviriam para hidratar HTML estático). O build falha se sobrar algum script do Next.
- **CSS inline** (`experimental.inlineCss`): sem requisição bloqueando a primeira pintura. É a escolha certa para tráfego de anúncio, em que quase todo visitante é novo.
- **Fontes:** só a Barlow Condensed (títulos, elemento do LCP) é pré-carregada. Barlow e IBM Plex Mono chegam em seguida, com fallback de métricas ajustadas.

Consequência: um componente novo que precise de interatividade não vira `"use client"`. O comportamento vai em `src/enhance`, acionado por um `data-*`.

## Variáveis de ambiente

Todas são públicas e entram no HTML **no momento do build**. Mudou uma variável? Gere o build de novo.

| Variável                    | Uso                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | URL pública sem barra final. Canonical, Open Graph, sitemap, robots e JSON-LD.       |
| `NEXT_PUBLIC_CHECKOUT_URL`  | Link do checkout. Vazio = os botões de compra levam para `#oferta`.                  |
| `NEXT_PUBLIC_META_PIXEL_ID` | ID do Pixel. Vazio = nenhum script de rastreamento e nenhum banner de cookies.        |
| `NEXT_PUBLIC_CONTACT_EMAIL` | E-mail do rodapé e das páginas legais. Vazio = aparece `[E-MAIL]`.                    |
| `NEXT_PUBLIC_BRAND_NAME`    | Nome da marca. Padrão: `Km Certo Moto`.                                              |

## Pendências (placeholders)

- [ ] **Checkout:** `NEXT_PUBLIC_CHECKOUT_URL`. Confira na plataforma se ela usa `src` ou `sck` e ajuste o mapa em `src/lib/checkout.ts` (`forwardedParams`).
- [ ] **Meta Pixel:** `NEXT_PUBLIC_META_PIXEL_ID`.
- [ ] **E-mail de contato:** `NEXT_PUBLIC_CONTACT_EMAIL`.
- [ ] **URL do site:** `NEXT_PUBLIC_SITE_URL` (sem ela, canonical e sitemap apontam para `localhost`).
- [ ] **Mascote:** salvar a ilustração em `public/mascot.webp` e ajustar `WIDTH`/`HEIGHT` em `src/components/Mascot.tsx`. Enquanto o arquivo não existir, aparece a caixa tracejada "PERSONAGEM DA MARCA". O alt descreve uma ilustração: não atribua credenciais nem identidade real ao personagem.
- [ ] **Capa do guia:** hoje é um card desenhado em código (`Hero.tsx`). Se houver uma imagem da capa, troque por `<img>` em webp/avif com `width`, `height` e `fetchPriority="high"`.
- [ ] **Imagem de compartilhamento:** `public/og.png` é um **placeholder** gerado (1200×630, só formas). Substitua pela arte final no mesmo tamanho.
- [ ] **Intervalos do calendário:** `calendarRows` em `src/content/page.ts` está com `[X km]`. Os valores de "Quem faz" também são ilustrativos.
- [ ] **Planilha de bônus:** os valores `[0.000]` e `[R$ 0,00]` na prévia.
- [ ] **Páginas legais:** `/privacidade` e `/termos` têm `[RAZÃO SOCIAL]`, `[CNPJ]`, `[ENDEREÇO]`, `[NOME DA PLATAFORMA]`, `[PRAZO]`, `[CIDADE/UF]` e `[DATA]`. **O texto é um modelo e precisa de revisão jurídica antes de publicar.**

## Como editar os textos

Todo o texto da página de vendas está em **`src/content/page.ts`**, separado por seção (`hero`, `problem`,
`plan`, `calendar`, `calendarRows`, `bonus`, `audience`, `offer`, `faq`, `safety`, `sticky`, `consent`, `seo`).
Edite as strings e gere o build. Os componentes em `src/components/` só cuidam do layout.

O preço aparece em `hero.micro`, `offer.price`, `sticky.price`, `seo.description` e `seo.price`
(este último alimenta o JSON-LD e o valor dos eventos do Pixel). Atualize todos juntos, e também `/termos`.

Regras de conteúdo que a página segue (mantenha ao editar):

- Nada de depoimentos, números de vendas, contadores, "últimas vagas", selos ou avaliações inventados.
- Nada de promessa de ganho ou renda.
- O aviso de segurança fica sempre no rodapé (`safety`).

## Rastreamento e LGPD

- O Pixel só carrega depois do clique em **Aceitar**. A escolha fica em `localStorage` (`kmcerto:consent`).
- Eventos: `PageView` e `ViewContent` ao carregar (com consentimento); `InitiateCheckout` no clique dos botões de checkout.
- Os botões de checkout repassam `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `src` e `sck` da URL da página. Os parâmetros ficam guardados na sessão, então não se perdem se a pessoa abrir `/privacidade` e voltar.

## Deploy

O build gera arquivos estáticos em `out/`. Configure as variáveis de ambiente **no painel da hospedagem** antes do build.

**Vercel:** importe o repositório. Framework: Next.js. Build: `npm run build`. Adicione as variáveis em Settings → Environment Variables.

**Cloudflare Pages:** build command `npm run build`, output directory `out`, variável `NODE_VERSION=20` (ou superior), mais as variáveis acima.

## Checklist pré-publicação

- [ ] Todas as variáveis preenchidas no ambiente de produção
- [ ] Clique no botão da oferta abre o checkout certo, com UTMs (teste com `?utm_source=teste`)
- [ ] Pixel: banner aparece; com "Recusar" nenhum request para `facebook.net`; com "Aceitar" o Meta Pixel Helper vê PageView, ViewContent e InitiateCheckout
- [ ] Preço igual na página, no checkout e em `/termos`
- [ ] `public/og.png` final e `public/mascot.webp` no lugar
- [ ] Intervalos reais do calendário revisados
- [ ] Páginas legais revisadas por advogado(a)
- [ ] Prazo de garantia (7 dias) igual ao configurado na plataforma
- [ ] Lighthouse mobile e teste em celular real, sob sol, em 4G
- [ ] Compartilhar o link no WhatsApp e conferir a prévia (Open Graph)

## Estrutura

```
src/
  app/            layout, página, privacidade, termos, 404, robots, sitemap, ícone
  components/     Hero, Odometer, Journey, JourneySection, KmChip, seções, StickyCta,
                  Mascot, CookieConsent, CheckoutLink, LegalPage, icons (todos de servidor)
  enhance/        o único JS do navegador (compilado para public/enhance.js)
  content/page.ts todo o texto da página
  lib/            checkout (URL + UTMs), tracking (consentimento + Pixel), env
scripts/          strip-next-runtime.mjs (pós-build)
public/           og.png (placeholder), mascot.webp (pendente)
```
