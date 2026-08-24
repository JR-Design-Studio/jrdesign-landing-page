# Design

<!-- impeccable:design-schema 1 -->

## The world

**Sala de Instrumentos.** El sitio no expone proyectos: expone nueve sistemas en
operación. Todo lo que se ve pertenece a una consola de control analógica —chasis de
tinta, carátulas de papel, etiquetas serigrafiadas, lecturas por celdas— porque el
mecanismo real del estudio es conectar la web al sistema que la empresa ya opera.

Lo que este mundo rechaza: la landing de estudio con tipografía enorme, rejilla de
mockups y un acento; y su opuesto previsible, el dashboard oscuro con neón. Aquí la
consola está **iluminada**: carátulas claras sobre chasis oscuro, bordes duros, sin
glow, sin vidrio, sin blur decorativo.

## Palette

Paleta del manual de marca, sin adiciones. Los roles son fijos:

| Rol | Token | Hex | Uso |
| --- | --- | --- | --- |
| Chasis | `--color-ink` | `#262626` | estructura, rieles, cabecera, cierres |
| Carátula | `--color-paper` | `#E6E6E6` | fondo de página: la cara del instrumento |
| Cara viva | `--color-white` | `#FFFFFF` | paneles activos, pantallas de mockup |
| Grabado | `--color-gray` | `#8A8A8A` | celdas fantasma, reglas, material inerte |
| Texto secundario | `--color-muted` | `#5C5C5C` | derivado del gris para cumplir AA (5.2:1) |
| Señal | `--color-red` | `#C1282D` | **solo señal viva**: estado activo, foco, el punto |

Estrategia de color: **Restrained**. Neutros más un acento, porque el visitante llega a
evaluar y decidir. El rojo nunca decora: marca lo que está encendido.

Claro, no oscuro: el visitante es un director de PyME leyendo en su oficina o en el
celular a media mañana. La consola se lee con luz.

## Type

**Inter** es la única familia (compromiso de marca). El carácter no viene de la
tipografía sino de cómo se usa:

- Display: `font-variation-settings: "opsz" 32`, tracking `-0.03em`, pesos 600-700.
  Techo 6rem.
- Texto: `opsz` 16, medida 65-75ch.
- Etiquetas de instrumento: 10-11px, `letter-spacing: 0.18em`, mayúsculas. Son
  serigrafía sobre metal: nombran un control o una lectura, **nunca** van encima de un
  titular como antetítulo.
- Cifras: `font-variant-numeric: tabular-nums`, siempre en celda fija.

## Components

- **Panel** (`.panel`): carátula clara sobre el chasis. Borde 1px `ink/15`, radio 2px,
  sombra con desplazamiento y desenfoque real (`0 12px 28px -18px`), nunca halo.
- **Readout**: lectura por celdas de ancho fijo. Las celdas apagadas se dibujan como
  fantasma (`gray` al 14%): la ausencia está diseñada igual que la luz. Los cambios de
  estado **saltan**, no se desvanecen.
- **Etiqueta** (`.plate`): serigrafía en mayúsculas con tracking amplio.
- **Cajón** (`ProjectDrawer`): cada caso es un cajón del instrumento. Cara del cajón en
  reposo; al apuntar o enfocar sale a medias y enciende su lectura previa; al abrir,
  lleva al caso completo.
- **Mockups en código** (`BrowserMock`, `PhoneMock`, `ProjectScreen`): no hay fotografía
  de los proyectos, así que la evidencia se autora: chasis de navegador y de teléfono
  dibujados con la paleta, y adentro la interfaz real de cada cliente reconstruida con
  sus datos verdaderos. Nunca cajas grises ni stock.
- **Diagrama de mecanismo**: SVG autorado (Odoo → web) que demuestra la sincronización
  de Disolab en lugar de afirmarla.

## Motion

Un solo momento orquestado: el **encendido de la consola** en la portada. Los paneles
llegan en secuencia, el contador de sincronización corre y la señal roja se enciende al
final. Ease exponencial de salida, desde un estado ya visible: si el JavaScript no
corre, la consola aparece encendida y completa.

Fuera de ahí, el movimiento es de instrumento: el cajón que sale, el punto de proceso
que baja por el riel, el estado que salta. Nada de entradas idénticas sección tras
sección. `prefers-reduced-motion` deja todo en su estado final.

## Rules

- Sin antetítulos: si una etiqueta va sobre un titular, se borra.
- Sin tarjetas iguales como estructura de página; los paneles se diferencian por función.
- El rojo nunca es fondo de área grande ni decoración; es señal.
- Radio máximo 2px salvo el chasis de dispositivo, que es hardware.
- Superficies del navegador (selección, caret, scrollbar, anillo de foco, subrayados)
  tematizadas desde la paleta.
- Contraste AA mínimo, foco visible, 320px real, semántica y teclado intactos.
