"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { useLayout } from "@/context/LayoutContext";

export default function PageOverflowController() {
  const pathname = usePathname();
  const { layoutMode } = useLayout();

  useLayoutEffect(() => {
    const isSpecialPage =
      pathname?.startsWith("/interview-experiences") ||
      pathname?.startsWith("/companies") ||
      pathname?.startsWith("/system-design");

    // Special pages (like /system-design) manage their own layout and must NEVER have page scroll locked!
    if (isSpecialPage) {
      document.documentElement.classList.remove("route-lock-scroll");
      document.body.classList.remove("route-lock-scroll");
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    const isProblemPage = segments.length === 3;
    const isDsaSheetHome = segments.length === 0 && layoutMode === "sheet";
    const shouldLockPageScroll = isProblemPage || isDsaSheetHome;

    document.documentElement.classList.toggle("route-lock-scroll", shouldLockPageScroll);
    document.body.classList.toggle("route-lock-scroll", shouldLockPageScroll);

    return () => {
      document.documentElement.classList.remove("route-lock-scroll");
      document.body.classList.remove("route-lock-scroll");
    };
  }, [pathname, layoutMode]);

  return null;
}
