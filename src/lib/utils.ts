/** Une clases condicionales. Sin dependencias: el proyecto no usa variantes. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
