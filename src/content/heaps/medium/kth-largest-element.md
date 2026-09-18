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


**Example 2:**
```text
Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4
```

**Example 3: (Edge Case - K equals array length)**
```text
Input: nums = [10, 9, 8], k = 3
Output: 8
Explanation: The 3rd largest element is the smallest element.
```

---

### Code

```cpp
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        // Min-heap to maintain the top K largest elements seen so far
        priority_queue<int, vector<int>, greater<int>> minHeap;
        
        for (int num : nums) {
            minHeap.push(num);
            
            // If heap size exceeds k, pop the smallest element
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        // The root of the min-heap is the kth largest element
        return minHeap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the number of elements in the array. The heap size is maintained at `K`.
- **Space Complexity:** `O(K)` to store elements in the min-heap.
