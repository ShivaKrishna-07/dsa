import { Crown, Flame, Sparkles } from "lucide-react";

export default function PatternBadge({ badge, compact = false, showLabel = true }) {
  if (!badge) return null;

  const type = badge.type || "important";
  const label = badge.label || (type === "top-priority" ? "Top Priority" : type === "basics" ? "Core Basics" : "Important");

  let config = {
    icon: Flame,
    styles: "border-orange-500/30 bg-orange-500/10 text-orange-300",
    iconColor: "text-orange-400"
  };

  if (type === "top-priority") {
    config = {
      icon: Crown,
      styles: "border-amber-500/40 bg-amber-500/10 text-amber-300 shadow-amber-500/5",
      iconColor: "text-amber-400"
    };
  } else if (type === "basics") {
    config = {
      icon: Sparkles,
      styles: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 shadow-emerald-500/5",
      iconColor: "text-emerald-400"
    };
  }

  const Icon = config.icon;

  if (!showLabel) {
    return (
      <span
        title={label}
        className={`inline-flex items-center justify-center rounded-md border p-1 shadow-sm ${config.styles}`}
      >
        <Icon className={`${compact ? "h-2.5 w-2.5" : "h-3 w-3"} ${config.iconColor}`} />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-semibold shadow-sm transition-colors ${config.styles} ${
        compact ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-0.5 text-xs"
      }`}
    >
      <Icon className={`${compact ? "h-2.5 w-2.5" : "h-3 w-3"} ${config.iconColor} shrink-0`} />
      <span>{label}</span>
    </span>
  );
}

