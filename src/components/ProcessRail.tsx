"use client";

import { useEffect, useState } from "react";
import type { ProcessStep } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";
import { Readout } from "./Readout";

/**
 * Los cinco pasos del caso corren por un riel: el índice marca el paso encendido
 * y la señal salta de uno a otro conforme avanzas. Es una secuencia real de
 * proceso, no una decoración numerada.
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
      { rootMargin: "-28% 0px -55% 0px", threshold: 0 },
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [steps]);

  return (
    <div className="grid gap-10 md:grid-cols-[14rem_1fr] md:gap-16">
      <nav
        aria-label={locale === "es" ? "Proceso" : "Process"}
        className="top-24 hidden h-fit self-start md:sticky md:block"
      >
        <ol className="border-l border-ink/25">
          {steps.map((step, i) => {
            const on = i === current;
            return (
              <li key={step.key}>
                <a
                  href={`#paso-${step.key}`}
                  className={`-ml-px flex items-center gap-3 border-l-2 py-2.5 pl-4 transition-colors ${
                    on
                      ? "border-red text-ink"
                      : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  <Readout
                    value={String(i + 1).padStart(2, "0")}
                    live={on}
                    className="text-[0.68rem]"
                  />
                  <span className="plate">{step.title[locale]}</span>
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="measure">
        {steps.map((step, i) => (
          <section
            key={step.key}
            id={`paso-${step.key}`}
            className="scroll-mt-28 border-t border-ink/18 py-8 first:border-t-0 first:pt-0 sm:py-10"
          >
            <div className="flex items-baseline gap-4">
              <Readout
                value={String(i + 1).padStart(2, "0")}
                live={i === current}
                className="text-[0.68rem] text-muted"
              />
              <h2 className="font-wide text-xl font-semibold sm:text-2xl">
                {step.title[locale]}
              </h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              {step.body[locale]}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
