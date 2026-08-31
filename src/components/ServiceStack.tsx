"use client";

import { useEffect, useRef } from "react";
import { serviceStack } from "@/lib/content";
import type { Locale } from "@/lib/i18n";

/** Alto del riel más su aire: donde se detiene la primera tarjeta. */
const TOP = 96;
/** Escalón entre una tarjeta fijada y la siguiente. */
const STEP = 14;

/** Superficie de cada tarjeta, en el orden en que se apilan. */
const SKINS = [
  "bg-ink text-paper",
  "bg-paper text-ink",
  "bg-red text-white",
  "bg-white text-ink ring-1 ring-ink/15",
];


/**
 * Pila de servicios: cada tarjeta se fija bajo la anterior y se encoge un poco
 * cuando la siguiente empieza a cubrirla, como una baraja que se cierra.
 */
export function ServiceStack({ locale }: { locale: Locale }) {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const update = () => {
      const cards = cardRefs.current;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!card || !next) return;
        const box = card.getBoundingClientRect();
        const overlap = box.bottom - next.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, overlap / box.height));
        card.style.transform = `scale(${(1 - progress * 0.04).toFixed(4)})`;
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="flex flex-col gap-10 sm:gap-16">
      {serviceStack.map((service, i) => (
        <div
          key={service.id}
          className="flex flex-col"
          style={{ position: "sticky", top: TOP + i * STEP }}
        >
          <div
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            style={{ transformOrigin: "50% 0%", willChange: "transform" }}
            className={`flex min-h-[26rem] flex-col justify-center gap-8 rounded-[28px] p-10 sm:min-h-[32rem] sm:p-20 ${SKINS[i % SKINS.length]}`}
          >
            <h3 className="font-wide text-[clamp(2.4rem,6vw,5rem)] font-light leading-[0.98] tracking-tight">
              {service.title[locale]} {service.titleTail[locale]}
            </h3>

            <p className="measure text-lg leading-relaxed sm:text-xl">
              {service.body[locale]}
            </p>

          </div>
        </div>
      ))}
    </div>
  );
}
