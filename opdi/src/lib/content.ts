import { IMAGES } from "./assets";

/* Todo el texto visible del sitio vive acá. Las claves en inglés, los comentarios en español.
   Las etiquetas de interfaz del frame de Figma (Home, Services, Login…) quedan en inglés. */

export const BRAND = {
  name: "Opdi",
  tagline: "Soluciones Digitales",
  homeLabel: "Opdi, ir al inicio",
  claim: "Tu idea, en pantalla",
};

export const META = {
  url: "https://opdi.cl",
  title: "Opdi — Soluciones Digitales",
  description:
    "Diseñamos y desarrollamos sitios web, apps web, APK para Android y apps para iOS y Android. Un solo equipo, del primer boceto a la tienda.",
};

export const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const MENU_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Method", href: "#method", id: "method" },
  { label: "Services", href: "#services", id: "services" },
  { label: "Impact", href: "#impact", id: "impact" },
  { label: "Journal", href: "#journal", id: "journal" },
  { label: "Questions", href: "#questions", id: "questions" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const UI = {
  skip: "Saltar al contenido",
  login: "Login",
  openMenu: "Abrir menú",
  closeMenu: "Cerrar menú",
  menuLabel: "Menú principal",
  close: "Cerrar",
  clientArea: "Área de cliente",
};

/* Datos de contacto: reemplazalos por los reales. */
export const CONTACT_INFO = {
  email: "hola@opdi.cl",
  phone: "+56 9 0000 0000",
  phoneHref: "+56900000000",
  studio: ["100% remoto", "Reuniones por video"],
  hours: "Lun a vie, 9 a 18 h",
};

export const SOCIAL = ["Instagram", "LinkedIn", "GitHub", "Behance"];

export const MENU_FOOTER = {
  studioTitle: "Estudio",
  contactTitle: "Contacto",
  socialTitle: "Social",
};

/* ── Hero ─────────────────────────────────────────────────────────────── */
export const HERO = {
  headline: ["Tu idea,", "en pantalla."],
  lede: [
    "Diseñamos y programamos",
    "sitios web, apps web, APK",
    "y apps móviles listas para",
    "publicar, medir y crecer.",
  ],
  pill: "Our Services",
  play: "Ver el film",
  scroll: "Scroll",
  scrollLabel: "Bajar a la siguiente sección",
  cards: {
    about: {
      kicker: "About",
      titleLines: ["Ideas que", "se vuelven", "producto."],
      imageAlt: "Rama cubierta de musgo sobre fondo claro",
    },
    services: {
      kicker: "Services",
      titleLines: ["Web y Apps"],
      imageAlt: "Roca cubierta de musgo",
    },
  },
};

export const READOUTS = [
  { label: "Projects Shipped", value: 148, suffix: "" },
  { label: "On-time Delivery", value: 96, suffix: "%" },
];

export const FILM = {
  dialogLabel: "Film del estudio",
  caption: "— film del estudio, 2026",
  unmute: "Activar sonido",
  mute: "Silenciar",
};

/* ── 01 Método ────────────────────────────────────────────────────────── */
export const PHILOSOPHY = {
  eyebrow: "About",
  title: ["Del boceto", "a la tienda."],
  body: [
    "Opdi es un estudio de soluciones digitales con una idea",
    "fija: que la tecnología trabaje para tu negocio y no al",
    "revés. Diseñamos, programamos y publicamos sitios, apps",
    "web y apps móviles que cargan rápido y se mantienen fácil.",
  ],
  cta: "Ver los servicios",
  plateLine: "Un solo equipo, del primer boceto al APK firmado.",
  plateChip: "Opdi, 2026",
  imageAlt: "Rama cubierta de musgo sobre fondo claro",
};

export const PHILOSOPHY_POINTS = [
  {
    n: "01",
    title: "Descubrir",
    body: "Entendemos tu negocio antes de abrir el editor. Objetivos, usuarios y métricas: en una semana tenés el alcance, el plazo y el presupuesto cerrados.",
  },
  {
    n: "02",
    title: "Diseñar y construir",
    body: "Prototipo navegable en Figma y después código limpio en sprints de dos semanas. Ves avances reales cada viernes, no promesas.",
  },
  {
    n: "03",
    title: "Publicar y crecer",
    body: "Subimos tu sitio, tu app web o tu APK a producción y a las tiendas. Después medimos, ajustamos y te acompañamos con soporte.",
  },
];

/* ── 02 Servicios ─────────────────────────────────────────────────────── */
export const PRODUCT_FAMILIES = ["Todos", "Web", "App web", "Móvil"] as const;
export type ProductFamily = Exclude<(typeof PRODUCT_FAMILIES)[number], "Todos">;

export type Product = {
  id: string;
  name: string;
  family: ProductFamily;
  tagline: string;
  price: string;
  timeline: string;
  stack: string;
  support: string;
  platform: string;
  image: string;
  description: string;
  features: string[];
};

/* Precios de referencia: ajustalos a tu tarifa. */
export const PRODUCTS: Product[] = [
  {
    id: "landing",
    name: "Landing Pro",
    family: "Web",
    tagline: "Una página que convierte",
    price: "desde US$ 450",
    timeline: "1–2 semanas",
    stack: "Next.js",
    support: "3 meses",
    platform: "Sitio web",
    image: IMAGES.mossBranch,
    description:
      "Una sola página pensada para vender una cosa. Carga en menos de un segundo, se ve perfecta en el teléfono y llega con analítica y formulario conectados.",
    features: ["Diseño a medida", "SEO técnico", "Analítica", "Formulario conectado"],
  },
  {
    id: "corporate",
    name: "Sitio Corporativo",
    family: "Web",
    tagline: "Tu empresa, bien contada",
    price: "desde US$ 1.200",
    timeline: "3–4 semanas",
    stack: "Next.js + CMS",
    support: "6 meses",
    platform: "Sitio web",
    image: IMAGES.mossRock,
    description:
      "Varias páginas, un gestor de contenidos que cualquiera de tu equipo puede usar y un blog listo para posicionar. Vos editás; nosotros cuidamos que no se rompa.",
    features: ["CMS editable", "Blog", "Multi-idioma", "Hosting incluido"],
  },
  {
    id: "saas",
    name: "Plataforma SaaS",
    family: "App web",
    tagline: "Tu producto en la nube",
    price: "desde US$ 4.800",
    timeline: "8–12 semanas",
    stack: "React + Node",
    support: "12 meses",
    platform: "App web",
    image: IMAGES.mossDark,
    description:
      "Usuarios, planes de pago, panel de administración y una API documentada. La base para lanzar tu producto digital y cobrar por él desde el primer mes.",
    features: ["Cuentas y roles", "Pagos recurrentes", "API documentada", "Panel admin"],
  },
  {
    id: "dashboard",
    name: "Panel de Gestión",
    family: "App web",
    tagline: "Tus datos, en orden",
    price: "desde US$ 2.400",
    timeline: "5–7 semanas",
    stack: "React + Postgres",
    support: "6 meses",
    platform: "App web",
    image: IMAGES.mossRidge,
    description:
      "Reemplazá las planillas por una herramienta interna a tu medida: inventario, ventas, reservas o lo que tu operación necesite, con reportes que se actualizan solos.",
    features: ["Reportes en vivo", "Exportar a Excel", "Permisos por área", "Integraciones"],
  },
  {
    id: "apk",
    name: "App Android",
    family: "Móvil",
    tagline: "Tu APK, instalable hoy",
    price: "desde US$ 2.900",
    timeline: "6–8 semanas",
    stack: "React Native",
    support: "6 meses",
    platform: "APK / Play Store",
    image: IMAGES.mossRidge,
    description:
      "Una app de Android con APK firmado para instalar directo o publicar en Play Store. Notificaciones, modo sin conexión y la ficha de la tienda lista.",
    features: ["APK firmado", "Play Store", "Notificaciones push", "Modo offline"],
  },
  {
    id: "crossplatform",
    name: "App iOS + Android",
    family: "Móvil",
    tagline: "Una base, dos tiendas",
    price: "desde US$ 5.600",
    timeline: "10–14 semanas",
    stack: "React Native",
    support: "12 meses",
    platform: "App Store + Play Store",
    image: IMAGES.mossWave,
    description:
      "Una sola base de código publicada en App Store y Play Store. Pagos dentro de la app, inicio de sesión social y un panel web para administrarla.",
    features: ["iOS y Android", "Pagos in-app", "Login social", "Panel web"],
  },
];

export const PRODUCTS_COPY = {
  eyebrow: "Services",
  title: ["Web, app y APK."],
  lede: "Seis servicios, tres familias y un mismo equipo detrás. Elegí dónde querés que viva tu proyecto y te mostramos lo que encaja.",
  tablistLabel: "Familias de servicios",
  showing: (shown: number, total: number) => `Mostrando ${shown} de ${total} servicios.`,
  empty: "Todavía no hay servicios en esta familia.",
  specs: { timeline: "Plazo", stack: "Stack", support: "Soporte", price: "Precio" },
  cta: "Pedir presupuesto",
};

/* ── 03 Impacto ───────────────────────────────────────────────────────── */
export const STATS = [
  { label: "Projects Shipped", value: 148, suffix: "", caption: "Sitios, apps web y apps móviles desde 2019" },
  { label: "On-time Delivery", value: 96, suffix: "%", caption: "Proyectos entregados en la fecha pactada" },
  { label: "Usuarios en nuestras apps", value: 1240, suffix: " k", caption: "Sumando todas las apps que mantenemos" },
  { label: "Lighthouse promedio", value: 97, suffix: "", caption: "Rendimiento medido en cada sitio publicado" },
];

export const IMPACT = {
  eyebrow: "Impact",
  title: ["Lo que", "entregamos."],
  lede: "Cuatro cifras que revisamos cada trimestre. Si una baja, lo contamos igual.",
  plateLine: "Cada proyecto sale con código documentado, accesos entregados y un plan para crecer.",
};

/* ── 04 Journal ───────────────────────────────────────────────────────── */
export const JOURNAL = [
  {
    id: "pwa",
    kicker: "Producto",
    title: "PWA, APK o app nativa",
    date: "18 Oct 2026",
    readingTime: "6 min",
    image: IMAGES.mossDark,
    excerpt: "Tres caminos para llegar al teléfono de tu cliente. Cuándo conviene cada uno y cuánto cuesta mantenerlo.",
  },
  {
    id: "velocidad",
    kicker: "Rendimiento",
    title: "Un segundo menos, más ventas",
    date: "02 Oct 2026",
    readingTime: "4 min",
    image: IMAGES.mossRidge,
    excerpt: "Bajamos la carga de una tienda online de 4,1 a 1,3 segundos. Esto es exactamente lo que cambiamos.",
  },
  {
    id: "playstore",
    kicker: "Taller",
    title: "Publicar en Play Store sin sustos",
    date: "15 Sep 2026",
    readingTime: "8 min",
    image: IMAGES.mossWave,
    excerpt: "Firmas, fichas, políticas y revisiones: la lista que usamos antes de subir cada APK.",
  },
];

export const JOURNAL_COPY = {
  eyebrow: "Journal",
  title: ["Notas del estudio."],
  lede: "Lo que aprendemos diseñando, programando y publicando. Sin campaña detrás.",
  closing:
    "La nota completa vive en el boletín de Opdi. Sale una vez al mes, con casos reales, números y el código que no entra en la web.",
};

/* ── 05 Preguntas ─────────────────────────────────────────────────────── */
export const FAQ = [
  {
    q: "¿Cuánto tarda un proyecto?",
    a: "Una landing está lista en una o dos semanas, un sitio corporativo en tres o cuatro, y una app web o móvil entre seis y catorce según el alcance. Te damos fecha cerrada antes de empezar.",
  },
  {
    q: "¿Qué diferencia hay entre una app web, un APK y una app nativa?",
    a: "La app web corre en el navegador y no se instala. El APK es la app de Android que se instala en el teléfono, desde Play Store o directo. Una app iOS + Android se publica en las dos tiendas desde una misma base de código.",
  },
  {
    q: "¿El código y el dominio son míos?",
    a: "Sí. Al cierre te entregamos el repositorio y los accesos al hosting, al dominio y a las cuentas de las tiendas. Nada queda a nombre de Opdi.",
  },
  {
    q: "¿Ofrecen mantenimiento?",
    a: "Todos los proyectos incluyen un período de soporte. Después podés sumar un plan mensual con actualizaciones, respaldos y mejoras.",
  },
  {
    q: "¿Cómo se paga?",
    a: "En tres partes: al aprobar la propuesta, al validar el diseño y al publicar. Facturamos en moneda local o en dólares.",
  },
];

export const FAQ_COPY = {
  eyebrow: "Questions",
  title: ["Lo que", "más nos", "preguntan."],
};

/* ── 06 Contacto ──────────────────────────────────────────────────────── */
export const CONTACT = {
  eyebrow: "Contact",
  title: ["Contanos", "tu idea."],
  lede: "Contanos qué querés construir y te respondemos con una propuesta en menos de dos días hábiles. Sin formularios eternos.",
  details: [
    { term: "Estudio", value: CONTACT_INFO.studio.join("\n") },
    { term: "Correo", value: CONTACT_INFO.email },
    { term: "Teléfono", value: CONTACT_INFO.phone },
    { term: "Horario", value: CONTACT_INFO.hours },
  ],
  fields: {
    name: "Nombre",
    email: "Correo",
    product: "Me interesa",
    message: "Mensaje",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "nombre@correo.com",
    messagePlaceholder: "Qué querés construir, plazos, si ya tenés diseño…",
  },
  submit: "Enviar mensaje",
  sending: "Enviando",
  note: "Al enviar aceptás que guardemos tus datos para responderte. Nada más.",
  errors: {
    name: "Decinos cómo te llamás.",
    email: "Ese correo no parece válido.",
    message: "Contanos un poco más (mínimo 10 caracteres).",
  },
  doneTitle: "Mensaje enviado",
  doneLine: (first: string, email: string, product: string) =>
    `Gracias, ${first}. Te escribimos a ${email} sobre «${product}» en menos de dos días hábiles.`,
  fallbackProduct: "tu proyecto",
  again: "Enviar otro mensaje",
};

/* ── Login ────────────────────────────────────────────────────────────── */
export const LOGIN = {
  title: "Área de cliente",
  heading: { login: "Entrar", register: "Crear cuenta" },
  lede: {
    login: "Seguí el avance de tu proyecto, descargá entregables y pedí cambios.",
    register: "Una cuenta para tus proyectos, tus accesos y tu historial de soporte.",
  },
  email: "Correo",
  password: "Contraseña",
  remember: "Recordarme",
  forgot: "Olvidé la contraseña",
  submit: { login: "Entrar", register: "Crear cuenta" },
  sending: "Enviando",
  switchPrompt: { login: "¿Todavía no tenés cuenta?", register: "¿Ya tenés cuenta?" },
  switchAction: { login: "Creá una", register: "Entrá" },
  errors: {
    emailEmpty: "Escribí tu correo.",
    emailInvalid: "Ese correo no parece válido.",
    passwordEmpty: "Escribí tu contraseña.",
    passwordShort: "Mínimo 8 caracteres.",
  },
  done: { login: "Sesión iniciada", register: "Cuenta creada" },
  doneLine: {
    login: (email: string) =>
      `Te dimos entrada como ${email}. Desde el área de cliente podés seguir el avance de tu proyecto.`,
    register: (email: string) => `Mandamos un correo a ${email} para confirmar la cuenta.`,
  },
  back: "Volver al sitio",
};

/* ── Footer ───────────────────────────────────────────────────────────── */
export const FOOTER = {
  newsletterTitle: ["Una carta al mes,", "nada más."],
  newsletterLine: "Casos reales, números de rendimiento y lo que aprendemos publicando apps.",
  emailLabel: "Tu correo",
  emailPlaceholder: "nombre@correo.com",
  subscribe: "Suscribirme",
  sending: "Enviando",
  error: "Necesitamos un correo válido.",
  done: (email: string) => `Listo. Te anotamos con ${email}.`,
  about: "Sitios web, apps web, APK y apps móviles hechas a medida, de la idea a la tienda.",
  navTitle: "Navegar",
  socialTitle: "Social",
  studioTitle: "Estudio",
  studio: ["100% remoto", "Reuniones por video", CONTACT_INFO.email],
  rights: (year: number) => `© ${year} Opdi Soluciones Digitales. Todos los derechos reservados.`,
  legal: ["Aviso legal", "Privacidad", "Cookies", "Garantía"],
  backToTop: "Volver arriba",
};
