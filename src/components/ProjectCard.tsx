"use client";

import Link from "next/link";
import {
  DeviceMockup,
  ScaledMockup,
  naturalSize,
} from "./mockups/DeviceMockup";
import { projects } from "@/lib/projects";
import { SHOTS } from "@/lib/shots";
import type { Locale } from "@/lib/i18n";

/** Tarjeta del caso: carátula gris con la captura montada como una pantalla. */
export function ProjectCard({
  slug,
  locale,
  className = "w-[21rem] shrink-0 sm:w-[25rem]",
}: {
  slug: string;
  locale: Locale;
  className?: string;
}) {
  const project = projects.find((p) => p.slug === slug)!;
  const shot = SHOTS[slug];

  return (
    <Link
      href={`/${locale}/portafolio/${slug}`}
      draggable={false}
      className={`group flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.015] ${className}`}
    >
      <div className="flex h-[33rem] w-full flex-col overflow-hidden rounded-[28px] bg-paper px-5 pt-9 transition-colors duration-300 group-hover:bg-[color-mix(in_srgb,var(--color-paper)_92%,var(--color-ink))]">
        <div className="flex flex-1 items-end justify-center overflow-hidden">
          {shot ? (
            <ScaledMockup
              width={300}
              height={352}
              natural={naturalSize("phone")}
            >
              <DeviceMockup
                device="phone"
                src={shot.src}
                alt={project.name}
                sizes="420px"
              />
            </ScaledMockup>
          ) : (
            // Caso sin captura todavía: se anuncia como pantalla en blanco.
            <span className="plate w-[11rem] px-6 pb-10 text-center text-gray">
              {project.name}
            </span>
          )}
        </div>

        <div className="pb-6 pt-4">
          <h3 className="font-wide text-2xl font-semibold tracking-tight text-ink">
            {project.name}
          </h3>
          <span className="mt-2 inline-flex rounded-lg border border-ink/15 bg-white px-3 py-1.5 text-sm text-ink-soft">
            {project.sector[locale]}
          </span>
        </div>
      </div>
    </Link>
  );
}
