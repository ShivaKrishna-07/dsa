"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { ChevronRight, ChevronLeft } from "lucide-react";

function ContextMenu({ menu, position, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function close(event) {
      if (!ref.current?.contains(event.target)) onClose();
    }
    
    function handleScroll(event) {
      if (!ref.current?.contains(event.target)) onClose();
    }

    window.addEventListener("click", close);
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [onClose]);

  if (!menu) return null;

  return (
    <div
      ref={ref}
      className="fixed z-[70] w-72 overflow-hidden rounded-xl border border-ink-700 bg-ink-900/95 shadow-xl backdrop-blur-md"
      style={{ left: position.x, top: position.y }}
    >
      <div className="border-b border-ink-800 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-ink-500">
        {menu.title}
      </div>
      <div className="max-h-80 overflow-auto py-1">
        {menu.items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="block px-3 py-2.5 text-sm transition-colors hover:bg-ink-800"
          >
            <span className="block font-medium text-ink-100">{item.label}</span>
            {item.meta ? <span className="mt-0.5 block text-xs text-ink-500">{item.meta}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function Breadcrumb({ items, prevProblem, nextProblem, showNav }) {
  const [context, setContext] = useState(null);
  const router = useRouter();
  const allItems = [{ label: "Sheet", href: "/", menu: items[0]?.rootMenu }, ...items];

  useEffect(() => {
    if (!showNav) return;

    function handleKeyDown(event) {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA" ||
        document.activeElement.isContentEditable
      ) {
        return;
      }

      if (event.key === "ArrowLeft" && prevProblem) {
        router.push(prevProblem.href);
      } else if (event.key === "ArrowRight" && nextProblem) {
        router.push(nextProblem.href);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showNav, prevProblem, nextProblem, router]);

  function openMenu(event, item) {
    if (!item.menu?.items?.length) return;
    event.preventDefault();
    const x = Math.min(event.clientX, window.innerWidth - 300);
    const y = Math.min(event.clientY, window.innerHeight - 360);
    setContext({ menu: item.menu, position: { x, y } });
  }

  return (
    <>
      <div className="sticky top-16 z-20 mb-2 flex items-stretch gap-2">
        {showNav && (
          <div className="group relative shrink-0 flex">
            {prevProblem ? (
              <Link
                href={prevProblem.href}
                className="flex w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/30 text-ink-400 hover:bg-ink-800/60 hover:text-ink-100 transition shadow-sm backdrop-blur"
              >
                <ChevronLeft className="h-5 w-5" />
              </Link>
            ) : (
              <button
                disabled
                className="flex w-10 items-center justify-center rounded-xl border border-ink-800/30 bg-ink-950/20 text-ink-600 cursor-not-allowed transition backdrop-blur"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
            )}
            <div className="pointer-events-none absolute top-full left-0 mt-2 scale-95 rounded-lg border border-ink-700 bg-ink-950 px-2.5 py-1.5 text-xs font-medium text-ink-100 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-50">
              {prevProblem ? `Go to previous: ${prevProblem.title}` : "No previous problem"}
            </div>
          </div>
        )}

        <nav aria-label="Breadcrumb" className="flex-1 flex flex-wrap items-center gap-1.5 rounded-xl border border-ink-800/60 bg-ink-900/30 px-4 py-2 text-sm text-ink-400 shadow-sm backdrop-blur">
          {allItems.map((item, index) => (
            <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {index > 0 ? <ChevronRight className="h-4 w-4 text-ink-600/70" /> : null}
              {item.href ? (
                <Link
                  href={item.href}
                  onContextMenu={(event) => openMenu(event, item)}
                  className="rounded-lg px-3 py-1.5 font-medium transition-all hover:bg-ink-800/60 hover:text-ink-100"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  onContextMenu={(event) => openMenu(event, item)}
                  className="rounded-lg bg-ink-800/60 px-3 py-1.5 text-left font-medium text-ink-100 shadow-sm transition-all hover:bg-ink-800"
                >
                  {item.label}
                </button>
              )}
            </span>
          ))}
          <span className="ml-auto hidden rounded-full bg-ink-900/50 px-3 py-1 text-[11px] font-medium tracking-wide text-ink-500 ring-1 ring-inset ring-ink-800/50 md:block">
            Right-click items to jump
          </span>
        </nav>

        {showNav && (
          <div className="group relative shrink-0 flex">
            {nextProblem ? (
              <Link
                href={nextProblem.href}
                className="flex w-10 items-center justify-center rounded-xl border border-ink-800 bg-ink-900/30 text-ink-400 hover:bg-ink-800/60 hover:text-ink-100 transition shadow-sm backdrop-blur"
              >
                <ChevronRight className="h-5 w-5" />
              </Link>
            ) : (
              <button
                disabled
                className="flex w-10 items-center justify-center rounded-xl border border-ink-800/30 bg-ink-950/20 text-ink-600 cursor-not-allowed transition backdrop-blur"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            )}
            <div className="pointer-events-none absolute top-full right-0 mt-2 scale-95 rounded-lg border border-ink-700 bg-ink-950 px-2.5 py-1.5 text-xs font-medium text-ink-100 opacity-0 shadow-lg transition-all group-hover:scale-100 group-hover:opacity-100 whitespace-nowrap z-50">
              {nextProblem ? `Go to next: ${nextProblem.title}` : "No next problem"}
            </div>
          </div>
        )}
      </div>
      <ContextMenu
        menu={context?.menu}
        position={context?.position || { x: 0, y: 0 }}
        onClose={() => setContext(null)}
      />
    </>
  );
}
