"use client";

import { createContext, useContext, useEffect, useState } from "react";

const LayoutContext = createContext({
  layoutMode: "standard",
  toggleLayoutMode: () => {},
  setLayoutMode: () => {},
  activeProblemMeta: null,
  setActiveProblemMeta: () => {},
  activeProblemSlug: null,
  setActiveProblemSlug: () => {}
});

export function LayoutProvider({ children }) {
  const [layoutMode, setLayoutModeState] = useState("standard");
  const [activeProblemMeta, setActiveProblemMeta] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("dsa_layout_mode");
      if (saved === "standard" || saved === "sheet") {
        setLayoutModeState(saved);
      }
      const savedMeta = localStorage.getItem("dsa_active_problem_meta");
      if (savedMeta) {
        const parsed = JSON.parse(savedMeta);
        if (parsed?.problemSlug) {
          setActiveProblemMeta(parsed);
        }
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

  const updateActiveProblemMeta = (meta) => {
    setActiveProblemMeta(meta);
    try {
      if (meta) {
        localStorage.setItem("dsa_active_problem_meta", JSON.stringify(meta));
      }
    } catch (e) {}
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutMode: mounted ? layoutMode : "standard",
        toggleLayoutMode,
        setLayoutMode,
        activeProblemMeta,
        setActiveProblemMeta: updateActiveProblemMeta,
        activeProblemSlug: activeProblemMeta?.problemSlug || null,
        setActiveProblemSlug: (slug) => {
          updateActiveProblemMeta(activeProblemMeta ? { ...activeProblemMeta, problemSlug: slug } : { problemSlug: slug });
        }
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
