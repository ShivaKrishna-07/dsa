---
title: "Next Smaller Element"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack"]
---

### Problem Statement

For every element, find the first smaller element to its right, or `-1` if none exists.

### Examples

- **Input:** `nums = [4, 8, 5, 2, 25]` **Output:** `[2, 5, 2, -1, -1]`
- **Input:** `nums = [1, 2, 3]` **Output:** `[-1, -1, -1]`

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

### Intuition

Maintain an increasing stack from right to left and discard values that are not smaller than the current value.

### Code

```cpp
vector<int> nextSmaller(vector<int>& nums) {
    stack<int> st; vector<int> answer(nums.size());
    for (int i = nums.size() - 1; i >= 0; --i) {
        while (!st.empty() && st.top() >= nums[i]) st.pop();
        answer[i] = st.empty() ? -1 : st.top();
        st.push(nums[i]);
    }
    return answer;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` amortized because every value is pushed and popped at most once.
- **Space Complexity:** `O(N)` for the increasing stack and answer.
