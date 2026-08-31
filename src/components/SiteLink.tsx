"use client";

import { useRef } from "react";
import {
  ExternalLinkIcon,
  type ExternalLinkIconHandle,
} from "./ui/external-link";

/**
 * Enlace al sitio publicado del cliente. El icono se anima desde cualquier
 * punto del botón, no solo cuando el cursor cae sobre él.
 */
export function SiteLink({
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
  const iconRef = useRef<ExternalLinkIconHandle>(null);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onPointerEnter={() => iconRef.current?.startAnimation()}
      onPointerLeave={() => iconRef.current?.stopAnimation()}
      className={className}
    >
      {children}
      <ExternalLinkIcon ref={iconRef} size={size} className="shrink-0" />
    </a>
  );
}
