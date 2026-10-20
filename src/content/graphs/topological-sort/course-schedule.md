---
title: "Course Schedule I & II"
difficulty: "Medium"
time: "O(V + E)"
space: "O(V + E)"
platforms:
  leetcode: "https://leetcode.com/problems/course-schedule/"
  youtube: "https://www.youtube.com/watch?v=WAOfKIrV238"
  article: "https://takeuforward.org/blogs/data-structure-and-algorithm/course-schedule-i"
---

### Problem Statement

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` indicates that you must take course `b` first if you want to take course `a`.

1. **Course Schedule I:** Return `true` if you can finish all courses, else `false`.
2. **Course Schedule II:** Return the ordering of courses you should take to finish all courses. If impossible, return an empty array.

**Example 1:**
```text
Input: numCourses = 2, prerequisites = [[1,0]]
Output (I): true
Output (II): [0, 1]
Explanation: To take course 1 you should have finished course 0.
```

**Example 2:**
```text
Input: numCourses = 2, prerequisites = [[1,0],[0,1]]
Output (I): false
Output (II): []
Explanation: Cyclic dependency between 0 and 1.
```

---

### Intuition

Build a directed graph with edge `b -> a` for each prerequisite `[a, b]`. Use Kahn's algorithm (BFS Topo Sort) to find a valid ordering. If the number of sorted courses equals `numCourses`, it is possible to finish all courses (DAG with no cycle).

---

### Code

```cpp
// Course Schedule I
class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        // Stores in-degree (prerequisites count) for each course
        vector<int> indegree(numCourses, 0);

        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }

        // Queue stores courses with 0 remaining prerequisites
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0) q.push(i);

        int count = 0;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            count++;
            for (int it : adj[node]) {
                if (--indegree[it] == 0) q.push(it);
            }
        }
        return count == numCourses;
    }
};
```

```cpp
// Course Schedule II
class Solution {
public:
    vector<int> findOrder(int numCourses, vector<vector<int>>& prerequisites) {
        vector<vector<int>> adj(numCourses);
        vector<int> indegree(numCourses, 0);

        for (auto& p : prerequisites) {
            adj[p[1]].push_back(p[0]);
            indegree[p[0]]++;
        }

        // Queue stores courses with 0 remaining prerequisites
        queue<int> q;
        for (int i = 0; i < numCourses; i++)
            if (indegree[i] == 0) q.push(i);

        vector<int> order;
        while (!q.empty()) {
            int node = q.front();
            q.pop();
            order.push_back(node);
            for (int it : adj[node]) {
                if (--indegree[it] == 0) q.push(it);
            }
        }

        return order.size() == numCourses ? order : vector<int>{};
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(V + E)` — Building graph and Kahn's algorithm.
- **Space Complexity:** `O(V + E)` — Adjacency list and indegree array.
