---
title: "Bridges in Graph (Critical Connections)"
difficulty: "Hard"
time: "O(V + 2E)"
space: "O(V + 2E)"
platforms:
  leetcode: "https://leetcode.com/problems/critical-connections-in-a-network/"
  youtube: "https://www.youtube.com/watch?v=qrAub5z8FeA"
  article: "https://takeuforward.org/data-structure/bridges-in-graph-using-tarjans-algorithm-g-55/"
---

### Problem Statement

There are `n` servers numbered from `0` to `n - 1` connected by undirected server-to-server `connections` forming a network. A critical connection (bridge) is a connection that, if removed, will make some servers unable to reach some other server.

Return all critical connections in the network in any order.

**Example 1:**
```text
Input: n = 4, connections = [[0,1],[1,2],[2,0],[1,3]]
Output: [[1,3]]
Explanation: [[1,3]] is the only critical connection because removing it disconnects server 3 from the rest of the network.
```

---

### Intuition

We use Tarjan's bridge-finding algorithm using DFS discovery times. We maintain:
- `tin[u]`: Insertion / discovery time of node `u`.
- `low[u]`: Lowest discovery time reachable from `u` using back-edges.

During DFS, for each adjacent node `v` of `u` (where `v != parent`):
1. If `v` is unvisited: Recurse on `v`. Update `low[u] = min(low[u], low[v])`. If `low[v] > tin[u]`, the edge `(u, v)` is a bridge because `v` has no alternative path to reach `u` or any ancestor of `u`.
2. If `v` is already visited: Update `low[u] = min(low[u], tin[v])`.

---

### Code

```cpp
class Solution {
    int timer = 1;

    void dfs(int u, int p, vector<vector<int>>& adj, vector<int>& vis, vector<int>& tin, vector<int>& low, vector<vector<int>>& ans) {
        vis[u] = 1;
        tin[u] = timer;
        low[u] = timer;
        timer++;

        for (auto v : adj[u]) {
            if (v == p) {
                continue;
            }

            if (!vis[v]) {
                dfs(v, u, adj, vis, tin, low, ans);
                low[u] = min(low[u], low[v]);

                if (low[v] > tin[u]) {
                    ans.push_back({u, v});
                }
            } else {
                low[u] = min(low[u], tin[v]);
            }
        }
    }

public:
    vector<vector<int>> criticalConnections(int n, vector<vector<int>>& connections) {
        vector<vector<int>> adj(n);
        for (auto& e : connections) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        vector<int> vis(n, 0);
        // tin: DFS discovery time; low: lowest discovery time reachable via back-edge
        vector<int> tin(n);
        vector<int> low(n);
        vector<vector<int>> ans;

        dfs(0, -1, adj, vis, tin, low, ans);
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + 2E)` — Standard DFS traversal visiting every node and edge.
- **Space Complexity:** `O(V + 2E)` — Adjacency list and recursion stack plus helper arrays (`tin`, `low`, `vis`).
