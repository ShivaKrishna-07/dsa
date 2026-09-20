---
title: "Find Median from Data Stream"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Find+Median+from+Data+Stream+leetcode+295"
time: "O(log N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/find-median-from-data-stream/"
---

### Problem Statement

The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.
- For example, for `arr = [2,3,4]`, the median is `3`.
- For example, for `arr = [2,3]`, the median is `(2 + 3) / 2 = 2.5`.

Implement the `MedianFinder` class:
- `MedianFinder()` initializes the `MedianFinder` object.
- `void addNum(int num)` adds the integer `num` from the data stream to the data structure.
- `double findMedian()` returns the median of all elements so far.


**Example 2:**
```text
Input: addNum(1), addNum(2), findMedian(), addNum(3), findMedian()
Output: null, null, 1.5, null, 2.0
```

**Example 3: (Edge Case - Negative numbers)**
```text
Input: addNum(-1), addNum(-2), findMedian(), addNum(-3), findMedian()
Output: null, null, -1.5, null, -2.0
```

---

### Intuition

To efficiently find the median in a continuous stream of numbers, we can divide the data into two halves. A Max-Heap stores the smaller half of the numbers, and a Min-Heap stores the larger half. We keep the heaps balanced so that their sizes differ by at most 1. The median will then either be the root of the larger heap, or the average of the roots of both heaps.

---

### Code

```cpp
class MedianFinder {
public:
    priority_queue<int> left_max_heap; // Max heap for the smaller half
    priority_queue<int, vector<int>, greater<int>> right_min_heap; // Min heap for the larger half

    MedianFinder() {}
    
    void addNum(int num) {
        if(left_max_heap.empty() || num < left_max_heap.top()) {
            left_max_heap.push(num);
        } else {
            right_min_heap.push(num);
        }
        
        // Always maintain left_max_heap size one greater than right_min_heap size,
        // or their sizes should be equal.
        if(abs((int)left_max_heap.size() - (int)right_min_heap.size()) > 1) {
            right_min_heap.push(left_max_heap.top());
            left_max_heap.pop();
        } else if(left_max_heap.size() < right_min_heap.size()) {
            left_max_heap.push(right_min_heap.top());
            right_min_heap.pop();
        }
    }
    
    double findMedian() {
        if(left_max_heap.size() == right_min_heap.size()) {
            // Meaning we have an even number of elements
            return (double)(left_max_heap.top() + right_min_heap.top()) / 2.0;
        }
        
        // Otherwise, we have an odd number of elements
        return left_max_heap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(log N)` for `addNum` because we perform insertion on heaps. `O(1)` for `findMedian` as we just fetch the top elements from the heaps.
- **Space Complexity:** `O(N)` since the heaps collectively store all the numbers coming from the data stream.
