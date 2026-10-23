/* ══════════════════════════════════════════════════════════════════
   ESTE ES EL ÚNICO ARCHIVO QUE NECESITÁS TOCAR.

   Acá viven los textos, las imágenes, los videos y los fondos de todo
   el sitio. Los colores y las tipografías están aparte, en
   `src/app/globals.css`, arriba de todo.

   Si cambiás algo acá, cambia en todas las pantallas a la vez
   (computadora y celular). No hace falta buscarlo en ningún otro lado.
   ══════════════════════════════════════════════════════════════════ */
import { asset } from "@/lib/assets";
import type { Layer } from "@/components/ui/SectionBackdrop";

/* ─────────────── 1. IMÁGENES Y VIDEOS ───────────────
   Cambiá una dirección acá y cambia en todos los lugares donde se use
   esa imagen. Las de `/brand/…` están en la carpeta `public/brand/` del
   proyecto; también podés pegar una dirección completa de internet
   ("https://…") entre las comillas. */
export const MEDIA = {
  /** El logo completo de la hostal (fondo transparente). */
  logo: asset("/brand/logo.svg"),
  /** El logo en chico, para el menú de arriba. */
  logomark: asset("/brand/logomark.svg"),
  /** La llave de la habitación: la chapita del hero. */
  emblem: asset("/brand/emblem.svg"),
  /** Los arcos plateados: el resplandor detrás del teléfono del hero y la
      marca que gira en la sección "La hostal". */
  arcs: asset("/brand/arcs.svg"),

  /** ⚠ Estas "fotos" son ILUSTRACIONES provisorias, no fotos reales de la
      hostal. Reemplazalas por fotos de verdad apenas las tengas (comando 8
      de EDITAR.md). */
  photos: {
    /** La fachada blanca de día (horizontal): fondo del hero. */
    facadeWide: asset("/brand/photos/facade-wide.svg"),
    /** La fachada blanca de día (vertical): fondo del hero en celular. */
    facadeTall: asset("/brand/photos/facade-tall.svg"),
    /** La fachada de noche, con las ventanas encendidas. */
    facadeNight: asset("/brand/photos/facade-night.svg"),
    /** Una habitación: cama, ventana y televisor. */
    room: asset("/brand/photos/room.svg"),
    /** El baño privado de la habitación. */
    bathroom: asset("/brand/photos/bathroom.svg"),
    /** Notebook conectado al wifi. */
    wifi: asset("/brand/photos/wifi.svg"),
    /** Televisor de la habitación. */
    tv: asset("/brand/photos/tv.svg"),
    /** El comedor común. */
    dining: asset("/brand/photos/dining.svg"),
    /** La lavandería común. */
    laundry: asset("/brand/photos/laundry.svg"),
    /** La habitación adaptada para personas con movilidad reducida. */
    accessible: asset("/brand/photos/accessible.svg"),
    /** Supermercado del barrio. */
    supermarket: asset("/brand/photos/supermarket.svg"),
    /** Un casino de noche (dibujo genérico, no el logo del Casino Antay). */
    casino: asset("/brand/photos/casino.svg"),
    /** Paradero, micro y colectivo frente a la hostal. */
    transport: asset("/brand/photos/transport.svg"),
  },
} as const;

/* ─────────────── 2. FONDOS DE CADA SECCIÓN ───────────────
   Las capas se pintan de arriba hacia abajo: la PRIMERA de la lista es
   la que queda más atrás.

   Para sacar una capa, borrá su línea.
   Para poner una foto de fondo, dejá una sola capa así:
       hero: [{ type: "image", src: "https://tu-foto.jpg" }],
   Para un video:
       hero: [{ type: "video", src: "...", poster: "...", mode: "loop" }],
   Para un color plano:
       hero: [{ type: "color", value: "#0b1420" }],

   Tipos disponibles: "image" · "video" · "color" · "gradient" ·
   "veil" (un velo encima) · "grain" (grano de película) · "vignette". */
export const BACKGROUNDS: Record<string, Layer[]> = {
  /** Hero en computadora: la fachada blanca a la derecha, oscurecida
      desde la izquierda para que el título se lea, y un brillo celeste
      detrás del teléfono. */
  hero: [
    { type: "color", value: "var(--color-night)" },
    {
      type: "image",
      src: MEDIA.photos.facadeWide,
      fit: "cover",
      position: "60% 40%",
      bleed: "6%",
      opacity: 0.6,
      parallax: 70,
    },
    {
      type: "veil",
      value:
        "linear-gradient(90deg, var(--color-night) 10%, rgba(11,20,32,0.85) 45%, rgba(11,20,32,0.4) 100%)",
    },
    { type: "veil", value: "linear-gradient(0deg, var(--color-night) 0%, transparent 40%)" },
    {
      type: "veil",
      value: "radial-gradient(ellipse 40% 55% at 67% 52%, rgba(92,200,240,0.18), transparent 70%)",
    },
    { type: "grain", opacity: 0.7 },
  ],

  /** Hero en celular. Misma receta, fachada vertical. */
  heroMobile: [
    { type: "color", value: "var(--color-night)" },
    { type: "image", src: MEDIA.photos.facadeTall, fit: "cover", position: "center 40%", opacity: 0.45 },
    {
      type: "veil",
      value:
        "linear-gradient(180deg, rgba(11,20,32,0.92) 0%, rgba(11,20,32,0.55) 45%, var(--color-night) 100%)",
    },
    {
      type: "veil",
      value: "radial-gradient(ellipse 60% 35% at 50% 58%, rgba(92,200,240,0.16), transparent 70%)",
    },
    { type: "grain", opacity: 0.7 },
  ],

  /** Fondo de todo lo que viene después del hero: azul noche con un
      brillo celeste muy suave arriba. */
  body: [
    {
      type: "gradient",
      value: "linear-gradient(180deg, var(--color-night) 0px, var(--color-coal) 900px, var(--color-night) 100%)",
    },
    {
      type: "veil",
      value: "radial-gradient(ellipse 70% 900px at 85% 0px, rgba(92,200,240,0.08), transparent 70%)",
    },
  ],
};

/* ─────────────── 3. TEXTOS ─────────────── */

/** Menú de arriba (y el menú de pantalla completa del celular). */
export const NAV = {
  /** La palabra que acompaña al logo y la gigante del pie de página. */
  wordmark: "Los Carrera",
  /** Los cinco enlaces. `preview` es la foto que sigue al cursor en el menú. */
  links: [
    { id: "home", label: "Inicio", href: "#home", preview: MEDIA.photos.facadeWide },
    { id: "about", label: "La hostal", href: "#about", preview: MEDIA.photos.room },
    { id: "classes", label: "Servicios", href: "#classes", preview: MEDIA.photos.bathroom },
    { id: "instructors", label: "Huéspedes", href: "#instructors", preview: MEDIA.photos.dining },
    { id: "community", label: "Ubicación", href: "#community", preview: MEDIA.photos.transport },
  ],
  /** Botón que abre el menú en el celular. */
  menuLabel: "Menú",
  /** Botón que cierra el menú. */
  closeLabel: "Cerrar",
  /** Nombre del menú para lectores de pantalla (no se ve). */
  dialogLabel: "Menú principal",
  /** Frase y correo del pie del menú. ⚠ Poné acá tu correo real. */
  footnote: "Habitaciones con baño privado en Copiapó",
  email: "contacto@hostalloscarrera.cl",
};

/** Teléfonos de contacto. Cada uno tiene tres líneas: cómo se ve, el
    número para llamar (sin espacios) y el de WhatsApp (sin "+" ni espacios).
    ⚠ ESTE NÚMERO ES DE EJEMPLO: poné el teléfono real de la hostal en las
    tres líneas. Para agregar otro, copiá un bloque { … } entero; para sacar
    uno, borrá su bloque. */
export const CONTACT = {
  phones: [{ display: "+56 9 0000 0000", tel: "tel:+56900000000", whatsapp: "https://wa.me/56900000000" }],
  callLabel: "Llamar",
  whatsappLabel: "WhatsApp",
  /** Frase sobre los botones de contacto de la sección final. */
  prompt: "¿Prefieres reservar por teléfono? Llámanos o escríbenos:",
  /** Nombre del enlace del teléfono, para lectores de pantalla (no se ve). */
  phoneAria: "Llamar a Hostal Los Carrera",
};

/** Redes sociales. `id` elige el ícono: "facebook", "instagram", "linkedin",
    "youtube" o "x". ⚠ Cambiá las direcciones por las de tus perfiles. */
export const SOCIALS = [
  { id: "facebook", label: "Facebook", href: "https://www.facebook.com" },
  { id: "instagram", label: "Instagram", href: "https://instagram.com" },
] as const;

/** El hero: lo primero que se ve. */
export const HERO = {
  /** El nombre de la marca. */
  brand: "Hostal Los Carrera",
  /** Título que leen los lectores de pantalla (no se ve en la página). */
  srTitle: "Hostal Los Carrera — Habitaciones con baño privado en Copiapó.",
  /**
   * ⚠ ZONA DIFÍCIL — el título grande está partido en pedazos que se
   * colocan a mano: "H", el anillo celeste que hace de "O" (y que rodea al
   * teléfono) y "STAL". Juntos se leen "HOSTAL". Cambiar estos pedazos por
   * otra palabra NO alcanza: hay que recolocarlos. Mirá "Lo que NO es
   * fácil" en EDITAR.md.
   */
  brandParts: { ge: "H", rig: "stal" },
  /** El lema, en dos bloques de dos líneas cada uno. */
  tagline: [
    ["Los Carrera", "Copiapó"],
    ["Baño privado", "Wifi gratis"],
  ],
  /** Los botones del hero. */
  buttons: [
    { label: "Reservar", href: "#join", style: "solid" },
    { label: "Ver servicios", href: "#classes", style: "ghost" },
  ],
  body: "Una casa blanca para descansar en Copiapó: habitaciones con baño privado, wifi gratis y televisión, comedor y lavandería comunes. Cerca de supermercados y del Casino Antay, con locomoción colectiva en la puerta.",
  /** Las dos tarjetas con número que cuenta hacia arriba. */
  stats: [
    { value: 100, suffix: "%", label: "Con baño privado" },
    { value: 1, suffix: "", label: "Habitación accesible" },
  ],
  /** Lo que se lee en la pantalla del teléfono dibujado. */
  phone: {
    status: "Wifi gratis · TV en cada pieza",
    menu: ["Habitaciones", "Servicios", "Ubicación", "Reservar"],
    toast: "Reserva solicitada",
  },
} as const;

/** La cinta de frases que corre debajo del hero. */
export const MARQUEE = {
  items: [
    "Baño privado en cada habitación",
    "Wifi gratis",
    "Televisión en cada habitación",
    "Comedor y lavandería comunes",
    "Habitación accesible",
    "Cerca del Casino Antay",
    "Locomoción colectiva en la puerta",
  ],
  /** El separador de la fila grande y el de la fila chica. */
  separators: ["✦", "—"],
};

/** Sección "La hostal". `title` va en blanco y `accent` en celeste, debajo. */
export const MANIFESTO = {
  kicker: "La hostal",
  title: "Una casa blanca",
  accent: "en Copiapó",
  lead: "Hostal Los Carrera es una casa blanca, tranquila y bien ubicada. Cada habitación tiene su propio baño, wifi gratis y televisión, y los espacios comunes —comedor y lavandería— están para que te sientas como en casa, ya sea por una noche o por una temporada de trabajo.",
  pillars: [
    {
      number: "01",
      title: "Descansa",
      text: "Habitaciones con baño privado: tu ducha, tu lavamanos y tu tranquilidad, sin compartir.",
    },
    {
      number: "02",
      title: "Conéctate",
      text: "Wifi gratis en toda la hostal y televisión en cada habitación.",
    },
    {
      number: "03",
      title: "Comparte",
      text: "Comedor y lavandería comunes, para cocinar, comer y lavar tu ropa sin salir de la hostal.",
    },
  ],
  /** Las tres cifras que cuentan hacia arriba. */
  figures: [
    { value: 100, suffix: "%", label: "Habitaciones con baño privado" },
    { value: 100, suffix: "%", label: "Habitaciones con TV y wifi gratis" },
    { value: 1, suffix: "", label: "Habitación adaptada para movilidad reducida" },
  ],
  /** Las dos fotos de la derecha: la grande y la chica que se le monta encima. */
  media: [
    { src: MEDIA.photos.room, caption: "Habitación con TV y wifi" },
    { src: MEDIA.photos.bathroom, caption: "Baño privado" },
  ],
};

/** Las áreas del filtro de servicios. La primera muestra todas. */
export const LEVELS = ["Todos", "Habitación", "Espacios comunes", "Ubicación"] as const;

/** Sección de servicios. `level` tiene que ser una de las LEVELS de arriba.
    `parallax` (opcional) es cuánto se mueve la foto al bajar. */
export const CLASSES = {
  kicker: "Servicios",
  title: "Todo lo que",
  accent: "necesitas",
  lead: "Lo que encuentras en la hostal y a su alrededor: desde tu habitación hasta el paradero en la puerta.",
  cta: { label: "Reservar una habitación", href: "#join" },
  /** Nombre del filtro para lectores de pantalla (no se ve). */
  filterLabel: "Filtrar servicios por área",
  /** Aviso para lectores de pantalla al filtrar (no se ve). */
  announce: (count: number, level: string) => `${count} servicios visibles en ${level}.`,
  items: [
    {
      title: "Baño privado",
      level: "Habitación",
      tag: "En cada habitación",
      copy: "Todas las habitaciones tienen su propio baño, con ducha y lavamanos. Sin turnos ni pasillos.",
      image: MEDIA.photos.bathroom,
    },
    {
      title: "Wifi gratis",
      level: "Habitación",
      tag: "Sin costo",
      copy: "Conexión a internet gratis para trabajar, estudiar o hablar con tu familia.",
      image: MEDIA.photos.wifi,
    },
    {
      title: "Televisión",
      level: "Habitación",
      tag: "En cada habitación",
      copy: "Cada habitación tiene su propio televisor para descansar después del día.",
      image: MEDIA.photos.tv,
      parallax: 6,
    },
    {
      title: "Habitación accesible",
      level: "Habitación",
      tag: "Movilidad reducida",
      copy: "Contamos con una habitación adaptada para personas con movilidad reducida o en silla de ruedas.",
      image: MEDIA.photos.accessible,
    },
    {
      title: "Comedor común",
      level: "Espacios comunes",
      tag: "Uso compartido",
      copy: "Un comedor para preparar tus comidas, tomar desayuno o conversar con otros huéspedes.",
      image: MEDIA.photos.dining,
    },
    {
      title: "Lavandería común",
      level: "Espacios comunes",
      tag: "Uso compartido",
      copy: "Lava tu ropa en la hostal: ideal para estadías largas y viajes de trabajo.",
      image: MEDIA.photos.laundry,
    },
    {
      title: "Supermercados cerca",
      level: "Ubicación",
      tag: "A pasos",
      copy: "Supermercados a poca distancia para abastecerte sin tomar locomoción.",
      image: MEDIA.photos.supermarket,
    },
    {
      title: "Casino Antay",
      level: "Ubicación",
      tag: "Muy cerca",
      copy: "Estamos cerca del Casino Antay de Copiapó: entretención, restaurantes y espectáculos al lado.",
      image: MEDIA.photos.casino,
    },
    {
      title: "Locomoción a la puerta",
      level: "Ubicación",
      tag: "Micros y colectivos",
      copy: "La locomoción colectiva pasa frente a la hostal: llegas fácil al centro y a todo Copiapó.",
      image: MEDIA.photos.transport,
    },
  ],
};

/** Sección de huéspedes: para quién es la hostal. */
export const INSTRUCTORS = {
  kicker: "Huéspedes",
  title: "Un lugar para",
  accent: "cada viaje",
  lead: "Por trabajo, de paseo o de paso: la hostal está pensada para que todos lleguen y descansen bien.",
  people: [
    {
      name: "Trabajadores",
      role: "Estadías por faena o contrato",
      badge: "Trabajo",
      bio: "Baño privado, wifi y lavandería para estadías largas, con locomoción en la puerta para moverte por Copiapó.",
      image: MEDIA.photos.laundry,
    },
    {
      name: "Viajeros",
      role: "De paso por Atacama",
      badge: "Turismo",
      bio: "Un lugar limpio y tranquilo para descansar antes de seguir viaje por el norte.",
      image: MEDIA.photos.facadeWide,
    },
    {
      name: "Familias",
      role: "Visitas y trámites",
      badge: "Familia",
      bio: "Habitaciones con su propio baño y un comedor común para compartir las comidas.",
      image: MEDIA.photos.dining,
    },
    {
      name: "Movilidad reducida",
      role: "Habitación adaptada",
      badge: "Accesible",
      bio: "Una habitación preparada para personas con movilidad reducida o que usan silla de ruedas.",
      image: MEDIA.photos.accessible,
    },
    {
      name: "Visitantes del casino",
      role: "Una noche de entretención",
      badge: "Entretención",
      bio: "Cerca del Casino Antay: disfruta la noche y vuelve a descansar a pocos pasos.",
      image: MEDIA.photos.casino,
    },
    {
      name: "Teletrabajo",
      role: "Trabaja desde la pieza",
      badge: "Trabajo",
      bio: "Wifi gratis y tranquilidad para conectarte a tus reuniones desde tu habitación.",
      image: MEDIA.photos.wifi,
    },
  ],
};

/** Galería. `shape`: "tall" (alta), "wide" (ancha) o "normal" (cuadrada).
    `parallax` (opcional) cambia cuánto se mueve esa foto al bajar. */
export const GALLERY = {
  kicker: "Galería",
  title: "Conoce",
  accent: "la hostal",
  lead: "Pulsa cualquier imagen para verla en grande. (Ilustraciones de referencia: pronto, fotos reales.)",
  /** Botones del visor ampliado, para lectores de pantalla (no se ven). */
  closeLabel: "Cerrar imagen",
  prevLabel: "Imagen anterior",
  nextLabel: "Imagen siguiente",
  items: [
    { caption: "Habitación", shape: "tall", src: MEDIA.photos.room },
    { caption: "La fachada blanca", shape: "wide", src: MEDIA.photos.facadeWide },
    { caption: "Baño privado", shape: "normal", src: MEDIA.photos.bathroom },
    { caption: "Comedor común", shape: "normal", src: MEDIA.photos.dining },
    { caption: "La hostal de noche", shape: "wide", src: MEDIA.photos.facadeNight },
    { caption: "Lavandería común", shape: "normal", src: MEDIA.photos.laundry, parallax: 6 },
    { caption: "Habitación accesible", shape: "normal", src: MEDIA.photos.accessible },
  ],
} as const;

/** Ubicación: el carrusel con lo que hay cerca de la hostal. */
export const TESTIMONIALS = {
  kicker: "Ubicación",
  title: "Todo",
  accent: "a mano",
  lead: "Cinco razones para quedarte en Los Carrera, en Copiapó.",
  /** Para lectores de pantalla (no se ven). */
  regionLabel: "Ubicación",
  prevLabel: "Anterior",
  nextLabel: "Siguiente",
  goTo: (n: number) => `Ir a la razón ${n}`,
  announce: (n: number, total: number, title: string) =>
    `Razón ${n} de ${total}: ${title.replace(/\.$/, "")}.`,
  items: [
    {
      title: "Locomoción a la puerta",
      body: "Micros y colectivos pasan frente a la hostal.",
      image: MEDIA.photos.transport,
    },
    {
      title: "Supermercados cerca",
      body: "Compra lo que necesites a pocos pasos.",
      image: MEDIA.photos.supermarket,
    },
    {
      title: "Cerca del Casino Antay",
      body: "Entretención y restaurantes al lado de la hostal.",
      image: MEDIA.photos.casino,
    },
    {
      title: "Tu propio baño",
      body: "Cada habitación tiene baño privado, wifi gratis y televisión.",
      image: MEDIA.photos.bathroom,
    },
    {
      title: "Como en casa",
      body: "Comedor y lavandería comunes para estadías cortas o largas.",
      image: MEDIA.photos.dining,
    },
  ],
};

/** Tarifas. `featured: true` pinta la tarjeta en celeste.
    Precios: poné un número en `monthly` y `yearly` (por ejemplo 25000) para
    mostrarlo; con `null` se muestra "A consultar" y se esconde el selector.
    ⚠ Revisá que estas estadías sean las que ofrece la hostal. */
export const PLANS = {
  kicker: "Tarifas",
  title: "Elige tu",
  accent: "estadía",
  lead: "Por una noche o por una temporada. Escríbenos y te contamos la disponibilidad y el valor.",
  billing: { monthly: "Mensual", yearly: "Anual", badge: "−2 meses" },
  per: { monthly: "/noche", yearly: "/noche" },
  currency: "$",
  quote: "A consultar",
  featuredBadge: "Más pedida",
  choose: (name: string) => `Consultar ${name.toLowerCase()}`,
  href: "#join",
  items: [
    {
      name: "Por noche",
      monthly: null as number | null,
      yearly: null as number | null,
      copy: "Para viajes cortos y visitas de paso.",
      perks: ["Habitación con baño privado", "Wifi gratis y televisión", "Comedor y lavandería comunes"],
      featured: false,
    },
    {
      name: "Por semana",
      monthly: null as number | null,
      yearly: null as number | null,
      copy: "Para turnos y trabajos de algunos días.",
      perks: ["Todo lo de la estadía por noche", "Lavandería para tu ropa", "Locomoción en la puerta"],
      featured: true,
    },
    {
      name: "Por mes",
      monthly: null as number | null,
      yearly: null as number | null,
      copy: "Para contratos y estadías largas en Copiapó.",
      perks: ["Todo lo de la estadía por semana", "Tu habitación por todo el mes", "Supermercados cerca"],
      featured: false,
    },
  ],
};

/** Sección final con el formulario para pedir una reserva. */
export const JOIN = {
  pill: "Reserva tu habitación",
  headlines: ["Tu pieza,", "tu baño."],
  /** Etiqueta del campo para lectores de pantalla (no se ve). */
  emailLabel: "Tu correo",
  placeholder: "nombre@correo.cl",
  submit: "Consultar disponibilidad",
  sending: "Enviando…",
  error: "Escribe un correo válido, por ejemplo nombre@correo.cl.",
  done: (email: string) =>
    `Listo. Te escribiremos a ${email} con la disponibilidad y el valor de las habitaciones.`,
};

/** Columnas de enlaces del pie. `href: null` = texto sin enlace todavía. */
export const FOOTER_LINKS = [
  {
    title: "La hostal",
    links: [
      { label: "Servicios", href: "#classes" },
      { label: "Huéspedes", href: "#instructors" },
      { label: "Ubicación", href: "#community" },
      { label: "Tarifas", href: "#membership" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Reservar", href: "#join" },
      ...CONTACT.phones.map((p) => ({ label: p.display, href: p.tel })),
      { label: NAV.email, href: `mailto:${NAV.email}` },
      { label: CONTACT.whatsappLabel, href: CONTACT.phones[0].whatsapp },
    ],
  },
  {
    title: "Cómo llegar",
    links: [
      { label: "Copiapó, Atacama", href: null },
      { label: "Cerca del Casino Antay", href: null },
      /** ⚠ Cambiá este enlace por el de la hostal en Google Maps. */
      { label: "Ver en el mapa", href: "https://www.google.com/maps/search/?api=1&query=Hostal+Los+Carrera+Copiap%C3%B3" },
    ],
  },
];

/** Línea final del pie de página. */
export const FOOTER = {
  copyright: "© 2026 Hostal Los Carrera",
  credit: "Habitaciones con baño privado en Copiapó.",
  /** Botón flotante para volver arriba, para lectores de pantalla (no se ve). */
  backToTop: "Volver arriba",
};
