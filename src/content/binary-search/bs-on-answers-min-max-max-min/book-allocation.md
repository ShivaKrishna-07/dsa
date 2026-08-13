---
title: "Book Allocation"
difficulty: "Medium"
time: "O(N log(sum(arr) - min(arr)))"
space: "O(1)"
platforms:
  leetcode: ""
  gfg: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1"
  youtube: "https://www.youtube.com/watch?v=Z0hwjftStI4"
tags:
  - "Binary Search"
  - "BS on Answers (min(max) or max(min))"
---

### Problem Statement

You are given an array `arr` of integers, where `arr[i]` represents the number of pages in the `i`-th book. There are `k` students.

An allocation of books is made such that:
1. Each book is allocated to exactly one student.
2. Each student is allocated at least one book.
3. The allocation should be in contiguous blocks.

Find the allocation of books to `k` students such that the maximum number of pages allocated to any student is minimized.

If it is impossible to allocate books, return `-1`.

### Constraints

- `1 <= arr.size() <= 10^5`
- `1 <= arr[i] <= 10^5`
- `1 <= k <= 10^5`

### Examples

**Example 1:**
```text
Input: arr = [12, 34, 67, 90], k = 2
Output: 113
Explanation: The allocation can be:
- Student 1: [12, 34] (46 pages)
- Student 2: [67, 90] (157 pages)
  Max pages = 157
  
Or:
- Student 1: [12, 34, 67] (113 pages)
- Student 2: [90] (90 pages)
  Max pages = 113 (which is the minimum possible maximum)
```

**Example 2:**
```text
Input: arr = [250, 74, 159, 181, 23, 104, 242], k = 3
Output: 470
```

### Intuition

If the number of students `k` exceeds the number of books `n`, it is impossible to allocate at least one book to each student, so return `-1`.

The minimum possible answer is `min(arr)` (the user's code starts here, though physically one student must read the largest book, so `max(arr)` is the actual lower bound). The maximum possible answer is `sum(arr)` (if there is only `1` student).

Since the feasibility of allocating books decreases monotonically as the maximum pages threshold increases, we can binary search the page range `[min(arr), sum(arr)]`:
- For a candidate page limit `mid`, check if we can allocate contiguous books to students such that no student reads more than `mid` pages.
- If it is possible with at most `k` students, then `mid` is a valid threshold. We record it and try to find a smaller maximum page limit (`high = mid - 1`).
- If it is not possible, the limit is too small, so we must increase it (`low = mid + 1`).

### Approach

1. If `k > n`, return `-1`.
2. Find `min(arr)` and `sum(arr)` to initialize `low` and `high` boundaries.
3. Perform binary search:
   - Calculate `mid = low + (high - low) / 2`.
   - Use a helper function `isAllocated(arr, mid, k)` to check if we can distribute the books such that no student reads more than `mid` pages. We iterate through the array and accumulate pages. If the accumulated pages exceed `mid`, we start allocating to the next student.
   - If the allocation is possible within `k` students, update `high = mid - 1`.
   - Otherwise, update `low = mid + 1`.
4. Return `low` (or `i` in the code).

---

### Code

```cpp
class Solution {
  public:
    bool isAllocated(vector<int>&arr, int pages, int stud){
        int n = arr.size();
        int sum = 0, cnt=1;
        for(int i=0; i<n; i++){
            if(arr[i] > pages) return false;
            if(sum + arr[i]> pages){
                cnt++;
                sum = arr[i];
            }else sum += arr[i];
        }
        if(cnt > stud) return false;
        return true;
    }
    int findPages(vector<int> &arr, int k) {
        // code here
        int n = arr.size();
        if(k > n) return -1;
        int i=*min_element(arr.begin(), arr.end()), 
            j=accumulate(arr.begin(), arr.end(), 0);
        
        while(i<=j){
            int mid = i+(j-i)/2;
            if(isAllocated(arr, mid, k)) j=mid-1;
            else i=mid+1;
        }
        return i;
    }
};
```
