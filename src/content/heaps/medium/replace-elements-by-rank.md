---
title: "Replace elements by its rank in the array"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Replace+elements+by+its+rank+in+the+array+leetcode+1331"
time: "O(N log N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/rank-transform-of-an-array/"
---

### Problem Statement

Given an array of integers `arr`, replace each element with its rank.

The rank represents how large the element is. The rank has the following rules:
- Rank is an integer starting from 1.
- The larger the element, the larger the rank. If two elements are equal, their rank must be the same.
- Rank should be as small as possible.

**Example 1:**
```text
Input: arr = [40,10,20,30]
Output: [4,1,2,3]
Explanation: 40 is the largest element. 10 is the smallest. 20 is the second smallest. 30 is the third smallest.
```


**Example 2:**
```text
Input: arr = [100,100,100]
Output: [1,1,1]
Explanation: Same elements share the same rank.
```

**Example 3: (Edge Case - Empty array)**
```text
Input: arr = []
Output: []
```

---

### Intuition

To assign ranks based on relative size, we need to know the sorted order of the elements. We can pair each element with its original index and push them into a Min-Heap. By popping from the Min-Heap, we process elements from smallest to largest, assigning ranks. If an element is the same as the previously popped element, it gets the same rank; otherwise, the rank increments.

---

### Code

```cpp
class Solution {
public:
    vector<int> arrayRankTransform(vector<int>& arr) {
        int n = arr.size();
        if (n == 0) return {};
        
        // Min-heap to sort elements while tracking their original indices
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
        for (int i = 0; i < n; i++) {
            pq.push({arr[i], i});
        }
        
        vector<int> res(n);
        int rank = 1;
        int prev = pq.top().first; // Track previous value to handle duplicates
        
        while (!pq.empty()) {
            auto curr = pq.top();
            pq.pop();
            
            // Increment rank only if the current value is strictly greater than the previous
            if (curr.first > prev) {
                rank++;
            }
            
            res[curr.second] = rank;
            prev = curr.first;
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` to insert and extract all `N` elements from the priority queue.
- **Space Complexity:** `O(N)` for the priority queue and result array.
