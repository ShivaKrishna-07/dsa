"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function CustomDropdown({
  value,
  onChange,
  options = [],
  placeholder = "Select...",
  className = ""
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on ESC
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={containerRef} className={`relative inline-block text-left ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-9 items-center justify-between gap-2.5 rounded-xl border border-ink-700/80 bg-ink-900/90 px-3 py-1.5 text-xs sm:text-sm text-ink-200 shadow-sm transition hover:border-ink-600 hover:bg-ink-900 focus:outline-none focus:ring-1 focus:ring-accent-500/40"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedOption?.icon && (
            <span className="shrink-0 flex items-center justify-center">
              {selectedOption.icon}
            </span>
          )}
          <span className="truncate font-medium">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 text-ink-400 transition-transform duration-200 ${
            isOpen ? "rotate-180 text-accent-400" : ""
          }`}
        />
      </button>

      {/* Animated Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute left-0 top-full mt-1.5 min-w-[200px] w-full max-h-64 overflow-y-auto rounded-xl border border-ink-800 bg-ink-950/95 p-1 backdrop-blur-md shadow-2xl shadow-black/80 ring-1 ring-white/5 z-50 code-scroll"
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2.5 rounded-lg px-2.5 py-2 text-xs sm:text-sm text-left transition ${
                    isSelected
                      ? "bg-accent-500/15 border border-accent-500/30 text-accent-300 font-semibold"
                      : "border border-transparent text-ink-300 hover:bg-ink-900 hover:text-ink-100"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-2 min-w-0 truncate">
                    {option.icon && (
                      <span className="shrink-0 flex items-center justify-center">
                        {option.icon}
                      </span>
                    )}
                    <span className="truncate">{option.label}</span>
                  </div>

                  {isSelected && (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-400" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
