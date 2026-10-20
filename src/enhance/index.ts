/**
 * Único JavaScript da página (o HTML já chega completo do build).
 * Compilado com esbuild para public/enhance.js (npm run build:enhance).
 *
 * Cuida de: trilho que se preenche no scroll, contagem dos chips de km, links de checkout
 * com UTMs, barra fixa no mobile, banner de cookies e Meta Pixel (só com consentimento).
 *
 * Configuração vem de data-attributes no <body> (ver src/app/layout.tsx).
 */
import { buildCheckoutUrl, readParams } from "../lib/checkout";
import {
  getConsent,
  loadPixel,
  saveConsent,
  trackInitiateCheckout,
  type ConsentChoice,
} from "../lib/tracking";

const cfg = document.body.dataset;
const checkoutBase = cfg.checkout ?? "";
const pixelId = cfg.pixel ?? "";
const price = Number(cfg.price) || 0;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Trilho (spine) ---------- */
function initJourney() {
  const el = document.querySelector<HTMLElement>("[data-journey]");
  if (!el) return;
  const markers = Array.from(el.querySelectorAll<HTMLElement>("[data-marker]"));
  let frame = 0;

  const update = () => {
    frame = 0;
    if (!markers.length) return;
    // Todas as leituras de layout primeiro, depois as escritas: evita reflow forçado.
    const rootTop = el.getBoundingClientRect().top;
    const height = el.offsetHeight;
    const centers = markers.map(
      (m) => m.getBoundingClientRect().top - rootTop + m.offsetHeight / 2,
    );
    const length = centers[centers.length - 1];
    const reduced = reducedMotion.matches;
    const filled = reduced
      ? length
      : Math.min(Math.max(window.innerHeight * 0.6 - rootTop, 0), length);

    el.style.setProperty("--spine-end", `${Math.max(0, height - length)}px`);
    el.style.setProperty("--spine-progress", length ? String(filled / length) : "0");
    markers.forEach((m, i) => (m.dataset.reached = String(centers[i] <= filled + 1)));
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  schedule();
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  reducedMotion.addEventListener("change", schedule);
  new ResizeObserver(schedule).observe(el);
}

/* ---------- Chips "KM 1.000": contam de 0 até o valor ao entrar na tela ---------- */
function initKmChips() {
  if (reducedMotion.matches) return; // estado final já está no HTML
  const fmt = new Intl.NumberFormat("pt-BR");
  const DURATION = 600;

  // Nenhuma leitura de layout na carga: a posição inicial vem do 1º callback do observer,
  // que chega depois do layout normal do navegador (sem reflow forçado).
  const seen = new WeakSet<Element>();

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement;
        const target = Number(node.dataset.km);
        if (!seen.has(node)) {
          seen.add(node);
          // Abaixo da dobra: zera (fora da vista) e espera chegar. Visível ou acima: fica pronto.
          if (
            !entry.isIntersecting &&
            entry.boundingClientRect.top >= (entry.rootBounds?.bottom ?? innerHeight)
          ) {
            node.textContent = "0";
          } else {
            io.unobserve(node);
          }
          continue;
        }
        if (!entry.isIntersecting) {
          // Pulou por cima (âncora, scroll rápido): mostra o valor final, sem animar.
          if (entry.boundingClientRect.top < 0) {
            io.unobserve(node);
            node.textContent = fmt.format(target);
          }
          continue;
        }
        io.unobserve(node);
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / DURATION, 1);
          const eased = 1 - Math.pow(1 - t, 4); // ease-out exponencial
          node.textContent = fmt.format(Math.round(target * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.6 },
  );

  document.querySelectorAll("[data-km]").forEach((node) => io.observe(node));
}

/* ---------- Links de checkout ---------- */
function initCheckoutLinks() {
  const url = buildCheckoutUrl(checkoutBase, readParams(window.location.search));
  for (const a of document.querySelectorAll<HTMLAnchorElement>("a[data-checkout]")) {
    if (url) a.href = url;
    a.addEventListener("click", () => trackInitiateCheckout(price));
  }
}

/* ---------- Barra fixa (mobile): aparece depois do hero, some na oferta ---------- */
function initStickyCta() {
  const bar = document.querySelector<HTMLElement>("[data-sticky]");
  const hero = document.getElementById("hero");
  const offer = document.getElementById("oferta");
  if (!bar || !hero || !offer) return;

  let heroGone = false;
  let inOffer = false;
  const render = () => {
    const visible = heroGone && !inOffer;
    bar.dataset.visible = String(visible);
    bar.inert = !visible;
  };
  // O hero conta como "fora da tela" quando sobram menos de 80px dele no topo.
  new IntersectionObserver(
    ([e]) => {
      heroGone = !e.isIntersecting;
      render();
    },
    { rootMargin: "-80px 0px 0px 0px" },
  ).observe(hero);
  new IntersectionObserver(([e]) => {
    inOffer = e.isIntersecting;
    render();
  }).observe(offer);
}

/* ---------- Consentimento + Pixel ---------- */
function initConsent() {
  if (!pixelId) return; // sem Pixel configurado, nenhum script e nenhum banner
  const choice = getConsent();
  if (choice === "granted") {
    loadPixel(pixelId, price);
    return;
  }
  if (choice === "denied") return;

  const banner = document.querySelector<HTMLElement>("[data-consent-banner]");
  if (!banner) return;
  banner.hidden = false;
  banner.addEventListener("click", (e) => {
    const button = (e.target as HTMLElement).closest<HTMLButtonElement>("button[data-consent]");
    if (!button) return;
    const value = button.dataset.consent as ConsentChoice;
    saveConsent(value);
    banner.hidden = true;
    if (value === "granted") loadPixel(pixelId, price);
  });
}

// Chips primeiro: só lê layout. O trilho roda no próximo frame (requestAnimationFrame).
initKmChips();
initJourney();
initCheckoutLinks();
initStickyCta();
initConsent();
