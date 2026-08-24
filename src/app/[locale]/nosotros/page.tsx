import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Readout } from "@/components/Readout";
import { howWeWork } from "@/lib/content";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: {
    es: "Somos dos, y eso es a propósito",
    en: "There are two of us, on purpose",
  },
  intro: {
    es: "JR Design es un estudio de dos personas en Guadalajara. Desde 2018 trabajamos en remoto con clientes de educación, salud, legal, retail, industria, interiorismo y construcción. Quien te contesta el correo es quien diseña y programa tu sitio.",
    en: "JR Design is a two-person studio in Guadalajara, Mexico. Since 2018 we have worked remotely with clients in education, health, legal, retail, industry, interiors and construction. Whoever answers your email is the person designing and building your site.",
  },
  beliefsTitle: {
    es: "Cómo pensamos el trabajo",
    en: "How we think about the work",
  },
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
  factsTitle: { es: "Datos del estudio", en: "Studio facts" },
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
    { k: l === "es" ? "Operando desde" : "Running since", v: String(site.since) },
    { k: l === "es" ? "Personas" : "People", v: "2" },
    { k: l === "es" ? "Casos publicados" : "Published cases", v: "9" },
    { k: l === "es" ? "Países" : "Countries", v: "2" },
  ];

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <header>
        <h1 className="font-wide max-w-[18ch] text-title font-semibold">
          {copy.title[l]}
        </h1>
        <p className="measure mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.intro[l]}
        </p>
      </header>

      <dl className="mt-12 grid gap-8 border-y border-ink/18 py-7 sm:grid-cols-4">
        {facts.map((f) => (
          <div key={f.k} className="flex flex-col-reverse">
            <dt className="plate mt-1 text-muted">{f.k}</dt>
            <dd>
              <Readout value={f.v} className="text-2xl font-semibold" />
            </dd>
          </div>
        ))}
      </dl>

      <section className="mt-16">
        <h2 className="font-wide text-title font-semibold">
          {copy.beliefsTitle[l]}
        </h2>
        <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {copy.beliefs[l].map((b, i) => (
            <article key={b.t} className="border-t border-ink/25 pt-5">
              <Readout
                value={String(i + 1).padStart(2, "0")}
                className="text-[0.68rem] text-muted"
              />
              <h3 className="font-wide mt-3 text-xl font-semibold">{b.t}</h3>
              <p className="measure mt-3 text-sm leading-relaxed text-ink-soft">
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
        <ol className="mt-8 max-w-3xl border-t border-ink/18">
          {howWeWork.map((phase, i) => (
            <li
              key={phase.n}
              className="grid gap-2 border-b border-ink/18 py-6 sm:grid-cols-[4.5rem_1fr] sm:gap-6"
            >
              <Readout
                value={phase.n}
                live={i === 0}
                className="text-[0.68rem] text-muted sm:pt-1.5"
              />
              <div>
                <h3 className="font-wide text-lg font-semibold">
                  {phase.title[l]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {phase.body[l]}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 border-t border-ink/18 pt-12">
        <h2 className="font-wide text-title font-semibold">{copy.ctaTitle[l]}</h2>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="plate bg-red px-6 py-4 text-white transition-colors hover:bg-red-deep"
          >
            {ui.whatsapp[l]}
          </a>
          <Link
            href={`/${l}/portafolio`}
            className="plate border border-ink/30 px-6 py-4 transition-colors hover:border-ink hover:bg-white"
          >
            {ui.allCases[l]}
          </Link>
        </div>
      </section>
    </div>
  );
}
