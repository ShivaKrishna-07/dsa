---
title: "Page Faults in LRU"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Page+Faults+in+LRU"
time: "O(N * C)"
space: "O(C)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/page-faults-in-lru5603/1"
---

### Problem Statement

In operating systems that use paging for memory management, page replacement algorithm is needed to decide which page needs to be replaced when new page comes in. Whenever a new page is referred and not present in memory, page fault occurs and Operating System replaces one of the existing pages with newly needed page. 

Given a sequence of pages in an array `pages[]` of length `N` and memory capacity `C`, find the number of page faults using Least Recently Used (LRU) Algorithm.

**Example 1:**
```text
Input: N = 9, C = 4
pages = {5, 0, 1, 3, 2, 4, 1, 0, 5}
Output: 8
Explanation: memory allocates 4 pages.
faults are 5, 0, 1, 3, 2, 4, 1, 0, 5.
```


**Example 2:**
```text
Input: N = 4, C = 2
pages = {1, 2, 1, 3}
Output: 3
Explanation: Faults for 1, 2, and 3. The second 1 is in memory.
```

**Example 3: (Edge Case - Infinite capacity)**
```text
Input: N = 5, C = 10
pages = {1, 2, 3, 4, 5}
Output: 5
Explanation: Every unique page causes a fault exactly once.
```

---

### Code

```cpp
class Solution{
public:
    int pageFaults(int N, int C, int pages[]){
        vector<int> memory;
        int faults = 0;
        
        for (int i = 0; i < N; i++) {
            auto it = find(memory.begin(), memory.end(), pages[i]);
            
            if (it == memory.end()) {
                faults++;
                if (memory.size() == C) {
                    memory.erase(memory.begin());
                }
                memory.push_back(pages[i]);
            } else {
                memory.erase(it);
                memory.push_back(pages[i]);
            }
        }
        return faults;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N * C)` because for each page, we potentially search and erase from the memory vector of size `C`.
- **Space Complexity:** `O(C)` to hold up to `C` pages in memory.
