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

## Dirección visual — Sala de Instrumentos

El sitio no expone proyectos: expone **nueve sistemas en operación**. Chasis de tinta,
carátulas de papel, etiquetas serigrafiadas y lecturas por celdas, porque el mecanismo
real del estudio es conectar la web al sistema que la empresa ya opera. Las decisiones
durables viven en [DESIGN.md](DESIGN.md); la verdad de producto, en
[PRODUCT.md](PRODUCT.md).

Paleta del manual, sin adiciones:

| Nombre | Hex | Uso |
| --- | --- | --- |
| Paper | `#E6E6E6` | carátula: fondo de página |
| White | `#FFFFFF` | paneles activos y pantallas de mockup |
| Ink | `#262626` | chasis: cabecera, cierres, secciones invertidas |
| Gray | `#8A8A8A` | celdas fantasma, reglas, material inerte |
| JR Red | `#C1282D` | **solo señal viva**: estado activo, foco, el punto |

**Tipografía:** Inter, única familia. El carácter viene del uso, no de la fuente:
display con `opsz 32` y tracking apretado, etiquetas serigrafiadas de 11px y cifras
tabulares en celda fija.

**Evidencia autorada:** no hay fotos de los proyectos, así que la interfaz de cada
cliente está **reconstruida en código** (`BrowserMock`, `PhoneMock`, `ProjectScreen`) y
etiquetada como reconstrucción. El mecanismo de Disolab se demuestra con un diagrama
autorado (`SyncDiagram`), no se afirma en una frase.

**Movimiento:** un solo momento orquestado, el encendido de la consola en la portada
(`ConsoleBoot`). El estado final es el estado por defecto: sin JavaScript o con
`prefers-reduced-motion`, todo aparece encendido.

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

## Imágenes reales del portafolio

Hoy la evidencia son las interfaces reconstruidas en código. Cuando existan capturas o
fotos reales:

1. Coloca los archivos en `public/projects/<slug>/`.
2. Llena el campo `cover` del proyecto en `src/lib/projects.ts` y sírvelos con
   `next/image` (AVIF/WebP).

**Los Core Web Vitals hay que medirlos con esas imágenes cargadas**, no con las
reconstrucciones.

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

- Fotos o capturas reales del portafolio (arriba).
- Mapa completo de redirects desde el sitio viejo.
- Decidir si se conserva el Meta Pixel; si sí, montarlo con carga diferida.
- Migración del contenido a CMS headless.
