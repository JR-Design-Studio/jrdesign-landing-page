import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, Newsreader } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

// Display y UI: Archivo variable, con eje de ancho para las caps del logotipo.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

// Prosa de los casos: una face de lectura, no la misma del display.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const es = locale !== "en";

  return {
    metadataBase: new URL(site.url),
    title: {
      default: es
        ? "JR Design — Estudio de diseño y desarrollo web"
        : "JR Design — Web design and development studio",
      template: "%s — JR Design",
    },
    description: es
      ? "Estudio de diseño y desarrollo web en Guadalajara. Sitios, tiendas en línea e integraciones con el sistema que ya usas."
      : "Web design and development studio in Guadalajara, Mexico. Websites, online stores and integrations with the systems you already run.",
    alternates: {
      canonical: `/${es ? "es" : "en"}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: es ? "es_MX" : "en_US",
      url: `/${es ? "es" : "en"}`,
    },
    twitter: { card: "summary_large_image" },
    icons: { icon: "/favicon.ico" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const current = locale as Locale;

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/logo.svg`,
    foundingDate: String(site.since),
    email: site.email,
    telephone: site.whatsapp,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guadalajara",
      addressRegion: "Jalisco",
      addressCountry: "MX",
    },
    areaServed: ["MX", "US"],
    knowsLanguage: ["es-MX", "en-US"],
  };

  return (
    <html
      lang={current}
      className={`${archivo.variable} ${newsreader.variable} h-full`}
    >
      <head>
        {/* Sin JS el revelado no se dispara: el contenido debe verse igual. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1 !important;transform:none !important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="tracking-label sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-[0.7rem] focus:text-white"
        >
          {current === "en" ? "Skip to content" : "Ir al contenido"}
        </a>
        <Header locale={current} />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer locale={current} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}
