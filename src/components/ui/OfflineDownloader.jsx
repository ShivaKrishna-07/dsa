"use client";

import { useState } from "react";
import { Download, Check, Loader2 } from "lucide-react";

export default function OfflineDownloader({ tree }) {
  const [status, setStatus] = useState("idle"); // idle, downloading, done
  const [progress, setProgress] = useState(0);

  const downloadAll = async () => {
    if (status === "downloading") return;
    setStatus("downloading");
    
    // Flatten all URLs
    const urls = ["/"];
    if (tree) {
      tree.forEach(topic => {
        urls.push(`/${topic.slug}`);
        if (topic.patterns) {
          topic.patterns.forEach(pattern => {
            urls.push(`/${topic.slug}/${pattern.slug}`);
            if (pattern.problems) {
              pattern.problems.forEach(problem => {
                urls.push(`/${topic.slug}/${pattern.slug}/${problem.slug}`);
              });
            }
          });
        }
      });
    }

    let completed = 0;
    // Process in batches so we don't overwhelm the browser
    const BATCH_SIZE = 10;
    for (let i = 0; i < urls.length; i += BATCH_SIZE) {
      const batch = urls.slice(i, i + BATCH_SIZE);
      // Fetch each URL. next-pwa will intercept this and put it in the offline cache
      await Promise.all(batch.map(url => fetch(url, { cache: 'no-store' }).catch(() => {})));
      completed += batch.length;
      setProgress(Math.min(100, Math.round((completed / urls.length) * 100)));
    }
    
    setStatus("done");
    setTimeout(() => {
        setStatus("idle");
        setProgress(0);
    }, 5000);
  };

  if (status === "done") {
    return (
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 text-sm font-medium transition-colors cursor-default" title="All pages saved for offline use">
        <Check size={16} /> <span className="hidden sm:inline">Saved Offline</span>
      </button>
    );
  }

  if (status === "downloading") {
    return (
      <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-medium transition-colors cursor-default" title="Downloading pages...">
        <Loader2 size={16} className="animate-spin" /> <span className="hidden sm:inline">{progress}%</span>
      </button>
    );
  }

  return (
    <button 
      onClick={downloadAll}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800 hover:bg-ink-700 text-ink-300 transition-colors text-sm font-medium"
      title="Download all pages for offline access"
    >
      <Download size={16} /> <span className="hidden sm:inline">Save Offline</span>
    </button>
  );
}
