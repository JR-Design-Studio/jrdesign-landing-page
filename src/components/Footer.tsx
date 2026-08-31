import Image from "next/image";
import Link from "next/link";
import { locales, nav, site, ui, type Locale } from "@/lib/i18n";
import { ArrowLink } from "./ArrowLink";
import { Year } from "./Year";
import { SocialIcon } from "./SocialIcon";

const copy = {
  tagline: {
    es: "Estudio de diseño y desarrollo web en Guadalajara. Diseño web, identidad de marca, tiendas en línea y desarrollo a la medida.",
    en: "Web design and development studio in Guadalajara. Web design, brand identity, online stores and custom development.",
  },
  menu: { es: "Navegación", en: "Navigation" },
  write: { es: "Contacto", en: "Contact" },
  rights: { es: "Todos los derechos reservados.", en: "All rights reserved." },
};

/** Cierre del chasis: marca a la izquierda, índices a la derecha, firma abajo. */
export function Footer({ locale }: { locale: Locale }) {
  const social = [
    ["whatsapp", site.whatsappHref, "WhatsApp"],
    ["instagram", site.social.instagram, "Instagram"],
    ["facebook", site.social.facebook, "Facebook"],
    ["tiktok", site.social.tiktok, "TikTok"],
  ] as const;

  return (
    <footer className="mt-auto rounded-t-[28px] bg-ink text-paper">
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr] lg:gap-16">
          {/* Marca */}
          <div className="flex flex-col items-start">
            <Link href={`/${locale}`} aria-label={site.name}>
              <Image
                src="/logo-white.svg"
                alt={site.name}
                width={667}
                height={425}
                className="h-14 w-auto"
              />
            </Link>

            <p className="mt-8 max-w-[40ch] text-lg leading-relaxed text-paper/70">
              {copy.tagline[locale]}
            </p>

            <ArrowLink
              href={`/${locale}/contacto`}
              className="mt-8 inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
            >
              {ui.cta[locale]}
            </ArrowLink>
          </div>

          {/* Navegación */}
          <nav aria-label={copy.menu[locale]} className="flex flex-col gap-4">
            <h2 className="text-base text-paper/50">{copy.menu[locale]}</h2>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}/${item.href}`}
                className="text-[1.0625rem] text-paper/85 transition-colors hover:text-white"
              >
                {item.label[locale]}
              </Link>
            ))}
          </nav>

          {/* Contacto */}
          <div className="flex flex-col gap-4">
            <h2 className="text-base text-paper/50">{copy.write[locale]}</h2>
            <a
              href={`mailto:${site.email}`}
              className="text-[1.0625rem] text-paper/85 transition-colors hover:text-white"
            >
              {site.email}
            </a>
            <a
              href={site.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="num text-[1.0625rem] text-paper/85 transition-colors hover:text-white"
            >
              {site.whatsapp}
            </a>
            <span className="text-[1.0625rem] text-paper/50">
              {site.city[locale]}
            </span>
          </div>
        </div>

        {/* Firma */}
        <div className="mt-16 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-paper/50">
            © <Year initial={new Date().getFullYear()} /> {site.name}.{" "}
            {copy.rights[locale]}
          </span>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 text-paper/70">
              <Globe />
              {locales.map((code) => (
                <Link
                  key={code}
                  href={`/${code}`}
                  hrefLang={code}
                  aria-current={code === locale ? "page" : undefined}
                  className={`text-[1.0625rem] uppercase transition-colors hover:text-white ${
                    code === locale ? "text-white" : ""
                  }`}
                >
                  {code}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-5">
              {social.map(([key, href, label]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-paper/70 transition-colors hover:text-white"
                >
                  <SocialIcon name={key} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/** El globo que acompaña al cambio de idioma, igual que en el riel superior. */
function Globe() {
  return (
    <svg viewBox="0 0 256 256" aria-hidden fill="currentColor" className="size-4">
      <path d="M224.3 161.6a101.9 101.9 0 0 0 0-67.2l-.3-.8a102 102 0 0 0-192 0l-.3.8a101.9 101.9 0 0 0 0 67.2l.3.8a102 102 0 0 0 192 .1ZM99.7 166h56.6c-5.7 18.3-15.4 34.7-28.3 47.3c-12.9-12.6-22.6-29-28.3-47.3Zm-3-12a126.5 126.5 0 0 1 0-52h62.6a126.5 126.5 0 0 1 0 52ZM38 128a89.4 89.4 0 0 1 3.8-26h42.6a142 142 0 0 0 0 52H41.8a89.4 89.4 0 0 1-3.8-26Zm118.3-38H99.7c5.7-18.3 15.4-34.7 28.3-47.3c12.9 12.6 22.6 29 28.3 47.3Zm15.4 12h42.5a90.8 90.8 0 0 1 0 52h-42.5a148.1 148.1 0 0 0 0-52Zm37.9-12h-40.7A124 124 0 0 0 141 39a90.1 90.1 0 0 1 68.6 51ZM115 39a124 124 0 0 0-27.9 51H46.4A90.1 90.1 0 0 1 115 39ZM46.4 166h40.7a125 125 0 0 0 27.9 51.1A90.5 90.5 0 0 1 46.4 166Zm94.6 51.1a125 125 0 0 0 27.9-51.1h40.7a90.5 90.5 0 0 1-68.6 51.1Z" />
    </svg>
  );
}
