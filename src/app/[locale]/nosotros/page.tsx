import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { howWeWork } from "@/lib/content";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Somos dos, y eso es a propósito", en: "There are two of us, on purpose" },
  intro: {
    es: "JR Design es un estudio de dos personas en Guadalajara. Desde 2018 trabajamos en remoto con clientes de educación, salud, legal, retail, industria, interiorismo y construcción. Quien te contesta el correo es quien diseña y programa tu sitio.",
    en: "JR Design is a two-person studio in Guadalajara, Mexico. Since 2018 we have worked remotely with clients in education, health, legal, retail, industry, interiors and construction. Whoever answers your email is the person designing and building your site.",
  },
  beliefsTitle: { es: "Cómo pensamos el trabajo", en: "How we think about the work" },
  beliefs: {
    es: [
      {
        t: "Primero el negocio, luego el diseño",
        d: "Antes de abrir Figma preguntamos cómo vendes y qué te preguntan tus clientes. Un sitio bonito que no explica el negocio no sirve de nada.",
      },
      {
        t: "Escribimos código, no arrastramos bloques",
        d: "Nada de page builders. Eso mantiene el sitio rápido, editable y sin veinte plugins que actualizar cada mes.",
      },
      {
        t: "Aprovechamos lo que ya tienes",
        d: "Si tu operación vive en un ERP, conectamos la web a eso en lugar de pedirte capturar todo otra vez.",
      },
      {
        t: "Decimos que no cuando toca",
        d: "Si algo no te conviene lo decimos, aunque implique un proyecto más chico. Es la razón por la que la mayoría de nuestros clientes llegan recomendados.",
      },
    ],
    en: [
      {
        t: "Business first, design second",
        d: "Before opening Figma we ask how you sell and what your clients always ask. A good-looking site that fails to explain the business is worth nothing.",
      },
      {
        t: "We write code, we do not drag blocks",
        d: "No page builders. That keeps the site fast, editable, and free of twenty plugins to update every month.",
      },
      {
        t: "We build on what you already have",
        d: "If your operation lives in an ERP, we connect the site to it instead of asking you to re-enter everything.",
      },
      {
        t: "We say no when it matters",
        d: "If something is not in your interest we say so, even when it means a smaller project. It is why most of our clients arrive by referral.",
      },
    ],
  },
  processTitle: { es: "El proceso, sin sorpresas", en: "The process, no surprises" },
  factsTitle: { es: "Datos duros", en: "The basics" },
  ctaTitle: { es: "¿Empezamos?", en: "Shall we start?" },
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    title: l === "es" ? "Nosotros" : "About",
    description:
      l === "es"
        ? "Estudio de dos personas en Guadalajara. Cómo trabajamos, en qué creemos y con quién hemos trabajado desde 2018."
        : "A two-person studio in Guadalajara, Mexico. How we work, what we believe and who we have worked with since 2018.",
    alternates: {
      canonical: `/${l}/nosotros`,
      languages: {
        es: "/es/nosotros",
        en: "/en/nosotros",
        "x-default": "/es/nosotros",
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const facts = [
    { k: l === "es" ? "Desde" : "Since", v: String(site.since) },
    { k: l === "es" ? "Base" : "Based in", v: site.city[l] },
    { k: l === "es" ? "Equipo" : "Team", v: l === "es" ? "Dos personas" : "Two people" },
    {
      k: l === "es" ? "Sectores" : "Sectors",
      v:
        l === "es"
          ? "Educación, salud, legal, retail, industria, interiorismo, construcción"
          : "Education, health, legal, retail, industry, interiors, construction",
    },
  ];

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <header className="max-w-3xl">
        <h1 className="font-wide text-title font-semibold">{copy.title[l]}</h1>
        <p className="mt-6 font-serif text-xl leading-[1.6] text-ink-soft sm:text-2xl">
          {copy.intro[l]}
        </p>
      </header>

      <section className="mt-20">
        <h2 className="tracking-label text-[0.62rem] text-muted">
          {copy.beliefsTitle[l]}
        </h2>
        <div className="mt-8 grid gap-px bg-ink/12 sm:grid-cols-2">
          {copy.beliefs[l].map((b, i) => (
            <article key={b.t} className="bg-paper py-8 pr-8 sm:px-8">
              <span className="num tracking-label text-[0.62rem] text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-wide mt-3 text-xl font-medium">{b.t}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                {b.d}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-wide text-title font-semibold">
          {copy.processTitle[l]}
        </h2>
        <ol className="mt-10 max-w-3xl border-t border-ink/12">
          {howWeWork.map((phase) => (
            <li
              key={phase.n}
              className="grid gap-2 border-b border-ink/12 py-6 sm:grid-cols-[4rem_1fr] sm:gap-6"
            >
              <span className="num tracking-label text-[0.62rem] text-red sm:pt-1.5">
                {phase.n}
              </span>
              <div>
                <h3 className="font-wide text-lg font-medium">{phase.title[l]}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {phase.body[l]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="tracking-label text-[0.62rem] text-muted">
          {copy.factsTitle[l]}
        </h2>
        <dl className="mt-6 grid gap-6 border-t border-ink/12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k}>
              <dt className="tracking-label text-[0.62rem] text-muted">{f.k}</dt>
              <dd className="mt-1.5 text-sm">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20 border-t border-ink/12 pt-14">
        <h2 className="font-wide text-title font-semibold">{copy.ctaTitle[l]}</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href={`/${l}/contacto`}
            className="tracking-label bg-ink px-7 py-4 text-[0.7rem] text-white transition-colors hover:bg-red"
          >
            {ui.cta[l]}
          </Link>
          <Link
            href={`/${l}/portafolio`}
            className="tracking-label border border-ink/25 px-7 py-4 text-[0.7rem] transition-colors hover:border-ink"
          >
            {ui.allCases[l]}
          </Link>
        </div>
      </section>
    </div>
  );
}
