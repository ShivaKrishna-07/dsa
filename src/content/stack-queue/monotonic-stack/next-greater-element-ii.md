---
title: "Next Greater Element II"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Next+Greater+Element+II+leetcode+503"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/next-greater-element-ii/"
---

### Problem Statement

Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return the **next greater element** for every element in `nums`.

The **next greater element** of a number `x` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return `-1` for this number.

**Example 1:**
```text
Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: 
The first 1's next greater is 2. 
2 has no next greater. 
The second 1's next greater is 2 (searching circularly).
```

**Example 2:**
```text
Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]
```

**Example 3: (Edge Case - All elements same)**
```text
Input: nums = [1,1,1]
Output: [-1,-1,-1]
```

---

### Intuition

Since the array is circular, we can just imagine the array is duplicated and glued to itself (e.g., `[1, 2, 1, 1, 2, 1]`). Instead of actually duplicating the array, we can simply run our loop for `2 * N` times, using the modulo operator `i % N` to wrap around the indices. We use the same Monotonic Stack approach (traversing from right to left) to find the next greater elements!

---

### Code

```cpp
class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> ans(n, -1);
        stack<int> st;
        
        // Loop 2*N times to simulate circular array
        for (int i = 2 * n - 1; i >= 0; i--) {
            int curr = nums[i % n]; // Modulo to wrap around
            
            // Pop smaller or equal elements
            while (!st.empty() && st.top() <= curr) {
                st.pop();
            }
            
            // We only need to store the result for the first pass (i < n)
            if (i < n) {
                if (!st.empty()) {
                    ans[i] = st.top();
                }
            }
            
            // Push current element
            st.push(curr);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the size of the array. The loop runs `2N` times, and each element is pushed and popped at most once.
- **Space Complexity:** `O(N)` for the stack.
