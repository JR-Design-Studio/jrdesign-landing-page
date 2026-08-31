# Design

<!-- impeccable:design-schema 1 -->

## The world

**Opdate Structure (Bento Studio) con Paleta JR Design.** El sitio es una experiencia moderna, enérgica y estructurada. Toma la inspiración estructural de estudios de diseño modernos (bento grids, tipografía hero enorme y centrada, separaciones claras) pero respeta fielmente los colores originales de la "Sala de Instrumentos": un fondo de papel claro (`--color-paper`), tarjetas blancas (`--color-white`) con bordes de tinta (`--color-ink`), texto muy oscuro y un rojo intenso (`--color-red`) como acento y señal de acción.

Lo que este mundo rechaza: la landing analógica y fragmentada. Aquí la información vive dentro de módulos claros (bento cards), con jerarquías tipográficas mucho más agresivas y contrastantes, y un layout más geométrico y centrado.

## Palette

Paleta original conservada.

| Rol | Token | Hex | Uso |
| --- | --- | --- | --- |
| Fondo Principal | `--color-paper` | `#E6E6E6` | Fondo absoluto de la página |
| Superficie | `--color-white` | `#FFFFFF` | Tarjetas bento, contenedores, cabecera |
| Texto y Bordes | `--color-ink` | `#262626` | Titulares, copy principal, y bordes (`border-ink/15`) |
| Inactivo / Secundario | `--color-muted` | `#5C5C5C` | Descripciones, texto secundario, metadata (AA 5.2:1) |
| Inerte | `--color-gray` | `#8A8A8A` | Elementos sin foco, reglas, placeholders |
| Señal (Acento) | `--color-red` | `#C1282D` | Botones principales, estados activos, links |

Estrategia de color: **Light Bento**. El contraste principal es Blanco/Papel vs Tinta. El rojo sigue siendo la única señal vibrante en el layout.

## Type

**Inter**. La tipografía adopta una actitud más atrevida (Opdate-style):

- Display (Titulares Hero): Centrados o masivos. `font-variation-settings: "opsz" 32`, tracking `-0.04em`, pesos 600-700. Techo 6-8rem.
- Texto: `opsz` 16, medida 65-75ch. Color `--color-ink-soft` o `--color-muted`.
- Etiquetas (Plates): Mantenidas para tags (`10-11px, letter-spacing: 0.18em, uppercase`), pero ahora a menudo encapsuladas en "pills" (burbujas con borde redondeado).

## Components

- **Bento Card** (`.bento-card` o `.panel`): Superficie blanca (`--color-white`) sobre fondo de papel. Bordes definidos `border border-ink/15`, radio más moderno `rounded-2xl` o `rounded-xl`. Sombra sutil o nula, dependiendo de la profundidad deseada.
- **Botón Primario**: Fondo `--color-red`, texto blanco, `rounded-full` (pill) o `rounded-xl`.
- **Hero**: Tipografía gigante, a menudo centrada, con un bento grid de imágenes o un gran mockup debajo.

## Motion

- Las entradas pueden tener un *fade up* suave.
- Las interacciones en las tarjetas (hover) pueden iluminar el borde (`border-ink`) o añadir una sutil sombra o elevación.
- `prefers-reduced-motion` respeta todo en su estado final.

## Rules

- Uso intensivo de Bento Grids para mostrar servicios, proceso o métricas.
- Títulos colosales.
- El rojo es el único color de acción.
- El fondo es `--color-paper` y el contenido importante vive en módulos `--color-white`.
