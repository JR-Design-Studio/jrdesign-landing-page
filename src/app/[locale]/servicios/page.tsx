import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ArrowLink";
import { faqs, servicePlans } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Conoce nuestros servicios", en: "Our services" },
  lede: {
    es: "Diseñamos, programamos y damos soporte con el mismo equipo, de principio a fin.",
    en: "We design, build and support with the same team, from start to finish.",
  },
  quote: { es: "Solicitar una cotización", en: "Request a quote" },
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
    mainEntity: [
      ...servicePlans.flatMap((plan) => plan.faqs),
      ...faqs.map((f) => ({ q: f.q, a: f.a })),
    ].map((f) => ({
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
        <h1 className="font-wide max-w-[26ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.title[l]}
        </h1>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.lede[l]}
        </p>

      </header>

      <div className="mt-14 flex flex-col gap-8 sm:mt-20">
        {servicePlans.map((plan) => (
          <section
            key={plan.id}
            id={plan.id}
            className="scroll-mt-28 rounded-[28px] bg-paper p-8 sm:p-12"
          >
            <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
              <div>
                <h2 className="font-wide text-[clamp(1.8rem,3.4vw,2.8rem)] font-light leading-[1.05] tracking-tight text-ink">
                  {plan.title[l]}
                </h2>
                <p className="mt-4 max-w-[38ch] text-lg leading-relaxed text-ink-soft">
                  {plan.body[l]}
                </p>

                <ArrowLink
                  href={`/${l}/contacto?servicio=${plan.id}`}
                  size={18}
                  className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-5 py-2.5 text-base font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
                >
                  {copy.quote[l]}
                </ArrowLink>
              </div>

              <div className="flex flex-col gap-3">
                {plan.faqs.map((faq) => (
                  <details
                    key={faq.q.es}
                    className="group rounded-xl border border-ink/15 bg-white px-5 py-4"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.0625rem] text-ink marker:content-none [&::-webkit-details-marker]:hidden">
                      {faq.q[l]}
                      <span aria-hidden className="relative block size-3.5 shrink-0">
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink transition-transform duration-300 group-open:scale-y-0" />
                      </span>
                    </summary>
                    <p className="mt-3 text-base leading-relaxed text-ink-soft">
                      {faq.a[l]}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
