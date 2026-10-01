---
title: "Next Smaller Element"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Next+Smaller+Element"
time: "O(N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/help-classmates--141631/1"
---

### Problem Statement

Given an array `arr` of size `N`, find the **Next Smaller Element** for every element. 
The Next Smaller Element for an element `x` is the first smaller element on the right side of `x` in the array. Elements for which no smaller element exist, consider the next smaller element as `-1`.

**Example 1:**
```text
Input: arr = [3, 8, 5, 2, 25]
Output: [2, 5, 2, -1, -1]
Explanation: 
- 3's next smaller is 2.
- 8's next smaller is 5.
- 5's next smaller is 2.
- 2 and 25 have no smaller element to their right.
```

**Example 2:**
```text
Input: arr = [4, 8, 5, 2, 25]
Output: [2, 5, 2, -1, -1]
```

**Example 3: (Edge Case - Increasing array)**
```text
Input: arr = [1, 2, 3, 4]
Output: [-1, -1, -1, -1]
```

---

### Intuition

Just like the Next Greater Element, we can use a **Monotonic Stack**. However, since we want the *smaller* element, our stack needs to be strictly increasing from bottom to top. As we traverse from right to left, we pop any elements from the stack that are *greater than or equal* to the current element. The top of the stack will then perfectly represent the first strictly smaller element to the right!

---

### Code

```cpp
class Solution {
public:
    vector<int> help_classmate(vector<int> arr, int n) {
        vector<int> ans(n, -1);
        stack<int> st;
        
        // Traverse from right to left
        for (int i = n - 1; i >= 0; i--) {
            int curr = arr[i];
            
            // Pop elements that are GREATER than or EQUAL to current element
            while (!st.empty() && st.top() >= curr) {
                st.pop();
            }
            
            // If stack is not empty, top is the next smaller element
            if (!st.empty()) {
                ans[i] = st.top();
            }
            
            // Push current element to stack
            st.push(curr);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` because we iterate through the array once, and each element is pushed and popped at most once.
- **Space Complexity:** `O(N)` to store elements in the monotonic stack.
