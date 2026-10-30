/* Un píxel de diseño. Dentro del artboard `--c` vale `var(--u)` (un píxel del frame 1440x810);
   fuera de él vale 1px, así la misma pieza se dibuja a escala del frame o a tamaño nativo. */
export const c = (n: number) => `calc(var(--c, 1px) * ${n})`;
