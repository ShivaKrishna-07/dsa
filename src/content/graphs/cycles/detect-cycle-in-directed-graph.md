---
title: "Detect Cycle in Directed Graph"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1"
  youtube: "https://www.youtube.com/watch?v=9twcmtQj4DU"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/detect-a-cycle-in-a-directed-graph"
---

### Problem Statement

Given a Directed Graph with `V` vertices and `E` edges, determine if it contains any cycle.

**Example 1:**
```text
Input: V = 4, edges = [[0,1], [1,2], [2,3], [3,3]]
Output: 1
Explanation: Self-loop at vertex 3 indicates a cycle.
```

**Example 2:**
```text
Input: V = 3, edges = [[0,1], [1,2]]
Output: 0
Explanation: No cycle exists.
```

---

### Intuition

- **DFS Approach:** Maintain a recursion stack / path visited array. If we encounter a node that is currently in the active recursion call stack (back-edge), a cycle exists.
- **BFS Approach (Kahn's Algorithm):** Topological sort is only possible for DAGs. If the number of nodes processed in Kahn's algorithm is less than `V`, a cycle exists.

---

### Code

```cpp
// DFS
class Solution {
    bool dfs(int node, vector<int> adj[], vector<bool>& vis, vector<bool>& pathVis) {
        vis[node] = true;
        pathVis[node] = true;

        for (auto it : adj[node]) {
            if (!vis[it]) {
                if (dfs(it, adj, vis, pathVis)) return true;
            } else if (pathVis[it]) {
                // Back-edge found: node is already in current DFS recursion stack
                return true;
            }
        }

        pathVis[node] = false;
        return false;
    }
public:
    bool isCyclic(int V, vector<int> adj[]) {
        // pathVis tracks vertices in the active DFS recursion stack
        vector<bool> vis(V, false), pathVis(V, false);
        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                if (dfs(i, adj, vis, pathVis)) return true;
            }
        }
        return false;
    }
};
```

```cpp
// BFS (Kahn's Algorithm)
class Solution {
public:
    bool isCyclic(int V, vector<int> adj[]) {
        // Stores in-degree (incoming edges count) for each vertex
        vector<int> indegree(V, 0);
        for (int i = 0; i < V; i++)
            for (auto it : adj[i]) indegree[it]++;

        // Queue stores vertices with in-degree 0 (no dependencies)
        queue<int> q;
        for (int i = 0; i < V; i++)
            if (indegree[i] == 0) q.push(i);

        int cnt = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            cnt++;
            for (auto it : adj[node]) {
                if (--indegree[it] == 0) q.push(it);
            }
        }
        // If processed vertex count != V, a directed cycle exists
        return cnt != V;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Standard traversal.
- **Space Complexity:** `O(V)` — Visited and pathVisited arrays / queue and indegree array.
