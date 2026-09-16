---
title: "Maximum Sum Combinations"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Maximum+Sum+Combinations"
time: "O(N log N + K log K)"
space: "O(K)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/maximum-sum-combination/1"
---

### Problem Statement

Given two equally sized 1-D arrays `A` and `B` containing `N` integers each.
A sum combination is made by adding one element from array `A` and another element of array `B`.
Return the maximum `K` valid sum combinations from all the possible sum combinations.

**Example 1:**
```text
Input:
N = 2, K = 2
A [ ] = {3, 2}
B [ ] = {1, 4}
Output: {7, 6}
Explanation: 
7 -> (A : 3) + (B : 4)
6 -> (A : 2) + (B : 4)
```


**Example 2:**
```text
Input: N = 4, K = 3, A = [1, 4, 2, 3], B = [2, 5, 1, 6]
Output: 10, 9, 9
Explanation: 4+6=10, 3+6=9, 4+5=9.
```

**Example 3: (Edge Case - Same elements)**
```text
Input: N = 2, K = 2, A = [1, 1], B = [1, 1]
Output: 2, 2
```

---

### Code

```cpp
class Solution {
public:
    vector<int> maxCombinations(int N, int K, vector<int> &A, vector<int> &B) {
        sort(A.begin(), A.end(), greater<int>());
        sort(B.begin(), B.end(), greater<int>());
        
        // Max heap to store pairs of {sum, {i, j}}
        priority_queue<pair<int, pair<int, int>>> pq;
        set<pair<int, int>> visited;
        
        pq.push({A[0] + B[0], {0, 0}});
        visited.insert({0, 0});
        
        vector<int> res;
        
        while(K--) {
            auto curr = pq.top();
            pq.pop();
            
            res.push_back(curr.first);
            
            int i = curr.second.first;
            int j = curr.second.second;
            
            if (i + 1 < N && visited.find({i + 1, j}) == visited.end()) {
                pq.push({A[i + 1] + B[j], {i + 1, j}});
                visited.insert({i + 1, j});
            }
            if (j + 1 < N && visited.find({i, j + 1}) == visited.end()) {
                pq.push({A[i] + B[j + 1], {i, j + 1}});
                visited.insert({i, j + 1});
            }
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` for sorting both arrays. Pushing and popping `K` elements from the priority queue takes `O(K log K)`. Overall `O(N log N + K log K)`.
- **Space Complexity:** `O(K)` to store up to `K` elements in the priority queue and the visited set at any time.
