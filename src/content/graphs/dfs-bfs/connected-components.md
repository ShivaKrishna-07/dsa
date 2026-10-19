---
title: "Connected Components"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V)"
platforms:
  youtube: "https://www.youtube.com/watch?v=lea-Ap_Rdts"
  gfg: "https://practice.geeksforgeeks.org/problems/number-of-provinces/1"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/number-of-provinces"
---

### Problem Statement

Given an undirected graph with `V` vertices and `E` edges, find the number of connected components in the graph. A connected component is a set of vertices where every vertex is reachable from every other vertex in the same set.

**Example 1:**
```text
Input: V = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2
Explanation: Components are {0,1,2} and {3,4}.
```

---

### Intuition

Start from every unvisited node and run a DFS/BFS to mark all reachable nodes as visited. Each time we start a new traversal from an unvisited node, we've found a new component.

---

### Code

```cpp
// DFS
class Solution {
public:
    void dfs(int node, vector<int> adj[], vector<bool>& vis) {
        vis[node] = true;
        for(auto it : adj[node]) {
            if(!vis[it]) dfs(it, adj, vis);
        }
    }

    int numProvinces(vector<vector<int>>& adj, int V) {
        vector<int> adjList[V];
        for(int i = 0; i < V; i++)
            for(int j = 0; j < V; j++)
                if(adj[i][j] == 1 && i != j) adjList[i].push_back(j);

        vector<bool> vis(V, false);
        int cnt = 0;
        for(int i = 0; i < V; i++) {
            if (!vis[i]) {
            dfs(i, adjList, vis);
            cnt++;
        }
        }
        return cnt;
    }
};
```

```cpp
// BFS
class Solution {
public:
    void bfs(int node, vector<int> adj[], vector<bool>& vis) {
        queue<int> q;
        q.push(node);
        vis[node] = true;
        while(!q.empty()) {
            int curr = q.front();
            q.pop();
            for(auto it : adj[curr]) {
                if (!vis[it]) {
                vis[it] = true;
                q.push(it);
            }
            }
        }
    }

    int numProvinces(vector<vector<int>>& adj, int V) {
        vector<int> adjList[V];
        for(int i = 0; i < V; i++)
            for(int j = 0; j < V; j++)
                if(adj[i][j] == 1 && i != j) adjList[i].push_back(j);

        vector<bool> vis(V, false);
        int cnt = 0;
        for(int i = 0; i < V; i++) {
            if (!vis[i]) {
            bfs(i, adjList, vis);
            cnt++;
        }
        }
        return cnt;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` each node and edge visited once.
- **Space Complexity:** `O(V)` for the visited array and recursion/queue.
