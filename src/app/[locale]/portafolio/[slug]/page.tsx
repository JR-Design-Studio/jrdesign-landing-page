import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProcessRail } from "@/components/ProcessRail";
import { ProjectVisual } from "@/components/ProjectVisual";
import { Reveal } from "@/components/Reveal";
import { testimonialFor } from "@/lib/content";
import { getProject, nextProject, projects } from "@/lib/projects";
import { isLocale, locales, site, ui, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string; slug: string }>;

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

      {/* Portada */}
      <header className="mx-auto max-w-[86rem] px-5 pb-12 pt-14 sm:px-8 sm:pb-16 sm:pt-20">
        <div className="flex items-center gap-3">
          <Link
            href={`/${l}/portafolio`}
            className="tracking-label text-[0.62rem] text-muted transition-colors hover:text-ink"
          >
            {l === "es" ? "Portafolio" : "Work"}
          </Link>
          <span className="num tracking-label text-[0.62rem] text-red">
            {String(index).padStart(2, "0")} / {projects.length}
          </span>
        </div>

        <h1 className="font-wide mt-6 max-w-4xl text-display font-semibold">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl font-serif text-xl leading-[1.6] text-ink-soft sm:text-2xl">
          {project.lede[l]}
        </p>

        <dl className="mt-12 grid gap-6 border-t border-ink/12 pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="tracking-label text-[0.62rem] text-muted">
                {m.label}
              </dt>
              <dd className="mt-1.5 text-sm">{m.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <Reveal className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <ProjectVisual
          project={project}
          locale={l}
          priority
          sizes="(min-width: 1440px) 1376px, 100vw"
          className="aspect-[16/10] w-full sm:aspect-[16/8]"
        />
      </Reveal>

      {/* Proceso 01–05 */}
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <p className="tracking-label mb-10 text-[0.62rem] text-muted">
          {ui.process[l]}
        </p>
        <ProcessRail steps={project.steps} locale={l} />
      </div>

      {/* Resultado */}
      <section className="bg-ink py-16 text-paper sm:py-24">
        <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
          <div className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-16">
            <p className="tracking-label text-[0.62rem] text-paper/75">
              {ui.result[l]}
            </p>
            <p className="font-wide max-w-3xl text-title font-medium">
              {project.result[l]}
            </p>
          </div>
        </div>
      </section>

      {/* Testimonio del propio cliente del caso */}
      {testimonial && (
        <section className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
          <blockquote className="grid gap-8 md:grid-cols-[13rem_1fr] md:gap-16">
            <span className="tracking-label text-[0.62rem] text-muted">
              {l === "es" ? "El cliente" : "The client"}
            </span>
            <div className="max-w-3xl">
              <p className="font-serif text-2xl leading-[1.55] sm:text-3xl">
                <span className="text-red">“</span>
                {testimonial.quote[l]}
                <span className="text-red">”</span>
              </p>
              <footer className="tracking-label mt-6 text-[0.62rem] text-muted">
                {testimonial.name} · {testimonial.role[l]}, {testimonial.company}
              </footer>
            </div>
          </blockquote>
        </section>
      )}

      {/* Siguiente caso */}
      <nav
        aria-label={ui.next[l]}
        className="mx-auto max-w-[86rem] border-t border-ink/12 px-5 sm:px-8"
      >
        <Link
          href={`/${l}/portafolio/${next.slug}`}
          className="group flex flex-col gap-2 py-10 sm:flex-row sm:items-baseline sm:justify-between sm:py-14"
        >
          <span className="tracking-label text-[0.62rem] text-muted">
            {ui.next[l]}
          </span>
          <span className="font-wide flex items-center gap-3 text-title font-medium">
            {next.name}
            <span className="size-2 rounded-full bg-red transition-transform duration-300 group-hover:translate-x-2" />
          </span>
        </Link>
      </nav>
    </article>
  );
}
