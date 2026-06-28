import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/ui/Header";
import ThemeProvider from "@/components/ui/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DSA Pattern Sheet",
  description: "Learn DSA patterns first, then solve the problems that use them."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <div className="min-h-screen bg-ink-950 text-ink-100">
            <Header />
            <main>{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
