import Link from "next/link";
import { Brackets } from "lucide-react";
import SearchBox from "@/components/ui/SearchBox";
import { getSearchItems } from "@/lib/data";

export default function Header() {
  const items = getSearchItems();
  
  return (
    <header className="sticky top-0 z-30 border-b border-ink-800 bg-ink-950/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
        <Link href="/" className="flex min-w-max items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-accent-500 text-white">
            <Brackets className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="hidden sm:inline">DSA Patterns</span>
        </Link>

        <div className="ml-auto flex min-w-0 flex-1 justify-end">
          <SearchBox items={items} />
        </div>
      </div>
    </header>
  );
}
