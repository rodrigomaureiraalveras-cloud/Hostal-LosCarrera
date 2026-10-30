/* Única fuente de URLs de imágenes y video. Para usar tus propias fotos y tu
   film, súbelos con los mismos nombres y apunta NEXT_PUBLIC_ASSET_BASE a tu bucket. */
const DEFAULT_BASE = "https://pub-36eefd528bbb4e28bdef0ce39a1018e0.r2.dev/Prompt/40green/public";
const BASE = (process.env.NEXT_PUBLIC_ASSET_BASE ?? DEFAULT_BASE).replace(/\/$/, "");

export const asset = (path: string) => `${BASE}${path.startsWith("/") ? path : `/${path}`}`;

export const IMAGES = {
  /* Último cuadro del film: lo que ve quien pide movimiento reducido. */
  heroStill: asset("/images/hero-still.jpg"),
  /* El fondo vacío del film, como foto fija (vista previa del menú). */
  heroBackdrop: asset("/images/hero-bg.jpg"),
  mossRock: asset("/images/moss-rock.jpg"),
  mossBranch: asset("/images/moss-branch.jpg"),
  mossDark: asset("/images/moss-dark.jpg"),
  mossWave: asset("/images/moss-wave.jpg"),
  mossRidge: asset("/images/moss-ridge.jpg"),
};

/* Film del hero: 3,5 s, sin audio, se reproduce una sola vez. */
export const HERO_MOTION = {
  webm: asset("/media/hero-motion.webm"),
  mp4: asset("/media/hero-motion.mp4"),
  poster: asset("/media/hero-motion-poster.jpg"),
};

/* Film del estudio: sólo se reproduce dentro del lightbox. */
export const BRAND_FILM = {
  mp4: asset("/media/arkkhe-film.mp4"),
  poster: asset("/media/arkkhe-film-poster.jpg"),
};

/* El isotipo de Opdi sobre fondo tinta (#121820), con el celeste del logo. */
export const FAVICON =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#121820"/><g transform="translate(4 4)" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.6"><path d="M13 4.2 5.2 12l4.6 4.6" stroke="#1b69a5"/><path d="M11 19.8l7.8-7.8-4.6-4.6" stroke="#3aa6e2"/></g></svg>`,
  );
