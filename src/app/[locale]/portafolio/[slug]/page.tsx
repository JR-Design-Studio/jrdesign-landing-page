import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { testimonialFor } from "@/lib/content";
import { SHOTS } from "@/lib/shots";
import { SiteLink } from "@/components/SiteLink";
import { CaseShot } from "@/components/CaseShot";
import {
  DeviceMockup,
  ScaledMockup,
  naturalSize,
} from "@/components/mockups/DeviceMockup";
import { getProject, projects } from "@/lib/projects";
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

/** El marco de laptop en dos tallas: la chica evita que se desborde en móvil. */
function LaptopShot({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const sizes = [
    { className: "flex sm:hidden", width: 300, height: 200 },
    { className: "hidden sm:flex lg:hidden", width: 500, height: 330 },
    { className: "hidden lg:flex", width: 600, height: 400 },
  ];

  return (
    <>
      {sizes.map((slot) => (
        <ScaledMockup
          key={slot.className}
          width={slot.width}
          height={slot.height}
          natural={naturalSize("laptop")}
          className={slot.className}
        >
          <DeviceMockup
            device="laptop"
            src={src}
            alt={alt}
            sizes="900px"
            priority={priority}
          />
        </ScaledMockup>
      ))}
    </>
  );
}

export default async function CasePage({ params }: { params: Params }) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const project = getProject(slug);
  if (!project) notFound();

  const testimonial = testimonialFor(project.slug);

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
    { label: ui.sector[l], value: project.sector[l] },
    { label: ui.scope[l], value: project.scope[l] },
  ];

  const shot = SHOTS[project.slug];
  // Si el caso tiene capturas de escritorio, la portada va en la laptop.
  const hero = project.shots[0];

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="-mt-[5.25rem] rounded-b-[28px] bg-ink pb-14 pt-[calc(5.25rem+3rem)] text-paper sm:pb-20 sm:pt-[calc(5.25rem+4rem)]">
        <div className="mx-auto grid max-w-[86rem] gap-12 px-5 sm:px-8 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <div>
          <h1 className="font-wide text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-white">
            {project.name}
          </h1>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-paper/75 sm:text-xl">
            {project.lede[l]}
          </p>

          <dl className="mt-10 grid gap-6 sm:grid-cols-2">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-base text-paper/60">{m.label}</dt>
                <dd className="mt-1 text-[1.0625rem] text-white">{m.value}</dd>
              </div>
            ))}
          </dl>

          {project.liveUrl && (
            <SiteLink
              href={project.liveUrl}
              className="mt-8 inline-flex items-center gap-2 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
            >
              {project.liveUrl.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")}
            </SiteLink>
          )}
        </div>

        <div className="flex items-center justify-center">
          {hero ? (
            <LaptopShot src={hero.src} alt={project.name} priority />
          ) : (
            shot && (
              <ScaledMockup
                width={300}
                height={380}
                natural={naturalSize("phone")}
              >
                <DeviceMockup
                  device="phone"
                  src={shot.src}
                  alt={project.name}
                  sizes="420px"
                  priority
                />
              </ScaledMockup>
            )
                    )}
        </div>
        </div>
      </header>

      <div className="mx-auto max-w-[86rem] px-5 pb-14 sm:px-8 sm:pb-20">
      {/* El caso, contado por partes, con la evidencia intercalada */}
      <div className="mt-20 flex flex-col gap-16 sm:mt-24 sm:gap-20">
        {project.steps.map((step, i) => {
          // Cada captura acompaña al paso que explica lo que se ve.
          const evidence = project.shots[i];
          return (
            <section key={step.key}>
              <div>
                <div>
                  <h2 className="font-wide max-w-[22ch] text-[clamp(1.5rem,2.8vw,2.2rem)] font-light leading-[1.1] tracking-tight text-ink">
                    {step.title[l]}
                  </h2>
                  <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-ink-soft">
                    {step.body[l]}
                  </p>
                </div>
              </div>

              {evidence && i > 0 && (
                <figure className="mt-10">
                  <CaseShot
                    shots={project.shots}
                    index={i}
                    alt={project.name}
                  />
                  {evidence.caption && (
                    <figcaption className="mt-3 text-base text-muted">
                      {evidence.caption[l]}
                    </figcaption>
                  )}
                </figure>
              )}
            </section>
          );
        })}
      </div>

      {/* Resultado */}
      <section className="mt-20 rounded-2xl bg-ink px-6 py-10 text-paper sm:px-12 sm:py-14">
        <h2 className="text-base text-paper/60">{ui.result[l]}</h2>
        <p className="font-wide mt-4 max-w-[46ch] text-[clamp(1.4rem,2.6vw,2.2rem)] font-light leading-[1.15] text-white">
          {project.result[l]}
        </p>
      </section>

      {/* El cliente del propio caso */}
      {testimonial && (
        <blockquote className="mt-16 max-w-[60ch]">
          <p className="text-xl leading-relaxed text-ink sm:text-2xl">
            &ldquo;{testimonial.quote[l]}&rdquo;
          </p>
          <footer className="mt-5 text-base text-muted">
            {testimonial.name} · {testimonial.role[l]} · {testimonial.company}
          </footer>
        </blockquote>
      )}
      </div>
    </article>
  );
}
