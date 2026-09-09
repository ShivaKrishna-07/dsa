---
title: "Permutations II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Permutations+II"
time: "O(N! * N)"
space: "O(N^2)"
platforms:
  leetcode: "https://leetcode.com/problems/permutations-ii/"
---

### Problem Statement

Given a collection of numbers, `nums`, that might contain duplicates, return all possible unique permutations in **any order**.

**Example 1:**
```text
Input: nums = [1,1,2]
Output: [[1,1,2], [1,2,1], [2,1,1]]
```

**Example 2:**
```text
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

**Constraints:**
- 1 <= nums.length <= 8
- -10 <= nums[i] <= 10

---

### Code

```cpp
class Solution {
public:
    void recursion(vector<int> num, int i, int j, vector<vector<int> > &res) {
        // Base case: reached the end
        if (i == j-1) {
            res.push_back(num);
            return;
        }
        for (int k = i; k < j; k++) {
            // Skip duplicates to avoid duplicate permutations
            if (i != k && num[i] == num[k]) continue;
            swap(num[i], num[k]);
            recursion(num, i+1, j, res);
            // No backtrack swap needed because `num` is passed by value
        }
    }
    vector<vector<int> > permuteUnique(vector<int> &num) {
        sort(num.begin(), num.end());
        vector<vector<int> >res;
        recursion(num, 0, num.size(), res);
        return res;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(N! * N): N! permutations. `num` is passed by value, taking O(N) time to copy per recursive node.
- **Space Complexity:** O(N^2): Auxiliary space. Vector `num` is copied at every level, with max depth N.
