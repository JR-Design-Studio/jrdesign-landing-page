import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ConsoleBoot } from "@/components/ConsoleBoot";
import { ArrowLink } from "@/components/ArrowLink";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import { ServiceStack } from "@/components/ServiceStack";
import { WorkCarousel } from "@/components/WorkCarousel";
import { howWeWork } from "@/lib/content";
import { isLocale, locales, type Locale } from "@/lib/i18n";

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
    es: "Diseñamos webs pensadas para crecer tu negocio.",
    en: "We design websites built to grow your business.",
  },
  heroWork: {
    es: "Descubre nuestro trabajo",
    en: "See our work",
  },
  heroQuote: {
    es: "Solicitar una cotización",
    en: "Request a quote",
  },
  heroLede: {
    es: "Construimos a mano sitios, tiendas en línea e integraciones con el sistema que ya operas. Nada de capturar cosas dos veces.",
    en: "We hand-build websites, online stores and integrations with the systems you already run. No entering data twice.",
  },
  readouts: {
    es: [
      { v: "2018", k: "Operando desde" },
      { v: "9", k: "Sistemas activos" },
      { v: "2", k: "Desarrolladores" },
    ],
    en: [
      { v: "2018", k: "Running since" },
      { v: "9", k: "Active systems" },
      { v: "2", k: "Developers" },
    ],
  },
  workTitle: {
    es: "Sistemas con razonamiento",
    en: "Systems with reasoning",
  },
  workLede: {
    es: "Nueve sistemas, con el contexto, reto y decisión de cada uno. No hay proyecto sin explicación.",
    en: "Nine systems, with the context, challenge and decision for each. No project without explanation.",
  },
  clientsTitle: {
    es: "Algunos de nuestros ",
    en: "Some of the ",
  },
  clientsAccent: { es: "clientes", en: "clients" },
  clientsTail: { es: "", en: " we work with" },
  clientsCta: { es: "Ver proyectos", en: "See projects" },
  mechanismTitle: {
    es: "Integración que funciona",
    en: "Integration that works",
  },
  mechanismBody: {
    es: "Aprovechamos lo que ya opera. La web lee directamente de tu ERP o sistema actual, manteniendo una sola fuente de verdad.",
    en: "We build on what already runs. The web reads directly from your ERP or current system, keeping a single source of truth.",
  },
  servicesTitle: { es: "Nuestros servicios", en: "Our services" },
  forWho: { es: "Para quién", en: "Who for" },
  processTitle: { es: "Cómo trabajamos", en: "How we work" },
  processLede: {
    es: "Tres procesos clave para trabajar con nosotros de forma simple.",
    en: "Three key stages that keep working with us simple, with no surprises.",
  },
  voicesTitle: {
    es: "Lo que dicen los clientes",
    en: "What clients say",
  },
  faqTitle: {
    es: "Preguntas frecuentes",
    en: "Frequent questions",
  },
  ctaTitle: {
    es: "¿Listo para elevar tu ",
    en: "Ready to elevate your digital ",
  },
  ctaTitleAccent: { es: "presencia", en: "presence" },
  ctaTitleTail: { es: " digital?", en: "?" },
  ctaLede: {
    es: "Colaboremos para crear una experiencia de usuario que no solo cumpla, sino que exceda tus expectativas de negocio.",
    en: "Let's build a user experience that does not just meet your business expectations, but exceeds them.",
  },
};

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      {/* Hero: chasis oscuro, todo alineado a la izquierda */}
      <ConsoleBoot className="-mt-[5.25rem] rounded-b-3xl bg-ink pb-16 pt-[calc(5.25rem+4rem)] text-paper sm:pb-24 sm:pt-[calc(5.25rem+6rem)]">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <div data-boot="wait" className="flex flex-col items-start">
            <h1 className="font-wide max-w-[26ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-white">
              {copy.hero[l]}
            </h1>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href={`/${l}/portafolio`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
              >
                {copy.heroWork[l]}
              </Link>
              <ArrowLink
                href={`/${l}/contacto`}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/25 px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-colors duration-300 hover:bg-white/10"
              >
                {copy.heroQuote[l]}
              </ArrowLink>
            </div>
          </div>
        </div>
      </ConsoleBoot>

      {/* Clientes: vitrina que se arrastra */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto mb-6 flex max-w-[86rem] flex-wrap items-end justify-between gap-6 px-5 sm:mb-12 sm:px-8">
          <h2 className="font-wide max-w-[26ch] text-[clamp(1.6rem,3.2vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink">
            {copy.clientsTitle[l]}
            <em className="not-italic text-red">{copy.clientsAccent[l]}</em>
            {copy.clientsTail[l]}
          </h2>

          <ArrowLink
            href={`/${l}/portafolio`}
            size={18}
            className="hidden items-center gap-1.5 sm:inline-flex rounded-lg border border-red-deep bg-red px-5 py-2.5 text-base font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
          >
            {copy.clientsCta[l]}
          </ArrowLink>
        </div>

        <div className="mx-auto max-w-[86rem]">
          <ClientsCarousel locale={l} />
        </div>

        <div className="mt-10 flex justify-center px-5 sm:hidden">
          <ArrowLink
            href={`/${l}/portafolio`}
            size={18}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-5 py-2.5 text-base font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
          >
            {copy.clientsCta[l]}
          </ArrowLink>
        </div>
      </section>

      {/* Servicios: baraja que se cierra al bajar */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <div className="mb-12">
          <h2 className="font-wide max-w-[26ch] text-[clamp(1.6rem,3.2vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink">
            {copy.servicesTitle[l]}
          </h2>
        </div>

        <ServiceStack locale={l} />

        <div className="mt-14 flex justify-center">
          <ArrowLink
            href={`/${l}/servicios`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
          >
            {l === "es" ? "Servicios a detalle" : "Services in detail"}
          </ArrowLink>
        </div>
      </section>

      {/* Proceso: columna de texto con acordeón y una pieza del trabajo al lado */}
      <section className="rounded-t-[28px] bg-ink py-16 text-paper sm:py-24">
        <div className="mx-auto grid max-w-[86rem] items-start gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-none">
            <h2 className="font-wide max-w-[18ch] text-[clamp(1.9rem,4vw,3.4rem)] font-light leading-[1.05] tracking-tight text-white">
              {copy.processTitle[l]}
            </h2>

            <p className="measure mt-5 text-lg leading-relaxed text-paper/75">
              {copy.processLede[l]}
            </p>

            <ArrowLink
              href={`/${l}/nosotros`}
              className="mt-8 hidden items-center gap-1.5 lg:inline-flex rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
            >
              {l === "es" ? "Conoce más" : "Learn more"}
            </ArrowLink>

            <div className="mt-10 overflow-hidden rounded-2xl bg-paper text-ink">
              {howWeWork.map((phase) => (
                <div
                  key={phase.n}
                  className="border-ink/15 px-6 py-6 [&:not(:first-child)]:border-t"
                >
                  <h3 className="flex items-baseline gap-3 text-xl font-medium text-ink">
                    <span className="num text-base text-red">{phase.n}</span>
                    {phase.title[l]}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
                    {phase.body[l]}
                  </p>
                </div>
              ))}
            </div>

            <ArrowLink
              href={`/${l}/nosotros`}
              className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)] lg:hidden"
            >
              {l === "es" ? "Conoce más" : "Learn more"}
            </ArrowLink>
          </div>

          <div className="order-1 lg:order-none lg:sticky lg:top-28">
            <WorkCarousel />
          </div>
        </div>
      </section>

      {/* CTA de cierre */}
      <section>
        <div className="mx-auto max-w-[86rem] px-5 py-24 text-center sm:px-8">
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
        </div>
      </section>
    </>
  );
}
