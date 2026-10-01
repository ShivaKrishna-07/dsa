---
title: "Sum of Subarray Minimums"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Sum+of+Subarray+Minimums+leetcode+907"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/sum-of-subarray-minimums/"
---

### Problem Statement

Given an array of integers `arr`, find the sum of `min(b)`, where `b` ranges over every (contiguous) subarray of `arr`. Since the answer may be large, return the answer **modulo** `10^9 + 7`.

**Example 1:**
```text
Input: arr = [3,1,2,4]
Output: 17
Explanation: 
Subarrays are [3], [1], [2], [4], [3,1], [1,2], [2,4], [3,1,2], [1,2,4], [3,1,2,4]. 
Minimums are 3, 1, 2, 4, 1, 1, 2, 1, 1, 1.
Sum is 17.
```

**Example 2:**
```text
Input: arr = [11,81,94,43,3]
Output: 444
```

**Example 3: (Edge Case - Same elements)**
```text
Input: arr = [2,2,2]
Output: 12
Explanation: Minimum is 2 for all 6 subarrays. 6 * 2 = 12.
```

---

### Intuition

Instead of finding the minimum of every subarray (which is `O(N^2)`), we can ask: **How many subarrays is `arr[i]` the minimum of?**
If we find the Next Smaller Element on the Left (NSL) and the Next Smaller Element on the Right (NSR) for `arr[i]`, we know that `arr[i]` is the absolute minimum in that specific window. 
The number of subarrays where `arr[i]` is the minimum is exactly `(i - NSL) * (NSR - i)`. We calculate this contribution for every element using monotonic stacks!

---

### Code

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size();
        int mod = 1e9 + 7;
        
        // NSL (Next Smaller on Left) and NSR (Next Smaller on Right)
        vector<int> left(n), right(n);
        stack<int> st;
        
        // Find NSL
        for (int i = 0; i < n; i++) {
            // Notice >= here to handle duplicates safely without overcounting
            while (!st.empty() && arr[st.top()] >= arr[i]) {
                st.pop();
            }
            left[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }
        
        // Clear stack for NSR
        while (!st.empty()) st.pop();
        
        // Find NSR
        for (int i = n - 1; i >= 0; i--) {
            // Strictly > to prevent double counting duplicates
            while (!st.empty() && arr[st.top()] > arr[i]) {
                st.pop();
            }
            right[i] = st.empty() ? n : st.top();
            st.push(i);
        }
        
        long long totalSum = 0;
        
        // Calculate contribution of each element
        for (int i = 0; i < n; i++) {
            long long leftCount = i - left[i];
            long long rightCount = right[i] - i;
            
            // Total subarrays where arr[i] is minimum
            long long totalSubarrays = (leftCount * rightCount) % mod;
            long long contribution = (arr[i] * totalSubarrays) % mod;
            
            totalSum = (totalSum + contribution) % mod;
        }
        
        return totalSum;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)`. We do a constant number of passes over the array. The stack operations take `O(N)` overall.
- **Space Complexity:** `O(N)` for the `left` array, `right` array, and the stack.
