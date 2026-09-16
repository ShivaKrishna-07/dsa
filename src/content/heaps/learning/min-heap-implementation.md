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
    
    int parent(int i) { return (i - 1) / 2; }
    int left(int i) { return (2 * i + 1); }
    int right(int i) { return (2 * i + 2); }
    
    void insertKey(int k) {
        if (heap_size == capacity) return;
        
        heap_size++;
        int i = heap_size - 1;
        harr[i] = k;
        
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void MinHeapify(int i) {
        int l = left(i);
        int r = right(i);
        int smallest = i;
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
        int root = harr[0];
        harr[0] = harr[heap_size - 1];
        heap_size--;
        MinHeapify(0);
        return root;
    }
    
    void decreaseKey(int i, int new_val) {
        harr[i] = new_val;
        while (i != 0 && harr[parent(i)] > harr[i]) {
            swap(harr[i], harr[parent(i)]);
            i = parent(i);
        }
    }
    
    void deleteKey(int i) {
        if (i < heap_size) {
            decreaseKey(i, INT_MIN);
            extractMin();
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(log N)` for `insert`, `extractMin`, and `deleteKey` operations.
- **Space Complexity:** `O(N)` for storing the heap array.
