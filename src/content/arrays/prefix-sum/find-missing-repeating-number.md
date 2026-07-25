---
title: "Missing and Repeating Number"
difficulty: "Medium"
time: "O(N)"
space: "O(1)"
platforms:
  gfg: "https://www.geeksforgeeks.org/find-a-repeating-and-a-missing-number/"
  article: "https://takeuforward.org/data-structure/find-the-repeating-and-missing-numbers/"
tags:
  - "Arrays"
  - "Math"
  - "Prefix Sum"
---

### Problem Statement

An array contains numbers from 1 to N, but one number is missing and one number appears twice. Find both numbers.

### Examples

```text
Input: nums = [3,1,2,5,3]
Output: repeating = 3, missing = 4
```

### Intuition

Compare the actual sum and square sum with the expected values from 1 to N.

### Approach

Let x be repeating and y be missing. From sum difference and square-sum difference, derive x - y and x + y, then solve.

### Code

```cpp
vector<int> findMissingRepeatingNumbers(vector<int> nums) {
    long long n = nums.size();
    long long expectedSum = n * (n + 1) / 2;
    long long expectedSq = n * (n + 1) * (2 * n + 1) / 6;
    long long actualSum = 0, actualSq = 0;
    for (long long x : nums) {
        actualSum += x;
        actualSq += x * x;
    }
    long long diff = actualSum - expectedSum;
    long long sqDiff = actualSq - expectedSq;
    long long sum = sqDiff / diff;
    int repeating = (diff + sum) / 2;
    int missing = repeating - diff;
    return {repeating, missing};
}
```
