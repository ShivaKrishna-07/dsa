---
title: "Topological Sort"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/topological-sort/1"
  youtube: "https://www.youtube.com/results?search_query=Topological+Sort"
  article: "https://takeuforward.org/practice/dsa/topological-sort-or-kahns-algorithm"
---

### Problem Statement

Given an adjacency list for a Directed Acyclic Graph (DAG) with `V` vertices and `E` edges, return any valid topological sorting of its vertices.

A topological sort of a DAG is a linear ordering of vertices such that for every directed edge `u -> v`, vertex `u` comes before `v` in the ordering.

**Example 1:**
```text
Input: V = 6, E = 6, adj = [[], [], [3], [1], [0,1], [0,2]]
Output: [5, 4, 2, 3, 1, 0]
Explanation: A valid topological ordering where every u comes before v for each edge u -> v.
```

---

### Intuition

- **DFS Approach:** Process vertices recursively. Once all outgoing neighbors of node `u` are visited, push `u` onto a stack. When all nodes are visited, popping the stack yields the topological order.
- **BFS (Kahn's Algorithm):** Compute indegrees for all vertices. Vertices with indegree `0` have no dependencies and are pushed to the queue. As nodes are popped, decrease the indegrees of their neighbors; when any neighbor reaches indegree `0`, push it.

---

### Code

```cpp
// DFS
class Solution {
    void dfs(int node, vector<int> adj[], vector<bool>& vis, stack<int>& st) {
        vis[node] = true;
        for (auto it : adj[node]) {
            if (!vis[it]) dfs(it, adj, vis, st);
        }
        st.push(node);
    }
public:
    vector<int> topoSort(int V, vector<int> adj[]) {
        vector<bool> vis(V, false);
        // Stack stores vertices in post-order (finishing times)
        stack<int> st;
        for (int i = 0; i < V; i++) {
            if (!vis[i]) dfs(i, adj, vis, st);
        }

        vector<int> ans;
        while (!st.empty()) {
            ans.push_back(st.top());
            st.pop();
        }
        return ans;
    }
};
```

```cpp
// BFS (Kahn's Algorithm)
class Solution {
public:
    vector<int> topoSort(int V, vector<int> adj[]) {
        // Stores in-degree (incoming edges count) for each vertex
        vector<int> indegree(V, 0);
        for (int i = 0; i < V; i++)
            for (auto it : adj[i]) indegree[it]++;

        // Queue stores vertices with in-degree 0 (ready to process)
        queue<int> q;
        for (int i = 0; i < V; i++)
            if (indegree[i] == 0) q.push(i);

        vector<int> topo;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            topo.push_back(node);
            for (auto it : adj[node]) {
                if (--indegree[it] == 0) q.push(it);
            }
        }
        return topo;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Each vertex and edge processed once.
- **Space Complexity:** `O(V)` — Visited array/indegree array and stack/queue.
