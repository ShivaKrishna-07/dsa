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
    pathname?.startsWith("/companies") ||
    pathname?.startsWith("/system-design")
  ) {
    return children;
  }

  // When in sheet mode, render StriverSheetWorkspace on the home page (/).
  // Dedicated topic/pattern/problem routes render their dedicated pages so breadcrumbs and arrows navigate properly!
  if (layoutMode === "sheet" && pathname === "/") {
    return <StriverSheetWorkspace initialTree={tree} />;
  }

  return children;
}
