---
title: "Detect Cycle in Undirected Graph"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1"
  youtube: "https://www.youtube.com/results?search_query=Detect+Cycle+in+Undirected+Graph"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-an-undirected-graph"
---

### Problem Statement

Given an undirected graph with `V` vertices labelled `0` to `V-1` and `E` edges, determine whether the graph contains any cycle or not.

**Example 1:**
```text
Input: V = 5, E = 5, adj = [[1], [0,2,4], [1,3], [2,4], [1,3]]
Output: 1
Explanation: 1 -> 2 -> 3 -> 4 -> 1 forms a cycle.
```

**Example 2:**
```text
Input: V = 4, E = 3, adj = [[], [2], [1,3], [2]]
Output: 0
Explanation: No cycle exists.
```

---

### Intuition

During traversal (BFS or DFS), if we encounter an adjacent node that is already visited and is **not** the parent of the current node, a cycle exists.

---

### Code

```cpp
// BFS
class Solution {
    bool checkCycle(int src, vector<int> adj[], vector<bool>& vis) {
        // Queue stores {current node, parent node}
        queue<pair<int, int>> q;
        vis[src] = true;
        q.push({src, -1});

        while (!q.empty()) {
            auto [node, parent] = q.front();
            q.pop();
            for (auto it : adj[node]) {
                if (!vis[it]) {
                    vis[it] = true;
                    q.push({it, node});
                } else if (it != parent) {
                    // Visited neighbor that is not parent indicates a cycle
                    return true;
                }
            }
        }
        return false;
    }
public:
    bool isCycle(int V, vector<int> adj[]) {
        vector<bool> vis(V, false);
        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                if (checkCycle(i, adj, vis)) return true;
            }
        }
        return false;
    }
};
```

```cpp
// DFS
class Solution {
    bool dfs(int node, int parent, vector<int> adj[], vector<bool>& vis) {
        vis[node] = true;
        for (auto it : adj[node]) {
            if (!vis[it]) {
                if (dfs(it, node, adj, vis)) return true;
            } else if (it != parent) {
                // Visited neighbor not matching parent in DFS indicates a cycle
                return true;
            }
        }
        return false;
    }
public:
    bool isCycle(int V, vector<int> adj[]) {
        vector<bool> vis(V, false);
        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                if (dfs(i, -1, adj, vis)) return true;
            }
        }
        return false;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + 2E)` — Each vertex and edge is visited once.
- **Space Complexity:** `O(V)` — Visited array and queue/recursion stack.
