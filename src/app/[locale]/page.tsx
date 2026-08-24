/**
 * THESIS: nueve sistemas en operación, no una galería de proyectos; refusa la
 * landing de estudio (tipo enorme + grid de mockups + un acento) y su opuesto,
 * el dashboard oscuro con neón.
 * OWN-WORLD: chasis ink, carátulas de papel y paneles blancos, etiquetas
 * serigrafiadas, lecturas por celdas con celdas fantasma, rojo solo como señal.
 * STORY: el visitante ve la web de Disolab jalando su catálogo desde el Odoo que
 * ya operaba, entiende que aquí se resuelven problemas de operación y escribe.
 * FIRST VIEWPORT: titular a la izquierda con la acción bajo él; a la derecha la
 * consola —navegador dibujado con el catálogo sincronizado y la lectura de
 * capturas duplicadas en 0— encendiéndose por partes.
 * FORM: Sala de Instrumentos, candidato 6 de mi lista, seed 82aceca0.
 */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserMock } from "@/components/DeviceMock";
import { ConsoleBoot } from "@/components/ConsoleBoot";
import { ProjectDrawers } from "@/components/ProjectDrawers";
import { ProjectScreen } from "@/components/ProjectScreen";
import { Readout } from "@/components/Readout";
import { SyncDiagram } from "@/components/SyncDiagram";
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
    es: "Su catálogo ya vivía en Odoo. Lo conectamos a la web.",
    en: "Their catalog already lived in Odoo. We wired it to the web.",
  },
  heroLede: {
    es: "Somos dos personas en Guadalajara. Desde 2018 construimos a mano sitios, tiendas en línea e integraciones con el sistema que la empresa ya opera. Esta es la web de Disolab jalando sus productos del ERP: nadie captura nada dos veces.",
    en: "We are two people in Guadalajara. Since 2018 we have hand-built websites, online stores and integrations with the systems companies already run. This is Disolab's site pulling products from their ERP: nobody enters anything twice.",
  },
  readouts: {
    es: [
      { v: "2018", k: "Operando desde" },
      { v: "9", k: "Casos documentados" },
      { v: "2", k: "Personas en el estudio" },
    ],
    en: [
      { v: "2018", k: "Running since" },
      { v: "9", k: "Documented cases" },
      { v: "2", k: "People in the studio" },
    ],
  },
  workTitle: {
    es: "Nueve sistemas, con el razonamiento incluido",
    en: "Nine systems, reasoning included",
  },
  workLede: {
    es: "Cada caso abre con su contexto, lo que se investigó, el reto real y la decisión que cambió el resultado. No hay proyecto sin explicación.",
    en: "Each case opens with its context, the research, the real challenge and the decision that changed the outcome. No project without its reasoning.",
  },
  mechanismTitle: {
    es: "Cómo se ve una integración cuando funciona",
    en: "What an integration looks like when it works",
  },
  mechanismBody: {
    es: "Disolab ya administraba su catálogo en Odoo. En vez de montar un sistema aparte, la web lee de ahí: el equipo captura el producto una sola vez y aparece publicado. Ese criterio —aprovechar lo que ya opera— es el mismo en cada proyecto.",
    en: "Disolab already managed their catalog in Odoo. Instead of standing up a separate system, the site reads from it: the team enters a product once and it goes live. That criterion — build on what already runs — is the same on every project.",
  },
  servicesTitle: { es: "Qué construimos", en: "What we build" },
  forWho: { es: "Para quién", en: "Who for" },
  processTitle: { es: "Cómo trabajamos", en: "How we work" },
  processLede: {
    es: "Cinco pasos, los mismos en cada proyecto. Siempre sabes en cuál vas y qué sigue.",
    en: "Five steps, the same on every project. You always know where you are and what comes next.",
  },
  voicesTitle: {
    es: "Lo que dicen quienes ya trabajaron con nosotros",
    en: "What our clients say",
  },
  faqTitle: {
    es: "Preguntas que siempre nos hacen",
    en: "Questions we always get",
  },
  ctaTitle: {
    es: "Cuéntanos qué necesita resolver tu negocio",
    en: "Tell us what your business needs to solve",
  },
  ctaLede: {
    es: "Contestamos dentro de un día hábil. La primera llamada es de 30 minutos y sirve para entender, no para vender.",
    en: "We reply within one business day. The first call is 30 minutes and exists to understand, not to sell.",
  },
};

export default async function HomePage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const featured = getProject("disolab")!;

  return (
    <>
      {/* Consola */}
      <ConsoleBoot className="border-b border-ink/18">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div data-boot="wait">
            <h1 className="font-wide max-w-[15ch] text-display font-bold">
              {copy.hero[l]}
            </h1>
            <p className="measure mt-7 text-base leading-relaxed text-ink-soft sm:text-lg">
              {copy.heroLede[l]}
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
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

            <dl className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-ink/18 pt-6">
              {copy.readouts[l].map((r) => (
                <div key={r.k} className="flex flex-col-reverse">
                  <dt className="plate mt-1 text-muted">{r.k}</dt>
                  <dd>
                    <Readout value={r.v} className="text-2xl font-semibold" />
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-boot="wait">
            <BrowserMock url="disolab.com.mx/catalogo" locale={l}>
              <ProjectScreen slug="disolab" locale={l} />
            </BrowserMock>
            <Link
              href={`/${l}/portafolio/${featured.slug}`}
              className="plate group mt-4 inline-flex items-center gap-3 underline decoration-ink/25 hover:decoration-red"
            >
              {l === "es" ? "Caso Disolab" : "Disolab case"}
              <span className="size-1.5 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
        </div>
      </ConsoleBoot>

      {/* Mecanismo: demostrado, no afirmado */}
      <section className="bg-ink py-16 text-paper sm:py-24">
        <div className="mx-auto grid max-w-[86rem] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="font-wide text-title font-semibold text-white">
              {copy.mechanismTitle[l]}
            </h2>
            <p className="measure mt-5 text-base leading-relaxed text-paper/85">
              {copy.mechanismBody[l]}
            </p>
          </div>
          <div className="bg-paper p-5 sm:p-8">
            <SyncDiagram locale={l} />
          </div>
        </div>
      </section>

      {/* Cajones */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-wide max-w-[18ch] text-title font-semibold">
          {copy.workTitle[l]}
        </h2>
        <p className="measure mt-4 text-base leading-relaxed text-ink-soft">
          {copy.workLede[l]}
        </p>
        <div className="mt-12">
          <ProjectDrawers projects={projects} locale={l} />
        </div>
      </section>

      {/* Servicios como hoja de especificación, no como tres tarjetas iguales */}
      <section className="mx-auto max-w-[86rem] px-5 pb-16 sm:px-8 sm:pb-24">
        <h2 className="font-wide text-title font-semibold">
          {copy.servicesTitle[l]}
        </h2>

        <div className="panel mt-10 divide-y divide-ink/12">
          {services.map((s, i) => (
            <div
              key={s.id}
              className="grid gap-5 p-5 sm:p-7 md:grid-cols-[auto_1.1fr_1fr] md:gap-8"
            >
              <Readout
                value={i + 1}
                cells={2}
                className="text-[0.7rem] text-muted"
              />
              <div>
                <h3 className="font-wide text-xl font-semibold">{s.title[l]}</h3>
                <p className="measure mt-3 text-sm leading-relaxed text-ink-soft">
                  {s.body[l]}
                </p>
                <p className="mt-4 text-sm text-muted">
                  <span className="plate mr-2 text-muted">{copy.forWho[l]}</span>
                  {s.forWho[l]}
                </p>
              </div>
              <ul className="space-y-2 border-l border-ink/12 pl-5 md:pl-8">
                {s.bullets.map((b) => (
                  <li
                    key={b.es}
                    className="flex gap-3 text-sm leading-relaxed text-ink-soft"
                  >
                    <span
                      aria-hidden
                      className="mt-[0.45rem] size-1 shrink-0 bg-red"
                    />
                    {b[l]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Link
          href={`/${l}/servicios`}
          className="plate group mt-8 inline-flex items-center gap-3 underline decoration-ink/25 hover:decoration-red"
        >
          {l === "es" ? "Servicios a detalle" : "Services in detail"}
          <span className="size-1.5 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-1.5" />
        </Link>
      </section>

      {/* Proceso: secuencia real, por eso va numerada */}
      <section className="border-y border-ink/18 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <h2 className="font-wide text-title font-semibold">
            {copy.processTitle[l]}
          </h2>
          <p className="measure mt-4 text-base leading-relaxed text-ink-soft">
            {copy.processLede[l]}
          </p>
          <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {howWeWork.map((phase, i) => (
              <li key={phase.n} className="border-t border-ink/25 pt-4">
                <Readout
                  value={phase.n}
                  live={i === 0}
                  className="text-[0.7rem] text-muted"
                />
                <h3 className="font-wide mt-3 text-lg font-semibold">
                  {phase.title[l]}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {phase.body[l]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Registro de clientes */}
      <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <h2 className="font-wide max-w-[20ch] text-title font-semibold">
          {copy.voicesTitle[l]}
        </h2>
        <ul className="mt-10 grid gap-px bg-ink/18 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name} className="bg-paper p-6 sm:p-8">
              <blockquote>
                <p className="measure text-base leading-relaxed text-ink-soft">
                  {t.quote[l]}
                </p>
                <footer className="mt-5 flex flex-wrap items-baseline gap-x-3">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="plate text-muted">
                    {t.role[l]} · {t.company}
                  </span>
                  {t.project && (
                    <Link
                      href={`/${l}/portafolio/${t.project}`}
                      className="plate ml-auto underline decoration-ink/25 hover:decoration-red"
                    >
                      {ui.viewCase[l]}
                    </Link>
                  )}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </section>

      {/* Preguntas */}
      <section className="mx-auto max-w-[86rem] px-5 pb-16 sm:px-8 sm:pb-24">
        <h2 className="font-wide text-title font-semibold">{copy.faqTitle[l]}</h2>
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

      {/* Cierre */}
      <section className="border-t border-ink/18 bg-white">
        <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
          <h2 className="font-wide max-w-[20ch] text-title font-semibold">
            {copy.ctaTitle[l]}
          </h2>
          <p className="measure mt-5 text-base leading-relaxed text-ink-soft">
            {copy.ctaLede[l]}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="plate bg-red px-6 py-4 text-white transition-colors hover:bg-red-deep"
            >
              {site.whatsapp}
            </a>
            <Link
              href={`/${l}/contacto`}
              className="plate border border-ink/30 px-6 py-4 transition-colors hover:border-ink"
            >
              {ui.cta[l]}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
