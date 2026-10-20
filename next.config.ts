import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: gera /out para Vercel, Cloudflare Pages ou qualquer hospedagem de arquivos.
  // Depois do build, scripts/strip-next-runtime.mjs tira o runtime do React/Next do HTML:
  // a página não precisa de hidratação, o único JS é public/enhance.js.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
  experimental: {
    // CSS no <head>: elimina a requisição que bloqueia a renderização.
    // Bom para tráfego de anúncio (quase todo mundo é visitante novo).
    inlineCss: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
