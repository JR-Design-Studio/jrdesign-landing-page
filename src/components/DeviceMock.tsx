import type { Locale } from "@/lib/i18n";

const reconstruction = {
  es: "Reconstrucción de interfaz",
  en: "Interface reconstruction",
};

/**
 * Chasis de navegador dibujado con la paleta de marca. No hay capturas reales de
 * los proyectos, así que la evidencia se autora: el marco es hardware y la pantalla
 * lleva la interfaz reconstruida del cliente, etiquetada como reconstrucción.
 */
export function BrowserMock({
  url,
  locale,
  children,
  className = "",
  label = true,
}: {
  url: string;
  locale: Locale;
  children: React.ReactNode;
  className?: string;
  label?: boolean;
}) {
  return (
    <figure className={`relative ${className}`}>
      <div className="overflow-hidden rounded-[3px] bg-ink shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-3 border-b border-white/10 px-3 py-2.5">
          <div className="flex gap-1.5" aria-hidden>
            <span className="size-2 rounded-[1px] bg-white/25" />
            <span className="size-2 rounded-[1px] bg-white/25" />
            <span className="size-2 rounded-[1px] bg-white/25" />
          </div>
          <span className="num min-w-0 flex-1 truncate rounded-[1px] bg-white/8 px-2.5 py-1 text-[0.66rem] text-paper/70">
            {url}
          </span>
        </div>
        <div className="bg-white">{children}</div>
      </div>
      {label && (
        <figcaption className="plate mt-2 text-muted">
          {reconstruction[locale]}
        </figcaption>
      )}
    </figure>
  );
}

/** Chasis de teléfono. Mismo criterio: hardware dibujado, pantalla autorada. */
export function PhoneMock({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative w-[220px] shrink-0 rounded-[28px] bg-ink p-[7px] shadow-[var(--shadow-lift)] ${className}`}
    >
      <div
        aria-hidden
        className="absolute -left-[2px] top-[92px] h-[34px] w-[2px] rounded-l-[2px] bg-ink-soft"
      />
      <div
        aria-hidden
        className="absolute -right-[2px] top-[120px] h-[52px] w-[2px] rounded-r-[2px] bg-ink-soft"
      />
      <div className="relative overflow-hidden rounded-[22px] bg-white">
        <div
          aria-hidden
          className="absolute left-1/2 top-1.5 z-10 h-[18px] w-[68px] -translate-x-1/2 rounded-full bg-ink"
        />
        {children}
      </div>
    </div>
  );
}
