import type { MetadataRoute } from "next";

import { client } from "@/lib/sanity/client";
import { querySitemapData } from "@/lib/sanity/query";
import { getBaseUrl } from "@/utils";

const baseUrl = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { slugPages } = await client.fetch(querySitemapData);
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...slugPages.map((page) => ({
      url: `${baseUrl}${page.slug}`,
      lastModified: new Date(page.lastModified ?? new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
