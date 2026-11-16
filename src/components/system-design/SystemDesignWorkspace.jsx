"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Brain,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";
import ResourceDrawer from "@/components/navigation/ResourceDrawer";
import { systemDesignData } from "@/content/system-design/systemDesignData";

// 8 Curated infographic image pages covering all 20 fundamental topics
const FUNDAMENTAL_PAGES = [
  {
    pageIndex: 0,
    pageNumber: 1,
    image: "/images/system-design/fundamentals-1.jpg",
    title: "Architecture & Scaling",
    topicIds: ["f1", "f2", "f3"],
    label: "Topics 1 – 3"
  },
  {
    pageIndex: 1,
    pageNumber: 2,
    image: "/images/system-design/fundamentals-2.jpg",
    title: "Proxies & Load Balancers",
    topicIds: ["f4", "f5"],
    label: "Topics 4 – 5"
  },
  {
    pageIndex: 2,
    pageNumber: 3,
    image: "/images/system-design/fundamentals-3.jpg",
    title: "Communication Protocols",
    topicIds: ["f6", "f7"],
    label: "Topics 6 – 7"
  },
  {
    pageIndex: 3,
    pageNumber: 4,
    image: "/images/system-design/fundamentals-4.jpg",
    title: "Databases, Storage & Replication",
    topicIds: ["f8", "f9", "f10"],
    label: "Topics 8 – 10"
  },
  {
    pageIndex: 4,
    pageNumber: 5,
    image: "/images/system-design/fundamentals-5.jpg",
    title: "Sharding, CAP & Concurrency",
    topicIds: ["f11", "f12", "f13"],
    label: "Topics 11 – 13"
  },
  {
    pageIndex: 5,
    pageNumber: 6,
    image: "/images/system-design/fundamentals-6.jpg",
    title: "Cache & Eviction Policies",
    topicIds: ["f14", "f15"],
    label: "Topics 14 – 15"
  },
  {
    pageIndex: 6,
    pageNumber: 7,
    image: "/images/system-design/fundamentals-7.jpg",
    title: "Cache Invalidation, Stampede & CDN",
    topicIds: ["f16", "f17"],
    label: "Topics 16 – 17"
  },
  {
    pageIndex: 7,
    pageNumber: 8,
    image: "/images/system-design/fundamentals-8.jpg",
    title: "Queues, Idempotency & Data Centers",
    topicIds: ["f18", "f19", "f20"],
    label: "Topics 18 – 20"
  }
];

export default function SystemDesignWorkspace() {
  const [activeTab, setActiveTab] = useState("fundamentals");
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Zoom and Pan states for infographic diagram viewer
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const panStartRef = useRef({ x: 0, y: 0 });
  const imageContainerRef = useRef(null);

  const allTopics = useMemo(() => {
    return systemDesignData.fundamentals.flatMap((p) => p.topics);
  }, []);

  const coreQuestions = useMemo(() => {
    return systemDesignData.questions.flatMap((g) => g.items);
  }, []);

  const selectedIndex = allTopics.findIndex((t) => t.id === selectedTopicId);
  const selectedTopic = selectedIndex >= 0 ? allTopics[selectedIndex] : null;

  // Find corresponding infographic image page
  const currentPageIndex = useMemo(() => {
    if (!selectedTopicId) return 0;
    const idx = FUNDAMENTAL_PAGES.findIndex((p) => p.topicIds.includes(selectedTopicId));
    return idx >= 0 ? idx : 0;
  }, [selectedTopicId]);

  const currentPage = FUNDAMENTAL_PAGES[currentPageIndex];
  const isSplitMode = activeTab === "fundamentals" && selectedTopic !== null;

  // Reset zoom and pan helper
  const resetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.25, 3.5));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const next = Math.max(prev - 0.25, 0.5);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  // Previous / Next IMAGE page handlers
  const handlePrevImage = () => {
    if (currentPageIndex > 0) {
      const prevPage = FUNDAMENTAL_PAGES[currentPageIndex - 1];
      setSelectedTopicId(prevPage.topicIds[0]);
      resetZoom();
    }
  };

  const handleNextImage = () => {
    if (currentPageIndex < FUNDAMENTAL_PAGES.length - 1) {
      const nextPage = FUNDAMENTAL_PAGES[currentPageIndex + 1];
      setSelectedTopicId(nextPage.topicIds[0]);
      resetZoom();
    }
  };

  // Keyboard navigation for previous/next images & escape to close
  useEffect(() => {
    if (!selectedTopic) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNextImage();
      } else if (e.key === "Escape") {
        setSelectedTopicId(null);
        resetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTopic, currentPageIndex]);

  // Mouse wheel zoom on image container
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el || !isSplitMode) return;

    const onWheel = (e) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.0015;
      setZoom((prev) => {
        const next = Math.min(Math.max(prev + delta, 0.6), 3.5);
        if (next <= 1) setPan({ x: 0, y: 0 });
        return next;
      });
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [isSplitMode, currentPageIndex]);

  // Hold & move (mouse drag panning)
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    panStartRef.current = { ...pan };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch drag support for mobile / touch screens
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      panStartRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - dragStartRef.current.x;
    const dy = e.touches[0].clientY - dragStartRef.current.y;
    setPan({
      x: panStartRef.current.x + dx,
      y: panStartRef.current.y + dy
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Auto-scroll active topic in left sidebar into view
  useEffect(() => {
    if (selectedTopicId) {
      const el = document.getElementById(`sd-topic-${selectedTopicId}`);
      if (el) {
        el.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedTopicId]);

  // Common Header & Tabs component
  const renderHeader = (isCompact = false) => (
    <div className={isCompact ? "p-3 sm:p-4 border-b border-ink-800/80 bg-ink-950/95 shrink-0 space-y-3" : "space-y-4"}>
      {/* Brand & Heading Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-2.5 min-w-0">
          <Link
            href="/"
            className="flex shrink-0 items-center transition hover:opacity-95"
            title="DSA Patterns Home"
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 shadow-md shadow-accent-500/20 ring-1 ring-white/20">
              <Brain className="h-4.5 w-4.5 stroke-[2.3] text-[#09090b]" aria-hidden="true" />
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/90 text-accent-400 hover:border-accent-500/50 hover:bg-accent-500/15 hover:text-accent-300 transition-all shadow-sm shrink-0"
            title="Open Resource Drawer"
            aria-label="Open resource navigation drawer"
          >
            <PanelLeft className="h-4 w-4" />
          </button>

          <h1 className={`${isCompact ? "text-lg" : "text-xl sm:text-2xl"} font-bold tracking-tight text-ink-100 truncate ml-1`}>
            System Design
          </h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-ink-900/60 border border-ink-800/80 overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={() => setActiveTab("fundamentals")}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "fundamentals"
              ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60 font-semibold"
              : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/40 border border-transparent"
          }`}
        >
          <span>Fundamentals</span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
              activeTab === "fundamentals"
                ? "bg-accent-500/20 text-accent-300 border border-accent-500/30"
                : "bg-ink-950/80 text-ink-400 border border-ink-800/80"
            }`}
          >
            {allTopics.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("questions");
            setSelectedTopicId(null);
            resetZoom();
          }}
          className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "questions"
              ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60 font-semibold"
              : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/40 border border-transparent"
          }`}
        >
          <span>Interview Ques</span>
          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
              activeTab === "questions"
                ? "bg-accent-500/20 text-accent-300 border border-accent-500/30"
                : "bg-ink-950/80 text-ink-400 border border-ink-800/80"
            }`}
          >
            {coreQuestions.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("framework");
            setSelectedTopicId(null);
            resetZoom();
          }}
          className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "framework"
              ? "bg-ink-800 text-ink-100 shadow-sm border border-ink-700/60 font-semibold"
              : "text-ink-400 hover:text-ink-200 hover:bg-ink-800/40 border border-transparent"
          }`}
        >
          <span>Answering Framework</span>
        </button>
      </div>
    </div>
  );

  // Fundamentals list component (clean list items without diagram badge or repeated headings)
  const renderFundamentalsList = (isCompact = false) => (
    <div className={isCompact ? "p-3 sm:p-4 space-y-2" : "space-y-4 pt-1"}>
      {systemDesignData.fundamentals.map((section) => (
        <div
          key={section.id}
          className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden"
        >
          {section.topics.map((topic, idx) => {
            const isSelected = selectedTopicId === topic.id;

            return (
              <div
                key={topic.id}
                id={`sd-topic-${topic.id}`}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  resetZoom();
                }}
                className={`flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-accent-500/15 text-ink-100 border-l-[3px] border-l-accent-500"
                    : "hover:bg-ink-800/40 text-ink-200 border-l-[3px] border-l-transparent"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span
                    className={`text-xs w-5 h-5 shrink-0 font-mono rounded flex items-center justify-center font-bold ${
                      isSelected
                        ? "bg-accent-500 text-[#09090b]"
                        : "text-ink-500 bg-ink-950 border border-ink-800/60"
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className={`text-xs sm:text-sm truncate ${isSelected ? "font-semibold text-accent-100" : "font-medium"}`}>
                    {topic.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  // =========================================================================
  // VIEW MODE 1: SPLIT SCREEN (Left list, Right full-height image viewer)
  // =========================================================================
  if (isSplitMode) {
    return (
      <>
        <ResourceDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        <div className="flex h-screen w-full overflow-hidden bg-ink-950 text-ink-100">
          {/* Left Sidebar Panel: Shifted current list with increased width */}
          <aside className="hidden md:flex w-full md:w-[420px] lg:w-[460px] xl:w-[500px] shrink-0 border-r border-ink-800 flex-col h-full overflow-hidden bg-ink-950">
            {renderHeader(true)}
            <div className="flex-1 overflow-y-auto code-scroll">
              {renderFundamentalsList(true)}
            </div>
          </aside>

          {/* Right Viewer Panel: Full screen / full height with zero layout height reduction */}
          <main className="relative flex-1 min-w-0 h-full overflow-hidden bg-ink-950">
            {/* Floating Mobile Back Button */}
            <button
              type="button"
              onClick={() => {
                setSelectedTopicId(null);
                resetZoom();
              }}
              className="md:hidden absolute top-3 left-3 z-30 flex items-center gap-1.5 rounded-xl border border-ink-800/90 bg-ink-950/85 backdrop-blur-md px-3 py-1.5 text-xs font-semibold text-ink-200 shadow-xl"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>List</span>
            </button>

            {/* Floating Glass Control Bar (Top Right Overlay) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 flex items-center gap-1 rounded-xl bg-ink-950/85 backdrop-blur-md border border-ink-800/90 p-1 shadow-2xl shadow-black/80">
              {/* Previous Image Switcher */}
              <button
                type="button"
                onClick={handlePrevImage}
                disabled={currentPageIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-300 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Previous Image (Left Arrow)"
                aria-label="Previous Image"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
              </button>

              {/* Current Image Indicator (clean font-mono, NO # count) */}
              <span className="text-xs font-mono font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20 px-2.5 py-1 rounded-lg select-none">
                Image {currentPage.pageNumber} / {FUNDAMENTAL_PAGES.length}
              </span>

              {/* Next Image Switcher */}
              <button
                type="button"
                onClick={handleNextImage}
                disabled={currentPageIndex === FUNDAMENTAL_PAGES.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-300 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Next Image (Right Arrow)"
                aria-label="Next Image"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.2]" />
              </button>

              {/* Vertical divider */}
              <span className="h-4 w-[1px] bg-ink-800 mx-0.5" />

              {/* Zoom Controls */}
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.6}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Zoom Out (or scroll down on image)"
                aria-label="Zoom Out"
              >
                <ZoomOut className="h-3.5 w-3.5" />
              </button>

              <button
                type="button"
                onClick={resetZoom}
                className="px-2 py-1 text-[11px] font-mono font-semibold text-ink-300 hover:text-accent-300 hover:bg-ink-800/60 rounded-md transition"
                title="Click to reset zoom to 100%"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 3.5}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition"
                title="Zoom In (or scroll up on image)"
                aria-label="Zoom In"
              >
                <ZoomIn className="h-3.5 w-3.5" />
              </button>

              {(zoom !== 1 || pan.x !== 0 || pan.y !== 0) && (
                <button
                  type="button"
                  onClick={resetZoom}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-800 hover:text-amber-400 transition"
                  title="Reset Zoom & Pan"
                  aria-label="Reset"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}

              {/* Vertical divider */}
              <span className="h-4 w-[1px] bg-ink-800 mx-0.5" />

              {/* Close Button */}
              <button
                type="button"
                onClick={() => {
                  setSelectedTopicId(null);
                  resetZoom();
                }}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-ink-400 hover:bg-ink-800 hover:text-ink-100 transition"
                title="Close viewer (Esc)"
                aria-label="Close viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Canvas Container: Full-Height Image Viewport */}
            <div
              ref={imageContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative h-full w-full overflow-hidden flex items-center justify-center p-0 bg-ink-950 select-none ${
                zoom > 1 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
              }`}
            >
              <div
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                  transformOrigin: "center center",
                  transition: isDragging ? "none" : "transform 0.12s ease-out"
                }}
                className="h-full w-full flex items-center justify-center"
              >
                <img
                  src={currentPage.image}
                  alt={selectedTopic.title}
                  draggable={false}
                  className="h-full w-auto max-w-full object-contain pointer-events-none select-none shadow-2xl"
                />
              </div>

              {/* Subtle Pan Hint when zoomed in */}
              {zoom > 1 && !isDragging && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none rounded-full bg-ink-900/90 border border-ink-800 px-3.5 py-1 text-xs text-ink-300 shadow-lg backdrop-blur z-20">
                  Click & hold to move · Scroll to zoom
                </div>
              )}
            </div>
          </main>
        </div>
      </>
    );
  }

  // =========================================================================
  // VIEW MODE 2: DEFAULT CENTERED VIEW (No topic opened yet or other tabs)
  // =========================================================================
  return (
    <>
      <ResourceDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className="mx-auto max-w-4xl w-full px-4 sm:px-6 py-6 space-y-4">
        {renderHeader(false)}

      {/* TAB 1: FUNDAMENTALS */}
      {activeTab === "fundamentals" && renderFundamentalsList(false)}

      {/* TAB 2: INTERVIEW QUESTIONS */}
      {activeTab === "questions" && (
        <div className="space-y-4 pt-1">
          {systemDesignData.questions.map((grp) => (
            <div key={grp.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
                <span>{grp.group}</span>
                <span className="text-ink-500 text-[11px] font-mono">
                  {grp.items.length}
                </span>
              </div>

              <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
                {grp.items.map((item, idx) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 px-3.5 py-2.5 hover:bg-ink-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-xs text-ink-500 w-5 shrink-0 font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-xs sm:text-sm font-medium text-ink-200">
                        {item.title}
                      </span>
                    </div>

                    {item.concept && (
                      <span className="text-xs text-ink-500 shrink-0 hidden sm:inline">
                        {item.concept}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: ANSWERING FRAMEWORK */}
      {activeTab === "framework" && (
        <div className="space-y-4 pt-1">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
              <span>8-Step Interview Sequence</span>
              <span className="text-ink-500 text-[11px]">45 min target</span>
            </div>

            <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
              {systemDesignData.framework.steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center justify-between gap-3 px-3.5 py-2.5 transition-colors hover:bg-ink-800/40"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="text-xs text-ink-500 w-4">
                      {step.number}
                    </span>
                    <span className="text-xs sm:text-sm font-medium text-ink-200">
                      {step.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 text-right">
                    <span className="text-xs text-ink-500 hidden sm:inline">
                      {step.description}
                    </span>
                    <span className="text-xs text-ink-400">
                      {step.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
