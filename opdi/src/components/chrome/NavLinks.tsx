"use client";

import type { CSSProperties } from "react";
import { NAV_ITEMS } from "@/lib/content";
import { useChrome } from "./SiteChrome";

/* Los tres links del frame. El activo va en negrita blanca, los demás en gris. */
export default function NavLinks({ className, style, linkStyle }: { className?: string; style?: CSSProperties; linkStyle?: CSSProperties }) {
  const { activeGroup, go } = useChrome();
  return (
    <nav className={className} style={style}>
      {NAV_ITEMS.map((item) => {
        const active = item.id === activeGroup;
        return (
          <a
            key={item.id}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onClick={(event) => {
              event.preventDefault();
              go(item.id);
            }}
            style={linkStyle}
            className={`transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white ${
              active ? "font-bold text-white" : "font-normal text-mist hover:text-white"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
