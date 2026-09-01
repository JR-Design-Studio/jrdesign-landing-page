import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLink } from "@/components/ArrowLink";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: {
    es: "Tu estudio de confianza desde 2018",
    en: "Your studio of choice since 2018",
  },
  lede: {
    es: "Diseñamos y desarrollamos sitios a la medida para negocios de cualquier tamaño, sin plantillas y sin intermediarios.",
    en: "We design and develop custom websites for businesses of any size, with no templates and no middlemen.",
  },
  statement: {
    es: "Trabajamos en remoto desde Guadalajara con clientes de México y Estados Unidos. Lo que empezó como el trabajo de una persona hoy es un equipo: diseño y programación bajo el mismo techo, así que quien contesta tu correo es quien construye tu sitio.",
    en: "We work remotely from Guadalajara with clients in Mexico and the United States. What began as one person's work is now a team: design and engineering under one roof, so whoever answers your email is the one building your site.",
  },
  beliefTitle: {
    es: "Cada negocio vende distinto, así que cada sitio se arma distinto.",
    en: "Every business sells differently, so every site is built differently.",
  },
  beliefBody: {
    es: "Antes de diseñar entendemos qué vendes y qué te preguntan tus clientes. De ahí sale la estructura; el diseño viene después, con un objetivo claro por pantalla.",
    en: "Before designing we work out what you sell and what your clients always ask. The structure comes from that; design follows, with one clear goal per screen.",
  },
  values: {
    es: [
      {
        t: "Hecho a la medida",
        d: "Nada de plantillas ni constructores por bloques: escribimos el código, así que el sitio queda rápido y sin veinte plugins que actualizar cada mes.",
      },
      {
        t: "Conectado a tu operación",
        d: "Si tu catálogo o tus pedidos están gestionados en un ERP como Odoo, tu sitio web se conecta directamente con él. La información se sincroniza automáticamente, evitando capturas duplicadas y reduciendo errores.",
      },
      {
        t: "Lo administras tú",
        d: "Entregamos el sitio con CMS y capacitación, para que tu equipo edite el contenido sin depender de nosotros.",
      },
      {
        t: "Alcance y precio cerrados",
        d: "La propuesta es clara desde el inicio: incluye qué se realizará, cuánto tiempo tomará y cuál será el costo total. Sin costos ocultos ni cargos inesperados a mitad del proyecto.",
      },
      {
        t: "Avances a la vista",
        d: "En cada etapa hay una reunión: revisas, comentas y aprobamos antes de pasar a la siguiente.",
      },
      {
        t: "Seguimos después del lanzamiento",
        d: "Publicamos con la medición conectada y seguimos disponibles para ajustes y mejoras conforme el negocio cambia.",
      },
    ],
    en: [
      {
        t: "Built from scratch",
        d: "No templates and no block builders: we write the code, so the site stays fast and free of twenty plugins to update every month.",
      },
      {
        t: "Wired to your operation",
        d: "If your catalog or orders are managed through an ERP like Odoo, your website connects directly to it. Information is synced automatically, eliminating duplicate data entry and reducing errors.",
      },
      {
        t: "You run it",
        d: "We hand the site over with a CMS and training, so your team edits the content without depending on us.",
      },
      {
        t: "Fixed scope and price",
        d: "The proposal is clear from the start: it outlines what will be done, how long it will take, and the total cost. No hidden fees or unexpected charges halfway through the project.",
      },
      {
        t: "Progress in the open",
        d: "Each stage has a review: you look at it, comment, and we sign off before moving on.",
      },
      {
        t: "We stay after launch",
        d: "We ship with analytics wired up and remain available for adjustments and improvements as the business changes.",
      },
    ],
  },
  ctaTitle: { es: "¿Trabajamos ", en: "Shall we work " },
  ctaTitleAccent: { es: "juntos", en: "together" },
  ctaTitleTail: { es: "?", en: "?" },
  ctaLede: {
    es: "Cuéntanos qué necesita resolver tu negocio y te devolvemos una propuesta con alcance, tiempos y precio.",
    en: "Tell us what your business needs to solve and we will come back with scope, timeline and price.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    title: l === "es" ? "Nosotros" : "About",
    description:
      l === "es"
        ? "Estudio de diseño y desarrollo web en Guadalajara. Cómo trabajamos y con quién, desde 2018."
        : "A web design and development studio in Guadalajara. How we work and who with, since 2018.",
    alternates: {
      canonical: `/${l}/nosotros`,
      languages: {
        es: "/es/nosotros",
        en: "/en/nosotros",
        "x-default": "/es/nosotros",
      },
    },
  };
}

export default async function AboutPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const stats = [
    {
      v: `+${new Date().getFullYear() - site.since}`,
      k: l === "es" ? "Años de experiencia" : "Years of experience",
    },
    { v: "9", k: l === "es" ? "Casos publicados" : "Published cases" },
    { v: "7", k: l === "es" ? "Sectores" : "Industries" },
  ];

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      {/* Presentación, cifras y retrato */}
      <header className="grid items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div>
          <h1 className="font-wide max-w-[26ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
            {copy.title[l]}
          </h1>
          <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
            {copy.lede[l]}
          </p>

          <dl className="mt-10 grid grid-cols-3 gap-4 sm:gap-8">
            {stats.map((s) => (
              <div key={s.k}>
                <dt className="num font-wide text-[clamp(1.7rem,6vw,3.4rem)] font-light leading-none text-ink">
                  {s.v}
                </dt>
                <dd className="mt-2 text-sm text-muted sm:text-base">{s.k}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex items-end justify-center overflow-hidden rounded-[28px]">
          <Image
            src="/juan-lizaola.webp"
            alt="Juan Lizaola"
            width={375}
            height={666}
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </header>

      {/* Quiénes somos */}
      <section className="mt-20 sm:mt-24">
        <p className="max-w-[62ch] text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.statement[l]}
        </p>
      </section>

      {/* En qué creemos */}
      <section className="mt-20 sm:mt-24">
        <h2 className="font-wide max-w-[24ch] text-[clamp(1.6rem,3.2vw,2.9rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.beliefTitle[l]}
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
          {copy.beliefBody[l]}
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.values[l].map((value) => (
            <div key={value.t} className="rounded-2xl bg-paper p-7">
              <h3 className="text-xl font-medium text-ink">{value.t}</h3>
              <p className="mt-3 text-base leading-relaxed text-ink-soft">
                {value.d}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Cierre */}
      <section className="py-24 text-center">
        <h2 className="font-wide mx-auto max-w-[20ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.ctaTitle[l]}
          <span className="text-red">{copy.ctaTitleAccent[l]}</span>
          {copy.ctaTitleTail[l]}
        </h2>
        <p className="measure mx-auto mt-6 text-lg leading-relaxed text-ink-soft sm:text-xl">
          {copy.ctaLede[l]}
        </p>
        <div className="mt-10 flex justify-center">
          <ArrowLink
            href={`/${l}/contacto`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)]"
          >
            {l === "es" ? "Solicitar una cotización" : "Request a quote"}
          </ArrowLink>
        </div>
      </section>
    </div>
  );
}
