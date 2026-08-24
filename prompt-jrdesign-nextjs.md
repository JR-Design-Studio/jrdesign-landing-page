# Brief: migración y rediseño de JR Design (WordPress → Next.js)

> Pega este documento completo como prompt inicial en tu herramienta de desarrollo asistido
> (Claude Code, Cursor, v0, etc.). Está escrito como brief de cliente, no como lista de tareas:
> la idea es que quien lo lea entienda el negocio antes de escribir una línea de código.

---

## 1. Contexto

JR Design es un estudio de diseño y desarrollo web de dos personas, con base en Guadalajara,
México, operando en remoto. Llevan desde 2018 entregando sitios web, landing pages y
e-commerce a clientes de distintos sectores: educación, salud, legal, retail, industrial,
diseño de interiores y construcción.

**Situación actual:** el sitio corre en WordPress con Elementor y WooCommerce
(jrdesign.com.mx). Funciona, pero tiene tres problemas de fondo:

1. **El portafolio no existe como tal.** La home muestra mockups de proyectos, pero todos
   enlazan a `/servicios/`. No hay páginas de caso de estudio. El visitante ve *qué* se hizo,
   nunca *cómo se pensó*.
2. **La voz es inconsistente.** El sitio alterna entre primera persona singular ("Hola soy
   Juan", "Conoce mis servicios") y plural ("Transformamos ideas", "Nuestro enfoque"). Empezó
   como marca personal y creció a estudio sin resolver cuál de las dos es.
3. **Desconexión entre el medio y el mensaje.** Venden desarrollo moderno (Next.js,
   integraciones con ERP, e-commerce a medida) desde un sitio hecho con un page builder.

**Objetivo de este proyecto:** reconstruir el sitio en Next.js, publicando por fin los casos de
estudio que ya están escritos, y posicionando al estudio un escalón arriba: no como "hacemos
páginas web bonitas", sino como "resolvemos problemas de negocio con producto digital".

---

## 2. A quién le habla el sitio

El cliente típico es un dueño de negocio o director de una PyME mexicana (a veces de EE.UU.)
que:

- No es técnico y no quiere serlo.
- Ya tiene un negocio funcionando; no está empezando de cero.
- Ha visto sitios genéricos de agencia y desconfía de las promesas vacías.
- Le importa más "¿esto me va a traer clientes?" que "¿qué framework usan?".
- Muchas veces llega por recomendación, así que el sitio tiene que **confirmar** una buena
  impresión previa, no generarla desde cero.

La página tiene un solo trabajo: que esa persona termine escribiendo por WhatsApp o llenando
el formulario de contacto, convencida de que aquí sí saben lo que hacen.

---

## 3. El activo principal: 9 casos de estudio

Este es el contenido que hoy está desperdiciado y que debe ser el centro del nuevo sitio.
Cada caso sigue la misma estructura de cinco pasos: **Contexto → Investigación → El reto →
Diseño y evolución → Decisiones clave → Resultado**.

### 3.1 Arqademy — plataforma de e-learning de arquitectura
- **Contexto:** plataforma de cursos online especializada en arquitectura, que reúne distintas
  áreas y disciplinas para que los alumnos amplíen conocimientos y aprendan software
  especializado.
- **Investigación:** se analizaron las necesidades de Arqademy y el perfil de sus alumnos para
  entender cómo consumen cursos online y qué necesitan para encontrar, elegir y tomar un curso.
  Se revisaron plataformas educativas existentes buscando oportunidades de mejora.
- **El reto:** organizar una gran variedad de cursos y temas sin que la plataforma se sintiera
  complicada. Debía ser clara y navegable, permitiendo encontrar rápido el contenido buscado.
- **Diseño y evolución:** la estructura, la presentación de cursos y la navegación pasaron por
  varias propuestas antes de la versión final, probando distintas formas de organizar la
  información.
- **Decisiones clave:** priorizar el descubrimiento de cursos nuevos sin perder de vista el
  contenido que el alumno ya cursaba. Equilibrio entre variedad de opciones y navegación
  ordenada.
- **Resultado:** una plataforma educativa que facilita descubrir cursos, entender qué se
  aprenderá y comenzar la formación desde cualquier lugar.

### 3.2 Disolab — catálogo conectado a ERP
- **Contexto:** empresa con operación consolidada que ya usaba Odoo como sistema de gestión.
  Se buscaba una presencia digital que representara mejor a la empresa y aprovechara la
  información que ya tenían en su sistema.
- **Investigación:** se analizó cómo Disolab gestionaba sus productos dentro de Odoo, buscando
  conectar la presencia digital con procesos existentes para no duplicar información.
- **El reto:** una web profesional y navegable que mostrara el catálogo sin obligar al equipo a
  mantener la misma información en dos plataformas distintas.
- **Diseño y evolución:** se trabajó estructura, presentación de productos y navegación, más la
  integración con Odoo para que los productos existentes se mostraran directo en la web.
- **Decisiones clave:** aprovechar el ERP existente en lugar de construir un sistema
  independiente. Sincronización del catálogo desde Odoo, evitando trabajo duplicado.
- **Resultado:** un sitio conectado al ecosistema digital que ya usaban, más un CMS integrado
  para gestionar el contenido de la página.
- **Nota:** este es el proyecto técnicamente más fuerte del portafolio y hoy **no aparece** en
  la home. Debe tener protagonismo.

### 3.3 Meaningful Interiors — estudio de diseño de interiores
- **Contexto:** estudio que crea espacios con personalidad, funcionalidad y significado. El
  objetivo era llevar esa esencia a su presencia digital.
- **Investigación:** se analizó su identidad, propuesta de valor y forma de presentar proyectos,
  buscando qué elementos transmitían su filosofía de diseño.
- **El reto:** que la página no solo mostrara proyectos, sino que transmitiera la esencia del
  estudio: elegante, visual y cuidada, con el trabajo como protagonista.
- **Diseño y evolución:** estructura enfocada en contenido visual, usando los proyectos como
  principal elemento de comunicación. Varias propuestas de composición y navegación hasta
  equilibrar estética y facilidad de uso.
- **Decisiones clave:** protagonismo a imágenes y proyectos, reduciendo elementos innecesarios
  para mantener una experiencia limpia y sofisticada.
- **Resultado:** una experiencia digital que refleja la personalidad del estudio y presenta sus
  proyectos de forma más visual y profesional.

### 3.4 Legal Laboral Abogados — despacho jurídico
- **Contexto:** despacho especializado en asesoría y representación en materia laboral. Se
  buscaba transmitir confianza, experiencia y cercanía.
- **Investigación:** se analizaron los servicios, el perfil de sus clientes y la información que
  necesitaban antes de solicitar asesoría.
- **El reto:** comunicar temas legales de forma sencilla, sin que la página se sintiera técnica
  o complicada. Debía generar confianza desde el primer momento.
- **Diseño y evolución:** estructura enfocada en servicios, experiencia del despacho y áreas de
  atención, evolucionando hacia una navegación clara y profesional.
- **Decisiones clave:** priorizar confianza y claridad en cada sección, con llamados a la acción
  estratégicos para que alguien con una necesidad legal encontrara orientación rápido.
- **Resultado:** una presencia digital profesional que permite conocer los servicios, entender
  cómo pueden ayudar y dar fácilmente el siguiente paso.

### 3.5 Edunnova — educación continua y capacitación empresarial
- **Contexto:** organización enfocada en educación continua, capacitación empresarial y
  desarrollo de competencias profesionales.
- **Investigación:** se analizaron sus servicios y sus distintos públicos (instituciones
  educativas, empresas, profesionales, organismos), buscando presentar una oferta amplia sin
  perder la esencia de la marca.
- **El reto:** comunicar de forma sencilla todo lo que pueden ofrecer, transmitiendo confianza
  y profesionalismo a alguien que llega por primera vez.
- **Diseño y evolución:** se trabajó la estructura para crear un recorrido claro, con secciones
  para servicios, propuesta de valor y experiencia.
- **Decisiones clave:** organizar la información alrededor de las necesidades del cliente en vez
  de listar servicios. Énfasis en certificaciones, experiencia y acompañamiento personalizado
  como generadores de confianza.
- **Resultado:** una presencia digital clara y alineada con su identidad, que conecta servicios
  con necesidades reales.

### 3.6 Lilitu Candles & Fragrance — e-commerce de lujo
- **Contexto:** marca de velas y fragancias de lujo inspirada en aromas únicos, elegancia y
  misterio.
- **Investigación:** se analizó su identidad y el tipo de experiencia que buscaba transmitir.
  Se exploraron referencias del sector de lujo y perfumería para encontrar un lenguaje visual
  acorde.
- **El reto:** trasladar la experiencia de una marca de fragancias al entorno digital y, al
  mismo tiempo, ofrecer una compra sencilla. Elegancia y exclusividad sin fricción de compra.
- **Diseño y evolución:** experiencia visual enfocada en la identidad de marca, con
  protagonismo de productos, imágenes y narrativa, más un e-commerce completo.
- **Decisiones clave:** integrar la tienda dentro de la experiencia de marca, evitando que la
  compra se sintiera separada del resto del sitio.
- **Resultado:** un espacio que combina identidad de marca y comercio electrónico, donde la
  marca presenta productos y facilita la compra desde cualquier lugar.

### 3.7 S-AC Design Build — diseño y construcción (Los Ángeles)
- **Contexto:** empresa con sede en Los Ángeles enfocada en diseño y construcción de viviendas
  modernas.
- **Investigación:** se analizaron sus tipos de proyecto y cómo querían presentar su trabajo,
  buscando organizar una gran variedad de proyectos y servicios.
- **El reto:** presentar muchos proyectos sin perder una experiencia visual limpia, transmitiendo
  calidad y explicando a la vez qué hace la empresa.
- **Diseño y evolución:** estructura con los proyectos como protagonistas, organizando áreas de
  trabajo y creando navegación para explorar diseño, construcción y planes preaprobados.
- **Decisiones clave:** protagonismo al trabajo visual; las imágenes como principal recurso de
  comunicación, con la información acompañando el recorrido.
- **Resultado:** una presencia moderna y visual que comunica desde el primer contacto el nivel
  de calidad y detalle de sus proyectos.

### 3.8 CM Naturals — e-commerce de bienestar
- **Contexto:** marca de productos naturales para bienestar, salud y belleza.
- **Investigación:** se analizó su propuesta de valor, catálogo y forma de comunicarse con
  clientes, buscando presentar productos y beneficios con claridad.
- **El reto:** transformar un catálogo de productos naturales en una experiencia de compra
  atractiva, transmitiendo calidad y filosofía de marca sin complicar la compra.
- **Diseño y evolución:** experiencia enfocada en productos, con navegación clara y secciones
  para conocer la marca, más el desarrollo del e-commerce completo.
- **Decisiones clave:** combinar experiencia de marca con experiencia de compra, destacando
  fórmulas propias, bienestar y atención personalizada como diferenciadores.
- **Resultado:** un e-commerce que combina identidad y compra sencilla, preparado para seguir
  creciendo.

### 3.9 LOZAG — soluciones industriales de embalaje
- **Contexto:** empresa especializada en fabricación de tarimas y soluciones de embalaje de
  madera para la industria.
- **Investigación:** se analizaron servicios, productos y necesidades de comunicación,
  identificando la importancia de comunicar procesos de calidad, certificaciones y soluciones
  para comercio internacional.
- **El reto:** presentar variedad de productos y soluciones industriales de forma clara, sin que
  la información técnica resultara complicada.
- **Diseño y evolución:** estructura que permite conocer rápido a la empresa, explorar productos
  y entender soluciones, con espacio para procesos, certificaciones y proyectos.
- **Decisiones clave:** protagonismo a las *soluciones*, no al catálogo. La información se
  organizó para que el visitante identificara qué tipo de solución necesita.
- **Resultado:** una presencia profesional que comunica productos, experiencia y soluciones, y
  funciona como carta de presentación ante nuevos clientes.

---

## 4. Testimonios reales disponibles

Seis testimonios con nombre y cargo, un activo fuerte que hoy está enterrado al final de la
home. Deben tener un rol más visible y, cuando sea posible, aparecer **dentro del caso de
estudio correspondiente**, no solo agrupados en un carrusel genérico.

| Persona | Cargo | Empresa | Tema del testimonio |
|---|---|---|---|
| Gabriela Brum | CEO | Meaningful Interiors | Tendencias de diseño, atención al detalle, resultado que superó expectativas |
| Constancio Alvirde | CEO | Arqademy | Captaron su visión de un sitio limpio y minimalista; navegación optimizada |
| Gonzalo Lozada | CEO | Lozag | Profesionalismo y recomendaciones proactivas a favor del cliente |
| Dario Padilla | CEO | Legal Laboral Abogados | Entrega en tiempos planeados, superó expectativas |
| Raúl Castro-Cobos | CEO | Edunnova | Comunicación clara y constante, soluciones flexibles y personalizadas |
| Kariela Toledo | Operations Manager | SAC Design Build | Organización, puntualidad, apertura a ideas del cliente |

---

## 5. Arquitectura de información

```
/                       Home
/nosotros               Quiénes somos, cómo trabajamos, el equipo
/servicios              Qué hacemos y para quién
/portafolio             Índice de los 9 casos
/portafolio/[slug]      Caso de estudio individual  ← lo que hoy NO existe
/contacto               Formulario + WhatsApp directo
/en/*                   Versión en inglés de todo lo anterior
```

**Decisión pendiente que hay que resolver antes de construir:** el sitio actual tiene una
sección `/shop/` con WooCommerce (carrito, checkout). Hay que definir si:
- (a) se elimina, porque el negocio real es el servicio y la tienda distrae;
- (b) se conserva como venta de plantillas/productos digitales, migrando a Stripe;
- (c) se mantiene temporalmente en WordPress bajo un subdominio mientras se migra el resto.

Si no hay una razón de ingresos clara para conservarla, la recomendación es eliminarla: una
agencia que vende servicios de alto valor y a la vez tiene un carrito de compras manda una
señal confusa.

---

## 6. Voz y copy

**Hay que elegir una voz y sostenerla en todo el sitio.** Las dos opciones válidas:

- **Estudio ("nosotros"):** posiciona mejor para proyectos grandes, transmite capacidad de
  equipo, permite crecer sin rehacer el sitio. Recomendada.
- **Marca personal ("yo, Juan"):** más cálida y cercana, funciona para clientes pequeños, pero
  pone un techo a la percepción de capacidad.

Independientemente de cuál se elija, el copy debe cumplir:

- Español mexicano neutro, sin regionalismos fuertes, tuteo.
- Cero frases de agencia genérica: nada de "soluciones innovadoras", "impulsamos tu marca al
  siguiente nivel", "pasión por el diseño", "transformamos ideas en realidad".
- Verbos concretos y resultados verificables. En lugar de "optimizamos tu presencia digital",
  algo como "conectamos su catálogo de Odoo con la web para que no capturen productos dos
  veces".
- Los casos de estudio ya están escritos en un tono sobrio y descriptivo: ese es el tono de
  referencia para el resto del sitio.
- La versión en inglés debe ser **traducción editorial, no literal**: S-AC Design Build es un
  cliente de Los Ángeles, así que el inglés tiene que sonar nativo, no traducido.

---

## 7. Dirección visual

El brief no impone una paleta. Lo que sí impone son restricciones de personalidad:

- Debe verse claramente **hecho a mano, no armado con page builder**. El sitio actual es
  Elementor y se nota; el nuevo tiene que ser la mejor pieza del portafolio, porque es la
  primera que ve un cliente.
- El trabajo del cliente es el protagonista. Los mockups y fotografías de proyecto son el
  contenido más valioso de la página; la interfaz debe cederles espacio, no competir.
- Evitar los tres clichés de diseño generado por IA: fondo crema cálido con serif de alto
  contraste y acento terracota; fondo casi negro con un solo acento verde ácido; y el layout
  tipo periódico con reglas hairline y columnas densas. Son defaults, no decisiones.
- La tipografía tiene que cargar personalidad. Elegir un display característico usado con
  restricción y una face de texto que lo complemente, con una escala tipográfica deliberada.
  No usar la misma pareja que se usaría en cualquier otro proyecto.
- **Un solo elemento memorable.** Definir cuál es la pieza que hace que alguien recuerde este
  sitio (una transición entre casos, un tratamiento de la grilla del portafolio, un momento de
  scroll en la home) y ejecutarla bien; todo lo demás, disciplinado y silencioso.
- La numeración 01–05 de los casos de estudio **sí** está justificada: es una secuencia real de
  proceso, no decoración. Puede usarse como recurso estructural.
- Motion: deliberado y escaso. Mejor un momento orquestado que efectos dispersos. Respetar
  `prefers-reduced-motion`.

Antes de escribir código, produce un plan de diseño corto: paleta de 4–6 hex con nombre,
tipografías por rol, concepto de layout (con wireframes en ASCII para comparar alternativas) y
el elemento signature. Revisa ese plan contra este brief: si alguna parte se parece a lo que
producirías para cualquier agencia genérica, cámbiala y explica qué cambiaste y por qué.

---

## 8. Stack y requisitos técnicos

- **Next.js (App Router)** con **TypeScript**.
- **Tailwind CSS** para estilos.
- **Contenido:** los casos de estudio, servicios y testimonios deben ser editables sin tocar
  código. Opciones: MDX en el repo (más simple, cero costo, requiere Git para editar) o un CMS
  headless tipo Sanity/Payload (permite que el cliente edite). Dado que Juan debe poder subir
  casos nuevos sin depender del desarrollador, se recomienda CMS headless.
- **Imágenes:** `next/image` obligatorio, con AVIF/WebP. El portafolio es pesado en imagen; es
  el principal riesgo de rendimiento del sitio.
- **i18n:** rutas `/es` y `/en`, con `hreflang` correcto. El sitio actual usa TranslatePress y
  ya tiene URLs en inglés indexadas que hay que preservar.
- **Formulario de contacto:** envío por email + enlace directo a WhatsApp (número actual:
  +52 33 2654 1643). Protección anti-spam sin CAPTCHA visible si es posible.
- **Analítica:** el sitio actual tiene Meta Pixel vía PixelYourSite. Hay que decidir si se
  conserva y montarlo con carga diferida para no penalizar el rendimiento.

### Migración SEO (crítico)

El sitio lleva años indexado. La migración no puede perder ese posicionamiento:

1. Exportar el mapa completo de URLs actuales antes de tocar nada.
2. Redirects 301 de cada URL vieja a su equivalente nueva, incluidas las de `/en/`.
3. Conservar los slugs actuales donde tenga sentido; si un slug cambia, redirect explícito.
4. `sitemap.xml` y `robots.txt` generados, no manuales.
5. Metadatos por página con la Metadata API de Next, incluyendo Open Graph y Twitter Card por
   cada caso de estudio (hoy comparten metadatos genéricos).
6. Datos estructurados JSON-LD: `Organization` en el sitio y `CreativeWork` en cada caso.

### Piso de calidad

- Responsive real desde 320px, no solo "se ve bien en el iPhone del diseñador".
- Foco de teclado visible y navegación completa por teclado.
- Contraste AA como mínimo.
- Core Web Vitals en verde con las imágenes reales del portafolio cargadas, no con
  placeholders.

---

## 9. Cómo quiero que trabajes

1. Antes de escribir código, entrégame el plan de diseño de la sección 7 y la decisión sobre
   la tienda de la sección 5. No empieces a construir sin cerrar esas dos.
2. Construye primero la plantilla de caso de estudio (`/portafolio/[slug]`) con el contenido
   real de Disolab. Es la página que justifica todo el proyecto; si esa queda bien, el resto
   sigue.
3. Después la home, el índice de portafolio, y al final las páginas estáticas.
4. Usa el contenido real de este brief en todo momento. Nada de lorem ipsum ni proyectos
   inventados.
5. Critica tu propio trabajo conforme avanzas. Si algo quedó genérico, dilo y arréglalo.
