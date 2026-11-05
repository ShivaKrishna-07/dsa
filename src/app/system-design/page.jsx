import { Suspense } from "react";
import PageFade from "@/components/ui/PageFade";
import SystemDesignWorkspace from "@/components/system-design/SystemDesignWorkspace";

export const metadata = {
  title: "System Design (HLD) Roadmap & Preparation | DSA Pattern Sheet",
  description:
    "Comprehensive 8-week High-Level Design (HLD) preparation curriculum for freshers and SDE-1 engineers, covering 37 fundamental concepts, 16 core design problems, and an 8-step interview answering framework.",
};

export default function SystemDesignPage() {
  return (
    <PageFade className="w-full">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl w-full px-4 py-8 text-xs text-ink-400">
            Loading System Design curriculum...
          </div>
        }
      >
        <SystemDesignWorkspace />
      </Suspense>
    </PageFade>
  );
}

