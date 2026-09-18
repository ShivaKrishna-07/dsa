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

### Code

```cpp
class MedianFinder {
    priority_queue<int> maxHeap; // Stores the smaller half of the numbers
    priority_queue<int, vector<int>, greater<int>> minHeap; // Stores the larger half
    
public:
    MedianFinder() {
        
    }
    
    void addNum(int num) {
        maxHeap.push(num);
        
        // Step 1: Ensure every element in maxHeap is <= elements in minHeap
        minHeap.push(maxHeap.top());
        maxHeap.pop();
        
        // Step 2: Balance heaps so maxHeap always has equal or 1 more element than minHeap
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.push(minHeap.top());
            minHeap.pop();
        }
    }
    
    double findMedian() {
        // If maxHeap is larger, total elements is odd; root of maxHeap is the median
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.top();
        } else {
            // Even elements; median is average of the two roots
            return (maxHeap.top() + minHeap.top()) / 2.0;
        }
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(log N)` for `addNum` because we perform insertion on heaps. `O(1)` for `findMedian` as we just fetch the top elements from the heaps.
- **Space Complexity:** `O(N)` since the heaps collectively store all the numbers coming from the data stream.
