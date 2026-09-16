---
title: "Hand of Straights"
difficulty: "Medium"
youtube: "https://www.youtube.com/results?search_query=Hand+of+Straights+leetcode+846"
time: "O(N log N)"
space: "O(N)"
platforms:
  leetcode: "https://leetcode.com/problems/hand-of-straights/"
---

### Problem Statement

Alice has some number of cards and she wants to rearrange the cards into groups so that each group is of size `groupSize`, and consists of `groupSize` consecutive cards.

Given an integer array `hand` where `hand[i]` is the value written on the `ith` card and an integer `groupSize`, return `true` if she can rearrange the cards, or `false` otherwise.

**Example 1:**
```text
Input: hand = [1,2,3,6,2,3,4,7,8], groupSize = 3
Output: true
Explanation: Alice's hand can be rearranged as [1,2,3],[2,3,4],[6,7,8]
```

---

### Code

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        if (hand.size() % groupSize != 0) return false;
        
        map<int, int> counts;
        for (int card : hand) {
            counts[card]++;
        }
        
        while (!counts.empty()) {
            int first = counts.begin()->first;
            for (int i = 0; i < groupSize; i++) {
                if (counts.find(first + i) == counts.end()) {
                    return false;
                }
                counts[first + i]--;
                if (counts[first + i] == 0) {
                    counts.erase(first + i);
                }
            }
        }
        
        return true;
    }
};
```

---

### Complexity Analysis

- **Time Complexity:** `O(N log N)` as we use a `std::map` (which is a balanced binary search tree) to store and process the elements in sorted order.
- **Space Complexity:** `O(N)` to store the frequencies of the cards in the map.
