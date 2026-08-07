"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageOverflowController() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const segments = pathname.split("/").filter(Boolean);
    const shouldLockPageScroll = segments.length > 0;

    document.documentElement.classList.toggle("route-lock-scroll", shouldLockPageScroll);
    document.body.classList.toggle("route-lock-scroll", shouldLockPageScroll);

    return () => {
      document.documentElement.classList.remove("route-lock-scroll");
      document.body.classList.remove("route-lock-scroll");
    };
  }, [pathname]);

  return null;
}
