import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header";
import PageOverflowController from "@/components/ui/PageOverflowController";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { LayoutProvider } from "@/context/LayoutContext";
import { BookmarkProvider } from "@/context/BookmarkContext";
import AppLayoutView from "@/components/layout/AppLayoutView";
import { getSearchItems, topics } from "@/lib/data";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSA Pattern Sheet",
  description: "Learn DSA patterns first, then solve the problems that use them.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" }
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "DSA Pattern Sheet",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport = {
  themeColor: "#09090b",
};

export default function RootLayout({ children }) {
  const navigationTree = topics.map((topic) => ({
    slug: topic.slug,
    title: topic.title,
    icon: topic.icon,
    patterns: (topic.patterns || []).map((pattern) => ({
      slug: pattern.slug,
      title: pattern.title,
      problems: (pattern.problems || []).map((problem) => ({
        slug: problem.slug,
        title: problem.title,
        difficulty: problem.difficulty,
        label: problem.label || null,
        platforms: problem.platforms || {}
      }))
    }))
  }));

  const searchItems = getSearchItems();

  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <LayoutProvider>
            <BookmarkProvider>
              <div className="min-h-screen flex flex-col bg-ink-950 text-ink-100">
                <PageOverflowController />
                <Header tree={navigationTree} items={searchItems} />
                <main className="flex-1 flex flex-col">
                  <AppLayoutView tree={navigationTree}>{children}</AppLayoutView>
                </main>
              </div>
            </BookmarkProvider>
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
