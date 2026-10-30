# Opdi — Soluciones Digitales

Landing de una sola página para Opdi: sitios web, apps web, APK y apps móviles.
Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion 12.

## Ver el sitio

```
npm install
npm run dev
```

y abrí <http://localhost:3000>.

## Dónde se cambia cada cosa

- **Textos, precios, servicios, preguntas, datos de contacto:** `src/lib/content.ts`. Ningún componente tiene texto propio.
- **Fotos y videos:** `src/lib/assets.ts`. Por ahora usan material de muestra (musgo) desde un CDN;
  subí tus propias fotos y tu film con los mismos nombres y apuntá `NEXT_PUBLIC_ASSET_BASE` a tu bucket.
- **Colores y tipografías:** el bloque `@theme` de `src/app/globals.css` (celeste del logo = `--color-sky`).
- **Logo:** `OpdiMark` en `src/components/ui/Icons.tsx` y el favicon en `src/lib/assets.ts`.

## Cómo está armado

- El hero de escritorio es un artboard de 1440x810 en píxeles de diseño (`--u` en `globals.css`, `c()` en
  `components/hero/units.ts`): siempre ocupa exactamente una pantalla. Debajo de 1024 px se muestra una columna aparte.
- El film del hero se reproduce **una vez** y queda en su último cuadro; nunca se adelanta ni se repite.
- Cada pieza con parallax son dos `motion.div` anidados: el de afuera lleva el scroll, el de adentro la entrada.
- Los formularios (login, contacto, newsletter) validan de verdad pero no tienen backend: simulan el envío.
