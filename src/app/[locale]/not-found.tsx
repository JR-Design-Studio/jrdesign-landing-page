"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, defaultLocale, type Locale } from "@/lib/i18n";

const copy = {
  title: {
    es: "Esta página no existe",
    en: "This page does not exist",
  },
  body: {
    es: "Puede que la hayamos movido en la migración del sitio anterior.",
    en: "We may have moved it during the migration from the old site.",
  },
  work: { es: "Ver el portafolio", en: "See the work" },
  contact: { es: "Contacto", en: "Contact" },
};

/**
 * La 404 vive dentro de [locale], pero el segmento no llega como prop: se lee
 * de la ruta para que el visitante no termine expulsado al otro idioma.
 */
export default function NotFound() {
  const first = usePathname().split("/")[1] ?? "";
  const l: Locale = isLocale(first) ? first : defaultLocale;

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32">
      <p className="num text-base text-red">404</p>
      <h1 className="font-wide mt-4 max-w-[20ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
        {copy.title[l]}
      </h1>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        {copy.body[l]}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link
          href={`/${l}/portafolio`}
          className="inline-flex items-center rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
        >
          {copy.work[l]}
        </Link>
        <Link
          href={`/${l}/contacto`}
          className="inline-flex items-center rounded-lg border border-ink/20 px-6 py-3 text-[1.1875rem] font-light leading-none text-ink transition-colors duration-300 hover:bg-ink/[0.06]"
        >
          {copy.contact[l]}
        </Link>
      </div>
    </div>
  );
}
