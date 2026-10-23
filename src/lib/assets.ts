/* Direcciones de las imágenes. No hace falta tocar este archivo: las
   imágenes se cambian en `src/lib/content.ts`, sección "IMÁGENES".

   Por defecto las imágenes salen de la carpeta `public/` del proyecto
   (por ejemplo `public/brand/logo.webp`). Si algún día las subís a un
   servidor de imágenes, poné su dirección en la variable
   NEXT_PUBLIC_ASSET_BASE y todas las direcciones cambian solas. */

const BASE = (process.env.NEXT_PUBLIC_ASSET_BASE ?? "").replace(/\/+$/, "");
export const asset = (path: string) => `${BASE}${path}`;

/*
 * La máscara de la sombra interior del anillo "O" del hero (EFFECT-09).
 *
 * NO la muevas a `public/` ni a MEDIA: se usa como `mask-image`, y Chrome
 * descarta en silencio una máscara SVG que viene de otro dominio — la sombra
 * simplemente deja de pintarse, sin ningún error. Por eso va incrustada
 * como `data:` URI acá mismo.
 */
export const PILL_MASK =
  "data:image/svg+xml,%3Csvg preserveAspectRatio='none' overflow='visible' width='548.604' height='115.93' viewBox='0 0 548.604 115.93' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='10.5' y='10.5' width='527.604' height='94.9297' rx='44.5' stroke='white' stroke-width='21'/%3E%3C/svg%3E";
