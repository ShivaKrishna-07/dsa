import { Suspense } from "react";
import PageFade from "@/components/ui/PageFade";
import CompaniesWorkspace from "@/components/companies/CompaniesWorkspace";

export const metadata = {
  title: "Target Companies & Fresher SDE Packages (2026) | DSA Pattern Sheet",
  description:
    "Comprehensive directory of top tier-1 product, fintech, quant, and cloud companies hiring freshers in India with expected packages (₹10–60+ LPA) and career portal links.",
};

export default function CompaniesPage() {
  return (
    <PageFade className="w-full">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl w-full px-4 py-8 text-xs text-ink-400">
            Loading companies and packages...
          </div>
        }
      >
        <CompaniesWorkspace />
      </Suspense>
    </PageFade>
  );
}
