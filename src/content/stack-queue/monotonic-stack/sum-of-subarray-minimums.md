---
title: "Sum of Subarray Minimums"
difficulty: "Medium"
time: "O(N)"
space: "O(N)"
tags: ["Monotonic Stack"]
---

### Problem Statement

Return the sum of the minimum value of every subarray.

### Examples

- **Input:** `arr = [3, 1, 2, 4]` **Output:** `17`
- **Input:** `arr = [11, 81, 94, 43, 3]` **Output:** `444`

### Constraints

- `1 <= arr.length <= 3 * 10^4`
- `1 <= arr[i] <= 3 * 10^4`
- Return the result modulo `10^9 + 7`.

### Intuition

Count how many subarrays use each element as their minimum using previous-less and next-less-or-equal boundaries.

### Code

```cpp
int sumSubarrayMins(vector<int>& nums) {
    const long long mod = 1e9 + 7; int n = nums.size();
    vector<int> left(n), right(n); stack<int> st;
    for (int i = 0; i < n; ++i) { while (!st.empty() && nums[st.top()] > nums[i]) st.pop(); left[i] = st.empty() ? -1 : st.top(); st.push(i); }
    while (!st.empty()) st.pop();
    for (int i = n - 1; i >= 0; --i) { while (!st.empty() && nums[st.top()] >= nums[i]) st.pop(); right[i] = st.empty() ? n : st.top(); st.push(i); }
    long long answer = 0;
    for (int i = 0; i < n; ++i) answer = (answer + 1LL * nums[i] * (i - left[i]) * (right[i] - i)) % mod;
    return answer;
}
```

### Complexity Analysis

- **Time Complexity:** `O(N)` because each element's nearest boundaries are found with monotonic scans.
- **Space Complexity:** `O(N)` for boundary arrays and the stack.
