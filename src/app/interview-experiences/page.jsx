import { Suspense } from "react";
import PageFade from "@/components/ui/PageFade";
import InterviewExperiencesWorkspace from "@/components/interviews/InterviewExperiencesWorkspace";

export const metadata = {
  title: "Interview Experiences (Google, Amazon, Microsoft) | DSA Pattern Sheet",
  description:
    "Explore recent candidate-reported coding round interview questions and graph DSA patterns from Google, Amazon, and Microsoft.",
};

export default function InterviewExperiencesPage() {
  return (
    <PageFade className="w-full">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl w-full px-4 py-8 text-xs text-ink-400">
            Loading interview experiences...
          </div>
        }
      >
        <InterviewExperiencesWorkspace />
      </Suspense>
    </PageFade>
  );
}

