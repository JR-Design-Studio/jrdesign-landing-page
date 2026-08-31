import type { Localized } from "./i18n";

export type ProcessStep = {
  key: string;
  title: Localized;
  body: Localized;
};

export type Project = {
  slug: string;
  name: string;
  year: number;
  featured: boolean;
  sector: Localized;
  scope: Localized;
  stack: string[];
  /** Una línea. Lo que el negocio ganó, no lo que se entregó. */
  lede: Localized;
  /** Resumen para el índice y los metadatos. */
  summary: Localized;
  steps: ProcessStep[];
  result: Localized;
  /** Ruta bajo /public/projects/<slug>/. null mientras no exista el archivo. */
  cover: string | null;
  /** Capturas del caso, con su tamaño real y un pie que explica qué se ve. */
  shots: { src: string; w: number; h: number; caption?: Localized }[];
  liveUrl?: string;
};

const STEP_TITLES = {
  contexto: { es: "Contexto", en: "Context" },
  investigacion: { es: "Investigación", en: "Research" },
  reto: { es: "El reto", en: "The challenge" },
  diseno: { es: "Diseño y evolución", en: "Design and iteration" },
  decisiones: { es: "Decisiones clave", en: "Key decisions" },
} satisfies Record<string, Localized>;

type StepKey = keyof typeof STEP_TITLES;

function steps(bodies: Record<StepKey, Localized>): ProcessStep[] {
  return (Object.keys(STEP_TITLES) as StepKey[]).map((key) => ({
    key,
    title: STEP_TITLES[key],
    body: bodies[key],
  }));
}

export const projects: Project[] = [
  {
    slug: "disolab",
    name: "Disolab",
    year: 2026,
    featured: true,
    sector: { es: "Laboratorio e industria", en: "Laboratory and industry" },
    scope: {
      es: "Sitio web, integración con Odoo, cotizador conectado al CRM, CMS",
      en: "Website, Odoo integration, quote builder wired to the CRM, CMS",
    },
    stack: ["Next.js", "TypeScript", "Odoo", "Python"],
    liveUrl: "https://disolab.com/",
    lede: {
      es: "Cotizar en cinco minutos, no en cinco días: el sitio habla directo con su ERP.",
      en: "Quoting in five minutes, not five days: the site talks straight to their ERP.",
    },
    summary: {
      es: "Sitio para el laboratorio Disolab conectado a Odoo: catálogo sincronizado desde el ERP, cotizador que entra al CRM y cotizaciones generadas en minutos.",
      en: "A site for the Disolab laboratory wired into Odoo: a catalog synced from the ERP, a quote builder that lands in the CRM and quotes generated in minutes.",
    },
    steps: steps({
      contexto: {
        es: "Disolab ya operaba con Odoo como ERP: ahí vivían su catálogo, su inventario y su CRM. Ningún cliente externo podía llegar a esa información, así que cotizar era un proceso manual que dependía de que alguien contestara un correo.",
        en: "Disolab already ran on Odoo as its ERP: catalog, stock and CRM all lived there. No outside customer could reach any of it, so quoting was a manual process that depended on someone answering an email.",
      },
      investigacion: {
        es: "Revisamos cómo se administraban productos y servicios dentro de Odoo y cómo llegaban las solicitudes al equipo de ventas. De ahí salió la idea del puente: que la web leyera del ERP en lugar de mantener un catálogo aparte.",
        en: "We reviewed how products and services were managed inside Odoo and how requests reached the sales team. That is where the bridge came from: the site reading from the ERP instead of keeping a separate catalog.",
      },
      reto: {
        es: "Que el sitio hablara directamente con Odoo: productos traídos del ERP, solicitudes entrando como prospectos en el CRM y la cotización generada con un clic, ya precargada.",
        en: "Getting the site to talk directly to Odoo: products pulled from the ERP, requests landing as leads in the CRM and the quote generated with one click, already filled in.",
      },
      diseno: {
        es: "Diseñamos la búsqueda por categorías y subcategorías, la ficha de producto y el cotizador donde el cliente arma su lista. Lo complejo no fue el sitio, fue el puente: los productos se consultan en tiempo real contra Odoo, así que siempre están al día sin intervención manual.",
        en: "We designed search across categories and subcategories, the product page and the quote builder where the customer assembles a list. The site was not the hard part, the bridge was: products are queried against Odoo in real time, so they are always current with no manual work.",
      },
      decisiones: {
        es: "Aprovechar el ERP que ya operaban en lugar de levantar un sistema aparte, y automatizar el flujo completo: el cliente selecciona, se crea el prospecto en el CRM y la cotización sale lista. Además, un CMS para que el equipo edite inicio, nosotros, servicios y promociones sin tocar el código.",
        en: "Build on the ERP they already ran instead of standing up a separate system, and automate the whole flow: the customer picks, a lead is created in the CRM and the quote comes out ready. Plus a CMS so the team edits home, about, services and promotions without touching code.",
      },
    }),
    result: {
      es: "De la solicitud en la web al documento listo en menos de cinco minutos, sin capturar nada dos veces. El catálogo se actualiza solo y el equipo administra el contenido por su cuenta.",
      en: "From web request to finished document in under five minutes, with nothing entered twice. The catalog updates itself and the team manages the content on its own.",
    },
    cover: null,
    shots: [
      {
        src: "/projects/cases/disolab/home.png",
        w: 2754,
        h: 1648,
        caption: {
          es: "La portada presenta el laboratorio y lleva directo al catálogo.",
          en: "The home page introduces the lab and leads straight to the catalog.",
        },
      },
      {
        src: "/projects/cases/disolab/equipos.png",
        w: 2560,
        h: 1600,
        caption: {
          es: "El catálogo se recorre por categorías y subcategorías, leído en tiempo real desde Odoo.",
          en: "The catalog is browsed by category and subcategory, read from Odoo in real time.",
        },
      },
      {
        src: "/projects/cases/disolab/producto.png",
        w: 2560,
        h: 1600,
        caption: {
          es: "Cada ficha trae la información del ERP y se agrega a la cotización desde ahí.",
          en: "Each product page carries the ERP data and goes into the quote from there.",
        },
      },
      {
        src: "/projects/cases/disolab/home-2.png",
        w: 4018,
        h: 2698,
        caption: {
          es: "Los servicios de laboratorio se consultan y se cotizan en el mismo recorrido.",
          en: "Lab services are browsed and quoted in the same flow.",
        },
      },
    ],
  },
  {
    slug: "arqademy",
    name: "Arqademy",
    year: 2023,
    featured: true,
    sector: { es: "Educación en línea", en: "Online education" },
    scope: {
      es: "Plataforma de e-learning, arquitectura de información, diseño de producto",
      en: "E-learning platform, information architecture, product design",
    },
    stack: ["Plataforma de cursos", "Diseño de producto"],
    liveUrl: "https://arqademy.com.mx/",
    lede: {
      es: "Muchos cursos, muchas disciplinas, una sola forma clara de encontrar el siguiente.",
      en: "Many courses, many disciplines, one clear way to find the next one.",
    },
    summary: {
      es: "Plataforma de cursos online especializada en arquitectura. El reto fue ordenar una oferta amplia sin que se sintiera complicada.",
      en: "An online course platform for architecture. The challenge was organizing a broad catalog without making it feel complicated.",
    },
    steps: steps({
      contexto: {
        es: "Plataforma de cursos online especializada en arquitectura, que reúne distintas áreas y disciplinas para que los alumnos amplíen conocimientos y aprendan software especializado.",
        en: "An online course platform focused on architecture, bringing together different areas and disciplines so students can broaden their knowledge and learn specialized software.",
      },
      investigacion: {
        es: "Analizamos las necesidades de Arqademy y el perfil de sus alumnos para entender cómo consumen cursos online y qué necesitan para encontrar, elegir y tomar un curso. Revisamos plataformas educativas existentes buscando oportunidades de mejora.",
        en: "We studied Arqademy's needs and their students' profile to understand how they consume online courses and what they need to find, choose and start one. We reviewed existing education platforms looking for room to improve.",
      },
      reto: {
        es: "Organizar una gran variedad de cursos y temas sin que la plataforma se sintiera complicada. Debía ser clara y navegable, permitiendo encontrar rápido el contenido buscado.",
        en: "Organize a wide variety of courses and topics without the platform feeling complicated. It had to stay clear and navigable, so students find what they are after quickly.",
      },
      diseno: {
        es: "La estructura, la presentación de cursos y la navegación pasaron por varias propuestas antes de la versión final, probando distintas formas de organizar la información.",
        en: "Structure, course presentation and navigation went through several rounds before the final version, testing different ways of organizing the information.",
      },
      decisiones: {
        es: "Priorizar el descubrimiento de cursos nuevos sin perder de vista el contenido que el alumno ya cursaba. Equilibrio entre variedad de opciones y navegación ordenada.",
        en: "Prioritize discovering new courses without losing sight of what the student is already taking. A balance between range of options and orderly navigation.",
      },
    }),
    result: {
      es: "Una plataforma educativa que facilita descubrir cursos, entender qué se aprenderá y comenzar la formación desde cualquier lugar.",
      en: "An education platform that makes it easy to discover courses, understand what you will learn and start from anywhere.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "lilitu",
    name: "Lilitu Candles & Fragrance",
    year: 2023,
    featured: true,
    sector: { es: "E-commerce de lujo", en: "Luxury e-commerce" },
    scope: {
      es: "Identidad digital y tienda en línea",
      en: "Digital identity and online store",
    },
    stack: ["E-commerce", "Diseño de marca digital"],
    liveUrl: "https://lilitucandles.com/",
    lede: {
      es: "Una marca de fragancias donde comprar no se siente como salir de la marca.",
      en: "A fragrance brand where checking out never feels like leaving the brand.",
    },
    summary: {
      es: "Velas y fragancias de lujo. La tienda vive dentro de la experiencia de marca, no en una sección aparte.",
      en: "Luxury candles and fragrances. The store lives inside the brand experience rather than in a separate section.",
    },
    steps: steps({
      contexto: {
        es: "Marca de velas y fragancias de lujo inspirada en aromas únicos, elegancia y misterio.",
        en: "A luxury candle and fragrance brand built on distinctive scents, elegance and mystery.",
      },
      investigacion: {
        es: "Analizamos su identidad y el tipo de experiencia que buscaba transmitir. Exploramos referencias del sector de lujo y perfumería para encontrar un lenguaje visual acorde.",
        en: "We studied their identity and the experience they wanted to convey, and looked at references from luxury retail and perfumery to find a fitting visual language.",
      },
      reto: {
        es: "Trasladar la experiencia de una marca de fragancias al entorno digital y, al mismo tiempo, ofrecer una compra sencilla. Elegancia y exclusividad sin fricción de compra.",
        en: "Translate a fragrance brand's experience to the web while keeping buying simple. Elegance and exclusivity without friction at checkout.",
      },
      diseno: {
        es: "Experiencia visual enfocada en la identidad de marca, con protagonismo de productos, imágenes y narrativa, más un e-commerce completo.",
        en: "A visual experience centered on brand identity, with products, imagery and narrative up front, plus a complete e-commerce build.",
      },
      decisiones: {
        es: "Integrar la tienda dentro de la experiencia de marca, evitando que la compra se sintiera separada del resto del sitio.",
        en: "Fold the store into the brand experience so buying never felt bolted onto the rest of the site.",
      },
    }),
    result: {
      es: "Un espacio que combina identidad de marca y comercio electrónico, donde la marca presenta productos y facilita la compra desde cualquier lugar.",
      en: "A space that combines brand identity and e-commerce, presenting products and making them easy to buy from anywhere.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "s-ac-design-build",
    name: "S-AC Design Build",
    year: 2023,
    featured: true,
    sector: { es: "Diseño y construcción", en: "Design and construction" },
    scope: {
      es: "Sitio web, arquitectura de proyectos y servicios",
      en: "Website, project and service architecture",
    },
    stack: ["Sitio web", "Portafolio visual"],
    liveUrl: "https://s-acm.com/",
    lede: {
      es: "Muchos proyectos, tres líneas de servicio y una sola experiencia limpia. Cliente en Los Ángeles.",
      en: "Dozens of projects, three service lines, one clean experience. Based in Los Angeles.",
    },
    summary: {
      es: "Empresa de Los Ángeles enfocada en viviendas modernas. Los proyectos son el contenido; la interfaz les cede el espacio.",
      en: "A Los Angeles firm building modern homes. The projects are the content; the interface gets out of their way.",
    },
    steps: steps({
      contexto: {
        es: "Empresa con sede en Los Ángeles enfocada en diseño y construcción de viviendas modernas.",
        en: "A Los Angeles-based firm focused on designing and building modern homes.",
      },
      investigacion: {
        es: "Analizamos sus tipos de proyecto y cómo querían presentar su trabajo, buscando organizar una gran variedad de proyectos y servicios.",
        en: "We reviewed their project types and how they wanted the work presented, looking for a way to organize a wide range of projects and services.",
      },
      reto: {
        es: "Presentar muchos proyectos sin perder una experiencia visual limpia, transmitiendo calidad y explicando a la vez qué hace la empresa.",
        en: "Show a lot of projects without losing a clean visual experience — conveying craft while still explaining what the company does.",
      },
      diseno: {
        es: "Estructura con los proyectos como protagonistas, organizando áreas de trabajo y creando navegación para explorar diseño, construcción y planes preaprobados.",
        en: "A structure led by the projects, organizing practice areas and building navigation for design, construction and pre-approved plans.",
      },
      decisiones: {
        es: "Protagonismo al trabajo visual: las imágenes como principal recurso de comunicación, con la información acompañando el recorrido.",
        en: "Let the visual work lead: imagery carries the message, with copy supporting the journey rather than interrupting it.",
      },
    }),
    result: {
      es: "Una presencia moderna y visual que comunica desde el primer contacto el nivel de calidad y detalle de sus proyectos.",
      en: "A modern, visual presence that signals the quality and detail of their projects from the first screen.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "meaningful-interiors",
    name: "Meaningful Interiors",
    year: 2022,
    featured: false,
    sector: { es: "Diseño de interiores", en: "Interior design" },
    scope: { es: "Sitio web y portafolio", en: "Website and portfolio" },
    stack: ["Sitio web", "Portafolio visual"],
    liveUrl: "https://www.meaningfulinteriors.com/",
    lede: {
      es: "Un estudio de interiores donde el proyecto ocupa la pantalla y la interfaz se hace a un lado.",
      en: "An interiors studio where the project fills the screen and the interface steps aside.",
    },
    summary: {
      es: "Estudio que crea espacios con personalidad y significado. La página traslada esa esencia sin adornos de más.",
      en: "A studio that creates spaces with personality and meaning. The site carries that across without extra ornament.",
    },
    steps: steps({
      contexto: {
        es: "Estudio que crea espacios con personalidad, funcionalidad y significado. El objetivo era llevar esa esencia a su presencia digital.",
        en: "A studio creating spaces with personality, function and meaning. The goal was to carry that into their digital presence.",
      },
      investigacion: {
        es: "Analizamos su identidad, propuesta de valor y forma de presentar proyectos, buscando qué elementos transmitían su filosofía de diseño.",
        en: "We examined their identity, value proposition and the way they present projects, looking for the elements that carried their design philosophy.",
      },
      reto: {
        es: "Que la página no solo mostrara proyectos, sino que transmitiera la esencia del estudio: elegante, visual y cuidada, con el trabajo como protagonista.",
        en: "The site had to do more than list projects: it had to feel like the studio — elegant, visual, considered, with the work in the lead.",
      },
      diseno: {
        es: "Estructura enfocada en contenido visual, usando los proyectos como principal elemento de comunicación. Varias propuestas de composición y navegación hasta equilibrar estética y facilidad de uso.",
        en: "A structure built around visual content, with projects as the main means of communication. Several composition and navigation rounds until aesthetics and usability balanced out.",
      },
      decisiones: {
        es: "Protagonismo a imágenes y proyectos, reduciendo elementos innecesarios para mantener una experiencia limpia y sofisticada.",
        en: "Give images and projects the stage, cutting anything unnecessary to keep the experience clean and sophisticated.",
      },
    }),
    result: {
      es: "Una experiencia digital que refleja la personalidad del estudio y presenta sus proyectos de forma más visual y profesional.",
      en: "A digital experience that reflects the studio's personality and presents its projects more visually and professionally.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "legal-laboral-abogados",
    name: "Legal Laboral Abogados",
    year: 2022,
    featured: false,
    sector: { es: "Servicios legales", en: "Legal services" },
    scope: {
      es: "Sitio web, arquitectura de servicios, captación",
      en: "Website, service architecture, lead capture",
    },
    stack: ["Sitio web", "Formularios de contacto"],
    liveUrl: "https://legallaboral.net/",
    lede: {
      es: "Materia laboral explicada sin tecnicismos, para que quien tiene un problema sepa qué sigue.",
      en: "Labor law explained without jargon, so someone with a problem knows what to do next.",
    },
    summary: {
      es: "Despacho especializado en materia laboral. Confianza y claridad en cada sección, con llamados a la acción donde hacen falta.",
      en: "A firm specialized in labor law. Trust and clarity in every section, with calls to action where they are actually needed.",
    },
    steps: steps({
      contexto: {
        es: "Despacho especializado en asesoría y representación en materia laboral. Se buscaba transmitir confianza, experiencia y cercanía.",
        en: "A firm specializing in labor law advice and representation, looking to convey trust, experience and approachability.",
      },
      investigacion: {
        es: "Analizamos los servicios, el perfil de sus clientes y la información que necesitaban antes de solicitar asesoría.",
        en: "We reviewed their services, their clients' profile and the information people needed before requesting advice.",
      },
      reto: {
        es: "Comunicar temas legales de forma sencilla, sin que la página se sintiera técnica o complicada. Debía generar confianza desde el primer momento.",
        en: "Communicate legal matters simply, without the site feeling technical or dense. It had to build trust from the first moment.",
      },
      diseno: {
        es: "Estructura enfocada en servicios, experiencia del despacho y áreas de atención, evolucionando hacia una navegación clara y profesional.",
        en: "A structure organized around services, the firm's track record and practice areas, evolving into clear, professional navigation.",
      },
      decisiones: {
        es: "Priorizar confianza y claridad en cada sección, con llamados a la acción estratégicos para que alguien con una necesidad legal encontrara orientación rápido.",
        en: "Put trust and clarity first in every section, with calls to action placed so someone with a legal need finds guidance fast.",
      },
    }),
    result: {
      es: "Una presencia digital profesional que permite conocer los servicios, entender cómo pueden ayudar y dar fácilmente el siguiente paso.",
      en: "A professional digital presence where visitors understand the services, see how the firm can help and take the next step easily.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "edunnova",
    name: "Edunnova",
    year: 2022,
    featured: false,
    sector: { es: "Capacitación empresarial", en: "Corporate training" },
    scope: {
      es: "Sitio web y arquitectura de oferta",
      en: "Website and offering architecture",
    },
    stack: ["Sitio web", "Arquitectura de información"],
    liveUrl: "https://edunnova.com.mx/",
    lede: {
      es: "Cuatro públicos distintos, una sola oferta ordenada por lo que cada uno necesita.",
      en: "Four different audiences, one offering organized around what each of them needs.",
    },
    summary: {
      es: "Educación continua y capacitación empresarial. La información se organizó por necesidad del cliente, no por lista de servicios.",
      en: "Continuing education and corporate training. Information organized by client need instead of a service list.",
    },
    steps: steps({
      contexto: {
        es: "Organización enfocada en educación continua, capacitación empresarial y desarrollo de competencias profesionales.",
        en: "An organization focused on continuing education, corporate training and professional development.",
      },
      investigacion: {
        es: "Analizamos sus servicios y sus distintos públicos —instituciones educativas, empresas, profesionales, organismos— buscando presentar una oferta amplia sin perder la esencia de la marca.",
        en: "We mapped their services and their distinct audiences — schools, companies, individual professionals, public bodies — looking to present a broad offering without diluting the brand.",
      },
      reto: {
        es: "Comunicar de forma sencilla todo lo que pueden ofrecer, transmitiendo confianza y profesionalismo a alguien que llega por primera vez.",
        en: "Explain everything they can offer simply, conveying trust and professionalism to a first-time visitor.",
      },
      diseno: {
        es: "Se trabajó la estructura para crear un recorrido claro, con secciones para servicios, propuesta de valor y experiencia.",
        en: "We shaped the structure into a clear path, with sections for services, value proposition and track record.",
      },
      decisiones: {
        es: "Organizar la información alrededor de las necesidades del cliente en vez de listar servicios. Énfasis en certificaciones, experiencia y acompañamiento personalizado como generadores de confianza.",
        en: "Organize information around client needs rather than listing services, leaning on certifications, experience and hands-on support as trust signals.",
      },
    }),
    result: {
      es: "Una presencia digital clara y alineada con su identidad, que conecta servicios con necesidades reales.",
      en: "A clear digital presence, aligned with their identity, that connects services to real needs.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "cm-naturals",
    name: "CM Naturals",
    year: 2021,
    featured: false,
    sector: { es: "E-commerce de bienestar", en: "Wellness e-commerce" },
    scope: {
      es: "Marca digital y tienda en línea",
      en: "Digital brand and online store",
    },
    stack: ["E-commerce", "Sitio web"],
    liveUrl: "https://cmnaturals.com.mx/",
    lede: {
      es: "Un catálogo de productos naturales convertido en una compra que se entiende sola.",
      en: "A natural products catalog turned into a purchase that explains itself.",
    },
    summary: {
      es: "Productos naturales para bienestar, salud y belleza. Identidad y compra en la misma experiencia, preparada para crecer.",
      en: "Natural products for wellness, health and beauty. Identity and commerce in one experience, built to grow.",
    },
    steps: steps({
      contexto: {
        es: "Marca de productos naturales para bienestar, salud y belleza.",
        en: "A natural products brand for wellness, health and beauty.",
      },
      investigacion: {
        es: "Analizamos su propuesta de valor, catálogo y forma de comunicarse con clientes, buscando presentar productos y beneficios con claridad.",
        en: "We reviewed their value proposition, catalog and how they talk to customers, aiming to present products and benefits clearly.",
      },
      reto: {
        es: "Transformar un catálogo de productos naturales en una experiencia de compra atractiva, transmitiendo calidad y filosofía de marca sin complicar la compra.",
        en: "Turn a natural products catalog into an appealing shopping experience — conveying quality and brand philosophy without complicating the purchase.",
      },
      diseno: {
        es: "Experiencia enfocada en productos, con navegación clara y secciones para conocer la marca, más el desarrollo del e-commerce completo.",
        en: "A product-led experience with clear navigation and sections to get to know the brand, plus the full e-commerce build.",
      },
      decisiones: {
        es: "Combinar experiencia de marca con experiencia de compra, destacando fórmulas propias, bienestar y atención personalizada como diferenciadores.",
        en: "Combine brand experience with buying experience, foregrounding their own formulas, wellness focus and personal service as differentiators.",
      },
    }),
    result: {
      es: "Un e-commerce que combina identidad y compra sencilla, preparado para seguir creciendo.",
      en: "An online store that pairs identity with a simple purchase, ready to keep growing.",
    },
    cover: null,
    shots: [],
  },
  {
    slug: "lozag",
    name: "LOZAG",
    year: 2021,
    featured: false,
    sector: { es: "Embalaje industrial", en: "Industrial packaging" },
    scope: {
      es: "Sitio web, catálogo y comunicación de procesos",
      en: "Website, catalog and process communication",
    },
    stack: ["Sitio web", "Catálogo"],
    liveUrl: "https://www.tarimasyembalajeslozag.com/",
    lede: {
      es: "Dejamos de listar el catálogo y empezamos por la solución que el visitante busca.",
      en: "We stopped leading with the catalog and started with the solution the visitor is looking for.",
    },
    summary: {
      es: "Fabricación de tarimas y embalaje de madera para la industria, con certificaciones para comercio internacional.",
      en: "Pallet manufacturing and wooden industrial packaging, with certifications for international trade.",
    },
    steps: steps({
      contexto: {
        es: "Empresa especializada en fabricación de tarimas y soluciones de embalaje de madera para la industria.",
        en: "A company specialized in manufacturing pallets and wooden packaging solutions for industry.",
      },
      investigacion: {
        es: "Analizamos servicios, productos y necesidades de comunicación, identificando la importancia de comunicar procesos de calidad, certificaciones y soluciones para comercio internacional.",
        en: "We reviewed services, products and communication needs, and found how much weight quality processes, certifications and international-trade solutions carried.",
      },
      reto: {
        es: "Presentar variedad de productos y soluciones industriales de forma clara, sin que la información técnica resultara complicada.",
        en: "Present a range of industrial products and solutions clearly, without the technical detail turning into a wall.",
      },
      diseno: {
        es: "Estructura que permite conocer rápido a la empresa, explorar productos y entender soluciones, con espacio para procesos, certificaciones y proyectos.",
        en: "A structure that lets you get to know the company fast, browse products and understand solutions, with room for processes, certifications and projects.",
      },
      decisiones: {
        es: "Protagonismo a las soluciones, no al catálogo. La información se organizó para que el visitante identificara qué tipo de solución necesita.",
        en: "Lead with solutions, not the catalog. Information was organized so visitors could identify which kind of solution they need.",
      },
    }),
    result: {
      es: "Una presencia profesional que comunica productos, experiencia y soluciones, y funciona como carta de presentación ante nuevos clientes.",
      en: "A professional presence that communicates products, experience and solutions, and works as a calling card with new clients.",
    },
    cover: null,
    shots: [],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function nextProject(slug: string): Project {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
}
