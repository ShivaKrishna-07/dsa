---
title: "Next Greater Element"
difficulty: "Easy"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack"]
---

### Problem Statement

For every element, find the first greater element to its right, or `-1` if none exists.

### Examples

- **Input:** `nums = [2, 1, 3]` **Output:** `[3, 3, -1]`
- **Input:** `nums = [4, 3, 2]` **Output:** `[-1, -1, -1]`

### Constraints

- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

### Intuition

Scan from right to left and remove values that cannot be the answer for the current element.

### Code

```cpp
vector<int> nextGreater(vector<int>& nums) {
    stack<int> st; vector<int> answer(nums.size());
    for (int i = nums.size() - 1; i >= 0; --i) {
        while (!st.empty() && st.top() <= nums[i]) st.pop();
        answer[i] = st.empty() ? -1 : st.top();
        st.push(nums[i]);
    }
    return answer;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` amortized because each element enters and leaves the stack once.
- **Space Complexity:** `O(N)` for the monotonic stack and answer.
