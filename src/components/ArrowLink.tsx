"use client";

import Link from "next/link";
import { useRef } from "react";
import { ArrowUpRightIcon, type ArrowUpRightIconHandle } from "./ui/arrow-up-right";

/**
 * Enlace con flecha: la animación se dispara desde cualquier punto del botón,
 * no solo cuando el cursor cae justo sobre el icono.
 */
export function ArrowLink({
  href,
  children,
  className,
  size = 20,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  const arrowRef = useRef<ArrowUpRightIconHandle>(null);

  return (
    <Link
      href={href}
      onPointerEnter={() => arrowRef.current?.startAnimation()}
      onPointerLeave={() => arrowRef.current?.stopAnimation()}
      className={className}
    >
      {children}
      <ArrowUpRightIcon ref={arrowRef} size={size} className="shrink-0" />
    </Link>
  );
}
