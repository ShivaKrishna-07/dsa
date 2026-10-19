import Link from "next/link";
import { Brain } from "lucide-react";
import SearchBox from "@/components/ui/SearchBox";
import { getSearchItems } from "@/lib/data";

export default function Header() {
  const items = getSearchItems();
  
  return (
    <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
        <Link href="/" className="flex min-w-max items-center gap-2.5 font-semibold transition hover:opacity-95">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 text-white shadow-md shadow-accent-500/20 ring-1 ring-white/20">
            <Brain className="h-4.5 w-4.5 stroke-[2.2]" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline tracking-tight text-ink-100">DSA Patterns</span>
        </Link>

        <div className="ml-auto flex min-w-0 flex-1 justify-end items-center gap-3">
          <SearchBox items={items} />
        </div>
      </div>
    </header>
  );
}
