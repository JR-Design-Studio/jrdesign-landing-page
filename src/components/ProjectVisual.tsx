import Image from "next/image";
import type { Project } from "@/lib/projects";
import type { Locale } from "@/lib/i18n";

/**
 * Visual de proyecto. Cuando exista el archivo en /public/projects/<slug>/,
 * se usa next/image. Mientras tanto se dibuja una placa tipográfica de marca
 * —no una foto de stock ni un gris vacío— para que la composición sea real.
 */
export function ProjectVisual({
  project,
  locale,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  project: Project;
  locale: Locale;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  if (project.cover) {
    return (
      <div className={`relative overflow-hidden bg-white ${className}`}>
        <Image
          src={project.cover}
          alt={`${project.name} — ${project.sector[locale]}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  const initials = project.name
    .replace(/[^A-Za-z\s-]/g, "")
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`relative overflow-hidden bg-white ${className}`}
      role="img"
      aria-label={`${project.name} — ${project.sector[locale]}`}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-7">
        <span className="tracking-label num text-[0.62rem] text-muted">
          {project.sector[locale]}
        </span>
        <span className="font-wide flex items-end gap-1 text-[clamp(3rem,9vw,6rem)] leading-none font-semibold text-ink/12">
          {initials}
          <span className="mb-[0.14em] block size-[0.16em] rounded-full bg-red/70" />
        </span>
        <span className="tracking-label num text-[0.62rem] text-muted">
          {project.year}
        </span>
      </div>
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #262626 0 1px, transparent 1px 11px)",
        }}
      />
    </div>
  );
}
