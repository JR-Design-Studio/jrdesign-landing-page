"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Piezas del trabajo publicado, tal como salen del sitio en producción. */
const SHOTS = [
  { src: "/hero/arqademy.webp", alt: "Arqademy" },
  { src: "/hero/meaningful.webp", alt: "Meaningful Interiors" },
  { src: "/hero/edunnova.webp", alt: "Edunnova" },
  { src: "/hero/legal-laboral.webp", alt: "Legal Laboral Abogados" },
];


const EVERY = 4000;

/** Las piezas se relevan solas, con un fundido entre una y la siguiente. */
export function WorkCarousel() {
  const [at, setAt] = useState(0);
  const [offset, setOffset] = useState(0);
  const from = useRef<number | null>(null);
  const [dragging, setDragging] = useState(false);
  // Los puntos se montan sobre la pieza: se aclaran u oscurecen según ella.
  const [onDark, setOnDark] = useState(false);
  const [zoom, setZoom] = useState(false);
  const zoomFrom = useRef<number | null>(null);
  const [zoomDrag, setZoomDrag] = useState(false);
  const [zoomOffset, setZoomOffset] = useState(0);
  const zoomMoved = useRef(false);

  const go = (step: number) =>
    setAt((v) => (v + step + SHOTS.length) % SHOTS.length);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    from.current = event.clientX;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (from.current === null) return;
    setOffset(event.clientX - from.current);
  };

  // Un tirón corto no cuenta: la pieza cambia a partir de 60px de recorrido.
  const onPointerUp = () => {
    const dragged = Math.abs(offset) > 6;
    if (from.current !== null && Math.abs(offset) > 60) go(offset < 0 ? 1 : -1);
    else if (from.current !== null && !dragged) setZoom(true);
    from.current = null;
    setDragging(false);
    setOffset(0);
  };

  // Mide la franja inferior de la pieza en turno para elegir el color del punto.
  useEffect(() => {
    const img = new window.Image();
    img.src = SHOTS[at].src;
    img.onload = () => {
      const w = 32;
      const h = 8;
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      const strip = img.naturalHeight * 0.12;
      ctx.drawImage(
        img,
        0,
        img.naturalHeight - strip,
        img.naturalWidth,
        strip,
        0,
        0,
        w,
        h,
      );
      const { data } = ctx.getImageData(0, 0, w, h);
      let sum = 0;
      for (let i = 0; i < data.length; i += 4) {
        sum += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      }
      setOnDark(sum / (data.length / 4) < 128);
    };
  }, [at]);

  useEffect(() => {
    if (!zoom) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setZoom(false);
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [zoom]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (dragging || zoom) return;
    const id = window.setInterval(
      () => setAt((v) => (v + 1) % SHOTS.length),
      EVERY,
    );
    return () => window.clearInterval(id);
  }, [at, dragging, zoom]);

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-[28px] bg-paper ${
        dragging ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {SHOTS.map((shot, i) => (
        <Image
          key={shot.src}
          src={shot.src}
          alt={shot.alt}
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 720px"
          priority={i === 0}
          draggable={false}
          style={
            i === at ? { transform: `translateX(${offset * 0.25}px)` } : undefined
          }
          className={`object-cover transition-opacity duration-700 ease-out ${
            i === at ? "opacity-100" : "opacity-0"
          } ${offset === 0 ? "transition-transform" : ""}`}
        />
      ))}

      <button
        type="button"
        aria-label="Anterior"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => go(-1)}
        className={`absolute left-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
          onDark ? "bg-white/25 hover:bg-white/40" : "bg-ink/40 hover:bg-ink/60"
        }`}
      >
        <Chevron className="size-4 rotate-90 text-white" />
      </button>

      <button
        type="button"
        aria-label="Siguiente"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={() => go(1)}
        className={`absolute right-4 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full backdrop-blur-sm transition-colors ${
          onDark ? "bg-white/25 hover:bg-white/40" : "bg-ink/40 hover:bg-ink/60"
        }`}
      >
        <Chevron className="size-4 -rotate-90 text-white" />
      </button>

      <div className="absolute inset-x-0 bottom-5 flex justify-center gap-2">
        {SHOTS.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            aria-label={shot.alt}
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => setAt(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === at
                ? `w-6 ${onDark ? "bg-white" : "bg-ink"}`
                : `w-1.5 ${onDark ? "bg-white/40 hover:bg-white/70" : "bg-ink/30 hover:bg-ink/50"}`
            }`}
          />
        ))}
      </div>

      {zoom &&
        createPortal(
          <div
          role="dialog"
          aria-modal
          aria-label={SHOTS[at].alt}
          onPointerDown={(event) => {
            event.stopPropagation();
            zoomFrom.current = event.clientX;
            zoomMoved.current = false;
            setZoomDrag(true);
          }}
          onPointerMove={(event) => {
            if (zoomFrom.current === null) return;
            const delta = event.clientX - zoomFrom.current;
            if (Math.abs(delta) > 6) zoomMoved.current = true;
            setZoomOffset(delta);
          }}
          onPointerUp={() => {
            if (zoomFrom.current !== null && Math.abs(zoomOffset) > 60) {
              go(zoomOffset < 0 ? 1 : -1);
            }
            zoomFrom.current = null;
            setZoomDrag(false);
            setZoomOffset(0);
          }}
          onPointerCancel={() => {
            zoomFrom.current = null;
            setZoomDrag(false);
            setZoomOffset(0);
          }}
          onClick={() => {
            // El clic llega después de soltar: si hubo arrastre, no cierra.
            if (zoomMoved.current) {
              zoomMoved.current = false;
              return;
            }
            setZoom(false);
          }}
          className={`fixed inset-0 z-[100] flex touch-pan-y select-none items-center justify-center bg-ink/85 p-6 backdrop-blur-sm ${
            zoomDrag ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          <Image
            src={SHOTS[at].src}
            alt={SHOTS[at].alt}
            width={2048}
            height={2048}
            unoptimized
            draggable={false}
            sizes="90vw"
            style={{ transform: `translateX(${zoomOffset * 0.25}px)` }}
            className="max-h-[78vh] w-auto max-w-[92vw] rounded-2xl object-contain"
          />

          <div
            onClick={(event) => event.stopPropagation()}
            className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4"
          >
            <button
              type="button"
              aria-label="Anterior"
              onClick={() => go(-1)}
              className="flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/35"
            >
              <Chevron className="size-4 rotate-90 text-white" />
            </button>

            <div className="flex items-center gap-2">
              {SHOTS.map((shot, i) => (
                <button
                  key={shot.src}
                  type="button"
                  aria-label={shot.alt}
                  onClick={() => setAt(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === at ? "w-6 bg-white" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              aria-label="Siguiente"
              onClick={() => go(1)}
              className="flex size-11 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/35"
            >
              <Chevron className="size-4 -rotate-90 text-white" />
            </button>
          </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 18 18"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M3.5 6.5 9 12l5.5-5.5" />
    </svg>
  );
}
