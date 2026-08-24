import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
  forWho: { es: "Para quién", en: "Who it is for" },
  cases: { es: "Casos relacionados", en: "Related cases" },
  faq: { es: "Antes de escribirnos", en: "Before you write" },
  ctaTitle: { es: "¿Cuál de las tres se parece a lo tuyo?", en: "Which one sounds like your case?" },
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
      <header className="max-w-3xl">
        <h1 className="font-wide text-title font-semibold">{copy.title[l]}</h1>
        <p className="mt-5 font-serif text-lg leading-[1.65] text-ink-soft sm:text-xl">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-16 space-y-px bg-ink/12">
        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-28 bg-paper py-10 sm:py-14"
          >
            <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-16">
              <div>
                <span className="num tracking-label text-[0.62rem] text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="font-wide mt-3 text-2xl font-medium sm:text-3xl">
                  {s.title[l]}
                </h2>
              </div>

              <div className="max-w-2xl">
                <p className="font-serif text-lg leading-[1.65] text-ink-soft">
                  {s.body[l]}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {s.bullets.map((b) => (
                    <li key={b.es} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-red" />
                      {b[l]}
                    </li>
                  ))}
                </ul>

                <p className="tracking-label mt-8 text-[0.62rem] text-muted">
                  {copy.forWho[l]}
                </p>
                <p className="mt-2 text-sm text-ink-soft">{s.forWho[l]}</p>

                <p className="tracking-label mt-8 text-[0.62rem] text-muted">
                  {copy.cases[l]}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                  {related[s.id]?.map((slug) => {
                    const p = projects.find((x) => x.slug === slug);
                    if (!p) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/${l}/portafolio/${slug}`}
                        className="text-sm underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-red"
                      >
                        {p.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="mt-20">
        <h2 className="font-wide text-title font-semibold">{copy.faq[l]}</h2>
        <div className="mt-8 max-w-3xl border-t border-ink/12">
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

      <section className="mt-20 border-t border-ink/12 pt-14">
        <h2 className="font-wide max-w-2xl text-title font-semibold">
          {copy.ctaTitle[l]}
        </h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
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
            {ui.whatsapp[l]}
          </a>
        </div>
      </section>
    </div>
  );
}
