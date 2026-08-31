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
      es: "Analizamos qué necesita resolver tu negocio y qué secciones lo consiguen. De ahí sale la propuesta: alcance, tiempos y precio cerrados desde el inicio.",
      en: "We analyze what your business needs to solve and which sections get it done. That becomes the proposal: scope, timeline and price closed from the start.",
    },
  },
  {
    n: "02",
    title: { es: "Diseñar y construir", en: "Design and build" },
    body: {
      es: "Diseñamos la propuesta y la llevamos a código. En cada etapa hay una reunión de avance: revisas, comentas y aprobamos antes de seguir.",
      en: "We design the proposal and take it to code. Each stage has a progress review: you look at it, comment, and we sign off before moving on.",
    },
  },
  {
    n: "03",
    title: { es: "Desplegar y acompañar", en: "Deploy and support" },
    body: {
      es: "Publicamos el sitio medido y documentado, y entregamos a tu equipo el control del contenido. Después del lanzamiento seguimos disponibles para ajustes y mejoras.",
      en: "We ship the site measured and documented, and hand your team control of the content. After launch we stay available for adjustments and improvements.",
    },
  },
];

export type StackService = {
  id: string;
  /** El título se parte en dos: la segunda mitad baja de tono. */
  title: Localized;
  titleTail: Localized;
  body: Localized;
  pills: Localized[];
};

/** Los cuatro frentes del estudio, en el orden en que se contratan. */
export const serviceStack: StackService[] = [
  {
    id: "diseno-web",
    title: { es: "Diseño", en: "Web" },
    titleTail: { es: "web", en: "Design" },
    body: {
      es: "Todo sitio empieza con un objetivo: que la visita se convierta en cliente. Diseñamos páginas fáciles de recorrer, que se ven bien y llevan a la acción.",
      en: "Every site starts with one goal: turning a visit into a client. We design pages that are easy to move through, look sharp and lead to action.",
    },
    pills: [
      { es: "UI/UX", en: "UI/UX" },
      { es: "Next.js", en: "Next.js" },
      { es: "Interacciones", en: "Interactions" },
      { es: "SEO", en: "SEO" },
      { es: "Responsive", en: "Responsive" },
    ],
  },
  {
    id: "identidad",
    title: { es: "Identidad", en: "Brand" },
    titleTail: { es: "de marca", en: "Identity" },
    body: {
      es: "Tu marca es más que el logo: es cómo te reconocen y te recuerdan. Definimos logo, colores y tipografía para que todo hable el mismo idioma.",
      en: "Your brand is more than a logo: it is how people recognize and remember you. We set the logo, colors and type so everything speaks the same language.",
    },
    pills: [
      { es: "Logotipo", en: "Logo" },
      { es: "Tipografía", en: "Typography" },
      { es: "Paleta", en: "Color palette" },
      { es: "Tono de voz", en: "Voice and tone" },
      { es: "Manual", en: "Guidelines" },
    ],
  },
  {
    id: "tiendas",
    title: { es: "Tiendas", en: "Ecommerce" },
    titleTail: { es: "en línea", en: "Stores" },
    body: {
      es: "Vender en línea es más que subir productos. Armamos tiendas donde comprar es simple, el pago da confianza y el inventario siempre está al día.",
      en: "Selling online is more than uploading products. We build stores where buying is simple, paying feels safe and stock stays current.",
    },
    pills: [
      { es: "Shopify", en: "Shopify" },
      { es: "Catálogo", en: "Catalog" },
      { es: "Checkout", en: "Checkout" },
      { es: "CRO", en: "CRO" },
    ],
  },
  {
    id: "desarrollo",
    title: { es: "Desarrollo", en: "Custom" },
    titleTail: { es: "a la medida", en: "Development" },
    body: {
      es: "¿Necesitas más que una plantilla? Programamos lo que tu negocio pide: conexión con el sistema que ya usas, portales y herramientas internas.",
      en: "Need more than a template? We build what your business asks for: a link to the system you already run, portals and internal tools.",
    },
    pills: [
      { es: "Integraciones", en: "Integrations" },
      { es: "Aplicaciones", en: "Apps" },
      { es: "CMS", en: "CMS" },
      { es: "Automatización", en: "Automation" },
    ],
  },
];

export type ServicePlan = {
  id: string;
  title: Localized;
  body: Localized;
  faqs: { q: Localized; a: Localized }[];
};

/** Lo que se puede contratar, con las dudas que llegan antes de contratarlo. */
export const servicePlans: ServicePlan[] = [
  {
    id: "sitio",
    title: { es: "Sitio web", en: "Website" },
    body: {
      es: "Diseño y desarrollo de tu sitio a la medida, con la mejor experiencia de usuario y adaptable en todos los dispositivos.",
      en: "Custom design and development of your site, with the best user experience and adapted to every device.",
    },
    faqs: [
      {
        q: { es: "¿Qué incluye?", en: "What is included?" },
        a: {
          es: "Diseño a la medida, desarrollo, CMS para que edites el contenido, medición conectada y publicación con tu dominio.",
          en: "Custom design, development, a CMS so you can edit content, analytics wired up and launch on your own domain.",
        },
      },
      {
        q: { es: "¿Qué necesito para empezar?", en: "What do I need to start?" },
        a: {
          es: "Una reunión inicial y tus materiales de marca: logotipo, tipografía y colores, más la información de tus servicios o productos.",
          en: "A first call and your brand materials: logo, type and colors, plus the information about your services or products.",
        },
      },
      {
        q: {
          es: "¿Puedo editar mi sitio después del lanzamiento?",
          en: "Can I edit my site after launch?",
        },
        a: {
          es: "Sí. Entregamos el sitio con un CMS y una capacitación para tu equipo, sin que necesites conocimientos técnicos.",
          en: "Yes. We hand it over with a CMS and a walkthrough for your team, no technical background needed.",
        },
      },
    ],
  },
  {
    id: "landing",
    title: { es: "Landing page", en: "Landing page" },
    body: {
      es: "Una página enfocada en un solo producto o servicio, ideal para campañas: capta clientes potenciales y aumenta el tráfico útil.",
      en: "A page focused on a single product or service, made for campaigns: it captures leads and turns traffic into contacts.",
    },
    faqs: [
      {
        q: { es: "¿Qué incluye?", en: "What is included?" },
        a: {
          es: "Una página con estructura pensada para convertir, formulario o WhatsApp conectados y medición lista para tus campañas.",
          en: "One page structured to convert, a form or WhatsApp wired up, and analytics ready for your campaigns.",
        },
      },
      {
        q: { es: "¿Cuánto tarda?", en: "How long does it take?" },
        a: {
          es: "Entre una y tres semanas, según qué tan definido esté el mensaje y qué tan rápido llegue el material.",
          en: "One to three weeks, depending on how defined the message is and how fast the material arrives.",
        },
      },
      {
        q: {
          es: "¿Sirve si ya tengo un sitio?",
          en: "Does it work if I already have a site?",
        },
        a: {
          es: "Sí. Vive en tu mismo dominio y se diseña con la identidad del sitio, pero con un solo objetivo por página.",
          en: "Yes. It lives on your own domain and follows the site's identity, but with a single goal per page.",
        },
      },
    ],
  },
  {
    id: "ecommerce",
    title: { es: "E-commerce", en: "E-commerce" },
    body: {
      es: "Empieza a vender en línea con una tienda hecha a la medida: catálogo bien mostrado, pagos y envíos listos e inventario al día.",
      en: "Start selling online with a store built for you: a catalog shown well, payments and shipping ready, and stock kept current.",
    },
    faqs: [
      {
        q: { es: "¿Qué incluye?", en: "What is included?" },
        a: {
          es: "Catálogo, fichas de producto, carrito y checkout, configuración de pagos y envíos, y la capacitación para administrarlo.",
          en: "Catalog, product pages, cart and checkout, payment and shipping setup, plus training to run it.",
        },
      },
      {
        q: {
          es: "¿Puedo administrar productos y pedidos?",
          en: "Can I manage products and orders?",
        },
        a: {
          es: "Sí. Entregamos un panel donde actualizas productos, precios e inventario y sigues los pedidos sin depender de nosotros.",
          en: "Yes. You get a dashboard to update products, prices and stock, and to follow orders without depending on us.",
        },
      },
      {
        q: {
          es: "¿Se conecta con el sistema que ya uso?",
          en: "Does it connect to the system I already use?",
        },
        a: {
          es: "Sí. Conectamos la tienda con tu ERP o sistema actual para que el catálogo y el inventario se capturen una sola vez.",
          en: "Yes. We connect the store to your ERP or current system so catalog and stock are entered only once.",
        },
      },
    ],
  },
  {
    id: "desarrollo",
    title: { es: "Desarrollo a la medida", en: "Custom development" },
    body: {
      es: "Cuando la plantilla se queda corta: integraciones con el sistema que ya operas, portales y herramientas internas.",
      en: "When the template falls short: integrations with the system you already run, portals and internal tools.",
    },
    faqs: [
      {
        q: { es: "¿Qué se puede integrar?", en: "What can be integrated?" },
        a: {
          es: "ERP como Odoo, hojas de cálculo, CRM, pasarelas de pago y cualquier servicio que ofrezca una API.",
          en: "ERPs such as Odoo, spreadsheets, CRMs, payment gateways and any service that offers an API.",
        },
      },
      {
        q: { es: "¿Cómo se cotiza?", en: "How is it quoted?" },
        a: {
          es: "Primero revisamos el sistema y el flujo de trabajo; de ahí sale una propuesta con alcance, tiempos y precio cerrado.",
          en: "We first review the system and the workflow; from there comes a proposal with scope, timeline and a fixed price.",
        },
      },
      {
        q: {
          es: "¿Dan soporte después?",
          en: "Do you support it afterwards?",
        },
        a: {
          es: "Sí. Seguimos disponibles para ajustes, mejoras y mantenimiento una vez que está en operación.",
          en: "Yes. We stay available for adjustments, improvements and maintenance once it is running.",
        },
      },
    ],
  },
];
