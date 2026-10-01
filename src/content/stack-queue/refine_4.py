import os
import re

content_map = {
    "next-greater-element.md": """---
title: "Next Greater Element I"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=Next+Greater+Element+leetcode+496"
time: "O(N + M)"
space: "O(N)"
platforms:
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
""",

    "next-greater-element-ii.md": """---
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
""",

    "next-smaller-element.md": """---
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
""",

    "asteroid-collision.md": """---
title: "Asteroid Collision"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Asteroid+Collision+leetcode+735"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/asteroid-collision/"
---

### Problem Statement

We are given an array `asteroids` of integers representing asteroids in a row.

For each asteroid, the absolute value represents its size, and the sign represents its direction (positive meaning right, negative meaning left). Each asteroid moves at the same speed.

Find out the state of the asteroids after all collisions. If two asteroids meet, the smaller one will explode. If both are the same size, both will explode. Two asteroids moving in the same direction will never meet.

**Example 1:**
```text
Input: asteroids = [5,10,-5]
Output: [5,10]
Explanation: The 10 and -5 collide resulting in 10. The 5 and 10 never collide.
```

**Example 2:**
```text
Input: asteroids = [8,-8]
Output: []
Explanation: The 8 and -8 collide exploding each other.
```

**Example 3: (Edge Case - Left moving asteroids first)**
```text
Input: asteroids = [-2,-1,1,2]
Output: [-2,-1,1,2]
Explanation: The negative asteroids move left and positive move right. They never meet.
```

---

### Intuition

A collision only happens when a Right-moving asteroid (positive) is followed by a Left-moving asteroid (negative). This screams Stack! 
We iterate through the asteroids and push them to the stack. If we encounter a left-moving asteroid (`< 0`) and the top of the stack is a right-moving asteroid (`> 0`), a collision occurs. We loop and pop from the stack as long as the stack's top is smaller. If they are equal, we pop once and both are destroyed.

---

### Code

```cpp
class Solution {
public:
    vector<int> asteroidCollision(vector<int>& asteroids) {
        vector<int> st; // We can use a vector to simulate a stack for easier return
        
        for (int a : asteroids) {
            bool destroyed = false;
            
            // Collision happens ONLY when stack top is positive (Right) and current is negative (Left)
            while (!st.empty() && st.back() > 0 && a < 0) {
                // If top is smaller, it gets destroyed. We continue checking.
                if (st.back() < abs(a)) {
                    st.pop_back();
                    continue;
                }
                // If they are equal, both are destroyed.
                else if (st.back() == abs(a)) {
                    st.pop_back();
                }
                
                // If top is larger, current asteroid is destroyed.
                destroyed = true;
                break;
            }
            
            // If the current asteroid survived, push it
            if (!destroyed) {
                st.push_back(a);
            }
        }
        
        return st;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the number of asteroids. Each asteroid is pushed to and popped from the stack at most once.
- **Space Complexity:** `O(N)` for the stack holding the surviving asteroids.
""",

    "sum-of-subarray-minimums.md": """---
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
""",

    "sum-of-subarray-ranges.md": """---
title: "Sum of Subarray Ranges"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Sum+of+Subarray+Ranges+leetcode+2104"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/sum-of-subarray-ranges/"
---

### Problem Statement

You are given an integer array `nums`. The range of a subarray of `nums` is the difference between the largest and smallest element in the subarray.

Return the sum of all subarray ranges of `nums`.

**Example 1:**
```text
Input: nums = [1,2,3]
Output: 4
Explanation: 
Ranges:
[1]: 1-1 = 0
[2]: 2-2 = 0
[3]: 3-3 = 0
[1,2]: 2-1 = 1
[2,3]: 3-2 = 1
[1,2,3]: 3-1 = 2
Sum: 0 + 0 + 0 + 1 + 1 + 2 = 4
```

**Example 2:**
```text
Input: nums = [1,3,3]
Output: 4
```

**Example 3: (Edge Case - Decreasing)**
```text
Input: nums = [4,-2,-3,4,1]
Output: 59
```

---

### Intuition

The sum of all subarray ranges is mathematically equivalent to: 
`Sum(Max of all subarrays) - Sum(Min of all subarrays)`.
This is amazing because we already know how to solve "Sum of Subarray Minimums" in `O(N)` time using a monotonic stack! We can just apply the exact same logic twice: once with a monotonically increasing stack to find the sum of minimums, and once with a monotonically decreasing stack to find the sum of maximums.

---

### Code

```cpp
class Solution {
public:
    long long subArrayRanges(vector<int>& nums) {
        int n = nums.size();
        long long sumMins = 0, sumMaxs = 0;
        
        // Pass 1: Sum of Subarray Minimums
        vector<int> leftMin(n), rightMin(n);
        stack<int> stMin;
        for (int i = 0; i < n; i++) {
            while (!stMin.empty() && nums[stMin.top()] >= nums[i]) stMin.pop();
            leftMin[i] = stMin.empty() ? -1 : stMin.top();
            stMin.push(i);
        }
        while (!stMin.empty()) stMin.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!stMin.empty() && nums[stMin.top()] > nums[i]) stMin.pop();
            rightMin[i] = stMin.empty() ? n : stMin.top();
            stMin.push(i);
        }
        
        // Pass 2: Sum of Subarray Maximums
        vector<int> leftMax(n), rightMax(n);
        stack<int> stMax;
        for (int i = 0; i < n; i++) {
            while (!stMax.empty() && nums[stMax.top()] <= nums[i]) stMax.pop();
            leftMax[i] = stMax.empty() ? -1 : stMax.top();
            stMax.push(i);
        }
        while (!stMax.empty()) stMax.pop();
        for (int i = n - 1; i >= 0; i--) {
            while (!stMax.empty() && nums[stMax.top()] < nums[i]) stMax.pop();
            rightMax[i] = stMax.empty() ? n : stMax.top();
            stMax.push(i);
        }
        
        // Calculate the result
        for (int i = 0; i < n; i++) {
            long long minContrib = (long long)(i - leftMin[i]) * (rightMin[i] - i) * nums[i];
            long long maxContrib = (long long)(i - leftMax[i]) * (rightMax[i] - i) * nums[i];
            
            sumMins += minContrib;
            sumMaxs += maxContrib;
        }
        
        return sumMaxs - sumMins;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate over the array a constant number of times with our monotonic stacks.
- **Space Complexity:** `O(N)` for the stacks and arrays tracking left/right boundaries.
""",

    "remove-k-digits.md": """---
title: "Remove K Digits"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Remove+K+Digits+leetcode+402"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/remove-k-digits/"
---

### Problem Statement

Given string `num` representing a non-negative integer `num`, and an integer `k`, return the smallest possible integer after removing `k` digits from `num`.

**Example 1:**
```text
Input: num = "1432219", k = 3
Output: "1219"
Explanation: Remove the three digits 4, 3, and 2 to form the new number 1219 which is the smallest.
```

**Example 2:**
```text
Input: num = "10200", k = 1
Output: "200"
Explanation: Remove the leading 1 and the number is 200. Note that the output must not contain leading zeroes.
```

**Example 3: (Edge Case - Remove all)**
```text
Input: num = "10", k = 2
Output: "0"
Explanation: Remove all the digits from the number and it is left with nothing which is 0.
```

---

### Intuition

To make the resulting number as small as possible, we should prioritize removing larger digits that appear earlier (at higher decimal places). 
We can use a **Monotonic Stack**. As we iterate through the digits from left to right, if the current digit is smaller than the top of our stack, popping the top digit guarantees a smaller resulting number! We do this until we've removed `k` digits. Finally, we handle edge cases like remaining `k` (e.g., for increasing strings like "1234"), and strip leading zeros.

---

### Code

```cpp
class Solution {
public:
    string removeKdigits(string num, int k) {
        string ans = ""; // Using string as a stack
        
        for (char c : num) {
            // While current digit is smaller than the last recorded digit, pop it!
            while (ans.length() > 0 && ans.back() > c && k > 0) {
                ans.pop_back();
                k--;
            }
            
            // Prevent pushing leading zeros
            if (ans.length() > 0 || c != '0') {
                ans.push_back(c);
            }
        }
        
        // If we still need to remove digits (e.g., number was like "1234")
        while (ans.length() > 0 && k > 0) {
            ans.pop_back();
            k--;
        }
        
        // If string is empty, the smallest number is "0"
        if (ans == "") return "0";
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` where `N` is the length of `num`. Every digit is pushed and popped at most once.
- **Space Complexity:** `O(N)` to store the result (which acts as our stack).
"""
}

base_dir = r"d:\shiva\dsa\src\content\stack-queue"
for root, dirs, files in os.walk(base_dir):
    for file in files:
        if file in content_map:
            filepath = os.path.join(root, file)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content_map[file])
            print(f"Updated {file}")
