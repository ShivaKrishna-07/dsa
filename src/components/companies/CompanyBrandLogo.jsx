/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";

export default function CompanyBrandLogo({ name, domain, className = "h-9 w-9" }) {
  const [error, setError] = useState(false);

  // High-res official brand icon source via Google's 128px favicon service
  const logoUrl = domain
    ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
    : null;

  const initial = name ? name.charAt(0).toUpperCase() : "C";

  if (!logoUrl || error) {
    return (
      <span
        className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-ink-800 to-ink-900 border border-ink-700/60 font-bold text-accent-400 select-none shadow-sm ${className}`}
      >
        {initial}
      </span>
    );
  }

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-ink-700/70 bg-ink-950/80 p-1 shadow-sm ${className}`}
    >
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="h-full w-full object-contain rounded-lg"
        loading="lazy"
        onError={() => setError(true)}
      />
    </span>
  );
}
