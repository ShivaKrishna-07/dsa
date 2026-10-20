---
title: "Find Eventual Safe States"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  leetcode: "https://leetcode.com/problems/find-eventual-safe-states/"
  youtube: "https://www.youtube.com/results?search_query=Find+Eventual+Safe+States"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/find-eventual-safe-states"
---

### Problem Statement

There is a directed graph of `n` nodes with each node labeled from `0` to `n - 1`. The graph is represented by a 0-indexed 2D integer array `graph` where `graph[i]` is an integer array of nodes adjacent to `i`.

A node is a **terminal node** if there are no outgoing edges. A node is a **safe node** if every possible path starting from that node leads to a terminal node (or another safe node).

Return an array containing all the safe nodes of the graph in **ascending order**.

**Example 1:**
```text
Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
Output: [2,4,5,6]
Explanation: Nodes 5 and 6 are terminal nodes. Paths from 2 and 4 only lead to terminal nodes.
```

**Example 2:**
```text
Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
Output: [4]
```

---

### Intuition

A node is safe if every path starting from it ends at a terminal node (out-degree 0). Any node that is part of a cycle or leads into a cycle is not safe.

We can solve this using two approaches:
- **DFS (Cycle Detection via `vis` & `pathVis`):** Uses Striver's cycle-detection pattern with `vis`, `pathVis`, and a `check` array. If an adjacent node is part of the current recursion stack (`pathVis[it] == 1`), a cycle is detected. When all outgoing paths from a node complete without cycles, `check[node] = 1`.
- **BFS (Kahn's on Reversed Graph):** Reversing all edges turns terminal nodes (out-degree 0) into sources (in-degree 0). Running Kahn's algorithm from terminal nodes backward discovers all safe nodes.

---

### Code

```cpp
// DFS (Cycle Detection via vis & pathVis)
class Solution {
    bool dfsCheck(int node, vector<vector<int>>& graph, vector<int>& vis, vector<int>& pathVis, vector<int>& check) {
        vis[node] = 1;
        pathVis[node] = 1;
        check[node] = 0;

        for (auto it : graph[node]) {
            // When neighbor is unvisited
            if (!vis[it]) {
                if (dfsCheck(it, graph, vis, pathVis, check)) {
                    return true;
                }
            } else if (pathVis[it]) {
                // Node visited on same recursion path -> cycle detected
                return true;
            }
        }

        // No cycle found from this node -> marked safe
        check[node] = 1;
        pathVis[node] = 0;
        return false;
    }
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int V = graph.size();
        // vis tracks visited nodes across all DFS calls
        vector<int> vis(V, 0);
        // pathVis tracks nodes on current DFS path for cycle detection
        vector<int> pathVis(V, 0);
        // check[i] = 1 indicates node i is safe
        vector<int> check(V, 0);
        vector<int> safeNodes;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                dfsCheck(i, graph, vis, pathVis, check);
            }
        }

        for (int i = 0; i < V; i++) {
            if (check[i] == 1) {
                safeNodes.push_back(i);
            }
        }

        return safeNodes;
    }
};
```

```cpp
// BFS (Kahn's Algorithm on Reversed Graph)
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int v = graph.size();
        // Reversed graph: terminal nodes become sources with in-degree 0
        vector<vector<int>> adjRev(v);
        // Stores in-degree of nodes in reversed graph
        vector<int> indegree(v, 0);

        for (int i = 0; i < v; i++) {
            for (auto it : graph[i]) {
                adjRev[it].push_back(i);
                indegree[i]++;
            }
        }

        // Queue stores nodes with in-degree 0
        queue<int> q;
        for (int i = 0; i < v; i++) {
            if (indegree[i] == 0) {
                q.push(i);
            }
        }

        vector<int> safeNodes;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            safeNodes.push_back(node);

            for (auto it : adjRev[node]) {
                indegree[it]--;
                if (indegree[it] == 0) {
                    q.push(it);
                }
            }
        }

        sort(safeNodes.begin(), safeNodes.end());
        return safeNodes;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Reversing edges and running topological sort.
- **Space Complexity:** `O(V + E)` — Reversed graph, indegrees, and queue.
