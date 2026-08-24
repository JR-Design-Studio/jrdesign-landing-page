import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ProjectVisual } from "@/components/ProjectVisual";
import { projects } from "@/lib/projects";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Nueve proyectos, nueve decisiones", en: "Nine projects, nine decisions" },
  lede: {
    es: "Cada caso cuenta cómo se pensó, no solo cómo quedó: el contexto, lo que se investigó, el reto real y la decisión que cambió el resultado.",
    en: "Each case explains how it was thought through, not just how it looks: the context, the research, the real challenge and the decision that changed the outcome.",
  },
  meta: {
    es: "Casos de estudio de JR Design: e-learning, integración con Odoo, e-commerce de lujo, despachos legales e industria.",
    en: "JR Design case studies: e-learning, Odoo integration, luxury e-commerce, legal practices and industrial clients.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    title: l === "es" ? "Portafolio" : "Work",
    description: copy.meta[l],
    alternates: {
      canonical: `/${l}/portafolio`,
      languages: {
        es: "/es/portafolio",
        en: "/en/portafolio",
        "x-default": "/es/portafolio",
      },
    },
  };
}

export default async function PortfolioPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const preview = Object.fromEntries(
    projects.map((p) => [
      p.slug,
      <ProjectVisual
        key={p.slug}
        project={p}
        locale={l}
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="h-full w-full"
      />,
    ]),
  );

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <h1 className="font-wide text-title font-semibold">{copy.title[l]}</h1>
        <p className="mt-5 max-w-2xl font-serif text-lg leading-[1.65] text-ink-soft sm:text-xl">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-14 sm:mt-20">
        <ProjectIndex projects={projects} locale={l} preview={preview} />
      </div>
    </div>
  );
}
