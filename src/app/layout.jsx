import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header";
import PageOverflowController from "@/components/ui/PageOverflowController";
import RouteBreadcrumb from "@/components/ui/RouteBreadcrumb";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { topics } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSA Pattern Sheet",
  description: "Learn DSA patterns first, then solve the problems that use them."
};

export default function RootLayout({ children }) {
  const navigationTree = topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    patterns: topic.patterns.map((pattern) => ({
      slug: pattern.slug,
      title: pattern.title,
      problems: pattern.problems.map((problem) => ({
        slug: problem.slug,
        title: problem.title,
        difficulty: problem.difficulty
      }))
    }))
  }));

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-ink-950 text-ink-100">
            <PageOverflowController />
            <Header />
            <RouteBreadcrumb tree={navigationTree} />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}


