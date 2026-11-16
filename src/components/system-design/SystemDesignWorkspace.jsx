"use client";

import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ArrowLeft, ImageIcon } from "lucide-react";
import { systemDesignData } from "@/content/system-design/systemDesignData";

export default function SystemDesignWorkspace() {
  const [activeTab, setActiveTab] = useState("fundamentals");
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  const allTopics = useMemo(() => {
    return systemDesignData.fundamentals.flatMap((p) => p.topics);
  }, []);

  const coreQuestions = useMemo(() => {
    return systemDesignData.questions.flatMap((g) => g.items);
  }, []);

  const selectedIndex = allTopics.findIndex((t) => t.id === selectedTopicId);
  const selectedTopic = selectedIndex >= 0 ? allTopics[selectedIndex] : null;

  const isSplitMode = activeTab === "fundamentals" && selectedTopic !== null;

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedTopicId(allTopics[selectedIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (selectedIndex < allTopics.length - 1) {
      setSelectedTopicId(allTopics[selectedIndex + 1].id);
    }
  };

  // Keyboard navigation for previous/next arrows & escape to close
  useEffect(() => {
    if (!selectedTopic) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (selectedIndex > 0) {
          setSelectedTopicId(allTopics[selectedIndex - 1].id);
        }
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        if (selectedIndex < allTopics.length - 1) {
          setSelectedTopicId(allTopics[selectedIndex + 1].id);
        }
      } else if (e.key === "Escape") {
        setSelectedTopicId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedTopic, selectedIndex, allTopics]);

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
      <div className="flex items-center justify-between pb-3 border-b border-ink-800/80">
        <div className="flex items-center gap-3">
          <h1 className={`${isCompact ? "text-lg" : "text-xl sm:text-2xl"} font-bold tracking-tight text-ink-100`}>
            System Design
          </h1>
          <span className="text-xs font-semibold text-accent-300 bg-accent-500/10 border border-accent-500/20 px-2.5 py-0.5 rounded-full font-mono">
            {allTopics.length + coreQuestions.length} Topics
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 border-b border-ink-800/60 pb-2 overflow-x-auto whitespace-nowrap">
        <button
          type="button"
          onClick={() => setActiveTab("fundamentals")}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "fundamentals"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Fundamentals ({allTopics.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("questions");
            setSelectedTopicId(null);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "questions"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Interview Questions ({coreQuestions.length})
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("framework");
            setSelectedTopicId(null);
          }}
          className={`rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition ${
            activeTab === "framework"
              ? "bg-ink-800 text-ink-100 font-semibold"
              : "text-ink-400 hover:text-ink-200"
          }`}
        >
          Answering Framework
        </button>
      </div>
    </div>
  );

  // Fundamentals list component
  const renderFundamentalsList = (isCompact = false) => (
    <div className={isCompact ? "p-3 sm:p-4 space-y-1.5" : "space-y-4 pt-1"}>
      {systemDesignData.fundamentals.map((section) => (
        <div key={section.id} className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-ink-400 px-1">
            <span>{section.title}</span>
            <span className="text-ink-500 text-[11px] font-mono">
              {section.topics.length} topics
            </span>
          </div>

          <div className="rounded-xl border border-ink-800/80 bg-ink-900/30 divide-y divide-ink-800/50 overflow-hidden">
            {section.topics.map((topic, idx) => {
              const isSelected = selectedTopicId === topic.id;

              return (
                <div
                  key={topic.id}
                  id={`sd-topic-${topic.id}`}
                  onClick={() => setSelectedTopicId(topic.id)}
                  className={`flex items-center justify-between gap-3 px-3.5 py-2.5 cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-accent-500/15 text-ink-100 border-l-[3px] border-l-accent-500"
                      : "hover:bg-ink-800/40 text-ink-200 border-l-[3px] border-l-transparent"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`text-xs w-5 h-5 shrink-0 font-mono rounded flex items-center justify-center font-bold ${
                        isSelected
                          ? "bg-accent-500 text-[#09090b]"
                          : "text-ink-500 bg-ink-950 border border-ink-800/60"
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <span className={`text-xs sm:text-sm ${isSelected ? "font-semibold text-accent-100" : "font-medium"}`}>
                      {topic.title}
                    </span>
                  </div>

                  {topic.image && (
                    <span className="shrink-0 flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-mono font-medium bg-accent-500/10 text-accent-400 border border-accent-500/20">
                      <ImageIcon className="h-3 w-3" />
                      <span className="hidden sm:inline">Diagram</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  // =========================================================================
  // VIEW MODE 1: SPLIT SCREEN (Left list, Right full-height image viewer)
  // =========================================================================
  if (isSplitMode) {
    return (
      <div className="flex h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-ink-950 text-ink-100">
        {/* Left Sidebar Panel: Shifted current list */}
        <aside className="hidden md:flex w-full md:w-[380px] lg:w-[420px] xl:w-[460px] shrink-0 border-r border-ink-800 flex-col h-full overflow-hidden bg-ink-950">
          {renderHeader(true)}
          <div className="flex-1 overflow-y-auto code-scroll">
            {renderFundamentalsList(true)}
          </div>
        </aside>

        {/* Right Viewer Panel: Complete image shown directly in full height */}
        <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-ink-950">
          {/* Top Viewer Control Bar */}
          <div className="h-13 border-b border-ink-800/80 bg-ink-950/95 px-3 sm:px-5 flex items-center justify-between shrink-0">
            {/* Left: Mobile back button or topic title */}
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                onClick={() => setSelectedTopicId(null)}
                className="md:hidden flex items-center gap-1.5 rounded-lg border border-ink-800 bg-ink-900/80 px-2.5 py-1 text-xs font-semibold text-ink-300 hover:text-ink-100 hover:border-ink-700 transition shrink-0"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>List</span>
              </button>

              <span className="text-xs font-mono font-bold text-accent-400 bg-accent-500/10 border border-accent-500/20 px-2 py-0.5 rounded-full shrink-0">
                #{selectedIndex + 1}
              </span>
              <h2 className="font-semibold text-xs sm:text-sm text-ink-100 truncate">
                {selectedTopic.title}
              </h2>
            </div>

            {/* Right: Left & Right Navigation Arrows + Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-[11px] font-mono text-ink-500 mr-1 hidden sm:inline">
                {selectedIndex + 1} / {allTopics.length}
              </span>

              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={handlePrev}
                disabled={selectedIndex === 0}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/80 text-ink-300 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition shadow-sm"
                title="Previous topic (Left Arrow)"
                aria-label="Previous topic"
              >
                <ChevronLeft className="h-4 w-4 stroke-[2.2]" />
              </button>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={handleNext}
                disabled={selectedIndex === allTopics.length - 1}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/80 text-ink-300 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 disabled:opacity-30 disabled:pointer-events-none transition shadow-sm"
                title="Next topic (Right Arrow)"
                aria-label="Next topic"
              >
                <ChevronRight className="h-4 w-4 stroke-[2.2]" />
              </button>

              {/* Close Button to return to centered full list view */}
              <button
                type="button"
                onClick={() => setSelectedTopicId(null)}
                className="ml-1 flex h-8 w-8 items-center justify-center rounded-lg border border-ink-800 bg-ink-900/80 text-ink-400 hover:border-ink-700 hover:bg-ink-800 hover:text-ink-100 transition shadow-sm"
                title="Close viewer (Esc)"
                aria-label="Close viewer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Viewer Content: Full-height diagram */}
          <div className="flex-1 overflow-y-auto code-scroll flex items-center justify-center p-3 sm:p-5 bg-ink-950/70">
            {selectedTopic.image ? (
              <div className="relative max-h-full flex items-center justify-center">
                <img
                  src={selectedTopic.image}
                  alt={selectedTopic.title}
                  className="max-h-[calc(100vh-7.5rem)] w-auto max-w-full object-contain rounded-xl border border-ink-800/80 shadow-2xl shadow-black/60 bg-ink-900/40"
                />
              </div>
            ) : (
              /* Placeholder for topics whose images are still being generated */
              <div className="flex flex-col items-center justify-center p-8 text-center max-w-md">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-ink-800 bg-ink-900/60 mb-4 shadow-inner text-accent-400">
                  <ImageIcon className="h-6 w-6 stroke-[1.8]" />
                </div>
                <span className="text-xs font-mono font-semibold text-accent-400 mb-1">
                  Topic #{selectedIndex + 1}
                </span>
                <h3 className="text-base font-bold text-ink-100 mb-2">
                  {selectedTopic.title}
                </h3>
                <p className="text-xs text-ink-400 leading-relaxed mb-5">
                  Infographic diagram in progress. You can use the left and right arrows to browse through the other topics.
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={selectedIndex === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-800 bg-ink-900 text-xs font-medium text-ink-300 hover:text-ink-100 hover:bg-ink-850 disabled:opacity-30 disabled:pointer-events-none transition"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={selectedIndex === allTopics.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-ink-800 bg-ink-900 text-xs font-medium text-ink-300 hover:text-ink-100 hover:bg-ink-850 disabled:opacity-30 disabled:pointer-events-none transition"
                  >
                    Next <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // VIEW MODE 2: DEFAULT CENTERED VIEW (No topic opened yet or other tabs)
  // =========================================================================
  return (
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
  );
}
