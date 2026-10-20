"use client";

import { useLayout } from "@/context/LayoutContext";
import StriverSheetWorkspace from "@/components/workspace/StriverSheetWorkspace";

export default function AppLayoutView({ children, tree = [] }) {
  const { layoutMode } = useLayout();

  if (layoutMode === "sheet") {
    return <StriverSheetWorkspace initialTree={tree} />;
  }

  return children;
}
