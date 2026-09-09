---
title: "Sum of All Subsets"
difficulty: "Easy"
youtube: "https://www.youtube.com/results?search_query=take+U+forward+Subset+Sums"
time: "O(2^N)"
space: "O(N)"
platforms:
  gfg: "https://www.geeksforgeeks.org/problems/subset-sums2234/1"
  article: "https://takeuforward.org/data-structure/subset-sum-sum-of-all-subsets/"
---

### Problem Statement

Given a list `arr` of `n` integers, print sums of all subsets in it. Return the sums in any order.

**Example 1:**
```text
Input:
n = 2
arr[] = {2, 3}
Output:
0 2 3 5
Explanation:
When no elements is taken then Sum = 0.
When only 2 is taken then Sum = 2.
When only 3 is taken then Sum = 3.
When element 2 and 3 are taken then Sum = 2+3 = 5.
```

**Example 2:**
```text
Input:
n = 3
arr = {5, 2, 1}
Output:
0 1 2 3 5 6 7 8
```

**Constraints:**
- 1 <= n <= 15
- 0 <= arr[i] <= 1000

---

### Code

```cpp
class Solution {
  public:
  
    void helper(int i, int sum, vector<int> &arr, vector<int> &ans){
        // Base case: reached end of array
        if(i == arr.size()){
            ans.push_back(sum);
            return;
        }
        
        // Choice 1: Include the element's value in sum
        helper(i+1, sum+arr[i], arr, ans);
        
        // Choice 2: Exclude the element
        helper(i+1, sum, arr, ans);
    }
  
    vector<int> subsetSums(vector<int> arr, int n) {
        // Write Your Code here
        vector<int>ans;
        
        helper(0, 0, arr, ans);
        
        return ans;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** O(2^N): Exactly 2^N recursive calls to either include or exclude each element.
- **Space Complexity:** O(N): Auxiliary space for recursion depth.
