"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, nav, site, ui, type Locale } from "@/lib/i18n";

/** Riel superior del chasis: marca, controles y la señal del control activo. */
export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other = locales.find((l) => l !== locale) as Locale;
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${other}`);

  return (
    <header className="sticky top-0 z-50 bg-ink text-paper">
      <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-3 sm:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center"
          aria-label={`${site.name} — ${locale === "es" ? "inicio" : "home"}`}
        >
          <Image
            src="/logo-white.svg"
            alt={site.name}
            width={667}
            height={425}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => {
            const href = `/${locale}/${item.href}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={item.href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`plate flex items-center gap-2 transition-colors ${
                  active ? "text-white" : "text-paper/70 hover:text-white"
                }`}
              >
                <span
                  aria-hidden
                  className={`size-1.5 rounded-full transition-colors ${
                    active ? "bg-red" : "bg-transparent"
                  }`}
                />
                {item.label[locale]}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={swapped}
            hrefLang={other}
            className="plate text-paper/70 transition-colors hover:text-white"
          >
            {other.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className="plate hidden bg-red px-4 py-2.5 text-white transition-colors hover:bg-red-deep sm:inline-block"
          >
            {ui.ctaShort[locale]}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="plate md:hidden"
          >
            {open
              ? locale === "es"
                ? "Cerrar"
                : "Close"
              : locale === "es"
                ? "Menú"
                : "Menu"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label={locale === "es" ? "Principal móvil" : "Mobile"}
          className="border-t border-white/10 px-5 pb-6 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              onClick={() => setOpen(false)}
              className="font-wide block border-b border-white/10 py-3 text-2xl font-semibold"
            >
              {item.label[locale]}
            </Link>
          ))}
          <Link
            href={`/${locale}/contacto`}
            onClick={() => setOpen(false)}
            className="plate mt-5 block bg-red px-4 py-3 text-center text-white"
          >
            {ui.cta[locale]}
          </Link>
        </nav>
      )}
    </header>
  );
}
