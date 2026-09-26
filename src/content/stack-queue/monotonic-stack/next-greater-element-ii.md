---
title: "Next Greater Element II"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack", "Circular Array"]
---

### Problem Statement

Find the next greater element for every position in a circular array.

### Examples

- **Input:** `nums = [1, 2, 1]` **Output:** `[2, -1, 2]`
- **Input:** `nums = [5, 4, 3]` **Output:** `[-1, 5, 5]`

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

### Intuition

Traverse two copies of the array while retaining only indices from the first copy.

### Code

```cpp
vector<int> nextGreaterElements(vector<int>& nums) {
    int n = nums.size(); vector<int> answer(n, -1); stack<int> st;
    for (int i = 2 * n - 1; i >= 0; --i) {
        while (!st.empty() && st.top() <= nums[i % n]) st.pop();
        if (i < n && !st.empty()) answer[i] = st.top();
        st.push(nums[i % n]);
    }
    return answer;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` amortized across the two passes.
- **Space Complexity:** `O(N)` for the stack and answer.
