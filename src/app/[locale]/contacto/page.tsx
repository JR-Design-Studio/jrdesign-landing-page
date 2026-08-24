import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { Readout } from "@/components/Readout";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Hablemos de tu proyecto", en: "Let us talk about your project" },
  lede: {
    es: "Escríbenos por WhatsApp si quieres ir rápido, o llena el formulario si prefieres dejar el contexto por escrito. Contestamos dentro de un día hábil.",
    en: "Message us on WhatsApp if you want to move fast, or use the form if you would rather write the context down. We reply within one business day.",
  },
  direct: { es: "Línea directa", en: "Direct line" },
  expect: { es: "Qué sigue", en: "What happens next" },
  steps: {
    es: [
      "Contestamos dentro de un día hábil.",
      "Llamada de 30 minutos para entender el negocio, sin presentación de ventas.",
      "Propuesta por escrito con alcance, tiempos y precio cerrado.",
    ],
    en: [
      "We reply within one business day.",
      "A 30-minute call to understand the business, with no sales deck.",
      "A written proposal with scope, timeline and a fixed price.",
    ],
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
    title: l === "es" ? "Contacto" : "Contact",
    description:
      l === "es"
        ? "Escríbenos por WhatsApp o déjanos el contexto de tu proyecto. Contestamos dentro de un día hábil."
        : "Message us on WhatsApp or send the context of your project. We reply within one business day.",
    alternates: {
      canonical: `/${l}/contacto`,
      languages: {
        es: "/es/contacto",
        en: "/en/contacto",
        "x-default": "/es/contacto",
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <header>
        <h1 className="font-wide max-w-[16ch] text-title font-semibold">
          {copy.title[l]}
        </h1>
        <p className="measure mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
        <div className="order-2 panel p-6 sm:p-9 lg:order-1">
          <ContactForm locale={l} />
        </div>

        <aside className="order-1 lg:order-2">
          <h2 className="plate text-muted">{copy.direct[l]}</h2>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="num mt-3 block text-2xl font-semibold transition-colors hover:text-red"
          >
            {site.whatsapp}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 block text-sm text-ink-soft underline decoration-ink/25 transition-colors hover:decoration-red"
          >
            {site.email}
          </a>
          <p className="mt-2 text-sm text-muted">{site.city[l]}</p>

          <h2 className="plate mt-12 text-muted">{copy.expect[l]}</h2>
          <ol className="mt-4 border-t border-ink/18">
            {copy.steps[l].map((s, i) => (
              <li
                key={s}
                className="flex gap-4 border-b border-ink/18 py-4 text-sm leading-relaxed"
              >
                <Readout
                  value={String(i + 1).padStart(2, "0")}
                  live={i === 0}
                  className="shrink-0 text-[0.68rem] text-muted"
                />
                {s}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
