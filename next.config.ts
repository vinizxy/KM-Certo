import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Export estático: gera /out para Vercel, Cloudflare Pages ou qualquer hospedagem de arquivos.
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  poweredByHeader: false,
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
