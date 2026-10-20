/**
 * Pós-build: tira o runtime do React/Next do HTML exportado.
 *
 * A página é 100% estática (todo componente é de servidor) e o único comportamento no navegador
 * vem de public/enhance.js. Sem isso, o Next mandaria ~140 KB (gzip) de JS só para hidratar HTML
 * que nunca muda. Remove: scripts de /_next/static/chunks, preloads desses scripts e o payload
 * RSC inline (self.__next_f). Mantém JSON-LD e /enhance.js.
 *
 * Falha o build se sobrar qualquer referência a JS do Next.
 */
import { readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const OUT = path.resolve("out");

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => (e.isDirectory() ? walk(path.join(dir, e.name)) : path.join(dir, e.name))),
  );
  return files.flat();
}

const patterns = [
  // <script src="/_next/static/chunks/....js" ...></script>
  /<script\b[^>]*\bsrc="\/_next\/static\/[^"]+\.js"[^>]*>\s*<\/script>/g,
  // <link rel="preload" as="script" href="/_next/..."> e modulepreload
  /<link\b[^>]*\bhref="\/_next\/static\/[^"]+\.js"[^>]*\/?>/g,
  // payload RSC inline e scripts de bootstrap do React
  /<script\b(?![^>]*\btype="application\/ld\+json")[^>]*>(?:(?!<\/script>)[\s\S])*?(?:self\.__next_f|__next_s|TURBOPACK|\$RC|\$RS|\$RX)(?:(?!<\/script>)[\s\S])*?<\/script>/g,
];

const files = await walk(OUT);
let stripped = 0;
const leftovers = [];

for (const file of files.filter((f) => f.endsWith(".html"))) {
  let html = await readFile(file, "utf8");
  const before = html.length;
  for (const re of patterns) html = html.replace(re, "");
  if (html.length !== before) stripped++;
  if (/\/_next\/static\/[^"]+\.js|static\/chunks\/[^"]+\.js|self\.__next_f|TURBOPACK/.test(html))
    leftovers.push(path.relative(OUT, file));
  await writeFile(file, html);
}

if (leftovers.length) {
  console.error(`strip-next-runtime: ainda há JS do Next em: ${leftovers.join(", ")}`);
  process.exit(1);
}

// Payloads RSC (.txt) e chunks JS deixam de ser usados: não publica.
let removed = 0;
for (const file of files) {
  const rel = path.relative(OUT, file).split(path.sep).join("/");
  if (rel.endsWith(".txt") && rel !== "robots.txt") {
    await rm(file);
    removed++;
  } else if (rel.startsWith("_next/static/chunks/") && rel.endsWith(".js")) {
    await rm(file);
    removed++;
  }
}

console.log(
  `strip-next-runtime: ${stripped} páginas limpas, ${removed} arquivos sem uso removidos.`,
);
