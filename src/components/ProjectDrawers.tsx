"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";
import { Readout } from "./Readout";

/**
 * Los casos son cajones del instrumento: cara del cajón en reposo, salida a
 * medias con la lectura previa al apuntar o enfocar, apertura al caso completo.
 * Sin puntero sigue siendo una lista de enlaces con toda su información.
 */
export function ProjectDrawers({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <ul className="border-t border-ink/18">
      {projects.map((project, i) => {
        const out = open === project.slug;
        return (
          <li key={project.slug} className="border-b border-ink/18">
            <Link
              href={`/${locale}/portafolio/${project.slug}`}
              onMouseEnter={() => setOpen(project.slug)}
              onMouseLeave={() => setOpen(null)}
              onFocus={() => setOpen(project.slug)}
              onBlur={() => setOpen(null)}
              className="group block"
            >
              <div
                className={`flex items-baseline gap-4 py-4 transition-[padding,background-color] duration-300 sm:gap-7 sm:py-6 ${
                  out ? "bg-white pl-3 sm:pl-5" : "pl-0"
                }`}
              >
                <Readout
                  value={i + 1}
                  cells={2}
                  live={out}
                  className={`shrink-0 text-[0.7rem] ${out ? "" : "text-muted"}`}
                />

                <div className="min-w-0 flex-1">
                  <h3 className="font-wide text-xl font-semibold sm:text-3xl">
                    {project.name}
                  </h3>
                  <p
                    className={`measure mt-1 text-sm leading-relaxed text-ink-soft transition-opacity duration-300 ${
                      out ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    {project.lede[locale]}
                  </p>
                </div>

                <div className="hidden shrink-0 text-right sm:block">
                  <span className="plate block text-[0.6rem] text-muted">
                    {project.sector[locale]}
                  </span>
                  <Readout
                    value={project.year}
                    className="mt-1 text-[0.7rem] text-muted"
                  />
                </div>

                <span
                  aria-hidden
                  className={`hidden shrink-0 self-center transition-transform duration-300 sm:block ${
                    out ? "translate-x-1" : ""
                  }`}
                >
                  <svg width="22" height="10" viewBox="0 0 22 10" fill="none">
                    <path
                      d="M0 5h20M16 1l4 4-4 4"
                      stroke={out ? "#C1282D" : "#8A8A8A"}
                      strokeWidth="1.25"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
