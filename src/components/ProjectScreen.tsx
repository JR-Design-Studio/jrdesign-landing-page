import type { Locale } from "@/lib/i18n";

/**
 * La interfaz de cada cliente, reconstruida en código. Los rótulos de sección son
 * verdaderos (salen del caso); los renglones de catálogo son datos de demostración
 * y el marco los etiqueta como reconstrucción.
 */

const t = (es: string, en: string, l: Locale) => (l === "es" ? es : en);

function Row({
  left,
  right,
  live = false,
}: {
  left: string;
  right: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 border-t border-ink/10 px-4 py-2.5 text-[0.72rem]">
      <span className="truncate text-ink-soft">{left}</span>
      <span className={`num shrink-0 ${live ? "text-red" : "text-muted"}`}>
        {right}
      </span>
    </div>
  );
}

function Tile({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="border border-ink/12 p-3">
      <div className="mb-2.5 h-14 bg-paper" aria-hidden />
      <p className="truncate text-[0.72rem] font-medium">{title}</p>
      <p className="num mt-0.5 text-[0.62rem] text-muted">{meta}</p>
    </div>
  );
}

function Toolbar({ items, active }: { items: string[]; active: number }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 border-b border-ink/12 px-4 py-2.5">
      {items.map((item, i) => (
        <span
          key={item}
          className={`plate text-[0.6rem] ${
            i === active ? "text-ink" : "text-muted"
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export function ProjectScreen({
  slug,
  locale: l,
}: {
  slug: string;
  locale: Locale;
}) {
  switch (slug) {
    case "disolab":
      return (
        <div>
          <Toolbar
            items={[
              t("Catálogo", "Catalog", l),
              t("Servicios", "Services", l),
              t("Nosotros", "About", l),
              t("Contacto", "Contact", l),
            ]}
            active={0}
          />
          <div className="flex items-center justify-between gap-4 bg-paper px-4 py-2">
            <span className="plate text-[0.6rem] text-ink-soft">
              {t("Origen: Odoo", "Source: Odoo", l)}
            </span>
            <span className="num flex items-center gap-2 text-[0.62rem] text-muted">
              <span className="size-1.5 rounded-full bg-red" aria-hidden />
              {t("sincronizado hace 4 min", "synced 4 min ago", l)}
            </span>
          </div>
          <Row left="Reactivo analítico 500 ml" right="EN LÍNEA" />
          <Row left="Material de laboratorio · vidrio" right="EN LÍNEA" />
          <Row left="Equipo de medición" right="EN LÍNEA" />
          <Row
            left={t("Capturas duplicadas", "Duplicate entries", l)}
            right="0"
            live
          />
        </div>
      );

    case "arqademy":
      return (
        <div>
          <Toolbar
            items={[
              t("Cursos", "Courses", l),
              t("Áreas", "Areas", l),
              t("Mi formación", "My learning", l),
            ]}
            active={0}
          />
          <div className="grid grid-cols-3 gap-3 p-4">
            <Tile title={t("Modelado BIM", "BIM modeling", l)} meta="12 h" />
            <Tile
              title={t("Render arquitectónico", "Architectural rendering", l)}
              meta="8 h"
            />
            <Tile
              title={t("Diseño paramétrico", "Parametric design", l)}
              meta="16 h"
            />
          </div>
          <div className="flex items-center justify-between border-t border-ink/10 px-4 py-2.5">
            <span className="text-[0.72rem] text-ink-soft">
              {t("Continuar donde te quedaste", "Pick up where you left off", l)}
            </span>
            <span className="num text-[0.62rem] text-red">64%</span>
          </div>
        </div>
      );

    case "lilitu":
      return (
        <div>
          <Toolbar
            items={[
              t("Fragancias", "Fragrances", l),
              t("Velas", "Candles", l),
              t("La marca", "The brand", l),
            ]}
            active={0}
          />
          <div className="grid grid-cols-[1.1fr_1fr] gap-4 p-4">
            <div className="aspect-square bg-ink" aria-hidden />
            <div className="flex flex-col justify-center">
              <p className="font-wide text-lg font-semibold">Nocturne</p>
              <p className="mt-1 text-[0.72rem] text-muted">
                {t("Vela de cera de soya, 220 g", "Soy wax candle, 220 g", l)}
              </p>
              <p className="num mt-3 text-sm">$890 MXN</p>
              <span className="plate mt-4 w-fit bg-ink px-3 py-2 text-[0.58rem] text-white">
                {t("Agregar", "Add to bag", l)}
              </span>
            </div>
          </div>
        </div>
      );

    case "s-ac-design-build":
      return (
        <div>
          <Toolbar
            items={[
              "Design",
              "Build",
              t("Planes preaprobados", "Pre-approved plans", l),
            ]}
            active={1}
          />
          <div className="grid grid-cols-2 gap-3 p-4">
            <div className="col-span-2 h-24 bg-ink" aria-hidden />
            <div className="h-16 bg-paper" aria-hidden />
            <div className="h-16 bg-paper" aria-hidden />
          </div>
          <div className="border-t border-ink/10 px-4 py-2.5 text-[0.72rem] text-ink-soft">
            {t("Los Ángeles, California", "Los Angeles, California", l)}
          </div>
        </div>
      );

    case "meaningful-interiors":
      return (
        <div>
          <Toolbar
            items={[
              t("Proyectos", "Projects", l),
              t("Estudio", "Studio", l),
              t("Contacto", "Contact", l),
            ]}
            active={0}
          />
          <div className="h-32 bg-ink" aria-hidden />
          <Row left={t("Casa Colomos", "Casa Colomos", l)} right="2022" />
          <Row left={t("Departamento Andares", "Andares apartment", l)} right="2021" />
        </div>
      );

    case "legal-laboral-abogados":
      return (
        <div>
          <Toolbar
            items={[
              t("Áreas de atención", "Practice areas", l),
              t("Despacho", "The firm", l),
              t("Asesoría", "Get advice", l),
            ]}
            active={0}
          />
          <Row left={t("Despido injustificado", "Wrongful dismissal", l)} right="→" />
          <Row left={t("Contratos y prestaciones", "Contracts and benefits", l)} right="→" />
          <Row left={t("Representación ante juntas", "Labor board representation", l)} right="→" />
          <div className="border-t border-ink/10 p-4">
            <span className="plate bg-ink px-3 py-2 text-[0.58rem] text-white">
              {t("Solicitar asesoría", "Request advice", l)}
            </span>
          </div>
        </div>
      );

    case "edunnova":
      return (
        <div>
          <Toolbar
            items={[
              t("Instituciones", "Institutions", l),
              t("Empresas", "Companies", l),
              t("Profesionales", "Professionals", l),
              t("Organismos", "Public bodies", l),
            ]}
            active={1}
          />
          <div className="p-4">
            <p className="text-[0.78rem] font-medium">
              {t("¿Qué necesitas resolver?", "What do you need to solve?", l)}
            </p>
            <div className="mt-3 grid gap-2">
              <div className="border border-ink/12 px-3 py-2 text-[0.72rem] text-ink-soft">
                {t("Capacitar a mi equipo", "Train my team", l)}
              </div>
              <div className="border border-ink/12 px-3 py-2 text-[0.72rem] text-ink-soft">
                {t("Certificar competencias", "Certify competencies", l)}
              </div>
            </div>
          </div>
        </div>
      );

    case "cm-naturals":
      return (
        <div>
          <Toolbar
            items={[
              t("Productos", "Products", l),
              t("Bienestar", "Wellness", l),
              t("La marca", "The brand", l),
            ]}
            active={0}
          />
          <div className="grid grid-cols-3 gap-3 p-4">
            <Tile title={t("Aceite esencial", "Essential oil", l)} meta="$320" />
            <Tile title={t("Crema corporal", "Body cream", l)} meta="$410" />
            <Tile title={t("Suplemento", "Supplement", l)} meta="$560" />
          </div>
          <div className="border-t border-ink/10 px-4 py-2.5 text-[0.72rem] text-ink-soft">
            {t("Fórmulas propias", "Own formulas", l)}
          </div>
        </div>
      );

    case "lozag":
      return (
        <div>
          <Toolbar
            items={[
              t("Soluciones", "Solutions", l),
              t("Productos", "Products", l),
              t("Certificaciones", "Certifications", l),
            ]}
            active={0}
          />
          <div className="p-4">
            <p className="text-[0.78rem] font-medium">
              {t("¿Qué necesitas embalar?", "What are you packing?", l)}
            </p>
          </div>
          <Row left={t("Exportación · NOM-144", "Export · ISPM-15", l)} right="→" />
          <Row left={t("Tarima estándar", "Standard pallet", l)} right="→" />
          <Row left={t("Embalaje a medida", "Custom crating", l)} right="→" />
        </div>
      );

    default:
      return (
        <div className="p-6">
          <p className="plate text-muted">{slug}</p>
        </div>
      );
  }
}
