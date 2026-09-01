import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ArrowLink";
import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/lib/projects";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Nuestro trabajo", en: "Our work" },
  lede: {
    es: "Proyectos publicados, acompañados de la historia detrás de cada uno y cómo logramos resolver sus principales desafíos.",
    en: "Published projects, accompanied by the story behind each one and how we managed to solve their main challenges.",
  },
  ctaTitle: { es: "¿Y si el siguiente caso fuera el ", en: "What if the next case were " },
  ctaTitleAccent: { es: "tuyo", en: "yours" },
  ctaTitleTail: { es: "?", en: "?" },
  ctaLede: {
    es: "Cuéntanos qué necesita resolver tu negocio y te devolvemos una propuesta con alcance, tiempos y precio.",
    en: "Tell us what your business needs to solve and we will come back with scope, timeline and price.",
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

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <header>
        <h1 className="font-wide max-w-[26ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.title[l]}
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-14 grid gap-8 sm:mt-20 sm:grid-cols-2 md:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.slug}
            slug={project.slug}
            locale={l}
            className="w-full min-w-0"
          />
        ))}
      </div>

      <section className="py-24 text-center">
        <h2 className="font-wide mx-auto max-w-[20ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.ctaTitle[l]}
          <span className="text-red">{copy.ctaTitleAccent[l]}</span>
          {copy.ctaTitleTail[l]}
        </h2>
        <p className="measure mx-auto mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.ctaLede[l]}
        </p>
        <div className="mt-10 flex justify-center">
          <ArrowLink
            href={`/${l}/contacto`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
          >
            {l === "es" ? "Solicitar una cotización" : "Request a quote"}
          </ArrowLink>
        </div>
      </section>
    </div>
  );
}
