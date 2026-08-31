import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/ContactForm";
import Image from "next/image";
import { SocialIcon } from "@/components/SocialIcon";
import { isLocale, locales, site, type Locale } from "@/lib/i18n";

type Params = Promise<{ locale: string }>;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const copy = {
  title: { es: "Contacto", en: "Contact" },
  lede: {
    es: "Nos encantaría ser parte de tu crecimiento. Escríbenos y tendrás respuesta lo antes posible.",
    en: "We would love to be part of your growth. Write to us and you will hear back as soon as possible.",
  },
  email: { es: "Correo", en: "Email" },
  social: { es: "Redes", en: "Social" },
  where: { es: "Dónde estamos", en: "Where we are" },
  whereBody: {
    es: "Somos un equipo remoto con base en Guadalajara, México. Trabajamos con clientes en todo el país y en Estados Unidos.",
    en: "We are a remote team based in Guadalajara, Mexico. We work with clients across the country and in the United States.",
  },
  whatsapp: { es: "WhatsApp", en: "WhatsApp" },
};

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { locale } = await params;
  const l: Locale = locale === "en" ? "en" : "es";
  return {
    title: l === "es" ? "Contacto" : "Contact",
    description:
      l === "es"
        ? "Escríbenos por WhatsApp o déjanos el contexto de tu proyecto. Contestamos dentro de un día hábil."
        : "Message us on WhatsApp or send the context of your project. We reply within one business day.",
    alternates: {
      canonical: `/${l}/contacto`,
      languages: {
        es: "/es/contacto",
        en: "/en/contacto",
        "x-default": "/es/contacto",
      },
    },
  };
}

export default async function ContactPage({ params }: { params: Params }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  const social = [
    ["whatsapp", site.whatsappHref, "WhatsApp"],
    ["instagram", site.social.instagram, "Instagram"],
    ["facebook", site.social.facebook, "Facebook"],
    ["tiktok", site.social.tiktok, "TikTok"],
  ] as const;

  return (
    <div className="mx-auto max-w-[86rem] px-5 py-14 sm:px-8 sm:py-20">
      <div className="grid items-start gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-20">
        <div className="order-2 lg:order-none">
      <header>
        <h1 className="font-wide max-w-[26ch] text-[clamp(1.9rem,4vw,3.6rem)] font-light leading-[1.05] tracking-tight text-ink">
          {copy.title[l]}
        </h1>
        <p className="mt-5 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
          {copy.lede[l]}
        </p>
      </header>

          <div className="mt-12">
            <Suspense fallback={null}>
              <ContactForm locale={l} />
            </Suspense>
          </div>
        </div>

        <aside className="order-1 flex flex-col gap-6 lg:order-none lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[28px] bg-paper">
            <Image
              src="/contacto.png"
              alt={site.name}
              width={2000}
              height={2000}
              sizes="(max-width: 1024px) 100vw, 520px"
              className="h-64 w-full object-cover sm:h-80 lg:h-[22rem]"
              priority
            />
          </div>

          <div className="overflow-hidden rounded-2xl bg-paper">
            <div className="grid gap-8 px-6 py-6 sm:grid-cols-2">
              <div>
                <h2 className="text-lg font-medium text-ink">{copy.email[l]}</h2>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-3 block text-[1.0625rem] text-ink transition-colors hover:text-red"
                >
                  {site.email}
                </a>
                <a
                  href={site.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="num mt-2 block text-[1.0625rem] text-ink transition-colors hover:text-red"
                >
                  {site.whatsapp}
                </a>
              </div>

              <div>
                <h2 className="text-lg font-medium text-ink">{copy.social[l]}</h2>
                <div className="mt-4 flex items-center gap-5">
                  {social.map(([key, href, label]) => (
                    <a
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="text-ink-soft transition-colors hover:text-red"
                    >
                      <SocialIcon name={key} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-ink/15 px-6 py-6">
              <h2 className="text-lg font-medium text-ink">{copy.where[l]}</h2>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-ink-soft">
                {copy.whereBody[l]}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
