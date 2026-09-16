---
title: "Candy"
difficulty: "Hard"
youtube: "https://www.youtube.com/results?search_query=Candy+leetcode+135"
time: "O(N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/candy/"
---

### Problem Statement

There are `n` children standing in a line. Each child is assigned a rating value given in the integer array `ratings`.

You are giving candies to these children subjected to the following requirements:
- Each child must have at least one candy.
- Children with a higher rating get more candies than their neighbors.

Return the minimum number of candies you need to have to distribute the candies to the children.

**Example 1:**
```text
Input: ratings = [1,0,2]
Output: 5
Explanation: You can allocate to the first, second and third child with 2, 1, 2 candies respectively.
```


**Example 2:**
```text
Input: ratings = [1,2,2]
Output: 4
Explanation: You can allocate to the first, second and third child with 1, 2, 1 candies respectively.
```

**Example 3: (Edge Case - All same ratings)**
```text
Input: ratings = [2,2,2,2]
Output: 4
Explanation: All children have the same rating, so each gets exactly 1 candy.
```

---

### Code

```cpp
class Solution {
public:
    int candy(vector<int>& ratings) {
        int n = ratings.size();
        vector<int> candies(n, 1);
        
        // Left to right
        for(int i = 1; i < n; i++) {
            if(ratings[i] > ratings[i-1]) {
                candies[i] = candies[i-1] + 1;
            }
        }
        
        // Right to left
        for(int i = n - 2; i >= 0; i--) {
            if(ratings[i] > ratings[i+1]) {
                candies[i] = max(candies[i], candies[i+1] + 1);
            }
        }
        
        int totalCandies = 0;
        for(int c : candies) {
            totalCandies += c;
        }
        
        return totalCandies;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N)` since we iterate over the `ratings` array twice.
- **Space Complexity:** `O(N)` to store the `candies` assigned to each child.
