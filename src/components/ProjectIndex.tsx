"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Elemento signature: el índice de casos. El punto rojo del logotipo marca el
 * caso apuntado y, en pantallas grandes, revela su vista previa en el panel fijo.
 * Sin hover (táctil o teclado) la lista sigue siendo una lista de enlaces normal.
 */
export function ProjectIndex({
  projects,
  locale,
  preview,
}: {
  projects: Project[];
  locale: Locale;
  /** Vistas previas renderizadas en el servidor, indexadas por slug. */
  preview: Record<string, React.ReactNode>;
}) {
  const [active, setActive] = useState(projects[0]?.slug ?? "");

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
      <ul className="border-t border-ink/12">
        {projects.map((project, i) => {
          const on = active === project.slug;
          return (
            <li key={project.slug} className="border-b border-ink/12">
              <Link
                href={`/${locale}/portafolio/${project.slug}`}
                onMouseEnter={() => setActive(project.slug)}
                onFocus={() => setActive(project.slug)}
                className="group flex items-baseline gap-4 py-5 sm:gap-6 sm:py-7"
              >
                <span
                  className={`num tracking-label w-8 shrink-0 text-[0.62rem] transition-colors ${
                    on ? "text-red" : "text-muted"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="font-wide flex flex-wrap items-baseline gap-x-2 text-2xl font-medium sm:text-4xl">
                    {project.name}
                    <span
                      className={`inline-block size-2 rounded-full transition-all duration-300 ${
                        on ? "scale-100 bg-red opacity-100" : "scale-50 opacity-0"
                      }`}
                    />
                  </span>
                  <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-ink-soft">
                    {project.lede[locale]}
                  </span>
                </span>

                <span className="num tracking-label hidden shrink-0 text-[0.62rem] text-muted sm:block">
                  {project.sector[locale]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="sticky top-28 hidden h-fit lg:block" aria-hidden>
        <div className="relative aspect-[4/3] w-full">
          {projects.map((project) => (
            <div
              key={project.slug}
              className={`absolute inset-0 transition-opacity duration-500 ${
                active === project.slug ? "opacity-100" : "opacity-0"
              }`}
            >
              {preview[project.slug]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
