---
title: "Merge Intervals"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Merge+Intervals+leetcode+56"
time: "O(N log N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/merge-intervals/"
---

### Problem Statement

Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

**Example 1:**
```text
Input: intervals = [[1,3],[2,6],[8,10],[15,18]]
Output: [[1,6],[8,10],[15,18]]
Explanation: Since intervals [1,3] and [2,6] overlap, merge them into [1,6].
```


**Example 2:**
```text
Input: intervals = [[1,4],[4,5]]
Output: [[1,5]]
Explanation: Intervals [1,4] and [4,5] are considered overlapping.
```

**Example 3: (Edge Case - Single interval)**
```text
Input: intervals = [[1,5]]
Output: [[1,5]]
Explanation: Only one interval provided, nothing to merge.
```

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        if(intervals.empty()) return {};
        
        sort(intervals.begin(), intervals.end());
        vector<vector<int>> merged;
        
        merged.push_back(intervals[0]);
        
        for(int i = 1; i < intervals.size(); i++) {
            if(merged.back()[1] >= intervals[i][0]) {
                merged.back()[1] = max(merged.back()[1], intervals[i][1]);
            } else {
                merged.push_back(intervals[i]);
            }
        }
        
        return merged;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` because of the sort operation on the intervals. The merging pass takes `O(N)`.
- **Space Complexity:** `O(N)` for storing the output list of merged intervals. In-place modification could reduce this, but sorting may still take `O(log N)` auxiliary space.
