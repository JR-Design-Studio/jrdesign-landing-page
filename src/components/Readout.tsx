/**
 * Lectura por celdas de ancho fijo. Las celdas apagadas se dibujan como fantasma:
 * en un instrumento la ausencia está diseñada igual que la luz.
 */
export function Readout({
  value,
  cells,
  live = false,
  className = "",
}: {
  value: string | number;
  /** Ancho del display en celdas. Por defecto, el del propio valor. */
  cells?: number;
  /** Enciende la lectura en rojo señal. */
  live?: boolean;
  className?: string;
}) {
  const text = String(value);
  const width = Math.max(cells ?? text.length, text.length);
  const pad = width - text.length;

  return (
    <span
      className={`num inline-flex items-baseline ${className}`}
      aria-label={text}
    >
      {Array.from({ length: pad }, (_, i) => (
        <span key={`ghost-${i}`} aria-hidden className="cell cell-ghost">
          0
        </span>
      ))}
      {text.split("").map((char, i) => (
        <span
          key={`char-${i}`}
          aria-hidden
          className={`cell ${live ? "text-red" : ""}`}
        >
          {char}
        </span>
      ))}
    </span>
  );
}
