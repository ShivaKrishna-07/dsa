"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";

function ContextMenu({ menu, position, onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    function close(event) {
      if (!ref.current?.contains(event.target)) onClose();
    }
    function handleScroll() {
      onClose();
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
      className="fixed z-[70] w-72 overflow-hidden rounded-xl border border-ink-700 bg-ink-900/95 shadow-2xl backdrop-blur-md"
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
            className="block px-3 py-2 text-sm transition-colors hover:bg-ink-800"
          >
            <span className="block font-medium text-ink-100">{item.label}</span>
            {item.meta ? <span className="mt-0.5 block text-xs text-ink-500">{item.meta}</span> : null}
          </Link>
        ))}
      </div>
    </div>
  );
}

function rootMenu(tree) {
  return {
    title: "Topics",
    items: tree.map((topic) => ({
      label: topic.title,
      href: `/${topic.slug}`,
      meta: `${topic.patterns.length} patterns`
    }))
  };
}

function topicMenu(topic) {
  return {
    title: `${topic.title} patterns`,
    items: topic.patterns.map((pattern) => ({
      label: pattern.title,
      href: `/${topic.slug}/${pattern.slug}`,
      meta: `${pattern.problems.length} problems`
    }))
  };
}

function patternMenu(topic, pattern) {
  return {
    title: `${pattern.title} problems`,
    items: pattern.problems.map((problem) => ({
      label: problem.title,
      href: `/${topic.slug}/${pattern.slug}/${problem.slug}`,
      meta: problem.difficulty
    }))
  };
}

export default function NavbarBreadcrumb({ tree = [] }) {
  const pathname = usePathname();
  const router = useRouter();
  const [context, setContext] = useState(null);

  const segments = pathname.split("/").filter(Boolean);
  const [topicSlug, patternSlug, problemSlug] = segments;
  const topic = tree.find((item) => item.slug === topicSlug);
  const pattern = topic?.patterns.find((item) => item.slug === patternSlug);
  const problem = pattern?.problems.find((item) => item.slug === problemSlug);

  // Calculate prev and next problem safely
  const allProblems = [];
  tree.forEach((t) => {
    t.patterns.forEach((p) => {
      p.problems.forEach((prob) => {
        allProblems.push({
          topicSlug: t.slug,
          patternSlug: p.slug,
          problemSlug: prob.slug,
          href: `/${t.slug}/${p.slug}/${prob.slug}`,
          title: prob.title
        });
      });
    });
  });

  const currentIndex = allProblems.findIndex(
    (p) => p.topicSlug === topicSlug && p.patternSlug === patternSlug && p.problemSlug === problemSlug
  );

  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex >= 0 && currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

  // Keyboard navigation hook called unconditionally before any return
  useEffect(() => {
    if (!problem) return;

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
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [problem, prevProblem, nextProblem, router]);

  if (segments.length === 0 || !topic) return null;

  const menuForRoot = rootMenu(tree);
  const items = [
    {
      label: topic.title,
      href: pattern ? `/${topic.slug}` : undefined,
      rootMenu: menuForRoot,
      menu: topicMenu(topic)
    }
  ];

  if (pattern) {
    items.push({
      label: pattern.title,
      href: problem ? `/${topic.slug}/${pattern.slug}` : undefined,
      menu: patternMenu(topic, pattern)
    });
  }

  if (problem) {
    items.push({
      label: problem.title,
      menu: patternMenu(topic, pattern)
    });
  }

  const allItems = [{ label: "Sheet", href: "/", menu: items[0]?.rootMenu }, ...items];

  function openMenu(event, item) {
    if (!item.menu?.items?.length) return;
    event.preventDefault();
    const x = Math.min(event.clientX, window.innerWidth - 300);
    const y = Math.min(event.clientY, window.innerHeight - 360);
    setContext({ menu: item.menu, position: { x, y } });
  }

  return (
    <>
      <div className="flex items-center min-w-0 flex-1 overflow-hidden">
        {/* Breadcrumb Links */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1 min-w-0 overflow-x-auto whitespace-nowrap code-scroll text-xs sm:text-sm text-ink-400 py-1"
        >
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <span key={`${item.label}-${index}`} className="flex items-center gap-1 shrink-0">
                {index > 0 && <ChevronRight className="h-3.5 w-3.5 text-ink-600/80 shrink-0" />}
                {item.href ? (
                  <Link
                    href={item.href}
                    onContextMenu={(e) => openMenu(e, item)}
                    className="rounded-lg px-2 py-1 font-medium transition hover:bg-ink-800/70 hover:text-ink-100 whitespace-nowrap"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onContextMenu={(e) => openMenu(e, item)}
                    className={`rounded-lg px-2.5 py-1 text-left font-semibold shadow-sm transition whitespace-nowrap ${
                      isLast
                        ? "bg-ink-800/80 text-ink-100 border border-ink-700/60"
                        : "hover:bg-ink-800/60 text-ink-200"
                    }`}
                  >
                    {item.label}
                  </button>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <ContextMenu
        menu={context?.menu}
        position={context?.position || { x: 0, y: 0 }}
        onClose={() => setContext(null)}
      />
    </>
  );
}
