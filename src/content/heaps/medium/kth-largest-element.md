---
title: "Kth Largest Element in an Array"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Kth+Largest+Element+in+an+Array+leetcode+215"
time: "O(N log K)"
space: "O(K)"
platforms:
  leetcode: "https://leetcode.com/problems/kth-largest-element-in-an-array/"
---

### Problem Statement

Given an integer array `nums` and an integer `k`, return the `kth` largest element in the array.

Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.
Can you solve it without sorting?

**Example 1:**
```text
Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
```

---

### Code

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Min-heap to keep track of the top k elements
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (int num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop(); // Keep only k largest elements
            }
        }
        
        return minHeap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the number of elements in the array. The heap size is maintained at `K`.
- **Space Complexity:** `O(K)` to store elements in the min-heap.
