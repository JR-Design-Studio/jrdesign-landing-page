import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

// Una sola familia en todo el sitio: Inter variable, con eje óptico para que
// los tamaños de display aprieten y los de texto respiren.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  axes: ["opsz"],
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
      className={`${inter.variable} h-full`}
    >
      <head>
        {/* La consola solo puede "apagarse" si hay JS para encenderla. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Header locale={current} />
        <main id="contenido" className="flex-1 pt-[5.25rem]">
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
