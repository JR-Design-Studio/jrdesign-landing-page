import type { Localized } from "./i18n";

export type Testimonial = {
  name: string;
  role: Localized;
  company: string;
  /** slug del caso al que pertenece, para mostrarlo dentro del caso */
  project: string | null;
  quote: Localized;
};

export const testimonials: Testimonial[] = [
  {
    name: "Gabriela Brum",
    role: { es: "CEO", en: "CEO" },
    company: "Meaningful Interiors",
    project: "meaningful-interiors",
    quote: {
      es: "Conocen las tendencias de diseño y cuidan el detalle. El resultado superó lo que esperábamos del sitio.",
      en: "They know current design trends and they sweat the details. The result went beyond what we expected from the site.",
    },
  },
  {
    name: "Constancio Alvirde",
    role: { es: "CEO", en: "CEO" },
    company: "Arqademy",
    project: "arqademy",
    quote: {
      es: "Captaron la visión de un sitio limpio y minimalista, y optimizaron la navegación para que los alumnos encuentren lo que buscan.",
      en: "They understood the vision of a clean, minimal site and tuned the navigation so students find what they need.",
    },
  },
  {
    name: "Gonzalo Lozada",
    role: { es: "CEO", en: "CEO" },
    company: "Lozag",
    project: "lozag",
    quote: {
      es: "Profesionalismo de principio a fin. Nos hicieron recomendaciones que no habíamos pedido y que jugaban a nuestro favor.",
      en: "Professional from start to finish. They made recommendations we had not asked for that worked in our favor.",
    },
  },
  {
    name: "Dario Padilla",
    role: { es: "CEO", en: "CEO" },
    company: "Legal Laboral Abogados",
    project: "legal-laboral-abogados",
    quote: {
      es: "Entregaron en los tiempos planeados y el resultado superó nuestras expectativas.",
      en: "They delivered on the agreed schedule and the result exceeded our expectations.",
    },
  },
  {
    name: "Raúl Castro-Cobos",
    role: { es: "CEO", en: "CEO" },
    company: "Edunnova",
    project: "edunnova",
    quote: {
      es: "La comunicación fue clara y constante, y las soluciones se ajustaron a lo que íbamos necesitando.",
      en: "Communication was clear and consistent, and the solutions flexed with what we needed along the way.",
    },
  },
  {
    name: "Kariela Toledo",
    role: { es: "Operations Manager", en: "Operations Manager" },
    company: "SAC Design Build",
    project: "s-ac-design-build",
    quote: {
      es: "Organizados y puntuales, y siempre abiertos a las ideas que proponíamos desde nuestro lado.",
      en: "Organized, punctual, and always open to the ideas we brought from our side.",
    },
  },
];

export function testimonialFor(slug: string): Testimonial | undefined {
  return testimonials.find((t) => t.project === slug);
}

export type Service = {
  id: string;
  title: Localized;
  body: Localized;
  bullets: Localized[];
  forWho: Localized;
};

export const services: Service[] = [
  {
    id: "sitio",
    title: { es: "Sitio web a la medida", en: "Custom website" },
    body: {
      es: "Diseño y desarrollo desde cero, sin page builder. La estructura sale de lo que tu cliente necesita saber antes de contactarte, no de una plantilla.",
      en: "Design and development from scratch, no page builder. The structure comes from what your client needs to know before reaching out, not from a template.",
    },
    bullets: [
      {
        es: "Arquitectura de información y copy trabajados con ustedes",
        en: "Information architecture and copy worked out with you",
      },
      {
        es: "CMS para que su equipo edite sin depender de nosotros",
        en: "A CMS so your team can edit without depending on us",
      },
      {
        es: "Medición, formularios y WhatsApp conectados desde el día uno",
        en: "Analytics, forms and WhatsApp wired up from day one",
      },
    ],
    forWho: {
      es: "Para negocios con operación andando que necesitan que su sitio explique bien lo que hacen.",
      en: "For running businesses that need their site to explain the work properly.",
    },
  },
  {
    id: "ecommerce",
    title: { es: "Tienda en línea", en: "Online store" },
    body: {
      es: "E-commerce donde comprar no se siente separado de la marca. Catálogo, pagos, envíos y la experiencia completa alrededor.",
      en: "E-commerce where buying does not feel separate from the brand. Catalog, payments, shipping and the whole experience around it.",
    },
    bullets: [
      {
        es: "Catálogo y fichas de producto pensadas para vender, no para llenar",
        en: "Catalog and product pages built to sell, not to fill space",
      },
      { es: "Pagos y envíos configurados y probados", en: "Payments and shipping configured and tested" },
      {
        es: "Preparada para crecer en productos sin rehacer el sitio",
        en: "Ready to grow in SKUs without a rebuild",
      },
    ],
    forWho: {
      es: "Para marcas de producto que ya venden y quieren dejar de pelearse con su tienda.",
      en: "For product brands already selling who are tired of fighting their store.",
    },
  },
  {
    id: "integraciones",
    title: { es: "Integraciones y sistemas", en: "Integrations and systems" },
    body: {
      es: "Conectamos la web con lo que ya usan —Odoo u otro ERP, inventarios, facturación— para que la información se capture una sola vez.",
      en: "We connect the site to what you already run — Odoo or another ERP, inventory, invoicing — so information gets entered once.",
    },
    bullets: [
      { es: "Sincronización de catálogo desde su ERP", en: "Catalog sync from your ERP" },
      { es: "Automatizaciones de procesos que hoy son manuales", en: "Automation for processes that are manual today" },
      { es: "Documentación de lo que se conectó y cómo", en: "Documentation of what was connected and how" },
    ],
    forWho: {
      es: "Para empresas con un sistema de gestión que no quieren mantener la misma información en dos lados.",
      en: "For companies with a management system who refuse to maintain the same data twice.",
    },
  },
];

export type Faq = { q: Localized; a: Localized };

export const faqs: Faq[] = [
  {
    q: {
      es: "¿Cuánto cuesta un proyecto?",
      en: "How much does a project cost?",
    },
    a: {
      es: "Depende del alcance y lo cotizamos por proyecto, no por hora. Un sitio institucional y una tienda con integración al ERP no viven en el mismo rango. En la primera llamada revisamos qué necesitas y te mandamos una propuesta con alcance y precio cerrados.",
      en: "It depends on scope, and we quote per project rather than per hour. A company site and a store integrated with an ERP are not in the same range. On the first call we review what you need and send a proposal with fixed scope and price.",
    },
  },
  {
    q: { es: "¿Cuánto tarda?", en: "How long does it take?" },
    a: {
      es: "Un sitio de varias secciones toma entre cuatro y ocho semanas; un e-commerce o una integración, más. La parte que suele alargar los proyectos es el contenido: textos, fotos y accesos. Si eso está listo, avanzamos rápido.",
      en: "A multi-section site takes four to eight weeks; a store or an integration takes longer. What usually stretches a project is content: copy, photos and access. If that is ready, we move fast.",
    },
  },
  {
    q: {
      es: "Ya tengo un sitio en WordPress. ¿Hay que empezar de cero?",
      en: "I already have a WordPress site. Do we start over?",
    },
    a: {
      es: "No siempre. Revisamos qué páginas están posicionadas y qué contenido vale la pena conservar. Si migramos, mantenemos las URLs o hacemos redirects para no perder el posicionamiento que ya tienes.",
      en: "Not always. We review which pages rank and what content is worth keeping. If we migrate, we keep the URLs or set redirects so you do not lose the search positions you already have.",
    },
  },
  {
    q: {
      es: "¿Voy a poder editar el sitio yo?",
      en: "Will I be able to edit the site myself?",
    },
    a: {
      es: "Sí. Entregamos con un CMS y una sesión de entrega grabada para que tu equipo actualice textos, imágenes y productos sin escribirnos.",
      en: "Yes. We hand off with a CMS and a recorded walkthrough so your team can update copy, images and products without messaging us.",
    },
  },
  {
    q: {
      es: "¿Trabajan con clientes fuera de México?",
      en: "Do you work with clients outside Mexico?",
    },
    a: {
      es: "Sí. Operamos en remoto desde Guadalajara y tenemos clientes en Estados Unidos, como S-AC Design Build en Los Ángeles.",
      en: "Yes. We work remotely from Guadalajara and have US clients, such as S-AC Design Build in Los Angeles.",
    },
  },
];

export type ProcessPhase = { n: string; title: Localized; body: Localized };

export const howWeWork: ProcessPhase[] = [
  {
    n: "01",
    title: { es: "Entender el negocio", en: "Understand the business" },
    body: {
      es: "Antes de diseñar preguntamos cómo vendes, quién te compra y qué te preguntan siempre. De ahí sale la estructura del sitio.",
      en: "Before designing we ask how you sell, who buys and what people always ask you. The site structure comes from that.",
    },
  },
  {
    n: "02",
    title: { es: "Ordenar la información", en: "Order the information" },
    body: {
      es: "Definimos qué va en cada página y en qué orden. Es la parte que menos se ve y la que más decide si el sitio funciona.",
      en: "We define what goes on each page and in what order. It is the least visible part and the one that decides whether the site works.",
    },
  },
  {
    n: "03",
    title: { es: "Diseñar sobre contenido real", en: "Design on real content" },
    body: {
      es: "Diseñamos con tus textos y tus fotos, nunca con relleno. Lo que apruebas es lo que se publica.",
      en: "We design with your copy and your photos, never with filler. What you approve is what ships.",
    },
  },
  {
    n: "04",
    title: { es: "Construir y conectar", en: "Build and connect" },
    body: {
      es: "Desarrollo a mano, CMS y las integraciones que hagan falta con lo que ya usas.",
      en: "Hand-built development, a CMS, and whatever integrations are needed with the systems you already run.",
    },
  },
  {
    n: "05",
    title: { es: "Entregar y acompañar", en: "Hand off and support" },
    body: {
      es: "Publicación, medición, capacitación y soporte los primeros meses. No desaparecemos al lanzar.",
      en: "Launch, analytics, training and support for the first months. We do not disappear at go-live.",
    },
  },
];
