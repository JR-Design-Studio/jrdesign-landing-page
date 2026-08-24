"use client";

import { useEffect, useState } from "react";
import type { ProcessStep } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Los cinco pasos del caso, con el punto rojo del logotipo recorriendo el riel
 * conforme avanzas. Es una secuencia real de proceso, no decoración.
 */
export function ProcessRail({
  steps,
  locale,
}: {
  steps: ProcessStep[];
  locale: Locale;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const nodes = steps
      .map((s) => document.getElementById(`paso-${s.key}`))
      .filter((n): n is HTMLElement => Boolean(n));
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (!visible) return;
        const idx = nodes.indexOf(visible.target as HTMLElement);
        if (idx >= 0) setCurrent(idx);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [steps]);

  return (
    <div className="grid gap-10 md:grid-cols-[13rem_1fr] md:gap-16">
      {/* Riel: índice pegajoso en escritorio */}
      <nav
        aria-label="Proceso"
        className="top-28 hidden h-fit self-start md:sticky md:block"
      >
        <ol className="relative border-l border-ink/15 pl-6">
          <span
            className="absolute -left-[4.5px] size-2 rounded-full bg-red transition-[top] duration-500 ease-out"
            style={{ top: `${current * 2.5 + 0.45}rem` }}
            aria-hidden
          />
          {steps.map((step, i) => (
            <li key={step.key} className="h-10">
              <a
                href={`#paso-${step.key}`}
                className={`tracking-label num text-[0.66rem] transition-colors ${
                  i === current ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span className="mr-2">{String(i + 1).padStart(2, "0")}</span>
                {step.title[locale]}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="max-w-[46rem]">
        {steps.map((step, i) => (
          <section
            key={step.key}
            id={`paso-${step.key}`}
            className="scroll-mt-32 border-t border-ink/12 py-8 first:border-t-0 first:pt-0 sm:py-12"
          >
            <div className="flex items-baseline gap-4">
              <span className="num tracking-label text-[0.66rem] text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="font-wide text-xl font-medium sm:text-2xl">
                {step.title[locale]}
              </h2>
            </div>
            <p className="mt-4 font-serif text-lg leading-[1.7] text-ink-soft sm:text-xl">
              {step.body[locale]}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
