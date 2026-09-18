---
title: "Convert Min Heap to Max Heap"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Convert+Min+Heap+to+Max+Heap"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/convert-min-heap-to-max-heap-1666385109/1"
---

### Problem Statement

You are given an array representing a Min-Heap. Convert it into a Max-Heap in `O(N)` time.

**Example 1:**
```text
Input: arr = [3, 4, 8, 11, 13]
Output: [13, 11, 8, 4, 3]
Explanation: The elements form a valid max heap after conversion.
```


**Example 2:**
```text
Input: arr = [1, 2, 3, 4, 5]
Output: [5, 4, 3, 1, 2]
```

**Example 3: (Edge Case - Already valid for both / single element)**
```text
Input: arr = [7]
Output: [7]
```

---

### Code

```cpp
class Solution {
    void maxHeapify(vector<int>& arr, int i, int n) {
        int largest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        
        // Find the largest among root, left child, and right child
        if (left < n && arr[left] > arr[largest]) {
            largest = left;
        }
        if (right < n && arr[right] > arr[largest]) {
            largest = right;
        }
        
        // If root is not largest, swap and recursively heapify the affected subtree
        if (largest != i) {
            swap(arr[i], arr[largest]);
            maxHeapify(arr, largest, n);
        }
    }
    
public:
    void convertMinToMaxHeap(vector<int>& arr, int n) {
        // Start from the last internal node and heapify all internal nodes bottom-up
        for (int i = (n - 2) / 2; i >= 0; --i) {
            maxHeapify(arr, i, n);
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)`. Building a heap from an array by calling `heapify` bottom-up takes linear time.
- **Space Complexity:** `O(log N)` for the recursive stack in `maxHeapify`, or `O(1)` if done iteratively.
