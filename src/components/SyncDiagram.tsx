import type { Locale } from "@/lib/i18n";

/**
 * El mecanismo de Disolab dibujado, no afirmado: el producto se captura una vez
 * en el ERP y aparece en la web. Diagrama autorado, sin librerías.
 */
export function SyncDiagram({ locale }: { locale: Locale }) {
  const es = locale === "es";
  const copy = {
    erp: es ? "Odoo · ERP del cliente" : "Odoo · client ERP",
    capture: es ? "Se captura una vez" : "Entered once",
    sync: es ? "Sincronización" : "Sync",
    web: es ? "Sitio web" : "Website",
    show: es ? "Se muestra al comprador" : "Shown to the buyer",
    before: es ? "Antes: dos capturas" : "Before: entered twice",
    after: es ? "Ahora: una" : "Now: once",
  };

  return (
    <svg
      viewBox="0 0 640 190"
      className="h-auto w-full"
      role="img"
      aria-label={
        es
          ? "Diagrama: el producto se captura una sola vez en Odoo y se muestra en la web mediante sincronización."
          : "Diagram: a product is entered once in Odoo and shown on the website through a sync."
      }
    >
      <g fill="none" stroke="#262626" strokeWidth="1">
        <rect x="1" y="34" width="196" height="92" opacity="0.35" />
        <rect x="443" y="34" width="196" height="92" opacity="0.35" />
      </g>

      <text x="14" y="24" className="plate" fill="#5C5C5C" fontSize="11">
        {copy.erp}
      </text>
      <text x="456" y="24" className="plate" fill="#5C5C5C" fontSize="11">
        {copy.web}
      </text>

      {/* Renglones de catálogo dentro del ERP */}
      <g fill="#262626" opacity="0.16">
        <rect x="18" y="52" width="120" height="7" />
        <rect x="18" y="70" width="150" height="7" />
        <rect x="18" y="88" width="96" height="7" />
        <rect x="18" y="106" width="134" height="7" />
      </g>

      {/* Rejilla de producto dentro de la web */}
      <g fill="#262626" opacity="0.16">
        <rect x="460" y="50" width="52" height="32" />
        <rect x="522" y="50" width="52" height="32" />
        <rect x="584" y="50" width="40" height="32" />
        <rect x="460" y="92" width="52" height="26" />
        <rect x="522" y="92" width="52" height="26" />
        <rect x="584" y="92" width="40" height="26" />
      </g>

      {/* El puente: una sola vía */}
      <line x1="197" y1="80" x2="443" y2="80" stroke="#262626" strokeWidth="1.25" />
      <path d="M431 74l12 6-12 6" fill="none" stroke="#C1282D" strokeWidth="1.5" />
      <circle cx="320" cy="80" r="5" fill="#C1282D" />
      <text
        x="320"
        y="66"
        textAnchor="middle"
        fill="#262626"
        fontSize="11.5"
        fontWeight="500"
      >
        {copy.sync}
      </text>

      <text x="14" y="146" fill="#5C5C5C" fontSize="11.5">
        {copy.capture}
      </text>
      <text x="639" y="146" textAnchor="end" fill="#5C5C5C" fontSize="11.5">
        {copy.show}
      </text>

      {/* Lo que se eliminó */}
      <g opacity="0.5">
        <line
          x1="197"
          y1="164"
          x2="443"
          y2="164"
          stroke="#8A8A8A"
          strokeWidth="1"
          strokeDasharray="4 4"
        />
        <line x1="308" y1="156" x2="332" y2="172" stroke="#8A8A8A" strokeWidth="1" />
        <line x1="332" y1="156" x2="308" y2="172" stroke="#8A8A8A" strokeWidth="1" />
      </g>
      <text x="14" y="168" fill="#8A8A8A" fontSize="11">
        {copy.before}
      </text>
      <text x="639" y="168" textAnchor="end" fill="#8A8A8A" fontSize="11">
        {copy.after}
      </text>
    </svg>
  );
}
