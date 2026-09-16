---
title: "Check if an array is a Min Heap"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Check+if+an+array+is+a+Min+Heap"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/is-binary-tree-heap/1"
---

### Problem Statement

Given an array of integers, check whether it represents a valid Min-Heap.
A valid Min-Heap satisfies the property that for every node at index `i`, its value is less than or equal to the values of its children at indices `2*i + 1` and `2*i + 2`.

**Example 1:**
```text
Input: arr = [1, 2, 3, 4, 5, 6]
Output: true
Explanation: The array satisfies the min-heap property everywhere.
```


**Example 2:**
```text
Input: arr = [9, 15, 10, 7, 12, 11]
Output: false
Explanation: 9 is parent of 15 and 10, valid. But 15 is parent of 7, which is invalid since 15 > 7.
```

**Example 3: (Edge Case - Single element)**
```text
Input: arr = [5]
Output: true
Explanation: A single element array is always a valid min-heap.
```

---

### Code

```cpp
class Solution {
public:
    bool isMinHeap(vector<int>& arr) {
        int n = arr.size();
        
        for (int i = 0; i <= (n - 2) / 2; i++) {
            // Check left child
            if (arr[i] > arr[2 * i + 1]) {
                return false;
            }
            // Check right child if it exists
            if (2 * i + 2 < n && arr[i] > arr[2 * i + 2]) {
                return false;
            }
        }
        
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate up to half of the array checking each node against its children.
- **Space Complexity:** `O(1)` as no extra space is used.
