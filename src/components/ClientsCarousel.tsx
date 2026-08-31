"use client";

import { useRef, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Vitrina de clientes: una fila que se arrastra. El scroll nativo hace el
 * trabajo —también con dedo y con teclado—; el puntero solo lo empuja.
 */
export function ClientsCarousel({ locale }: { locale: Locale }) {
  const railRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number } | null>(null);
  const moved = useRef(false);
  const [grabbing, setGrabbing] = useState(false);

  const shown = projects.slice(0, 10);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail) return;
    drag.current = { x: event.clientX, left: rail.scrollLeft };
    moved.current = false;
    setGrabbing(true);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    if (!rail || !drag.current) return;
    const delta = event.clientX - drag.current.x;
    if (Math.abs(delta) > 4) moved.current = true;
    rail.scrollLeft = drag.current.left - delta;
  };

  const endDrag = () => {
    drag.current = null;
    setGrabbing(false);
  };

  return (
    <div
      ref={railRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onClickCapture={(event) => {
        // Arrastrar la fila no debe abrir el caso que quedó bajo el dedo.
        if (moved.current) {
          event.preventDefault();
          event.stopPropagation();
        }
      }}
      onPointerLeave={endDrag}
      className={`flex select-none gap-8 overflow-x-auto px-5 py-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden ${
        grabbing ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {shown.map((project) => (
        <ProjectCard key={project.slug} slug={project.slug} locale={locale} />
      ))}
    </div>
  );
}

