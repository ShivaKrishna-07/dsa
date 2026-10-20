import Link from "next/link";
import { Brain } from "lucide-react";
import SearchBox from "@/components/ui/SearchBox";
import NavbarBreadcrumb from "@/components/ui/NavbarBreadcrumb";
import { getSearchItems } from "@/lib/data";

export default function Header({ tree = [] }) {
  const items = getSearchItems();

  return (
    <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur h-14">
      <div className="flex h-full w-full items-center justify-between gap-3 px-3 sm:px-4">
        {/* Left: Logo and Breadcrumb */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <Link
            href="/"
            className="flex shrink-0 items-center transition hover:opacity-95"
            title="DSA Patterns"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-md shadow-accent-500/20 ring-1 ring-white/20">
              <Brain className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
            </span>
          </Link>

          <NavbarBreadcrumb tree={tree} />
        </div>

        {/* Right: Search */}
        <div className="shrink-0 flex items-center gap-2">
          <SearchBox items={items} />
        </div>
      </div>
    </header>
  );
}
