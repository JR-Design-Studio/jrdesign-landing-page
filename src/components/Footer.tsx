import Link from "next/link";
import Image from "next/image";
import { nav, site, type Locale } from "@/lib/i18n";

const copy = {
  tagline: {
    es: "Estudio de diseño y desarrollo web. Guadalajara, México — trabajamos en remoto.",
    en: "Web design and development studio. Guadalajara, Mexico — working remotely.",
  },
  talk: { es: "¿Tienes un proyecto?", en: "Got a project?" },
  rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
  since: { es: "Desde", en: "Since" },
};

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
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

          <nav aria-label="Pie de página" className="flex flex-col gap-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="tracking-label text-[0.68rem] text-paper/80 transition-colors hover:text-white"
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <span className="tracking-label text-[0.62rem] text-paper/85">
              {copy.talk[locale]}
            </span>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg transition-colors hover:text-red"
            >
              {site.whatsapp}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-paper/85 transition-colors hover:text-white"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-paper/15 pt-6 text-[0.68rem] text-paper/85 sm:flex-row sm:items-center sm:justify-between">
          <span className="num">
            © {new Date().getFullYear()} {site.name}. {copy.rights[locale]}
          </span>
          <span className="num tracking-label">
            {copy.since[locale]} {site.since} · {site.city[locale]}
          </span>
        </div>
      </div>
    </footer>
  );
}
