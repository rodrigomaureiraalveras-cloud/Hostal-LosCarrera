"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { scrollToId, useScrollSpy } from "@/lib/hooks";
import LoginModal from "./LoginModal";
import MenuOverlay from "./MenuOverlay";
import StickyBars from "./StickyBars";

const SPY_IDS = ["home", "method", "services", "impact", "journal", "questions", "contact"];

/* El frame de Figma dibuja sólo tres links: las siete secciones se pliegan sobre ellos. */
const NAV_GROUPS: Record<string, string> = {
  home: "home",
  method: "home",
  services: "services",
  impact: "services",
  journal: "services",
  questions: "contact",
  contact: "contact",
};

type Chrome = {
  activeGroup: string;
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
  openLogin: () => void;
  go: (id: string) => void;
};

const ChromeContext = createContext<Chrome | null>(null);

export function useChrome() {
  const value = useContext(ChromeContext);
  if (!value) throw new Error("useChrome() tiene que usarse dentro de <SiteChrome>.");
  return value;
}

export default function SiteChrome({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const active = useScrollSpy(SPY_IDS);

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const openLogin = useCallback(() => {
    setMenuOpen(false);
    setLoginOpen(true);
  }, []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);
  const go = useCallback((id: string) => {
    setMenuOpen(false);
    scrollToId(id);
  }, []);

  const value = useMemo(
    () => ({ activeGroup: NAV_GROUPS[active] ?? "home", menuOpen, toggleMenu, closeMenu, openLogin, go }),
    [active, menuOpen, toggleMenu, closeMenu, openLogin, go],
  );

  return (
    <ChromeContext.Provider value={value}>
      <StickyBars />
      {children}
      <MenuOverlay />
      <LoginModal open={loginOpen} onClose={closeLogin} />
    </ChromeContext.Provider>
  );
}
