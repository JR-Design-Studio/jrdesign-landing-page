# jrdesign-landing-page

Reconstrucción del sitio de **JR Design** (WordPress + Elementor → Next.js), con los
9 casos de estudio publicados por fin como páginas propias.

```
npm install
npm run dev     # http://localhost:3000 → redirige a /es
npm run build
```

## Decisiones cerradas antes de construir

**Voz:** estudio (“nosotros”), sostenida en todo el sitio y en ambos idiomas.

**Tienda `/shop`:** se elimina. No hay ingreso recurrente que la justifique y un carrito
junto a servicios de alto valor manda una señal confusa. `/shop`, `/shop/*`, `/carrito` y
`/checkout` redirigen 301 a `/es/servicios` (ver `next.config.ts`).

## Dirección visual

Paleta de la identidad, sin inventar nada:

| Nombre  | Hex       | Uso                                             |
| ------- | --------- | ----------------------------------------------- |
| Paper   | `#E6E6E6` | fondo base                                      |
| White   | `#FFFFFF` | superficies elevadas                            |
| Ink     | `#262626` | tipografía y secciones invertidas               |
| Gray    | `#8A8A8A` | metadatos, líneas, estados inactivos            |
| JR Red  | `#C1282D` | **solo puntuación**: el punto, el paso activo, el foco |

**Tipografía:** `Archivo` variable (eje `wdth`, clase `.font-wide`) para display y UI —
recoge las mayúsculas anchas del logotipo; `Newsreader` para la prosa de los casos.

**Elemento signature — el punto.** El punto rojo del logotipo es el hilo conductor:
marca el caso apuntado en el índice de portafolio (y revela su vista previa en el panel
fijo), y baja por el riel de proceso 01–05 del caso de estudio conforme haces scroll.
Todo lo demás se mantiene silencioso. Motion mínimo y `prefers-reduced-motion` respetado
en `globals.css`.

## Estructura

```
/                        → 301 a /es
/[locale]                Home
/[locale]/portafolio     Índice de los 9 casos
/[locale]/portafolio/[slug]   Caso de estudio
/[locale]/servicios      Tres formas de trabajar juntos + FAQ
/[locale]/nosotros       Estudio, creencias, proceso
/[locale]/contacto       Formulario + WhatsApp
```

`locale` es `es` o `en`. Los segmentos de ruta se mantienen en español en ambos idiomas
para no duplicar el árbol de carpetas; las URLs inglesas indexadas del sitio anterior
(`/en/services`, `/en/portfolio/...`) entran por redirect 301 en `next.config.ts`.

## Contenido

Hoy vive en TypeScript, editable sin tocar componentes:

- `src/lib/projects.ts` — los 9 casos con sus pasos 01–05 (es/en)
- `src/lib/content.ts` — testimonios, servicios, FAQ, proceso del estudio
- `src/lib/i18n.ts` — locales, navegación, datos del estudio

**Siguiente paso recomendado:** mover `projects.ts` y `content.ts` a un CMS headless
(Sanity o Payload) para que Juan publique casos nuevos sin depender del desarrollador.
La forma de los datos ya está definida por los tipos `Project` y `Testimonial`, así que
el cambio es de origen de datos, no de componentes.

## Imágenes del portafolio — pendiente

`ProjectVisual` renderiza una placa tipográfica de marca mientras un caso no tiene foto.
Para publicar las reales:

1. Coloca los archivos en `public/projects/<slug>/cover.webp` (y las que quieras en `shots`).
2. Pon esa ruta en el campo `cover` del proyecto en `src/lib/projects.ts`.

A partir de ahí se sirven con `next/image` en AVIF/WebP. **Los Core Web Vitals hay que
medirlos con estas imágenes reales cargadas**, no con las placas.

## Formulario de contacto

Server action en `src/lib/actions.ts`. Anti-spam sin CAPTCHA visible: campo trampa +
tiempo mínimo de llenado. Variables de entorno:

```
RESEND_API_KEY=   # sin ella, el mensaje se registra en el log del servidor
CONTACT_TO=hola@jrdesign.com.mx
CONTACT_FROM=JR Design <web@jrdesign.com.mx>
```

## SEO

- Metadatos y Open Graph por página; `hreflang` es/en/x-default.
- `sitemap.xml` y `robots.txt` generados (`src/app/sitemap.ts`, `src/app/robots.ts`).
- JSON-LD: `Organization` en el layout, `CreativeWork` en cada caso.
- Redirects 301 en `next.config.ts`.

**Pendiente antes del corte de DNS:** exportar el mapa completo de URLs del WordPress
actual (incluidas las `/en/` de TranslatePress) y completar `legacyRedirects`. Lo que
está hoy son los patrones conocidos, no el mapa exportado.

## Pendientes conscientes

- Imágenes reales del portafolio (arriba).
- Mapa completo de redirects desde el sitio viejo.
- Decidir si se conserva el Meta Pixel; si sí, montarlo con carga diferida.
- Migración del contenido a CMS headless.
