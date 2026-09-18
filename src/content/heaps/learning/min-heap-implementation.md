---
title: "Min Heap Implementation"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Min+Heap+Implementation"
time: "O(log N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/operations-on-binary-min-heap/1"
---

### Problem Statement

A Min-Heap is a complete binary tree in which the value in each internal node is smaller than or equal to the values in the children of that node. 
You are required to implement a Min-Heap with the following operations:
1. `insertKey(int k)`: Inserts a new key `k` into the min-heap.
2. `deleteKey(int i)`: Deletes key at index `i`.
3. `extractMin()`: Removes and returns the minimum element from the heap.

**Example 1:**
```text
Input:
Insert: 3, 2, 1
Output of extractMin: 1
```


**Example 2:**
```text
Input: Insert 5, Insert 3, Insert 8, extractMin()
Output: 3
```

**Example 3: (Edge Case - Extract from empty)**
```text
Input: extractMin()
Output: -1
```

---

### Intuition

A Min-Heap can be efficiently represented as an array where the root is at index 0. For any element at index `i`, its left child is at `2i+1`, right child at `2i+2`, and parent at `(i-1)/2`. To insert, we add at the end and 'bubble up'. To extract, we replace the root with the last element and 'bubble down' (heapify). This guarantees `O(log N)` time for both operations.

---

### Code

```cpp
class MinHeap {
    int *harr;
    int capacity;
    int heap_size;
public:
    MinHeap(int cap) {
        heap_size = 0;
        capacity = cap;
        harr = new int[cap];
    }
    
    // Utility functions to get parent and child indices
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return (2 * i + 1); }
    int right(int i) { return (2 * i + 2); }
    
    void insertKey(int k) {
        if (heap_size == capacity) return;
        
        // Insert the new key at the end
        heap_size++;
        int i = heap_size - 1;
        harr[i] = k;
        
        // Fix the min heap property if it is violated
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void MinHeapify(int i) {
        int l = left(i);
        int r = right(i);
        int smallest = i;
        
        // Find the smallest among node and its children
        if (l < heap_size && harr[l] < harr[i]) smallest = l;
        if (r < heap_size && harr[r] < harr[smallest]) smallest = r;
        
        if (smallest != i) {
            swap(harr[i], harr[smallest]);
            MinHeapify(smallest);
        }
    }
    
    int extractMin() {
        if (heap_size <= 0) return -1;
        if (heap_size == 1) {
            heap_size--;
            return harr[0];
        }
        
        // Store minimum value and replace root with last element
        int root = harr[0];
        harr[0] = harr[heap_size - 1];
        heap_size--;
        
        // Restore min heap property
        MinHeapify(0);
        return root;
    }
    
    void decreaseKey(int i, int new_val) {
        harr[i] = new_val;
        // Float up the node to its correct position
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void deleteKey(int i) {
        if (i < heap_size) {
            // Decrease key to negative infinity so it floats to top
            decreaseKey(i, INT_MIN);
            // Extract the minimum element (the one we just pushed to top)
            extractMin();
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(log N)` for `insert`, `extractMin`, and `deleteKey` operations.
- **Space Complexity:** `O(N)` for storing the heap array.
