import type { NextConfig } from "next";

/**
 * Migración SEO. El sitio anterior (WordPress + TranslatePress) tiene URLs
 * indexadas desde 2018; cada una necesita un 301 a su equivalente nueva.
 * El mapa completo se exporta del sitio viejo antes del corte — aquí quedan
 * los patrones conocidos, incluida la baja de /shop (ver decisión en README).
 */
const legacyRedirects = [
  { from: "/", to: "/es" },
  { from: "/servicios", to: "/es/servicios" },
  { from: "/nosotros", to: "/es/nosotros" },
  { from: "/contacto", to: "/es/contacto" },
  { from: "/portafolio", to: "/es/portafolio" },
  { from: "/blog", to: "/es" },
  // La tienda se retira: el negocio es el servicio.
  { from: "/shop", to: "/es/servicios" },
  { from: "/shop/:path*", to: "/es/servicios" },
  { from: "/carrito", to: "/es/servicios" },
  { from: "/checkout", to: "/es/servicios" },
  // Inglés existente de TranslatePress.
  { from: "/en", to: "/en" },
  { from: "/en/services", to: "/en/servicios" },
  { from: "/en/about", to: "/en/nosotros" },
  { from: "/en/about-us", to: "/en/nosotros" },
  { from: "/en/contact", to: "/en/contacto" },
  { from: "/en/portfolio", to: "/en/portafolio" },
  { from: "/en/portfolio/:slug", to: "/en/portafolio/:slug" },
  { from: "/en/shop", to: "/en/servicios" },
  { from: "/en/shop/:path*", to: "/en/servicios" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return legacyRedirects
      .filter((r) => r.from !== r.to)
      .map((r) => ({ source: r.from, destination: r.to, permanent: true }));
  },
};

export default nextConfig;
