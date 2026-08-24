import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BrowserMock } from "@/components/DeviceMock";
import { ProcessRail } from "@/components/ProcessRail";
import { ProjectScreen } from "@/components/ProjectScreen";
import { Readout } from "@/components/Readout";
import { SyncDiagram } from "@/components/SyncDiagram";
import { testimonialFor } from "@/lib/content";
import { getProject, nextProject, projects } from "@/lib/projects";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string; slug: string }>;

/** Dominio mostrado en el chasis del navegador de cada caso. */
const domains: Record<string, string> = {
  disolab: "disolab.com.mx/catalogo",
  arqademy: "arqademy.com/cursos",
  lilitu: "lilitu.mx/fragancias",
  "s-ac-design-build": "sacdesignbuild.com/build",
  "meaningful-interiors": "meaningfulinteriors.com/proyectos",
  "legal-laboral-abogados": "legallaboral.mx/areas",
  edunnova: "edunnova.com/empresas",
  "cm-naturals": "cmnaturals.mx/productos",
  lozag: "lozag.com.mx/soluciones",
};

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!project || !isLocale(locale)) return {};
  const l = locale as Locale;

  return {
    title: `${project.name} — ${project.sector[l]}`,
    description: project.summary[l],
    alternates: {
      canonical: `/${l}/portafolio/${project.slug}`,
      languages: {
        es: `/es/portafolio/${project.slug}`,
        en: `/en/portafolio/${project.slug}`,
        "x-default": `/es/portafolio/${project.slug}`,
      },
    },
    openGraph: {
      type: "article",
      title: `${project.name} — ${project.sector[l]}`,
      description: project.summary[l],
      url: `/${l}/portafolio/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — ${project.sector[l]}`,
      description: project.summary[l],
    },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const testimonial = testimonialFor(project.slug);
  const next = nextProject(project.slug);
  const index = projects.findIndex((p) => p.slug === project.slug) + 1;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    headline: `${project.name} — ${project.sector[l]}`,
    abstract: project.summary[l],
    dateCreated: String(project.year),
    inLanguage: l === "es" ? "es-MX" : "en-US",
    url: `${site.url}/${l}/portafolio/${project.slug}`,
    creator: { "@type": "Organization", name: site.name, url: site.url },
    about: project.sector[l],
    keywords: project.stack.join(", "),
  };

  const meta = [
    { label: ui.year[l], value: String(project.year) },
    { label: ui.sector[l], value: project.sector[l] },
    { label: ui.scope[l], value: project.scope[l] },
    { label: ui.stack[l], value: project.stack.join(" · ") },
  ];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Carátula del caso */}
      <header className="border-b border-ink/18">
        <div className="mx-auto grid max-w-[86rem] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
              <Link
                href={`/${l}/portafolio`}
                className="plate text-muted underline decoration-ink/25 transition-colors hover:text-ink hover:decoration-red"
              >
                {l === "es" ? "Portafolio" : "Work"}
              </Link>
              <span className="flex items-baseline gap-1 text-[0.7rem]">
                <Readout value={index} cells={2} live />
                <span className="text-muted">/</span>
                <Readout value={projects.length} cells={2} className="text-muted" />
              </span>
            </div>

            <h1 className="font-wide mt-6 text-display font-bold">
              {project.name}
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
              {project.lede[l]}
            </p>

            <dl className="mt-10 grid gap-5 border-t border-ink/18 pt-6 sm:grid-cols-2">
              {meta.map((m) => (
                <div key={m.label}>
                  <dt className="plate text-muted">{m.label}</dt>
                  <dd className="mt-1 text-sm">{m.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <BrowserMock url={domains[project.slug] ?? site.url} locale={l}>
            <ProjectScreen slug={project.slug} locale={l} />
          </BrowserMock>
        </div>
      </header>

      {/* Proceso 01–05: secuencia real */}
      <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
        <ProcessRail steps={project.steps} locale={l} />
      </div>

      {/* El mecanismo de Disolab se dibuja donde vive */}
      {project.slug === "disolab" && (
        <section className="border-y border-ink/18 bg-white py-14 sm:py-20">
          <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
            <div className="panel-flush bg-paper p-5 sm:p-8">
              <SyncDiagram locale={l} />
            </div>
          </div>
        </section>
      )}

      {/* Resultado */}
      <section className="bg-ink py-14 text-paper sm:py-20">
        <div className="mx-auto grid max-w-[86rem] gap-6 px-5 sm:px-8 md:grid-cols-[10rem_1fr] md:gap-16">
          <p className="plate text-paper/75">{ui.result[l]}</p>
          <p className="font-wide max-w-3xl text-title font-semibold text-white">
            {project.result[l]}
          </p>
        </div>
      </section>

      {/* El cliente del propio caso */}
      {testimonial && (
        <section className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
          <blockquote className="grid gap-6 md:grid-cols-[10rem_1fr] md:gap-16">
            <span className="plate text-muted">
              {l === "es" ? "El cliente" : "The client"}
            </span>
            <div className="max-w-3xl">
              <p className="text-xl leading-relaxed sm:text-2xl">
                {testimonial.quote[l]}
              </p>
              <footer className="mt-5 flex flex-wrap items-baseline gap-x-3">
                <span className="text-sm font-semibold">{testimonial.name}</span>
                <span className="plate text-muted">
                  {testimonial.role[l]} · {testimonial.company}
                </span>
              </footer>
            </div>
          </blockquote>
        </section>
      )}

      {/* Siguiente cajón */}
      <nav
        aria-label={ui.next[l]}
        className="mx-auto max-w-[86rem] border-t border-ink/18 px-5 sm:px-8"
      >
        <Link
          href={`/${l}/portafolio/${next.slug}`}
          className="group flex flex-col gap-2 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:py-14"
        >
          <span className="plate text-muted">{ui.next[l]}</span>
          <span className="font-wide flex items-center gap-4 text-title font-semibold">
            {next.name}
            <svg
              width="26"
              height="10"
              viewBox="0 0 26 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-2"
            >
              <path d="M0 5h24M20 1l4 4-4 4" stroke="#C1282D" strokeWidth="1.4" />
            </svg>
          </span>
        </Link>
      </nav>
    </article>
  );
}
