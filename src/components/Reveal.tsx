"use client";

import { useEffect, useRef } from "react";

/**
 * Revelado discreto al entrar en viewport. Si el usuario pide menos movimiento,
 * el CSS ya deja el contenido visible y este observer no hace nada relevante.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const node = entry.target as HTMLElement;
            window.setTimeout(() => node.setAttribute("data-reveal", "in"), delay);
            io.unobserve(node);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error — ref polimórfico sobre un set cerrado de tags
    <Tag ref={ref} data-reveal="" className={className}>
      {children}
    </Tag>
  );
}
