---
title: "Find Eventual Safe States"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  leetcode: "https://leetcode.com/problems/find-eventual-safe-states/"
  youtube: "https://www.youtube.com/watch?v=u4v_TQTr9TU"
  article: "https://takeuforward.org/data-structure/find-eventual-safe-states-dfs/"
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

Any node that is part of a cycle or leads into a cycle is not safe.
- **DFS:** Detect cycles. If a node is on a cycle or leads to a cycle, mark it unsafe; otherwise mark it safe.
- **BFS (Kahn's):** Reverse all edges! Terminal nodes (outdegree 0) now have indegree 0 in the reversed graph. Running Kahn's algorithm on the reversed graph will visit exactly the safe nodes.

---

### Code

```cpp
// BFS (Reversed Graph + Kahn's)
class Solution {
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        // Reversed graph: original terminal nodes become starting nodes
        vector<vector<int>> revAdj(n);
        // Stores in-degree in reversed graph (out-degree in original graph)
        vector<int> indegree(n, 0);

        for (int i = 0; i < n; i++) {
            for (int it : graph[i]) {
                revAdj[it].push_back(i);
                indegree[i]++;
            }
        }

        // Queue stores terminal nodes (in-degree 0 in reversed graph)
        queue<int> q;
        for (int i = 0; i < n; i++)
            if (indegree[i] == 0) q.push(i);

        vector<int> safe;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            safe.push_back(node);
            for (auto it : revAdj[node]) {
                if (--indegree[it] == 0) q.push(it);
            }
        }

        sort(safe.begin(), safe.end());
        return safe;
    }
};
```

```cpp
// DFS (Cycle Detection)
class Solution {
    bool dfs(int node, vector<vector<int>>& graph, vector<int>& state) {
        // state: 0 = unvisited, 1 = visiting (in recursion stack), 2 = safe
        if (state[node] > 0) return state[node] == 2;
        state[node] = 1;
        for (int it : graph[node]) {
            if (!dfs(it, graph, state)) return false;
        }
        state[node] = 2;
        return true;
    }
public:
    vector<int> eventualSafeNodes(vector<vector<int>>& graph) {
        int n = graph.size();
        vector<int> state(n, 0);
        vector<int> safe;

        for (int i = 0; i < n; i++) {
            if (dfs(i, graph, state)) safe.push_back(i);
        }
        return safe;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Reversing edges and running topological sort.
- **Space Complexity:** `O(V + E)` — Reversed graph, indegrees, and queue.
