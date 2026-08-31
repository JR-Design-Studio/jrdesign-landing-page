"use client";

import { useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * El sitio se genera en compilación, así que el año quedaría congelado en la
 * fecha del build. En el navegador se lee el del reloj del visitante.
 */
export function Year({ initial }: { initial: number }) {
  const year = useSyncExternalStore(
    noop,
    () => new Date().getFullYear(),
    () => initial,
  );
  return <>{year}</>;
}
