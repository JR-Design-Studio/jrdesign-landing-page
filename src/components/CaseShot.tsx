"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  DeviceMockup,
  ScaledMockup,
  naturalSize,
} from "./mockups/DeviceMockup";

export type Shot = { src: string; w: number; h: number };

/** El marco de laptop en tres tallas: la chica evita que se desborde en móvil. */
const SIZES = [
  { className: "flex sm:hidden", width: 280, height: 190 },
  { className: "hidden sm:flex lg:hidden", width: 460, height: 305 },
  { className: "hidden lg:flex", width: 560, height: 372 },
];

/**
 * Una captura del caso dentro de su marco. Al hacer clic se abre a pantalla
 * completa, sola: se cierra con clic fuera o con Escape.
 */
export function CaseShot({
  shots,
  index,
  alt,
}: {
  shots: Shot[];
  index: number;
  alt: string;
}) {
  const [at, setAt] = useState<number | null>(null);
  const open = at !== null;

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAt(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const shot = at === null ? undefined : shots[at];

  return (
    <>
      <button
        type="button"
        onClick={() => setAt(index)}
        aria-label={alt}
        className="flex w-full cursor-zoom-in justify-center overflow-hidden rounded-2xl bg-paper px-4 py-8 transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-paper)_92%,var(--color-ink))]"
      >
        {SIZES.map((slot) => (
          <ScaledMockup
            key={slot.className}
            width={slot.width}
            height={slot.height}
            natural={naturalSize("laptop")}
            className={slot.className}
          >
            <DeviceMockup
              device="laptop"
              src={shots[index].src}
              alt={alt}
              sizes="900px"
            />
          </ScaledMockup>
        ))}
      </button>

      {open &&
        shot &&
        createPortal(
          <div
            role="dialog"
            aria-modal
            aria-label={alt}
            onClick={() => setAt(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/85 p-6 backdrop-blur-sm"
          >
            <Image
              src={shot.src}
              alt={alt}
              width={shot.w}
              height={shot.h}
              sizes="92vw"
              className="max-h-[86vh] w-auto max-w-[92vw] rounded-2xl object-contain"
            />
          </div>,
          document.body,
        )}
    </>
  );
}
