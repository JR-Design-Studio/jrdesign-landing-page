import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Hablemos de tu proyecto", en: "Let's talk about your project" },
  lede: {
    es: "Escríbenos por WhatsApp si quieres ir rápido, o llena el formulario si prefieres dejar el contexto por escrito. Contestamos dentro de un día hábil.",
    en: "Message us on WhatsApp if you want to move fast, or use the form if you would rather write the context down. We reply within one business day.",
  },
  direct: { es: "Directo", en: "Direct" },
  expect: { es: "Qué esperar", en: "What to expect" },
  steps: {
    es: [
      "Contestamos dentro de un día hábil.",
      "Una llamada de 30 minutos para entender el negocio, sin presentación de ventas.",
      "Propuesta por escrito con alcance, tiempos y precio cerrado.",
    ],
    en: [
      "We reply within one business day.",
      "A 30-minute call to understand the business — no sales deck.",
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
      <header className="max-w-3xl">
        <h1 className="font-wide text-title font-semibold">{copy.title[l]}</h1>
        <p className="mt-5 font-serif text-lg leading-[1.65] text-ink-soft sm:text-xl">
          {copy.lede[l]}
        </p>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <div className="order-2 lg:order-1">
          <ContactForm locale={l} />
        </div>

        <aside className="order-1 lg:order-2">
          <p className="tracking-label text-[0.62rem] text-muted">
            {copy.direct[l]}
          </p>
          <a
            href={site.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="font-wide mt-3 block text-2xl font-medium transition-colors hover:text-red"
          >
            {site.whatsapp}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="mt-2 block text-sm text-ink-soft underline decoration-ink/25 underline-offset-4 transition-colors hover:decoration-red"
          >
            {site.email}
          </a>
          <p className="mt-2 text-sm text-muted">{site.city[l]}</p>

          <p className="tracking-label mt-12 text-[0.62rem] text-muted">
            {copy.expect[l]}
          </p>
          <ol className="mt-4 space-y-4 border-t border-ink/12 pt-5">
            {copy.steps[l].map((s, i) => (
              <li key={s} className="flex gap-4 text-sm leading-relaxed">
                <span className="num tracking-label text-[0.62rem] text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </div>
  );
}
