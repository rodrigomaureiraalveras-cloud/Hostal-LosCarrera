/* La estructura de líneas del frame. No hay línea completa al 50%: la del centro es la corta. */
export default function GridLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {["0%", "25%", "75%", "100%"].map((left) => (
        <span key={left} className="absolute top-0 h-full w-px bg-white/10" style={{ left }} />
      ))}
      <span className="absolute left-1/2 w-px bg-white/10" style={{ height: "79.56%", top: "10.22%" }} />
    </div>
  );
}
