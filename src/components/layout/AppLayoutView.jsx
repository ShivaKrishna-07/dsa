"use client";

import { usePathname } from "next/navigation";
import { useLayout } from "@/context/LayoutContext";
import StriverSheetWorkspace from "@/components/workspace/StriverSheetWorkspace";

export default function AppLayoutView({ children, tree = [] }) {
  const { layoutMode } = useLayout();
  const pathname = usePathname();

  // Dedicated routes like /interview-experiences render directly
  if (pathname?.startsWith("/interview-experiences")) {
    return children;
  }

  if (layoutMode === "sheet") {
    return <StriverSheetWorkspace initialTree={tree} />;
  }

  return children;
}
