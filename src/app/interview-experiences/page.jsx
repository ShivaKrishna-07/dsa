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
      <InterviewExperiencesWorkspace />
    </PageFade>
  );
}
