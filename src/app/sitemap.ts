import type { MetadataRoute } from "next";
import { env } from "@/lib/env";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${env.siteUrl}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${env.siteUrl}/privacidade`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${env.siteUrl}/termos`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
