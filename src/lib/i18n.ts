export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export type Localized = Record<Locale, string>;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function t(value: Localized, locale: Locale): string {
  return value[locale];
}

export const site = {
  name: "JR Design",
  url: "https://jrdesign.com.mx",
  whatsapp: "+52 33 2654 1643",
  whatsappHref:
    "https://wa.me/523326541643?text=" +
    encodeURIComponent("Hola, vi su sitio y quiero platicar de un proyecto."),
  email: "hola@jrdesign.com.mx",
  city: { es: "Guadalajara, México", en: "Guadalajara, Mexico" } as Localized,
  since: 2018,
  social: {
    instagram: "https://www.instagram.com/jr_design.mx/",
    facebook: "https://www.facebook.com/people/JR-Design/100057438648602/",
    tiktok: "https://www.tiktok.com/@juan_lizaola",
  },
};

export const nav = [
  { href: "portafolio", label: { es: "Portafolio", en: "Work" } as Localized },
  {
    href: "servicios",
    label: { es: "Servicios", en: "Services" } as Localized,
  },
  { href: "nosotros", label: { es: "Nosotros", en: "About" } as Localized },
  { href: "contacto", label: { es: "Contacto", en: "Contact" } as Localized },
];

export const ui = {
  cta: { es: "Empezar un proyecto", en: "Start a project" } as Localized,
  ctaShort: { es: "Escríbenos", en: "Get in touch" } as Localized,
  whatsapp: {
    es: "Escribir por WhatsApp",
    en: "Message us on WhatsApp",
  } as Localized,
  viewCase: { es: "Ver el caso", en: "Read the case" } as Localized,
  allCases: { es: "Ver los 9 casos", en: "See all 9 cases" } as Localized,
  next: { es: "Siguiente caso", en: "Next case" } as Localized,
  process: { es: "Proceso", en: "Process" } as Localized,
  result: { es: "Resultado", en: "Outcome" } as Localized,
  year: { es: "Año", en: "Year" } as Localized,
  sector: { es: "Sector", en: "Sector" } as Localized,
  scope: { es: "Alcance", en: "Scope" } as Localized,
  stack: { es: "Stack", en: "Stack" } as Localized,
};
