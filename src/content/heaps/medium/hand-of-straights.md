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


**Example 2:**
```text
Input: hand = [1,2,3,4,5], groupSize = 4
Output: false
Explanation: Alice's hand cannot be rearranged into groups of 4.
```

**Example 3: (Edge Case - Group size 1)**
```text
Input: hand = [1,5,3], groupSize = 1
Output: true
Explanation: Any hand can be grouped if the group size is 1.
```

---

### Intuition

To form groups of consecutive cards, we should always greedily start the next group with the smallest available card. If we sort the cards or use a map to keep track of card frequencies, we can continuously pick the smallest remaining card and try to form a sequence of `groupSize`. If we can't find the required consecutive cards to complete the group, then it's impossible.

---

### Code

```cpp
class Solution {
public:
    bool isNStraightHand(vector<int>& hand, int groupSize) {
        // Total cards must be a multiple of groupSize
        if (hand.size() % groupSize != 0) return false;
        
        // Count frequencies of each card, keeping them sorted
        map<int, int> counts;
        for (int card : hand) {
            counts[card]++;
        }
        
        // Group cards starting from the smallest available card
        while (!counts.empty()) {
            int first = counts.begin()->first;
            
            // Try to form a consecutive sequence of groupSize
            for (int i = 0; i < groupSize; i++) {
                if (counts.find(first + i) == counts.end()) {
                    return false; // A required card is missing
                }
                counts[first + i]--;
                
                // Remove the card from map if its count drops to 0
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
