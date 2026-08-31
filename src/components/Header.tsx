"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { locales, nav, site, type Locale } from "@/lib/i18n";
import { Isotipo } from "./Isotipo";
import {
  ArrowUpRightIcon,
  type ArrowUpRightIconHandle,
} from "./ui/arrow-up-right";
import { MenuIcon, type MenuIconHandle } from "./ui/menu";
import { AnimatePresence, motion } from "motion/react";

/** Los controles que viven en el riel; Contacto vive en el botón. */
const order = ["servicios", "portafolio", "nosotros"];
const primary = order.map((href) => nav.find((item) => item.href === href)!);

/** Imán suave: el control se acerca al cursor y regresa a su marca. */
function useMagnetic<T extends HTMLElement>(strength = 9) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(hover: hover)").matches) return;

    const move = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = (event.clientX - (box.left + box.width / 2)) / box.width;
      const y = (event.clientY - (box.top + box.height / 2)) / box.height;
      el.style.transform = `translate(${x * strength}px, ${y * strength * 0.6}px)`;
    };
    const reset = () => {
      el.style.transform = "";
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", reset);
    };
  }, [strength]);

  return ref;
}

function Globe() {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden
      className="size-3.5"
      fill="currentColor"
    >
      <path d="M224.3 161.6a101.9 101.9 0 0 0 0-67.2l-.3-.8a102 102 0 0 0-192 0l-.3.8a101.9 101.9 0 0 0 0 67.2l.3.8a102 102 0 0 0 192 .1ZM99.7 166h56.6c-5.7 18.3-15.4 34.7-28.3 47.3c-12.9-12.6-22.6-29-28.3-47.3Zm-3-12a126.5 126.5 0 0 1 0-52h62.6a126.5 126.5 0 0 1 0 52ZM38 128a89.4 89.4 0 0 1 3.8-26h42.6a142 142 0 0 0 0 52H41.8a89.4 89.4 0 0 1-3.8-26Zm118.3-38H99.7c5.7-18.3 15.4-34.7 28.3-47.3c12.9 12.6 22.6 29 28.3 47.3Zm15.4 12h42.5a90.8 90.8 0 0 1 0 52h-42.5a148.1 148.1 0 0 0 0-52Zm37.9-12h-40.7A124 124 0 0 0 141 39a90.1 90.1 0 0 1 68.6 51ZM115 39a124 124 0 0 0-27.9 51H46.4A90.1 90.1 0 0 1 115 39ZM46.4 166h40.7a125 125 0 0 0 27.9 51.1A90.5 90.5 0 0 1 46.4 166Zm94.6 51.1a125 125 0 0 0 27.9-51.1h40.7a90.5 90.5 0 0 1-68.6 51.1Z" />
    </svg>
  );
}

function MagneticLink({
  href,
  children,
  className,
  hrefLang,
  ...rest
}: React.ComponentProps<typeof Link>) {
  const ref = useMagnetic<HTMLAnchorElement>();
  return (
    <Link ref={ref} href={href} hrefLang={hrefLang} className={className} {...rest}>
      {children}
    </Link>
  );
}

/** Riel superior del chasis: marca, controles y la señal del control activo. */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const arrowRef = useRef<ArrowUpRightIconHandle>(null);
  const menuIconRef = useRef<MenuIconHandle>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [panelTop, setPanelTop] = useState(0);
  const [pill, setPill] = useState<{ x: number; y: number; w: number; h: number } | null>(
    null,
  );

  // El resalte se muda a la caja del control apuntado y se arrastra hasta ella.
  const trackPill = (target: EventTarget & HTMLElement) => {
    const nav = navRef.current;
    if (!nav) return;
    const a = target.getBoundingClientRect();
    const b = nav.getBoundingClientRect();
    setPill({ x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height });
  };

  const other = locales.find((l) => l !== locale) as Locale;
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${other}`);

  // La píldora se encoge en cuanto la página se mueve un poco.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // El menú móvil y el desplegable se cierran al cambiar de ruta.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) menuIconRef.current?.startAnimation();
    else menuIconRef.current?.stopAnimation();
  }, [open]);

  // El panel nace donde termina el riel y llega hasta el borde inferior.
  useEffect(() => {
    if (!open) return;
    const place = () => {
      const box = barRef.current?.getBoundingClientRect();
      if (box) setPanelTop(box.bottom + 8);
    };
    place();
    window.addEventListener("resize", place);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("resize", place);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass = (active: boolean) =>
    `relative z-10 inline-flex items-center rounded-xl px-3.5 py-3.5 text-[1.1875rem] font-light leading-none tracking-[-0.01em] text-ink transition-[color,transform] duration-300 ${
      active ? "text-ink" : ""
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        ref={barRef}
        data-scrolled={scrolled || undefined}
        className="relative z-50 flex w-full max-w-[86rem] items-center justify-between gap-4 rounded-2xl border border-ink/15 bg-white px-4 py-3 text-ink transition-[width,max-width,border-radius] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-5 md:grid md:grid-cols-[1fr_auto_1fr] data-[scrolled]:w-[80%] data-[scrolled]:py-2.5"
      >
        <Link
          href={`/${locale}`}
          className="flex shrink-0 items-center pl-1 text-ink transition-colors"
          aria-label={`${site.name} — ${locale === "es" ? "inicio" : "home"}`}
        >
          <Isotipo className="h-8 w-auto" />
        </Link>

        <nav
          ref={navRef}
          aria-label={locale === "es" ? "Principal" : "Main"}
          onPointerLeave={() => setPill(null)}
          onBlur={(event) => {
            if (!navRef.current?.contains(event.relatedTarget as Node)) setPill(null);
          }}
          className="relative hidden items-center gap-1 md:flex"
        >
          <span
            aria-hidden
            style={
              pill
                ? {
                    transform: `translate3d(${pill.x}px, ${pill.y}px, 0)`,
                    width: pill.w,
                    height: pill.h,
                  }
                : undefined
            }
            className={`pointer-events-none absolute left-0 top-0 rounded-xl border border-ink/15 bg-ink/[0.07] transition-[transform,width,height,opacity] duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              pill ? "opacity-100" : "opacity-0"
            }`}
          />

          {primary.map((item) => {
            const href = `/${locale}/${item.href}`;
            const active = pathname.startsWith(href);
            return (
              <MagneticLink
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                onPointerEnter={(event) => trackPill(event.currentTarget)}
                onFocus={(event) => trackPill(event.currentTarget)}
                className={linkClass(active)}
              >
                {item.label[locale]}
              </MagneticLink>
            );
          })}

          <MagneticLink
            href={swapped}
            hrefLang={other}
            onPointerEnter={(event) => trackPill(event.currentTarget)}
            onFocus={(event) => trackPill(event.currentTarget)}
            className={`${linkClass(false)} gap-1.5 uppercase`}
          >
            {other}
            <Globe />
          </MagneticLink>
        </nav>

        <div className="flex items-center gap-5 md:justify-end">
          <Link
            href={`/${locale}/contacto`}
            onPointerEnter={() => arrowRef.current?.startAnimation()}
            onPointerLeave={() => arrowRef.current?.stopAnimation()}
            className="hidden items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)] sm:inline-flex"
          >
            {locale === "es" ? "Contacto" : "Contact"}
            <ArrowUpRightIcon ref={arrowRef} size={20} className="shrink-0" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            aria-label={locale === "es" ? "Menú" : "Menu"}
            className="relative flex size-10 shrink-0 items-center justify-center rounded-lg text-ink transition-colors hover:bg-ink/[0.07] md:hidden"
          >
            <MenuIcon ref={menuIconRef} size={24} className="flex" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="cortina"
              aria-hidden
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-30 bg-paper/20 backdrop-blur-[3px] md:hidden"
            />
            <motion.nav
              key="panel"
              id="menu-movil"
              aria-label={locale === "es" ? "Principal móvil" : "Mobile"}
              style={{ top: panelTop }}
              initial={{ y: "-110%" }}
              animate={{ y: 0 }}
              exit={{ y: "-110%" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-3 z-40 max-h-[calc(100dvh-7rem)] overflow-y-auto rounded-3xl border border-ink/15 bg-white px-5 pb-5 pt-2 sm:inset-x-5 md:hidden"
            >
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={`/${locale}/${item.href}`}
                  onClick={() => setOpen(false)}
                  className="font-wide block border-b border-ink/10 py-4 text-2xl font-semibold"
                >
                  {item.label[locale]}
                </Link>
              ))}

              <Link
                href={swapped}
                hrefLang={other}
                onClick={() => setOpen(false)}
                className="font-wide flex items-center gap-2 border-b border-ink/10 py-4 text-2xl font-semibold uppercase"
              >
                {other}
                <Globe />
              </Link>

              <Link
                href={`/${locale}/contacto`}
                onClick={() => setOpen(false)}
                className="mt-5 flex items-center justify-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white"
              >
                {locale === "es" ? "Contacto" : "Contact"}
                <ArrowUpRightIcon size={20} className="shrink-0" />
              </Link>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
