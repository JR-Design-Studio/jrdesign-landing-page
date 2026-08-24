import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectIndex } from "@/components/ProjectIndex";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/Reveal";
import { faqs, howWeWork, services, testimonials } from "@/lib/content";
import { getProject, projects } from "@/lib/projects";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    alternates: {
      canonical: `/${l}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
  };
}

const copy = {
  hero: {
    es: "Sitios web para negocios que ya funcionan",
    en: "Websites for businesses that already work",
  },
  heroLede: {
    es: "Somos dos personas en Guadalajara. Desde 2018 diseñamos y programamos a mano sitios, tiendas en línea e integraciones con el sistema que la empresa ya usa. Nada de plantillas ni page builders.",
    en: "We are two people in Guadalajara. Since 2018 we have hand-built websites, online stores and integrations with the systems companies already run. No templates, no page builders.",
  },
  stats: {
    es: [
      { k: "2018", v: "Año en que empezamos" },
      { k: "9", v: "Casos documentados" },
      { k: "MX · EE.UU.", v: "Dónde están los clientes" },
    ],
    en: [
      { k: "2018", v: "The year we started" },
      { k: "9", v: "Documented cases" },
      { k: "MX · US", v: "Where our clients are" },
    ],
  },
  featuredLabel: { es: "Caso destacado", en: "Featured case" },
  workTitle: {
    es: "El trabajo, con el razonamiento incluido",
    en: "The work, reasoning included",
  },
  workLede: {
    es: "Nueve proyectos con su contexto, su reto y la decisión que cambió el resultado.",
    en: "Nine projects with their context, their challenge and the decision that changed the outcome.",
  },
  servicesTitle: { es: "Qué hacemos", en: "What we do" },
  processTitle: { es: "Cómo trabajamos", en: "How we work" },
  processLede: {
    es: "Cinco pasos, los mismos en cada proyecto. Sabes en cuál vas y qué sigue.",
    en: "Five steps, the same on every project. You always know where you are and what comes next.",
  },
  voicesTitle: { es: "Lo que dicen quienes ya trabajaron con nosotros", en: "What our clients say" },
  faqTitle: { es: "Preguntas que siempre nos hacen", en: "Questions we always get" },
  ctaTitle: {
    es: "Cuéntanos qué necesita resolver tu negocio",
    en: "Tell us what your business needs to solve",
  },
  ctaLede: {
    es: "Escríbenos por WhatsApp o llena el formulario. Contestamos dentro de un día hábil y la primera llamada es para entender, no para vender.",
    en: "Message us on WhatsApp or fill in the form. We reply within one business day, and the first call is to understand, not to sell.",
  },
};

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const featured = getProject("disolab")!;
  const shortlist = projects.filter((p) => p.featured);
  const preview = Object.fromEntries(
    shortlist.map((p) => [
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
    <>
      {/* Hero */}
      <section className="mx-auto max-w-[86rem] px-5 pb-16 pt-16 sm:px-8 sm:pb-24 sm:pt-24">
        <h1 className="font-wide max-w-5xl text-display font-semibold">
          {copy.hero[l]}
          <span className="ml-2 inline-block size-[0.14em] translate-y-[-0.06em] rounded-full bg-red align-middle" />
        </h1>
        <p className="mt-8 max-w-2xl font-serif text-xl leading-[1.6] text-ink-soft sm:text-2xl">
          {copy.heroLede[l]}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link
            href={`/${l}/portafolio`}
            className="tracking-label bg-ink px-7 py-4 text-[0.7rem] text-white transition-colors hover:bg-red"
          >
            {ui.allCases[l]}
          </Link>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="tracking-label border border-ink/25 px-7 py-4 text-[0.7rem] transition-colors hover:border-ink"
          >
            {ui.whatsapp[l]}
          </a>
        </div>

        <dl className="mt-16 grid gap-6 border-t border-ink/12 pt-6 sm:grid-cols-3">
          {copy.stats[l].map((s) => (
            <div key={s.k}>
              <dt className="font-wide num text-2xl font-medium">{s.k}</dt>
              <dd className="tracking-label mt-1 text-[0.62rem] text-muted">{s.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Caso destacado: Disolab */}
      <Reveal as="section" className="bg-white">
        <div className="mx-auto grid max-w-[86rem] gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <p className="tracking-label text-[0.62rem] text-red">
              {copy.featuredLabel[l]}
            </p>
            <h2 className="font-wide mt-5 text-title font-semibold">
              {featured.name}
            </h2>
            <p className="mt-5 max-w-xl font-serif text-lg leading-[1.65] text-ink-soft sm:text-xl">
              {featured.lede[l]}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-soft">
              {featured.summary[l]}
            </p>
            <Link
              href={`/${l}/portafolio/${featured.slug}`}
              className="tracking-label group mt-8 inline-flex items-center gap-3 text-[0.7rem]"
            >
              {ui.viewCase[l]}
              <span className="size-1.5 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
          <ProjectVisual
            project={featured}
            locale={l}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="aspect-[4/3] w-full"
          />
        </div>
      </Reveal>

      {/* Índice de casos */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <header className="max-w-3xl">
          <h2 className="font-wide text-title font-semibold">{copy.workTitle[l]}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft">
            {copy.workLede[l]}
          </p>
        </header>
        <div className="mt-12">
          <ProjectIndex projects={shortlist} locale={l} preview={preview} />
        </div>
        <Link
          href={`/${l}/portafolio`}
          className="tracking-label group mt-10 inline-flex items-center gap-3 text-[0.7rem]"
        >
          {ui.allCases[l]}
          <span className="size-1.5 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </section>

      {/* Servicios */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <h2 className="font-wide text-title font-semibold">
            {copy.servicesTitle[l]}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 90}>
                <article className="border-t border-ink/15 pt-6">
                  <span className="num tracking-label text-[0.62rem] text-red">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-wide mt-3 text-2xl font-medium">
                    {s.title[l]}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">
                    {s.body[l]}
                  </p>
                  <ul className="mt-5 space-y-2">
                    {s.bullets.map((b) => (
                      <li
                        key={b.es}
                        className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-red" />
                        {b[l]}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
          <Link
            href={`/${l}/servicios`}
            className="tracking-label group mt-12 inline-flex items-center gap-3 text-[0.7rem]"
          >
            {l === "es" ? "Ver servicios a detalle" : "See services in detail"}
            <span className="size-1.5 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </section>

      {/* Proceso */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <header className="max-w-3xl">
          <h2 className="font-wide text-title font-semibold">
            {copy.processTitle[l]}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            {copy.processLede[l]}
          </p>
        </header>
        <ol className="mt-12 grid gap-px bg-ink/12 sm:grid-cols-2 lg:grid-cols-5">
          {howWeWork.map((phase) => (
            <li key={phase.n} className="bg-paper p-6">
              <span className="num tracking-label text-[0.62rem] text-red">
                {phase.n}
              </span>
              <h3 className="font-wide mt-3 text-lg font-medium">
                {phase.title[l]}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {phase.body[l]}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonios */}
      <section className="bg-ink py-16 text-paper sm:py-24">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <h2 className="font-wide max-w-2xl text-title font-semibold">
            {copy.voicesTitle[l]}
          </h2>
          <ul className="mt-12 grid gap-px bg-paper/15 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <li key={t.name} className="bg-ink p-7">
                <p className="font-serif text-lg leading-[1.6] text-paper/90">
                  <span className="text-red">“</span>
                  {t.quote[l]}
                  <span className="text-red">”</span>
                </p>
                <p className="tracking-label mt-6 text-[0.62rem] text-paper/75">
                  {t.name} · {t.role[l]}, {t.company}
                </p>
                {t.project && (
                  <Link
                    href={`/${l}/portafolio/${t.project}`}
                    className="tracking-label mt-3 inline-block text-[0.62rem] text-paper/85 underline underline-offset-4 transition-colors hover:text-white"
                  >
                    {ui.viewCase[l]}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-wide text-title font-semibold">{copy.faqTitle[l]}</h2>
        <div className="mt-10 max-w-3xl border-t border-ink/12">
          {faqs.map((f) => (
            <details key={f.q.es} className="group border-b border-ink/12">
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5 text-lg font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q[l]}
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-red transition-transform duration-300 group-open:scale-[2.2]" />
              </summary>
              <p className="max-w-2xl pb-6 font-serif text-base leading-[1.7] text-ink-soft">
                {f.a[l]}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Cierre */}
      <section className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <div className="border-t border-ink/12 py-16 sm:py-24">
          <h2 className="font-wide max-w-3xl text-title font-semibold">
            {copy.ctaTitle[l]}
          </h2>
          <p className="mt-5 max-w-2xl font-serif text-lg leading-[1.65] text-ink-soft sm:text-xl">
            {copy.ctaLede[l]}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href={`/${l}/contacto`}
              className="tracking-label bg-ink px-7 py-4 text-[0.7rem] text-white transition-colors hover:bg-red"
            >
              {ui.cta[l]}
            </Link>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="tracking-label border border-ink/25 px-7 py-4 text-[0.7rem] transition-colors hover:border-ink"
            >
              {site.whatsapp}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
