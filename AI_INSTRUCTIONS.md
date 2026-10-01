# AI Agent Guidelines for DSA Project

When generating or editing problem markdown files under `src/content/`, ALL AI agents must strictly adhere to the following rules:

## 1. Code Style
- Write the **cleanest possible code**.
- **Minimal comments:** Only comment on non-obvious logic. Do not write paragraphs of comments, and do not over-comment every line.
- **Variable names:** Use meaningful but **short** variable names (e.g., `curr`, `ans`, `res`, `idx` instead of overly long names).

## 2. Content Structure
- **Problem Statement:** Must be clearly formatted.
- **Examples:** Must be handled properly. For matrices or arrays, use standard bracket notation (e.g., `[[1,2],[3,4]]`). For trees, use clean ASCII art inside ````text ```` blocks. If highlighting a node in a tree, wrap the value in `**` (e.g., `**5**`).
- **Intuition:** Provide a clear, concise, and logical explanation of the approach before the code block.

## 3. Frontmatter & Links
All markdown files must have YAML frontmatter with a `platforms:` object. 
- **Coding Platform Link:** Always prioritize the **LeetCode** problem link. If LeetCode is not available, use the **GFG Practice link** (NOT a GFG article link).
- **YouTube Link:** Check the Striver A2Z sheet. If there is a direct YouTube video link, use it. Otherwise, use a search query (e.g., `youtube: "https://www.youtube.com/results?search_query=<problem_name>"`).
- **Article Link:** Include the Striver sheet article link if one exists.

### Example Frontmatter Template:
```yaml
---
title: "Problem Title"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/..."
  gfg: "https://practice.geeksforgeeks.org/problems/..."
  youtube: "https://www.youtube.com/..."
  article: "https://takeuforward.org/..."
---
```
