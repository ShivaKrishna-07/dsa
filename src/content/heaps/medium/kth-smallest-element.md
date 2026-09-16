---
title: "Kth Smallest Element in an Array"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Kth+Smallest+Element"
time: "O(N log K)"
space: "O(K)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1"
---

### Problem Statement

Given an array `arr[]` and an integer `K` where `K` is smaller than size of array, the task is to find the `Kth` smallest element in the given array. It is given that all array elements are distinct.

**Example 1:**
```text
Input:
N = 6
arr[] = 7 10 4 3 20 15
K = 3
Output: 7
Explanation:
3rd smallest element in the given array is 7.
```

---

### Code

```cpp
class Solution{
public:
    int kthSmallest(int arr[], int l, int r, int k) {
        // Max-heap to keep track of the smallest k elements
        priority_queue<int> maxHeap;
        
        for (int i = l; i <= r; i++) {
            maxHeap.push(arr[i]);
            if (maxHeap.size() > k) {
                maxHeap.pop(); // Remove the largest among the smallest k
            }
        }
        
        return maxHeap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the number of elements in the array. Inserting into a max-heap of size `K` takes `O(log K)`.
- **Space Complexity:** `O(K)` to store the `K` smallest elements in the max-heap.
