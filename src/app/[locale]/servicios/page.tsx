import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserMock } from "@/components/DeviceMock";
import { ProjectScreen } from "@/components/ProjectScreen";
import { Readout } from "@/components/Readout";
import { faqs, services } from "@/lib/content";
import { projects } from "@/lib/projects";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: {
    es: "Tres formas de trabajar juntos",
    en: "Three ways to work together",
  },
  lede: {
    es: "No vendemos paquetes cerrados. Estas son las tres formas en las que suele empezar un proyecto; cuál aplica se decide en la primera llamada.",
    en: "We do not sell fixed packages. These are the three ways a project usually starts; which one applies gets decided on the first call.",
  },
  forWho: { es: "Para quién", en: "Who for" },
  cases: { es: "Casos", en: "Cases" },
  faq: { es: "Antes de escribirnos", en: "Before you write" },
  ctaTitle: {
    es: "¿Cuál de las tres se parece a lo tuyo?",
    en: "Which one sounds like your case?",
  },
};

/** Un caso real y su pantalla por cada forma de trabajo. */
const evidence: Record<string, { slug: string; url: string }> = {
  sitio: { slug: "legal-laboral-abogados", url: "legallaboral.mx/areas" },
  ecommerce: { slug: "lilitu", url: "lilitu.mx/fragancias" },
  integraciones: { slug: "disolab", url: "disolab.com.mx/catalogo" },
};

const related: Record<string, string[]> = {
  sitio: ["meaningful-interiors", "s-ac-design-build", "legal-laboral-abogados"],
  ecommerce: ["lilitu", "cm-naturals"],
  integraciones: ["disolab", "arqademy"],
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    title: l === "es" ? "Servicios" : "Services",
    description:
      l === "es"
        ? "Sitios web a la medida, tiendas en línea e integraciones con ERP. Diseño y desarrollo hechos a mano desde Guadalajara."
        : "Custom websites, online stores and ERP integrations. Hand-built design and development from Guadalajara, Mexico.",
    alternates: {
      canonical: `/${l}/servicios`,
      languages: {
        es: "/es/servicios",
        en: "/en/servicios",
        "x-default": "/es/servicios",
      },
    },
  };
}

export default async function ServicesPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q[l],
      acceptedAnswer: { "@type": "Answer", text: f.a[l] },
    })),
  };

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <header>
        <h1 className="font-wide max-w-[16ch] text-title font-semibold">
          {copy.title[l]}
        </h1>
        <p className="measure mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-14 space-y-16 sm:mt-20 sm:space-y-24">
        {services.map((s, i) => {
          const ev = evidence[s.id];
          return (
            <section key={s.id} id={s.id} className="scroll-mt-24">
              <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
                <div>
                  <Readout
                    value={i + 1}
                    cells={2}
                    className="text-[0.7rem] text-muted"
                  />
                  <h2 className="font-wide mt-3 text-2xl font-semibold sm:text-3xl">
                    {s.title[l]}
                  </h2>
                  <p className="measure mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
                    {s.body[l]}
                  </p>

                  <ul className="mt-7 space-y-2.5 border-t border-ink/18 pt-6">
                    {s.bullets.map((b) => (
                      <li key={b.es} className="flex gap-3 text-sm leading-relaxed">
                        <span
                          aria-hidden
                          className="mt-[0.45rem] size-1 shrink-0 bg-red"
                        />
                        {b[l]}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 text-sm text-ink-soft">
                    <span className="plate mr-2 text-muted">{copy.forWho[l]}</span>
                    {s.forWho[l]}
                  </p>

                  <p className="mt-4 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm">
                    <span className="plate text-muted">{copy.cases[l]}</span>
                    {related[s.id]?.map((slug) => {
                      const p = projects.find((x) => x.slug === slug);
                      if (!p) return null;
                      return (
                        <Link
                          key={slug}
                          href={`/${l}/portafolio/${slug}`}
                          className="underline decoration-ink/25 transition-colors hover:decoration-red"
                        >
                          {p.name}
                        </Link>
                      );
                    })}
                  </p>
                </div>

                {ev && (
                  <BrowserMock url={ev.url} locale={l}>
                    <ProjectScreen slug={ev.slug} locale={l} />
                  </BrowserMock>
                )}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-20">
        <h2 className="font-wide text-title font-semibold">{copy.faq[l]}</h2>
        <div className="mt-8 max-w-3xl border-t border-ink/18">
          {faqs.map((f) => (
            <details key={f.q.es} className="group border-b border-ink/18">
              <summary className="flex cursor-pointer items-baseline justify-between gap-6 py-5 text-lg font-medium marker:content-none [&::-webkit-details-marker]:hidden">
                {f.q[l]}
                <span aria-hidden className="relative mt-2 block size-2.5 shrink-0">
                  <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-red" />
                  <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-red transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="measure pb-6 text-base leading-relaxed text-ink-soft">
                {f.a[l]}
              </p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-20 border-t border-ink/18 pt-12">
        <h2 className="font-wide max-w-[20ch] text-title font-semibold">
          {copy.ctaTitle[l]}
        </h2>
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
            href={`/${l}/contacto`}
            className="plate border border-ink/30 px-6 py-4 transition-colors hover:border-ink hover:bg-white"
          >
            {ui.cta[l]}
          </Link>
        </div>
      </section>
    </div>
  );
}
