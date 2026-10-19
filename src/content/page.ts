/**
 * Todo o texto da página de vendas mora aqui.
 * Edite os textos à vontade; a estrutura (chaves) é usada pelos componentes.
 *
 * Valores entre [colchetes] são PLACEHOLDERS pendentes (ver README).
 */

export type Who = "voce" | "mecanico";

export const hero = {
  formatChip: "GUIA PDF",
  title: {
    before: "Saiba exatamente ",
    highlight: "quando revisar",
    after: " cada peça da sua moto.",
  },
  subtitle: "Calendário de manutenção por quilometragem, feito para quem trabalha de moto.",
  hook: "Óleo, corrente, freio, pneu: o guia mostra o que checar, de quantos em quantos km e quanto costuma custar. Você para de chutar e chega à oficina sabendo o que pedir.",
  cta: "Quero o Plano Km Certo",
  micro: "PDF + PLANILHA DE BÔNUS · R$ 37,90 · PAGAMENTO ÚNICO",
  odometer: {
    value: "00000",
    unit: "KM",
    label: "Ponto de partida da sua manutenção",
  },
  cover: {
    kicker: "CAPA DO GUIA",
    title: "Plano Km Certo",
    subtitle: "Manutenção da moto de trabalho",
  },
};

export const problem = {
  chip: { km: 1000, label: "O PROBLEMA" },
  title: "Moto parada é dia sem corrida",
  items: [
    {
      n: "01",
      title: "A moto falha no meio da corrida",
      text: "Corrente, freio ou bateria que ninguém lembrou de checar.",
    },
    {
      n: "02",
      title: "Troca cedo demais ou tarde demais",
      text: "Sem um calendário por km, o jeito é chutar quando trocar cada peça.",
    },
    {
      n: "03",
      title: "Dúvida diante do orçamento da oficina",
      text: "Sem saber o que é necessário, fica difícil avaliar o que está sendo cobrado.",
    },
  ],
  bridge:
    "Nada disso exige virar mecânico. Exige saber o que vem pela frente, quilômetro a quilômetro.",
  bridgeLink: "Ver o que tem no guia",
};

export const plan = {
  chip: { km: 5000, label: "O PLANO" },
  title: "Plano Km Certo",
  text: "Um guia em PDF que organiza a manutenção da moto de trabalho por quilometragem, em linguagem simples e com checklists prontos. Pensado para uso pesado: muitos km por dia, chuva e anda-e-para.",
  items: [
    "Calendário de manutenção por km: óleo, filtro, corrente, freio, pneu, vela e bateria.",
    "Checklist de 2 minutos para fazer antes de sair.",
    "Tabela de serviços com faixas de preço de referência.",
    "Sinais de alerta: barulhos, luz no painel e falha de partida, e quando procurar um mecânico.",
    "Pontos de atenção dos modelos mais usados no trabalho.",
  ],
  cta: "Quero o guia completo",
};

export const calendar = {
  chip: { km: 10000, label: "PRÉVIA" },
  title: "Como o calendário funciona",
  intro:
    "Cada item tem um intervalo em km e diz se é algo que você mesmo confere ou se é serviço de oficina.",
  columns: { item: "Item", every: "A cada", who: "Quem faz" },
  whoLabels: { voce: "Você", mecanico: "Mecânico" } satisfies Record<Who, string>,
  note: "Layout ilustrativo. Os intervalos reais, por modelo, estão no guia e sempre devem ser conferidos no manual da sua moto.",
  cta: "Ver o calendário completo",
};

/** Linhas da prévia. Troque "[X km]" pelos intervalos reais quando estiverem definidos. */
export const calendarRows: { item: string; every: string; who: Who }[] = [
  { item: "Óleo do motor", every: "[X km]", who: "voce" },
  { item: "Corrente e relação", every: "[X km]", who: "voce" },
  { item: "Pastilhas de freio", every: "[X km]", who: "mecanico" },
  { item: "Pneus", every: "[X km]", who: "mecanico" },
  { item: "Vela de ignição", every: "[X km]", who: "mecanico" },
];

export const bonus = {
  chip: { label: "BÔNUS INCLUSO" },
  title: "Planilha de km e gastos",
  text: "Anote os km rodados e o que você gastou em manutenção para ver quanto cada km custa na sua moto.",
  cards: [
    { label: "KM NO MÊS", value: "[0.000]" },
    { label: "CUSTO POR KM", value: "[R$ 0,00]" },
  ],
  caption: "Exemplo dos campos da planilha. Os números são seus.",
};

export const audience = {
  chip: { label: "PARA QUEM É" },
  title: "Antes de comprar, confira",
  yes: {
    title: "É PARA VOCÊ SE",
    items: [
      "Trabalha de moto e quer saber quando revisar cada peça.",
      "Quer organizar a manutenção e os gastos.",
      "Quer chegar à oficina sabendo o que perguntar.",
    ],
  },
  no: {
    title: "NÃO É PARA VOCÊ SE",
    items: [
      "Procura um curso de mecânica para abrir oficina.",
      "Quer trocar o manual do fabricante por um guia.",
    ],
  },
};

export const offer = {
  chip: { label: "DESTINO · A OFERTA" },
  title: "Plano Km Certo",
  lead: "Um pagamento. Serve para cada revisão daqui em diante.",
  price: "R$ 37,90",
  priceNote: "pagamento único",
  items: [
    "Guia em PDF com calendário por km",
    "Checklist de 2 minutos",
    "Tabela de serviços e faixas de preço",
    "Bônus: planilha de km e gastos",
  ],
  cta: "Quero o Plano Km Certo",
  footer:
    "Garantia de 7 dias. Se não gostar, peça o reembolso. Pagamento seguro pela plataforma de checkout.",
};

export const faq = {
  title: "Perguntas frequentes",
  items: [
    {
      q: "Serve para qualquer moto?",
      a: "O guia traz a base para as motos mais usadas no trabalho e orienta a conferir o manual da sua moto.",
    },
    { q: "É um curso?", a: "Não. É um guia em PDF, com checklists e uma planilha de bônus." },
    {
      q: "Como recebo o material?",
      a: "Pelo e-mail informado na compra, depois da confirmação do pagamento.",
    },
    { q: "E se eu não gostar?", a: "Você tem 7 dias para pedir o reembolso." },
  ],
};

export const safety = {
  title: "Aviso de segurança",
  text: "Conteúdo educativo. Não substitui o manual do fabricante nem um mecânico qualificado. Freios, pneus e direção afetam a sua segurança.",
};

export const sticky = {
  label: "Plano Km Certo",
  price: "R$ 37,90",
  cta: "Quero o plano",
};

export const consent = {
  text: "Usamos cookies de medição (Meta Pixel) só se você aceitar.",
  more: "Saiba mais",
  accept: "Aceitar",
  decline: "Recusar",
};

export const footer = {
  contactLabel: "Contato",
  privacy: "Política de privacidade",
  terms: "Termos de uso",
};

export const seo = {
  title: "Plano Km Certo: calendário de manutenção para moto de trabalho | Km Certo Moto",
  description:
    "Calendário de manutenção por km para moto de trabalho: checklist de 2 minutos, faixas de preço e sinais de alerta. Guia em PDF por R$ 37,90.",
  productName: "Plano Km Certo",
  productDescription:
    "Guia em PDF de manutenção preventiva para moto de trabalho, com calendário por quilometragem, checklist de 2 minutos, tabela de serviços com faixas de preço e planilha de km e gastos de bônus.",
  price: "37.90",
  currency: "BRL",
};
