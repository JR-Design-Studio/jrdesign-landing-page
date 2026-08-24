"use client";

import { useEffect, useRef } from "react";

/**
 * El único momento orquestado del sitio: la consola enciende por partes.
 * El estado final es el estado por defecto, así que sin JavaScript —o con
 * prefers-reduced-motion— todo aparece ya encendido.
 */
export function ConsoleBoot({
  children,
  step = 110,
  className,
}: {
  children: React.ReactNode;
  /** Milisegundos entre panel y panel. */
  step?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const quiet = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const parts = Array.from(
      root.querySelectorAll<HTMLElement>('[data-boot="wait"]'),
    );

    if (quiet) {
      parts.forEach((el) => el.setAttribute("data-boot", "on"));
      return;
    }

    const timers = parts.map((el, i) =>
      window.setTimeout(() => el.setAttribute("data-boot", "on"), 120 + i * step),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [step]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
