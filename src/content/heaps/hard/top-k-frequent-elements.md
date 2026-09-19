---
title: "Top K Frequent Elements"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Top+K+Frequent+Elements+leetcode+347"
time: "O(N log K)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/top-k-frequent-elements/"
  gfg: "https://practice.geeksforgeeks.org/problems/top-k-frequent-elements-in-array/1"
---

### Problem Statement

Given an integer array `nums` and an integer `k`, return the `k` **most frequent elements**. You may return the answer in **any order**.

**Example 1:**
```text
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Explanation: 1 appears three times and 2 appears twice. The top 2 frequent elements are 1 and 2.
```

**Example 2:**
```text
Input: nums = [1], k = 1
Output: [1]
Explanation: The only element is 1, so it is the most frequent.
```

**Example 3: (Edge Case - Negative numbers with same frequency)**
```text
Input: nums = [-1,-1,2,2,3], k = 2
Output: [-1,2]
Explanation: -1 and 2 both appear twice, which is more than 3.
```

---

### Intuition

First, we need to count the frequency of each element using a hash map. Then, to find the `k` most frequent elements, we can use a Min-Heap of size `k`. We push the frequencies (along with their elements) into the heap. If the heap size exceeds `k`, we pop the smallest frequency. By the end, the heap will have discarded all elements except exactly the `k` elements with the highest frequencies.

---

### Code

```cpp
class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        // Count frequencies of each element
        unordered_map<int, int> counts;
        for (int num : nums) {
            counts[num]++;
        }
        
        // Min-heap to store the top k frequent elements. 
        // We store pairs of (frequency, element).
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> minHeap;
        
        for (auto& pair : counts) {
            minHeap.push({pair.second, pair.first});
            
            // If the heap size exceeds k, pop the element with the lowest frequency
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }
        
        vector<int> res;
        
        // Extract the top k elements from the heap
        while (!minHeap.empty()) {
            res.push_back(minHeap.top().second);
            minHeap.pop();
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log K)` where `N` is the number of elements in the array. Building the frequency map takes `O(N)`. Iterating over the map and pushing to a heap of size `K` takes `O(N log K)`.
- **Space Complexity:** `O(N)` for the frequency map in the worst case (all unique elements). The heap takes `O(K)` space. Total space is `O(N)`.
