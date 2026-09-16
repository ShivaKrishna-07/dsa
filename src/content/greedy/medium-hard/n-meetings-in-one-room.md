---
title: "N meetings in one room"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=N+meetings+in+one+room+greedy"
time: "O(N log N)"
space: "O(N)"
platforms:
  gfg: "https://practice.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1"
---

### Problem Statement

There is one meeting room in a firm. There are `N` meetings in the form of `(start[i], end[i])` where `start[i]` is start time of meeting `i` and `end[i]` is finish time of meeting `i`.
What is the maximum number of meetings that can be accommodated in the meeting room when only one meeting can be held in the meeting room at a particular time?

Note: Start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

**Example 1:**
```text
Input:
N = 6
start[] = {1,3,0,5,8,5}
end[] =  {2,4,6,7,9,9}
Output: 
4
Explanation:
Maximum four meetings can be held with given start and end timings.
The meetings are - (1, 2),(3, 4), (5,7) and (8,9)
```

---

### Code

```cpp
struct meeting {
    int start;
    int end;
    int pos;
};

class Solution {
public:
    static bool comp(struct meeting m1, meeting m2) {
        if (m1.end < m2.end) return true;
        else if (m1.end > m2.end) return false;
        else if (m1.pos < m2.pos) return true;
        return false;
    }
    
    int maxMeetings(int start[], int end[], int n) {
        struct meeting meet[n];
        for (int i = 0; i < n; i++) {
            meet[i].start = start[i], meet[i].end = end[i], meet[i].pos = i + 1;
        }
        
        sort(meet, meet + n, comp);
        
        int count = 1;
        int limit = meet[0].end;
        
        for (int i = 1; i < n; i++) {
            if (meet[i].start > limit) {
                limit = meet[i].end;
                count++;
            }
        }
        return count;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` due to the sorting of meetings.
- **Space Complexity:** `O(N)` for creating a data structure to hold the meetings.
