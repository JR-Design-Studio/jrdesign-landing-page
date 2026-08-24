"use client";

import { useActionState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { submitContact, type ContactState } from "@/lib/actions";
import type { Locale } from "@/lib/i18n";

const copy = {
  name: { es: "Nombre", en: "Name" },
  email: { es: "Correo", en: "Email" },
  company: { es: "Empresa (opcional)", en: "Company (optional)" },
  kind: { es: "¿Qué necesitas?", en: "What do you need?" },
  message: {
    es: "Cuéntanos del proyecto",
    en: "Tell us about the project",
  },
  placeholder: {
    es: "Qué vendes, a quién, y qué esperas que haga el sitio.",
    en: "What you sell, who you sell to, and what the site should do.",
  },
  send: { es: "Enviar", en: "Send" },
  sending: { es: "Enviando…", en: "Sending…" },
  privacy: {
    es: "Contestamos dentro de un día hábil. Sin listas de correo.",
    en: "We reply within one business day. No mailing lists.",
  },
};

const kinds: { value: string; label: Record<Locale, string> }[] = [
  { value: "sitio", label: { es: "Sitio web a la medida", en: "Custom website" } },
  { value: "ecommerce", label: { es: "Tienda en línea", en: "Online store" } },
  {
    value: "integraciones",
    label: { es: "Integración con un sistema", en: "System integration" },
  },
  { value: "otro", label: { es: "Otra cosa", en: "Something else" } },
];

const initial: ContactState = { ok: false, message: "" };

function Submit({ locale }: { locale: Locale }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="plate bg-red px-7 py-4 text-white transition-colors hover:bg-red-deep disabled:opacity-50"
    >
      {pending ? copy.sending[locale] : copy.send[locale]}
    </button>
  );
}

export function ContactForm({ locale }: { locale: Locale }) {
  const [state, formAction] = useActionState(submitContact, initial);
  const startedAt = useRef<HTMLInputElement>(null);

  // Marca cuándo empezó a llenarse: los bots contestan en milisegundos.
  function stamp() {
    const el = startedAt.current;
    if (el && !el.value) el.value = String(Date.now());
  }

  const field =
    "w-full border-b border-ink/25 bg-transparent py-2.5 text-base outline-none transition-colors placeholder:text-muted focus:border-red";

  if (state.ok && state.message) {
    return (
      <div className="border border-ink/15 bg-white p-8">
        <p className="font-wide text-2xl font-semibold">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      action={formAction}
      onFocusCapture={stamp}
      className="grid gap-7"
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

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="plate text-muted">
            {copy.name[locale]}
          </label>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={field}
            aria-describedby={state.errors?.name ? "err-name" : undefined}
          />
          {state.errors?.name && (
            <p id="err-name" className="mt-1.5 text-xs text-red">
              {state.errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="plate text-muted">
            {copy.email[locale]}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={field}
            aria-describedby={state.errors?.email ? "err-email" : undefined}
          />
          {state.errors?.email && (
            <p id="err-email" className="mt-1.5 text-xs text-red">
              {state.errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-7 sm:grid-cols-2">
        <div>
          <label
            htmlFor="company"
            className="plate text-muted"
          >
            {copy.company[locale]}
          </label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={field}
          />
        </div>
        <div>
          <label htmlFor="kind" className="plate text-muted">
            {copy.kind[locale]}
          </label>
          <select id="kind" name="kind" className={field} defaultValue="sitio">
            {kinds.map((k) => (
              <option key={k.value} value={k.value}>
                {k.label[locale]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="plate text-muted">
          {copy.message[locale]}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder={copy.placeholder[locale]}
          className={`${field} resize-none`}
          aria-describedby={state.errors?.message ? "err-message" : undefined}
        />
        {state.errors?.message && (
          <p id="err-message" className="mt-1.5 text-xs text-red">
            {state.errors.message}
          </p>
        )}
      </div>

      {!state.ok && state.message && (
        <p role="alert" className="text-sm text-red">
          {state.message}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-5">
        <Submit locale={locale} />
        <p className="text-xs text-muted">{copy.privacy[locale]}</p>
      </div>
    </form>
  );
}
