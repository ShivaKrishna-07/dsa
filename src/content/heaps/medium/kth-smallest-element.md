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


**Example 2:**
```text
Input: N = 5, arr[] = {1, 2, 3, 4, 5}, K = 1
Output: 1
```

**Example 3: (Edge Case - K is max length)**
```text
Input: N = 4, arr[] = {10, 5, 4, 3}, K = 4
Output: 10
```

---

### Intuition

Similar to finding the Kth largest element, we can use a Max-Heap of size K. As we traverse the array, we insert elements into the heap. If the heap size exceeds K, we remove the maximum element (the root). By doing this, we discard elements that are too large, leaving only the K smallest elements in the heap. The root will then be the Kth smallest element.

---

### Code

```cpp
class Solution{
public:
    int kthSmallest(int arr[], int l, int r, int k) {
        // Max-heap to maintain the top K smallest elements seen so far
        priority_queue<int> maxHeap;
        
        for (int i = l; i <= r; i++) {
            maxHeap.push(arr[i]);
            
            // If heap size exceeds k, pop the largest element
            if (maxHeap.size() > k) {
                maxHeap.pop(); 
            }
        }
        
        // The root of the max-heap is the kth smallest element
        return maxHeap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the number of elements in the array. Inserting into a max-heap of size `K` takes `O(log K)`.
- **Space Complexity:** `O(K)` to store the `K` smallest elements in the max-heap.
