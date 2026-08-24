import type { MetadataRoute } from "next";
import { locales, site } from "@/lib/i18n";
import { projects } from "@/lib/projects";

const staticPaths = ["", "/portafolio", "/servicios", "/nosotros", "/contacto"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  const alternates = (path: string) => ({
    languages: Object.fromEntries(
      locales.map((l) => [l, `${site.url}/${l}${path}`]),
    ),
  });

  for (const locale of locales) {
    for (const path of staticPaths) {
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: path === "" ? "monthly" : "yearly",
        priority: path === "" ? 1 : 0.7,
        alternates: alternates(path),
      });
    }
    for (const project of projects) {
      const path = `/portafolio/${project.slug}`;
      entries.push({
        url: `${site.url}/${locale}${path}`,
        changeFrequency: "yearly",
        priority: 0.8,
        alternates: alternates(path),
      });
    }
  }

  return entries;
}
