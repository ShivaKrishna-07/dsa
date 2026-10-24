"use client";

import { usePathname } from "next/navigation";
import { useLayout } from "@/context/LayoutContext";
import StriverSheetWorkspace from "@/components/workspace/StriverSheetWorkspace";

export default function AppLayoutView({ children, tree = [] }) {
  const { layoutMode } = useLayout();
  const pathname = usePathname();

  // Dedicated resource routes render directly without accordion sheet override
  if (
    pathname?.startsWith("/interview-experiences") ||
    pathname?.startsWith("/companies")
  ) {
    return children;
  }

  if (layoutMode === "sheet") {
    return <StriverSheetWorkspace initialTree={tree} />;
  }

  return children;
}
