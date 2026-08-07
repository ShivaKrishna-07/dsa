"use client";

import { useState } from "react";

export default function Tabs({ tabs, defaultValue, className = "", panelClassName = "" }) {
  const [active, setActive] = useState(defaultValue || tabs[0]?.value);
  const selected = tabs.find((tab) => tab.value === active) || tabs[0];

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div className="z-10 flex shrink-0 gap-1 overflow-x-auto border-b border-ink-800 bg-ink-950/95 px-1 pt-1 backdrop-blur">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.value === selected.value;
          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActive(tab.value)}
              className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-t-md px-3 text-sm font-medium transition ${
                isActive
                  ? "bg-ink-850 text-ink-100"
                  : "text-ink-500 hover:bg-ink-900 hover:text-ink-200"
              }`}
            >
              {Icon ? <Icon className="h-4 w-4" /> : null}
              {tab.label}
            </button>
          );
        })}
      </div>
      <div className={`min-h-0 flex-1 ${panelClassName}`}>{selected.content}</div>
    </div>
  );
}
