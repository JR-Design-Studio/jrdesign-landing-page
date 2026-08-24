import Link from "next/link";
import Image from "next/image";
import { nav, site, type Locale } from "@/lib/i18n";
import { Readout } from "./Readout";

const copy = {
  tagline: {
    es: "Estudio de diseño y desarrollo web. Guadalajara, México — trabajamos en remoto.",
    en: "Web design and development studio. Guadalajara, Mexico — working remotely.",
  },
  write: { es: "Escríbenos", en: "Write to us" },
  rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  operating: { es: "Operando desde", en: "Running since" },
};

/** Cierre del chasis: mismos materiales que el riel superior. */
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-auto bg-ink text-paper">
      <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/logo-white.svg"
              alt={site.name}
              width={667}
              height={425}
              className="h-9 w-auto"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-paper/80">
              {copy.tagline[locale]}
            </p>
          </div>

          <nav
            aria-label={locale === "es" ? "Pie de página" : "Footer"}
            className="flex flex-col gap-3"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="plate text-paper/80 transition-colors hover:text-white"
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col items-start gap-2">
            <h2 className="plate text-paper/70">{copy.write[locale]}</h2>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="num text-lg transition-colors hover:text-red"
            >
              {site.whatsapp}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-paper/85 underline decoration-white/25 transition-colors hover:decoration-red"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[0.7rem] text-paper/70 sm:flex-row sm:items-center sm:justify-between">
          <span className="num">
            © {new Date().getFullYear()} {site.name}. {copy.rights[locale]}
          </span>
          <span className="plate flex items-center gap-3">
            {copy.operating[locale]}
            <Readout value={site.since} className="text-paper" />
            <span className="text-paper/60">· {site.city[locale]}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
