---
title: "Connected Components"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  leetcode: "https://leetcode.com/problems/number-of-provinces/"
  youtube: "https://www.youtube.com/results?search_query=Connected+Components"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-provinces"
---

### Problem Statement

Given an undirected graph with `V` vertices (labeled from `0` to `V - 1`) and `E` edges, find the total number of **connected components** in the graph. 

A connected component is a maximal subgraph where every vertex is reachable from every other vertex via a path, and no vertex has a path to any vertex outside this component.

**Example 1:**
```text
Input: V = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Explanation:
Vertices are 0, 1, 2, 3, 4. The edges form two independent groups:

  Component 1:        Component 2:
    0 --- 1 --- 2          3 --- 4

- Vertices {0, 1, 2} are connected together.
- Vertices {3, 4} are connected together.
There are no edges connecting {0, 1, 2} with {3, 4}.
Hence, there are 2 connected components.
```

**Example 2:**
```text
Input: V = 4, edges = [[0,1],[2,3]]
Output: 2
Explanation:
  Component 1:        Component 2:
    0 --- 1                2 --- 3

Hence, there are 2 connected components.
```

**Example 3:**
```text
Input: V = 4, edges = [[0,1],[1,2],[2,3],[3,0]]
Output: 1
Explanation:
  0 --- 1
  |     |
  3 --- 2

All 4 vertices form a single connected cycle, so there is only 1 connected component.
```

---

### Intuition

1. Build an adjacency list from the given edges (or convert adjacency matrix to adjacency list).
2. Keep a `vis` array initialized to `false` for all `V` vertices.
3. Iterate through every vertex `i` from `0` to `V - 1`:
   - If vertex `i` is not visited, it marks the start of a new connected component.
   - Increment our component count `cnt`.
   - Run DFS (or BFS) from `i` to traverse and mark every vertex reachable from `i` as visited.
4. When the loop finishes, `cnt` is the total number of connected components.

---

### Code

```cpp
// DFS
class Solution {
private:
    void dfs(int node, vector<int> adj[], vector<bool>& vis) {
        vis[node] = true;
        for (int it : adj[node]) {
            if (!vis[it]) {
                dfs(it, adj, vis);
            }
        }
    }

public:
    int countComponents(int V, vector<vector<int>>& edges) {
        vector<int> adj[V];
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<bool> vis(V, false);
        int cnt = 0;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                cnt++;
                dfs(i, adj, vis);
            }
        }

        return cnt;
    }

    // Number of Provinces (Adjacency Matrix format)
    int numProvinces(vector<vector<int>>& isConnected, int V) {
        vector<int> adj[V];
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (isConnected[i][j] == 1 && i != j) {
                    adj[i].push_back(j);
                }
            }
        }

        vector<bool> vis(V, false);
        int cnt = 0;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                cnt++;
                dfs(i, adj, vis);
            }
        }

        return cnt;
    }
};
```

```cpp
// BFS
class Solution {
private:
    void bfs(int start, vector<int> adj[], vector<bool>& vis) {
        queue<int> q;
        q.push(start);
        vis[start] = true;

        while (!q.empty()) {
            int curr = q.front();
            q.pop();

            for (int it : adj[curr]) {
                if (!vis[it]) {
                    vis[it] = true;
                    q.push(it);
                }
            }
        }
    }

public:
    int countComponents(int V, vector<vector<int>>& edges) {
        vector<int> adj[V];
        for (auto& edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<bool> vis(V, false);
        int cnt = 0;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                cnt++;
                bfs(i, adj, vis);
            }
        }

        return cnt;
    }

    // Number of Provinces (Adjacency Matrix format)
    int numProvinces(vector<vector<int>>& isConnected, int V) {
        vector<int> adj[V];
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < V; j++) {
                if (isConnected[i][j] == 1 && i != j) {
                    adj[i].push_back(j);
                }
            }
        }

        vector<bool> vis(V, false);
        int cnt = 0;

        for (int i = 0; i < V; i++) {
            if (!vis[i]) {
                cnt++;
                bfs(i, adj, vis);
            }
        }

        return cnt;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Every vertex and edge is visited once during traversal.
- **Space Complexity:** `O(V)` — For the `vis` array, adjacency list representation, and recursion/queue call stack.
