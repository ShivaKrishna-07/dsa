---
title: "Sum of Subarray Ranges"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack"]
---

### Problem Statement

Return the sum of `maximum - minimum` over every subarray.

### Examples

- **Input:** `nums = [1, 2, 3]` **Output:** `4`
- **Input:** `nums = [1, 3, 3]` **Output:** `4`

### Constraints

- `1 <= nums.length <= 10^4`
- `-10^9 <= nums[i] <= 10^9`

### Intuition

Compute the contribution of every element as a maximum and as a minimum, then subtract the two totals.

### Code

```cpp
long long sumOfSubarrayRanges(vector<int>& nums) {
    int n = nums.size(); long long answer = 0; stack<int> st;
    for (int pass = 0; pass < 2; ++pass) {
        while (!st.empty()) st.pop();
        for (int i = 0; i <= n; ++i) {
            while (!st.empty() && (i == n || (pass == 0 ? nums[st.top()] <= nums[i] : nums[st.top()] >= nums[i]))) {
                int mid = st.top(); st.pop(); int left = st.empty() ? -1 : st.top();
                answer += (pass == 0 ? 1LL : -1LL) * nums[mid] * (mid - left) * (i - mid);
            }
            if (i < n) st.push(i);
        }
    }
    return answer;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because each element contributes once as a maximum and once as a minimum.
- **Space Complexity:** `O(N)` for the monotonic stack.
