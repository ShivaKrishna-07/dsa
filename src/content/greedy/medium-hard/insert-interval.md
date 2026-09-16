---
title: "Insert Interval"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Insert+Interval+leetcode+57"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/insert-interval/"
---

### Problem Statement

You are given an array of non-overlapping intervals `intervals` where `intervals[i] = [starti, endi]` represent the start and the end of the `ith` interval and `intervals` is sorted in ascending order by `starti`. You are also given an interval `newInterval = [start, end]` that represents the start and end of another interval.

Insert `newInterval` into `intervals` such that `intervals` is still sorted in ascending order by `starti` and `intervals` still does not have any overlapping intervals (merge overlapping intervals if necessary).

Return `intervals` after the insertion.

**Example 1:**
```text
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]
```

---

### Code

```cpp
class Solution {
public:
    vector<vector<int>> insert(vector<vector<int>>& intervals, vector<int>& newInterval) {
        vector<vector<int>> res;
        int i = 0;
        int n = intervals.size();
        
        // Add all intervals ending before newInterval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            res.push_back(intervals[i]);
            i++;
        }
        
        // Merge all overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = min(newInterval[0], intervals[i][0]);
            newInterval[1] = max(newInterval[1], intervals[i][1]);
            i++;
        }
        res.push_back(newInterval);
        
        // Add all the rest
        while (i < n) {
            res.push_back(intervals[i]);
            i++;
        }
        
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate over the given intervals once.
- **Space Complexity:** `O(N)` to store the resulting merged intervals list.
