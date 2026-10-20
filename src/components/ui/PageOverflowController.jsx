"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useLayout } from "@/context/LayoutContext";

export default function PageOverflowController() {
  const pathname = usePathname();
  const { layoutMode } = useLayout();

  useLayoutEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const shouldLockPageScroll = layoutMode === "sheet" || segments.length === 3;

    document.documentElement.classList.toggle("route-lock-scroll", shouldLockPageScroll);
    document.body.classList.toggle("route-lock-scroll", shouldLockPageScroll);

    return () => {
      document.documentElement.classList.remove("route-lock-scroll");
      document.body.classList.remove("route-lock-scroll");
    };
  }, [pathname, layoutMode]);

  return null;
}
