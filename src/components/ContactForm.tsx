"use client";

import { useActionState, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/lib/actions";
import type { Locale } from "@/lib/i18n";

const copy = {
  blockContact: {
    es: "Información de contacto",
    en: "Contact information",
  },
  blockProject: {
    es: "Información del proyecto",
    en: "Project information",
  },
  name: { es: "Nombre", en: "First name" },
  lastName: { es: "Apellido", en: "Last name" },
  email: { es: "Correo electrónico*", en: "Email*" },
  phone: { es: "Número de teléfono", en: "Phone number" },
  company: { es: "Empresa", en: "Company" },
  message: {
    es: "Cuéntanos sobre tu proyecto",
    en: "Tell us about your project",
  },
  send: { es: "Enviar", en: "Send" },
  sending: { es: "Enviando…", en: "Sending…" },
};

/** Lo que se puede pedir, en los mismos términos de la página de servicios. */
const services: { value: string; label: Record<Locale, string> }[] = [
  { value: "sitio", label: { es: "Sitio web a la medida", en: "Custom website" } },
  { value: "landing", label: { es: "Landing page", en: "Landing page" } },
  { value: "ecommerce", label: { es: "Tienda en línea", en: "Online store" } },
  { value: "marca", label: { es: "Identidad de marca", en: "Brand identity" } },
  {
    value: "integraciones",
    label: { es: "Integración con un sistema", en: "System integration" },
  },
  {
    value: "mantenimiento",
    label: { es: "Mantenimiento y mejoras", en: "Maintenance and improvements" },
  },
];

/** El id que usa la página de servicios y su casilla equivalente aquí. */
const FROM_SERVICES: Record<string, string> = {
  sitio: "sitio",
  landing: "landing",
  ecommerce: "ecommerce",
  desarrollo: "integraciones",
  marca: "marca",
  mantenimiento: "mantenimiento",
};

const initial: ContactState = { ok: false, message: "" };

function Submit({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-lg border border-red-deep bg-red px-6 py-3 text-[1.1875rem] font-light leading-none text-white transition-[background-color] duration-300 hover:bg-[color-mix(in_srgb,var(--color-red)_88%,#fff)] disabled:opacity-50"
    >
      {pending ? copy.sending[locale] : copy.send[locale]}
    </button>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, formAction] = useActionState(submitContact, initial);
  const asked = useSearchParams().get("servicio");
  const preset = asked ? FROM_SERVICES[asked] : undefined;
  const startedAt = useRef<HTMLInputElement>(null);

  // Marca cuándo empezó a llenarse: los bots contestan en milisegundos.
  function stamp() {
    const el = startedAt.current;
    if (el && !el.value) el.value = String(Date.now());
  }

  const field =
    "w-full rounded-lg border border-ink/20 bg-white px-4 py-3 text-[1.0625rem] outline-none transition-colors placeholder:text-muted focus:border-red";
  const block = "mb-2 text-lg font-medium text-ink";

  if (state.ok && state.message) {
    return (
      <div className="rounded-2xl border border-ink/15 p-8">
        <p className="font-wide text-2xl font-light">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      key={preset ?? "sin-servicio"}
      action={formAction}
      onFocusCapture={stamp}
      className="grid gap-12"
      noValidate
    >
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="startedAt" ref={startedAt} defaultValue="" />
      <div aria-hidden className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="grid gap-8">
        <legend className={block}>{copy.blockContact[locale]}</legend>

        <div className="grid gap-7 sm:grid-cols-2">
          <div>
            <input
              id="name"
              name="name"
              placeholder={copy.name[locale]}
              aria-label={copy.name[locale]}
              required
              autoComplete="given-name"
              className={field}
              aria-describedby={state.errors?.name ? "err-name" : undefined}
            />
            {state.errors?.name && (
              <p id="err-name" className="mt-1.5 text-sm text-red">
                {state.errors.name}
              </p>
            )}
          </div>

          <div>
            <input
              id="lastName"
              name="lastName"
              placeholder={copy.lastName[locale]}
              aria-label={copy.lastName[locale]}
              autoComplete="family-name"
              className={field}
            />
          </div>

          <div>
            <input
              id="email"
              name="email"
              placeholder={copy.email[locale]}
              aria-label={copy.email[locale]}
              type="email"
              required
              autoComplete="email"
              className={field}
              aria-describedby={state.errors?.email ? "err-email" : undefined}
            />
            {state.errors?.email && (
              <p id="err-email" className="mt-1.5 text-sm text-red">
                {state.errors.email}
              </p>
            )}
          </div>

          <div>
            <input
              id="phone"
              name="phone"
              placeholder={copy.phone[locale]}
              aria-label={copy.phone[locale]}
              type="tel"
              autoComplete="tel"
              className={field}
            />
          </div>

          <div className="sm:col-span-2">
            <input
              id="company"
              name="company"
              placeholder={copy.company[locale]}
              aria-label={copy.company[locale]}
              autoComplete="organization"
              className={field}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="grid gap-8">
        <legend className={block}>{copy.blockProject[locale]}</legend>

        <div className="grid gap-3 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service.value}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-ink/15 px-4 py-3 text-[1.0625rem] transition-colors hover:border-ink/35 has-checked:border-red has-checked:bg-red/[0.06]"
            >
              <input
                type="checkbox"
                name="services"
                value={service.value}
                defaultChecked={service.value === preset}
                className="size-4 accent-[var(--color-red)]"
              />
              {service.label[locale]}
            </label>
          ))}
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block text-lg font-medium text-ink">
            {copy.message[locale]}
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            className={`${field} resize-none`}
            aria-describedby={state.errors?.message ? "err-message" : undefined}
          />
          {state.errors?.message && (
            <p id="err-message" className="mt-1.5 text-sm text-red">
              {state.errors.message}
            </p>
          )}
        </div>
      </fieldset>

      {!state.ok && state.message && (
        <p role="alert" className="text-sm text-red">
          {state.message}
        </p>
      )}

      <div>
        <Submit locale={locale} />
      </div>
    </form>
  );
}
