"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { locales, nav, site, ui, type Locale } from "@/lib/i18n";

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const other = locales.find((l) => l !== locale) as Locale;
  const swapped = pathname.replace(new RegExp(`^/${locale}`), `/${other}`);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-paper/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[86rem] items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <Link
          href={`/${locale}`}
          className="flex items-center gap-2"
          aria-label={`${site.name} — inicio`}
        >
          <Image
            src="/logo.svg"
            alt={site.name}
            width={667}
            height={425}
            priority
            className="h-7 w-auto"
          />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const href = `/${locale}/${item.href}`;
            const active = pathname.startsWith(href);
            return (
              <Link
                key={item.href}
                href={href}
                className={`tracking-label relative text-[0.68rem] transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label[locale]}
                {active && (
                  <span className="absolute -right-2.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-red" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={swapped}
            hrefLang={other}
            className="tracking-label text-[0.68rem] text-ink-soft transition-colors hover:text-ink"
          >
            {other.toUpperCase()}
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className="hidden bg-ink px-4 py-2.5 text-[0.68rem] tracking-label text-white transition-colors hover:bg-red sm:inline-block"
          >
            {ui.ctaShort[locale]}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="tracking-label text-[0.68rem] md:hidden"
          >
            {open ? "Cerrar" : "Menú"}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="menu-movil"
          aria-label="Principal móvil"
          className="border-t border-ink/8 bg-paper px-5 pb-6 pt-2 md:hidden"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={`/${locale}/${item.href}`}
              onClick={() => setOpen(false)}
              className="font-wide block border-b border-ink/8 py-3 text-2xl font-medium"
            >
              {item.label[locale]}
            </Link>
          ))}
          <Link
            href={`/${locale}/contacto`}
            onClick={() => setOpen(false)}
            className="mt-5 block bg-ink px-4 py-3 text-center text-[0.68rem] tracking-label text-white"
          >
            {ui.cta[locale]}
          </Link>
        </nav>
      )}
    </header>
  );
}
