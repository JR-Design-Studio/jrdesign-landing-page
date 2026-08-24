# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Dueño de negocio o director de una PyME mexicana (a veces de Estados Unidos) que ya tiene
una operación funcionando. No es técnico y no quiere serlo. Ha visto sitios genéricos de
agencia y desconfía de las promesas vacías. Le importa "¿esto me va a traer clientes?",
no "¿qué framework usan?". Con frecuencia llega por recomendación de otro cliente, así que
el sitio tiene que **confirmar** una buena impresión previa, no generarla desde cero.

Audiencia secundaria confirmada: clientes en Estados Unidos (S-AC Design Build, Los
Ángeles), por lo que la versión en inglés debe leerse nativa, no traducida.

## Product Purpose

JR Design es un estudio de diseño y desarrollo web de dos personas con base en Guadalajara,
operando en remoto desde 2018. El sitio existe para que ese dueño de negocio termine
escribiendo por WhatsApp o llenando el formulario, convencido de que aquí sí saben lo que
hacen. Éxito = contacto calificado iniciado.

## Positioning

El estudio no vende "páginas web bonitas": resuelve problemas de negocio con producto
digital, y lo demuestra publicando el razonamiento completo de cada proyecto. El caso
Disolab es la prueba que un vecino no puede copiar: el catálogo vive en el Odoo que la
empresa ya usaba y se muestra en la web sin capturar nada dos veces.

Todo se construye a mano —sin page builder—, lo que es también la diferencia con el sitio
anterior del propio estudio (WordPress + Elementor), que vendía desarrollo moderno desde
una herramienta que lo contradecía.

## Operating Context

- Contacto real por WhatsApp (+52 33 2654 1643) y formulario; respuesta en un día hábil.
- Primera llamada de 30 minutos para entender el negocio, luego propuesta escrita con
  alcance, tiempos y precio cerrado.
- Sectores atendidos: educación, salud, legal, retail, industria, interiorismo,
  construcción.
- Migración desde jrdesign.com.mx (WordPress + Elementor + WooCommerce + TranslatePress),
  con URLs indexadas desde 2018 que deben preservarse con 301.

## Capabilities

- Sitios web a la medida (diseño, desarrollo, CMS para que el cliente edite).
- Tiendas en línea completas (catálogo, pagos, envíos).
- Integraciones con el sistema de gestión que la empresa ya usa (Odoo y otros ERP),
  automatizaciones y sincronización de catálogo.

## Evidence

Nueve casos de estudio reales, cada uno con la misma estructura de proceso
(Contexto → Investigación → El reto → Diseño y evolución → Decisiones clave → Resultado):
Disolab, Arqademy, Lilitu Candles & Fragrance, S-AC Design Build, Meaningful Interiors,
Legal Laboral Abogados, Edunnova, CM Naturals, LOZAG.

Seis testimonios reales con nombre, cargo y empresa: Gabriela Brum (Meaningful Interiors),
Constancio Alvirde (Arqademy), Gonzalo Lozada (Lozag), Dario Padilla (Legal Laboral
Abogados), Raúl Castro-Cobos (Edunnova), Kariela Toledo (SAC Design Build).

**No existen fotografías ni capturas reales de los proyectos.** Decisión del usuario: la
evidencia visual se autora en código como mockups de dispositivo/navegador, no con stock
ni cajas grises.

## Voice

Estudio ("nosotros"), sostenida en todo el sitio. Español mexicano neutro, tuteo, sin
regionalismos. Prohibido el lenguaje de agencia genérica ("soluciones innovadoras",
"impulsamos tu marca al siguiente nivel", "transformamos ideas en realidad"). Verbos
concretos y resultados verificables. El tono de referencia es el de los casos de estudio:
sobrio y descriptivo. El inglés es traducción editorial, no literal.

## Brand Commitments

Confirmados por el usuario y no negociables:

- Logotipo JR Design (marca con el punto rojo) tal cual, en `/public/logo.svg` y
  `/public/logo-white.svg`.
- Paleta del manual completa: JR Red `#C1282D`, Ink `#262626`, Paper `#E6E6E6`,
  White `#FFFFFF`, Gray `#8A8A8A`.
- **Inter** como única tipografía del sitio.

## Accessibility

Contraste AA mínimo, foco de teclado visible, navegación completa por teclado, responsive
real desde 320px y respeto a `prefers-reduced-motion`.

## Constraints

- Next.js (App Router) + TypeScript + Tailwind.
- i18n `/es` y `/en` con hreflang correcto; URLs inglesas del sitio anterior preservadas.
- `next/image` con AVIF/WebP para cualquier imagen real que llegue después.
- Core Web Vitals en verde con el contenido real cargado.

## Open Decisions

- Meta Pixel (hoy vía PixelYourSite): conservar o no; si se conserva, carga diferida.
- Paso del contenido de TypeScript a CMS headless (Sanity/Payload) para que el estudio
  publique casos sin desarrollador.
