# AI Agent Guidelines for DSA Project

When generating or editing problem markdown files under `src/content/`, ALL AI agents must strictly adhere to the following rules:

## 1. Code Style
- Write the **cleanest possible code**.
- **Minimal comments:** Only comment on non-obvious logic. Do not write paragraphs of comments, and do not over-comment every line.
- **Variable names:** Use meaningful but **short** variable names (e.g., `curr`, `ans`, `res`, `idx` instead of overly long names).
- **Proper line breaks & bracket formatting:**
  - **Never put multiple statements on one line with semicolons** (e.g., do NOT do `int node = q.front(); q.pop();`). Each statement must be on its own separate line.
  - **No inline/squashed braces:** When there are curly braces, format them with proper multi-line indentation like other parts of the code. Never write `if (!vis[i]) { dfs(i); cnt++; }` on a single line.

## 2. Content Structure
- **Problem Statement:** Must be clearly formatted.
- **Examples:** Must be handled properly. For matrices or arrays, use standard bracket notation (e.g., `[[1,2],[3,4]]`). For trees, use clean ASCII art inside ````text ```` blocks. If highlighting a node in a tree, wrap the value in `**` (e.g., `**5**`).
- **Intuition:** Provide a clear, concise, and logical explanation of the approach before the code block.

## 3. Frontmatter & Links
All markdown files must have YAML frontmatter with a `platforms:` object. 
- **Coding Platform Link:** Show **ONLY ONE** coding platform link — NEVER include both LeetCode and GFG!
  - Prioritize the **LeetCode** problem link, BUT make sure it is **NOT a LeetCode Premium** problem.
  - If the LeetCode problem is **Premium** (locked/subscription required), or does not exist on LeetCode, use the **GFG Practice link** (NOT a GFG article link) ONLY.
  - Under no circumstances should both `leetcode:` and `gfg:` be shown together.
- **YouTube Link:** Check the Striver A2Z sheet. If there is a direct YouTube video link, use it. Otherwise, use a search query (e.g., `youtube: "https://www.youtube.com/results?search_query=<problem_name>"`). Place this inside the `platforms:` object!
- **Article Link:** Include the Striver sheet article link if one exists, inside the `platforms:` object.

### Example Frontmatter (Free LeetCode available):
```yaml
---
title: "Problem Title"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  leetcode: "https://leetcode.com/problems/..."
  youtube: "https://www.youtube.com/..."
  article: "https://takeuforward.org/..."
---
```

### Example Frontmatter (LeetCode is Premium or unavailable -> use GFG only):
```yaml
---
title: "Problem Title"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/..."
  youtube: "https://www.youtube.com/..."
  article: "https://takeuforward.org/..."
---
```

## 4. Automatic Git Commit & Push
- Every time you finish making updates or resolving a user request, **ALWAYS automatically commit and push the code to remote**:
  ```bash
  git add .
  git commit -m "<concise descriptive message>"
  git push origin main
  ```
- Do not wait for the user to prompt for a push; automatically commit and push upon completing task updates.
