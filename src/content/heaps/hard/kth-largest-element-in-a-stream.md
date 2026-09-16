---
title: "Kth Largest Element in a Stream"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Kth+Largest+Element+in+a+Stream+leetcode+703"
time: "O(log K)"
space: "O(K)"
platforms:
  leetcode: "https://leetcode.com/problems/kth-largest-element-in-a-stream/"
---

### Problem Statement

Design a class to find the `kth` largest element in a stream. Note that it is the `kth` largest element in the sorted order, not the `kth` distinct element.

Implement `KthLargest` class:
- `KthLargest(int k, int[] nums)` Initializes the object with the integer `k` and the stream of integers `nums`.
- `int add(int val)` Appends the integer `val` to the stream and returns the element representing the `kth` largest element in the stream.

**Example 1:**
```text
Input
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output
[null, 4, 5, 5, 8, 8]
```


**Example 2:**
```text
Input: KthLargest(1, []), add(3), add(5)
Output: 3, 5
```

**Example 3: (Edge Case - Duplicates in stream)**
```text
Input: KthLargest(2, [1, 1]), add(1)
Output: 1
Explanation: With stream [1, 1, 1], the 2nd largest is 1.
```

---

### Code

```cpp
class KthLargest {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    int k;
public:
    KthLargest(int k, vector<int>& nums) {
        this->k = k;
        for (int num : nums) {
            add(num);
        }
    }
    
    int add(int val) {
        minHeap.push(val);
        if (minHeap.size() > k) {
            minHeap.pop();
        }
        return minHeap.top();
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` for initialization where `N` is the size of the initial array. For each `add` operation, it takes `O(log K)` time to push and pop from the min-heap.
- **Space Complexity:** `O(K)` as the min-heap stores at most `k` elements at any time.
