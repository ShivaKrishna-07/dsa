---
title: "Extract Min"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Extract+Min+from+Min+Heap"
time: "O(log N)"
space: "O(1)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/operations-on-binary-min-heap/1"
---

### Problem Statement

Given a Min Heap array, write a function to extract the minimum element. The minimum element is always present at the root (index 0). After removing the root, we must replace it with the last element in the array and perform `MinHeapify` to restore the heap property.

**Example 1:**
```text
Input: [1, 3, 6, 5, 9, 8]
Output: 1
Heap after extraction: [3, 5, 6, 8, 9]
```


**Example 2:**
```text
Input: [2, 5, 8, 10, 15]
Output: 2
Heap after extraction: [5, 10, 8, 15]
```

**Example 3: (Edge Case - Single element heap)**
```text
Input: [42]
Output: 42
Heap after extraction: []
```

---

### Code

```cpp
// Assuming harr[] is the min heap array and heap_size is maintained globally
int extractMin() {
    if (heap_size <= 0)
        return -1;
    if (heap_size == 1) {
        heap_size--;
        return harr[0];
    }
    
    // Store the minimum value, and replace root with the last element
    int root = harr[0];
    harr[0] = harr[heap_size - 1];
    heap_size--;
    
    // Restore the heap property starting from the new root
    MinHeapify(0);
    
    return root;
}

void MinHeapify(int i) {
    int l = 2 * i + 1;
    int r = 2 * i + 2;
    int smallest = i;
    
    // Find the smallest among root, left child, and right child
    if (l < heap_size && harr[l] < harr[i])
        smallest = l;
    if (r < heap_size && harr[r] < harr[smallest])
        smallest = r;
        
    // If root is not the smallest, swap with the smallest child and continue heapifying
    if (smallest != i) {
        swap(harr[i], harr[smallest]);
        MinHeapify(smallest);
    }
}
```

---

### Complexity Analysis

- **Time Complexity:** `O(log N)` where `N` is the number of elements in the heap, due to the `MinHeapify` process running from root to a leaf.
- **Space Complexity:** `O(log N)` for the recursion stack in `MinHeapify`, or `O(1)` if implemented iteratively.
