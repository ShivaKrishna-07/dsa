"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext({
  layoutMode: "standard",
  toggleLayoutMode: () => {},
  setLayoutMode: () => {},
  activeProblemSlug: null,
  setActiveProblemSlug: () => {}
});

export function LayoutProvider({ children }) {
  const [layoutMode, setLayoutModeState] = useState("standard");
  const [activeProblemSlug, setActiveProblemSlug] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("dsa_layout_mode");
      if (saved === "standard" || saved === "sheet") {
        setLayoutModeState(saved);
      }
    } catch (e) {}
  }, []);

  const setLayoutMode = (mode) => {
    setLayoutModeState(mode);
    try {
      localStorage.setItem("dsa_layout_mode", mode);
    } catch (e) {}
  };

  const toggleLayoutMode = () => {
    setLayoutModeState((prev) => {
      const next = prev === "sheet" ? "standard" : "sheet";
      try {
        localStorage.setItem("dsa_layout_mode", next);
      } catch (e) {}
      return next;
    });
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutMode: mounted ? layoutMode : "standard",
        toggleLayoutMode,
        setLayoutMode,
        activeProblemSlug,
        setActiveProblemSlug
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
