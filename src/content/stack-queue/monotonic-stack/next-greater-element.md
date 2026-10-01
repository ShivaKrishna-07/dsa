---
title: "Next Greater Element I"
difficulty: "Easy"
time: "O(N + M)"
space: "O(N)"
platforms:
  youtube: "https://www.youtube.com/results?search_query=Next+Greater+Element+leetcode+496"
  leetcode: "https://leetcode.com/problems/next-greater-element-i/"
  gfg: "https://practice.geeksforgeeks.org/problems/next-larger-element-1587115620/1"
---

### Problem Statement

The **next greater element** of some element `x` in an array is the **first greater** element that is to the right of `x` in the same array.

You are given two distinct 0-indexed integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.
For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the **next greater element** of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.

Return an array `ans` of length `nums1.length` such that `ans[i]` is the next greater element as described above.

**Example 1:**
```text
Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: 
- For 4 in nums1, there is no greater element to its right in nums2. (-1)
- For 1 in nums1, the next greater element to its right in nums2 is 3.
- For 2 in nums1, there is no greater element to its right in nums2. (-1)
```

**Example 2:**
```text
Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
```

**Example 3: (Edge Case - Decreasing array)**
```text
Input: nums1 = [5,4,3], nums2 = [5,4,3,2,1]
Output: [-1,-1,-1]
```

---

### Intuition

We can use a **Monotonic Stack** to efficiently find the next greater element for every item in `nums2`. We traverse `nums2` from **right to left**. We maintain a stack of elements such that the stack is strictly decreasing from bottom to top. 
For each element, we pop items from the stack that are smaller than it, because those items can never be the "next greater" for anything to the left. The top of the stack is then our next greater element! We store this mapping in a hash map for `O(1)` lookups for `nums1`.

---

### Code

```cpp
class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nextGreater;
        stack<int> st;
        
        // Traverse nums2 from right to left
        for (int i = nums2.size() - 1; i >= 0; i--) {
            int curr = nums2[i];
            
            // Pop elements that are smaller than or equal to current element
            while (!st.empty() && st.top() <= curr) {
                st.pop();
            }
            
            // If stack is empty, no greater element exists
            if (st.empty()) {
                nextGreater[curr] = -1;
            } else {
                // Top element is the next greater element
                nextGreater[curr] = st.top();
            }
            
            // Push current element to stack for future elements
            st.push(curr);
        }
        
        vector<int> ans;
        // Build the result for nums1
        for (int num : nums1) {
            ans.push_back(nextGreater[num]);
        }
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N + M)` where `N` is the length of `nums2` and `M` is the length of `nums1`. Each element is pushed and popped from the stack at most once in the loop, making it `O(N)`. The final loop takes `O(M)`.
- **Space Complexity:** `O(N)` for the stack and the hash map.
