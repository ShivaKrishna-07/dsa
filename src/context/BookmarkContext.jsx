"use client";

import { createContext, useContext, useEffect, useState } from "react";

const BookmarkContext = createContext({
  bookmarks: new Set(),
  isBookmarked: () => false,
  toggleBookmark: () => {},
  bookmarkCount: 0
});

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState(new Set());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("dsa_marked_problems");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setBookmarks(new Set(parsed));
        }
      }
    } catch (e) {}
  }, []);

  const toggleBookmark = (slug) => {
    if (!slug) return;
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      try {
        localStorage.setItem("dsa_marked_problems", JSON.stringify(Array.from(next)));
      } catch (e) {}
      return next;
    });
  };

  const isBookmarked = (slug) => {
    if (!slug || !mounted) return false;
    return bookmarks.has(slug);
  };

  return (
    <BookmarkContext.Provider
      value={{
        bookmarks,
        isBookmarked,
        toggleBookmark,
        bookmarkCount: bookmarks.size
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export function useBookmarks() {
  return useContext(BookmarkContext);
}
